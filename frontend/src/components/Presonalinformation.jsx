import React, { useState, useEffect, useRef } from "react";
import "./Personalinformation.css";

export default function Personalinformation() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
  });
  const [avatar, setAvatar] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setForm((prev) => ({ ...prev, username: storedUsername }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Thông tin cập nhật:", form);
    localStorage.setItem("username", form.username);
  };

  return (
    <div className="personal-info-container">
      <div>
        <button className="back-button" onClick={() => window.history.back()}>
          Quay lại
        </button>
      </div>
      <div>
        <h1>Thông tin cá nhân</h1>

        <div className="avatar" onClick={() => fileInputRef.current?.click()}>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleAvatarChange}
          />
          {avatar ? (
            <img src={avatar} alt="Avatar" className="avatar-img" />
          ) : (
            <span className="avatar-placeholder">+</span>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <label>
            Tên người dùng:
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Số điện thoại:
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </label>
          <label>
            Địa chỉ:
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </label>
          <label>
            Ngày sinh:
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
            />
          </label>

          <button type="submit">Cập nhật thông tin</button>
        </form>
      </div>
    </div>
  );
}
