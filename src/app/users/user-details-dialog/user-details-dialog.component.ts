import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-user-details-dialog',
  imports: [TranslateModule, CommonModule],
  templateUrl: './user-details-dialog.component.html',
  styleUrls: ['./user-details-dialog.component.css']
})
export class UserDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  showDialog: boolean = true;

closeDialog() {
  this.showDialog = false;
  const overlay = document.querySelector('.cdk-overlay-container');
  if (overlay) {
    overlay.innerHTML = ''; // Clear the overlay contents
  }
}

confirm() {
  console.log('Conferma cliccata');
  this.closeDialog();
}
}
