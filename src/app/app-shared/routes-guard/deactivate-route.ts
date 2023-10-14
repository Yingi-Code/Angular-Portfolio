import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//CanDeactivate Interface
export interface IDeactivateComponent {
    canExit: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
    providedIn: 'root'
})

export class DeactivateRoute {

    //Implemented interface method [ canDeactivate ]
    public canDeactivate(component: IDeactivateComponent): Observable<boolean> | Promise<boolean> | boolean {
        return component.canExit();
    }

}
