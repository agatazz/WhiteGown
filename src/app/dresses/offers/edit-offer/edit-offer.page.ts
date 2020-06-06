import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NavController,
  LoadingController,
  AlertController
} from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { DressesService } from '../../dresses.service';
import { Dress } from '../../dress.model';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss']
})
export class EditOfferPage implements OnInit, OnDestroy {
  dress: Dress;
  dressId: string;
  form: FormGroup;
  isLoading = false;
  private dressSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private dressesService: DressesService,
    private navCtrl: NavController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('dressId')) {
        this.navCtrl.navigateBack('/dresses/tabs/offers');
        return;
      }
      this.dressId = paramMap.get('dressId');
      this.isLoading = true;
      this.dressSub = this.dressesService
        .getDress(paramMap.get('dressId'))
        .subscribe(
          dress => {
            this.dress = dress;
            this.form = new FormGroup({
              title: new FormControl(this.dress.title, {
                updateOn: 'blur',
                validators: [Validators.required]
              }),
              description: new FormControl(this.dress.description, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.maxLength(180)]
              })
            });
            this.isLoading = false;
          },
          error => {
            this.alertCtrl
              .create({
                header: 'An error occurred!',
                message: 'Dress could not be fetched. Please try again later.',
                buttons: [
                  {
                    text: 'Okay',
                    handler: () => {
                      this.router.navigate(['/dresses/tabs/offers']);
                    }
                  }
                ]
              })
              .then(alertEl => {
                alertEl.present();
              });
          }
        );
    });
  }

  onUpdateOffer() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl
      .create({
        message: 'Updating dress...'
      })
      .then(loadingEl => {
        loadingEl.present();
        this.dressesService
          .updateDress(
            this.dress.id,
            this.form.value.title,
            this.form.value.description
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigate(['/dresses/tabs/offers']);
          });
      });
  }

  ngOnDestroy() {
    if (this.dressSub) {
      this.dressSub.unsubscribe();
    }
  }
}
