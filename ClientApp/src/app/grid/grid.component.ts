import {AfterViewInit, Component, OnInit, Optional, ViewChild} from '@angular/core';
import {Paged, UserDto} from '../userApi/user.dto';
import {UserService} from '../userApi/user.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UserEditDialogComponent} from './user-edit-dialog.component';
import {MatPaginator} from '@angular/material';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  providers: [UserService],
})
export class GridComponent implements OnInit, AfterViewInit {
  constructor(private serv: UserService, private dialog: MatDialog,
              @Optional() public dialogRef: MatDialogRef<UserDto>) {
    this.users = new Array<UserDto>();
  }
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  page = 1;
  size = 10;
  total = 0;
  users: Array<UserDto>;

  ngOnInit() {
    this.loadPaged(this.page, this.size);
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((event) => {
      this.loadPaged(event.pageIndex +1, event.pageSize);
    });
  }

  private loadPaged(page: number, size: number) {
    this.serv.getPaged(page, size).subscribe((data: Paged<UserDto>) => {
      this.users = data.items;
      this.total = data.total;
    });
  }

  addUser(): void {
    const editedUser = new UserDto(0, '', '');
    const dialog = this.dialog.open(UserEditDialogComponent, {data: editedUser});
    dialog.afterClosed().subscribe((result => {
      if (result !== undefined) {
        this.serv.createUser(result).subscribe(user => {
          this.users.push(user);
        });
      }
    }));
  }

  editUser(user: UserDto) {
    const dialog = this.dialog.open(UserEditDialogComponent, {data: user});
    dialog.afterClosed().subscribe((result => {
      if (result !== undefined) {
        this.serv.updateUser(result).subscribe(resultUser => {
          for (const key in resultUser) {
            if (user.hasOwnProperty(key)) {
              user[key] = resultUser[key];
            }
          }
        });
      }
    }));
  }

  deleteUser(user: UserDto) {
    this.serv.deleteUser(user.id).subscribe(data => {
      this.loadPaged(this.page, this.size);
    });
  }
}


