import { CONFIG } from '../../consts/config';
import { Component, Input } from '@angular/core';

/**
 * A single project box
 */
@Component({
    selector: 'project-box',
    template: `
        <div class="card col-12 pr-0 pl-0 mr-4 mb-4">
            <div class="card-block">
                <h4 class="card-title ez-green ez-link d-inline-block" routerLink="/project/{{p.id}}">
                    {{p.name}}
                </h4>
                <h6 class="card-subtitle mb-2 font-weight-normal text-muted">
                    {{p.cat.name + (p.company ? ' by ' + p.company : '')}}
                </h6>
                <hr>
                <p class="card-text mb-4" [innerHTML]="p.desc | myNewlineToList"></p>
            </div>
            <div class="card-footer text-muted text-center">
                <i class="fa fa-calendar-o mr-1"></i> Starts <strong>{{p.start_date | date}}</strong>
            </div>
        </div>
    `
})
export class ProjectBoxComponent {
    /**
     * Project object
     */
    @Input() public p: any;
}
