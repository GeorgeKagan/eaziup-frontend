import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError} from '@angular/router';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {AuthService} from './services/auth.service';
import {GlobalLoaderService} from './services/global-loader.service';

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
  public isResolvesLoaded: boolean = false;
  public appLogo = 'assets/img/eaziup-logo.png';

  public topNav = [
    {label: 'My Projects', link: './projects', isAllowed: this.auth.isAuthenticated},
    {label: 'Add new project', link: './new-project', isAllowed: this.auth.isAuthenticated},
    {label: 'How it works', link: './how-it-works', isAllowed: true}
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

  }

  ngOnDestroy(): any {
    this.sub.unsubscribe();
  }
}
