import { trigger, state, style, animate, transition, AnimationTriggerMetadata, query, group } from '@angular/animations';

export let fadeInPageTitle: AnimationTriggerMetadata = trigger(
  // first para - trigger name
  'fadeInPageTitle', [

  //second para - state and transitions
    transition(':enter', [
    state('in', style({ opacity: 1 })),
    group([
      //the first animation - to he applied on H4 within this HTML section
      query('h3', [
        style({ transform: 'translateY(-40px)'}),
        animate(800)
      ]),

      query('.fade-out', [
        style({ opacity: 0 }),
        animate(4000)
      ]),

      //the second animation - to he applied on H4 within this HTML section
      query('.slide-up', [
        style({ transform: 'translateY(20px)' }),
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

        //slide-to-right animation
        query('.slide-to-right', [
          style({ transform: 'translateX(-80px)', opacity: 0 }),
          animate(800)
        ]),

        //slide-to-down animation
        query('.slide-to-down', [
          style({ transform: 'translateY(-50px)', opacity: 0 }),
          animate(800)
        ]),

        //slide-to-up animation
        query('.slide-to-up', [
          style({ transform: 'translateY(50px)', opacity: 0 }),
          animate(800)
        ]),


        //slide-to-left animation
        query('.slide-to-left', [
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
