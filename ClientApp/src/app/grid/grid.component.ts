import {Component, OnInit, Optional, TemplateRef, ViewChild} from '@angular/core';
import {UserDto} from '../userApi/user.dto';
import {UserService} from '../userApi/user.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UserEditDialogComponent} from './user-edit-dialog.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  providers: [UserService],
})
export class GridComponent implements OnInit {
  users: Array<UserDto>;
  statusMessage = '';

  constructor(private serv: UserService, private dialog: MatDialog,
              @Optional() public dialogRef: MatDialogRef<UserDto>) {
    this.users = new Array<UserDto>();
  }

  ngOnInit() {
    this.loadUsers();
  }

  private loadUsers() {
    this.serv.getUsers().subscribe((data: Array<UserDto>) => {
      this.users = data;
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
      this.statusMessage = 'Данные успешно удалены',
        this.loadUsers();
    });
  }
}


