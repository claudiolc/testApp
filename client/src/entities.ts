import { injectable } from 'inversify'
import { Person } from './interfaces'
import "reflect-metadata";


@injectable()
export class Model {
  private mainUrl = "http://localhost:9000/";
  private indexUrl = this.mainUrl + "index";
  private updateUrl = this.mainUrl + "update";
  private createUrl = this.mainUrl + "create";
  private deleteUrl = this.mainUrl + "delete";

  public async callApi() {
    let list!: Person[];
      await this.fetchJson()
      .then(res => res as Person[])
      .then(res => list = res)
      return await list;
  }

  private async fetchJson() {
      return await fetch(this.indexUrl)
          .then(res => res.json());
    }

  public async sendUpdateRequest(patient: Person): Promise<Response> {
      const response = await fetch(this.updateUrl, {
        method: 'POST', 
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(patient)
      });
      
      return response;
    }
  
  public async sendCreateRequest(patient: Person) {
    const response = await fetch(this.createUrl, {
      method: 'POST', 
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patient)
    });

    return response;
  }

  public async sendDeleteRequest(patient: Person) {
    const response = await fetch(this.deleteUrl, {
      method: 'POST', 
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patient)
    });

    return response;
  }
}