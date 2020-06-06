import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';

import { DressesService } from '../dresses.service';
import { Dress } from '../dress.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss']
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedDresses: Dress[];
  listedLoadedDresses: Dress[];
  relevantDresses: Dress[];
  isLoading = false;
  private dressesSub: Subscription;

  constructor(
    private dressesService: DressesService,
    private menuCtrl: MenuController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.dressesSub = this.dressesService.dresses.subscribe(dresses => {
      this.loadedDresses = dresses;
      this.relevantDresses = this.loadedDresses;
      this.listedLoadedDresses = this.relevantDresses.slice(1);
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.dressesService.fetchDresses().subscribe(() => {
      this.isLoading = false;
    });
  }

  onOpenMenu() {
    this.menuCtrl.toggle();
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    this.authService.userId.subscribe(userId => {
      if (event.detail.value === 'all') {
        this.relevantDresses = this.loadedDresses;
        this.listedLoadedDresses = this.relevantDresses.slice(1);
      } else {
        this.relevantDresses = this.loadedDresses.filter(
          dress => dress.userId !== userId
        );
        this.listedLoadedDresses = this.relevantDresses.slice(1);
      }
    });
  }

  ngOnDestroy() {
    if (this.dressesSub) {
      this.dressesSub.unsubscribe();
    }
  }
}
