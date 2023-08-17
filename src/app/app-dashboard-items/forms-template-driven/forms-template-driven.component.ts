import { NgForm } from '@angular/forms';
import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AngularFormsDataService } from 'src/app/app-shared/services/angular-forms-service/angular-forms.service';
import { fadeInPageTitle } from 'src/app/app-shared/animations/animations';
import { IDeveloper } from 'src/app/app-shared/interfaces/developer/ideveloper.component';

//Toastr alert notifications - not being used for now
import { ToastrNotificationsService } from 'src/app/app-shared/services/notifications/toasts/toastr-notifications.service';

//sweet alert2 pop-up notifications
import { AlertNotificationsService } from 'src/app/app-shared/services/notifications/alerts/alert-notifications.service';


@Component({
  selector: 'app-forms-template-driven',
  templateUrl: './forms-template-driven.component.html',
  styleUrls: ['./forms-template-driven.component.css'],
  animations: [
    fadeInPageTitle
  ]
})
  
export class FormsTemplateDrivenComponent implements OnInit {
  @ViewChild('formData') private myForm!: NgForm;

  //[ ngSwitch tag]
  viewMode = 'defaultTab';

  //declare an array of [type] Developer object
  developers: IDeveloper[] = [];

  //form properties
  developerName = "";
  developerEmail = "";
  developerSubscription = false;
  developerRole = "";

  developerRoles: any;
  developerIndex: any;

  objDeveloperDetails: IDeveloper = {
    firstName: '',
    emailAddress: "",
    project: {
      isSubscribed: false,
      developerRole: "",
    },
  };

  //Toastr messages
  messange: string = "";

  //submit button-mode tag
  btnMode: boolean = false;

  //developer details tag
  isDeveloperDetails: boolean = false

  //CanDeactivate
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
  }

  //resets the form and its form-controls states
  @ViewChild('formData') theForm!: NgForm;
  ClearForm() {
    this.theForm.reset();
    this.btnMode == false;
    console.log('Clear fucntion executed...');
    console.log('buttun mode is = ' + this.btnMode);
  }

  //sets values to default
  ResetToDefault() {
    this.objDeveloperDetails.firstName = '';
    this.objDeveloperDetails.emailAddress = '';
    this.objDeveloperDetails.project.developerRole = '';
    this.objDeveloperDetails.project.isSubscribed = false;
  }

  //Add new developer or update existing developer
  Developer(formData: NgForm) {
    //take only four developers - for demo purpose
    if (this.developers?.length != 4) {

      // check the button mode
      if (this.btnMode == false) {
        //
        this.developerService.AddDeveloper(formData.value);

        //set create message
        this.messange = "Profile created successfully! ";
        this.showToasterSuccess();
        formData.reset();

      } else {
        if (confirm("Are you sure you want to save these changes?")) {
          this.developerService.UpdateDeveloper(formData.value, this.developerIndex);

          //log the form controls and their values
          console.log(formData.value);

          formData.reset();
          //set update message
          this.messange = "Changes saved successfully! ";
          this.showToasterSuccess();
          //switch button mode to create
          this.btnMode = false;
        } else {

          //keep button mode as update
          this.btnMode = true;
        }
      }
    } else {
      //Pop-up toastr message , in case the developer array length reaches 4
      this.messange = "Sorry, you reach your limit!";
      this.showToasterError();
    }
  }

  //populates details of the clicked developer
  populateDeveloperForm(thisDeveloper: IDeveloper) {

    //store selected developer array index
    this.developerIndex = this.developers.indexOf(thisDeveloper);

    this.developerName = thisDeveloper.firstName;
    this.developerEmail = thisDeveloper.emailAddress;
    this.developerSubscription = thisDeveloper.project.isSubscribed;
    this.developerRole = thisDeveloper.project.developerRole;

    //change buttom mode to 'Update' once form-controls are populated
    this.btnMode = true;
  }

  //desplay the details of the developer
  DeveloperDetails(thisDeveloper: IDeveloper) {
    //assign an object of the retrived Developer to a new instance
    this.objDeveloperDetails = thisDeveloper;
    this.isDeveloperDetails = true;
    //console.log(this.objDeveloperDetails);
  }

  //deletes the developer and clear details view
  async DeleteSelectedDeveloper(thisDeveloper: IDeveloper) {

    //pop-up confirmation alert
    if (await this.alertsService.deleteConfirmation) {

      //call the delete method if the user clicks 'Yes'
      this.developerService.DeleteDeveloper(thisDeveloper);

      //Wipe this developer details container if seleted
      if (thisDeveloper == this.objDeveloperDetails) {
        this.isDeveloperDetails = false;
      }
    }
  }

  //whipes the details object when the object gets deleted
  ClearDetails(thisDeveloper: IDeveloper) {
    if (this.objDeveloperDetails == thisDeveloper) {
      // this.objDeveloperDetails = null;
    }
  }
  /* 
     - CanDeactivate method
     - Used by Deactivate-guard service
     - For confirmation before exiting the page
  */
  async canExit(): Promise<boolean> {

    if (this.myForm.dirty) {

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
  showToasterSuccess() {
    this.notifyService.showSuccess("", this.messange)
  }

  showToasterError() {
    this.notifyService.showError("", this.messange)
  }

  showToasterInfo() {
    this.notifyService.showInfo("", this.messange)
  }

  showToasterWarning() {
    this.notifyService.showWarning("", this.messange)
  }


}

