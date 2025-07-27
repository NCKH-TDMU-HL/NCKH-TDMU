import React, { useRef, useEffect, useState } from "react";
import "./Navbar.css";
import { useNavigate } from 'react-router-dom';

function Home() {
  const rocketRef = useRef(null);
  const introRef = useRef(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const introElement = introRef.current;
    if (introElement) {
      introElement.style.animation = 'fadeInUp 1s ease-out';
    }
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    
    if (isLoading) return;
    
    setIsLoading(true);
    const rocketElement = rocketRef.current;
    const introElement = introRef.current;
    
    if (rocketElement && introElement) {
      rocketElement.classList.add('rocket-fly');
      
      setTimeout(() => {
        introElement.classList.add('hidden');
      }, 1000);
      
      setTimeout(() => {
        navigate("/fullclass");
      }, 2000);
    }
  };

  return (
    <div className="BackgroundNavbar">
      <div className="intro" ref={introRef}>
        <img
          id="rocket"
          ref={rocketRef}
          src="https://cdn.pixabay.com/photo/2017/06/25/22/00/rocket-2442125_1280.png"
          alt="Rocket"
          loading="eager"
        />
        <button 
          className="button-btn" 
          onClick={handleClick}
          disabled={isLoading}
          aria-label="Bắt đầu học tiếng Anh"
        >
          {isLoading ? "Đang khởi động..." : "Bắt đầu học"}
        </button>
      </div>
    </div>
  );
}

export default Home;