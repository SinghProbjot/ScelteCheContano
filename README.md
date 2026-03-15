# Scelte che Cont@no

Questo progetto è il **prototipo di un'applicazione web educativa**, sviluppata nell'ambito del **bando ministeriale _Saper(e)Consumare 2025_** per l’:contentReference[oaicite:0]{index=0} di Bergamo.

L’obiettivo dell’app è **puramente educativo**: promuovere la consapevolezza sui meccanismi che influenzano le scelte di consumo (pubblicità, algoritmi, profilazione) e guidare gli utenti verso **decisioni di acquisto più responsabili e sostenibili**.

---

## Funzionalità del Prototipo

L’applicazione si divide in **due simulazioni principali**:

### Spesa Intelligente al Supermercato

L’utente:

- imposta un **budget**
- crea una **lista della spesa**
- riceve suggerimenti di **“carrelli ottimizzati”** basati su:
  - sostenibilità ambientale
  - prodotti a **chilometro zero (Km0)**
  - risparmio economico

### Shopping Online Consapevole

Una **dashboard simulata** che analizza l’affidabilità di un brand di abbigliamento online:

- confronto **Fast Fashion vs. Etico**
- simulazione di come le **intelligenze artificiali** possano individuare:
  - notizie su sfruttamento lavorativo
  - impatto ambientale ed ecologico

---

## Tecnologie Utilizzate

Il progetto è una **Single Page Application (SPA)** moderna, progettata per funzionare **senza database a pagamento**, così da permettere hosting gratuiti e scalabili.

- **Libreria UI:** React (JavaScript / JSX)
- **Stili:** Tailwind CSS (v3)
- **Icone:** Lucide React
- **Build Tool:** Vite

---

## Per gli Sviluppatori

### Avviare il progetto in locale

Per testare il progetto sul proprio computer:

1. Assicurati di avere **Node.js** installato
2. Apri il terminale nella cartella del progetto
3. Esegui i seguenti comandi:

```bash
# Installa tutte le dipendenze necessarie
npm install

# Avvia il server di sviluppo locale
npm run dev
```

L’app sarà visibile all’indirizzo (di solito):

`http://localhost:5173`

## Build

Quando il prototipo è pronto per essere:

1. mostrato ai professori

2. caricato su un hosting gratuito (es. Netlify o Vercel)

esegui nel terminale:

```bash
npm run build
```

Questo comando:

1. analizza tutto il codice React e Tailwind

2. lo comprime e lo ottimizza

3. genera una nuova cartella chiamata dist

La cartella _dist_ contiene il sito web finale (HTML, CSS e JS minimizzati), pronto per essere caricato su qualsiasi server.
