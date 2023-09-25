import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { Observable, map } from 'rxjs';
import { EntityStrapi } from 'src/app/store/entities/strapi_payload_entity';
import { Commercial } from 'src/app/store/entities/models/commercial.model';
import { loadCommercials } from 'src/app/store/entities/actions/commercial.actions';
import { selectAllCommercials } from 'src/app/store/entities/selectors/commercial.selectors';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-advertising',
  templateUrl: './advertising.component.html',
  styleUrls: ['./advertising.component.scss'],
  animations:[
    trigger('fade', [
      transition('void => *', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
      transition('* => void', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]),
    ])
  ]
})
export class AdvertisingComponent implements OnInit {

  current = 0;
  commercials$: Observable<EntityStrapi<Commercial>[]>;
  items = [1,2,3];
  img_list = [
    'https://picsum.photos/600/400/?image=0',
    'https://picsum.photos/600/400/?image=1',
    'https://picsum.photos/600/400/?image=2',
  ];



  constructor(
    private store:Store<AppState>
  ) {
    this.commercials$ = this.store.pipe(select(selectAllCommercials));

   }

  ngOnInit(): void {
    this.store.dispatch(loadCommercials());



    // setInterval(() => {
    //   this.current = ++this.current % this.img_list.length;
    //   console.log(this.current)
    // }, 2000);

  }

  imgurlarry(){
    // this.commercials$.pipe(map(x =>  x.id ))

  }



}
