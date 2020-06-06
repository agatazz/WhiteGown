import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { DressesService } from '../dresses.service';
import { Dress } from '../dress.model';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss']
})
export class OffersPage implements OnInit, OnDestroy {
  offers: Dress[];
  isLoading = false;
  private dressesSub: Subscription;

  constructor(private dressesService: DressesService, private router: Router) {}

  ngOnInit() {
    this.dressesSub = this.dressesService.dresses.subscribe(dresses => {
      this.offers = dresses;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.dressesService.fetchDresses().subscribe(() => {
      this.isLoading = false;
    });
  }

  onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'dresses', 'tabs', 'offers', 'edit', offerId]);
    console.log('Editing item', offerId);
  }

  ngOnDestroy() {
    if (this.dressesSub) {
      this.dressesSub.unsubscribe();
    }
  }
}
