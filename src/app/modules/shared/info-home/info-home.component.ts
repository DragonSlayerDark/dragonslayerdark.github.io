import { Component, OnInit } from '@angular/core';
import { PAWLLocalStorage } from 'src/app/exports/enums';

@Component({
  selector: 'app-info-home',
  templateUrl: './info-home.component.html',
  styleUrls: ['./info-home.component.scss']
})
export class InfoHomeComponent implements OnInit {
selectedPetIDRoute: string = localStorage.getItem(PAWLLocalStorage.SELECTED_PET_ID) != null ? '/my-pets/vaccine-card/' + localStorage.getItem(PAWLLocalStorage.SELECTED_PET_ID) : '/my-pets';

  INFO = [
    {
      img: 'assets/Grupo 1253.svg',
      title: 'Cartilla Vacunación',
      info: 'Lleva el control de la salud de tu mascota mediante el registro de vacunas, medicina preventiva y desparasitantes.',
      color: '#5CCBC2',
      route: this.selectedPetIDRoute
    },
    {
      img: 'assets/tienda-home.svg',
      title: 'Tienda Pawl',
      info: 'Obtén los mejores productos y promociones en todo lo necesario para cuidar y consentir a tus mascotas.',
      color: '#009DE0',
      route: ['/shop']
    },
    {
      img: 'assets/pedidos-home.svg',
      title: 'Seguimiento Pedidos',
      info: 'Revisa tu listado de todos los pedidos de compras realizados para cada una de tus mascotas ',
      color: '#AC79AF',
      route: ['/shop/orders']
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
