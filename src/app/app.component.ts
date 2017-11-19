import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError} from '@angular/router';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {AuthService} from './services/auth.service';
import {GlobalLoaderService} from './services/global-loader.service';
import {ROUTE_HOME_CHOOSE, ROUTE_HOME_ENTREPRENEUR, ROUTE_HOME_GUEST, ROUTE_HOME_STUDENT} from './app.routes';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.html'
})
export class AppComponent implements OnInit {
  public isResolvesLoaded: boolean = false;
  public appLogo = 'assets/img/eaziup-logo.png';

  public topNav = [
    // Entrepreneur
    {label: 'Add new project', link: './project/add', isVisible: this.auth.isAccTypeEntrepreneur},
    {label: 'My projects', link: './', isVisible: this.auth.isAccTypeEntrepreneur},
    // Student
    {label: 'Browse projects', link: './', isVisible: this.auth.isAccTypeStudent},
    // Common
    {label: 'How it works', link: './how-it-works'}
  ];

  public footerNav = [
    {label: 'Company', items: [
      {label: 'About', link: './how-it-works'},
      {label: 'How it works?', link: './how-it-works'}
    ]},
    {label: 'Contact', items: [
      {label: 'Contact us', link: './contact'},
      {label: 'Support', link: './contact'}
    ]},
    {label: 'Projects', items: [
      {label: 'Add a project now', link: './project/add', isVisible: this.auth.isAccTypeEntrepreneur},
      {label: 'My projects', link: './', isVisible: this.auth.isAccTypeEntrepreneur},
      {label: 'Browse projects', link: './', isVisible: this.auth.isAccTypeStudent}
    ]},
    {label: 'Legal', items: [
      {label: 'Confidentiality', link: './confidentiality'},
      {label: 'Terms & conditions', link: './terms-and-conditions'},
    ]},
  ];

  private sub: any;
  private isGlobalLoading: boolean = false;

  constructor(public auth: AuthService,
              private slimLoader: SlimLoadingBarService,
              private router: Router,
              private globalLoader: GlobalLoaderService) {

    // Subsribe for router events to display the state loader
    this.sub = this.router.events.subscribe(event => {

      if (event instanceof NavigationStart) {
        this.slimLoader.start();
      }
      else if (event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError) {
        this.slimLoader.complete();
        this.isResolvesLoaded = true;
      }
    }, (error: any) => {
      this.slimLoader.complete();
    });

    // Listen for requests to show global loader
    globalLoader.changeEmitted$.subscribe(isLoading => {
      this.isGlobalLoading = isLoading;
    });
  }

  public ngOnInit() {
    this.setHomeRoute();
  }

  ngOnDestroy(): any {
    this.sub.unsubscribe();
  }

  /**
   * Set the homepage component depending on auth and account type
   */
  private setHomeRoute() {
    let homeRoute = this.auth.isAuthenticated
      ? (this.auth.isAccTypeUnknown ? ROUTE_HOME_CHOOSE : (this.auth.isAccTypeStudent ? ROUTE_HOME_STUDENT : ROUTE_HOME_ENTREPRENEUR))
      : ROUTE_HOME_GUEST;
    this.router.resetConfig([homeRoute, ...this.router.config]);
  }
}
