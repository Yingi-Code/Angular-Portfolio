import { Injectable, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertNotificationsService implements OnInit {
  ngOnInit() {

  }
 
  get addLimitErrorNotification() {
    return Swal.fire({
      icon: 'error',
      title: 'Sorry! you reached your list limit.',
      showConfirmButton: false,
      timer: 3000
    });
  }

  get addConfirmation() {
    return Swal.fire({
      title: 'Confirm!',
      text: 'Are you sure you want to add this item?',
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonText: ' Yes ',
      cancelButtonText: ' No ',

    }).then((result) => {
      if (result.value) {
        return Swal.fire({
          icon: 'success',
          title: 'Created successfully',
          showConfirmButton: false,
          timer: 3000
        });
      } else {
        return null;
      }

    });
  }

  get deleteConfirmation() {
    return Swal.fire({
      title: 'Confirm!',
      text: 'Are you sure you want to remove this item?',
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonText: ' Yes ',
      cancelButtonText: ' No ',

    }).then((result) => {
      if (result.value) {
        return Swal.fire({
          icon: 'success',
          title: 'Deleted successfully',
          showConfirmButton: false,
          timer: 3000
        });
      }  else {
        return null;
      }
      
    });
  }

  get updateConfirmation() {
    return Swal.fire({
      title: 'Confirm!',
      text: 'Are you sure you want to apply these changes?',
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonText: ' Yes ',
      cancelButtonText: ' No ',

    }).then((result) => {
      if (result.value) {
        return Swal.fire({
          icon: 'success',
          title: 'Updapted successfully',
          showConfirmButton: false,
          timer: 3000
        });
      } else {
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