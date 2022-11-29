import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  test(`Teste se página contém um heading h2 com o 
  texto Encountered pokémons.`, () => {
    renderWithRouter(
      <App>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />
      </App>,
    );
    const getText = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(getText).toBeInTheDocument();
  });
  test(`Teste se é exibido o próximo Pokémon da lista quando
   o botão Próximo pokémon é clicado.`, () => {
    renderWithRouter(
      <App>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />
      </App>,
    );
    const buttonNextPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });
    pokemons.forEach((_value, index) => {
      userEvent.click(buttonNextPokemon);
      const getCurrentPokemon = screen.getByText(
        pokemons[pokemons.length === index + 1 ? 0 : index + 1].name,
      );
      expect(getCurrentPokemon).toBeInTheDocument();
    });
  });
  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(
      <App>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />
      </App>,
    );
    const buttonAll = screen.getByRole('button', { name: /All/i });
    const buttonElectric = screen.getByRole('button', { name: /Electric/i });
    const buttonFire = screen.getByRole('button', { name: /Fire/i });
    const buttonBug = screen.getByRole('button', { name: /Bug/i });
    const buttonPoison = screen.getByRole('button', { name: /Poison/i });
    const buttonPsychic = screen.getByRole('button', { name: /Psychic/i });
    const buttonNormal = screen.getByRole('button', { name: /Normal/i });
    const buttonDragon = screen.getByRole('button', { name: /Dragon/i });

    expect(buttonAll).toBeInTheDocument();
    expect(buttonElectric).toBeInTheDocument();
    expect(buttonFire).toBeInTheDocument();
    expect(buttonBug).toBeInTheDocument();
    expect(buttonPoison).toBeInTheDocument();
    expect(buttonPsychic).toBeInTheDocument();
    expect(buttonNormal).toBeInTheDocument();
    expect(buttonDragon).toBeInTheDocument();
  });
  test(`A partir da seleção de um botão de tipo, a Pokédex deve circular somente
   pelos pokémons daquele tipo`, () => {
    renderWithRouter(
      <App>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />
      </App>,
    );
    const buttonElectric = screen.getByRole('button', { name: /Electric/i });
    userEvent.click(buttonElectric);
    const pikachu = screen.getByText(/pikachu/i);
    expect(buttonElectric).toBeInTheDocument();
    expect(pikachu).toBeInTheDocument();

    const buttonFire = screen.getByRole('button', { name: /Fire/i });
    userEvent.click(buttonFire);
    const charmander = screen.getByText(/Charmander/i);
    expect(buttonFire).toBeInTheDocument();
    expect(charmander).toBeInTheDocument();

    const buttonBug = screen.getByRole('button', { name: /Bug/i });
    userEvent.click(buttonBug);
    const caterpie = screen.getByText(/Caterpie/i);
    expect(buttonBug).toBeInTheDocument();
    expect(caterpie).toBeInTheDocument();

    const buttonPoison = screen.getByRole('button', { name: /Poison/i });
    userEvent.click(buttonPoison);
    const ekans = screen.getByText(/Ekans/i);
    expect(buttonPoison).toBeInTheDocument();
    expect(ekans).toBeInTheDocument();

    const buttonPsychic = screen.getByRole('button', { name: /Psychic/i });
    userEvent.click(buttonPsychic);
    const alakazam = screen.getByText(/Alakazam/i);
    expect(buttonPsychic).toBeInTheDocument();
    expect(alakazam).toBeInTheDocument();

    const buttonNormal = screen.getByRole('button', { name: /Normal/i });
    userEvent.click(buttonNormal);
    const snorlax = screen.getByText(/Snorlax/i);
    expect(buttonNormal).toBeInTheDocument();
    expect(snorlax).toBeInTheDocument();

    const buttonDragon = screen.getByRole('button', { name: /Dragon/i });
    userEvent.click(buttonDragon);
    const dragonair = screen.getByText(/Dragonair/i);
    expect(buttonDragon).toBeInTheDocument();
    expect(dragonair).toBeInTheDocument();
  });

  test('O botão All precisa estar sempre visível.', () => {
    renderWithRouter(
      <App>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />
      </App>,
    );
    const buttonAll = screen.getByRole('button', { name: /All/i });
    expect(buttonAll).toBeVisible();
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(
      <App>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />
      </App>,
    );
    const buttonAll = screen.getByRole('button', { name: /All/i });
    userEvent.click(buttonAll);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
    expect(buttonAll).toBeInTheDocument();
  });
  test('Testando tipos dos botões de filtro', () => {
    renderWithRouter(
      <App>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />
      </App>,
    );
    const testIdButtons = screen.getAllByTestId('pokemon-type-button');
    expect(testIdButtons).toBeDefined();
  });
});
