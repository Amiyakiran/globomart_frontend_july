import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AllProductComponent } from './all-product/all-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPayPalModule } from 'ngx-paypal';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AllProductComponent,
    ViewProductComponent,
    HeaderComponent,
    FooterComponent,
    CheckoutComponent,
    WishlistComponent,
    CartComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPayPalModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
