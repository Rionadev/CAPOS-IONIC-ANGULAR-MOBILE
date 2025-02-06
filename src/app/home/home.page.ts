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
    this.pokemonService.getPokemon().then(async online_db => {
      // this.pokemon = pokemon;
      console.log(online_db.insert_data);
      if (online_db && online_db?.insert_data) {

        //addAttributes
        const res_attributes = await this.database.addAttributes(online_db.insert_data.attributes).then();
        await this.database.getTableData('attributes');
        
        // await this.database.getAttributes();


        //addbrands
        await this.database.addBrands(online_db.insert_data.brands);
        await this.database.getTableData('brands');

        //addCashes
        await this.database.addCashes(online_db.insert_data.cashes);
        await this.database.getTableData('cashes');
      }

    })



  }
  get userList(): User[] {
    return this.users(); // Return the current value of the signal
  }

  async createUser() {
    this.newUserName = 'AAAA';
    await this.database.addUser(this.newUserName);
  }

}
