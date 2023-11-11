import { NgModule } from '@angular/core';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faCoffee, fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

@NgModule({
    declarations: [],
    imports: [FontAwesomeModule],
    exports: [FontAwesomeModule]
})

export class AppIconsModule {
    //for Font-Awesome to be accessible globally
    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas, far, fab);
        library.addIcons(faCoffee);
    }
}