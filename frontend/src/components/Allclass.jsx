import React, { useRef, useState } from "react";
import "./Allclass.css";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function Allclass() {
  const { classId } = useParams();
  const chonlopRef = useRef(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");

  const handleClick = (lop) => {
    if (isLoading) return;
    
    setIsLoading(true);
    setSelectedClass(lop);
    localStorage.setItem("lopDaChon", lop);
    
    setTimeout(() => {
      navigate("/dang-nhap");
    }, 2000);
  };

  const getClassName = (lop) => {
    const classNames = {
      lop1: "Lớp 1",
      lop2: "Lớp 2", 
      lop3: "Lớp 3",
      lop4: "Lớp 4",
      lop5: "Lớp 5"
    };
    return classNames[lop] || lop;
  };

  return (
    <div className="BackgroundAllclass">
      <div className={`chonlop ${isLoading ? "loading" : ""}`} ref={chonlopRef}>
        <div className="lopdanghoc">
          <Link to="#" onClick={(e) => e.preventDefault()}>
            🎓 CHỌN LỚP ĐANG HỌC
          </Link>
        </div>
        
        <div className="lop">
          <button 
            onClick={() => handleClick("lop1")}
            disabled={isLoading}
          >
            📚 Lớp 1
          </button>
          <button 
            onClick={() => handleClick("lop2")}
            disabled={isLoading}
          >
            📖 Lớp 2
          </button>
          <button 
            onClick={() => handleClick("lop3")}
            disabled={isLoading}
          >
            📝 Lớp 3
          </button>
          <button 
            onClick={() => handleClick("lop4")}
            disabled={isLoading}
          >
            🔬 Lớp 4
          </button>
          <button 
            onClick={() => handleClick("lop5")}
            disabled={isLoading}
          >
            🎯 Lớp 5
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="loading-overlay" style={{background: "linear-gradient(90deg, transparent, rgba(210, 209, 209, 0.2), transparent)"}}>
          <div className="loading-content">
            <div style={{ fontSize: "24px", marginBottom: "10px" }}>
              🎓
            </div>
            <div>
              Đang chuẩn bị {getClassName(selectedClass)}...
            </div>
            <div style={{ 
              fontSize: "14px", 
              marginTop: "8px", 
              opacity: "0.8" 
            }}>
              Vui lòng đợi trong giây lát
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Allclass;