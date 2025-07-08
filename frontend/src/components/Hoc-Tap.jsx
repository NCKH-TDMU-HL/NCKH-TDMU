import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Mainmenu.css";
import "./hoc-tap.css";
import ThanhDieuHuong from "./ThanhDieuHuong";

const activities = [
  {
    name: "Nghe",
    path: "/hoc-tap/nghe",
    bg: "#ffd54f",
    icon: "/images/ear.png",
  },
  {
    name: "Nói",
    path: "/hoc-tap/noi",
    bg: "#4fc3f7",
    icon: "/images/mouth.png",
  },
  {
    name: "Đọc",
    path: "/hoc-tap/doc",
    bg: "#81c784",
    icon: "/images/book.png",
  },
  {
    name: "Viết",
    path: "/hoc-tap/viet",
    bg: "#f48fb1",
    icon: "/images/pencil.png",
  },
];

export default function LearningPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <div className="hoc-tap-page">
          <h2 className="title">Chọn kỹ năng bạn muốn học</h2>
          <div className="activity-grid">
            {activities.map((activity) => (
              <div
                key={activity.name}
                className="activity-card"
                style={{ backgroundColor: activity.bg }}
                onClick={() => navigate(activity.path)}
              >
                <img
                  src={activity.icon}
                  alt={activity.name}
                  className="activity-icon"
                />
                <div className="activity-name">{activity.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ThanhDieuHuong/>
    </>
  );
}