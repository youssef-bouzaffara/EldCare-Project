import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { AssistantDatailsComponent } from './components/assistant-datails/assistant-datails.component';
import { SearchComponent } from './components/search/search.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { EditPasswordComponent } from './components/edit-password/edit-password.component';
import { AllAssistantsComponent } from './components/all-assistants/all-assistants.component';
import { AssistantInfoComponent } from './components/assistant-info/assistant-info.component';
import { ContactAssistantComponent } from './components/contact-assistant/contact-assistant.component';
import { DemandeDetailsComponent } from './components/demande-details/demande-details.component';
import { DashboardUserComponent } from './components/dashboard-user/dashboard-user.component';
import { DashboardAssistantComponent } from './components/dashboard-assistant/dashboard-assistant.component';


const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home:sectionId", component: HomeComponent },
  { path: "search", component: SearchComponent },
  { path: "subscription", component: SignupComponent },
  { path: "signupAdmin", component: SignupComponent },
  { path: "signin", component: LoginComponent },
  { path: "admin", component: DashboardAdminComponent },
  { path: "dashboardUser", component: DashboardUserComponent },
  { path: "dashboardAssistant", component: DashboardAssistantComponent },
  { path: "userDetails/:id", component: UserDetailsComponent },
  { path: "assistantDetails/:id", component: AssistantDatailsComponent },
  { path: "myProfile", component: MyProfileComponent },
  { path: "editMyPassword", component: EditPasswordComponent },
  { path: "allAssistants", component: AllAssistantsComponent },
  { path: "assistantInfo/:id", component: AssistantInfoComponent },
  { path: "contactAssistant/:id", component: ContactAssistantComponent },
  { path: "demandeDetails/:id", component: DemandeDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
