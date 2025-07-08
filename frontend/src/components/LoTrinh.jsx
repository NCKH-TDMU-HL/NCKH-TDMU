import React, { useState, useEffect } from "react";
import "./lo-trinh.css";
import "./Mainmenu.css";
import { useNavigate, Link, useParams } from "react-router-dom";
import ThanhDieuHuong from "./ThanhDieuHuong";

const levels = [
  { id: 1, name: "Ải 1", top: "60%", left: "10%" },
  { id: 2, name: "Ải 2", top: "40%", left: "25%" },
  { id: 3, name: "Ải 3", top: "65%", left: "40%" },
  { id: 4, name: "Ải 4", top: "45%", left: "60%" },
  { id: 5, name: "Ải 5", top: "65%", left: "80%" },
];

export default function LoTrinh({ inputUsername, setInputUsername }) {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [results, setResults] = useState([null, null, null, null, null]);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dinoSrc, setDinoSrc] = useState("/images/dino-1-removebg-preview.png");
  const [dinoPos, setDinoPos] = useState({
    top: levels[0].top,
    left: levels[0].left,
  });

  useEffect(() => {
    const storedResults = levels.map((level) => {
      const saved = localStorage.getItem(`result-level-${level.id}`);
      return saved ? JSON.parse(saved) : null;
    });
    setResults(storedResults);
  }, []);

  const getStars = (result) => {
    if (!result || result.total === 0) return 0;
    const percent = (result.correct / result.total) * 100;
    if (percent >= 100) return 5;
    if (percent >= 80) return 4;
    if (percent >= 60) return 3;
    if (percent >= 40) return 2;
    if (percent >= 20) return 1;
    return 0;
  };

  const stars = results.map((r) => getStars(r));

  const handleLevelClick = (idx) => {
    const unlocked = idx === 0 || getStars(results[idx - 1]) >= 3;

    if (!unlocked) return;

    // Lấy tọa độ của đảo sắp tới
    const nextLevel = levels[idx];

    setIsJumping(true);
    setDinoPos({ top: nextLevel.top, left: nextLevel.left });

    // Delay trước khi chuyển trang (để xem hiệu ứng di chuyển)
    setTimeout(() => {
      setCurrentLevel(idx);
      setIsJumping(false);
      navigate(`/${classId}/lo-trinh/level${levels[idx].id}`);
    }, 1000); // tùy bạn muốn delay bao lâu
  };

  const renderStars = (num) => {
    if (num === 0)
      return <span style={{ color: "#bbb", fontSize: "0.9em" }}>★★★★★</span>;
    return (
      <span>
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            style={{ color: i <= num ? "#FFD700" : "#ccc", fontSize: "1.2em" }}
          >
            ★
          </span>
        ))}
      </span>
    );
  };

  const handleDinoClick = () => {
    setMenuOpen(!menuOpen);
    setDinoSrc(
      !menuOpen
        ? "/images/dino-2-removebg-preview.png"
        : "/images/dino-1-removebg-preview.png"
    );
  };

  return (
    <div className="lo-trinh-bg">

      <h2 className="lo-trinh-title">Hành trình vượt ải</h2>

      <div className="lo-trinh-map">
        <img
          src={dinoSrc}
          alt="Dino"
          className={`lo-trinh-char ${isJumping ? "jumping" : ""}`}
          style={{
            position: "absolute",
            top: `calc(${dinoPos.top} - 40px)`, // dịch lên để đứng trên đảo
            left: dinoPos.left,
            transform: "translate(-50%, -120%) scaleX(-1)",
            transition: "top 0.6s ease, left 0.6s ease",
            zIndex: 10,
            width: "80px", // hoặc tuỳ chỉnh theo kích thước phù hợp
          }}
        />

        {levels.map((level, idx) => {
          const locked = idx > 0 && getStars(results[idx - 1]) < 3;

          return (
            <div
              key={level.id}
              style={{
                position: "absolute",
                top: level.top,
                left: level.left,
                transform: "translate(-50%, -50%)",
                width: 100,
                height: 150,
              }}
            >
              {locked ? (
                <div className="island locked">
                </div>
              ) : (
                <div
                  className="island"
                  onClick={() => handleLevelClick(idx)}
                  style={{ cursor: "pointer" }}
                >
                </div>
              )}

              <div className="island-label">{level.name}</div>
              <div className="island-stars">{renderStars(stars[idx])}</div>
              {locked && <div className="lo-trinh-lock">🔒</div>}
            </div>
          );
        })}
      </div>
      <ThanhDieuHuong inputUsername={inputUsername} setInputUsername={setInputUsername}/>
    </div>
  );
}
