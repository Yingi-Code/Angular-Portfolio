import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//CanDeactivate Interface
export interface IDeactivateComponent {
    canExit: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
    providedIn: 'root'
})

/*
  - the DeactivateGuardService implements IDeactivateComponent
  - IDeactivateComponent observes the canExit() from the 
  - DeactivateGuardService is implemented in [ FormsTemplateDrivenComponent ] component
*/
export class DeactivateRoute {

    constructor() { }

    //Implemented interface method [ canDeactivate ]
    public canDeactivate(
        component: IDeactivateComponent
    ): Observable<boolean> | Promise<boolean> | boolean {
        return component.canExit ? component.canExit() : true;
    }

}
