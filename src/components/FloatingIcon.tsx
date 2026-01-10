'use client';

import { useEffect, useState } from 'react';
import '../styles/floating-icon.css';

interface FloatingIconProps {
  currentSection: number;
}

const sectionMessages = [
  "Bem-vinda ao show! 💕",
  "700 mil corações conquistados! ✨",
  "A energia da Bahia é contagiante! 🌟",
  "As Mel's são lindas demais! 👶💖",
  "Maternidade real e inspiradora! 🤱",
  "Você é nossa inspiração! 💫",
  "Sua comunidade te ama! 💝",
  "Voa alto, Beqinha! 🚀",
];

const FloatingIcon = ({ currentSection }: FloatingIconProps) => {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (currentSection >= 0) {
      setMessage(sectionMessages[currentSection] || '');
      setShowMessage(true);

      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000); 

      return () => clearTimeout(timer);
    }
  }, [currentSection]);

  return (
    <div className="floating-icon-container">
      <div className="floating-icon">
        <div className="dank-ass-loader-mini">
          <div className="row">
            <div className="arrow up outer outer-18"></div>
            <div className="arrow down outer outer-17"></div>
            <div className="arrow up outer outer-16"></div>
            <div className="arrow down outer outer-15"></div>
            <div className="arrow up outer outer-14"></div>
          </div>
          <div className="row">
            <div className="arrow up outer outer-1"></div>
            <div className="arrow down outer outer-2"></div>
            <div className="arrow up inner inner-6"></div>
            <div className="arrow down inner inner-5"></div>
            <div className="arrow up inner inner-4"></div>
            <div className="arrow down outer outer-13"></div>
            <div className="arrow up outer outer-12"></div>
          </div>
          <div className="row">
            <div className="arrow down outer outer-3"></div>
            <div className="arrow up outer outer-4"></div>
            <div className="arrow down inner inner-1"></div>
            <div className="arrow up inner inner-2"></div>
            <div className="arrow down inner inner-3"></div>
            <div className="arrow up outer outer-11"></div>
            <div className="arrow down outer outer-10"></div>
          </div>
          <div className="row">
            <div className="arrow down outer outer-5"></div>
            <div className="arrow up outer outer-6"></div>
            <div className="arrow down outer outer-7"></div>
            <div className="arrow up outer outer-8"></div>
            <div className="arrow down outer outer-9"></div>
          </div>
        </div>
      </div>

      {showMessage && (
        <div className="message-balloon">
          <div className="balloon-content">{message}</div>
          <div className="balloon-tail"></div>
        </div>
      )}
    </div>
  );
};

export default FloatingIcon;
