# Online Shop DB Project

## Opis projektu

Projekt został wykonany w ramach przedmiotu **Bazy Danych**.

Aplikacja przedstawia prosty sklep internetowy wykorzystujący bazę danych do przechowywania informacji o użytkownikach, produktach, kategoriach oraz zamówieniach.

Projekt składa się z trzech głównych części:

* Backend (Node.js + Express)
* Baza danych (SQLite + Prisma ORM)
* Frontend (HTML, CSS, JavaScript)

Dodatkowo projekt zawiera zestaw testów automatycznych wykonanych przy użyciu narzędzia Playwright.

---

# Struktura projektu

```text
project/
│
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seed.js
│   │   └── dev.db
│   │
│   ├── src/
│   │   └── server.js
│   │
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
│
└── tests/
    ├── api.spec.js
    ├── gui.spec.js
    ├── playwright.config.js
    ├── package.json
    └── package-lock.json
```

---

# Wykorzystane technologie

* Node.js
* Express.js
* Prisma ORM
* SQLite
* HTML5
* CSS3
* JavaScript
* Playwright

---

# Model bazy danych

Projekt wykorzystuje relacyjną bazę danych sklepu internetowego.

## Tabela User

Przechowuje informacje o użytkownikach.

| Pole  | Typ     |
| ----- | ------- |
| id    | Integer |
| name  | String  |
| email | String  |

---

## Tabela Category

Przechowuje kategorie produktów.

| Pole | Typ     |
| ---- | ------- |
| id   | Integer |
| name | String  |

---

## Tabela Product

Przechowuje produkty dostępne w sklepie.

| Pole        | Typ     |
| ----------- | ------- |
| id          | Integer |
| name        | String  |
| description | String  |
| price       | Float   |
| stock       | Integer |
| categoryId  | Integer |

---

## Tabela Order

Przechowuje zamówienia użytkowników.

| Pole       | Typ      |
| ---------- | -------- |
| id         | Integer  |
| userId     | Integer  |
| totalPrice | Float    |
| status     | String   |
| createdAt  | DateTime |

---

## Tabela OrderItem

Przechowuje produkty należące do zamówienia.

| Pole      | Typ     |
| --------- | ------- |
| id        | Integer |
| orderId   | Integer |
| productId | Integer |
| quantity  | Integer |
| price     | Float   |

---

# Relacje między tabelami

```text
Category 1 — N Product
User 1 — N Order
Order 1 — N OrderItem
Product 1 — N OrderItem
```

---

# Klonowanie repozytorium

```bash
git clone https://github.com/kichwepchik/project_bazydannych_testowanie.git
cd project_bazydannych_testowanie
```

---

# Uruchomienie backendu

Przejdź do katalogu backend:

```bash
cd backend
```

Zainstaluj wymagane zależności:

```bash
npm install
```

Sprawdź plik `.env`:

```env
DATABASE_URL="file:./dev.db"
```
Wykonaj reset migrację
```bash
npx prisma migrate reset
```

Wykonaj migrację bazy danych:

```bash
npx prisma migrate dev --name init
```

Wypełnij bazę przykładowymi danymi:

```bash
npm run seed
```

Uruchom serwer backend:

```bash
npm run dev
```

Po uruchomieniu API będzie dostępne pod adresem:

```text
http://localhost:3000
```

Przykładowe endpointy:

```text
http://localhost:3000/products
http://localhost:3000/orders
```

---

# Uruchomienie frontendu

Otwórz nowy terminal.

Przejdź do katalogu frontend:

```bash
cd frontend
```

Uruchom lokalny serwer:

```bash
npx serve -l 5500
```

Frontend będzie dostępny pod adresem:

```text
http://localhost:5500
```

---

# Uruchamianie testów

Przed uruchomieniem testów należy uruchomić:

* backend (port 3000)
* frontend (port 5500)

---

## Instalacja Playwright

Przejdź do katalogu tests:

```bash
cd tests
```

Zainstaluj zależności:

```bash
npm install
```

Zainstaluj przeglądarki Playwright:

```bash
npx playwright install
```

---

# Dostępne tryby uruchamiania testów

## Wszystkie testy

```bash
npm run test
```

---

## Testy API

```bash
npm run test:api
```

Testowane funkcjonalności:

* pobieranie listy produktów,
* pobieranie pojedynczego produktu,
* tworzenie zamówienia,
* pobieranie listy zamówień.

---

## Testy GUI

```bash
npm run test:gui
```

Testowane funkcjonalności:

* wyświetlanie produktów,
* dodawanie produktu do koszyka,
* składanie zamówienia.

---

## Interaktywny interfejs Playwright

```bash
npm run test:ui
```

Tryb ten umożliwia:

* podgląd wszystkich testów,
* uruchamianie pojedynczych testów,
* śledzenie kroków wykonywania testów,
* debugowanie błędów,
* obserwację działania aplikacji w przeglądarce.

---

## Generowanie raportu HTML

Najpierw należy uruchomić testy:

```bash
npm run test
```

Następnie otworzyć raport:

```bash
npm run test:report
```

Raport zostanie zapisany w katalogu:

```text
tests/playwright-report
```

---

# Najważniejsze komendy

## Backend

```bash
cd backend
npm install
npx prisma migrate dev --name init
npm run seed
npm run dev
```

## Frontend

```bash
cd frontend
npx serve -l 5500
```

## Testy

```bash
cd tests

npm install
npx playwright install

npm run test
npm run test:api
npm run test:gui
npm run test:ui
npm run test:report
```

---

# Endpointy API

## GET /

Sprawdzenie poprawności działania API.

```http
GET /
```

---

## GET /products

Pobranie wszystkich produktów.

```http
GET /products
```

---

## GET /products/:id

Pobranie produktu o wskazanym identyfikatorze.

```http
GET /products/1
```

---

## GET /orders

Pobranie wszystkich zamówień.

```http
GET /orders
```

---

## POST /orders

Utworzenie nowego zamówienia.

Przykładowe dane wejściowe:

```json
{
  "userId": 1,
  "items": [
    {
      "productId": 1,
      "quantity": 1
    }
  ]
}
```

---

# Sposób działania aplikacji

Po uruchomieniu backendu oraz frontendu użytkownik może otworzyć aplikację w przeglądarce internetowej.

System umożliwia:

1. Wyświetlenie listy produktów.
2. Dodawanie produktów do koszyka.
3. Tworzenie zamówień.
4. Zapisywanie zamówień w bazie danych.
5. Odczytywanie zamówień za pomocą API.

---

# Cel projektu

Celem projektu było zaprojektowanie i implementacja prostej aplikacji bazodanowej wykorzystującej relacyjną bazę danych.

Projekt prezentuje:

* modelowanie danych,
* tworzenie relacji między tabelami,
* wykorzystanie ORM Prisma,
* komunikację między frontendem i backendem,
* obsługę operacji CRUD,
* testowanie aplikacji za pomocą Playwright.

---

# Charakter projektu

Projekt został wykonany wyłącznie w celach edukacyjnych jako zaliczenie przedmiotu **Bazy Danych** i nie jest przeznaczony do zastosowań produkcyjnych.
