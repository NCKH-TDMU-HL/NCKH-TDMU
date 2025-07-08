import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./tu-vung-chu-de.css";
import "./Mainmenu.css";
import ThanhDieuHuong from "./ThanhDieuHuong";

export default function StudyTopics() {
  const [topics, setTopics] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dinoSrc, setDinoSrc] = useState("/images/dino-1-removebg-preview.png");
  const [startIndex, setStartIndex] = useState(0);
  const navigate = useNavigate();
  const { classId } = useParams(); 
  const visibleCount = 5;

  useEffect(() => {
    fetch(`http://localhost:3000/api/${classId}/topics`)
      .then((res) => res.json())
      .then(setTopics)
      .catch((err) => console.error("Lỗi khi lấy danh sách chủ đề:", err));
  }, [classId]);

  const handleDinoClick = () => {
    setMenuOpen(!menuOpen);
    setDinoSrc(
      !menuOpen
        ? "/images/dino-2-removebg-preview.png"
        : "/images/dino-1-removebg-preview.png"
    );
  };

  const handleCardClick = (clickedIndex) => {
    const centerIndex = 2;
    if (clickedIndex === centerIndex) {
      const topic = getVisibleTopics()[clickedIndex];
      navigate(topic.path);
    } else {
      const newStartIndex =
        (startIndex + clickedIndex - centerIndex + topics.length) %
        topics.length;
      setStartIndex(newStartIndex);
    }
  };

  const scrollLeft = () => {
    setStartIndex((prev) => (prev - 1 + topics.length) % topics.length);
  };

  const scrollRight = () => {
    setStartIndex((prev) => (prev + 1) % topics.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") scrollLeft();
      else if (e.key === "ArrowRight") scrollRight();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getVisibleTopics = () => {
    const result = [];
    for (let i = 0; i < visibleCount; i++) {
      result.push(topics[(startIndex + i) % topics.length]);
    }
    return result;
  };

  return (
    <div className="container">
      <div className="o-chu-de">
        <h2>Chọn chủ đề học tập</h2>
        <div className="the-chu-de">
          <div className="the-chu-de">
            {getVisibleTopics().map((topic, i) => {
              if (!topic) return null;

              let posClass = "";
              if (i === 2) posClass = "center";
              else if (i === 1) posClass = "left1";
              else if (i === 3) posClass = "right1";
              else if (i === 0) posClass = "left2";
              else if (i === 4) posClass = "right2";

              return (
                <div
                  key={topic.path}
                  className={`the ${posClass}`}
                  style={{
                    backgroundImage: topic.image
                      ? `url(${topic.image})`
                      : undefined,
                    backgroundColor: topic.bg || "#e0e0e0",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => handleCardClick(i)}
                >
                  <span
                    style={{
                      padding: "5px",
                      borderRadius: "8px",
                    }}
                  >
                    {topic.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <ThanhDieuHuong />
    </div>
  );
}
