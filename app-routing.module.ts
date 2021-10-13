import { SignUpComponent } from './view/sign-up/sign-up.component';
import { ProdectsComponent } from './view/products/prodects.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './view/page-not-found/page-not-found.component';
import { ProdectComponent } from './view/product/prodect.component';
import { HomeComponent } from './view/home/home.component';
import { CartComponent } from './view/cart/cart.component';
import { SigninComponent } from './view/signin/signin.component';
import { ForgotPasswordComponent } from './view/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './view/verify-email/verify-email.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';



const routes: Routes = [
{ path: '', redirectTo:'home',pathMatch:'full' },
  {path: 'home', component: HomeComponent},
  {path: 'sign-in', component: SigninComponent},
  {path: 'register-user', component:SignUpComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'dashboard', component: DashboardComponent },
  {path: 'prodects', component: ProdectsComponent},
  {path: 'cart', component: CartComponent},
  {path:"**",component:PageNotFoundComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
