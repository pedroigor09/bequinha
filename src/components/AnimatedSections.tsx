'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import SplitType from 'split-type';
import Book from './Book';
import WallpaperModal from './WallpaperModal';
import FloatingIcon from './FloatingIcon';
import Confetti from './Confetti';
import '../styles/buttons.css';
import '../styles/comments.css';
import '../styles/wallpaper.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Observer);
}

const sections = [
  {
    id: 'hero',
    title: 'A Mãe que Inspira',
    subtitle: 'Rebeca, Melinda e Melissa • <br class="mobile-br"/> Amor em dose tripla',
    image: '/beq1.jpg',
    bgPosition: 'center 8%',
  },
  {
    id: 'love',
    title: 'Corações Conquistados',
    subtitle: 'Não são apenas seguidores, <br class="mobile-br"/> é uma família que te admira',
    image: '/beq2.jpg',
    bgPosition: 'center 45%',
  },
  {
    id: 'energy',
    title: 'A Luz da Bahia',
    subtitle: 'O sorriso que ilumina <br class="mobile-br"/> nosso feed todo dia',
    image: '/beq3.jpg',
    bgPosition: 'center 30%',
  },
  {
    id: 'mels',
    title: 'O Mundo das Mel\'s',
    subtitle: 'Acompanhar o crescimento delas <br class="mobile-br"/> é o nosso maior presente',
    image: '/beq6.jpg',
    bgPosition: 'center 35%',
  },
  {
    id: 'mom-life',
    title: 'Maternidade Real',
    subtitle: 'Mostrando que ser mãe <br class="mobile-br"/> é equilibrar amor, caos e beleza',
    image: '/beq5.jpg',
    bgPosition: 'center 35%',
  },
  {
    id: 'inspiration',
    title: 'Nossa Inspiração',
    subtitle: 'Obrigado por compartilhar <br class="mobile-br"/> sua vida e alegria conosco',
    image: '/beq4.jpg',
    bgPosition: 'center 10%',
  },
  {
    id: 'community',
    title: 'De Fã para Ídolo',
    subtitle: 'Um cantinho feito com carinho <br class="mobile-br"/> para exaltar você',
    image: '/beq7.jpg',
    bgPosition: 'center 30%',
  },
  {
    id: 'final',
    title: 'Voa, Beqinha!',
    subtitle: 'O mundo é pequeno <br class="mobile-br"/> para o tamanho do seu brilho',
    image: '/beq8.jpg',
    bgPosition: 'center 25%',
  },
];

