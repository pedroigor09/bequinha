'use client';

import { useEffect, useRef, useState } from 'react';
import '../styles/book.css';

interface BookProps {
  isOpen: boolean;
  onClose: () => void;
}

const Book = ({ isOpen, onClose }: BookProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const nextPage = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.clientWidth,
        behavior: 'smooth'
      });
    }
  };

  const prevPage = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.clientWidth,
        behavior: 'smooth'
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="book-overlay"
      onClick={handleOverlayClick}
    >
      <button className="book-close" onClick={onClose}>
        ✕
      </button>

      {/* Polaroids flutuantes - apenas topo */}
      <div className="polaroid polaroid-1">
        <img src="/polaroid1.jpg" alt="Polaroid 1" />
      </div>
      <div className="polaroid polaroid-2">
        <img src="/polaroid2.jpg" alt="Polaroid 2" />
      </div>
      
      {/* Polaroids flutuantes - apenas embaixo */}
      <div className="polaroid polaroid-5">
        <img src="/polaroid5.jpg" alt="Polaroid 5" />
      </div>
      <div className="polaroid polaroid-6">
        <img src="/polaroid6.jpg" alt="Polaroid 6" />
      </div>

      <div className="container">
        <h1>Diário da Mel</h1>
        
        {/* Setas de navegação apenas para mobile */}
        <button className="book-arrow book-arrow-left" onClick={prevPage} aria-label="Página anterior">
          ‹
        </button>
        <button className="book-arrow book-arrow-right" onClick={nextPage} aria-label="Próxima página">
          ›
        </button>

        <div className="sprite-wrapper">
          <div className="book">
            <div className="carousel" ref={carouselRef} style={{ '--slides': 4 } as React.CSSProperties}>
              <div className="sprite"></div>
              
              <div className="carousel-item">
                <div className="page-container">
                  <div className="page left-page">
                    <div>
                      <p style={{ margin: 0, textIndent: '1rem' }}>
                        Era uma vez, em uma casa cheia de amor e luz, duas princesas muito especiais: Melinda e Melissa, carinhosamente chamadas de "As Mel's". 
                      </p>
                      <p style={{ margin: 0, textIndent: '1rem' }}>
                        Melinda, a mais velha, sempre foi a protetora da irmãzinha. Com seus olhos brilhantes e sorriso encantador, ela conquistava corações por onde passava.
                      </p>
                    </div>
                  </div>
                  <div className="page right-page">
                    <div>
                      <p style={{ margin: 0, textIndent: '1rem' }}>
                        Melissa, a caçulinha, nasceu para espalhar alegria. Desde pequenininha, seu sorriso iluminava qualquer ambiente, e sua risada era música para os ouvidos de todos.
                      </p>
                      <p style={{ margin: 0, textIndent: '1rem' }}>
                        Juntas, elas formavam uma dupla inseparável, compartilhando segredos, aventuras e muito amor.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="carousel-item">
                <div className="page-container">
                  <div className="page left-page">
                    <div>
                      <p style={{ margin: 0, textIndent: '1rem' }}>
                        As Mel's descobriram que sua irmandade era especial não apenas em casa, mas também para o mundo. Suas fotos juntas encantavam milhares de pessoas.
                      </p>
                      <p style={{ margin: 0, textIndent: '1rem' }}>
                        Cada sorriso, cada abraço, cada momento de cumplicidade era capturado e compartilhado, mostrando ao mundo o verdadeiro significado de amor entre irmãs.
                      </p>
                    </div>
                  </div>
                  <div className="page right-page">
                    <div>
                      <p style={{ margin: 0, textIndent: '1rem' }}>
                        O Instagram se tornou o diário visual de suas aventuras. Seguidores de todos os cantos acompanhavam cada passo, cada conquista, cada momento doce dessa jornada inesquecível.
                      </p>
                      <p style={{ margin: 0, textIndent: '1rem' }}>
                        E assim, duas princesas provaram que o amor verdadeiro de irmãs pode conquistar não apenas um reino, mas corações ao redor do mundo inteiro.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="carousel-item">
                <div className="page-container">
                  <div className="page left-page">
                    <div>
                      <p style={{ margin: 0, textIndent: '1rem' }}>
                        Onde a imaginação começa e a descoberta se torna brincadeira. É um lugar de conexão, onde irmãs se tornam melhores amigas e cada dia é uma nova aventura.
                      </p>
                      <p style={{ margin: 0, textIndent: '1rem' }}>
                        O som das risadas ecoava pela casa, transformando momentos simples em memórias preciosas que durariam para sempre.
                      </p>
                    </div>
                  </div>
                  <div className="page right-page">
                    <div>
                      <p style={{ margin: 0, textIndent: '1rem' }}>
                        Juntas descobriram que a verdadeira magia está nas pequenas coisas: um abraço apertado, uma brincadeira boba, um segredo compartilhado só entre elas duas.
                      </p>
                      <p style={{ margin: 0, textIndent: '1rem' }}>
                        E todos que as conheciam sabiam: essas duas princesas eram especiais, não pela fama, mas pelo amor puro que compartilhavam.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="carousel-item">
                <div className="page-container">
                  <div className="page left-page">
                    <div>
                      <p style={{ margin: 0, textIndent: '1rem' }}>
                        Esta é a história de Melinda e Melissa, as Mel's que conquistaram não apenas o Instagram, mas também os corações de todos que tiveram o privilégio de conhecê-las.
                      </p>
                      <p style={{ margin: 0, textIndent: '1rem' }}>
                        E seu conto de fadas continua sendo escrito, página a página, sorriso a sorriso, dia após dia.
                      </p>
                    </div>
                  </div>
                  <div className="page right-page">
                    <div>
                      <p style={{ margin: 0, textIndent: '1rem', fontWeight: 'bold' }}>
                        Fim... ou melhor, apenas o começo de muitas outras histórias incríveis!
                      </p>
                      <p style={{ margin: 0, textIndent: '1rem', marginTop: '2rem', textAlign: 'center' }}>
                        ❤️ As Mel's ❤️
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
