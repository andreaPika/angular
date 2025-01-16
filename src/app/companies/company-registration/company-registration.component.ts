import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompanyService } from '../company.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-company-registration',
  imports: [MatSelectModule ,TranslateModule, CommonModule, RouterModule,MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule ],
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.css'],
})
export class CompanyRegistrationComponent {
  companyForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  ateco = [
        { value: '1', label: 'Opzione 1' },
        { value: '2', label: 'Opzione 2' },
        { value: '3', label: 'Opzione 3' },
      ];
 typology = [
            { value: '1', label: 'Opzione 1' },
            { value: '2', label: 'Opzione 2' },
            { value: '3', label: 'Opzione 3' },
          ];
 selectedOption = '';
  constructor(private fb: FormBuilder, private companyService: CompanyService, private router: Router) {
    this.companyForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?[0-9]+$/)]],
      typology: [''],
      ateco: [''],
      services: [''],
      available: [''],
      address: this.fb.group({
        street: [''],
        city: [''],
        postalCode: [''],
        country: [''],
      }),
      location: this.fb.group({
        type: [''],
        coordinates: ['', ''],
      }),
    });
  }

  onSubmit(): void {
    if (this.companyForm.invalid) {
      return;
    }

    const companyData = this.companyForm.value;
    this.companyService.registerCompany(companyData).subscribe({
      next: (response) => {
        this.successMessage = 'Company registered successfully!';
        this.errorMessage = '';
        this.companyForm.reset();
      },
      error: (error) => {
        this.errorMessage = 'Error registering company. Please try again.';
        this.successMessage = '';
        console.error('Error:', error);
      },
    });
  }
}