export default function AnimatedSections() {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentIndexRef = useRef(-1);
  const animatingRef = useRef(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isWallpaperOpen, setIsWallpaperOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const sectionElements = gsap.utils.toArray<HTMLElement>('.section');
    const images = gsap.utils.toArray<HTMLElement>('.bg');
    const headings = gsap.utils.toArray<HTMLElement>('.section-heading');
    const subtitles = gsap.utils.toArray<HTMLElement>('.section-subtitle');
    const outerWrappers = gsap.utils.toArray<HTMLElement>('.outer');
    const innerWrappers = gsap.utils.toArray<HTMLElement>('.inner');

    const splitHeadings = headings.map(
      (heading) => new SplitType(heading, { types: 'chars,words,lines' })
    );

    const splitSubtitles = subtitles.map(
      (subtitle) => new SplitType(subtitle, { types: 'chars' })
    );

    const wrap = gsap.utils.wrap(0, sectionElements.length);

    gsap.set(sectionElements[0], { autoAlpha: 1, zIndex: 1 });
    gsap.set(sectionElements.slice(1), { autoAlpha: 0 });
    gsap.set(outerWrappers, { yPercent: 100 });
    gsap.set(innerWrappers, { yPercent: -100 });
    gsap.set([outerWrappers[0], innerWrappers[0]], { yPercent: 0 });

    function gotoSection(index: number, direction: number) {
      index = wrap(index);
      animatingRef.current = true;

      const fromTop = direction === -1;
      const dFactor = fromTop ? -1 : 1;

      const tl = gsap.timeline({
        defaults: { duration: 1.25, ease: 'power1.inOut' },
        onComplete: () => {
          animatingRef.current = false;
        },
      });

      if (currentIndexRef.current >= 0) {
        gsap.set(sectionElements[currentIndexRef.current], { zIndex: 0 });
        tl.to(images[currentIndexRef.current], { yPercent: -15 * dFactor }).set(
          sectionElements[currentIndexRef.current],
          { autoAlpha: 0 }
        );
      }

      gsap.set(sectionElements[index], { autoAlpha: 1, zIndex: 1 });

      tl.fromTo(
        [outerWrappers[index], innerWrappers[index]],
        {
          yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor),
        },
        {
          yPercent: 0,
        },
        0
      )
        .fromTo(
          images[index],
          { yPercent: 15 * dFactor },
          { yPercent: 0 },
          0
        )
        .fromTo(
          splitHeadings[index].chars,
          {
            autoAlpha: 0,
            yPercent: 150 * dFactor,
          },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 1,
            ease: 'power2',
            stagger: {
              each: 0.02,
              from: 'random',
            },
          },
          0.2
        )
        .fromTo(
          splitSubtitles[index].chars,
          {
            autoAlpha: 0,
            yPercent: 100 * dFactor,
          },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.8,
            ease: 'power2',
            stagger: {
              each: 0.01,
            },
          },
          0.4
        );

      currentIndexRef.current = index;
      setCurrentSection(index);
    }

    Observer.create({
      type: 'wheel,touch,pointer',
      wheelSpeed: -1,
      onDown: () => !animatingRef.current && gotoSection(currentIndexRef.current - 1, -1),
      onUp: () => !animatingRef.current && gotoSection(currentIndexRef.current + 1, 1),
      tolerance: 10,
      preventDefault: true,
    });

    setTimeout(() => {
      gsap.fromTo(
        splitHeadings[0].chars,
        {
          autoAlpha: 0,
          yPercent: 150,
        },
        {
          autoAlpha: 1,
          yPercent: 0,
          duration: 1,
          ease: 'power2',
          stagger: {
            each: 0.02,
            from: 'random',
          },
        }
      );
      
      gsap.fromTo(
        splitSubtitles[0].chars,
        {
          autoAlpha: 0,
          yPercent: 100,
        },
        {
          autoAlpha: 1,
          yPercent: 0,
          duration: 0.8,
          ease: 'power2',
          stagger: {
            each: 0.01,
          },
        }
      );
      
      currentIndexRef.current = 0;
      setCurrentSection(0);
    }, 100);

    return () => {
      splitHeadings.forEach((split) => split.revert());
      splitSubtitles.forEach((split) => split.revert());
    };
  }, []);

  return (
    <div ref={containerRef}>
      <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-end px-8 py-6 text-white md:px-12">
        <a
          href="https://www.instagram.com/bequinha/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-white/10 px-6 py-2 text-sm font-medium backdrop-blur-md transition-all hover:bg-white/20"
        >
          @BEQUINHA
        </a>
      </header>

      {sections.map((section, index) => (
        <section
          key={section.id}
          className="section fixed left-0 top-0 h-screen w-screen invisible"
        >
          <div className="outer h-full w-full overflow-hidden">
            <div className="inner h-full w-full overflow-hidden">
              <div
                className="bg absolute left-0 top-0 flex h-full w-full items-center justify-center"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.1) 100%), url(${section.image})`,
                  backgroundPosition: section.bgPosition,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  WebkitBackfaceVisibility: 'hidden',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)',
                  willChange: 'transform',
                }}
              >
                {section.id === 'love' && (
                  <div className="comment-polaroids">
                    <div className="comment-polaroid" style={{ '--rotate-start': '-8deg', '--rotate-end': '-12deg', '--delay': '0s' } as React.CSSProperties}>
                      <div className="polaroid-paper">
                        <div className="comment-content">
                          <div className="comment-header">
                            <div className="profile-pic">❤️</div>
                            <span className="username">@mariasouza</span>
                          </div>
                          <p className="comment-text">"Você é a mãe que todas nós admiramos! Inspiração pura 💖"</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="comment-polaroid" style={{ '--rotate-start': '12deg', '--rotate-end': '15deg', '--delay': '1s' } as React.CSSProperties}>
                      <div className="polaroid-paper">
                        <div className="comment-content">
                          <div className="comment-header">
                            <div className="profile-pic">🌟</div>
                            <span className="username">@juliana.dias</span>
                          </div>
                          <p className="comment-text">"Chorei vendo o vídeo com as meninas. Que família abençoada! 😭💕"</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="comment-polaroid" style={{ '--rotate-start': '5deg', '--rotate-end': '8deg', '--delay': '2s' } as React.CSSProperties}>
                      <div className="polaroid-paper">
                        <div className="comment-content">
                          <div className="comment-header">
                            <div className="profile-pic">✨</div>
                            <span className="username">@carolina_love</span>
                          </div>
                          <p className="comment-text">"Você me ensina tanto sobre ser mãe. Obrigada por compartilhar sua vida! 🙏"</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="comment-polaroid" style={{ '--rotate-start': '-15deg', '--rotate-end': '-18deg', '--delay': '0.5s' } as React.CSSProperties}>
                      <div className="polaroid-paper">
                        <div className="comment-content">
                          <div className="comment-header">
                            <div className="profile-pic">💫</div>
                            <span className="username">@amandasilva</span>
                          </div>
                          <p className="comment-text">"Essa mulher é luz! As Mel's são muito sortudas de ter uma mãe assim 🥰"</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="comment-polaroid" style={{ '--rotate-start': '-6deg', '--rotate-end': '-9deg', '--delay': '1.5s' } as React.CSSProperties}>
                      <div className="polaroid-paper">
                        <div className="comment-content">
                          <div className="comment-header">
                            <div className="profile-pic">🌸</div>
                            <span className="username">@bianca.santos</span>
                          </div>
                          <p className="comment-text">"Não aguento de amor por essa família! Vocês são especiais demais 💗"</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="relative z-10 text-center">
                  <h2 className="section-heading mb-4 max-w-[90vw] text-[clamp(2.5rem,8vw,9rem)] font-bold leading-[1.1] text-white sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
                    {section.title}
                  </h2>
                  <p 
                    className="section-subtitle mx-auto max-w-[85vw] px-4 text-[clamp(1.1rem,4vw,1.875rem)] font-light leading-relaxed tracking-wide text-white/90 sm:text-xl md:text-2xl lg:text-3xl"
                    dangerouslySetInnerHTML={{ __html: section.subtitle }}
                  />
                  
                  {section.id === 'mels' && (
                    <button
                      onClick={() => {
                        console.log('Botão clicado!');
                        setIsBookOpen(true);
                        console.log('Estado setado para true');
                      }}
                      className="shine-button button-sunset mt-8"
                    >
                      Diário da Mel
                    </button>
                  )}
                  {section.id === 'community' && (
                    <button
                      onClick={() => setIsWallpaperOpen(true)}
                      className="shine-button button-emerald mt-8"
                    >
                      Baixar Wallpapers 🎁
                    </button>
                  )}
                  {section.id === 'final' && (
                    <a
                      href="https://www.instagram.com/p/DS-E8zsjmwp/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shine-button button-sunset mt-8 inline-block"
                    >
                      Deixar um comentário de carinho ❤️
                    </a>
                  )}
                </div>

                {index === 0 && (
                  <div className="absolute bottom-10 z-10 flex flex-col items-center gap-2 text-white">
                    <span className="text-sm font-light uppercase tracking-widest">
                      Scroll
                    </span>
                    <div className="h-12 w-0.5 animate-pulse bg-white/50" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      <Book isOpen={isBookOpen} onClose={() => setIsBookOpen(false)} />
      <WallpaperModal isOpen={isWallpaperOpen} onClose={() => setIsWallpaperOpen(false)} />
      <FloatingIcon currentSection={currentSection} />
      {currentSection === 7 && <Confetti />}
    </div>
  );
}
