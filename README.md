# White Gown

## 1.Charakterystyka oprogramowania
- Nazwa skrócona-WG
- Nazwa pełna-White Gown
- Krótki opis -
W obecnych czasach zjawisko ekonomii współpracy staje się coraz bardziej powszechne.Zjawisko to bazuje na skłonności ludzi do współpracy, pomagania innym i dzielenia się swoimi zasobami, które jest odwzajemnione w różny sposób (materialny i pozamaterialny).Ten fenomen może również znaleźć zastosowanie w branży ślubnej.
Organizacja ślubu wiąże się z wieloma wysokimi kosztami.Kupno sukni jest dużym wydatkiem, jednak często jest to rzecz która nie zostaje użyta więcej niż jeden raz.Naszym rozwiązaniem na ten problem jest stworzenie serwisu, który umożliwia wynajęcie lub oferowanie do wynajęcia swojej sukni.Aplikacja umożliwia wstawienie zdjęcia, opisu,ustalenie terminów w których możliwe jest wynajęcie sukienki oraz cenę oferty jak i również przeglądanie istniejących już ofert.Dzięki takiemu rozwiązaniu użytkownicy mogą wybrać spośród wielu różnorodnych sukienek oraz zaoszczędzić pieniądze a osoby oferujące sukienki mogą wykorzystać swój strój do zarobienia pieniędzy.

## 2.Prawa autorskie
- Autorzy-Aleksandra Bogusz, Agata Zabuska
- Licencja zamknięta

## 3.Specyfikacja wymagań
- ### Wymagania funkcjonalne:
I.Funkcjonalność dla osoby udostępniającej swoją suknie:
- możliwość stworzenia ogłoszenia i podania w nim między innymi takich informacji jak: tytuł, cena, opis i zdjęcie
- wybrać do kiedy ogłoszenie ma być aktualne
- uwierzytelnianie
- edytowanie oferty

II.Funkcjonalność dla osoby, która chce wypożyczyć suknie:
- możliwość wypożyczenia sukni
- możliwość przeglądania ofert
- uwierzytelnianie
- ### Wymagania niefunkcjonalne:
- żeby korzystać z funkcjonalności systemu należy założyć konto i zalogować się
- hasło musi zawierać co najmniej 6 znaków
- mail musi mieć zawierać znak “@”

