import React, { useState, useEffect } from "react";
import "./ThanhDieuHuong.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function ThanhDieuHuong() {
  const { classId } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dinoSrc, setDinoSrc] = useState("/images/dino-1-removebg-preview.png");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUsername(storedUser);
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
                {username ? (
                  <span id="Tensaudangnhap">Xin chào, {username}</span>
                ) : (
                  <>Tài Khoản </>
                )}
              </summary>

              <div className="account-dropdown">
                <Link to="/Information">Thông tin tài khoản</Link>
                {username ? (
                  <Link
                    to="#"
                    onClick={() => {
                      localStorage.removeItem("loggedInUser");
                      window.location.reload();
                    }}
                  >
                    Đăng Xuất
                  </Link>
                ) : (
                  <Link to="/dang-nhap">Đăng Nhập</Link>
                )}
                <Link to="/changepassword">Thay đổi mật khẩu</Link>
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
