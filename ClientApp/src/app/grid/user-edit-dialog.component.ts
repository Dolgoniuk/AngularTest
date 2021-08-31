import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserDto} from '../userApi/user.dto';

@Component({
    selector: 'app-grid-edit-user',
    templateUrl: 'user-edit-dialog.html',
    styleUrls: ['./user-edit-dialog.css'],
})
export class UserEditDialogComponent {
    public _editUser: UserDto;
    constructor(
        public dialogRef: MatDialogRef<UserEditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: UserDto
    ) {
      this._editUser = Object.assign({}, data);
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }
}
