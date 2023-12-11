import usePhotoLoad from './usePhotoLoad';
import { useState, useRef, useCallback } from 'react';
import styles from './app.module.css';
import LOADER from './assets/loader.svg';

function App() {
  const [isVisible, setIsVisible] = useState(true);
  const { loading, error, photos } = usePhotoLoad(isVisible);

  const observer = useRef();

  const lastPhotoRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <>
      <header>
        <h1 className={styles.heading}>Unsplash api - infinite scroll</h1>
      </header>
      <main className={styles.imageContainer}>
        {photos.map((photo, index) => {
          if (photos.length === index + 1) {
            return (
              <a key={index} href={photo.links.html}>
                <img
                  ref={lastPhotoRef}
                  src={photo.urls.regular}
                  alt={photo.alt_description}
                  title={photo.alt_description}
                />
              </a>
            );
          } else {
            return (
              <a key={index} href={photo.links.html}>
                <img
                  src={photo.urls.regular}
                  alt={photo.alt_description}
                  title={photo.alt_description}
                />
              </a>
            );
          }
        })}

        <div className={styles.loader}>
          {loading && <img src={LOADER} alt='Loading...' />}
        </div>
        <div>{error && <h1>Error!</h1>}</div>
      </main>
    </>
  );
}

export default App;
