import { Component, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, ViewController } from 'ionic-angular';

import { Camera } from 'ionic-native';
import {PersonListPage} from "../person-list/person-list";
import {OrganizationListPage} from "../organization-list/organization-list";
import {DealService} from "../../app/services/DealService";
import {HttpW} from "../../app/services/httpw";

/*
  Generated class for the ItemCreate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html',
    providers : [
        HttpW,
        DealService
    ]
})
export class ItemCreatePage {
  @ViewChild('fileInput') fileInput;
  isReadyToSave: boolean;
  item: any;
  stage : any;
  title : any;
  value : any;
  organization : any = {
      name : undefined,
      id : undefined
  };
  person : any = {
      name : undefined,
      id : undefined
  };
  form: FormGroup;
  constructor(
      public navCtrl: NavController,
      public viewCtrl: ViewController,
      formBuilder: FormBuilder,
      public _dealService : DealService
  ) {
    this.form = formBuilder.group({
      profilePic: [''],
      name: ['', Validators.required],
      about: ['']
    });
    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }


  save(){
      this._dealService.add(this.getValues())
          .then((res) => {
            this.navCtrl.pop();
          })
          .catch(err => {
              console.error(err);
          })

  }
  getValues(){
      return {
          title : this.title,
          value : this.value,
          person_id : this.person.id,
          org_id : this.organization.id,
          stage_id : this.stage
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
  fetchOrganization(){
      this.navCtrl.push(OrganizationListPage, {
          mode : 'return',
          resolve : (item) => {
              this.organization = item;
          }
      });
  }
  ionViewDidLoad() {

  }

  getPicture() {
    if (Camera['installed']()) {
      Camera.getPicture({
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' +  data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let input = this.fileInput.nativeElement;

    var reader = new FileReader();
    reader.onload = (readerEvent) => {
      input.parentNode.removeChild(input);

      var imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    if(!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }
}
