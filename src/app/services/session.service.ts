import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
    providedIn: 'root'
})

export class SessionService {

    constructor(
        private storage: Storage,
    ) {}

    async ngOnInit() {
        await this.init();
    }

    // Create a storage
    async init() {
        this.getSession("session").then(
            async (response) => {
                if (response == 'user')
                {
                    await this.storage.create();
                    await this.saveSession("session", 'user');
                }
        })
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
