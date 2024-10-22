import React, { useRef, useEffect } from 'react';
import { Poster_6, Poster_7, Poster_8, Poster_9, Poster_11 , Poster_12 , Poster_13  } from '../assets/icons';

function AdverstingContainer() {
  const scrollContainerRef = useRef(null);

  const posters = [Poster_6, Poster_7, Poster_8, Poster_9, Poster_11 , Poster_12 , Poster_13];
  const infinitePosters = [...posters, ...posters];
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const scrollSpeed = 1;
    let scrollAmount = 0;

    const startAutoScroll = () => {
      if (scrollContainer) {
        scrollAmount += scrollSpeed;
        scrollContainer.scrollLeft = scrollAmount;

        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0;
          scrollContainer.scrollLeft = scrollAmount;
        }

        requestAnimationFrame(startAutoScroll);
      }
    };

    startAutoScroll();

    return () => {
      scrollAmount = 0;
    };
  }, []);

  return (
    <section className="adversting-container">
      <div>
        <h3>Why choose AXA?</h3>
        <p>Choose AXA Assurance for unparalleled security and comprehensive coverage tailored to your needs.</p>
      </div>
      <div
        ref={scrollContainerRef}
      >
        {infinitePosters.map((poster, index) => (
          <img
            key={index}
            src={poster}
            alt={`Poster ${index}`}
          />
        ))}
      </div>
    </section>
  );
}

export default AdverstingContainer;
