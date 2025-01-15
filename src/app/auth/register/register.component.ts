import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth.service';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-register',
  imports: [TranslateModule, RouterModule,MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

    firstName: string = '';
    lastName: string = '';
    email: string = '';
    password: string = '';
    role: string = '';
    companyId: string = '';
  

  roles = ['professionist', 'azienda', 'client']; // Ruoli disponibili

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    if (!this.firstName || !this.lastName || !this.email || !this.password) {
      alert('Compila tutti i campi obbligatori.');
      return;
    }

    this.authService.register(this.firstName, this.lastName, this.email, this.password, 'client', this.companyId).subscribe(
      (response) => {
        console.log('Registrazione completata:', response);
        alert('Utente registrato con successo!');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Errore durante la registrazione:', error);
        alert('Si è verificato un errore durante la registrazione.');
      }
    );

 }
}

