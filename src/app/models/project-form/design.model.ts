import { Validators } from '@angular/forms';

const IS_FILL_DUMMY = IS_DEV && false;

export class DesignModel {
    // noinspection JSUnusedGlobalSymbols
    public logoSlogan = [''];
    // noinspection JSUnusedGlobalSymbols
    public designIdeas = [''];
    public designOutline = ['', Validators.required];

    constructor(data: any = null) {
        // Edit mode
        if (data) {
            this.designOutline[0] = data.design_outline;
        } else if (IS_FILL_DUMMY) {
            this.designOutline[0] = 'I want it to be pretty';
        }
    }
}
