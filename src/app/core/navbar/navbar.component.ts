import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service'; 
import { Router} from '@angular/router'; // Importa il router per il reindirizzamento
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  imports: [TranslateModule, MatToolbarModule, FormsModule, MatMenuModule, CommonModule,RouterModule],
  standalone:true
})

export class NavbarComponent implements OnInit {

  isAuthenticated: boolean = false; // Stato di autenticazione dell'utente
  userRole: string = ''; // Ruolo dell'utente
  currentRoute: string = '';

  constructor(private authService: AuthService, private router: Router, private translateService:TranslateService) {
    
   }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((authStatus) => {
      console.log('Auth Status Updated:', authStatus);
      this.isAuthenticated = authStatus; 
      if (this.isAuthenticated) {
        this.userRole = this.authService.getUserRole(); // Ottieni il ruolo dell'utente
      }
    });
  }

  // Funzione di logout
  logout(): void {
    this.authService.logout();// Chiama il metodo logout nel servizio
    this.router.navigate(['/login']);  // Reindirizza alla pagina di login
  }

  changeLang(lang: string) {
    this.translateService.use(lang);
  }
}

