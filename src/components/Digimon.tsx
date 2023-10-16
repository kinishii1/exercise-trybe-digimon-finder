import '../styles/digimon.css';

type DigimonProps = {
  digimon: {
    name: string,
    level: string,
    img: string,
  },
  error: string,
};

function Digimon({ digimon, error }: DigimonProps) {
  if (error) {
    return (<section>{error}</section>);
  }

  return (
    <section>
      <h2 data-testid="digimonName">{digimon.name}</h2>
      <p>{`Level: ${digimon.level}`}</p>
      <img src={ digimon.img } alt={ digimon.name } />
    </section>
  );
}

export default Digimon;
