import * as _ from "lodash";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs";
import { HttpUtils } from "../http-utils";
import { DataSourceAdapter, Grid, Dropdown } from "crm-platform";
import { OpportunityGridFactory } from "./opportunity-grid-factory";


@Injectable()
export class OpportunityService extends DataSourceAdapter<any>  {
  public constructor(
    private http: Http
  ) {
    super();
  };

  public read(): Observable<any[]> {
    return this.http.get("/rest/opportunity/all", null).map((res) => res.json());
  }

  public save(data: any): Observable<any> {
    let requestOptions = HttpUtils.buildRequestOptionsForTransferObject(data);
    return this.http.post('/rest/opportunity/save', null, requestOptions).map(res => {
        return res.json();
    })
  }

  public remove(data: any): Observable<any> {
    let requestOptions = HttpUtils.buildRequestOptionsForTransferId(data.id);
    return this.http.delete("/rest/opportunity/remove", requestOptions);
  }

  public reorderOpportunity(data) {
    let requestOptions = HttpUtils.buildRequestOptions(data);
    return this.http.post('/rest/opportunity/reorder', null, requestOptions).map(res => {
        return res.json();
    })
  }

  public archiveOpportunities(data) {
    let requestOptions = HttpUtils.buildRequestOptions(data);
    return this.http.post('/rest/opportunity/archiveAll', null, requestOptions).map(res => {
        return res.json();
    })
  }

  public getOpportunityGrid(contacts, accounts, statuses): Grid {
    return OpportunityGridFactory.newGridInstance(contacts, accounts, statuses);
  }
}