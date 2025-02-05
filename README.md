# SMIT proovitöö

See projekt on minu lahendus Siseministeeriumi pythoni arendaja proovitööle.

### Projekti käivitamine

Kõige lihtsam  on projekti käivitada **Docker Compose**'i abil.

### Eeltingimused

**NB!** Töökodade API'de docker image'd ei toeta arm64 arhitektuuri ning seda rakendust ei saa jooksutada näiteks M3 kiibiga MacBooki peal.

- **Docker**: Versioon 27.3 või uuem.
- **Docker Compose**: Versioon 2.32.4 või uuem.
- **Git**

## Rakenduse käivitamine

1. Tõmba kood arvutisse git clone'i abil

    ```bash
    git clone https://github.com/karljl/smit-rehvivahetus.git
    ```

2. Mine projekti docker kataloogi

   ```bash
    cd smit-rehvivahetus/docker
    ```

3. Jooksuta ```docker compose up``` käsku

- Sõltuvalt sellest, kuidas docker compose arvutisse installitud on (nt. kas docker compose tuli kaasa Docker Desktop programmiga või on installitud eraldi), on käsuks kas docker compose või docker-compose.

    ```bash
    docker compose up
    ```
  või
    ```bash
    docker-compose up
    ```

### Rakendus

Kui kõik docker image'd saavad alla tõmmatud, on rakendus saadaval aadressil http://localhost:5173

### Backendi testimine

Rakenduse testimiseks on vajalik ```python3``` ning ```pytest``` ja ```pytest-asyncio``` library'd.

Testide jooksutamiseks mine ```smit-rehvivahetus/backend/tests``` kataloogi ning jooksuta käsku ```pytest```

### Kontakt

Probleemide tekkimisel võib mulle helistada 56627446 või kirjutada lattikaskarljohann@gmail.com