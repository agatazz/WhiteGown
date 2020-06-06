import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, switchMap } from 'rxjs/operators';

import { Dress } from './dress.model';
import { AuthService } from '../auth/auth.service';


interface DressData {
  availableFrom: string;
  availableTo: string;
  description: string;
  imageUrl: string;
  price: number;
  title: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class DressesService {
  private _dress = new BehaviorSubject<Dress[]>([]);

  get dresses() {
    return this._dress.asObservable();
  }

  constructor(private authService: AuthService, private http: HttpClient) {}

  fetchDresses() {
    return this.http
      .get<{ [key: string]: DressData }>(
        'https://whitegown-c3344.firebaseio.com/offered-dresses.json'
      )
      .pipe(
        map(resData => {
          const dresses = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              dresses.push(
                new Dress(
                  key,
                  resData[key].title,
                  resData[key].description,
                  resData[key].imageUrl,
                  resData[key].price,
                  new Date(resData[key].availableFrom),
                  new Date(resData[key].availableTo),
                  resData[key].userId
                )
              );
            }
          }
          return dresses;
          // return [];
        }),
        tap(dresses => {
          this._dress.next(dresses);
        })
      );
  }

  getDress(id: string) {
    return this.http
      .get<DressData>(
        `https://whitegown-c3344.firebaseio.com/offered-dresses/${id}.json`
      )
      .pipe(
        map(dressData => {
          return new Dress(
            id,
            dressData.title,
            dressData.description,
            dressData.imageUrl,
            dressData.price,
            new Date(dressData.availableFrom),
            new Date(dressData.availableTo),
            dressData.userId
          );
        })
      );
  }
//jest ok- nie zmieniać
   uploadImage(image: File) {
   const uploadData = new FormData();
   uploadData.append('image', image)

  return this.http.post<{imageUrl: string, imagePath: string}>(
  'https://us-central1-whitegown-c3344.cloudfunctions.net/storeImage', 
   uploadData 
    );
  }

  addDress(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date,
    imageUrl: string
  ) {
    let generatedId: string;
    let newDress: Dress;
    return this.authService.userId.pipe(
      take(1), 
      switchMap(userId => {
        if(!userId) {
          throw new Error('User not found');
      }
      newDress = new Dress(
        Math.random().toString(),
        title,
        description,
        imageUrl,
        price,
        dateFrom,
        dateTo,
        userId
      );
      return this.http
        .post<{ name: string }>(
          'https://whitegown-c3344.firebaseio.com/offered-dresses.json',
          {
            ...newDress,
            id: null
          }
        )

    }),
        switchMap(resData => {
          generatedId = resData.name;
          return this.dresses;
        }),
        take(1),
        tap(dresses => {
          newDress.id = generatedId;
          this._dress.next(dresses.concat(newDress));
        })
      );
   
  }

  updateDress(dressId: string, title: string, description: string) {
    let updatedDresses: Dress[];
    return this.dresses.pipe(
      take(1),
      switchMap(dresses => {
        if (!dresses || dresses.length <= 0) {
          return this.fetchDresses();
        } else {
          return of(dresses);
        }
      }),
      switchMap(dresses => {
        const updatedDressIndex = dresses.findIndex(pl => pl.id === dressId);
        updatedDresses = [...dresses];
        const oldDress = updatedDresses[updatedDressIndex];
        updatedDresses[updatedDressIndex] = new Dress(
          oldDress.id,
          title,
          description,
          oldDress.imageUrl,
          oldDress.price,
          oldDress.availableFrom,
          oldDress.availableTo,
          oldDress.userId
        );
        return this.http.put(
          `https://whitegown-c3344.firebaseio.com/offered-dresses/${dressId}.json`,
          { ...updatedDresses[updatedDressIndex], id: null }
        );
      }),
      tap(() => {
        this._dress.next(updatedDresses);
      })
    );
  }
}
