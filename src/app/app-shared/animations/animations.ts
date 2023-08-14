import { trigger, state, style, animate, transition, AnimationTriggerMetadata, query, group } from '@angular/animations';

export let fadeInPageTitle: AnimationTriggerMetadata = trigger(
  // first para - trigger name
  'fadeInPageTitle', [

  //second para - state and transitions
    transition(':enter', [
    state('in', style({ opacity: 1 })),
    group([
      //the first animation - to he applied on H4 within this HTML section
      query('h1', [
        style({ transform: 'translateY(-40px)'}),
        animate(800)
      ]),

      query('.page-title-description', [
        style({ opacity: 0 }),
        animate(4000)
      ]),

      //the second animation - to he applied on H4 within this HTML section
      query('.social-buttons-aligner', [
        style({ transform: 'translateY(30px)' }),
        animate(800)
      ]),
    ])
  ])
])

export let fadeInFeaturedImaged: AnimationTriggerMetadata = trigger(
  // first para - trigger name
  'fadeInFeaturedImaged', [

  //second para - state and transitions in an array-format
    transition(':enter', [
    //array key - 1
      state('in', style({ opacity: 1 })),
    //array key - 2
      group([
        //first animation - applied on .left-img class
        query('.left-img', [
          style({ transform: 'translateX(-80px)', opacity: 0 }),
          animate(800)
        ]),

        //second animation - applied on .center-img class
        query('.center-left-img', [
          style({ transform: 'translateY(50px)', opacity: 0 }),
          animate(800)
        ]),

        //third animation - applied on .right-img class
        query('.center-right-img', [
          style({ transform: 'translateY(-50px)', opacity: 0 }),
          animate(800)
        ]),

        //forth animation - applied on .right-img class
        query('.right-img', [
          style({ transform: 'translateX(80px)', opacity: 0 }),
          animate(800)
        ]),

        query('.featured-items-headings', [
          style({ opacity: 0 }),
          animate(2000)
        ])

      ])
    ])
])

//doesn't work! as intended
export let fadeInOutCarousel: AnimationTriggerMetadata = trigger(
  // first para - trigger name
  'fadeInOutCarousel', [

  //second para - state and transitions in an array-format
  transition(':enter', [
    //array key - 1
    state('in', style({ opacity: 1 })),
    //array key - 2
    group([
      //first animation - applied on .left-img class
      query('img', [
        style({ opacity: 0 }),
        animate(800)
      ])
    ])
  ])
    
])
