# Dashboard Example

Учебный проект дашборда на React + TypeScript + Vite.

## Стек

- **React** — UI-библиотека
- **TypeScript** — типизация
- **Vite** — сборщик и dev-сервер (HMR из коробки)

## Быстрый старт

```bash
# Установка зависимостей
npm i

# Запуск dev-сервера
npm run dev

# Сборка для продакшена
npm run build

# Предпросмотр продакшен-сборки
npm run preview

# Линтинг
npm run lint
```

## Структура проекта

```
dashboard-example/
├── public/          # Статические файлы
├── src/             # Исходный код приложения
├── index.html       # Точка входа
├── eslint.config.js # Конфигурация ESLint
├── vite.config.ts   # Конфигурация Vite
└── tsconfig*.json   # Конфигурации TypeScript
```

## О проекте

Проект представляет собой пример реализации dashboard-интерфейса. В `src` содержится код приложения (заголовки локализованы). Это стартовый шаблон Vite для React + TypeScript, который можно расширять под свои задачи.