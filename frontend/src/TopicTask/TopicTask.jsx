import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import "../components/Level1.css";

export default function TopicTask() {
  const { classId, topic, taskId } = useParams();
  const [quizData, setQuizData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [textAnswer, setTextAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [previousQuestions, setPreviousQuestions] = useState([]);
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [selectedVI, setSelectedVI] = useState(null);
  const [selectedEN, setSelectedEN] = useState(null);
  const navigate = useNavigate();

  const currentQuestion = quizData.length > 0 ? quizData[currentIndex] : null;

  const correctPercent = Math.round((correctCount / quizData.length) * 100);
  const stars = Math.round(correctPercent / 20);

  const isCorrect =
    currentQuestion?.type === "writing"
      ? textAnswer.trim().toLowerCase() ===
        currentQuestion.correctAnswer?.toLowerCase()
      : selected === currentQuestion?.correctAnswer;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/${classId}/questions?topic=${topic}&task=${taskId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const combined = [
          ...(data.multipleChoice?.map((q) => ({
            ...q,
            type: "multiple-choice",
          })) || []),
          ...(data.listening?.map((q) => ({ ...q, type: "listening" })) || []),
          ...(data.writing?.map((q) => ({ ...q, type: "writing" })) || []),
          ...(data.matching?.map((q) => ({ ...q, type: "matching" })) || []),
        ].sort(() => Math.random() - 0.5);

        if (combined.length === 0) {
          throw new Error("No questions found for the given topic and task.");
        }

        setQuizData(combined);
      } catch (err) {
        console.error("❌ Error fetching data:", err.message);
        setQuizData([]);
      }
    };

    fetchQuestions();
  }, [classId, topic, taskId]);

  const handleSubmit = () => {
    if (!currentQuestion) return;

    let isAnswerCorrect = false;

    if (currentQuestion.type === "writing") {
      if (textAnswer.trim() === "") return;
      isAnswerCorrect =
        textAnswer.trim().toLowerCase() ===
        currentQuestion.correctAnswer.toLowerCase();
    } else if (currentQuestion.type === "listening") {
      if (selected === null) return;
      isAnswerCorrect = selected === currentQuestion.correctAnswer;
    } else if (currentQuestion.type === "multiple-choice") {
      if (selected === null) return;
      isAnswerCorrect = selected === currentQuestion.correctAnswer;
    } else if (currentQuestion.type === "matching") {
      return; // đã xử lý riêng rồi
    }

    setSubmitted(true);

    if (isAnswerCorrect) {
      setScore((prev) => prev + 10);
      setCorrectCount((prev) => prev + 1);
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1500);
    }
  };

  const handleNext = () => {
    setSubmitted(false);
    setSelected(null);
    setTextAnswer("");
    setPreviousQuestions([...previousQuestions, currentQuestion]);
    setMatchedPairs([]);
    if (currentIndex + 1 < quizData.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
      confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 } });
      const key = `${classId}-task${taskId}-${topic}`;
      localStorage.setItem(key, correctCount);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setSubmitted(false);
      setSelected(null);
      setTextAnswer("");
      setMatchedPairs([]);
    }
  };

  const handleSpeech = () => {
    if (!recognition) {
      alert("Trình duyệt không hỗ trợ tính năng nhận diện giọng nói.");
      return;
    }

    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();
      setTextAnswer(transcript);
      setSubmitted(false);
      setSelected(null);
    };

    recognition.onerror = (event) => {
      console.error("Lỗi nhận diện:", event.error);
      alert("Không nhận được âm thanh. Hãy thử lại.");
    };
  };

  const speak = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    } else {
      alert("Trình duyệt không hỗ trợ đọc bằng giọng nói.");
    }
  };
  // xử lí phần matching
  const handleMatchClick = (word, lang) => {
    if (lang === "vi") {
      setSelectedVI(word);
      if (selectedEN) {
        const match = currentQuestion.pairs.find(
          (p) => p.vi === word && p.en === selectedEN
        );
        if (match) {
          setMatchedPairs([...matchedPairs, match.vi]);
          setSelectedVI(null);
          setSelectedEN(null);
          if (matchedPairs.length + 1 === currentQuestion.pairs.length) {
            setSubmitted(true);
            setScore(score + 10);
            setCorrectCount(correctCount + 1);
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
          }
        } else {
          setTimeout(() => {
            setSelectedVI(null);
            setSelectedEN(null);
          }, 500);
        }
      }
    } else if (lang === "en") {
      setSelectedEN(word);
      if (selectedVI) {
        const match = currentQuestion.pairs.find(
          (p) => p.vi === selectedVI && p.en === word
        );
        if (match) {
          setMatchedPairs([...matchedPairs, match.vi]);
          setSelectedVI(null);
          setSelectedEN(null);
          if (matchedPairs.length + 1 === currentQuestion.pairs.length) {
            setSubmitted(true);
            setScore(score + 10);
            setCorrectCount(correctCount + 1);
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
          }
        } else {
          setTimeout(() => {
            setSelectedVI(null);
            setSelectedEN(null);
          }, 500);
        }
      }
    }
  };

  if (!currentQuestion) {
    return (
      <div className="quiz-container">
        <h1 className="quiz-title">
          <Link to={`/${classId}/${topic}`}>← Trở về</Link>
        </h1>
        <p>⏳ Đang tải câu hỏi...</p>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">
        <Link to={`/${classId}/${topic}`}>← Trở về</Link>
      </h1>
      <div className="progress-bar-wrapper">
        <div
          className="progress-bar"
          style={{ width: `${(currentIndex / quizData.length) * 100}%` }}
        ></div>
      </div>

      {isFinished ? (
        <div className="result-section">
          <h2>🎉 Congratulation</h2>
          <p>
            Bạn đã trả lời đúng {correctCount} / {quizData.length} câu!
          </p>
          <p>Điểm: {score}</p>
          <p>
            🌟 Ngôi sao: {"★".repeat(stars)}
            {"☆".repeat(5 - stars)}
          </p>
          <button
            className="check-button"
            onClick={() => navigate(`/${classId}/${topic}`)}
          >
            Hoàn Thành
          </button>
        </div>
      ) : (
        <>
          <h1 className="question-title">{currentQuestion.question}</h1>
          {currentQuestion.image && (
            <img
              src={currentQuestion.image}
              alt="question"
              className="question-image"
            />
          )}

          {currentQuestion.type === "multiple-choice" && (
            <div className="options-wrapper">
              {currentQuestion.options?.map((option, index) => (
                <div
                  key={index}
                  onClick={() => !submitted && setSelected(option.text)}
                  className={`option-card ${
                    selected === option.text ? "selected" : ""
                  }`}
                >
                  {option.image && (
                    <img
                      src={option.image}
                      alt={option.text}
                      className="option-image"
                    />
                  )}
                  <p className="option-label">{option.text}</p>
                </div>
              ))}
            </div>
          )}

          {/* Listening */}
          {currentQuestion.type === "listening" && (
            <div className="options-wrapper"> 
              <h2 className="question-text">{currentQuestion.question}</h2>
              <button
                onClick={() => speak(currentQuestion.correctAnswer)}
                className="mic-button"
              >
                🔊 Read
              </button>
              {currentQuestion.options?.map((option, index) => (
                <div
                  key={index}
                  onClick={() => !submitted && setSelected(option)}
                  className={`option-card ${
                    selected === option ? "selected" : ""
                  }`}
                >
                  <p className="option-label">{option}</p>
                </div>
              ))}
            </div>
          )}

          {/* writting */}
          {currentQuestion.type === "writing" && (
            <>
              <input
                type="text"
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                disabled={submitted}
                className="writing-input"
                placeholder="Nhập câu trả lời của bạn..."
              />
              <div className="say-read">
                <button
                  onClick={() => speak(currentQuestion.correctAnswer)}
                  className="mic-button"
                >
                  🔊 đọc lại
                </button>
                <button onClick={handleSpeech} className="mic-button">
                  🎤 nói ở đây
                </button>
              </div>
            </>
          )}
          {/*matching*/}
          {currentQuestion.type === "matching" && (
            <>
              <div className="matching-grid">
                <div className="matching-column">
                  {currentQuestion.pairs.map((pair, i) => (
                    <div
                      key={`en-${i}`}
                      className={`matching-box ${
                        selectedEN === pair.en ? "selected" : ""
                      } ${matchedPairs.includes(pair.vi) ? "matched" : ""}`}
                      onClick={() => {
                        if (!matchedPairs.includes(pair.vi)) {
                          handleMatchClick(pair.en, "en");
                        }
                      }}
                    >
                      <span className="index">{(i + 6) % 10}</span> {pair.en}
                    </div>
                  ))}
                </div>
                <div className="matching-column">
                  {currentQuestion.pairs
                    .map((pair) => ({ ...pair }))
                    .sort(() => Math.random() - 0.5)
                    .map((pair, i) => (
                      <div
                        key={`vi-${i}`}
                        className={`matching-box ${
                          selectedVI === pair.vi ? "selected" : ""
                        } ${matchedPairs.includes(pair.vi) ? "matched" : ""}`}
                        onClick={() => {
                          if (!matchedPairs.includes(pair.vi)) {
                            handleMatchClick(pair.vi, "vi");
                          }
                        }}
                      >
                        <span className="index">{i + 1}</span> {pair.vi}
                      </div>
                    ))}
                </div>
              </div>
            </>
          )}

          <div className="button-wrapper">
            {currentIndex > 0 && (
              <button className="check-button" onClick={handleBack}>
                Câu trước
              </button>
            )}
            <button
              className="check-button"
              onClick={submitted ? handleNext : handleSubmit}
            >
              {submitted
                ? currentIndex + 1 === quizData.length
                  ? "Xem kết quả"
                  : "Câu tiếp"
                : "Kiểm tra"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
