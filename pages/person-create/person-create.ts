import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {PersonService} from "../../app/services/PeopleService";
import {OrganizationListPage} from "../organization-list/organization-list";

/*
  Generated class for the PersonCreate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-person-create',
  templateUrl: 'person-create.html',
  providers : [
      PersonService
  ]
})
export class PersonCreatePage {

  phone : any;
  email : any;
  organization : any = {
    name : undefined,
    id : undefined
  };
  name : string;
  constructor(
      public navCtrl: NavController,
      public _personService : PersonService
  ) {}


  save(){
    this._personService.add(this.getValues())
        .then((res) => {
          this.navCtrl.pop();
        })
        .catch(err => {
          console.error(err);
        })

  }
  getValues(){
    return {
      name : this.name,
      email : this.email ? [this.email] : undefined,
      phone : this.phone ? [this.phone] : undefined,
      org_id : this.organization.id,
    }
  }
  fetchOrganization(){
    this.navCtrl.push(OrganizationListPage, {
      mode : 'return',
      resolve : (item) => {
        this.organization = item;
      }
    });
  }

}
