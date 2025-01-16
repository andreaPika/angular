import { Component } from '@angular/core';
import { CompanyService } from '../company.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-company-search',
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.css'],
  imports: [TranslateModule, CommonModule, MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatListModule, MatDividerModule],
})

export class SearchCompanyComponent {
  query: string = '';
  company: any[] = [];
  isLoading: boolean = false;

  constructor(private companyService: CompanyService) {}

  search(): void {

    if (this.query.trim()) {
      console.log('Query:', this.query);
      this.isLoading = true;
      this.companyService.searchCompanies(this.query).subscribe({
        next: (data) => {
          this.company = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Errore durante la ricerca delle aziende:', err);
          this.isLoading = false;
        },
      });
    }
  }
}
