import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
// for tables
import { MatPaginator, MatSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

// services required
import { AdminService } from './admin.service';

@Component({
  selector: 'admin-app',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [AdminService]
})

export class AdminComponent implements OnInit {
  chartTitle = 'Current Elections';

  constructor(private adminService: AdminService) {

  }

  displayedColumns = ['electionID', 'electionName', 'count', 'status'];
  elecTable: elecTableDataSource | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {
    this.elecTable = new elecTableDataSource(this.adminService, this.paginator, this.sort);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.elecTable) {
          return;
        }
        this.elecTable.filter = this.filter.nativeElement.value;
      });
  }

}

export class elecTableDataSource extends DataSource<any> {
  constructor(private adminService: AdminService,
    private _paginator: MatPaginator,
    private _sort: MatSort) {

    super();
  }

  rawData: any[] = [];
  filteredData: any[] = [];
  sortedData: any[] = [];

  // Create filter BehaviorSubject and set getter and setter
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any[]> {
    const displayDataChanges = [
      this.adminService.dataChange,
      this._paginator.page,
      this._sort.sortChange,
      this._filterChange
    ];
    return Observable.merge(...displayDataChanges)
      .map(() => {
        this.rawData = this.adminService.data.slice();

        // 1.Filter Data
        this.filteredData = this.rawData.filter((item: any) => {
          // Set Filter Type
          const searchStr = (item.electionID + item.electionName).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        // 2.Sort Filtered Data
        this.sortedData = this.getSortedData(this.filteredData);

        // 3. Pagination
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        return this.sortedData.splice(startIndex, this._paginator.pageSize);
      });
  }

  disconnect() {
  }

  // Data Sorting
  getSortedData(data: any[]): any[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'electionID':
          [propertyA, propertyB] = [a.electionID, b.electionID];
          break;
        case 'electionName':
          [propertyA, propertyB] = [a.electionName, b.electionName];
          break;
        case 'count':
          [propertyA, propertyB] = [a.count, b.count];
          break;
        case 'status':
          [propertyA, propertyB] = [a.status, b.status];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }


}

