import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private http: HttpClient,
    private apollo: Apollo
  ) { }

  // getNotifications(id: number = 0){
  //   return this.apollo.query({
  //     query : gql`query getNotifications{
  //       notifications(
  //         filters: { user_id: {contains: ${id}}}
  //       ){
  //         data{
  //           id
  //           attributes {
  //             message
  //             type
  //             user_id
  //             Metadata
  //           }
  //         }
  //       }
  //     }`
  //   }).pipe(map(x => x.data['notifications'].data));
  // }

  getNotifications(id: number = 0){
    return this.http.get<any>(`${environment.server}/api/notifications?user_id=${id}`);
  }
}
