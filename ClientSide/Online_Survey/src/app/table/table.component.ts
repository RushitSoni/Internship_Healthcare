
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { User } from '../shared/Models/user';  // Make sure to provide the correct path
import { WorkspaceService } from '../workspace/workspace.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;


  users:User[]=[]
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role', 'dateCreated','provider'];
  dataSource = new MatTableDataSource<User>;

  constructor(private workspaceService:WorkspaceService){

  }

  ngOnInit(): void {


    this.loadUsers()

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onPageChange(event: any): void {
    // Handle page change logic if needed
  }


  loadUsers(): void {
    this.workspaceService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        console.log(this.users);

        this.dataSource = new MatTableDataSource(this.users);
     
      },
      error => {
        console.log('Error fetching users:', error);
      }
    );
  }

 
}

// export const userData: User[] = [
//   { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', role: 'Admin', id: '1', jwt: 'abc123' ,provider:'normal',dateCreated:new Date('1990-01-01')},
 
// ];
