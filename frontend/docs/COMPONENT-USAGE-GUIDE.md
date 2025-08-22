# Angular Material Component Usage Guide

## 🎯 Overview
This guide provides standardized patterns for using Angular Material components in the Student Accommodation System, following our Apple-inspired design system.

## 🏗️ Architecture Principles

### Standalone Components
All components must use Angular's standalone pattern:
```typescript
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [
    CommonModule,
    // Material modules as needed
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent {
  // Component logic
}
```

### Import Organization
```typescript
// 1. Angular core imports
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// 2. Angular forms (if needed)
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

// 3. Angular router (if needed)
import { Router, RouterModule } from '@angular/router';

// 4. Material imports (grouped)
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

// 5. Application services
import { AuthService } from '../../core/services/auth.service';
```

## 🎨 Visual Components

### Cards
```html
<!-- Standard card pattern -->
<mat-card class="content-card">
  <mat-card-header>
    <mat-card-title>
      <mat-icon class="card-icon">folder</mat-icon>
      Card Title
    </mat-card-title>
    <mat-card-subtitle>Optional subtitle</mat-card-subtitle>
  </mat-card-header>
  <mat-card-content>
    <!-- Card content -->
  </mat-card-content>
</mat-card>
```

### Buttons
```html
<!-- Primary action -->
<button mat-raised-button color="primary" (click)="primaryAction()">
  <mat-icon>add</mat-icon>
  Primary Action
</button>

<!-- Secondary action -->
<button mat-stroked-button color="primary" (click)="secondaryAction()">
  <mat-icon>edit</mat-icon>
  Secondary Action
</button>

<!-- Danger action -->
<button mat-stroked-button color="warn" (click)="dangerAction()">
  <mat-icon>delete</mat-icon>
  Delete
</button>

<!-- Icon button -->
<button mat-icon-button (click)="iconAction()" [attr.aria-label]="'Action description'">
  <mat-icon>more_vert</mat-icon>
</button>
```

### Navigation
```html
<!-- Toolbar pattern -->
<mat-toolbar color="primary" class="app-toolbar" role="banner">
  <div class="toolbar-content">
    <span class="app-title">Application Title</span>
    <span class="spacer"></span>
    <nav class="toolbar-nav" aria-label="Main navigation">
      <a mat-button routerLink="/path" routerLinkActive="active-link">
        <mat-icon>home</mat-icon>
        Home
      </a>
    </nav>
  </div>
</mat-toolbar>
```

## 📊 Data Display

### Tables
```typescript
// Component
export class DataTableComponent {
  displayedColumns: string[] = ['name', 'status', 'date', 'actions'];
  dataSource = new MatTableDataSource(this.data);
}
```

```html
<!-- Template -->
<div class="table-container">
  <table mat-table [dataSource]="dataSource" class="mat-elevation-z1">
    <!-- Name Column -->
    <ng-container matColumnDef="name">
      <th mat-header-cell *matHeaderCellDef>Name</th>
      <td mat-cell *matCellDef="let item">{{item.name}}</td>
    </ng-container>

    <!-- Status Column -->
    <ng-container matColumnDef="status">
      <th mat-header-cell *matHeaderCellDef>Status</th>
      <td mat-cell *matCellDef="let item">
        <mat-chip [ngClass]="getStatusClass(item.status)">
          {{item.status}}
        </mat-chip>
      </td>
    </ng-container>

    <!-- Actions Column -->
    <ng-container matColumnDef="actions">
      <th mat-header-cell *matHeaderCellDef>Actions</th>
      <td mat-cell *matCellDef="let item">
        <button mat-stroked-button color="primary" (click)="viewItem(item)">
          <mat-icon>visibility</mat-icon>
          View
        </button>
      </td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
  </table>
</div>
```

### Status Chips
```typescript
// Status class helper
getStatusClass(status: string): string {
  switch (status?.toLowerCase()) {
    case 'approved':
    case 'verified':
      return 'status-success';
    case 'pending':
    case 'under review':
      return 'status-warning';
    case 'rejected':
    case 'failed':
      return 'status-danger';
    default:
      return 'status-neutral';
  }
}
```

```css
/* Status styles */
.status-success {
  background-color: #e8f5e9 !important;
  color: #2e7d32 !important;
}

.status-warning {
  background-color: #fff8e1 !important;
  color: #f57f17 !important;
}

.status-danger {
  background-color: #ffebee !important;
  color: #c62828 !important;
}

.status-neutral {
  background-color: #e0e0e0 !important;
  color: #424242 !important;
}
```

## 📝 Forms

### Form Structure
```typescript
// Component
export class FormComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      status: ['', [Validators.required]]
    });
  }
}
```

```html
<!-- Template -->
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <!-- Text Input -->
  <mat-form-field appearance="outline" class="full-width">
    <mat-label>Name</mat-label>
    <input matInput formControlName="name" placeholder="Enter name">
    <mat-error *ngIf="form.get('name')?.hasError('required')">
      Name is required
    </mat-error>
  </mat-form-field>

  <!-- Select -->
  <mat-form-field appearance="outline" class="full-width">
    <mat-label>Status</mat-label>
    <mat-select formControlName="status">
      <mat-option [value]="option.value" *ngFor="let option of statusOptions">
        {{option.label}}
      </mat-option>
    </mat-select>
    <mat-error *ngIf="form.get('status')?.hasError('required')">
      Please select a status
    </mat-error>
  </mat-form-field>

  <!-- Submit Button -->
  <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
    Submit
  </button>
</form>
```

