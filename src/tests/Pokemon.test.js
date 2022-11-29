import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';
import { Pokedex, Pokemon } from '../components';

describe('Teste o componente <Pokemon.js />', () => {
  test(`Teste se é renderizado um card com as informações
   de determinado pokémon.`, () => {
    renderWithRouter(
      <App>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />
      </App>,
    );
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonAverageWeight = screen.getByTestId('pokemon-weight');

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonAverageWeight).toBeInTheDocument();

    const imagePikachu = screen.getByRole('img', {
      name: /Pikachu sprite/i,
    });
    const urlPikachu = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    expect(imagePikachu).toBeInTheDocument();
    expect(imagePikachu).toHaveAttribute('src', urlPikachu);

    const buttonFire = screen.getByRole('button', { name: /Fire/i });
    userEvent.click(buttonFire);
    const imageCharmander = screen.getByRole('img', {
      name: /Charmander sprite/i,
    });

    const urlCharmander = 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png';

    expect(imageCharmander).toBeInTheDocument();
    expect(imageCharmander).toHaveAttribute('src', urlCharmander);

    const buttonBug = screen.getByRole('button', { name: /Bug/i });
    userEvent.click(buttonBug);
    const imageCaterpie = screen.getByRole('img', {
      name: /Caterpie sprite/i,
    });

    const urlCaterpie = 'https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png';

    expect(imageCaterpie).toBeInTheDocument();
    expect(imageCaterpie).toHaveAttribute('src', urlCaterpie);

    const buttonPoison = screen.getByRole('button', { name: /Poison/i });
    userEvent.click(buttonPoison);
    const imageEkans = screen.getByRole('img', {
      name: /Ekans sprite/i,
    });

    const urlEkans = 'https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png';

    expect(imageEkans).toBeInTheDocument();
    expect(imageEkans).toHaveAttribute('src', urlEkans);

    const buttonPsychic = screen.getByRole('button', { name: /Psychic/i });
    userEvent.click(buttonPsychic);
    const imageAlakazam = screen.getByRole('img', {
      name: /Alakazam sprite/i,
    });

    const urlAlakazam = 'https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png';

    expect(imageAlakazam).toBeInTheDocument();
    expect(imageAlakazam).toHaveAttribute('src', urlAlakazam);

    const buttonNormal = screen.getByRole('button', { name: /Normal/i });
    userEvent.click(buttonNormal);
    const imageSnorlax = screen.getByRole('img', {
      name: /Snorlax sprite/i,
    });

    const urlSnorlax = 'https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png';

    expect(imageSnorlax).toBeInTheDocument();
    expect(imageSnorlax).toHaveAttribute('src', urlSnorlax);

    const buttonDragon = screen.getByRole('button', { name: /Dragon/i });
    userEvent.click(buttonDragon);
    const imageDragonair = screen.getByRole('img', {
      name: /Dragonair sprite/i,
    });

    const urlDragonair = 'https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png';

    expect(imageDragonair).toBeInTheDocument();
    expect(imageDragonair).toHaveAttribute('src', urlDragonair);
  });

  test(`Teste se o card do Pokémon indicado na Pokédex contém um link de navegação
   para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>,
   onde <id> é o id do Pokémon exibido`, () => {
    renderWithRouter(
      <App>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />
      </App>,
    );
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    expect(detailsLink).toBeInTheDocument();
    const urlLink = '/pokemons/25';
    expect(detailsLink).toHaveAttribute('href', urlLink);
  });

  test('O tipo correto do pokémon deve ser mostrado na tela.', () => {
    renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite />,
    );
    const textType = screen.getByText(`${pokemons[0].type}`);
    expect(textType).toBeInTheDocument();
  });

  test(`Teste se ao clicar no link de navegação do Pokémon, é feito
   o redirecionamento da aplicação para a página de detalhes de Pokémon.`, () => {
    renderWithRouter(
      <App>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />
      </App>,
    );
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detailsLink);
    const summaryText = screen.getByText(/Summary/i);
    expect(summaryText).toBeInTheDocument();
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite />,
    );
    const starIcon = screen.getByRole('img',
      { name: `${pokemons[0].name} is marked as favorite` });
    const urlStar = '/star-icon.svg';
    expect(starIcon).toBeDefined();
    expect(starIcon).toHaveAttribute('src', urlStar);
  });
});
