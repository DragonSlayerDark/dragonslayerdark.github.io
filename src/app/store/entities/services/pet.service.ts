import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pet, PetPayload } from '../models/pet.model';
import { Apollo, gql } from 'apollo-angular'
import {map} from 'rxjs';
import {EntityStrapi} from '../strapi_payload_entity'
import { PAWLLocalStorage } from 'src/app/exports/enums';

@Injectable({
  providedIn: 'root'
})
export class PetService {


  constructor(
    private http: HttpClient,
    private apollo: Apollo
  ) { }

  // getPets() {
  //   return this.http.get<PetPayload>(environment.server + '/api/pets?populate=*');
  // }

  getPets( userID: string | number){
    return this.apollo.query({
      query: gql`
      query{
  pets(filters: { user: { id :{contains: "${userID}"}
    }})
  {
    data{
      id
      attributes{
        name
        memorial
        fallecimiento
        photo{
          data{
            id
            attributes{
              name
              url
            }
          }
        }
        dob
        gender
        user{
          data{
            id
            attributes{
              email
            }
          }
        }
        pet_size
        pet_type{
          data{
            id
            attributes{
              name
            }
          }
        }
        pet_breed{
          data{
            id
            attributes{
              name
            }
          }
        }
        pet_second_breed{
          data{
            id
            attributes{
              name
            }
          }
        }
        vaccine_card{
          id
          vaccine_card{
          data{
            id
            attributes{
              name
            }
          }
        }
        }
        vaccine_history{
          id
          date
          license
        }
      }
    }
  }
}
      `}).pipe(map(x => x.data['pets']));
  }

  insertPet(pet, img:any) {
    const formData = new FormData();

    formData.append('data', JSON.stringify({
       ...pet
    }));

    formData.append('files.photo', img);

    return this.http.post<PetPayload>(environment.server + '/api/pets?populate=*',formData);
  }


  updatePet(pet, img:any){
    const formData = new FormData();

    formData.append('data', JSON.stringify({
      ...pet
    }));

    formData.append('files.photo', img);

    return this.http.put<PetPayload>(environment.server + `/api/pets/${pet.id}?populate=*`, formData);
  }

  deletePet(petId: string){
    return this.http.delete<PetPayload>(environment.server + `/api/pets/${petId}`);
  }

  setPet(petId:number, petTypeId: number){
    const currentPet = JSON.parse(localStorage.getItem(PAWLLocalStorage.SELECTED_PET));
    const petInfo = {
      petBreedId: currentPet.petBreedId,
      petTypeId: petTypeId,
      petSize: currentPet.petSize,
      dob: currentPet.dob,
      gender: currentPet.gender,
      name: currentPet.name
    };
    localStorage.setItem(PAWLLocalStorage.SELECTED_PET, JSON.stringify(petInfo) + "");
    localStorage.setItem('selectedPetID', petId + "");
    localStorage.setItem('selectedPetTypeID', petTypeId + "");
  }

}