### File Upload
```html
<div class="file-upload-container">
  <div class="file-input-wrapper">
    <input type="file" #fileInput (change)="onFileSelected($event)" class="file-input">
    <button mat-stroked-button type="button" (click)="fileInput.click()">
      <mat-icon>attach_file</mat-icon>
      Select File
    </button>
    <span class="file-name">{{selectedFileName || 'No file selected'}}</span>
  </div>
</div>
```

## 🎭 Loading States

### Progress Indicators
```html
<!-- Determinate progress -->
<mat-progress-bar mode="determinate" [value]="progressValue"></mat-progress-bar>

<!-- Indeterminate progress -->
<mat-progress-bar mode="indeterminate"></mat-progress-bar>

<!-- Spinner in button -->
<button mat-raised-button [disabled]="isLoading">
  <mat-spinner *ngIf="isLoading" diameter="20" class="button-spinner"></mat-spinner>
  <span>{{isLoading ? 'Loading...' : 'Submit'}}</span>
</button>
```

## 🔔 Feedback

### Snackbar Notifications
```typescript
// Service injection
constructor(private snackBar: MatSnackBar) {}

// Success message
showSuccess(message: string): void {
  this.snackBar.open(message, 'Close', {
    duration: 3000,
    panelClass: ['success-snackbar']
  });
}

// Error message
showError(message: string): void {
  this.snackBar.open(message, 'Close', {
    duration: 5000,
    panelClass: ['error-snackbar']
  });
}
```

## 🎨 Styling Guidelines

### CSS Custom Properties
```css
:root {
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;

  /* Border radius */
  --border-radius-sm: 8px;
  --border-radius-md: 12px;
  --border-radius-lg: 16px;

  /* Colors */
  --color-primary: #0a84ff;
  --color-success: #34c759;
  --color-warning: #ff9500;
  --color-error: #ff3b30;
}
```

### Layout Patterns
```css
/* Page container */
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-lg);
}

/* Full width form fields */
.full-width {
  width: 100%;
  margin-bottom: var(--spacing-md);
}

/* Grid layouts */
.grid {
  display: grid;
  gap: var(--spacing-md);
}

.two-cols {
  grid-template-columns: repeat(2, 1fr);
}

@media (max-width: 768px) {
  .two-cols {
    grid-template-columns: 1fr;
  }
}
```

## ♿ Accessibility

### ARIA Attributes
```html
<!-- Use [attr.aria-*] for dynamic values -->
<button mat-button [attr.aria-label]="buttonLabel" [attr.aria-pressed]="isPressed">
  Toggle
</button>

<!-- Static aria attributes -->
<nav aria-label="Main navigation">
  <a mat-button routerLink="/home" aria-current="page">Home</a>
</nav>

<!-- Form labels -->
<mat-form-field>
  <mat-label>Email Address</mat-label>
  <input matInput type="email" formControlName="email" 
         [attr.aria-describedby]="hasEmailError ? 'email-error' : null">
  <mat-error id="email-error" *ngIf="hasEmailError">
    Please enter a valid email address
  </mat-error>
</mat-form-field>
```

### Keyboard Navigation
```typescript
// Handle keyboard events
@HostListener('keydown', ['$event'])
onKeyDown(event: KeyboardEvent): void {
  if (event.key === 'Enter' || event.key === ' ') {
    this.handleAction();
    event.preventDefault();
  }
}
```

## 🧪 Testing Patterns

### Component Testing
```typescript
describe('ExampleComponent', () => {
  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ExampleComponent,
        MatButtonModule,
        MatIconModule,
        NoopAnimationsModule
      ]
    });
    
    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
  });

  it('should render button with correct text', () => {
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.textContent.trim()).toBe('Submit');
  });
});
```

## 🚨 Common Pitfalls

### ❌ Avoid
```html
<!-- Don't mix Bootstrap classes -->
<mat-card class="card-body">

<!-- Don't use generic aria attributes -->
<button aria-label="Button">

<!-- Don't forget imports -->
<mat-icon>home</mat-icon> <!-- MatIconModule not imported -->
```

### ✅ Correct
```html
<!-- Use Material classes and patterns -->
<mat-card class="content-card">

<!-- Use specific, meaningful aria attributes -->
<button [attr.aria-label]="'Navigate to home page'">

<!-- Ensure proper imports -->
@Component({
  imports: [MatIconModule],
  // ...
})
```

## 📋 Application Review Component

### Location
`src/app/features/auth/application-review/`

### Purpose
Displays user information for final review before application submission with Material design.

