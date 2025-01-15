import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './auth/register/register.component';
import { CompanyListComponent } from './companies/company-list/company-list.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { SearchCompanyComponent } from './companies/company-search/company-search.component';
import { BookingComponent } from './booking/booking.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { AuthGuard } from '../app/auth/auth.guard';
import { ProfileManagementComponent } from './users/profile-management/profile-management.component';
import { CompanyRegistrationComponent } from './companies/company-registration/company-registration.component';
import { UserRegistrationComponent } from './auth/user-registration/user-registration.component';
import { NotFoundComponent } from './auth/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'companyList', component: CompanyListComponent, canActivate: [AuthGuard] },
  { path: 'userList', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent},
  { path: 'user-register', component: UserRegistrationComponent},
  { path: 'search-companies', component: SearchCompanyComponent, canActivate: [AuthGuard] },
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] },
  { path: 'booking', component: BookingComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileManagementComponent, canActivate: [AuthGuard] },
  { path: 'company-registration', component: CompanyRegistrationComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Use RouterModule.forRoot
  exports: [RouterModule], // Export RouterModule
})
export class AppRoutingModule {}
