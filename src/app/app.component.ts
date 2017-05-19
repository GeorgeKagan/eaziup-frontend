/**
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss'
  ],
  templateUrl: './app.html'
})
export class AppComponent implements OnInit {
  public appLogo = 'assets/img/eaziup-logo.png';
  public slogan = 'Turning Ideas Into Results';
  public topNav = [
    {label: 'Suppliers', link: './suppliers'},
    {label: 'Projects / Sellers', link: './projects'},
    {label: 'How the System Works', link: './how-it-works'},
    {label: 'Sign Up', link: './sign-up'},
    {label: 'Log In', link: './log-in'},
  ];
  public footerNav = [
    {label: 'Company', items: [
      {label: 'About', link: '/stub'},
      {label: 'How it works?', link: '/stub'},
      {label: 'Careers', link: '/stub'},
      {label: 'Our team', link: '/stub'},
      {label: 'Press', link: '/stub'},
      {label: 'Confidentiality', link: '/stub'},
      {label: 'Terms & conditions', link: '/stub'},
    ]},
    {label: 'Contact', items: [
      {label: 'Contact us', link: '/stub'},
      {label: 'Support', link: '/stub'},
      {label: 'Supplier team', link: '/stub'},
      {label: 'Project / Sellers team', link: '/stub'}
    ]},
    {label: 'Suppliers', items: [
      {label: 'Sign up', link: '/stub'},
      {label: 'How it works', link: '/stub'},
      {label: 'Supplier database', link: '/stub'},
      {label: 'Team database', link: '/stub'}
    ]},
    {label: 'Projects / Sellers', items: [
      {label: 'Add a project now', link: '/stub'},
      {label: 'How it works', link: '/stub'},
      {label: 'Project database', link: '/stub'}
    ]}
  ];

  constructor(
    public appState: AppState
  ) {}

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}