### Template Pattern
```html
<div class="review-container">
  <mat-card class="review-card">
    <mat-card-header class="review-header">
      <mat-card-title>Review Your Application</mat-card-title>
      <mat-card-subtitle>Please review your information before final submission</mat-card-subtitle>
    </mat-card-header>

    <mat-card-content class="review-content">
      <!-- Progress Bar -->
      <div class="progress-section">
        <mat-progress-bar mode="determinate" value="100"></mat-progress-bar>
        <p class="progress-text">Step 4 of 4</p>
      </div>

      <!-- Information Sections -->
      <div class="review-sections">
        <div class="review-section">
          <h3 class="section-title">
            <mat-icon>person</mat-icon>
            Personal Information
          </h3>
          <mat-card class="info-card">
            <mat-card-content>
              <div class="info-grid">
                <div class="info-item">
                  <span class="info-label">Name:</span>
                  <span class="info-value">{{ user.name }}</span>
                </div>
                <!-- More info items -->
              </div>
            </mat-card-content>
          </mat-card>
        </div>

        <mat-divider></mat-divider>

        <!-- Documents Section -->
        <div class="review-section">
          <h3 class="section-title">
            <mat-icon>description</mat-icon>
            Uploaded Documents
          </h3>
          <mat-card class="info-card">
            <mat-card-content>
              <div class="documents-list">
                <div *ngFor="let doc of documents" class="document-item">
                  <mat-icon class="document-icon success-icon">check_circle</mat-icon>
                  <span class="document-name">{{ doc.name }}</span>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>

        <!-- Terms Section -->
        <div class="review-section terms-section">
          <mat-checkbox [(ngModel)]="termsAccepted" required>
            I confirm that all information provided is accurate and complete
          </mat-checkbox>
        </div>
      </div>
    </mat-card-content>

    <mat-card-actions class="review-actions">
      <button mat-raised-button color="primary" [disabled]="!termsAccepted" (click)="submit()">
        <mat-icon>send</mat-icon>
        Submit Application
      </button>
    </mat-card-actions>
  </mat-card>
</div>
```

### TypeScript Requirements
```typescript
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatDividerModule
  ]
})
export class ApplicationReviewComponent {
  termsAccepted = false;
  // Component logic
}
```

---

## 📤 Document Upload Component

### Location
`src/app/features/auth/document-upload/`

### Purpose
Handles file uploads with drag-and-drop functionality using Material design components.

### Template Pattern
```html
<div class="upload-container">
  <mat-card class="upload-card">
    <mat-card-header class="upload-header">
      <mat-card-title>Document Upload</mat-card-title>
      <mat-card-subtitle>Upload required documents to complete your application</mat-card-subtitle>
    </mat-card-header>

    <mat-card-content class="upload-content">
      <!-- Progress Bar -->
      <div class="progress-section">
        <mat-progress-bar mode="determinate" value="75"></mat-progress-bar>
        <p class="progress-text">Step 3 of 4</p>
      </div>

      <!-- Document Upload Cards -->
      <div class="documents-section">
        <div *ngFor="let doc of requiredDocuments" class="document-card">
          <mat-card class="document-upload-card">
            <mat-card-content>
              <div class="document-header">
                <div class="document-info">
                  <h3 class="document-title">{{ doc.name }}</h3>
                  <p class="document-description">{{ doc.description }}</p>
                </div>
                <div class="upload-status" *ngIf="uploadedFiles[doc.id]">
                  <mat-icon class="success-icon">check_circle</mat-icon>
                  <mat-chip class="status-chip">Uploaded</mat-chip>
                </div>
              </div>

              <!-- File Input Area -->
              <div class="upload-area">
                <div class="file-input-container">
                  <input type="file" [id]="'file-' + doc.id" class="file-input"
                         (change)="onFileSelected($event, doc.id)"
                         accept=".pdf,.jpg,.jpeg,.png">
                  <label [for]="'file-' + doc.id" class="file-input-label">
                    <mat-icon>cloud_upload</mat-icon>
                    <span class="upload-text">Choose file or drag and drop</span>
                  </label>
                </div>
              </div>

              <!-- File Requirements -->
              <div class="file-requirements">
                <mat-icon class="info-icon">info</mat-icon>
                <span>Accepted formats: PDF, JPG, PNG (Max size: 5MB)</span>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </mat-card-content>

    <mat-card-actions class="upload-actions">
      <button mat-raised-button color="primary" [disabled]="!allFilesUploaded" (click)="continue()">
        <mat-icon>arrow_forward</mat-icon>
        Continue to Review
      </button>
    </mat-card-actions>
  </mat-card>
</div>
```

### TypeScript Requirements
```typescript
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ]
})
export class DocumentUploadComponent {
  uploadedFiles: { [key: string]: File } = {};
  
  onFileSelected(event: Event, documentId: string) {
    // File handling logic
  }
}
```

### CSS Features
- **Drag and drop styling** with hover states
- **Upload progress indicators** with Material progress bars
- **Error state handling** with Material error styling
- **File type icons** and status chips
- **Responsive grid layout** for multiple file uploads

---

## 📚 Resources
- [Angular Material Documentation](https://material.angular.io/)
- [Material Design Guidelines](https://m3.material.io/)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Apple Design Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

---

**Last Updated**: August 16, 2025  
**Version**: 1.0.0  
**Maintainer**: Development Team
