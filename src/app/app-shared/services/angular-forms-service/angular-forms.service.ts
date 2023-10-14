import { Injectable } from '@angular/core';
import { IDeveloper } from '../../interfaces/ideveloper/ideveloper';


@Injectable({
  providedIn: 'root'
})
export class AngularFormsDataService {

  constructor() { }

  //Array list of Drop-down items
  roleList = [
    { id: 1, name: 'Angular UI Developer' },
    { id: 2, name: '.NET MVCDeveloper' },
    { id: 3, name: ' React UI Developer' },
    { id: 4, name: '.NET Web API Developer' },
  ];

  //Instantiate the Developer interface
  developer: IDeveloper = {
    firstName: '',
    emailAddress: "",
    project: {
      isSubscribed: false,
      developerRole: this.roleList[0].name,
    },
  };

  //Array of [ Developers ] objects
  developers = [
    { firstName: 'Jonh', emailAddress: "jsmith@wixs.co.za", project: { isSubscribed: false, developerRole: this.roleList[0].name } },
    { firstName: 'Belinda', emailAddress: "belindav@telkom.co.za", project: { isSubscribed: false, developerRole: this.roleList[3].name } },
    { firstName: 'Thabo', emailAddress: "tmasiya@gibbs.co.za", project: { isSubscribed: true, developerRole: this.roleList[2].name } }
  ];

  //Pushs the new developer object into developers array list
  AddDeveloper(newDeveloper: IDeveloper) {
    this.developers.push(
      {
        firstName: newDeveloper.firstName,
        emailAddress: newDeveloper.emailAddress,
        project: {
          isSubscribed: newDeveloper.project.isSubscribed,
          developerRole: newDeveloper.project.developerRole
        }
      }
    );
  }

  //update developer AtIndexOf(developerIndex) with the newly submitted developer
  UpdateDeveloper(changedRecord: IDeveloper, developerIndex: number) {
    //patches or sets valus for developer at the index of 'developerIndex' in the developers array
    this.developers[developerIndex] = changedRecord;
  }

  //Delete developer from the array
  DeleteDeveloper(selectedDeveloper: any) {
    //Removes the developer at the index of 'developerIndex' in the developers array
    let index = this.developers.indexOf(selectedDeveloper);
    this.developers.splice(index, 1);
  }
}
