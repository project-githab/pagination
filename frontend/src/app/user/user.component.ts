import {Component, OnInit} from '@angular/core';
import {switchMap} from 'rxjs';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {HttpRequestService} from '../_http-request/http-request.service';
import {Ads} from '../_model/ads';
import {FormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [
    RouterLink,
    FormsModule,
    NgClass,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  // Массив постов
  ads: Ads[] = [];

  // Массив страниц
  paginationId: number[] = []

  // Задано элементов на странице
  size: number = 0;

  // Текущая страница
  number: number = 0;

  // Всего элементов в базе
  totalElements: number = 0;

  // Всего страниц
  totalPages: number = 0;

  // Включает или отключает пагинацию. Если всего одна страница, то пагинация отключается false.
  activePagination: boolean = false;

  // Включает или отключает кнопку назад. Если страница первая или главная, то кнопка не активна false
  buttonBack: boolean = true;

  // Включает или отключает кнопку вперёд. Если страница первая или главная, то кнопка не активна false
  buttonNext: boolean = true;

  // Идентификатор страницы. Пример: http://localhost:4200/user/2
  idPath: number = 0;

  // Если главная страница, а это первая страниц, то ссылка на первую страница не работает.
  firstPageAddress: string = '/user/1'

  // Устанавливает стиль на первую страницу. Если страница первая, то true, окрашивает кнопку, иначе false
  // окрашивает в другой цвет.
  buttonStyleFirstPage: boolean = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private httpRS: HttpRequestService) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.pipe(
      switchMap(params => {

        // Присваиваем идентификатор страницы в переменную
        this.idPath = Number(params.get('pageId'))

        this.httpRouterInit()

        this.generatePaginationById()

        return params.getAll('pageId')
      })
    ).subscribe(data => {
      // Присваиваем идентификатор страницы в переменную
      this.idPath = Number(data)
      // Конец Обработка функции браузера вперёд и назад
    });

    // this.httpInit()
  }



  // Метод, который проверяет, имеет ли страница идентификатор ID
  httpRouterInit() {

    // Проверяем имеется ли ID в строке браузера
    if (!this.router.url.includes('/user/')) {


      // На главной странице кнопка вперёд сразу переходит на вторую страницу, так как главная страница это первая страница
      this.idPath = this.idPath + 1

      // Если главная страница, а это первая страниц, то ссылка на первую страница не работает.
      this.firstPageAddress = ''

      // Если страница не имеет ID, то вызываем этот метод (главная страница без ID)
      this.httpHome()


    } else {
      // Если страница имеет ID, то вызываем этот метод
      this.httpById()

    }

  }



// Получаем все данные при открытии главной страницы.
  private httpHome() {

    // Отключаем кнопку назад так как это первая страница.
    this.buttonBack = false;

    this.httpRS.getAds().subscribe({

      next: data => {

        let responseData: any = data;
        this.ads = responseData.body.content;
        this.size = responseData.body.page.size;
        this.totalElements = responseData.body.page.totalElements;
        this.totalPages = responseData.body.page.totalPages;

        this.activeHtmlPagination()

      },
      error: () => {
        console.error('При запросе на сервер, произошла какая та ошибка 1')
      }
    });
  }

  // Конец Получаем все данные при открытии главной страницы.


  // Получение по URL. Текущая страница
  httpById() {

    this.httpRS.getAdsPageById(this.idPath).subscribe({
      next: data => {

        let responseData: any = data;
        this.ads = responseData.body.content;

        this.size = responseData.body.page.size;
        this.number = responseData.body.page.number;
        this.totalElements = responseData.body.page.totalElements;
        this.totalPages = responseData.body.page.totalPages;

        this.activeHtmlPagination()

        this.generatePaginationById()


      },
      error: () => {
        console.error('При запросе на сервер, произошла какая та ошибка 2')
      }
    });

  }

// Конец Получение по URL. Текущая страница



  // Этот метод вызывается два раза в одной транзакции, чтобы избежать визуального скачка активной ячейки пагинации в UI
  generatePaginationById() {

    if (this.idPath === 1 || this.idPath === 2 || this.idPath === 3 || this.idPath === 4) {

      this.paginationId = [] // Очищаем массив потом заново добавляем

      let count: number = 1;


      for (let i = 1; i <= 6; i++) {
        if (this.idPath <= this.totalPages && (count < this.totalPages)) {
          count++
          this.paginationId.push(i)
        }
      }
      this.paginationId.shift(); // Удаляем первый элемент в массиве


    } else {

      this.paginationId = [] // Очищаем массив потом заново добавляем

      let count1: number = -1;
      let count2: number = 0;
      let count3: number = 0;

      for (let i: number = 1; i <= 6; i++) {
        if ((this.idPath + count1) < this.totalPages) {
          if ((this.totalPages - 4) < this.idPath) {
            if (((this.totalPages - 6) + count2) != this.totalPages) {
              this.paginationId.push((this.totalPages - 6) + count2);
              count2++
            }
          } else {
            this.paginationId.push(this.idPath - 3 + count3);
            count3++
          }
        }
      }

      this.paginationId.shift(); // Удаляем первый элемент в массиве
    }


  }

  // Конец Пагинация


  activeHtmlPagination() {


    if (this.idPath == 1) {
      this.buttonBack = false;
      this.buttonStyleFirstPage = true;
    } else {
      this.buttonBack = true;
      this.buttonStyleFirstPage = false;
    }

    this.buttonNext = this.idPath !== this.totalPages;


    this.activePagination = this.totalPages > 1;


    if (this.number === 0) {
      this.buttonBack = false;
    }

    if (this.idPath === this.totalPages) {
      this.buttonNext = false;
    }

  }

}
