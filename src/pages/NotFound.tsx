import React from 'react';
import Header from '../components/Header';
import crying from '../images/crying_digimon.webp';
import '../styles/notFound.css';

function NotFound() {
  return (
    <>
      <Header />
      <h1>Page Not Found</h1>
      <div className="not-found-container">
        <p>
          { `A página que você está procurando
              não existe!` }
        </p>
        <img src={ crying } alt="Digimon nocauteado" />
      </div>
    </>
  );
}

export default NotFound;
