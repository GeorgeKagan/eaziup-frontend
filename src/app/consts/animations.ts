import {trigger, style, transition, animate} from '@angular/core';

export const slideDown = trigger('fadeInOut', [
  transition(':enter', [
    style({opacity: 0, 'max-height': 0, 'padding-top': 0, 'padding-bottom': 0, 'margin-top': 0, 'margin-bottom': 0, overflow: 'hidden'}),
    animate(350, style({opacity: 1, 'max-height': '*', 'padding-top': '*', 'padding-bottom': '*', 'margin-top': '*', 'margin-bottom': '*'}))
  ]),
  transition(':leave', [
    animate(350, style({opacity: 0, height: 0, 'padding-top': 0, 'padding-bottom': 0, 'margin-top': 0, 'margin-bottom': 0, overflow: 'hidden'}))
  ])
]);
