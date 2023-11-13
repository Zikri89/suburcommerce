import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { PartnershipComponent } from './pages/partnership/partnership.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: "", component: HomeComponent },
  {path: "product", component: ProductComponent},
  { path: "partnership", component: PartnershipComponent },
  {path: "contact", component: ContactComponent}
];
