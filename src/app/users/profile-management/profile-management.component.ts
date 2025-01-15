import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';  
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-profile-management',
  imports: [TranslateModule, FormsModule, CommonModule, MatFormFieldModule,MatInputModule,RouterModule,MatSelectModule,MatOptionModule],
  templateUrl: './profile-management.component.html',
  styleUrls: ['./profile-management.component.css']
})
export class ProfileManagementComponent implements OnInit {
  user: any;
  genderOptions: string[] = ['Male', 'Female', 'Other'];

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUserData();
    this.loadUserProfile()
  }

  loadUserProfile(): void {
    this.userService.getUserProfile(this.user.user._id).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        this.snackBar.open('Errore nel caricamento del profilo', 'Chiudi', {
          duration: 3000
        });
      }
    );
  }

  updateProfile(): void {
    this.userService.updateUserProfile(this.user).subscribe(
      () => {
        this.snackBar.open('Profilo aggiornato con successo', 'Chiudi', {
          duration: 3000
        });
      },
      (error) => {
        this.snackBar.open('Errore durante l\'aggiornamento', 'Chiudi', {
          duration: 3000
        });
      }
    );
  }
}
