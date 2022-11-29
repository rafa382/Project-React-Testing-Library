import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <About.js />.', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const titleAboutPokedex = screen.getByText(/About Pokédex/i);
    const paragraph1 = screen.getByText(/This application simulates a Pokédex/i);
    const paragraph2 = screen.getByText(/One can filter Pokémons by type, and see /i);

    expect(titleAboutPokedex).toBeInTheDocument();
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });
  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    const aboutPokedex = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(aboutPokedex).toBeInTheDocument();
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    renderWithRouter(<About />);
    const img = screen.getByRole('img', { name: /Pokédex/i });
    const urlImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', urlImg);
  });
});
