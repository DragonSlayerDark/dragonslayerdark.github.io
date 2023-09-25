import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PAWLLocalStorage } from 'src/app/exports/enums';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Pet } from 'src/app/store/entities/models/pet.model';
import { EntityStrapi } from 'src/app/store/entities/strapi_payload_entity';
import { AppService } from 'src/app/store/custom/services/app.service';
import { SharedService } from '../shared.service';
import { AppState } from 'src/app/store/app.state';
import { Store, select } from '@ngrx/store';
import { selectDewormerById } from 'src/app/store/entities/selectors/dewormer.selectors';
import { selectPetById } from 'src/app/store/entities/selectors/pet.selectors';
import { addDewormer, updateDewormersApplied } from 'src/app/store/entities/actions/dewormer.actions';
import { loadProductsById } from 'src/app/store/entities/actions/product.actions';
import { Product } from 'src/app/store/entities/models/product.model';
import { selectAllProducts } from 'src/app/store/entities/selectors/product.selectors';

@Component({
  selector: 'app-dewormer',
  templateUrl: './dewormer.component.html',
  styleUrls: ['./dewormer.component.scss']
})
export class DewormerComponent implements OnInit {
  id: string = localStorage.getItem(PAWLLocalStorage.SELECTED_PET_ID);
  dewormer$: Observable<any>;
  pet$: Observable<EntityStrapi<Pet>>;
  productsDewormer$: Observable<EntityStrapi<Product>[]>
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
  dewormeriD: any;
  applied: any;

  constructor(
    private store: Store<AppState>,
    private shared: SharedService,
    private App: AppService
  ) { }

  isDewormerApplied(vaccineId: number, vaccinesApplied: any[], vaccinesHistory: any[]) {
    let applied = false;
    let license = "N/A"
    let date = null;
    let product = null
    let history = []
    // Filter those vaccines that have null values
    vaccinesApplied = vaccinesApplied.filter(({ vaccine }) => vaccine !== null);
    vaccinesHistory = vaccinesHistory.filter(({ vaccine }) => vaccine !== null);
    vaccinesHistory.forEach((vaccine_history) => {
      if (vaccine_history.vaccine.id === vaccineId) {
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
        date = formattedDate
        if (vaccine_applied.license != null) {
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
    this.store.dispatch(loadProductsById({ pet_type_id: this.vaccinesId }));
    this.productsDewormer$ = this.store.select(selectAllProducts).pipe(
      map(products => {
        const filteredProducts = products.filter(product => {
          const subCategoryId = product.attributes.sub_category.data['id'];
          return subCategoryId === this.vaccinesId;
        });
        return filteredProducts;
      }),
    );


    this.dewormer$ = this.store.pipe(select(selectDewormerById(this.id)));
    this.pet$ = this.store.pipe(select(selectPetById(this.id)));
    this.store.dispatch(addDewormer({ petID: this.id }));
    this.today();
    this.App.onActivate();

  }

  getDate(vaccineID: string | number, remove: boolean) {

    // Save the vaccineID and remove flag for later use
    this.dewormeriD = vaccineID;
    this.applied = remove;
  }

  triggerUpdateVaccine(vaccineID: number) {
    this.dewormeriD = vaccineID

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
    this.updateDewormer(this.dewormeriD, this.applied);
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
      this.date = formattedDate
    }

    return formattedDate;
  }


  updateDewormer(vaccineID: string | number, remove: boolean) {
    if (!remove) {
      if (!this.date) {
        return this.shared.sendAlert('warning', 'Formulario Invalido', 'Por favor, verifique los campos');
      }
    }

    if (this.product === undefined || this.product === null) {
      this.product = 142
    }
    this.shared.sendConfirmation('info', 'Modificar cartilla', `¿Seguro que desea ${remove ? 'remover' : 'aplicar'} esta vacuna?`).then((result) => {
      if (result.isConfirmed) {
        let payload = {
          id: this.id,
          vaccineID,
          remove,
          productId:this.product,
          cedula:this.cedula,
          date: this.date,
          vaccine_card_id: JSON.parse(localStorage.getItem(PAWLLocalStorage.SELECTED_PET)).vaccineCardId
        };
        this.store.dispatch(updateDewormersApplied(payload));
      }
      // we reset the date so it will display todays date in the rest of inputs
      this.today();
      this.product = null
      this.cedula = null
      this.showDateInput= false
    });
  }

  setProductId() {
    if (this.petTypeId === '2') {
      this.vaccinesId = 10;
    } else if (this.petTypeId === '3') {
      this.vaccinesId = 8;
    }
    console.log(this.vaccinesId);
  }

  onSelectChange(event: any, vaccinesId: number) {
    this.product = event.target.value;
    console.log(this.product);
  }

  getCedula(index: number) {
    let cedulaInput = (<HTMLInputElement>document.getElementById(`cedula-${index}`)).value;
    this.cedula = cedulaInput;
    console.log(this.cedula);
  }

  dateInputToggle(index: number, remove: boolean) {
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


}
