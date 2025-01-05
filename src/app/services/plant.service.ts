import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PlantService {
  private apiUrl = 'https://perenual.com/api';
  private apiKey = 'sk-LNTR6779f8a4ad8838147'; 

  constructor(private http: HttpClient) { }

  getPlantInfo(plantName: string): Observable<any> {
    const url = `${this.apiUrl}?key=${this.apiKey}&q=${encodeURIComponent(plantName)}`;
    return this.http.get(url);
  }

  getAllPlants(page: number = 1, perPage: number = 30): Observable<any> {
    const url = `${this.apiUrl}/species-list?key=${this.apiKey}&page=${page}&per_page=${perPage}`;
    return this.http.get(url);
  }

  getPlantDetails(id: number): Observable<any> {
    const url = `https://perenual.com/api/species/details/${id}?key=${this.apiKey}`;
    return this.http.get<any>(url);
  }

  getFAQs(id: number): Observable<any> {
    const url = `https://perenual.com/api/article-faq-list?key=${this.apiKey}`;
    return this.http.get<any>(url);
  }
}