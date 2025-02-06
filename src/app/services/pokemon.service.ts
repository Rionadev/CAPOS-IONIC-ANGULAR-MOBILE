import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions, HttpResponse } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  getPokemon() {

    // Opciones
    const options: HttpOptions = {
      url: `http://192.168.149.211:3000/api/util/get_all_data`,
      // url: `https://admin.caposgt.com/api/util/get_all_data`,

      params: { private_web_address: 'onestore' } // necesario para android
    }

    // Hacemos la peticion a la pokeapi
    return CapacitorHttp.get(options).then((response: HttpResponse) => {
      return response.data;
    })

  }
  doGetPost() {
    const options: HttpOptions = {
      url: `http://192.168.149.211:3000/api/util/get_all_data`,

      // url: `http://192.168.149.211:3000/api/auth/login`,
      // params: { password: '1', status: 'Admin' } // necesario para android
    }

    // Hacemos la peticion a la pokeapi
    return CapacitorHttp.get(options).then((response: HttpResponse) => {
      return response.data;
    })
  }

}
