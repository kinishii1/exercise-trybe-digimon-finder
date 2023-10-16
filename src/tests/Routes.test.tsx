import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('Testando o arquivo Routes.tsx', () => {
  it('Teste que a aplicação renderiza corretamente em seu estado inicial', async () => {
    const { user } = renderWithRouter(<App />);
    const title = screen.getByRole('heading', { name: /search digimon/i });
    expect(title).toBeInTheDocument();

    const linkAbout = screen.getByRole('link', { name: /about/i });
    const searchDigimon = screen.getByRole('link', { name: /search digimon/i });

    expect(linkAbout).toBeInTheDocument();
    expect(searchDigimon).toBeInTheDocument();

    await user.click(linkAbout);
    const aboutTitle = screen.getByRole('heading', { name: /about/i });
    expect(aboutTitle).toBeInTheDocument();
  });
  test('Teste se a aplicação é para pagina not found', () => {
    renderWithRouter(<App />, { route: '/pagina-que-nao-existe/' });

    const noMatch = screen.getByRole('heading', { name: /page not found/i });
    const noMatchMessage = screen.getByText(/A página que você está/i);
    const noMatchImage = screen.getByAltText(/Digimon nocauteado/i);

    expect(noMatch).toBeInTheDocument();
    expect(noMatchMessage).toBeInTheDocument();
    expect(noMatchImage).toBeInTheDocument();
  },
  );
});
