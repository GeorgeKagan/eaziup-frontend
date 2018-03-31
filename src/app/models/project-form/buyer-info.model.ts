import { Validators } from '@angular/forms';

const IS_FILL_DUMMY = IS_DEV && false;

export class BuyerInfoModel {
    public firstName = ['', Validators.required];
    public lastName = ['', Validators.required];
    public contactEmail = ['', [Validators.required, Validators.email]];
    public contactPhone = ['', Validators.required];
    public country = ['', Validators.required];
    public city = ['', Validators.required];
    public addressLine1 = ['', Validators.required];
    public addressLine2 = [''];
    public companyName = [''];
    public companyPosition = [''];
    public whatCompanyDoes = [''];

    constructor(data: any = null) {
        // Edit mode
        if (data) {
            this.firstName[0] = data.first_name;
            this.lastName[0] = data.last_name;
            this.contactEmail[0] = data.email;
            this.contactPhone[0] = data.phone;
            this.country[0] = data.country_id;
            this.city[0] = data.city;
            this.addressLine1[0] = data.addr1;
            this.addressLine2[0] = data.addr2;
            this.companyName[0] = data.company;
            this.companyPosition[0] = data.position;
            this.whatCompanyDoes[0] = data.comp_desc;
        } else if (IS_FILL_DUMMY) {
            this.firstName[0] = 'Georgy';
            this.lastName[0] = 'Kagan';
            this.contactEmail[0] = 'georgekagan@gmail.com';
            this.contactPhone[0] = '+972546253553';
            this.country[0] = '1';
            this.city[0] = 'Lod';
            this.addressLine1[0] = 'Hativat Harel 4/7';
            this.addressLine2[0] = 'Entrance B';
            this.companyName[0] = 'Expensr';
            this.companyPosition[0] = 'Lead Front-End Developer';
            this.whatCompanyDoes[0] = 'My product strives to make sense in the sea of monthly expenses that most of the people are in. ' +
                'I try to help make right decisions in the pursuit of more savings each month.';
        }
    }
}
