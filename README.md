# CV + Portfolio — gotowe pliki do uploadu na GitHub Pages

To paczka z dwoma prostymi stronami statycznymi:
- `index.html` — Twoje CV (polska wersja), minimalistyczne i responsywne.
- `portfolio/index.html` — prosta galeria prac (wstaw własne obrazy w miejsce placeholderów).

Poniżej znajdziesz jasne instrukcje krok po kroku, jak opublikować to na GitHub Pages oraz jak podmienić treści i obrazy.

---

## Szybkie publikowanie (metoda A — GitHub Pages, bez konsoli)

1. Zaloguj się na GitHub i utwórz nowe repozytorium.    - Jeśli chcesz, aby strona była dostępna pod adresem `https://twojanazwa.github.io/`, nazwij repozytorium `twojanazwa.github.io`.    - Możesz też wybrać nazwę `cv-natalia` — wtedy strona będzie pod `https://twojanazwa.github.io/cv-natalia/`.

2. W repo wejdź w **Add file → Upload files** i wrzuć wszystkie pliki z tej paczki (przeciągnij folder `cv-github-package`).    Commit (Upload) files.

3. Wejdź do **Settings → Pages** i upewnij się, że source jest ustawione na `main` branch / root (dla większości repozytoriów GitHub Pages automatycznie publikuje stronę).    Po chwili strona powinna być gotowa — adres pokazany w sekcji Pages.

4. Gotowe! Otwórz adres i sprawdź. Aby zapisać stronę jako PDF: w przeglądarce `Print → Save as PDF`.

---

## Publikowanie przez Git (metoda B — dla osób używających terminala)

1. Stwórz repozytorium na GitHub (np. `twojanazwa.github.io` albo `cv-natalia`). 2. Na komputerze rozpakuj tę paczkę i w terminalu przejdź do katalogu z plikami. 3. Wykonaj:

```bash
git init
git add .
git commit -m "Initial CV + portfolio"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO_NAME.git
git push -u origin main
```

Zamień `USERNAME` i `REPO_NAME` na swoje dane. Po chwili GitHub opublikuje stronę (jeśli repo to `USERNAME.github.io` — będzie dostępna pod tą domeną).

---

## Jak podmienić obrazy w portfolio

- W folderze `portfolio/` edytuj `index.html` i zamień adresy obrazów `https://picsum.photos/...` na linki do Twoich plików. - Aby hostować własne obrazy w repo, dodaj pliki JPG/PNG do folderu `portfolio/images/` i odwołaj się do nich lokalnie, np. `portfolio/images/praca1.jpg`.

Zalecenia rozmiarów: obrazy ok. 1200×900 px, max 2–3 MB każdy (aby strona ładowała się szybko).

---

## Jak dodać własną domenę (CNAME)

1. Kup domenę u dowolnego rejestratora. 2. W repo dodaj plik `CNAME` (root) zawierający jedynie Twoją domenę, np. `cv.nataliagrzegorzek.pl`. 3. W panelu DNS u rejestratora ustaw rekord `CNAME` wskazujący na `USERNAME.github.io` (lub ustaw A records według dokumentacji GitHub Pages). 4. W GitHub → Settings → Pages dodaj domenę w polu Custom domain.

Dokładne instrukcje są w dokumentacji GitHub Pages (polecam przejrzeć przy konfiguracji DNS).

---

## Edycja kontaktów / treści CV

- Otwórz `index.html` i edytuj teksty w odpowiednich sekcjach (nagłówki, podsumowanie, doświadczenie). - Po podmianie plików wrzuć je na GitHub (metoda A lub B powyżej).

---

## Prompt do Claude / LLM (optymalizacja treści)
Plik `claude_prompt.txt` zawiera gotowy prompt, którego możesz użyć w Claude lub innym modelu, aby przeredagować punkty CV w stylu BDM SaaS.

---

## Licencja
Pliki możesz używać i edytować dowolnie. -- MIT
