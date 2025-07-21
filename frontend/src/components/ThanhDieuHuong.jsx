import React, { useState, useEffect } from "react";
import "./ThanhDieuHuong.css";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function ThanhDieuHuong() {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dinoSrc, setDinoSrc] = useState("/images/dino-1-removebg-preview.png");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    const guestStatus = localStorage.getItem("isGuest");

    if (storedUser) {
      setUsername(storedUser);
      setIsGuest(guestStatus === "true");
    }
  }, []);

  const handleDinoClick = () => {
    setMenuOpen(!menuOpen);
    setDinoSrc(
      !menuOpen
        ? "/images/dino-2-removebg-preview.png"
        : "/images/dino-1-removebg-preview.png"
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("isGuest");
    localStorage.removeItem("lopDaChon");

    setTimeout(() => {
      navigate("/fullclass");
    }, 1000);
  };

  const renderUserDisplay = () => {
    if (!username) {
      return <span>Chưa đăng nhập</span>;
    }

    if (isGuest) {
      return <span style={{ color: "#4CAF50" }}>{username} (Khách)</span>;
    }

    return <span style={{ color: "#4CAF50" }}>Xin chào, {username}</span>;
  };

  return (
    <div className="main-menu-container">
      <div id="dino-toggle" onClick={handleDinoClick}>
        <img
          id="dino-img"
          src={dinoSrc}
          alt="Khủng long"
          style={{ transform: "scaleX(-1)" }}
        />
      </div>
      <header className={`main-menu ${menuOpen ? "active" : ""}`}>
        <ul>
          <li id="Ten">
            <details
              open={detailsOpen}
              onToggle={() => setDetailsOpen((open) => !open)}
            >
              <summary className="main-menu-link" id="Name">
                {renderUserDisplay()}
              </summary>

              <div className="account-dropdown">
                {username && !isGuest && (
                  <Link to="/Information">Thông tin tài khoản</Link>
                )}

                {isGuest && (
                  <>
                    <Link to="/dang-nhap" style={{ color: "#007bff" }}>
                      Đăng ký tài khoản thật
                    </Link>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#666",
                        padding: "5px",
                      }}
                    >
                      Đăng ký để lưu tiến trình học tập!
                    </span>
                  </>
                )}

                {username ? (
                  <Link
                    to="#"
                    onClick={handleLogout}
                    style={{ color: "#dc3545" }}
                  >
                    {isGuest ? "Thoát chế độ khách" : "Đăng Xuất"}
                  </Link>
                ) : (
                  <Link to="/dang-nhap">Đăng Nhập</Link>
                )}

                {username && !isGuest && (
                  <Link to="/changepassword">Thay đổi mật khẩu</Link>
                )}
              </div>
            </details>
          </li>
          <li>
            <Link to={`/${classId}`}>Trang chủ</Link>
          </li>
          <li>
            <Link to={`/${classId}/hoc-tap`}>Học tập</Link>
          </li>
          <li>
            <Link to={`/${classId}/tu-vung`}>Từ vựng chủ đề</Link>
          </li>
          <li>
            <Link to={`/${classId}/lo-trinh`}>Lộ trình</Link>
          </li>
        </ul>
      </header>
    </div>
  );
}
