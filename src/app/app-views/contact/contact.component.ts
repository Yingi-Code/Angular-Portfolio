import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { fadeInPageTitle } from 'src/app/app-shared/animations/animations';
import { AlertNotificationsService } from 'src/app/app-shared/services/notifications/alerts/alert-notifications.service';
import { strValidator } from 'src/app/app-shared/validators/reactive-form-validators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations: [
    fadeInPageTitle
  ]
})
export class ContactComponent implements OnInit {

  contactForm!: FormGroup;
  exit: boolean = true;
  messange: string = "";

  subjects = [
    { id: 1, description: 'Services related query' },
    { id: 2, description: 'Request for service' },
    { id: 3, description: 'Generic customer query' }

  ];

  constructor(
    private alertsService: AlertNotificationsService) {
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
    this.contactForm.reset();
  }

  // ------------  caDeactivate Route Guard section -------------------
  async canExit(): Promise<boolean> {
    if (this.contactForm.dirty) {
      //pop-up confirmation alert if the form is incomplete
      if (await this.alertsService.deactivateConfirmation) {
        this.exit = true;
      } else {
        this.exit = false;
      }
    }
    return this.exit;
  }


}
