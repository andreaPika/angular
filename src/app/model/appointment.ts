import { Company } from "./company.model";
import { User } from "./user.model";

export interface Appointment {
  user: User;         // ID dell'utente (collegato alla collezione User)
  company: Company;      // ID dell'azienda (collegato alla collezione Company)
  title: string;
  date: Date;             // Data dell'appuntamento
  time: string;             // Data dell'appuntamento
  details?: string;       // Descrizione (opzionale)
  status: 'pending' | 'accepted' | 'rejected'; // Stato dell'appuntamento
}