import { Component } from '@angular/core';
import { SearchService } from './search.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

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

  constructor(private searchService: SearchService) {}

  onFilteredSearch() {
    const filters = {
      q: this.query,
      nome: this.nome,
      cognome: this.cognome,
      indirizzo: this.indirizzo,
    };

    this.searchService.searchWithFilters(filters).subscribe((data) => {
      this.risultati = data;
    });
  }
}
