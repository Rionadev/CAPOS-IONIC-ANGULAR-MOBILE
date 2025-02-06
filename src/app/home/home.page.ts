import { Component } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Storage } from '@ionic/storage-angular';
import { ThisReceiver } from '@angular/compiler';
import { DatabaseService, User } from '../services/database.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public id: number;
  public pokemon: any;
  password: string;
  users = this.database.getUsers();
  newUserName = '';

  constructor(
    private pokemonService: PokemonService,
    private storage: Storage,
    private database: DatabaseService,
    private toastController: ToastController,
    private router: Router

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

  async logIn() {
    /* this.http.post(`${this.apiUrl}/auth/login`,{password: this.newUser.password}).subscribe(
      async (response) => {
        // Handle successful login
        console.log('Login successful:', response);
        
        const toast = await this.toastController.create({
          message: 'Login successful!',
          duration: 2000,
          color: 'success'
        });
        toast.present();
      },
      async (error) => {
        // Handle login error
        console.error('Login failed:', error);
        
        const toast = await this.toastController.create({
          message: 'Login failed. Please try again.',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    ); */
  
  }

  home() {
    this.router.navigate(['/home']); // Navigate to the Sign In page
  }

  add(value:number) {
    this.password += value.toString();
  }

  back() {
    this.password = this.password.substring(0, this.password.length - 1);
  }
}
