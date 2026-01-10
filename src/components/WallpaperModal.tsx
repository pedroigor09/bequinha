'use client';

import { useEffect, useState } from 'react';

interface WallpaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const wallpapers = [
  {
    id: 1,
    title: 'Vibes Anos 90',
    image: '/wall2.jpg',
    description: 'Nostalgia retrô com estilo Ariana 💕📞',
  },
  {
    id: 2,
    title: 'Halloween Vibes',
    image: '/wall3.jpg',
    description: 'Energia sinistra e diva ao mesmo tempo 👻💚',
  },
  {
    id: 3,
    title: 'Scream Queen',
    image: '/wall4.jpg',
    description: 'Terror com pipoca e muito estilo 🔪🍿',
  },
];

export default function WallpaperModal({ isOpen, onClose }: WallpaperModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showHearts, setShowHearts] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setShowHearts(true);
      
      const timer = setTimeout(() => {
        setShowHearts(false);
      }, 3000);

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };

      window.addEventListener('keydown', handleEscape);
      
      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    } else {
      document.body.style.overflow = 'unset';
      setShowHearts(false);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownload = (image: string, title: string) => {
    const link = document.createElement('a');
    link.href = image;
    link.download = `${title.replace(/\s+/g, '_')}_Wallpaper.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % wallpapers.length);
    setActiveOverlay(null);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + wallpapers.length) % wallpapers.length);
    setActiveOverlay(null);
  };

  return (
    <div className="wallpaper-modal-overlay" onClick={onClose}>
      {showHearts && (
        <div className="neon-hearts">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="neon-heart"
              style={{
                left: `${5 + Math.random() * 90}%`,
                animationDelay: `${Math.random() * 1.5}s`,
                fontSize: `${35 + Math.random() * 40}px`,
              }}
            >
              💖
            </div>
          ))}
        </div>
      )}
      
      <div className="wallpaper-modal-container" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="wallpaper-close-btn" aria-label="Fechar">
          ✕
        </button>

        <div className="wallpaper-header">
          <h2 className="wallpaper-title">Wallpapers Exclusivos 💖</h2>
          <p className="wallpaper-subtitle">
            Baixe e use como papel de parede! Feito com carinho pelos fãs
          </p>
        </div>

        {/* Grid para desktop */}
        <div className="wallpaper-grid">
          {wallpapers.map((wallpaper, index) => (
            <div key={wallpaper.id} className="wallpaper-card">
              <div 
                className="wallpaper-image-container"
                onClick={() => setActiveOverlay(activeOverlay === index ? null : index)}
              >
                <img
                  src={wallpaper.image}
                  alt={wallpaper.title}
                  className="wallpaper-image"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/beq1.jpg';
                  }}
                />
                <div className={`wallpaper-overlay ${activeOverlay === index ? 'active' : ''}`}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(wallpaper.image, wallpaper.title);
                    }}
                    className="wallpaper-download-btn"
                  >
                    ⬇️ Baixar
                  </button>
                </div>
              </div>
              <div className="wallpaper-info">
                <h3 className="wallpaper-card-title">{wallpaper.title}</h3>
                <p className="wallpaper-description">{wallpaper.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Carrossel para mobile */}
        <div className="wallpaper-carousel">
          <button onClick={prevSlide} className="carousel-arrow carousel-arrow-left" aria-label="Anterior">
            ‹
          </button>
          
          <div className="carousel-track">
            {wallpapers.map((wallpaper, index) => (
              <div 
                key={wallpaper.id} 
                className={`wallpaper-card carousel-slide ${index === currentSlide ? 'active' : ''}`}
              >
                <div 
                  className="wallpaper-image-container"
                  onClick={(e) => {
                    e.stopPropagation();
                    const overlayIndex = 100 + index;
                    setActiveOverlay(activeOverlay === overlayIndex ? null : overlayIndex);
                  }}
                >
                  <img
                    src={wallpaper.image}
                    alt={wallpaper.title}
                    className="wallpaper-image"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/beq1.jpg';
                    }}
                  />
                  <div className={`wallpaper-overlay ${activeOverlay === (100 + index) ? 'active' : ''}`}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(wallpaper.image, wallpaper.title);
                      }}
                      className="wallpaper-download-btn"
                    >
                      ⬇️ Baixar
                    </button>
                  </div>
                </div>
                <div className="wallpaper-info">
                  <h3 className="wallpaper-card-title">{wallpaper.title}</h3>
                  <p className="wallpaper-description">{wallpaper.description}</p>
                </div>
              </div>
            ))}
          </div>

          <button onClick={nextSlide} className="carousel-arrow carousel-arrow-right" aria-label="Próximo">
            ›
          </button>

          <div className="carousel-dots">
            {wallpapers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="wallpaper-footer">
          <p className="wallpaper-footer-text">
            ❤️ Compartilhe com outros fãs da Beqinha!
          </p>
        </div>
      </div>
    </div>
  );
}
