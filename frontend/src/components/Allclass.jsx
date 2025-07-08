import React, { useRef } from "react";
import "./Allclass.css";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";

function Allclass() {
  const { classId } = useParams();
  const chonlopRef = useRef(null); 

  return (
    <div className="bia">
      <img
        className="anh1"
        src="https://babilala.vn/wp-content/uploads/2023/02/app-giai-tieng-anh.jpg"
        alt="WED học tiếng anh cho trẻ em"
      />
      <div className="chonlop show" ref={chonlopRef}>
        <Link to="#" style={{ fontSize: "50px" }}>CHỌN LỚP ĐANG HỌC</Link>
        <Link to="/class1"><button>Lớp 1</button></Link>
        <Link to="/class2"><button>Lớp 2</button></Link>
        <Link t0="/class3"><button>Lớp 3</button></Link>
        <Link to="/class4"><button>Lớp 4</button></Link>
        <Link to="/class5"><button>Lớp 5</button></Link>
      </div>
    </div>
  );
}

export default Allclass;
