import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-user-registration',
  imports: [TranslateModule, RouterModule,MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  role: string = '';
  companyId: string = '';

constructor(private authService: AuthService, private router: Router) {}

register(): void {
  if (!this.firstName || !this.lastName || !this.email || !this.password|| !this.companyId) {
    alert('Compila tutti i campi obbligatori.');
    return;
  }

  this.authService.register(this.firstName, this.lastName, this.email, this.password, 'azienda', this.companyId).subscribe(
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

