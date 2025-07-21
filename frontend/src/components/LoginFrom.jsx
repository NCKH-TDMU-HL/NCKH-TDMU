// src/LoginRegisterForm.jsx
import React, { useState, useEffect } from "react";
import "./LoginFrom.css";
import { useNavigate, Link } from "react-router-dom";
import ThanhDieuHuong from "./ThanhDieuHuong";

const LoginRegisterForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [isGuest, setIsGuest] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    const guestStatus = localStorage.getItem("isGuest");

    if (storedUser) {
      setCurrentUser(storedUser);
      setIsGuest(guestStatus === "true");
    }
  }, []);

  useEffect(() => {
    if (
      status &&
      (status.includes("Đăng nhập thành công") ||
        status.includes("Đăng ký thành công") ||
        status.includes("Chào mừng") ||
        status.includes("Đã thoát chế độ khách"))
    ) {
      const timer = setTimeout(() => setStatus(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("loggedInUser", username);
        localStorage.setItem("isGuest", "false");
        setCurrentUser(username);
        setIsGuest(false);

        const lopDaChon = localStorage.getItem("lopDaChon");

        setStatus(data.message);
        setTimeout(() => {
          navigateToClass(lopDaChon);
        }, 2500);
      } else {
        setStatus(data.message || "Đã có lỗi xảy ra.");
      }
    } else {
      const userData = {
        username,
        password,
        email: "",
        phone: "",
        dob: "",
        avatar: "",
      };

      const res = await fetch("http://localhost:3000/api/register", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus(data.message);
        setTimeout(() => {
          setIsLogin(true);
          setStatus("");
        }, 2500);
      } else {
        setStatus(data.message || "Đã có lỗi xảy ra.");
      }
    }
  };

  const navigateToClass = (lopDaChon) => {
    switch (lopDaChon) {
      case "lop1":
        navigate("/class1");
        break;
      case "lop2":
        navigate("/class2");
        break;
      case "lop3":
        navigate("/class3");
        break;
      case "lop4":
        navigate("/class4");
        break;
      case "lop5":
        navigate("/class5");
        break;
      default:
        navigate("/fullclass");
    }
  };

  const handleGuestLogin = () => {
    const guestName = `Khách_${Math.floor(Math.random() * 1000)}`;

    localStorage.setItem("loggedInUser", guestName);
    localStorage.setItem("isGuest", "true");
    setCurrentUser(guestName);
    setIsGuest(true);

    const lopDaChon = localStorage.getItem("lopDaChon");
    setStatus(`Chào mừng ${guestName}! Đang chuyển trang...`);
    setTimeout(() => {
      navigateToClass(lopDaChon);
    }, 2500);
  };

  const handleExitGuestMode = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("isGuest");
    localStorage.removeItem("lopDaChon");
    setCurrentUser("");
    setIsGuest(false);
    setUsername("");
    setPassword("");
    setStatus("Đã thoát chế độ khách. Đang chuyển về trang chọn lớp...");

    setTimeout(() => {
      navigate("/fullclass");
    }, 1000);
  };

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
    setStatus("");
    setUsername("");
    setPassword("");
  };

  if (currentUser && isGuest) {
    return (
      <div className="trang-dang-nhap">
        <ThanhDieuHuong />
        <div className="login-form guest-mode">
          <div className="guest-notification">
            <h2>🎭 Chế độ Khách</h2>
            <p>
              Bạn đang sử dụng tài khoản: <strong>{currentUser}</strong>
            </p>
            <p>Đăng ký tài khoản thật để lưu tiến trình học tập của bạn!</p>

            <div className="guest-actions">
              <button
                onClick={handleExitGuestMode}
                className="exit-guest-btn"
                style={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                  marginRight: "10px",
                }}
              >
                Thoát và chọn lại lớp
              </button>

              <button
                onClick={() => {
                  const lopDaChon = localStorage.getItem("lopDaChon");
                  navigateToClass(lopDaChon);
                }}
                className="back-to-class-btn"
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Quay lại học tập
              </button>
            </div>

            {status && (
              <p className="status-success" style={{ marginTop: "15px" }}>
                {status}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="trang-dang-nhap">
      <ThanhDieuHuong />
      <div className={`login-form ${isLogin ? "" : "register-mode"}`}>
        <div className="login-form-left">
          <h2>
            {isLogin ? (
              <>
                <span>LOG</span>
                <br />
                <span>IN</span>
              </>
            ) : (
              <>
                <span>SIGN</span>
                <br />
                <span>UP</span>
              </>
            )}
          </h2>

          <button
            type="button"
            onClick={handleToggleForm}
            className="toggle-button"
          >
            {isLogin
              ? "Chưa có tài khoản? Đăng ký"
              : "Đã có tài khoản? Đăng nhập"}
          </button>
        </div>
        <div className="login-form-right">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <label>USERNAME : </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                maxLength={20}
                placeholder="Nhập tên đăng nhập"
              />
            </div>
            <div className="form-row">
              <label>PASSWORD:</label>
              <div className="input-pass-wrap">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  maxLength={20}
                  placeholder="Nhập mật khẩu"
                />
                <button
                  type="button"
                  className="show-pass-btn"
                  onClick={() => setShowPass((v) => !v)}
                  tabIndex={-1}
                  style={{
                    cursor: "pointer",
                    border: "none",
                    background: "none",
                    fontSize: "1.2rem",
                  }}
                >
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            {status && (
              <p
                className={
                  status.includes("Đăng nhập thành công") ||
                  status.includes("Đăng ký thành công") ||
                  status.includes("Chào mừng") ||
                  status.includes("Đã thoát chế độ khách")
                    ? "status-success"
                    : "error"
                }
              >
                {status} {/* ← THÊM DÒNG NÀY */}
              </p>
            )}
            <div className="button-row">
              <button type="submit">{isLogin ? "Đăng Nhập" : "Đăng Ký"}</button>
              {isLogin && (
                <button
                  type="button"
                  onClick={handleGuestLogin}
                  className="guest-login-btn"
                  style={{
                    backgroundColor: "#6c757d",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  Đăng nhập với tài khoản Khách
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterForm;
