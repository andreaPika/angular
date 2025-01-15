import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { RouterModule} from '@angular/router';
import { NavbarComponent } from './core/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, TranslateModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true, 
})
export class AppComponent {
  title = 'angular-gestione-anagrafica';
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('it');
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
  }
}
