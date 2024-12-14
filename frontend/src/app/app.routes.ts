import {Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {UserComponent} from './user/user.component';

export const routes: Routes = [

  {path: '', component: UserComponent, title: 'Главная страница'},
  {path: 'user/:pageId', component: UserComponent, pathMatch: 'full', title: 'Пользователи'}

];
