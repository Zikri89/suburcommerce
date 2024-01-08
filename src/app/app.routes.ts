import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { PartnershipComponent } from './pages/partnership/partnership.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProductDetailComponent } from './pages/product/product-detail/product-detail.component';
import { inject } from '@angular/core';
import CategoryRepository from './services/repo/category_repository.service';
import { Category } from './models/category.interface';
import BannerRepository from './services/repo/banner_repository.service';
import { Banner } from './models/banner.interface';
import MedsosRepository from './services/repo/medsos_repository.service';
import { Medsos } from './models/medsos.interface';

const productResolver = () => {
  const categoryRepo = inject(CategoryRepository<Category>);

  return categoryRepo.getList();
};

const bannerResolver = () => {
  const bannerRepo = inject(BannerRepository<Banner>);

  return bannerRepo.getList();
};

const medsosResolver = () => {
  const medsosRepo = inject(MedsosRepository<Medsos>);

  return medsosRepo.getList();
};

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    resolve: {
      banner: bannerResolver,
      medsos: medsosResolver,
    },
  },
  {
    path: 'product',
    component: ProductComponent,
    resolve: {
      data: productResolver,
      banner: bannerResolver,
      medsos: medsosResolver,
    },
    children: [
      {
        path: '',
        component: ProductDetailComponent,
      },
    ],
  },
  { path: 'partnership', component: PartnershipComponent },
  { path: 'contact', component: ContactComponent },
];
