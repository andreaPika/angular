// company-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CompanyDetailsDialogComponent } from '../company-details-dialog/company-details-dialog.component';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-company-list',
  imports: [TranslateModule, CommonModule],
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  companies: any[] = [];
  isLoading: boolean = true;

  constructor(private companyService: CompanyService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.companyService.getAll().subscribe((data) => {
      this.companies = data;
      this.isLoading = false;
    });
  }

  viewCompanyDetails(company: any): void {
    this.dialog.open(CompanyDetailsDialogComponent, {
      data: company,
      width: '400px'
    });
 }
}
