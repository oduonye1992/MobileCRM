import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ActivityService} from "../../app/services/ActivityService";
import {ListMasterPage} from "../list-master/list-master";
import {PersonListPage} from "../person-list/person-list";
import {OrganizationListPage} from "../organization-list/organization-list";

/*
  Generated class for the ActivityCreate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-activity-create',
  templateUrl: 'activity-create.html',
    providers : [
        ActivityService
    ]
})
export class ActivityCreatePage {
    organization : any = {
        name : undefined,
        id : undefined
    };
    deal : any = {
        name : undefined,
        id : undefined
    };
    person : any = {
        name : undefined,
        id : undefined
    };
    due_date : any;
    subject : any;
    due_time : any;
    done : any;
    type : any;
    constructor(
        public navCtrl: NavController,
        public _service : ActivityService
    ) {}
    save(){
        this._service.add(this.getValues())
            .then((res) => {
                this.navCtrl.pop();
            })
            .catch(err => {
                console.error(err);
            })
    }
    getValues(){
        return {
            subject : this.subject,
            person_id : this.person.id,
            org_id : this.organization.id,
            deal_id : this.deal.id,
            due_date : this.due_date,
            due_time : this.due_time,
            done : this.done,
            type : this.type
        }
    }
    fetchPerson(){
        this.navCtrl.push(PersonListPage, {
            mode : 'return',
            resolve : (item) => {
                this.person = item;
            }
        });
    }
    fetchDeal(){
        this.navCtrl.push(ListMasterPage, {
            mode : 'return',
            resolve : (item) => {
                this.deal = item;
            }
        });
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
