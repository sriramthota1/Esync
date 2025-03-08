import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  patients: any[] = [];
  API_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>(`${this.API_URL}/patients`).subscribe(
      data => this.patients = data,
      error => console.error('Error fetching patients:', error)
    );
  }
}
