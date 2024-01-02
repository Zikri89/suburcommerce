import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { PartnershipComponent } from './pages/partnership/partnership.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProductDetailComponent } from './pages/product/product-detail/product-detail.component';
import { inject } from '@angular/core';
import { ProductRepository } from './services/repo/product_repository.service';
import { Product } from './models/product.interface';
import CategoryRepository from './services/repo/category_repository.service';
import { Category } from './models/category.interface';
import { Observable, concat, concatMap, forkJoin, from, map, merge, of, switchMap, tap } from 'rxjs';

const productResolver = () =>
{
    const categoryRepo = inject(CategoryRepository<Category>);

  return categoryRepo.getList();
};

export const routes: Routes = [
  {path: "", redirectTo: 'home', pathMatch: 'full' },
  {path: "home", component: HomeComponent},
  {
    path: "product",
    component: ProductComponent,
    resolve: { data: productResolver },
    children: [
      {
        path: ":id", component: ProductDetailComponent,
      },
    ]
  },
  {path: "partnership", component: PartnershipComponent },
  {path: "contact", component: ContactComponent}
];
