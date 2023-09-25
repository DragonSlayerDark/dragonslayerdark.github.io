import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PetBreedPayload } from '../models/pet-breed.model';

@Injectable({
  providedIn: 'root'
})
export class PetBreedService {

  constructor(
    private http: HttpClient
  ) { }

  getBreeds(pet_type_id: string | number) {
    return this.http.get<PetBreedPayload>(environment.server + `/api/pet-breeds?populate=*&[filters][pet_type][id][]$eq]=${pet_type_id}&sort[1]=name&pagination[pageSize]=350`);
  }
}
