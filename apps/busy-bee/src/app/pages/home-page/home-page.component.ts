import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@UntilDestroy()
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  cards: any;
  filteredCards: any;
  selectedParentId?: string | null;
  searchTerm: string = '';
  carouselItems: any[] = [
    {
      description:
        'Фильтрация и поиск: Функции фильтрации и поиска на сайте являются эффективными и точными.',
    },
    { description: 'Описание второго элемента' },
    { description: 'Описание третьего элемента' },
    { description: 'Описание 4 элемента' },
    { description: 'Описание 5 элемента' },
    // Добавьте описания для остальных элементов
  ];

  carouselInitialized = false;
  currentIndex = 0;

  carouselInit(e: any) {
    // Карусель инициализирована
    e.slick.slickSetOption('slidesToShow', 3, true);
  }

  onCarouselSlideChange(event: any) {
    // Обработка события изменения слайда
    this.currentIndex = event.currentSlide;
  }

  slides = ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4', 'Slide 5'];

  carouselConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    dots: true,
  };

  goToNextSlide() {
    if (this.carouselInitialized) {
      this.currentIndex += 1;
    }
  }

  goToPreviousSlide() {
    if (this.carouselInitialized) {
      this.currentIndex -= 1;
    }
  }

  selectedCardId: number | null = null;
  // filterCards(parentId: string | null) {
  //   if (parentId) {
  //     this.filteredCards = this.cards.filter(card => card.parentId === parentId);
  //   } else {
  //     this.filteredCards = this.cards; // отображаем все карточки, если выбрано значение null
  //   }
  //   this.selectedParentId = parentId; // сохраняем выбранный идентификатор родительской категории
  // }
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private _formBuilder: FormBuilder
  ) {}

  /*  constructor(private router: Router) {}*/
  onSearch() {
    this.router.navigate(['/search-page']);
    console.log('Searching...', this.searchTerm);
  }
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  ngOnInit(): void {
    this.categoryService
      .getAll()
      .pipe(untilDestroyed(this))
      .subscribe((model) => {
        this.cards = model;
        this.filteredCards = model;
        console.log(model);
      });
  }
}
