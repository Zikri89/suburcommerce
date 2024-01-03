import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthConstant } from '../constants/constants.service';
import BannerRepository from '../services/repo/banner_repository.service';
import { Banner } from '../models/banner.interface';
import { map } from 'rxjs';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  banners: Banner[] = [];
  imageUrl: string = AuthConstant.IMAGE_URL;

  constructor(private _loadBanners: BannerRepository<Banner>) {}

  ngOnInit(): void {
    this._loadBanners.banners$.subscribe({
      next: (res: Banner[]) => {
        this.banners = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
