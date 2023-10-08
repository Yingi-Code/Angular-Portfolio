import { NgForm } from '@angular/forms';
import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AngularFormsDataService } from 'src/app/app-shared/services/angular-forms-service/angular-forms.service';
import { fadeInPageTitle } from 'src/app/app-shared/animations/animations';
import { IDeveloper } from 'src/app/app-shared/interfaces/ideveloper/ideveloper';

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
  displayDeveloperForm: boolean = true;

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
  formSubmitBtnMode: boolean = false;

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
    this.displayDeveloperForm = false;
  }

  //resets the form and its form-controls states
  @ViewChild('formData') theForm!: NgForm;
  ClearForm() {
    this.theForm.reset();
    this.formSubmitBtnMode == false;
    console.log('Clear fucntion executed...');
    console.log('buttun mode is = ' + this.formSubmitBtnMode);
  }

  get toggleFormDisplay() {
    return this.displayDeveloperForm = !this.displayDeveloperForm;
  }

  //sets values to default
  ResetToDefault() {
    this.objDeveloperDetails.firstName = '';
    this.objDeveloperDetails.emailAddress = '';
    this.objDeveloperDetails.project.developerRole = '';
    this.objDeveloperDetails.project.isSubscribed = false;
  }

  //Add new developer or update existing developer
  async Developer(formData: NgForm) {

      // check the button mode
    if (this.formSubmitBtnMode == false) {
        
      //take only four developers - for demo purpose
      if (this.developers?.length != 4) {
        if (await this.alertsService.addConfirmation) {
          //
          this.developerService.AddDeveloper(formData.value);
        }
       
      } else {
        //Pop-up toastr message , in case the developer array length reaches 4
        // this.messange = "Sorry, you reach your limit!";
        // this.showToasterError();
        
        await this.alertsService.addLimitErrorNotification;
      }

        //set create message
        // this.messange = "Profile created successfully! ";
        // this.showToasterSuccess();
        formData.reset();

    //button mode true = update for
    } else {
      
        //pop-up confirmation alert
      if (await this.alertsService.updateConfirmation) {

        //call the update method if the returned value is true'
        this.developerService.UpdateDeveloper(formData.value, this.developerIndex);

        //update the displayed developer details if same user
        if (this.objDeveloperDetails.emailAddress == formData.value.emailAddress) {
          this.objDeveloperDetails = formData.value;
        }

        formData.reset();
        //switch button mode to create
          this.formSubmitBtnMode = false;
        } else {

          //keep button mode as update
          this.formSubmitBtnMode = true;
        }
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
    this.formSubmitBtnMode = true;

    //display developer form
    this.displayDeveloperForm = true;
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

      //Clear the form if populated with the same item
      if (thisDeveloper.emailAddress == this.myForm.value.emailAddress) {
        this.myForm.reset();
      }

      //Clear developer details if deleting the same item
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

    if (this.myForm?.dirty) {

      //pop-up confirmation alert if the form is incomplete
      if (await this.alertsService.deactivateConfirmation) {
        this.exit = true;
      } else {
        this.exit = false;
      }
    }
    return this.exit;
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

