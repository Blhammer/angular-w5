import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  numberOfFacts: number = 5;
  dogFacts: string[] = [];
  private baseUrl = 'https://dog-api.kinduff.com/api';

  constructor(private http: HttpClient) {}

  fetchDogFacts() {
    this.getDogFacts(this.numberOfFacts).subscribe(
      (data) => {
        this.dogFacts = data.facts;
        localStorage.setItem('dogFacts', JSON.stringify(this.dogFacts));
      },
      (err) => console.error(err)
    );
  }

  getDogFacts(number: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/facts?number=${number}`);
  }
}
