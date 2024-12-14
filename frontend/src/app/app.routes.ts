import { Routes } from '@angular/router';
import {PostsComponent} from './posts/posts.component';

export const routes: Routes = [

  {path: '', component: PostsComponent, title: 'Главная страница'},
  {path: 'posts/:pageId', component: PostsComponent, pathMatch: 'full', title: 'Пользователи'}

];
