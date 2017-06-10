import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class ProjectService {

  constructor(public http: Http) {
  }

  public getData() {

  }

  public saveProject(data) {
    console.log(data);

    return this.http.post('/api/project', data);
  }
}
