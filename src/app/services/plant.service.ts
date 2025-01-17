import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PlantService {
  private apiUrl = 'https://perenual.com/api';
  private apiKey = 'sk-LNTR6779f8a4ad8838147';

  constructor(private http: HttpClient) { }
  private getCacheKey(url: string): string {
    return `cache_${url}`;
  }

  private getFromCache(url: string): any {
    const cachedData = localStorage.getItem(this.getCacheKey(url));
    return cachedData ? JSON.parse(cachedData) : null;
  }
  private saveToCache(url: string, data: any): void {
    localStorage.setItem(this.getCacheKey(url), JSON.stringify(data));
  }


  getPlantInfo(plantName: string): Observable<any> {
    const url = `${this.apiUrl}?key=${this.apiKey}&q=${encodeURIComponent(plantName)}`;
    const cachedData = this.getFromCache(url);

    if (cachedData) {
      return of(cachedData);
    } else {
      return this.http.get(url).pipe(
        tap(data => this.saveToCache(url, data))
      );
    }
  }

  getAllPlants(page: number = 1, perPage: number = 30): Observable<any> {
    const url = `${this.apiUrl}/species-list?key=${this.apiKey}&page=${page}&per_page=${perPage}`;
    const cachedData = this.getFromCache(url);

    if (cachedData) {
      return of(cachedData); // Retorna los datos en cache
    } else {
      return this.http.get(url).pipe(
        tap(data => this.saveToCache(url, data)) // Cacheamos la respuesta
      );
    }
  }

  getPlantDetails(id: number): Observable<any> {
    const url = `${this.apiUrl}/species/details/${id}?key=${this.apiKey}`;
    const cachedData = this.getFromCache(url);

    if (cachedData) {
      return of(cachedData);
    } else {
      return this.http.get<any>(url).pipe(
        tap(data => this.saveToCache(url, data))
      );
    }
  }

  getFAQs(id: number): Observable<any> {
    const url = `${this.apiUrl}/article-faq-list?key=${this.apiKey}`;
    const cachedData = this.getFromCache(url);

    if (cachedData) {
      return of(cachedData);
    } else {
      return this.http.get<any>(url).pipe(
        tap(data => this.saveToCache(url, data))
      );
    }
  }

}