import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GlobalLoaderService {
    // Observable string sources
    public emitChangeSource = new Subject<any>();

    // Observable string streams
    public changeEmitted$ = this.emitChangeSource.asObservable();

    // Service message commands
    public emitChange(change: any) {
        this.emitChangeSource.next(change);
    }
}
