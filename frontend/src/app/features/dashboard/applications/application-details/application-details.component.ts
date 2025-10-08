import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

// Material imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.css'],
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatToolbarModule,
    MatButtonModule,
    MatIconModule, 
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatChipsModule,
    MatTooltipModule,
    MatMenuModule
  ]
})
export class ApplicationDetailsComponent implements OnInit {
  currentUser: any;
  applicationId: string = '';
  application = {
    id: '',
    year: '',
    status: '',
    submittedDate: '',
    type: '',
    duration: '',
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      studentId: ''
    },
    accommodationDetails: {
      type: '',
      moveInDate: '',
      duration: '',
      specialRequirements: ''
    },
    documents: [
      { name: 'Student ID', status: 'Verified', date: '2024-01-15' },
      { name: 'Proof of Enrollment', status: 'Verified', date: '2024-01-15' },
      { name: 'Passport/ID', status: 'Verified', date: '2024-01-15' }
    ],
    timeline: [
      { date: '2024-01-15', status: 'Application Submitted', description: 'Your application has been received' },
      { date: '2024-01-16', status: 'Documents Verified', description: 'All required documents have been verified' },
      { date: '2024-01-17', status: 'Under Review', description: 'Application is being reviewed by the housing team' }
    ]
  };

  // Table columns definition for the documents table
  displayedColumns: string[] = ['name', 'status', 'date', 'actions'];

  isSmallScreen = false;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService,
      private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    this.route.params.subscribe(params => {
      this.applicationId = params['id'];
      // Here you would typically fetch the application details using the ID
      this.application.id = this.applicationId;
    });
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).subscribe(result => {
      this.isSmallScreen = result.matches;
    });
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'verified':
      case 'approved':
        return 'status-success';
      case 'pending':
      case 'under review':
        return 'status-warning';
      case 'rejected':
        return 'status-danger';
      default:
        return 'status-default';
    }
  }

  goBack() {
    this.router.navigate(['/applications']);
  }
}