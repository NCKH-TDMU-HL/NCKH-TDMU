import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Mainmenu.css";
import "./hoc-tap.css";
import ThanhDieuHuong from "./ThanhDieuHuong";
import { useParams } from "react-router-dom";


export default function LearningPage() {
  const navigate = useNavigate();
  const { classId } = useParams();

  const activities = [
    {
      name: "Nghe",
      getPath: () => `/${classId}/hoc-tap/nghe`,
      bg: "#ffd54f",
      icon: "/images/ear.png",
    },
    {
      name: "Nói",
      getPath: () => `/${classId}/hoc-tap/noi`,
      bg: "#4fc3f7",
      icon: "/images/mouth.png",
    },
    {
      name: "Đọc",
      getPath: () => `/${classId}/hoc-tap/doc`,
      bg: "#81c784",
      icon: "/images/book.png",
    },
    {
      name: "Viết",
      getPath: () => `/${classId}/hoc-tap/viet`,
      bg: "#f48fb1",
      icon: "/images/pencil.png",
    },
  ];

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
                onClick={() => navigate(activity.getPath())}
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
      <ThanhDieuHuong />
    </>
  );
}