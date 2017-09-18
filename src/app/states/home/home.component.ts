import {
  Component,
  OnInit
} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'home',
  styleUrls: ['home.component.scss'],
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
  constructor(private router: Router,
              private auth: AuthService) {
  }

  public ngOnInit() {
  }
}
