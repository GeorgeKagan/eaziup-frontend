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
    './app.component.css'
  ],
  template: `
    <div>
      <span [routerLink]=" ['./'] " routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        <img [src]="appLogo" width="200px">
      </span>
      {{slogan}}
    </div>
    <nav>
      <a [routerLink]=" ['./suppliers'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        Suppliers
      </a>
      <a [routerLink]=" ['./projects'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        Projects & Sellers
      </a>
      <a [routerLink]=" ['./how-it-works'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        How The System Works
      </a>
      <a [routerLink]=" ['./sign-up'] "
         routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        Sign Up
      </a>
      <a [routerLink]=" ['./log-in'] "
         routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        Login
      </a>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>

    <footer>EaZiUp 2017</footer>
  `
})
export class AppComponent implements OnInit {
  public appLogo = 'assets/img/eaziup-logo.png';
  public slogan = 'Turning Ideas Into Results…';

  constructor(
    public appState: AppState
  ) {}

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

/**
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
