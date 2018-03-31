import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ICONS } from '../../consts/icons';

@Component({
    selector: 'home',
    styleUrls: ['home.component.scss'],
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
    public ICONS: object;

    constructor(public auth: AuthService) {
    }

    public ngOnInit() {
        this.ICONS = ICONS;
    }
}
