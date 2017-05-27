import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class Project {

  constructor(
    public http: Http
  ) {}

  public getData() {
    /**
     * return this.http.get('/assets/data.json')
     * .map(res => res.json());
     */
  }

}
