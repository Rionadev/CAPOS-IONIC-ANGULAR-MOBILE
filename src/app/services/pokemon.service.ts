import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions, HttpResponse } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  getPokemon(id: number){

    // Opciones
    const options: HttpOptions = {
      url: 'https://pokeapi.co/api/v2/pokemon/' + id,
      params: {} // necesario para android
    }

    // Hacemos la peticion a la pokeapi
    return CapacitorHttp.get(options).then( (response: HttpResponse) => {
      return response.data;
    })

  }


}
