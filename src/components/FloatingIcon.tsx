'use client';

import { useEffect, useState } from 'react';
import '../styles/floating-icon.css';

interface FloatingIconProps {
  currentSection: number;
}

const sectionMessages = [
  ["Bem-vindos(as) ao show! 💕", "Aqui começa sua jornada! ✨", "Prepare-se para se encantar! 🌟", "feito por @_pedroigorc"],
  ["700 mil corações conquistados! ✨", "Sua comunidade é gigante! 💖", "Você inspira milhões! 🌟", "feito por @_pedroigorc"],
  ["A energia da Bahia é contagiante! 🌟", "Salvador te ama demais! 💛", "Axé e muita luz! ☀️", "feito por @_pedroigorc"],
  ["As Mel's são lindas demais! 👶💖", "Suas princesas são tudo! 💕", "Família abençoada! ✨", "feito por @_pedroigorc"],
  ["Maternidade real e inspiradora! 🤱", "Você é uma mãe incrível! 💖", "Representatividade que importa! 🌟", "feito por @_pedroigorc"],
  ["Você é nossa inspiração! 💫", "Sua autenticidade é linda! ✨", "Continue sendo você! 💕", "feito por @_pedroigorc"],
  ["Sua comunidade te ama! 💝", "Você faz a diferença! 🌟", "Obrigada por tudo! 💖", "feito por @_pedroigorc"],
  ["Voa alto, Beqinha! 🚀", "O céu não é o limite! ✨", "Você é uma estrela! 🌟", "feito por @_pedroigorc"],
];

const FloatingIcon = ({ currentSection }: FloatingIconProps) => {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    if (currentSection >= 0) {
      const messages = sectionMessages[currentSection] || sectionMessages[0];
      let index = 0;
      
      const showNextMessage = () => {
        setIsHiding(true);
        
        setTimeout(() => {
          setShowMessage(false);
          setMessage(messages[index]);
          setShowMessage(true);
          setIsHiding(false);
          
          index = (index + 1) % messages.length;
        }, 400);
      };
      
      // Primeira mensagem sem animação de saída
      setMessage(messages[0]);
      setShowMessage(true);
      setIsHiding(false);
      index = 1;
      
      const interval = setInterval(showNextMessage, 4000);

      return () => clearInterval(interval);
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
        <div className={`message-balloon ${isHiding ? 'hide' : ''}`}>
          <div className="balloon-content">{message}</div>
          <div className="balloon-tail"></div>
        </div>
      )}
    </div>
  );
};

export default FloatingIcon;
