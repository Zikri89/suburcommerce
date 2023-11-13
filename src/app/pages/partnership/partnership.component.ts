import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-partnership',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partnership.component.html',
  styleUrl: './partnership.component.css'
})
export class PartnershipComponent {
constructor(private route: ActivatedRoute, private el: ElementRef) { }
  ngAfterViewInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = this.el.nativeElement.querySelector(`.${fragment}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
}
