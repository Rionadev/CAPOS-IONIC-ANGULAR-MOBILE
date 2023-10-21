import { Component } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public id: number;
  public pokemon: any;

  constructor(private pokemonService: PokemonService) {
    this.id = 1;
    this.pokemon = null;
  }

  getPokemon() {
    // Obtenemos un pokemon dado su id
    this.pokemonService.getPokemon(this.id).then(pokemon => {
      this.pokemon = pokemon;
      console.log(pokemon);
    })
  }


}
