import { Component,OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ConnectorProvider } from '../../providers/connector/connector';
/**
 * Generated class for the SuperadminPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-superadmin',
  templateUrl: 'superadmin.html',
})
export class SuperadminPage implements OnInit {
  users = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public connector:ConnectorProvider) {
  }
ngOnInit () {
  this.getUsers();
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad SuperadminPage');
  }
    getUsers() {
    this.connector.getUsers().subscribe
      (resdata => {
        this.users = resdata
        console.log(this.users);
      })
  }

}
