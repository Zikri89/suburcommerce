import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
declare const $: any;
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnInit {
  @Input() modalTitle: string = '';
  constructor() {}

  ngOnInit(): void {}

  openModal() {
    $('#dynamicModal').modal('show');
  }
}
