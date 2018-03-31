import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class WizardStepsService {
    // Observable string sources
    public emitChangeSource = new Subject<any>();

    // Observable string streams
    public changeEmitted$ = this.emitChangeSource.asObservable();

    // Service message commands
    public emitChange(index: any) {
        this.emitChangeSource.next(index);
    }
}
