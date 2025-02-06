import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions, HttpResponse } from '@capacitor/core';
import { environment } from '../../environments/environment';
import { from, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private apiUrl = environment.apiUrl;

    login(password: string) {
        const options: HttpOptions = {
            url: `${this.apiUrl}/auth/login`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                password: password, // Send the password in the request body
                status: 'Admin'
            }
        };

        return CapacitorHttp.post(options);
    }
}
