import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

// Material imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-new-application',
  templateUrl: './new-application.component.html',
  styleUrls: ['./new-application.component.css'],
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule, 
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatDividerModule
  ]
})
export class NewApplicationComponent implements OnInit {
  applicationForm: FormGroup;
  isSubmitting = false;
  currentUser: any;

  // Accommodation types for the dropdown
  accommodationTypes = [
    { value: 'single', viewValue: 'Single Room' },
    { value: 'double', viewValue: 'Double Room' },
    { value: 'studio', viewValue: 'Studio Apartment' },
    { value: 'ensuite', viewValue: 'En-suite Room' }
  ];

  // Duration options for the dropdown
  durationOptions = [
    { value: 'semester', viewValue: 'One Semester' },
    { value: 'academic-year', viewValue: 'Academic Year' },
    { value: 'full-year', viewValue: 'Full Year' }
  ];

  // Meal plan options for the dropdown
  mealPlanOptions = [
    { value: 'none', viewValue: 'No Meal Plan' },
    { value: 'basic', viewValue: 'Basic (14 meals/week)' },
    { value: 'standard', viewValue: 'Standard (19 meals/week)' },
    { value: 'premium', viewValue: 'Premium (unlimited)' }
  ];

  // Room preference options for the dropdown
  roomPreferenceOptions = [
    { value: 'quiet', viewValue: 'Quiet Study Floor' },
    { value: 'social', viewValue: 'Social Floor' },
    { value: 'female-only', viewValue: 'Female-Only Floor' },
    { value: 'male-only', viewValue: 'Male-Only Floor' }
  ];

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private authService: AuthService
  ) {
    this.applicationForm = this.fb.group({
      accommodationType: ['', Validators.required],
      moveInDate: ['', Validators.required],
      duration: ['', Validators.required],
      mealPlan: ['', Validators.required],
      specialRequirements: [''],
      roomPreference: ['', Validators.required],
      budget: ['', [Validators.required, Validators.min(0)]],
      agreeToTerms: [false, Validators.requiredTrue]
    });
  }

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    if (!this.currentUser) {
      this.router.navigate(['/login']);
    }
  }

  onSubmit() {
    if (this.applicationForm.valid) {
      this.isSubmitting = true;
      const applicationData = {
        ...this.applicationForm.value,
        userId: this.currentUser.id
      };

      this.authService.submitApplication(applicationData).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.router.navigate(['/application-confirmation']);
        },
        error: (error) => {
          this.isSubmitting = false;
          console.error('Error submitting application:', error);
        }
      });
    } else {
      this.applicationForm.markAllAsTouched();
    }
  }
}