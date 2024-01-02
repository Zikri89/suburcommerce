import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  NgZone,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TextUtilsService } from '../../services/text-utils/text-utils.service';
import { Product } from '../../models/product.interface';
import { ProductRepository } from '../../services/repo/product_repository.service';
import { AuthConstant } from '../../constants/constants.service';
import { Category } from '../../models/category.interface';
import CategoryRepository from '../../services/repo/category_repository.service';
import {
  Observable,
  concat,
  concatMap,
  forkJoin,
  of,
  scan,
  switchMap,
  takeLast,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
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

  constructor(
    private route: ActivatedRoute,
    private el: ElementRef,
    private textUtilsService: TextUtilsService,
    private categoryRepo: CategoryRepository<Category>,
    private productRepo: ProductRepository<Product>,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
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
          observables.push(this.productRepo.getList(i, pageSize));
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
}
