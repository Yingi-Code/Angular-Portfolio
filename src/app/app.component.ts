import { Component, OnInit } from '@angular/core';

//for Angular Universal (SEC)
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = '';

  constructor(private metaTagService: Meta, private titleTagService: Title) { }
  ngOnInit() { 

    //Angular Universal - SEO Config
    this.titleTagService.setTitle(this.title);
    this.metaTagService.updateTag(
      {
        name: 'description',
        content: 'We assist our clients to comply with the Environmental Health and Safety legislation. We also assist our clients to comply with the Construction Health and Safety legislation. We do audits and TrainingS for Food Safety for various sectors, ranging from private to public.',
      });

    this.metaTagService.addTags([
      {
        name: 'keywords',
        content: 'Mabunda, Mabunda Group, MabundaGroup, Martin Mabunda, Ntsako Mabunda, Mabunda EHS, EHS, Mabunda OHS, Mabunda Food Safety, Mabunda Engineering, OHS, Engineering, Mabunda Group Engineering, Mabunda Group Engineering services, Mabunda Group telecoms, Mabunda Group fire, Mabunda Group fire services, Mabunda Environmental Health and Safety , Mabunda Environmental Health and Safety, Occupational Health and Safety, Construction Health and Safety , Mabunda Occupational Health and Safety, Occupational Health and Safety, Mabunda Construction Health and Safety, Health and Safety, Health and Safety Trainings,',
      },
      {
        name: 'robots',
        content: 'index, follow'
      },
      {
        name: 'author',
        content: 'K.M. Monakali'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        name: 'date',
        content: '2023-07-26',
        scheme: 'YYYY-MM-DD'
      },
      { charset: 'UTF-8' },
    ]);

  }
  
}
