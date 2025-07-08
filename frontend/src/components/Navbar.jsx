import React, { useRef } from "react";
import "./Navbar.css";
import { useNavigate } from 'react-router-dom';

function Home() {
  const rocketRef = useRef(null);
  const introRef = useRef(null);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    const rocketElement = rocketRef.current;
    const introElement = introRef.current;
    if (rocketElement && introElement) {
      rocketElement.classList.add('rocket-fly');
      setTimeout(() => {
        introElement.classList.add('hidden');
        navigate("/fullclass");
      }, 2000);
    }
  };

  return (
    <div className="bia">
      <img
        className="anh1"
        src="https://babilala.vn/wp-content/uploads/2023/02/app-giai-tieng-anh.jpg"
        alt="WED học tiếng anh cho trẻ em"
      />
      <div className="intro" ref={introRef}>
        <img
          id="rocket"
          ref={rocketRef}
          src="https://cdn.pixabay.com/photo/2017/06/25/22/00/rocket-2442125_1280.png"
          alt="Rocket"
        />
        <button className="button-btn" onClick={handleClick}>
          Bấm vào đây
        </button>
      </div>
    </div>
  );
}

export default Home;