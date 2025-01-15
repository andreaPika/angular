export interface User {
  user?: {
  id?: string; // L'ID viene generato automaticamente dal database, quindi è opzionale
    firstName: string;
    lastName: string;
    email: string;
    password?: string; // La password è opzionale nel frontend per evitare esposizioni non necessarie
    phoneNumber?: string,
    address?: string,
    dateOfBirth?: Date,
    gender?: 'Male' | 'Female' | 'Other',
    profilePicture?: string, // URL o percorso immagine
    token?: string;
    role: 'professional' | 'admin' | 'client' | 'company';
    roleCompany?: 'manager' | 'assistant' | 'senior' | 'junior';
    companyId?: string; // ID associato a un'azienda (opzionale)
    createdAt?: string; // Timestamp creato dal backend
    updatedAt?: string; // Timestamp aggiornato dal backend
  }
}