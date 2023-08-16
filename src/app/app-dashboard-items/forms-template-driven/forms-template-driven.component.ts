import { NgForm } from '@angular/forms';
import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { IDeveloper } from 'src/app/app-shared/models/ideveloper/ideveloper.component';
import { AngularFormsDataService } from 'src/app/app-shared/services/angular-forms-data.service';
import { NotificationService } from 'src/app/app-shared/toastr-notifications/notifications';
import { fadeInPageTitle } from 'src/app/app-shared/animations/animations';


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

  deleteTag = false;

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

  displayGithubBtn = true;

  messange: string = "";

  //submit button-mode tag
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
    private notifyService: NotificationService
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
  DeveloperData(thisDeveloper: IDeveloper) {

    //assign the clicked developer details to the form -controls
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
  DeleteSelectedDeveloper(thisDeveloper: IDeveloper) {

    if (confirm("Are you sure you want to delete " + thisDeveloper.firstName + "'s record?")) {

      //call the delete method if the user clicks 'Yes'
      this.developerService.DeleteDeveloper(thisDeveloper);

      this.isDeveloperDetails = false;

      //set toastr message
      this.messange = "Profile deleted successfully! ";
      this.showToasterSuccess();

      //reset values to default
      this.ResetToDefault();

      //Clear Developer object
      //this.ClearDetails(thisDeveloper)
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
  canExit(): boolean {
    if (this.myForm.dirty) {
      if (confirm("Are you sure you want to discard unsaved changes?")) {
        this.exit = true;
      }
      else {
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

