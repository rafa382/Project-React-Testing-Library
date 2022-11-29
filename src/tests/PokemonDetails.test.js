import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';
import Pokedex from '../components/Pokedex';

describe('Teste o componente <PokemonDetails.js />', () => {
  test(`A página deve conter um texto <name> Details,
   onde <name> é o nome do Pokémon;`, () => {
    renderWithRouter(
      <App>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />
      </App>,
    );
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    const pokemonDetailsTitle = screen.getByRole('heading',
      {
        level: 2,
        name: /Pikachu Details/i,
      });
    expect(pokemonDetailsTitle).toBeInTheDocument();
  });
  test(`Não deve existir o link de navegação para os 
  detalhes do Pokémon selecionado.`, () => {
    renderWithRouter(
      <App>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />
      </App>,
    );
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    expect(detailsLink).not.toBeInTheDocument();
  });
  test('A seção de detalhes deve conter um heading h2 com o texto Summary.', () => {
    renderWithRouter(
      <App>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />
      </App>,
    );
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    const summaryText = screen.getByRole('heading', { level: 2, name: /Summary/i });
    expect(summaryText).toBeInTheDocument();
  });
  test(`A seção de detalhes deve conter um parágrafo com o resumo do Pokémon
   específico sendo visualizado.`, () => {
    renderWithRouter(
      <App>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />
      </App>,
    );
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    const paragraphPokemon = screen.getByText(/This intelligent Pokémon roasts/i);
    expect(paragraphPokemon).toBeInTheDocument();
  });
  test(`Na seção de detalhes deverá existir um heading h2 com o texto Game Locations
   of <name>; onde <name> é o nome do Pokémon exibido.`, () => {
    renderWithRouter(
      <App>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />
      </App>,
    );
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    const gameLocationsText = screen.getByRole('heading', {
      level: 2,
      name: /Game Locations of Pikachu/i,
    });
    expect(gameLocationsText).toBeInTheDocument();
  });
  test(`Todas as localizações do Pokémon devem ser mostradas 
  na seção de detalhes`, () => {
    renderWithRouter(
      <App>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />
      </App>,
    );
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    const location1 = screen.getByText(/Kanto Viridian Forest/i);
    const location2 = screen.getByText(/Kanto Power Plant/i);
    expect(location1).toBeInTheDocument();
    expect(location2).toBeInTheDocument();
  });
  test(`A imagem da localização deve ter um atributo src
   com a URL da localização`, () => {
    renderWithRouter(
      <App>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />
      </App>,
    );
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    const imagesLocations = screen.getAllByRole('img', { name: /Pikachu location/i });
    const urlImageLocation1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const urlImageLocation2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    expect(imagesLocations).toBeDefined();
    expect(imagesLocations[0]).toHaveAttribute('src', urlImageLocation1);
    expect(imagesLocations[1]).toHaveAttribute('src', urlImageLocation2);
  });
  test('A página deve exibir um checkbox que permite favoritar o Pokémon', () => {
    renderWithRouter(
      <App>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />
      </App>,
    );
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
    const favPokemonsLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favPokemonsLink).toBeInTheDocument();
    userEvent.click(favPokemonsLink);
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
  test('verificação para remover pokemons da lista de favoritos', () => {
    renderWithRouter(
      <App>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />
      </App>,
    );
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(checkbox.checked).toEqual(false);
    const favPokemonsLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favPokemonsLink).toBeInTheDocument();
    userEvent.click(favPokemonsLink);
    const notFound = screen.getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });
});

describe('Teste o componente <PokemonDetails.js /> - Parte 2', () => {
  test('O label do checkbox deve conter o texto Pokémon favoritado?', () => {
    renderWithRouter(
      <App>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />
      </App>,
    );
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    const labelTextCheckbox = screen.getByLabelText('Pokémon favoritado?', {
      selector: 'input',
    });
    expect(labelTextCheckbox).toBeInTheDocument();
  });
});
