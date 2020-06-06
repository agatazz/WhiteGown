import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NavController,
  ModalController,
  ActionSheetController,
  LoadingController,
  AlertController
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { DressesService } from '../../dresses.service';
import { Dress } from '../../dress.model';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
import { BookingService } from '../../../bookings/booking.service';
import { AuthService } from '../../../auth/auth.service';


@Component({
  selector: 'app-dresses-detail',
  templateUrl: './dress-detail.page.html',
  styleUrls: ['./dress-detail.page.scss']
})
export class DressDetailPage implements OnInit, OnDestroy {
  dress: Dress;
  isBookable = false;
  isLoading = false;
  title = 'Detailed informations';
  private dressSub: Subscription;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private dressesService: DressesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private bookingService: BookingService,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('dressId')) {
        this.navCtrl.navigateBack('/dresses/tabs/discover');
        return;
      }
      this.isLoading = true;
      let fetchedUserId: string;
      this.authService.userId
        .pipe(
          take(1),
          switchMap(userId => {
            if (!userId) {
              throw new Error('Found no user!');
            }
            fetchedUserId = userId;
            return this.dressesService.getDress(paramMap.get('dressId'));
          })
        )
        .subscribe(
          dress => {
            this.dress = dress;
            this.isBookable = dress.userId !== fetchedUserId;
            this.isLoading = false;
          },
          error => {
            this.alertCtrl
              .create({
                header: 'An error ocurred!',
                message: 'Could not load dress.',
                buttons: [
                  {
                    text: 'Okay',
                    handler: () => {
                      this.router.navigate(['/dresses/tabs/discover']);
                    }
                  }
                ]
              })
              .then(alertEl => alertEl.present());
          }
        );
    });
  }

  onBookDress() {
    // this.router.navigateByUrl('/dresses/tabs/discover');
    // this.navCtrl.navigateBack('/dresses/tabs/discover');
    // this.navCtrl.pop();
    this.actionSheetCtrl
      .create({
        header: 'Choose an Action',
        buttons: [
          {
            text: 'Select Date',
            handler: () => {
              this.openBookingModal('select');
            }
          },
          {
            text: 'Random Date',
            handler: () => {
              this.openBookingModal('random');
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      })
      .then(actionSheetEl => {
        actionSheetEl.present();
      });
  }

  openBookingModal(mode: 'select' | 'random') {
    console.log(mode);
    this.modalCtrl
      .create({
        component: CreateBookingComponent,
        componentProps: { selectedDress: this.dress, selectedMode: mode }
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resultData => {
        if (resultData.role === 'confirm') {
          this.loadingCtrl
            .create({ message: 'Booking dress...' })
            .then(loadingEl => {
              loadingEl.present();
              const data = resultData.data.bookingData;
              this.bookingService
                .addBooking(
                  this.dress.id,
                  this.dress.title,
                  this.dress.imageUrl,
                  data.firstName,
                  data.lastName,
                  //data.guestNumber,
                  data.startDate,
                  data.endDate
                )
                .subscribe(() => {
                  loadingEl.dismiss();
                });
            });
        }
      });
  }


  ngOnDestroy() {
    if (this.dressSub) {
      this.dressSub.unsubscribe();
    }
  }
}
