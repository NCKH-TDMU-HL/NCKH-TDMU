import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./TopicPage.css";

export default function TopicPage() {
  const { lop, topic } = useParams(); 
  const [progressData, setProgressData] = useState({});

  useEffect(() => {
    const newProgress = {};
    for (let i = 1; i <= 5; i++) {
      const key = `${lop}-task${i}-${topic}`;
      const saved = parseInt(localStorage.getItem(key));
      newProgress[i] = isNaN(saved) ? 0 : saved; 
    }
    setProgressData(newProgress);
  }, [lop, topic]);

  const lessons = Array.from({ length: 5 }, (_, i) => {
    const taskNum = i + 1;
    const correct = progressData[taskNum] || 0;
    return {
      id: taskNum,
      title: `Task ${taskNum}`,
      progress: correct,
      total: 7, 
      owlImg: `/images/dino_${Math.floor(i / 2)}_${i % 2}.png`,
      path: `/${lop}/${taskNum}/${topic}`,
    };
  });

  return (
    <div className="container">
      <div className="lesson-list">
        <h2 className="back">
          <Link to={`/${lop}/tu-vung`}>← Trở về</Link>
        </h2>

        {lessons.map((lesson) => {
          const percent =
            lesson.total > 0 && lesson.progress >= 0
              ? Math.min((lesson.progress / lesson.total) * 100, 100)
              : 0;

          return (
            <div className="lesson-card" key={lesson.id}>
              <div className="lesson-info">
                <h3>{lesson.title}</h3>
                <div className="progress-container">
                  <h5>Hoàn thành</h5>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">
                    {lesson.progress}/{lesson.total}
                  </span>
                </div>
              </div>

              <div className="lesson-actions">
                <Link to={lesson.path}>
                  <button>Tiếp tục</button>
                </Link>
                <img src={lesson.owlImg} alt="Dino" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
