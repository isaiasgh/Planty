import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PlantService {
  private apiUrl = 'https://perenual.com/api';
  private apiKey = 'sk-QjHG678a1fad6d9f18259';

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
    if (id === 8902){
      return of(cactusConstant)
    }
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

const cactusConstant = {
  "id": 8902,
  "common_name": "Golden Barrel Cactus",
  "scientific_name": [
      "Echinocactus grusonii"
  ],
  "other_name": ["Cactus de bola de oro", "Cactus barril dorado"],
  "family": "Cactaceae",
  "origin": [
      "Mexico"
  ],
  "type": "Cactus",
  "dimension": "3.00 to 4.00 feet",
  "dimensions": {
      "type": null,
      "min_value": 3,
      "max_value": 4,
      "unit": "feet"
  },
  "cycle": "Perennial",
  "attracts": ["Bees"],
  "propagation": [
      "Cutting",
      "Seed Propagation"
  ],
  "hardiness": {
      "min": "9",
      "max": "11"
  },
  "hardiness_location": {
      "full_url": "https://perenual.com/api/hardiness-map?species_id=1234&size=og&key=sk-XXXX",
      "full_iframe": "<iframe frameborder=0 scrolling=yes seamless=seamless width=1000 height=550 style='margin:auto;' src='https://perenual.com/api/hardiness-map?species_id=1234&size=og&key=sk-XXXX'></iframe>"
  },
  "watering": "Low",
  "depth_water_requirement": [],
  "volume_water_requirement": {
      "unit": "gallon",
      "value": "0.5"
  },
  "watering_period": "Monthly",
  "watering_general_benchmark": {
      "value": "14-21",
      "unit": "days"
  },
  "plant_anatomy": [
      {
          "part": "flower",
          "color": [
              "yellow"
          ]
      },
      {
          "part": "petals",
          "color": [
              "yellow"
          ]
      },
      {
          "part": "stamens",
          "color": [
              "yellow"
          ]
      },
      {
          "part": "leaves",
          "color": [
              "green"
          ]
      },
      {
          "part": "branch",
          "color": [
              "green"
          ]
      },
      {
          "part": "trunk",
          "color": [
              "green"
          ]
      }
  ],
  "sunlight": [
      "Full sun"
  ],
  "pruning_month": [],
  "pruning_count": [],
  "seeds": 100,
  "maintenance": "Low",
  "care-guides": "http://perenual.com/api/species-care-guide-list?species_id=1234&key=sk-XXXX",
  "soil": [
      "Well-drained soil",
      "Sandy soil"
  ],
  "growth_rate": "Slow",
  "drought_tolerant": true,
  "salt_tolerant": false,
  "thorny": true,
  "invasive": false,
  "tropical": false,
  "indoor": true,
  "care_level": "Low",
  "pest_susceptibility": ["Mealybugs", "Scale insects"],
  "pest_susceptibility_api": "Coming Soon",
  "flowers": true,
  "flowering_season": "Spring",
  "flower_color": "Yellow",
  "cones": false,
  "fruits": false,
  "edible_fruit": false,
  "edible_fruit_taste_profile": "N/A",
  "fruit_nutritional_value": "N/A",
  "fruit_color": [],
  "harvest_season": null,
  "leaf": false,
  "leaf_color": [],
  "edible_leaf": false,
  "cuisine": false,
  "medicinal": false,
  "poisonous_to_humans": 0,
  "poisonous_to_pets": 0,
  "description": "The Golden Barrel Cactus is one of the most iconic cacti with its round, spiny appearance and vibrant yellow flowers in spring. Native to Mexico, this cactus is well-suited for desert gardens and can also be grown indoors in a sunny spot. It grows slowly, reaching a height of up to 4 feet, and requires minimal care. This cactus is drought-tolerant, making it a great choice for low-maintenance gardeners.",
  "default_image": {
      "license": 5,
      "license_name": "Attribution-ShareAlike License",
      "license_url": "https://creativecommons.org/licenses/by-sa/2.0/",
      "original_url": "https://perenual.com/storage/species_image/8551_echinocactus_grusonii/og/52623515667_8855ba17de_b.jpg",
      "regular_url": "https://perenual.com/storage/species_image/8551_echinocactus_grusonii/og/52623515667_8855ba17de_b.jpg",
      "medium_url": "https://example.com/images/golden_barrel_cactus_medium.jpg",
      "small_url": "https://example.com/images/golden_barrel_cactus_small.jpg",
      "thumbnail": "https://example.com/images/golden_barrel_cactus_thumbnail.jpg"
  },
  "other_images": "Upgrade Plan To Supreme For Access https://perenual.com/subscription-api-pricing. Im sorry"
}
