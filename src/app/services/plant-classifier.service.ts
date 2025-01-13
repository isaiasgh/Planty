import { Injectable } from '@angular/core';
import * as tmImage from '@teachablemachine/image';

@Injectable({
  providedIn: 'root',
})
export class PlantClassifierService {
  private model: any;
  private modelURL = 'https://teachablemachine.withgoogle.com/models/cgdra_62S/model.json';
  private metadataURL = 'https://teachablemachine.withgoogle.com/models/cgdra_62S/metadata.json';

  constructor() {
    this.loadModel();
  }

  async loadModel() {
    this.model = await tmImage.load(this.modelURL, this.metadataURL);
    console.log('Modelo cargado correctamente');
  }

  async predict(imageSrc: string): Promise<string> {
    const img = new Image();
    img.src = imageSrc;

    await new Promise((resolve) => {
      img.onload = resolve;
    });

    type Prediction = {
        className: string;
        probability: number;
    };

    const predictions = await this.model.predict(img);
    const bestPrediction = predictions.reduce((prev: Prediction, current: Prediction) =>
      prev.probability > current.probability ? prev : current
    );

    console.log(`Planta detectada: ${bestPrediction.className} con ${(bestPrediction.probability * 100).toFixed(2)}%`);
    return bestPrediction.className;
  }
}
