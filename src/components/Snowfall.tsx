'use client';

import { useEffect, useState } from 'react';
import '../styles/snowfall.css';

interface SnowflakeConfig {
  id: string;
  size: 'sm' | 'md' | 'lg';
  left: number;
  blur: number;
  flickrDuration: number;
  flickrDelay: number;
  fallDuration: number;
  fallDelay: number;
}

const Snowfall = () => {
  const [snowflakes, setSnowflakes] = useState<SnowflakeConfig[]>([]);

  useEffect(() => {
    const flakes: SnowflakeConfig[] = [];
    
    for (let i = 1; i <= 50; i++) {
      flakes.push({
        id: `sm-${i}`,
        size: 'sm',
        left: Math.random() * 120 - 20,
        blur: Math.random() * 2,
        flickrDuration: (Math.random() * 20 + 20) / 10,
        flickrDelay: Math.random() * -20 / 10,
        fallDuration: (Math.random() * 100 + 50) / 5,
        fallDelay: Math.random() * -100 / 5,
      });
    }
    
    for (let i = 1; i <= 20; i++) {
      flakes.push({
        id: `md-${i}`,
        size: 'md',
        left: Math.random() * 120 - 20,
        blur: Math.random() * 2,
        flickrDuration: (Math.random() * 20 + 20) / 10,
        flickrDelay: Math.random() * -20 / 10,
        fallDuration: (Math.random() * 100 + 50) / 5,
        fallDelay: Math.random() * -100 / 5,
      });
    }
    
    for (let i = 1; i <= 15; i++) {
      flakes.push({
        id: `lg-${i}`,
        size: 'lg',
        left: Math.random() * 120 - 20,
        blur: 0,
        flickrDuration: (Math.random() * 20 + 20) / 10,
        flickrDelay: Math.random() * -20 / 10,
        fallDuration: (Math.random() * 100 + 50) / 5,
        fallDelay: Math.random() * -100 / 5,
      });
    }
    
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="snowflake-area">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className={`snowflake snowflake-${flake.size}`}
          style={{
            left: `${flake.left}vw`,
            filter: `blur(${flake.blur}px)`,
            animation: `
              ${flake.flickrDuration}s flickr ${flake.flickrDelay}s infinite,
              ${flake.fallDuration}s fall ${flake.fallDelay}s infinite
            `,
          }}
        >
          ❄️
        </div>
      ))}
    </div>
  );
};

export default Snowfall;
