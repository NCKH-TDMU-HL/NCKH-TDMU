import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Personalinfromation.css";

const PersonalInformation = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
    avatar: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const loggedInUser = localStorage.getItem("loggedInUser");
      if (!loggedInUser) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/api/user/${loggedInUser}`
        );
        const data = await response.json();

        if (response.ok) {
          setUserInfo(data.user);
        } else {
          setStatus(data.message || "Không thể lấy thông tin người dùng");
        }
      } catch (error) {
        setStatus("Lỗi kết nối server");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      const response = await fetch(
        `http://localhost:3000/api/user/${userInfo.username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userInfo.email,
            phone: userInfo.phone,
            dob: userInfo.dob,
            avatar: userInfo.avatar,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStatus("Cập nhật thông tin thành công!");
        setUserInfo(data.user);
        setIsEditing(false);
      } else {
        setStatus(data.message || "Cập nhật thất bại");
      }
    } catch (error) {
      setStatus("Lỗi kết nối server");
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setStatus("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserInfo((prev) => ({
        ...prev,
        avatar: imageUrl,
      }));
    }
  };

  if (loading) {
    return <div className="loading">Đang tải thông tin...</div>;
  }

  return (
    <div className="body">
      <div className="Back" onClick={() => window.history.back()}>
        <span>Trở Về</span>
      </div>
      <div className="personal-info-container">
        <h1>Thông Tin Cá Nhân</h1>

        <div className="main-content">
          <div className="avatar-section">
            <h2>Ảnh Đại Diện</h2>
            <input
              id="avatarInput"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: "none" }}
            />

            {userInfo.avatar ? (
              <img
                src={userInfo.avatar}
                alt="Avatar"
                className="avatar-preview"
                onClick={() => document.getElementById("avatarInput").click()}
                title="Nhấn để đổi ảnh"
              />
            ) : (
              <div
                className="avatar-upload"
                onClick={() => document.getElementById("avatarInput").click()}
                title="Nhấn để thêm ảnh đại diện"
              >
                +
              </div>
            )}
          </div>

          <div className="user-info-section">
            <div className="section-header">
              <h2>Thông Tin Cá Nhân</h2>
              <button 
                type="button" 
                className="edit-btn"
                onClick={handleEditToggle}
              >
                {isEditing ? "Hủy" : "Chỉnh sửa"}
              </button>
            </div>
            <form onSubmit={handleUpdateInfo}>
              <div className="form-group">
                <label>Tên đăng nhập:</label>
                <input
                  type="text"
                  value={userInfo.username}
                  disabled
                  className="modern-input disabled-input"
                />
              </div>

              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                  placeholder="Nhập email của bạn"
                  disabled={!isEditing}
                  className="modern-input"
                />
              </div>

              <div className="form-group">
                <label>Số điện thoại:</label>
                <input
                  type="tel"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleInputChange}
                  placeholder="Nhập số điện thoại"
                  disabled={!isEditing}
                  className="modern-input"
                />
              </div>

              <div className="form-group">
                <label>Ngày sinh:</label>
                <input
                  type="date"
                  name="dob"
                  value={userInfo.dob}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="modern-input"
                />
              </div>

              {isEditing && (
                <div className="form-actions">
                  <button type="submit" className="save-btn">
                    Lưu Thay Đổi
                  </button>
                </div>
              )}
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

        <div className="learning-progress-section" style={{ display: "none" }}>
          <h2>Tiến Độ Học Tập</h2>
          <p>Phần này sẽ được cập nhật sau...</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;