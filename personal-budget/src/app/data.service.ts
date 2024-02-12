import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
    public dataSource: any = {
        datasets: [
          {
            data: [],
            backgroundColor: [
              '#98abc5',
              'green',
              '#36a2eb',
              '#fd6b19',
              'red',
              'blue',
              '#d0743c', "#8a89a6", "#d0743c", "#a05d56"
            ],
          },
        ],
        labels: [],
    };;

    constructor(private http: HttpClient) {
        this.getData();
    }

    isEmpty(val:any){
        return (val === undefined || val == null || val.length <= 0) ? true : false;
      }

    getData(){
        if (this.isEmpty(this.dataSource.datasets[0].data)|| this.isEmpty(this.dataSource.labels)){
            this.http.get('http://localhost:3000' + '/budget').subscribe((res: any) => {
                console.log('server res', res);
                for (let i = 0; i < res.myBudget.length; i++) {
                    this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
                    this.dataSource.labels[i] = res.myBudget[i].title;
                }
              });
            }
    }
}
