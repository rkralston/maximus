import { element } from 'protractor';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(public http: HttpClient) { }

  getCityWeatherByName(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<string> {
    const dataSubject = new Subject<string>();
    this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=6f3d8c7652701b92a494ed081ccb95b7`)
      .subscribe((data) => {
        dataSubject.next(data['weather']);
      }, (err) => {
        console.log(err);
      });
    return dataSubject;
  }

  getCitiesWeatherByName(cities: Array<string>, metric: 'metric' | 'imperial' = 'metric'): Subject<any> {
    const citiesSubject = new Subject();
    cities.forEach((city) => {
      citiesSubject.next(this.http.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=6f3d8c7652701b92a494ed081ccb95b7`));
    });
    return citiesSubject;
  }

  getWeatherState(city: string): Subject<string> {
    const dataSubject = new Subject<string>();
    this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=6f3d8c7652701b92a494ed081ccb95b7`)
      .subscribe((data) => {
        dataSubject.next(data['weather'][0].main);
      });
    return dataSubject;
  }

  getCurrentTemp(city: string, metric: 'metric' | 'impperial' = 'metric'): Subject<number> {
    const dataSubject = new Subject<number>();
    this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=6f3d8c7652701b92a494ed081ccb95b7`)
      .subscribe((weather: any) => {
        dataSubject.next(Math.round(Number(weather.main.temp)));
      });
    return dataSubject;
  }

  getCurrentHum(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject = new Subject<number>();
    this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=6f3d8c7652701b92a494ed081ccb95b7`)
      .subscribe((weather: any) => {
        console.log(weather);
        dataSubject.next(weather.main.humidity);
      });
    return dataSubject;
  }

  getCurrentWind(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject = new Subject<number>();
    this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=6f3d8c7652701b92a494ed081ccb95b7`)
      .subscribe((weather: any) => {
        dataSubject.next(Math.round(Number(weather.wind.speed)));
      });
    return dataSubject;
  }

  getMaxTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject = new Subject<number>();
    let max: number;
    this.http.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=6f3d8c7652701b92a494ed081ccb95b7`)
      .subscribe((weather: any) => {
        weather.list.forEach(element => {
          if (max < element.main.temp) {
            max = element.main.temp;
          }
        });
        dataSubject.next(Math.round(max));
      });
    return dataSubject;
  }

  getMinTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject = new Subject<number>();
    let min: number;
    this.http.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=6f3d8c7652701b92a494ed081ccb95b7`)
      .subscribe((weather: any) => {
        min = weather.list[0].main.temp;
        weather.list.forEach(element => {
          if (min > element.main.temp) {
            min = element.main.temp;
          }
        });
        dataSubject.next(Math.round(min));
      });
    return dataSubject;
  }

  getForecast(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<Array<any>> {
    const dataSubject = new Subject<Array<any>>();
    this.http.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=6f3d8c7652701b92a494ed081ccb95b7`)
      .subscribe((weather: any) => {
        dataSubject.next(weather.list);
      });
    return dataSubject;
  }
}
