import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { filter, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { addVaccineCard, updateVaccinesApplied } from 'src/app/store/entities/actions/vaccine-card.actions';
import { selectVaccineCardByPetId } from 'src/app/store/entities/selectors/vaccine-card.selectors';
import { Pet } from 'src/app/store/entities/models/pet.model';
import { EntityStrapi } from 'src/app/store/entities/strapi_payload_entity';
import { selectPetById } from 'src/app/store/entities/selectors/pet.selectors';
import { SharedService } from '../shared.service';
import { AppService } from '../../../store/custom/services/app.service';
import { Product } from 'src/app/store/entities/models/product.model';
import { loadProductsById, loadVaccineProducts } from 'src/app/store/entities/actions/product.actions';
import { selectAllProducts } from 'src/app/store/entities/selectors/product.selectors';
import { FormControl } from '@angular/forms';
import { PAWLLocalStorage } from 'src/app/exports/enums';

@Component({
  selector: 'app-vaccine-card',
  templateUrl: './vaccine-card.component.html',
  styleUrls: ['./vaccine-card.component.scss'],
})
export class VaccineCardComponent implements OnInit {
  @Input() id: string;
  vaccineCard$: Observable<any>;
  pet$: Observable<EntityStrapi<Pet>>;
  productsVaccines$: Observable<EntityStrapi<Product>[]>;
  faCheckCircle = faCheckCircle;

  petTypeId = JSON.parse(localStorage.getItem(PAWLLocalStorage.SELECTED_PET)).petTypeId;
  showDateInput = false;
  vaccinesId: number;
  date: any;
  operador: boolean = false;
  activeTab: string = 'tab1';
  product: string | number;
  cedula: any;
  selectedVaccineIndex: number | null = null;


  vaccineId: any;
  applied: any;


  constructor(
    private store: Store<AppState>,
    private shared: SharedService,
    private App: AppService
  ) { }

  isVaccineApplied(vaccineId: number, vaccinesApplied: any[], vaccinesHistory: any[]) {
    let applied = false;
    let license = "N/A"
    let date = null;
    let product = null
    let history = []
    // Filter those vaccines that have null values
    vaccinesApplied = vaccinesApplied.filter(({ vaccine }) => vaccine !== null);
    vaccinesHistory = vaccinesHistory.filter(({vaccine}) => vaccine !== null);
    vaccinesHistory.forEach((vaccine_history) =>{
      if (vaccine_history.vaccine.id === vaccineId){
        history.push({
          id: vaccine_history.id,
          date: vaccine_history.date,
          license: vaccine_history.license,
          product: vaccine_history.product.name,
          vaccine: vaccine_history.vaccine.name,
        });
      }
    })
    vaccinesApplied.forEach((vaccine_applied) => {
      if (vaccine_applied.vaccine.id === vaccineId) {
        applied = true;
        // date = new Date(vaccine_applied.date).toLocaleDateString();
        const dateNew = new Date(vaccine_applied.date);
        const isoString = dateNew.toISOString();
        const parts = isoString.split('T')[0].split('-');
        const formattedDate = `${parts[1]}/${parts[2]}/${parts[0]}`;
        date= formattedDate
        if (vaccine_applied.license != null){
          license = vaccine_applied.license
        }
        if (vaccine_applied.product != null) {
          product = vaccine_applied.product

        }
      }
    });
    return {
      applied,
      date,
      license,
      history,
      product
    }
  }

  ngOnInit(): void {
    this.setProductId();
    this.store.dispatch(loadProductsById({pet_type_id: this.vaccinesId}));

    this.productsVaccines$ = this.store.select(selectAllProducts).pipe(
      map(products => {
        return products.filter(product => {
          const subCategoryId = product.attributes.sub_category.data['id'];
          return subCategoryId === this.vaccinesId;
        });
      }),
    );

    this.vaccineCard$ = this.store.pipe(select(selectVaccineCardByPetId(this.id)));
    this.pet$ = this.store.pipe(select(selectPetById(this.id)));
    this.store.dispatch(addVaccineCard({ petID: this.id }));
    this.today();
    this.App.onActivate();

  }


  getDate(vaccineID: string | number, remove: boolean) {

    // Save the vaccineID and remove flag for later use
    this.vaccineId = vaccineID;
    this.applied = remove;
  }

  triggerUpdateVaccine(vaccineID: number) {
    this.vaccineId = vaccineID
    // Get the selected date from the input element
    const dateInput = (<HTMLInputElement>document.getElementById("date"));
    const selectedDate = new Date(dateInput.value);

    // Get the current date
    const currentDate = new Date();

    // Check if the selected date is in the future
    if (selectedDate > currentDate) {
      this.shared.sendAlert('warning', 'Fecha Inválida', 'Seleccione una fecha pasada.');
      return;
    }

    // Proceed with the update
    this.date = dateInput.value;
    this.updateVaccine(this.vaccineId, this.applied);
  }

  today(): string {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let formattedDate = '';
    if (month < 10) {
      formattedDate = year + '-0' + month + '-' + day;
      this.date = formattedDate
    } else {
      formattedDate = year + '-' + month + '-' + day;
      this.date=formattedDate
    }

    return formattedDate;
  }

  updateVaccine(vaccineID: string | number, remove: boolean) {
    if(!remove) {
      if (!this.date) {
        return this.shared.sendAlert('warning', 'Formulario Invalido', 'Por favor, verifique los campos');
      }
    }

    if(this.product === undefined || this.product === null){
      this.product = 142
    }
    console.log(this.cedula);

    this.shared.sendConfirmation('info', 'Modificar cartilla', `¿Seguro que desea ${remove ? 'remover' : 'aplicar'} esta vacuna?`).then((result) => {
      if (result.isConfirmed) {
        let payload = {
          id: this.id,
          vaccineID,
          remove,
          productId: this.product,
          cedula: this.cedula,
          date: this.date,
          vaccine_card_id: JSON.parse(localStorage.getItem(PAWLLocalStorage.SELECTED_PET)).vaccineCardId
        };
        this.store.dispatch(updateVaccinesApplied(payload));
        console.log(payload);

      }
      // we reset the date so it will display todays date in the rest of inputs
      this.today();
      this.product = null
      this.cedula = null
      this.showDateInput = false
    });
  }

  setProductId() {
    if (this.petTypeId === '2') {
      this.vaccinesId = 9;
    } else if (this.petTypeId === '3') {
      this.vaccinesId = 7;
    }
    console.log(this.vaccinesId);
  }

  onSelectChange(event: any, vaccinesId: number) {
    this.product = event.target.value
    console.log(this.product);

  }

  getCedula(index: number){
    let cedulaInput = (<HTMLInputElement>document.getElementById(`cedula-${index}`)).value
    this.cedula = cedulaInput
    console.log(this.cedula);
  }

  dateInputToggle(index: number, remove: boolean) {

    this.productsVaccines$.subscribe((products: any[]) => {
      console.log('Products in productsVaccines:', products);
    });

    if (this.showDateInput === true) {
      this.showDateInput = false;
    } else if (this.showDateInput === false) {
      this.date = this.today();
      this.showDateInput = true;
      this.selectedVaccineIndex = index;
      this.applied = remove;
      console.log(this.date, this.vaccinesId, this.selectedVaccineIndex, this.applied);
    }
  }


  cancelInput(event?: MouseEvent) {
  if (event) {
    const clickedElement = event.target as HTMLElement;
    const divElement = document.getElementById('vaccine-input-container');

    if (divElement && divElement.contains(clickedElement)) {
      event.stopPropagation();
      return;
    }
  }

  this.showDateInput = false;
}


  loadProductsOnSwitchBack(){
    this.store.dispatch(loadProductsById({ pet_type_id: this.vaccinesId }));
    this.productsVaccines$ = this.store.select(selectAllProducts).pipe(
      map(products => {
        return products.filter(product => {
          const subCategoryId = product.attributes.sub_category.data['id'];
          return subCategoryId === this.vaccinesId;
        });
      }),
    );
  }




}
