import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente App.js', () => {
  test(`Teste se o topo da aplicação contém um conjunto
   fixo de links de navegação.`, () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /Home/i });
    const linkAbout = screen.getByRole('link', { name: /About/i });
    const linkFavoritePokemons = screen.getByRole('link',
      { name: /Favorite Pokémons/i });

    expect(linkHome).toBeDefined();
    expect(linkAbout).toBeDefined();
    expect(linkFavoritePokemons).toBeDefined();
  });

  test(`Teste se a aplicação é redirecionada para a página inicial, na 
  URL / ao clicar no link Home da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /Home/i });
    userEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
  });

  test(`Teste se a aplicação é redirecionada para a página de About, 
  na URL /about, ao clicar no link About da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /About/i });
    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });

  test(`Teste se a aplicação é redirecionada para a página de Pokémons Favoritados,
   na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    const linkFavoritePokemons = screen.getByRole('link',
      { name: /Favorite Pokémons/i });
    userEvent.click(linkFavoritePokemons);
    expect(history.location.pathname).toBe('/favorites');
  });

  test(`Teste se a aplicação é redirecionada para a página Not Found ao entrar em 
  uma URL desconhecida.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notFound');
    const notFound = screen.getByRole('heading',
      { level: 2, name: /Page requested not found/i });
    expect(notFound).toBeInTheDocument();
  });
});
