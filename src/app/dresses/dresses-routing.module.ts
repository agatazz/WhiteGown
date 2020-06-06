import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DressesPage } from './dresses.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: DressesPage,
    children: [
      {
        path: 'discover',
        children: [
          {
            path: '',
            loadChildren: () => import('./discover/discover.module').then(m => m.DiscoverPageModule)
          },
          {
            path: ':dressId',
            loadChildren: () => import('./discover/dress-detail/dress-detail.module').then(m => m.DressDetailPageModule)
          }
        ]
      },
      {
        path: 'offers',
        children: [
          {
            path: '',
            loadChildren: () => import('./offers/offers.module').then(m => m.OffersPageModule)
          },
          {
            path: 'new',
            loadChildren: () => import('./offers/new-offer/new-offer.module').then(m => m.NewOfferPageModule)
          },
          {
            path: 'edit/:dressId',
            loadChildren: () => import('./offers/edit-offer/edit-offer.module').then(m => m.EditOfferPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/dresses/tabs/discover',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/dresses/tabs/discover',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DressesRoutingModule {}
