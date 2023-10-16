import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('Testando o arquivo Routes.tsx', () => {
  afterEach(() => vi.clearAllMocks());

  const MOCK_POKEMON = [
    {
      name: 'Agumon',
      img: 'https://digimon.shadowsmith.com/img/agumon.jpg',
      level: 'Rookie',
    },
  ];

  const MOCK_POKEMON_RESPONSE = {
    ok: true,
    status: 200,
    json: async () => MOCK_POKEMON,
  } as Response;

  const mockFetch = vi
    .spyOn(global, 'fetch')
    .mockResolvedValue(MOCK_POKEMON_RESPONSE);

  it('testando inserir valor na caixa de busca', async () => {
    const { user } = renderWithRouter(<App />);
    const input = screen.getByLabelText(/Digimon:/i);
    const button = screen.getByRole('button', { name: /search digimon/i });
    expect(input).toBeInTheDocument();

    await user.type(input, 'Agumon');
    await user.click(button);

    expect(mockFetch).toBeCalledTimes(1);
    const digimonName = screen.getByTestId(/digimonName/i);
    const digimonLevel = screen.getByText(/Level:/i);

    expect(digimonName).toBeInTheDocument();
    expect(digimonLevel).toBeInTheDocument();
    expect(digimonName).toHaveTextContent(/Agumon/i);
    expect(digimonLevel).toHaveTextContent(/Rookie/i);
  });
  it('retorna erro quando não encontra o digimon', async () => {
    const ErrorMsg = 'test is not a Digimon in our database.';
    global.fetch = vi.fn(() => Promise.resolve({
      json: () => Promise.resolve({ ErrorMsg }),
    }));

    const { user } = renderWithRouter(<App />);
    const input = screen.getByLabelText(/Digimon:/i);
    const button = screen.getByRole('button', { name: /search digimon/i });
    expect(input).toBeInTheDocument();

    await user.type(input, 'test');
    await user.click(button);

    const errorMessage = screen.getByText(
      /test is not a Digimon in our database./i,
    );

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent(
      /test is not a Digimon in our database./i,
    );
    expect(global.fetch).toBeCalledTimes(1);
  });
  it('nao realiza fetch quando o input é vazio', async () => {
    const { user } = renderWithRouter(<App />);
    const input = screen.getByLabelText(/Digimon:/i);
    const button = screen.getByRole('button', { name: /search digimon/i });
    expect(input).toBeInTheDocument();

    expect(input).toHaveValue('');
    await user.click(button);

    expect(mockFetch).toBeCalledTimes(0);
  });
});
