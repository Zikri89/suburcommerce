import { Component, ElementRef  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Product, ProductList } from '../../models/product';
import { NetworkApiService } from '../../services/networkapi.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  providers: [NetworkApiService, HttpClient]
})
export class ProductComponent {
  data: ProductList | null = null;
  errorMessage!: string;
  constructor(private route: ActivatedRoute, private el: ElementRef, private myService: NetworkApiService<ProductList>) { }
  ngAfterViewInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = this.el.nativeElement.querySelector(`.${fragment}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });

    this.myService.getDataList({param : 'products'}).subscribe({
      next: (value) => {
        this.data = value;
      },
      error: (error) => {
        this.errorMessage = error;
      }
    });
  }
}
