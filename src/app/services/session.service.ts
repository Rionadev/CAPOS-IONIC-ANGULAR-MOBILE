import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
    providedIn: 'root'
})

export class SessionService {

    constructor(
        private storage: Storage,
    ) {
       this.storage.create();
    }

    async isLoggedIn () {
        const user = await this.getSession("session");
        return false;//return user == 'user';
    }

    async logOut() {
        this.clearSession('session');
    }
    
    async loggedIn()
    {
        await this.saveSession("session", 'user');
    }
    // Save session data
    async saveSession(key:string, value:string) {
        await this.storage.set(key, value);
    }
    // Get session data
    async getSession(key:string) {
        return await this.storage.get(key);
    }
    // Clear session data
    async clearSession(key:string) {
        await this.storage.remove(key);
    }
}
