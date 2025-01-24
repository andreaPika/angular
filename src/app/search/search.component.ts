import { Component } from '@angular/core';
import { SearchService } from './search.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-search',
  imports: [FormsModule, CommonModule, TranslateModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  query: string = '';
  nome: string = '';
  cognome: string = '';
  indirizzo: string = '';
  risultati: any[] = [];
  roles: string = '';

  constructor(private searchService: SearchService, private authService: AuthService) {}

  onFilteredSearch() {
    const filters = {
      q: this.query,
      nome: this.nome,
      cognome: this.cognome,
      indirizzo: this.indirizzo,
      role: 'client',
    };
    if (this.authService.getUserRole()=='company' || this.authService.getUserRole()=='professional'){}else{
    this.searchService.searchWithFilters(filters).subscribe((data) => {
          this.risultati = data;
        });
    }

  }
}
