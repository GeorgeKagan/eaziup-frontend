import {trigger, style, transition, animate} from '@angular/animations';

export const slideDown = trigger('fadeInOut', [
  transition(':enter', [
    style({
      'opacity': 0,
      'max-height': 0,
      'padding-top': 0,
      'padding-bottom': 0,
      'margin-top': 0,
      'margin-bottom': 0,
      'overflow': 'hidden'
    }),
    animate('350ms ease-in-out', style({
      'opacity': 1,
      'max-height': '*',
      'padding-top': '*',
      'padding-bottom': '*',
      'margin-top': '*',
      'margin-bottom': '*'
    }))
  ]),
  transition(':leave', [
    animate('350ms ease-in-out', style({
      'opacity': 0,
      'height': 0,
      'padding-top': 0,
      'padding-bottom': 0,
      'margin-top': 0,
      'margin-bottom': 0,
      'overflow': 'hidden'
    }))
  ])
]);

export const fadeOut = trigger('fadeOut', [
  transition(':leave', [
    style({
      'opacity': 1
    }),
    animate('350ms ease-in-out', style({
      'opacity': 0
    }))
  ])
]);

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({
      'opacity': 0
    }),
    animate('700ms ease-in-out', style({
      'opacity': 1
    }))
  ])
]);
