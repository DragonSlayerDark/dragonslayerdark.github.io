import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppModule } from 'src/app/app.module';
import { PAWLLocalStorage } from 'src/app/exports/enums';
import { SharedService, Swal3 } from 'src/app/modules/shared/shared.service';
import { deletePet, updatePet } from 'src/app/store/entities/actions/pet.actions';
import { Observable, filter } from 'rxjs'
import Swal from 'sweetalert2';
import { EntityStrapi } from 'src/app/store/entities/strapi_payload_entity';
import { ActivatedRoute, Router } from '@angular/router';
import { selectPetById } from 'src/app/store/entities/selectors/pet.selectors';
import { Pet } from 'src/app/store/entities/models/pet.model';
import { AppService } from '../../../../store/custom/services/app.service';

@Component({
  selector: 'app-delete-pet',
  templateUrl: './delete-pet.component.html',
  styleUrls: ['./delete-pet.component.scss']
})
export class DeletePetComponent implements OnInit {

  pet$: Observable<EntityStrapi<Pet>> = null
  res: boolean;

  petId= localStorage.getItem(PAWLLocalStorage.SELECTED_PET_ID);

  constructor(
    private store: Store<AppModule>,
    private shared: SharedService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private App: AppService
  ) { }

  ngOnInit(): void {
    this.App.onActivate();
    this.activeRoute.params.subscribe(({id}) => {
      this.pet$ = this.store.pipe(select(selectPetById(id)), filter((x) => x != null));
    })
  }

  deletePet(){



    this.shared.sendConfirmation('warning', 'Atencion', 'Esta mascota sera eliminada de forma permanente').then((res) => {
      if(res.isConfirmed){

        this.store.dispatch(deletePet({id: this.petId}));
      }else if(res.dismiss || res.isDenied){
        const Swal3=  Swal.mixin({
          customClass: {
            container: 'swalcontainer',
            popup: 'swalpopup',
            title: 'swaltitle',
            confirmButton: 'swalbutton swalaccept',
            cancelButton: 'swalbutton swalcnl',

          },
          buttonsStyling: false
        })
          Swal3.fire(
          'Eliminar cancelado'
        );
      }
    })


  }

  memorial(res){
    this.store.dispatch(updatePet({
      pet: {
        id: this.petId,
        memorial: res,
        fallecimiento: new Date()
      }
    }));
  }

  cancel(){
    this.router.navigate(['/my-pets', 'list'])
  }



}
