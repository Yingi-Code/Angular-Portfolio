import { Injectable, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertNotificationsService implements OnInit {
  ngOnInit() {
    console.log('Life Cyle Hook with spontaneous response.');
  }
  tinyAlert() {
    Swal.fire('Hey there!');
  }
  get successNotification() {
   return Swal.fire('Hi', 'We have been informed!', 'success');
  }
  get deleteConfirmation() {
    return Swal.fire({
      title: 'Confirm!',
      text: 'Are you sure you want to remove this record?',
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonText: ' Yes ',
      cancelButtonText: ' No ',

    }).then((result) => {
      if (result.value) {
        return Swal.fire('Removed!', 'Developer record removed successfully.', 'success');
      }  else {
        return null;
      }
      
    });
  }

  get deactivateConfirmation() {
    return Swal.fire({
      title: 'Confirm!',
      text: 'Are you sure you want to discard unsaved changes?',
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonText: ' Yes ',
      cancelButtonText: ' No ',

    }).then((result) => {
      if (result.value) {
        return true;
      } else {
        return false;
      }

    });
  }
}