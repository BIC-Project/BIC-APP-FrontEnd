import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './components/login/auth.guard';
import { LoggedinGuard } from './components/login/loggedin.guard';
import { LoginComponent } from './components/login/login.component';
import { ReceiptComponent } from './components/receipt/receipt.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: 'full' },
  { path: "login", component: LoginComponent, canActivate: [LoggedinGuard] },
  { path: "contact", component: ContactComponent },
  { path: "about", component: AboutComponent },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "receipt", component: ReceiptComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
