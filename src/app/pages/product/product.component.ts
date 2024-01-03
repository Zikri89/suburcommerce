import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TextUtilsService } from '../../services/text-utils/text-utils.service';
import { Product } from '../../models/product.interface';
import { ProductRepository } from '../../services/repo/product_repository.service';
import { AuthConstant } from '../../constants/constants.service';
import { Category } from '../../models/category.interface';
import { concat, concatMap } from 'rxjs';
import { Lightbox, LightboxModule } from 'ngx-lightbox';
import { HeroComponent } from '../../hero/hero.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, LightboxModule, HeroComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  providers: [HttpClient],
})
export class ProductComponent implements OnInit, AfterViewInit {
  errorMessage!: string;
  categories!: Category[];
  products!: Product[];
  imageUrl!: string;
  currentIndex: number = 0;
  productsLoaded: boolean = false;
  images: Array<any> = [];

  constructor(
    private route: ActivatedRoute,
    private el: ElementRef,
    private textUtilsService: TextUtilsService,
    private productRepo: ProductRepository<Product>,
    private cdr: ChangeDetectorRef,
    private _lightbox: Lightbox
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

        for (let i = 0; i <= this.products.length; i++) {
          const product = this.products[i];
          if (product && product.details && product.details[0]) {
            const src = this.imageUrl + '' + product.details[0].imageUrl;
            const caption = this.limitText(product.remarks);
            const thumb = this.imageUrl + product.details[0].imageUrl;
            const album = {
              src: src,
              caption: caption,
              thumb: thumb,
            };

            this.images.push(album);
          }
        }

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  open(index: number): void {
    this._lightbox.open(this.images, index);
  }
}
