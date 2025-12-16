import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-evidence-modal',
  standalone: true,
  imports: [NgIf],
  templateUrl: './evidence-modal.component.html',
  styleUrl: './evidence-modal.component.scss'
})
export class EvidenceModalComponent {
  @Input() src = '';
  @Input() open = false;
  @Output() close = new EventEmitter<void>();
}
