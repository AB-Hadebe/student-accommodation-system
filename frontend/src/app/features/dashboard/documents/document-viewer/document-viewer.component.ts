import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.css'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatChipsModule, MatDividerModule, MatDialogModule]
})
export class DocumentViewerComponent {
  @Input() document: any;
  @Output() close = new EventEmitter<void>();

  getStatusClass(status: string): string {
    if (!status) return 'status-neutral';
    switch (status.toLowerCase()) {
      case 'verified':
        return 'status-success';
      case 'pending':
        return 'status-warning';
      case 'rejected':
        return 'status-danger';
      default:
        return 'status-neutral';
    }
  }

  onClose() {
    this.close.emit();
  }

}