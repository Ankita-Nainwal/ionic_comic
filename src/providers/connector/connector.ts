import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable'


/*
  Generated class for the ConnectorProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ConnectorProvider {

private urlusers: string = "http://192.168.14.189:2001/api//v1/users";

  constructor(public http: Http) {
    console.log('Hello ConnectorProvider Provider');

  }

  getUsers() {
  //   this.JWT= localStorage.getItem('token')
  //      console.log(this.JWT)
  //      let headers = new Headers();
  //  headers.append('Content-Type', 'application/json')
  //  headers.append('Authorization', 'Bearer '+ this.JWT )
  //  let options = new RequestOptions({ headers: headers });
    return this.http.get(this.urlusers)
      .map((res: Response) => res.json())

  }

postuser(user): Observable<any> {
    console.log(user,"ser")

    // this.JWT= localStorage.getItem('token')
    //    console.log(this.JWT)
    //    let headers = new Headers();
    // headers.append('Content-Type', 'application/json')
    // headers.append('Authorization', 'Bearer '+ this.JWT )
    // let options = new RequestOptions({ headers: headers });
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    //  let options = new RequestOptions({ headers: headers });
    return this.http.post(this.urlusers, user)
      .map(res => res.json())

  }

}
