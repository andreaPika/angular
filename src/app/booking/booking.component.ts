import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from './booking.service';  // Servizio per la prenotazione
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyService } from '../companies/company.service';
import { MatSelectModule } from '@angular/material/select';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import { AppointmentService } from './appointment.service';
import { AuthService } from '../auth/auth.service';
import { Appointment }  from "../model/appointment"
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-booking',
  imports: [TranslateModule, FullCalendarModule, MatSelectModule,ReactiveFormsModule, CommonModule, MatFormFieldModule, FormsModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  
  calendarOptions: any; // Usa 'any' come tipo per la configurazione
  userRole: string = ''; // Ruolo dell'utente
  bookingForm!: FormGroup;
  availableDates: any[] = [];  // Date disponibili per l'azienda
  companies: any[] = []; // Array per memorizzare le aziende
  userAppointments: Appointment[] = [];
  companyAppointments: Appointment[] = [];
  user: any;  // Variabile per salvare i dati dell'utente
  company: any;  // Variabile per salvare i dati dell'azienda
  userId: string = ''; // Campo hidden
  companyId: string = '';
  title: string = '';
  appointmentDateTime: string = '';
  details: string = '';
  constructor(private authService: AuthService, private appointmentService: AppointmentService, private companyService: CompanyService, private fb: FormBuilder, private bookingService: BookingService) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.user = this.authService.getUserData();

     // Fetch updated appointments and refresh calendar
     this.loadAppointments();

    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth',
      },
      events: [], // Dynamically filled
      dateClick: this.handleDateClick.bind(this),
    };
  
      // Ottieni le aziende dal servizio
      this.companyService.getAll().subscribe({
        next: (data) => {
          this.companies = data;
        },
        error: (err) => {
          console.error('Errore nel recupero delle aziende', err);
        },
      });
  
    }
    

    loadAppointments(): void {
         // Supponiamo che il servizio fornisca i dati utente
         if (this.user?.user?.companyId!=null){
          console.log("// Recupera gli appuntamenti per l'azienda",this.user?.user?.companyId); 
        this.appointmentService.getAppointmentsByCompany(this.user.user.companyId).subscribe((data) => {
          this.companyAppointments = data;
          console.log("// Recupera gli appuntamenti per l'azienda", this.companyAppointments);
          this.updateCalendarEvents(data);
        });
      }else{
        console.log("// Recupera gli appuntamenti per l'utente",this.user?.user?._id);
        this.appointmentService.getAppointmentsByUser(this.user.user._id).subscribe((data) => {
          this.userAppointments = data;
          console.log("// Recupera gli appuntamenti per l'utente", this.userAppointments);
          this.updateCalendarEvents(data);
        });
  }
}
  
  handleDateClick(arg: any) {
    alert('Data selezionata: ' + arg.dateStr);  // Mostra la data selezionata
  }

  onSubmit(): void {
    if (!this.companyId || !this.appointmentDateTime || !this.title) {
      alert('Compila tutti i campi obbligatori.');
      return;
    }

      this.bookingService.createBooking(this.user?.user?._id, this.companyId, this.appointmentDateTime, this.details, this.title ).subscribe(
        response => {
          console.log('Prenotazione inviata');
          alert('Prenotazione inviata con successo!');
          this.loadAppointments();
        },
        error => {
          console.error('Errore nella prenotazione', error);
          alert('Errore nella prenotazione');
        }
      );
    }

    updateCalendarEvents(appointments: Appointment[]): void {
      this.calendarOptions.events = appointments.map((appointment) => ({
        title: appointment.title,
        date: appointment.date,
        backgroundColor: this.userRole === 'company' ? 'blue' : 'green',
      }));
    }
  }
