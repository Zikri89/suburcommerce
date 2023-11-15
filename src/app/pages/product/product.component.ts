import { Component, ElementRef, AfterViewInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ProductList } from '../../models/product';
import { NetworkApiService } from '../../services/networkapi/networkapi.service';
import { TextUtilsService } from '../../services/text-utils/text-utils.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  providers: [NetworkApiService, HttpClient]
})

export class ProductComponent implements AfterViewInit {
  data: ProductList | null = null;
  errorMessage!: string;
  imageUrl: string = "";

  constructor(
    private route: ActivatedRoute,
    private el: ElementRef,
    private myService: NetworkApiService<ProductList>,
    private textUtilsService: TextUtilsService,
  ) { }

  limitText(description: string): string {
    return this.textUtilsService.limitText(description, 55);
  }

  ngAfterViewInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = this.el.nativeElement.querySelector(`.${fragment}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });

    this.imageUrl = environment.imageUrl

    this.myService.getData({param : 'Product/ListWithPrice?pageNumber=1&pageSize=5'}).subscribe({
      next: (value) => {
        this.data = value;
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }
}
