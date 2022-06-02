# movies-explorer-api

##### Анна Борисовна Сухаревская

Проект: Movies-explorer

## Яндекс.Практикум Дипломная работа Часть Backend 
Приложение ищет фильмы по ключевым словам и сохраняет их в в аккаунте пользователя.

## Технологии
- сервер написан на Node.js 
- фреймворк Express.js
- база данных MongoDB

## Функциональность проекта
### Сервер:
- регистрирует пользователя;
- аутентифицирует пользователя;
- получает данные одного/всех пользователей;
- получает данные сохраненых пользователем фильмов;
- сохраняет/удаляет фильмы;
- пользователь не может удалить фильмы добавиленные др. пользователем

- пароль хранится в виде хеша;
- валидация запросов с помощью npm пакета Joi;
- ошибки централизованно обрабатываются;
- осуществляется логгирование запросов, ответов и ошибок;


## Ссылка на сайт , размещенный на Яндекс.Облаке.
* backend [https://mesto.backend.annsyh.nomoredomains.work](https://mesto.backend.annsyh.nomoredomains.work);
* Публичный IP адрес сервера `51.250.85.213`.
