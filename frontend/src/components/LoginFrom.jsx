// src/LoginRegisterForm.jsx
import React, { useState } from "react";
import "./LoginFrom.css";
import { useNavigate, Link } from "react-router-dom";
import ThanhDieuHuong from "./ThanhDieuHuong";

const LoginRegisterForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? "http://localhost:3000/api/login"
      : "http://localhost:3000/api/register";

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      if (isLogin) {
        localStorage.setItem("loggedInUser", username);
        setUsername(username);
        navigate("/class1");
      }
      setStatus(data.message);
    } else {
      setStatus(data.message || "Đã có lỗi xảy ra.");
    }
  };

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
            onClick={() => setIsLogin(!isLogin)}
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
                  status.includes("Đăng ký thành công")
                    ? "status-success"
                    : "error"
                }
              >
                {status}
              </p>
            )}
            <div className="button-row">
              <button type="submit">{isLogin ? "Đăng Nhập" : "Đăng Ký"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterForm;
