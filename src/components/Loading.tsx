'use client';

import { useEffect, useState } from 'react';
import '../styles/loading.css';

interface LoadingProps {
  onLoadingComplete: () => void;
}

const Loading = ({ onLoadingComplete }: LoadingProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const fullText = `Bem-vindo ao universo de Rebeca Lemos...

Uma homenagem especial à mãe que inspira 700 mil corações.

Este é um site cinematográfico criado com carinho para celebrar a Beqinha, 
a energia contagiante da Bahia, e o amor em dose tripla com Melinda e Melissa.

Prepare-se para uma experiência única, onde cada rolagem revela 
uma nova faceta dessa mulher incrível que encanta nosso feed todos os dias.

Aqui você encontrará momentos especiais, mensagens carinhosas 
e uma comunidade que admira cada segundo da sua jornada na maternidade.

Vamos começar?`;

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 30); 

      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        onLoadingComplete();
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText, onLoadingComplete]);

  return (
    <div className="loading-container">
      <button 
        className="skip-intro-btn" 
        onClick={onLoadingComplete}
        aria-label="Pular introdução"
      >
        Pular Intro ›
      </button>
      <main className="loading-main">
        <div className="dank-ass-loader">
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

        <div className="typewriter-container">
          <p className="typewriter-text">
            {displayedText}
            <span className="cursor">|</span>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Loading;
