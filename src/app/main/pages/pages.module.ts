import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MainLayoutPageComponent } from '../main-layout-page/main-layout-page.component';
 

const appRoutes: Routes = [
  {
    path: '',
    component: MainLayoutPageComponent,
    children: [
    {
      path: 'users',
      loadChildren: () => import('../pages/users/users.module').then(m => m.UsersModule),
      data: {
        role: {
          page: 'users',
        }
      },
    }
    ]
  }
  
];

@NgModule({
  declarations: [
    MainLayoutPageComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(appRoutes),
  ],

  providers: []
})
export class PagesModule {}
