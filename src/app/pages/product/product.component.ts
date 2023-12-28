import { Component, ElementRef, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BaseRepository } from '../../services/repo/base_repository.service';
import { TextUtilsService } from '../../services/text-utils/text-utils.service';
import { environment } from '../../../environments/environment.development';
import { Product } from '../../models/product.interface';
import { ProductRepository } from '../../services/repo/product_repository.service';
import { AuthConstant } from '../../constants/constants.service';
import CategoryRepository from '../../services/repo/category_repository.service';
import { Category } from '../../models/category.interface';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  providers: [HttpClient],
})

export class ProductComponent implements OnInit {
  errorMessage!: string;
  categories!: Category[]
  products!: Product[]
  imageUrl!: string

  constructor(
    private route: ActivatedRoute,
    private el: ElementRef,
    private _productRepo: ProductRepository<Product>,
    private _categoryRepo: CategoryRepository<Category>,
    private _activatedRoute: ActivatedRoute,
    private textUtilsService: TextUtilsService,
  ) { }

  limitText(description: string): string {
    return this.textUtilsService.limitText(description, 55);
  }

  ngOnInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = this.el.nativeElement.querySelector(`.${fragment}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });

    this._activatedRoute.data.subscribe({
      next: (res: any) => {
        this.products = res.data['products'];
        this.categories = res.data['categories'];
        this.imageUrl = AuthConstant.IMAGE_URL;

        console.log(this.categories)
      },
      error: (err) => {
        this.errorMessage = err;
        console.log(err)
      }
    })
  }
}
