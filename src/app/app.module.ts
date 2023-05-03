import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SignupUserComponent } from './components/signup-user/signup-user.component';
import { SignupAssistantComponent } from './components/signup-assistant/signup-assistant.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { AssistantsTableComponent } from './components/assistants-table/assistants-table.component';
import { DemandesTableComponent } from './components/demandes-table/demandes-table.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { AssistantDatailsComponent } from './components/assistant-datails/assistant-datails.component';
import { SearchComponent } from './components/search/search.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { EditPasswordComponent } from './components/edit-password/edit-password.component';
import { AssistantsSectionComponent } from './components/assistants-section/assistants-section.component';
import { AssistantBoxComponent } from './components/assistant-box/assistant-box.component';
import { AllAssistantsComponent } from './components/all-assistants/all-assistants.component';
import { AssistantInfoComponent } from './components/assistant-info/assistant-info.component';
import { FilterDemandesPipe } from './pipes/filter-demandes.pipe';
import { FilterAssistantsPipe } from './pipes/filter-assistants.pipe';
import { FilterUsersPipe } from './pipes/filter-users.pipe';
import { ContactAssistantComponent } from './components/contact-assistant/contact-assistant.component';
import { DemandeDetailsComponent } from './components/demande-details/demande-details.component';
import { DashboardUserComponent } from './components/dashboard-user/dashboard-user.component';
import { DashboardAssistantComponent } from './components/dashboard-assistant/dashboard-assistant.component';
import { UserDemandesTableComponent } from './components/user-demandes-table/user-demandes-table.component';
import { AssistantRequestsTableComponent } from './components/assistant-requests-table/assistant-requests-table.component';
import { JwtInterceptorService } from './services/jwt-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    SignupUserComponent,
    SignupAssistantComponent,
    DashboardAdminComponent,
    UsersTableComponent,
    AssistantsTableComponent,
    DemandesTableComponent,
    UserDetailsComponent,
    AssistantDatailsComponent,
    SearchComponent,
    MyProfileComponent,
    EditPasswordComponent,
    AssistantsSectionComponent,
    AssistantBoxComponent,
    AllAssistantsComponent,
    AssistantInfoComponent,
    FilterDemandesPipe,
    FilterAssistantsPipe,
    FilterUsersPipe,
    ContactAssistantComponent,
    DemandeDetailsComponent,
    DashboardUserComponent,
    DashboardAssistantComponent,
    UserDemandesTableComponent,
    AssistantRequestsTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
