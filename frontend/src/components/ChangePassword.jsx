import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css";

const ChangePassword = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState("");
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setStatus("");

    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      navigate("/login");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setStatus("Mật khẩu mới và xác nhận không khớp!");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setStatus("Mật khẩu mới phải có ít nhất 6 ký tự!");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/user/${loggedInUser}/change-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStatus("Đổi mật khẩu thành công!");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        setStatus(data.message || "Đổi mật khẩu thất bại");
      }
    } catch (error) {
      setStatus("Lỗi kết nối server");
    }
  };

  return (
    <div className="body">
      <div className="Back" onClick={() => window.history.back()}>
        <span>Trở Về</span>
      </div>
      <div className="change-password-container">
        <h1>Đổi Mật Khẩu</h1>
        <form onSubmit={handleChangePassword}>
          <div className="form-group">
            <label>Mật khẩu hiện tại:</label>
            <div className="password-input">
              <input
                type={showPasswords.current ? "text" : "password"}
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
                placeholder="Nhập mật khẩu hiện tại"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("current")}
                className="toggle-password"
              >
                {showPasswords.current ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Mật khẩu mới:</label>
            <div className="password-input">
              <input
                type={showPasswords.new ? "text" : "password"}
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
                minLength={6}
                placeholder="Nhập mật khẩu mới"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new")}
                className="toggle-password"
              >
                {showPasswords.new ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Xác nhận mật khẩu mới:</label>
            <div className="password-input">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                required
                minLength={6}
                placeholder="Xác nhận mật khẩu mới"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="toggle-password"
              >
                {showPasswords.confirm ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn">
              Đổi Mật Khẩu
            </button>
          </div>
        </form>

        {status && (
          <div
            className={`status-message ${
              status.includes("thành công") ? "success" : "error"
            }`}
          >
            {status}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
