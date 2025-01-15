import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';  // Importa il servizio AuthService
import { CompanyService } from '../companies/company.service';  // Importa il servizio Company
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-dashboard',
  imports: [TranslateModule, MatToolbarModule, CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {
  user: any;  // Variabile per salvare i dati dell'utente
  company: any;  // Variabile per salvare i dati dell'azienda

  constructor(private authService: AuthService, 
    private companyService: CompanyService, 
    private router: Router) {}

  ngOnInit(): void {
    // Verifica se l'utente è autenticato
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);  // Reindirizza alla pagina di login se non autenticato
    }

    // Puoi caricare i dati dell'utente o informazioni aziendali, se necessario
   
    this.user = this.authService.getUserData();  // Supponiamo che il servizio fornisca i dati utente
    if (this.user?.user?.companyId!=null){
    this.companyService.getById(this.user?.user?.companyId).subscribe({
      next: (data) => {
        this.company = data;
      },
      error: (err) => {
        console.error('Errore nel recupero dei dati azienda', err);
      },
    });;
  }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);  // Reindirizza al login dopo il logout
  }

}
