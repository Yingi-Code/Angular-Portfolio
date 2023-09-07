import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  //property with two-way binding
  searchKeyward: string = "";

  //Create and declare event Emitter
  @Output()
  searchEvent: EventEmitter<string> = new EventEmitter<string>();


  onSearchTextChanged() {
    console.log('The function is executed...')
    this.searchEvent.emit(this.searchKeyward);
  }

}
