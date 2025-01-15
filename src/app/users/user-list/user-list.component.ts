// user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { UserDetailsDialogComponent } from '../user-details-dialog/user-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-user-list',
  imports: [TranslateModule, CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  isLoading: boolean = true;

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.isLoading = false;
    });
  }
  viewUserDetails(user: any): void {
    this.dialog.open(UserDetailsDialogComponent, {
      data: user,
      width: '400px'
    });
}
}
