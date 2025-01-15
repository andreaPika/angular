import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password',
  standalone: true,
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  changePassword(): void {
    const { currentPassword, newPassword, confirmPassword } = this.changePasswordForm.value;

    if (newPassword !== confirmPassword) {
      this.errorMessage = 'Le nuove password non corrispondono';
      return;
    }

    const userId = localStorage.getItem('user_id'); // Assumiamo che l'ID utente sia salvato qui
    this.authService.changePassword(userId!, currentPassword, newPassword).subscribe({
      next: () => {
        this.successMessage = 'Password aggiornata con successo';
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = err.error.error || 'Errore durante il cambio della password';
        this.successMessage = '';
      },
    });
  }
}
