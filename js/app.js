//====================================================================================================
function isWebp() {
  // Проверка поддержки webp
  function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }
  // Добавление класса _webp или _no-webp для HTML
  testWebP(function (support) {
    let className = support === true ? "webp" : "no-webp";
    document.documentElement.classList.add(className);
  });
}
isWebp();
//====================================================================================================
//----- Фильтр по категориям -----

const filterBtns = document.querySelectorAll(".navigation__button");
const photos = document.querySelectorAll(".item-photo");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const currentCategory = btn.dataset.filter;

    filterPhotos(currentCategory, photos);

    // Для случаев, когда для фоток не успела проиграть анимация
    // появления и они все еще скрыты
    setTimeout(() => {
      window.scrollBy(0, 1);
    }, 1500);

    // window.scrollBy(0, 1);
  });
});

function filterPhotos(category, items) {
  items.forEach((item) => {
    const IsPhotoFitsFilter = item.classList.contains(category);
    const IsShowAll = category === "all";

    if (!IsPhotoFitsFilter && !IsShowAll) {
      item.classList.add("animate");
    } else {
      item.classList.remove("_hidden");
      item.classList.remove("_hide");
      item.classList.remove("animate");
    }
  });
}

//todo Сделать плавнее анимацию

/* Анимация фильтрации:
При нажатии на кнопку категории не подходящие под нее элементы
сначала получают класс "animate"(scale и opacity=0), затем класс "hide"(visibility: hidden;).
*/
photos.forEach((photo) => {
  photo.addEventListener("transitionend", () => {
    if (photo.classList.contains("animate")) {
      photo.classList.add("_hide");
      setTimeout(() => {
        // todo Отловить момент когда скрываются все фото

        if (photo.classList.contains("_hide")) {
          photo.classList.add("_hidden");
        }
      }, 501);
    }
  });
});
//======================================================================
//----- Прокрутка страницы по клику в меню с JS -----

/*
Прокрутка страницы по клику в меню с JS:
Задаем пунктам меню атрибут "data-goto", равный классу блока к кот. необходима прокрутка.
На каждый пункт прослушка нажатия: получаем элемент к кот. нужна прокрутка, высчитываем сколько до него px,
и используем метод window.scrollTo().
При нажатии в меню-бургере перед действиями, закрываем его.
*/
const menuLinks = document.querySelectorAll("[data-goto]");
if (menuLinks) {
  menuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      //Проверка заполнен ли атрибут и есть ли на странице данный элемент
      if (link.dataset.goto) {
        //Проверка заполнен ли атрибут и есть ли на странице данный элемент
        const goToBlock = document.querySelector(link.dataset.goto);
        if (goToBlock) {
          //Если клик в меню-бургере - закрываем
          if (document.documentElement.classList.contains("_menu-show")) {
            document.documentElement.classList.remove("_menu-show");
            document.body.classList.remove("_lock");
          }

          window.scrollTo({
            top: goToBlock.offsetTop,
            behavior: "smooth",
          });

          //Для отключения срабатывания ссылки
          e.preventDefault();
        }
      }
    });
  });
}
//======================================================================