## 4.Architektura systemu/oprogramowania.
- ### a.Architektura rozwoju
![diagram](https://i.ibb.co/RgXww8h/unnamed.png)

![diagram2](https://i.ibb.co/rsp4Qdg/diagram.png)

- ### b.Architektura uruchomieniowa

I.Uruchomienie aplikacji
Uruchomienie aplikacji następuje poprzez wieloplatformowe środowisko uruchomieniowe Node.js-napisanego w języku JavaScript składającego się z silnika V8, biblioteki libUV oraz kilku innych bibliotek.Domyślnym managerem pakietów dla Node.js jest Npm.
Aby uruchomić aplikację należy wejść do terminala Node.js oraz wpisać następujące komendy:
cd ŚCIEŻKA DO PLIKU ŹRÓDŁOWEGO APLIKACJI
ionic serve --lab

## 5.Test.

- ### a.Scenariusze testów.

Nazwa testu |     Opis       |     Typ       |  Czynności przygotowawcze           |   Czynności końcowe        |
------------| -------------- | ------------- | ----------------------------------- | -------------------------- |
1.Założenie konta w aplikacji| Sprawdzenie poprawności działania funkcjonalności zakładania kont | Test funkcjonalny | Wprowadzenie emaila i hasła oraz naciśnięcie przycisku Continue | Usunięcie konta z bazy danych
2.Usunięcie konta z bazy danych | Sprawdzenie poprawności działania funkcjonalności logowania się do konta | Test funkcjonalny | 1.Założenie konta 2.Zalogowanie się do aplikacji przy użyciu wcześniej założonego konta | Usunięcie konta z bazy danych
3.Przeglądanie ofert | Sprawdzenie poprawności działania funkcjonalności przeglądania ofert | Test funkcjonalny |1.Dodanie przykładowych ofert  2.Przelogowanie się na inne konto oraz wejście w zakładkę Discover Dresses oraz kliknięcie w którąś z ofert | Usunięcie ofert 
4.Przeglądanie własnych ofert | Sprawdzenie poprawności działania funkcjonalności zakładania konta | Test funkcjonalny |1.Dodanie sukienki 2.Przejście do zakładki Your Bookings | Usunięcie ofert
5.Dodanie sukienki | Sprawdzenie poprawności działania funkcjonalności dodawania sukienek | Test funkcjonalny | 1.Dodanie sukienki 2.Wejście w zakładkę My Offers | Usunięcie sukienki |
6.Zabukowanie sukienki |Sprawdzenie poprawności działania funkcjonalności zabukowania sukienek | Test funkcjonalny |1.Wejście w zakładkę Discover Dresses 2.Wejście w wybraną ofertę 3.Kliknięcie w przycisk Book oraz uzupełnienie danych | Usunięcie sukienki | 
7.Edycja ofert sukienek | Sprawdzenie poprawności działania funkcjonalności edytowania ofert sukienek | Test funkcjonalny | 1.Dodanie sukienki 2.Wejście w zakładkę Offers 3.Kliknięcie w przycisk edycji 4.Zmiana opisu oferty | Usunięcie oferty |
8.Wylogowanie | Sprawdzenie poprawności działania funkcjonalności wylogowania się z konta | Test funkcjonalny | 1.Upewnienie się,że jesteśmy zalogowani 2.Kliknięcie w przycisk Log out 3.odświeżenie strony aby upewnić się,że zostaliśmy wylogowani | Usunięcie konta z bazy danych |

- ### b.Sprawozdanie z wykonania scenariuszy testów.


Nr.scenariusza | Nazwa | Warunki wstępne | Kroki wykonania | Oczekiwany rezultat |
---------------| ------| --------------- | ----------------| --------------------|

#### 1.

##### 1.
Próba założenia konta za pomocą podania tylko maila

Istnieje interfejs umożliwiający zalogowanie się do systemu

Wprowadzić mail w pole email 

1.Wyskakuje ostrzeżenie pod polem hasła “Should be at least 6 characters long”
2.Nie można kliknąć w przycisk Continue umożliwiający założenie konta

##### 1.
Próba założenia konta za pomocą podania maila bez znaku “@”

Istnieje interfejs umożliwiający zalogowanie się do systemu

Wprowadzić mail o nie odpowiedniej składni(bez znaku “@”) w pole email 

1.Wyskakuje ostrzeżenie “Should be a valid email address”
2.Nie można kliknąć w przycisk Continue umożliwiający założenie konta

##### 1.
Próba założenia konta za pomocą podania tylko hasła

Istnieje interfejs umożliwiający zalogowanie się do systemu

Wprowadzić hasło w pole password

1.Wyskakuje ostrzeżenie “Should be a valid email address” pod polem email
2.Nie można kliknąć w przycisk Continue umożliwiający założenie konta

##### 1.
Próba założenia konta za pomocą hasła składającego się z mniej niż 6 znaków

Istnieje interfejs umożliwiający zalogowanie się do systemu

1.Wprowadzić odpowiedni mail w pole email 
2.Wprowadzić hasło składające się z mniej niż 6 znaków

1.Wyskakuje ostrzeżenie pod polem hasła “Should be at least 6 characters long”

##### 1.
Próba założenia konta za pomocą odpowiedniego maila i hasła

Istnieje interfejs umożliwiający zalogowanie się do systemu

1.Wprowadzić odpowiedni mail w pole email 
2.Wprowadzić hasło składające się z przynajmniej 6 znaków
3.Kliknięcie przycisk Continue

Użytkownik zostaje przeniesiony do aplikacji

#### 2.

##### 2.
Próba zalogowania się tylko za pomocą maila

Istnieje interfejs umożliwiający zalogowanie się do systemu

Wprowadzić mail w pole email 

1.Wyskakuje ostrzeżenie pod polem hasła “Should be at least 6 characters long”
2.Nie można kliknąć w przycisk Continue umożliwiający zalogowania się do konta

##### 2.
Próba zalogowania się tylko za pomocą hasła

Istnieje interfejs umożliwiający zalogowanie się do systemu

Wprowadzić hasło w pole password

1.Wyskakuje ostrzeżenie “Should be a valid email address”
2.Nie można kliknąć w przycisk Continue umożliwiający zalogowania się do konta

##### 2.
Próba zalogowania się tylko za pomocą błędnego maila

Istnieje interfejs umożliwiający zalogowanie się do systemu

1.Wprowadzić nieistniejący mail w pole email 
2.Wprowadzić hasło w pole password

1.Wyskakuje ostrzeżenie “Email address could not be found”
2.Nie można kliknąć w przycisk Continue umożliwiający zalogowanie się do  konta

##### 2.
Próba zalogowania się za pomocą błędnego hasła 

Istnieje interfejs umożliwiający zalogowanie się do systemu

1.Wprowadzić istniejący mail w pole email 
2.Wprowadzić niepoprawne hasło w pole password

1.Wyskakuje ostrzeżenie “This password is not correct”
2.Nie można kliknąć w przycisk Continue umożliwiający zalogowanie się do konta

##### 2.
Próba zalogowania się za pomocą poprawnego maila i poprawnego hasła

Istnieje interfejs umożliwiający zalogowanie się do systemu 

1.Wprowadzić istniejący mail w pole email 
2.Wprowadzić poprawne hasło w pole password

Użytkownik zostaje przeniesiony do systemu

#### 3.

##### 3.
Przeglądanie zakładki Discover Dresses bez istniejących ofert

Istnieje zakładka Discover Dresses

1.Zalogowanie się do systemu
2.Przejście do zakładki Discover Dresses

Na zakładce nie wyświetlają się żadne oferty

##### 3.
Przeglądanie zakładki Discover Dresses z istniejącymi ofertami

Istnieje zakładka Discover Dresses

1.Zalogowanie się do systemu
2.Przejście do zakładki Discover Dresses

Na zakładce są przedstawione istniejące oferty sukienek

#### 4.

##### 4.
Przeglądanie zakładki Your Bookings bez istniejących ofert

Istnieje zakładka Your  Bookings

1.Zalogowanie się do systemu
2.Przejście do zakładki Your Bookings

Na zakładce widnieje informacja “No bookings found”

##### 4.
Przeglądanie zakładki Your Bookings z istniejącymi ofertami

Istnieje zakładka Your Bookings

1.Zalogowanie się do systemu
2.Przejście do zakładki Your Bookings
3.Dodanie sukienki

W zakładce Your Bookings znajduje się stworzona przez użytkownika  oferta

#### 5.

##### 5.
Próba dodania sukienki bez tytułu

Istnieje zakładka Add Offer

Pozostawienie pustego pola Title

Nie można kliknąć przycisku dodania oferty

##### 5.
Próba dodania sukienki bez opisu

Istnieje zakładka Add Offer

Pozostawienie pustego pola Description

Nie można kliknąć przycisku dodania oferty

##### 5.
Próba dodania sukienki bez ceny

Istnieje zakładka Add Offer

Pozostawienie pustego pola Price

Nie można kliknąć przycisku dodania oferty

##### 5.
Próba dodania sukienki bez daty dostępności

Istnieje zakładka Add Offer

Pozostawienie pustych pól Date

Nie można kliknąć przycisku dodania oferty

##### 5.
Próba dodania sukienki bez daty zdjęcia

Istnieje zakładka Add Offer

Pozostawienie pustego pola Add Image

Nie można kliknąć przycisku dodania oferty

###### 5.
Próba poprawnego dodania sukienki z uzupełnieniem wszystkich  wymaganych pól

Istnieje zakładka Add Offer

Uzupełnienie wszystkich wymaganych pól poprawnymi wartościami 

1.Można kliknąć przycisk dodania oferty
2.Po kliknięciu przycisku dodania oferty oferta została dodana do listy Your Offers

#### 6.

##### 6.
Próba zabukowania sukienki bez podania imienia

Istnieje funkcjonalność Book

Pozostawienie pustego pola First Name

Nie można kliknąć przycisku zabukowania oferty

##### 6.
Próba zabukowania sukienki bez podania nazwiska

Istnieje funkcjonalność Book

Pozostawienie pustego pola Last Name

Nie można kliknąć przycisku zabukowania oferty

##### 6.
Próba zabukowania sukienki z podaniem poprawnych danych

Istnieje funkcjonalność Book

Uzupełnienie wszystkich wymaganych pól poprawnymi wartościami 

1.Można kliknąć przycisku zabukowania oferty
2.Po naciśnięciu przycisku Book sukienka została dodana do zakładki Your Bookings

##### 6.
Próba zabukowania sukienki bez podania daty

Istnieje funkcjonalność Book

Pozostawienie pustych pól Date

Nie można kliknąć przycisku zabukowania oferty

#### 7.

##### 7.
Próba zmiany tytułu oferty sukienki

Istnieje funkcjonalność Edit an Offer

1.Wejście do zakładki Your Offers
2.Kliknięcie w przycisk edycji oferty
3.Zmiana wartości widniejącej w polu Title

1.Można zapisać zmianę oferty
2.Zmiana po zapisaniu jest widoczna w systemie

##### 7.
Próba zmiany opisu oferty sukienki 

Istnieje funkcjonalność Edit an Offer

1.Wejście do zakładki Your Offers
2.Kliknięcie w przycisk edycji oferty
3.Zmiana wartości widniejącej w polu Description

1.Można zapisać zmianę oferty
2.Zmiana po zapisaniu jest widoczna w systemie

#### 8.

##### 8.
Próba wylogowania się z konta

Istnieje przycisk Log out

Kliknięcie w przycisk Log out

1.Następuje wylogowanie z systemu
2.Użytkownik zostaje przeniesiony do strony startowej na której możliwe jest ponowne zalogowanie









# Testy

## testy jednostkowe

### Odtworzenie =>w środowisku nodejs należy uruchomić aplikacje(ionic serve --lab) a następnie w innym terminalu node js wpisać polecenie:ng test

Przetesotwane komponenty:
- WhiteGown/src/app/auth/auth.page.spec.ts  (Auth.page.ts => testy: auth.page.sepcs.ts)
- WhiteGown/src/app/dresses/discover/dress-detail/dress-detail.page.spec.ts (Dress-detail.page.ts => testy: dress-detail.page.specs.ts)

![Image of unit test](https://i.ibb.co/jvHnjt4/tests1.png)

## testy e2e

### Odtworzenie =>w terminalu nodejs wpisać npm run e2e

/e2e/src => app.e2e.spec.ts,bookings.e2e.spec.ts,dresses.e2e.spec.ts

![Image of e2e test](https://i.ibb.co/1628fFz/Zrzut-ekranu-28.png)
