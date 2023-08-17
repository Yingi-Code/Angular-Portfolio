import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { IDeveloper } from 'src/app/app-shared/interfaces/developer/ideveloper.component';
import { AngularFormsDataService } from 'src/app/app-shared/services/angular-forms-service/angular-forms.service';
import { strValidator } from 'src/app/app-shared/validators/reactive-form-validators';
import { AlertNotificationsService } from 'src/app/app-shared/services/notifications/alerts/alert-notifications.service';
import { ToastrNotificationsService } from 'src/app/app-shared/services/notifications/toasts/toastr-notifications.service';
import { fadeInPageTitle } from 'src/app/app-shared/animations/animations';


@Component({
  selector: 'app-forms-reactive',
  templateUrl: './forms-reactive.component.html',
  styleUrls: ['./forms-reactive.component.css'],
  animations: [
    fadeInPageTitle
  ]
})
export class FormsReactiveComponent {

  //page title
  viewTitle = "Demonstrations";

  //[ ngSwitch tag]
  viewMode = 'defaultTab';

  //declare an array of [type] Developer object
  developers: IDeveloper[] = [];
  //Developer roles list
  developerRoles: any;
  //Reactive form
  developerForm!: FormGroup;

  //developer details object
  objDeveloperDetails: IDeveloper = {
    firstName: '',
    emailAddress: "",
    project: {
      isSubscribed: false,
      developerRole: "",
    },
  };

  //form properties
  developerIndex: any;
  displayGithubBtn = true;
  messange: string = "";
  //submit button switch-mode tag
  btnMode: boolean = false;
  //developer details tag
  isDeveloperDetails: boolean = false
  exit: boolean = true;

  //injects the istanace of formDataservice
  constructor(
    private developerService: AngularFormsDataService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private notifyService: ToastrNotificationsService,
    private alertsService: AlertNotificationsService

  ) { }


  //Loads the list of developers and list of roles
  ngOnInit(): void {
    this.developers = this.developerService.developers;
    this.developerRoles = this.developerService.roleList;
    this.ResetToDefault();

    //Form object with form-control names
    this.developerForm = new FormGroup({
      firstName: new FormControl('', strValidator()),
      emailAddress: new FormControl('', [Validators.email, Validators.required]),
      project: new FormGroup({
        developerRole: new FormControl('', Validators.required),
        isSubscribed: new FormControl(),
      })
    });
    //console.log(this.developerForm);
    this.onChanges()
  }

  //gets form-control with control-name [firstName]
  get firstName() {
    return this.developerForm.get('firstName');
  }

  //gets form-control with control-name [emailAddress]
  get emailAddress() {
    return this.developerForm.get('emailAddress');
  }

  //gets form-control with control-name [developerRole] from [project]
  get developerRole() {
    return this.developerForm.get('project.developerRole');
  }

  //gets form-control with control-name [developerRole] from [isSubscribed]
  get isSubscribed() {
    return this.developerForm.get('project.isSubscribed');
  }

  onChanges() {
    this.firstName?.valueChanges.subscribe(
      uname => {
        console.log('firstName changed:' + uname);
      }
    );
  }

  //resets the form and its form-controls states
  ClearForm() {
    this.developerForm.reset();
    this.btnMode == false;
  }

  //sets values to default
  ResetToDefault() {
    this.objDeveloperDetails.firstName = '';
    this.objDeveloperDetails.emailAddress = '';
    this.objDeveloperDetails.project.developerRole = '';
    this.objDeveloperDetails.project.isSubscribed = false;
  }

  //Add new developer or update existing developer
  Developer() {
    //take only four developers - for demo purpose
    if (this.developers?.length != 4) {

      // check the button mode
      if (this.btnMode == false) {
        //
        this.developerService.AddDeveloper(this.developerForm.value);

        //set create message
        // this.messange = "Profile created successfully! ";
        // this.showToasterSuccess();
        this.developerForm.reset();

      } else {
        if (confirm("Are you sure you want to save these changes?")) {
          this.developerService.UpdateDeveloper(this.developerForm.value, this.developerIndex);

          //log the form controls and their values
          //console.log(this.developerForm.value);

          this.developerForm.reset();

          // //set update message
          // this.messange = "Changes saved successfully! ";
          // this.showToasterSuccess();

          //switch button mode to create
          this.btnMode = false;
        } else {
          //keep button mode as update
          this.btnMode = true;
        }
      }
    } else {
      //Pop-up toastr message , in case the developer array length reaches 4
      // this.messange = "Sorry, you reach your limit!";
      // this.showToasterError();
    }
  }

  //populates details of the clicked developer
  populateDeveloperForm(thisDeveloper: IDeveloper) {

    //store selected developer array index
    this.developerIndex = this.developers.indexOf(thisDeveloper);

    this.developerForm.setValue({
      firstName: thisDeveloper.firstName,
      emailAddress: thisDeveloper.emailAddress,
      project: {
        developerRole: thisDeveloper.project.developerRole,
        isSubscribed: thisDeveloper.project.isSubscribed,
      }
    })
    //console.log(this.developerForm);
    this.btnMode = true;
  }

  //desplay the details of the developer
  DeveloperDetails(thisDeveloper: IDeveloper) {
    //assign an object of the retrived Developer to a new instance

    // this.objDeveloperDetails = {
    //   firstName: thisDeveloper.firstName,
    //   emailAddress: thisDeveloper.emailAddress,
    //   project: {
    //     developerRole: thisDeveloper.project.developerRole,
    //     isSubscribed: thisDeveloper.project.isSubscribed,
    //   }
    // };

    this.objDeveloperDetails = thisDeveloper;
    this.isDeveloperDetails = true;
    console.log(this.objDeveloperDetails);
  }

//deletes the developer and clear details view
  async DeleteSelectedDeveloper(thisDeveloper: IDeveloper) {

    //pop-up confirmation alert
    if (await this.alertsService.deleteConfirmation) {

      //call the delete method if the user clicks 'Yes'
      this.developerService.DeleteDeveloper(thisDeveloper);

      console.log(this.objDeveloperDetails);

      //Wipe this developer details container if seleted
      if (thisDeveloper == this.objDeveloperDetails) {
        this.isDeveloperDetails = false;
      }
    }
  }

 
  /* 
     - CanDeactivate method
     - Used by Deactivate-guard service
     - For confirmation before exiting the page
  */
  async canExit(): Promise<boolean> {
    if (this.developerForm.dirty) {

      //pop-up confirmation alert if the form is incomplete
      if (await this.alertsService.deactivateConfirmation) {
        this.exit = true;
      } else {
        this.exit = false;
      }
    }
    return this.exit;
  }

  //Reload the page
  refreshData() {
    location.reload();
  }

  // ------------  Toastr Notifications section -------------------
  // showToasterSuccess() {
  //   this.notifyService.showSuccess("", this.messange)
  // }

  // showToasterError() {
  //   this.notifyService.showError("", this.messange)
  // }

  // showToasterInfo() {
  //   this.notifyService.showInfo("", this.messange)
  // }

  // showToasterWarning() {
  //   this.notifyService.showWarning("", this.messange)
  // }


}
