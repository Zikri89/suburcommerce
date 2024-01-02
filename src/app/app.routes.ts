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
    const productRepo = inject(ProductRepository<Product>);
    const categoryRepo = inject(CategoryRepository<Category>);

  return categoryRepo.getList().pipe(
    switchMap((categories) => {
      const filteredCategories = categories.filter(
        (category) => category.alias === 'Drips' || category.alias === 'Beans' || category.alias == 'Beverages'
      )

      return productRepo.getTotalProduct().pipe(
        switchMap((productCounts) => {
          const pageSize = 5;
          const totalPages = Math.ceil(productCounts / pageSize);
          const observables: Observable<Product[]>[] = [];

          for (let i = 1; i <= totalPages; i++) {
            const observable = productRepo.getList(i, pageSize);
            observables.push(observable);
          }
            //masih bermalsah hanya menampilkna 5 produk tidak update realtime UI nya
          return concat(...observables).pipe(
            map((results: Product[]) => {
              const combinedData = { categories: filteredCategories, products: results };
              return combinedData;
            })
          );
        })
      )
    })
  );
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
