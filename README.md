# NurAzkar

PWA-сайт на Go с утренними и вечерними азкарами, русской транскрипцией, переводом и счётчиком повторов.

## Запуск локально

```bash
go run main.go
```

Откройте `http://localhost:8080`.

## Деплой на Render

1. Залейте проект в GitHub.
2. Зайдите в Render.
3. New → Blueprint.
4. Выберите репозиторий.
5. Render сам прочитает `render.yaml` и создаст сервис.

Или используйте New → Web Service и укажите:
- Build Command: `go build -o app .`
- Start Command: `./app`

## Что внутри
- `main.go` — Go-сервер
- `data/` — данные азкаров
- `templates/` — HTML
- `static/` — CSS, JS, PWA-файлы
- `render.yaml` — деплой на Render
