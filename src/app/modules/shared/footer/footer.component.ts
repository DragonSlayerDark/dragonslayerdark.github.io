import { Component, OnInit } from '@angular/core';
import { PAWLLocalStorage } from 'src/app/exports/enums';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  selectedPetIDRoute: string = localStorage.getItem(PAWLLocalStorage.SELECTED_PET_ID) != null ? '/my-pets/vaccine-card/' + localStorage.getItem(PAWLLocalStorage.SELECTED_PET_ID) : '/my-pets';

  ICONS = [
    {
      src: 'assets/pawprint.svg',
      route: '/my-pets/list',
      label: 'Mascota'
    },
    {
      src: 'assets/Grupo 1248.svg',
      route: this.selectedPetIDRoute,
      label: 'Vacunas'
    },
    {
      src: 'assets/Grupo 1249.svg',
      route: '/shop/products',
      label: 'Tienda'
    },

    {
      src: 'assets/icons/notifications.svg',
      route: '/profile/notifications',
      label: 'Notificaciones'
    },
    {
      src: 'assets/Grupo 1246.svg',
      route: '/profile',
      label: 'Usuario'
    },
  ]

  activeIconIndex: number = -1;

  constructor() { }

  ngOnInit(): void {
  }

  setActiveIcon(index: number) {
    this.activeIconIndex = index;
  }


}
