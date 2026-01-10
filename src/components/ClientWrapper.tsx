'use client';

import { useState, useEffect } from 'react';
import Loading from './Loading';

interface ClientWrapperProps {
  children: React.ReactNode;
}

const ClientWrapper = ({ children }: ClientWrapperProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <Loading onLoadingComplete={handleLoadingComplete} />
      ) : (
        <div className="content-fade-in">
          {children}
        </div>
      )}
    </>
  );
};

export default ClientWrapper;
