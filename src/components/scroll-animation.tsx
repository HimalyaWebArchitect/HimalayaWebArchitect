"use client";

import { useRef, useEffect, useState } from 'react';

type ScrollAnimationProps = {
  children: React.ReactNode;
  className?: string;
};

export function ScrollAnimation({ children, className }: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1,
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={`${className || ''} scroll-fade-in ${isVisible ? 'is-visible' : ''}`}
    >
      {children}
    </div>
  );
}
