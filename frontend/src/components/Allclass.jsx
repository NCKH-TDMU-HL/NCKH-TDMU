import React, { useRef } from "react";
import "./Allclass.css";
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

function Allclass() {
  const { classId } = useParams();
  const chonlopRef = useRef(null); 
  const navigate = useNavigate();
  
  const handleClick = (lop) => {
    localStorage.setItem('lopDaChon', lop);
    navigate('/dang-nhap');
  };

  return (
    <div className="bia">
      <img
        className="anh1"
        src="https://babilala.vn/wp-content/uploads/2023/02/app-giai-tieng-anh.jpg"
        alt="WED học tiếng anh cho trẻ em"
      />
      <div className="chonlop show" ref={chonlopRef}>
        <Link to="#" style={{ fontSize: "50px" }}>CHỌN LỚP ĐANG HỌC</Link>
        
        <button onClick={() => handleClick('lop1')}>Lớp 1</button>
        <button onClick={() => handleClick('lop2')}>Lớp 2</button>
        <button onClick={() => handleClick('lop3')}>Lớp 3</button>
        <button onClick={() => handleClick('lop4')}>Lớp 4</button>
        <button onClick={() => handleClick('lop5')}>Lớp 5</button>
      </div>
    </div>
  );
}

export default Allclass;