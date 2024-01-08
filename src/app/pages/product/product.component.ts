import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TextUtilsService } from '../../services/text-utils/text-utils.service';
import { Product } from '../../models/product.interface';
import { ProductRepository } from '../../services/repo/product_repository.service';
import { AuthConstant } from '../../constants/constants.service';
import { Category } from '../../models/category.interface';
import { concat, concatMap } from 'rxjs';
import { HeroComponent } from '../../hero/hero.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../partials/modal/modal.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    FormsModule,
    RouterLink,
    ModalComponent,
    ProductDetailComponent,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  providers: [HttpClient, ModalComponent],
})
export class ProductComponent implements OnInit, AfterViewInit {
  errorMessage!: string;
  categories!: Category[];
  products!: Product[];
  product!: Product;
  imageUrl!: string;
  currentIndex: number = 0;
  productsLoaded: boolean = false;
  images: Array<any> = [];
  searchTerm: string = '';
  searchErrorMessage: string = '';
  modalTitle!: string;
  modalContent: any;

  constructor(
    private route: ActivatedRoute,
    private el: ElementRef,
    private textUtilsService: TextUtilsService,
    private productRepo: ProductRepository<Product>,
    private cdr: ChangeDetectorRef,
    private modalComponent: ModalComponent
  ) {}

  limitText(description: string): string {
    return this.textUtilsService.limitText(description, 55);
  }

  ngOnInit() {
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        const element = this.el.nativeElement.querySelector(`.${fragment}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });

    this.route.data.subscribe((data: any) => {
      this.categories = data.data.filter(
        (category: { alias: string }) =>
          category.alias === 'Drips' ||
          category.alias === 'Beans' ||
          category.alias == 'Beverages'
      );
    });
  }

  ngAfterViewInit(): void {
    this.productRepo
    .getTotalProduct()
    .pipe(
      concatMap((productCounts) => {
        const pageSize = 5;
        const totalPages = Math.ceil(productCounts / pageSize);

        const observables = [];
        for (let i = 1; i <= totalPages; i++) {
          observables.push(
            // kalo mau pake delay agar request ke server nya ada delay nya
            // this.productRepo.getList(i, pageSize).pipe(delay(2000))
            this.productRepo.getList(i, pageSize)
          );
        }

        return concat(...observables);
      })
    )
    .subscribe({
      next: (res: Product[]) => {
        if (!this.products) {
          this.products = [];
        }

        this.products.push(...res);
        this.imageUrl = AuthConstant.IMAGE_URL;
        this.productsLoaded = true;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  searchProducts() {
    this.searchErrorMessage = '';

    if (this.searchTerm.trim() !== '') {
      const searchTermLower = this.searchTerm.toLowerCase();

      const filteredProducts = this.products.filter((product) =>
        product.name.toLowerCase().includes(searchTermLower)
      );

      if (filteredProducts.length > 0) {
        this.products = filteredProducts;
      } else {
        this.searchErrorMessage = `Produk <strong> ${this.searchTerm} </strong> tidak cocok dengan nama produk yang tersedia <br/> periksa kembali keyword pencarian anda`;
      }
    } else {
      this.products = [];
      this.ngAfterViewInit();
    }
  }

  getProductsByCategory(category: Category) {
    return this.products
      ? this.products.filter(
          (product) => product.category?.alias === category.alias
        )
      : [];
  }

  goToDetailProduct(product: Product) {
    this.product = product;
    this.modalTitle = 'Detail Produk';
    this.modalComponent.openModal();
  }
}
