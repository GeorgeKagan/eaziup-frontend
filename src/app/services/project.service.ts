import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { CONFIG } from '../consts/config';

const DAYS_IN_WEEK = 7;

@Injectable()
export class ProjectService {
    /**
     * Calculate delivery date of a project by adding milestones' duration to the start date.
     * @param {string} startDate
     * @param {string} milestones
     * @returns {string}  Format: YYYY-MM-DD
     */
    public static calculateDeliveryDate(startDate: string, milestones: any[]): string {
        let date = new Date(Date.parse(startDate));
        let durationWeeks = milestones.map((x) => x.timespan).reduce((x, y) => x + y);

        date.setDate(date.getDate() + durationWeeks * DAYS_IN_WEEK);

        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }

    /**
     * Calculate compenstation for completion of a project by finding the bracket the project dev/milestone counts fall into.
     * @param {number} devCount
     * @param {number} milestoneCount
     * @returns {number}
     */
    public static calculateCompenstation(devCount: number, milestoneCount: number): number {
        let brackets = CONFIG.WIZARD.PRICING.filter((x) => x.devs === devCount && milestoneCount <= x.maxStones);
        let minBracket = brackets.sort((a, b) => a.maxStones - b.maxStones)[0];

        return minBracket.ourPrice;
    }

    constructor(private rest: Restangular) {
    }

    public getAllProjects() {
        return this.rest.all('project').customGET('', {all: true}).toPromise();
    }

    public getMyProjects() {
        return this.rest.all('project').customGET().toPromise();
    }

    public getProject(projectId: number) {
        return this.rest.one('project', projectId).get();
    }

    public getProjectApplications(projectId: number) {
        return this.rest.one('project', projectId).customGET('applications');
    }

    public saveProject(data: object) {
        return this.rest.all('project').post(data);
    }

    public removeProject(projectId: number) {
        return this.rest.one('project', projectId).remove();
    }
}
