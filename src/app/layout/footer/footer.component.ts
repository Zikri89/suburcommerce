import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import MedsosRepository from '../../services/repo/medsos_repository.service';
import { Medsos } from '../../models/medsos.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit {
  medsos: Medsos[] = [];
  constructor(private _medsos: MedsosRepository<Medsos>) {}

  ngOnInit(): void {
    this._medsos.medsos$.subscribe({
      next: (res: Medsos[]) => {
        this.medsos = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
