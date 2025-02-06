import { Component } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Storage } from '@ionic/storage-angular';
import { ThisReceiver } from '@angular/compiler';
import { DatabaseService, User } from '../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public id: number;
  public pokemon: any;
  users = this.database.getUsers();
  newUserName = '';

  constructor(
    private pokemonService: PokemonService,
    private storage: Storage,
    private database: DatabaseService,

  ) {
    this.id = 1;
    this.pokemon = null;
  }

  async ngOnInit() {
    await this.init();
  }

  // Create a storage
  async init() {
    await this.storage.create();

    this.saveSession('asdf');
  }
  // Save session data
  async saveSession(sessionData: any) {
    console.log('*********************');
    await this.storage.set('session', 'abc');
  }
  // Get session data
  async getSession() {
    return await this.storage.get('session');
  }
  // Clear session data
  async clearSession() {
    await this.storage.remove('session');
  }

  getPokemon() {
    this.id = 3;
    console.log('-------------------------------', this.getSession());
    // Obtenemos un pokemon dado su id
    this.pokemonService.doGetPost().then(pokemon => {
      // this.pokemon = pokemon;
      console.log(pokemon);
    })

    // this.users = this.userList;
    this.createUser();
    console.log(this.users);
    console.log('00000', this.userList);

  }
  get userList(): User[] {
    return this.users(); // Return the current value of the signal
  }
  async createUser() {
    this.newUserName = 'AAAA';
    await this.database.addUser(this.newUserName);
  }

}
