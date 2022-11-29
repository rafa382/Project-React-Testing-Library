import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  test(`Teste se página contém um heading h2 com o texto Page 
  requested not found `, () => {
    renderWithRouter(<NotFound />);
    const textNotFound = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(textNotFound).toBeInTheDocument();
  });
  test('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByRole('img', {
      name: /Pikachu crying because the page requested was not found/i,
    });
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', url);
  });
});
