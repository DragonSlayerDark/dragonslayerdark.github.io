import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pet } from '../../entities/models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class VaccineCardService {

  constructor(
    private http: HttpClient,
  ) { }

  getVaccineCard(id: string | number) {
    return this.http.get<any>(environment.server + `/api/pets/${id}`);
  }

  updateAppliedVaccine(id: string | number, vaccineID: string | number, remove: boolean = false, productId: string | number, cedula: string | number, date: string, vaccine_card_id: string | number) {
    return this.http.put<Pet>(environment.server + `/api/pets/${id}`, {
      verb: remove ? "remove_applied" : "add_applied",
      vaccineID,
      date: date,
      petID: id,
      productId,
      cedula,
      vaccine_card_id: vaccine_card_id
    });
  }
}
