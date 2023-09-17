import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { CalendarOptions, EventSourceInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

import { fadeInPageTitle } from 'src/app/app-shared/animations/animations';

@Component({
  selector: 'app-online-bookings',
  templateUrl: './online-bookings.component.html',
  styleUrls: ['./online-bookings.component.css'],
  animations: [
    fadeInPageTitle
  ]
})
  
export class OnlineBookingsComponent implements OnInit {
  //[ ngSwitch tag]
  viewMode = 'defaultTab';

  clickedDate: any;
  clickedEvent: any;

 private _selectedDateEvents: any;

  constructor(private httpClient: HttpClient) { }
  ngOnInit() { 

  }

  calendarOptions: CalendarOptions = {

    timeZone: 'CAT',
    // themeSystem: 'bootstrap5',
    plugins: [dayGridPlugin, interactionPlugin, listPlugin],
    initialView: 'dayGridMonth',
    weekends: false,

    //Calendar header options
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,listWeek'
    },

    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    editable: true,
    droppable: true,
    handleWindowResize: true,
    // titleFormat: { year: 'numeric', month: 'long' },

    //Interactive Calendar dateClick
    dateClick: this.handleDateClick.bind(this),

    //Interactive Calendar eventClick
    eventClick: this.handleEventClick.bind(this),
 
    // /Calendar Events
    events: [
      {
        title: 'Mariah Smith', start: '2023-09-15T0900:00', end: '2023-09-15T1600:00',
            extendedProps: {
              workshopTopic: 'Responsive Web Design',
              description: 'Design the web UIs that are responsive to various browser platforms'
        },
        
      },
      {
        title: 'Solly Mahlangu', start: '2023-09-05T0900:00', end: '2023-09-05T1600:00',
        extendedProps: {
          workshopTopic: 'Developing SPA in Angular',
          description: 'Learn how to develop fast responsive applications that render dynamic contents with a single-page '
        }       
      },
        
      {
        title: 'Dave Crage', start: '2023-09-18T0800:00', end: '2023-09-20T1600:00',
      extendedProps: {
        workshopTopic: 'Intro to Web API',
        description: 'Learn how to develop your own RESTful Web API'
        }
      },
        
      {
        title: 'Luck Simelane', start: '2023-09-27T1400:00', end: '2023-09-29T1500:00',
        extendedProps: {
          workshopTopic: 'JWT Authentication',
          description: 'How to implement authentication in your application using JWT'
        }
      },

      {
        title: 'Belinda Masiya', start: '2023-09-12T10:00:00', end: '2023-09-16T1300:00',
        extendedProps: {
          workshopTopic: 'Intro to .NET MVC Core',
          description: 'Learn how to develop a complete application using MVC pattern'
        }
      },

      {
        title: 'Thabo Maleka', start: '2023-09-18T1100:00', end: '2023-09-18T1500:00' ,
        extendedProps: {
          workshopTopic: 'Angular Universal - SEO',
          description: 'Learn how to implement search engine optimisation in your angular app.'
        }
      },
    ],
    eventColor: 'orange',
    // contentHeight: 298
  };
  
  handleDateClick(_clickedDate: any) { 
    this.clickedDate = _clickedDate;
  }

  handleEventClick(_clickedEvent: any) {
    this.clickedEvent = _clickedEvent;
  }

}
