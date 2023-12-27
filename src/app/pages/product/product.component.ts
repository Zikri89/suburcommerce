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
  products!: Product[]
  imageUrl!: string

  constructor(
    private route: ActivatedRoute,
    private el: ElementRef,
    private _productRepo: ProductRepository<Product>,
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

    this._productRepo.products$.subscribe({
      next: (res) => {
        console.log(res)
        this.products = res;
        this.imageUrl = AuthConstant.IMAGE_URL;
      },
      error: (err) => {
        this.errorMessage = err;
        console.log(err)
      }
    })
  }
}
