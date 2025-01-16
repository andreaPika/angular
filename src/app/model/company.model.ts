import { User } from "./user.model";
import { Typology } from "./typology.model";
import { Ateco } from "./ateco.model";

export interface Company {
      name: string;
      phoneNumber: string;
      typology: Typology;
      ateco: Ateco;
      services?: string[]; // Servizi offerti
      availability?: string[]; // Orari di disponibilità

    address?: {
      street?: string;
      city?: string;
      postalCode?: string;
      country?: string;
    };

    location?: {
      type: string;
      coordinates: [number, number]; // [longitudine, latitudine]
    };
      users?: any[]; // ID associato a un'azienda (opzionale)
      createdAt?: string; // Timestamp creato dal backend
      updatedAt?: string; // Timestamp aggiornato dal backend

  }
