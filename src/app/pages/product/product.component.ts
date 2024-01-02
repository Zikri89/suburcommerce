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
import { Observable, concatMap, from, map, of } from 'rxjs';

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
  products!: Product[];
  imageUrl!: string
  currentIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private el: ElementRef,
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

    this.route.data.subscribe((data: any) => {
      this.products = data.data.products;
    });

    this.categories = this.route.snapshot.data['data']['categories']
    this.imageUrl = AuthConstant.IMAGE_URL
  }
}
