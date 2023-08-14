import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { fadeInPageTitle } from 'src/app/app-shared/animations/animations';
import { NotificationService } from 'src/app/app-shared/toastr-notifications/notifications';
import { strValidator } from 'src/app/app-shared/validators/validators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations: [
    fadeInPageTitle
  ]
})
export class ContactComponent implements OnInit  {

  contactForm!: FormGroup;
  exit: boolean = true;
  messange: string = "";
  
  subjects = [
    { id: 1, description: 'Services related query' },
    { id: 2, description: 'Request for service' },
    { id: 3, description: 'Generic customer query' }

  ];


  constructor(private notifyService: NotificationService) {
  }

  ngOnInit() {
    //Form object with form-control names
    this.contactForm = new FormGroup({
      firstName: new FormControl('', strValidator()),
      emailAddress: new FormControl('', [Validators.email, Validators.required]),
      subject: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
    });

  }

  //gets form-control with control-name [firstName]
  get firstName() {
    return this.contactForm.get('firstName');
  }
  //gets form-control with control-name [emailAddress]
  get emailAddress() {
    return this.contactForm.get('emailAddress');
  }
  //gets form-control with control-name [developerRole] from [project]
  get developerRole() {
    return this.contactForm.get('subject');
  }
  //gets form-control with control-name [developerRole] from [isSubscribed]
  get message() {
    return this.contactForm.get('message');
  }

  sendMessage() {
    //set toastr message
    this.messange = "Request was sent successfully";
    this.showToasterSuccess();
    this.contactForm.reset();
  }

  // ------------  caDeactivate Route Guard section -------------------
  canExit(): boolean {
    if (this.contactForm.dirty) {
      if (confirm("Are you sure you want to discard unsaved changes?")) {
        this.exit = true;
      }
      else {
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
