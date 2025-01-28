// company-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CompanyDetailsDialogComponent } from '../company-details-dialog/company-details-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppointmentService } from '../../booking/appointment.service';
import { Appointment }  from "../../model/appointment"


@Component({
  selector: 'app-company-list',
  imports: [TranslateModule, CommonModule, FullCalendarModule],
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  companies: any[] = [];
  isLoading: boolean = true;
  calendarOptions: any;
  companyAppointments: Appointment[] = [];

  constructor(private companyService: CompanyService, private appointmentService: AppointmentService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.companyService.getAll().subscribe((data) => {
      this.companies = data;
      this.isLoading = false;
    });

    this.companies.forEach(company => {
          this.loadBookingsForCompany(company);
        });

    this.calendarOptions = {
              initialView: 'dayGridMonth',
              height: 'auto', // Altezza dinamica
              headerToolbar: {
                left: '',
                center: 'title',
                right: '',
              },
              events: [], // Dynamically filled
              dateClick: this.handleDateClick.bind(this),
            }
  }

    handleDateClick(arg: any) {
      alert('Data selezionata: ' + arg.dateStr);  // Mostra la data selezionata
    }

  viewCompanyDetails(company: any): void {
    this.dialog.open(CompanyDetailsDialogComponent, {
      data: company,
      width: '400px'
    });
 }

 bookAppointment(company: any) {
     console.log('Prenotazione appuntamento per:', company);
     alert(`Prenotazione avviata per l'azienda: ${company.name}`);
     // Implementa qui la logica per gestire la prenotazione
   }

   onActionSelect(event: Event, company: any) {
       const action = (event.target as HTMLSelectElement).value;
       if (action === 'details') {
         this.viewCompanyDetails(company);
       } else if (action === 'book') {
         this.bookAppointment(company);
       }
     }

         loadBookingsForCompany(company: any) {
             this.isLoading = true;
             this.appointmentService.getAppointmentsByCompany(company._id).subscribe((data) => {
              this.companyAppointments = data;
                console.log("// Recupera gli appuntamenti per l'azienda", this.companyAppointments);
                 this.isLoading = false;
             });
           }

           getCompanyEvents(company: any) {
             return company.bookings;
           }
}
