import React, { useState, useMemo, useEffect } from "react";
import {
  ShoppingCart,
  Smartphone,
  Leaf,
  DollarSign,
  MapPin,
  AlertTriangle,
  Search,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Info,
  BarChart3,
  ScanLine,
  Package,
  Activity,
  Plus,
} from "lucide-react";

const DATABASE_PRODOTTI = [
  // Pasta
  {
    id: 1,
    categoria: "Pasta",
    nome: "Fusilli Integrali",
    prezzo: 1.45,
    sostenibilita: 8,
    locale: false,
    brand: "Barilla",
    nutrizionale: "A",
    packaging: "Scatola in Carta",
    valori: {
      kcal: 350,
      grassi: 2.5,
      carboidrati: 65.7,
      proteine: 13.0,
      sale: 0.01,
    },
  },
  {
    id: 2,
    categoria: "Pasta",
    nome: "Spaghetti Bio Km0",
    prezzo: 1.8,
    sostenibilita: 9,
    locale: true,
    brand: "Agricola Locale",
    nutrizionale: "A",
    packaging: "Carta 100% Riciclabile",
    valori: {
      kcal: 350,
      grassi: 1.5,
      carboidrati: 72.0,
      proteine: 13.0,
      sale: 0.01,
    },
  },

  // Latte
  {
    id: 3,
    categoria: "Latte",
    nome: "Latte Parz. Scremato",
    prezzo: 1.2,
    sostenibilita: 7,
    locale: true,
    brand: "Granarolo",
    nutrizionale: "A",
    packaging: "Tetra Pak Riciclabile",
    valori: {
      kcal: 46,
      grassi: 1.6,
      carboidrati: 4.9,
      proteine: 3.3,
      sale: 0.13,
    },
  },

  // Biscotti
  {
    id: 4,
    categoria: "Biscotti",
    nome: "Tarallucci",
    prezzo: 2.8,
    sostenibilita: 6,
    locale: false,
    brand: "Mulino Bianco",
    nutrizionale: "C",
    packaging: "Sacchetto in Carta",
    valori: {
      kcal: 471,
      grassi: 19.0,
      carboidrati: 65.5,
      proteine: 7.5,
      sale: 0.65,
    },
  },
  {
    id: 5,
    categoria: "Biscotti",
    nome: "Frollini al Cacao",
    prezzo: 1.2,
    sostenibilita: 3,
    locale: false,
    brand: "Sottomarca",
    nutrizionale: "E",
    packaging: "Plastica Multistrato",
    valori: {
      kcal: 510,
      grassi: 25.0,
      carboidrati: 68.0,
      proteine: 5.0,
      sale: 1.2,
    },
  },

  // Conserve
  {
    id: 6,
    categoria: "Conserve",
    nome: "Passata di Pomodoro",
    prezzo: 1.15,
    sostenibilita: 9,
    locale: true,
    brand: "Mutti",
    nutrizionale: "A",
    packaging: "Vetro (Riciclabile)",
    valori: {
      kcal: 36,
      grassi: 0.2,
      carboidrati: 5.1,
      proteine: 1.6,
      sale: 0.5,
    },
  },

  // Bevande (Caffè)
  {
    id: 7,
    categoria: "Bevande",
    nome: "Caffè Qualità Rossa",
    prezzo: 3.5,
    sostenibilita: 5,
    locale: false,
    brand: "Lavazza",
    nutrizionale: "B",
    packaging: "Acciaio e Plastica",
    valori: {
      kcal: 2,
      grassi: 0.1,
      carboidrati: 0.3,
      proteine: 0.2,
      sale: 0.0,
    },
  },

  // Snack
  {
    id: 8,
    categoria: "Snack",
    nome: "Pringles Original",
    prezzo: 2.3,
    sostenibilita: 3,
    locale: false,
    brand: "Pringles",
    nutrizionale: "D",
    packaging: "Tubo Multimateriale",
    valori: {
      kcal: 518,
      grassi: 29.0,
      carboidrati: 56.0,
      proteine: 6.0,
      sale: 1.3,
    },
  },

  // Dolci
  {
    id: 9,
    categoria: "Dolci",
    nome: "Nutella",
    prezzo: 4.5,
    sostenibilita: 4,
    locale: false,
    brand: "Ferrero",
    nutrizionale: "E",
    packaging: "Vetro e Tappo Plastica",
    valori: {
      kcal: 539,
      grassi: 30.9,
      carboidrati: 57.5,
      proteine: 6.3,
      sale: 0.1,
    },
  },

  // Formaggi
  {
    id: 10,
    categoria: "Formaggi",
    nome: "Philadelphia",
    prezzo: 3.45,
    sostenibilita: 6,
    locale: false,
    brand: "Mondelēz",
    nutrizionale: "D",
    packaging: "Vaschetta in Plastica",
    valori: {
      kcal: 235,
      grassi: 22.0,
      carboidrati: 4.0,
      proteine: 5.4,
      sale: 0.8,
    },
  },

  // Carne
  {
    id: 11,
    categoria: "Carne",
    nome: "Petto di Pollo",
    prezzo: 4.5,
    sostenibilita: 4,
    locale: false,
    brand: "AIA",
    nutrizionale: "B",
    packaging: "Vassoio in Polistirolo",
    valori: {
      kcal: 100,
      grassi: 1.5,
      carboidrati: 0.0,
      proteine: 22.0,
      sale: 0.1,
    },
  },

  // --- PRODOTTI "FINTI" PER BILANCIARE L'ALGORITMO (Super-Economici vs Eco/Km0) ---
  // Pasta
  {
    id: 101,
    categoria: "Pasta",
    nome: "Pasta Sottomarca",
    prezzo: 0.5,
    sostenibilita: 2,
    locale: false,
    brand: "Discount",
    nutrizionale: "C",
    packaging: "Plastica",
    valori: {
      kcal: 360,
      grassi: 1.0,
      carboidrati: 75.0,
      proteine: 11.0,
      sale: 0.05,
    },
  },
  // Latte
  {
    id: 102,
    categoria: "Latte",
    nome: "Latte UHT Sottomarca",
    prezzo: 0.7,
    sostenibilita: 2,
    locale: false,
    brand: "Discount",
    nutrizionale: "C",
    packaging: "Plastica",
    valori: {
      kcal: 47,
      grassi: 1.5,
      carboidrati: 4.8,
      proteine: 3.2,
      sale: 0.1,
    },
  },
  {
    id: 103,
    categoria: "Latte",
    nome: "Latte Crudo Fattoria",
    prezzo: 2.5,
    sostenibilita: 10,
    locale: true,
    brand: "Agricola Locale",
    nutrizionale: "A",
    packaging: "Vetro a rendere",
    valori: {
      kcal: 65,
      grassi: 3.6,
      carboidrati: 4.8,
      proteine: 3.3,
      sale: 0.1,
    },
  },
  // Biscotti
  {
    id: 104,
    categoria: "Biscotti",
    nome: "Biscotti Artigianali Bio",
    prezzo: 4.5,
    sostenibilita: 9,
    locale: true,
    brand: "Forno Locale",
    nutrizionale: "B",
    packaging: "Sacchetto in Carta",
    valori: {
      kcal: 430,
      grassi: 15.0,
      carboidrati: 68.0,
      proteine: 8.0,
      sale: 0.1,
    },
  },
  // Conserve
  {
    id: 105,
    categoria: "Conserve",
    nome: "Passata Discount",
    prezzo: 0.4,
    sostenibilita: 2,
    locale: false,
    brand: "Discount",
    nutrizionale: "C",
    packaging: "Latta",
    valori: {
      kcal: 35,
      grassi: 0.1,
      carboidrati: 5.0,
      proteine: 1.5,
      sale: 1.0,
    },
  },
  // Bevande
  {
    id: 106,
    categoria: "Bevande",
    nome: "Bevanda al Caffè",
    prezzo: 0.8,
    sostenibilita: 2,
    locale: false,
    brand: "Discount",
    nutrizionale: "E",
    packaging: "Plastica",
    valori: {
      kcal: 80,
      grassi: 2.0,
      carboidrati: 12.0,
      proteine: 1.0,
      sale: 0.2,
    },
  },
  {
    id: 107,
    categoria: "Bevande",
    nome: "Caffè Equosolidale",
    prezzo: 5.5,
    sostenibilita: 9,
    locale: false,
    brand: "FairTrade",
    nutrizionale: "A",
    packaging: "Carta",
    valori: {
      kcal: 2,
      grassi: 0.1,
      carboidrati: 0.3,
      proteine: 0.2,
      sale: 0.0,
    },
  },
  // Snack
  {
    id: 108,
    categoria: "Snack",
    nome: "Chips Artigianali Bio",
    prezzo: 3.5,
    sostenibilita: 8,
    locale: true,
    brand: "Agricola Locale",
    nutrizionale: "C",
    packaging: "Carta",
    valori: {
      kcal: 480,
      grassi: 20.0,
      carboidrati: 60.0,
      proteine: 6.0,
      sale: 0.5,
    },
  },
  // Dolci
  {
    id: 109,
    categoria: "Dolci",
    nome: "Crema Cacao Discount",
    prezzo: 1.5,
    sostenibilita: 1,
    locale: false,
    brand: "Discount",
    nutrizionale: "E",
    packaging: "Plastica",
    valori: {
      kcal: 550,
      grassi: 35.0,
      carboidrati: 55.0,
      proteine: 5.0,
      sale: 0.2,
    },
  },
  {
    id: 110,
    categoria: "Dolci",
    nome: "Crema Nocciole Artigianale",
    prezzo: 7.0,
    sostenibilita: 9,
    locale: true,
    brand: "Agricola Locale",
    nutrizionale: "C",
    packaging: "Vetro",
    valori: {
      kcal: 520,
      grassi: 30.0,
      carboidrati: 50.0,
      proteine: 8.0,
      sale: 0.05,
    },
  },
  // Formaggi
  {
    id: 111,
    categoria: "Formaggi",
    nome: "Fettine Fese Sottomarca",
    prezzo: 0.9,
    sostenibilita: 1,
    locale: false,
    brand: "Discount",
    nutrizionale: "D",
    packaging: "Plastica",
    valori: {
      kcal: 250,
      grassi: 20.0,
      carboidrati: 5.0,
      proteine: 10.0,
      sale: 2.0,
    },
  },
  {
    id: 112,
    categoria: "Formaggi",
    nome: "Formaggio di Malga",
    prezzo: 6.5,
    sostenibilita: 9,
    locale: true,
    brand: "Caseificio Locale",
    nutrizionale: "C",
    packaging: "Carta",
    valori: {
      kcal: 380,
      grassi: 30.0,
      carboidrati: 1.0,
      proteine: 25.0,
      sale: 1.5,
    },
  },
  // Carne
  {
    id: 113,
    categoria: "Carne",
    nome: "Hamburger Scongelato",
    prezzo: 1.5,
    sostenibilita: 1,
    locale: false,
    brand: "Discount",
    nutrizionale: "D",
    packaging: "Plastica",
    valori: {
      kcal: 280,
      grassi: 22.0,
      carboidrati: 2.0,
      proteine: 15.0,
      sale: 1.5,
    },
  },
  {
    id: 114,
    categoria: "Carne",
    nome: "Pollo Allevato all'Aperto",
    prezzo: 9.5,
    sostenibilita: 8,
    locale: true,
    brand: "Agricola Locale",
    nutrizionale: "A",
    packaging: "Carta",
    valori: {
      kcal: 120,
      grassi: 2.5,
      carboidrati: 0.0,
      proteine: 24.0,
      sale: 0.1,
    },
  },
];

// Aggiorniamo le categorie disponibili per il menu a tendina in base ai nuovi dati
const CATEGORIE_DISPONIBILI = [
  "Pasta",
  "Latte",
  "Biscotti",
  "Conserve",
  "Bevande",
  "Snack",
  "Dolci",
  "Formaggi",
  "Carne",
];

// Aggiorniamo le stime di calcolo per i prodotti generici inseriti dall'utente
const PREZZI_MEDI = {
  Pasta: 1.5,
  Latte: 1.4,
  Biscotti: 2.3,
  Conserve: 1.15,
  Bevande: 2.5,
  Snack: 2.0,
  Dolci: 4.0,
  Formaggi: 3.2,
  Carne: 5.0,
};

// Componente Root
export default function App() {
  const [schermata, setSchermata] = useState("home");
  const [budget, setBudget] = useState(0);
  const [listaSpesa, setListaSpesa] = useState([]);
  const [filtri, setFiltri] = useState({
    locale: false,
    sostenibile: false,
    risparmio: false,
  });
  const [ricercaCat, setRicercaCat] = useState("");

  const [prodottoIspezionato, setProdottoIspezionato] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  // Imposta il titolo del tab del browser all'avvio dell'app
  useEffect(() => {
    document.title = "Scelte che Cont@no";
  }, []);

  // Utility per gestire la vista corrente senza usare react-router
  const vaiA = (nuovaSchermata) => {
    setSchermata(nuovaSchermata);
    window.scrollTo(0, 0);
  };

  const resettaTutto = () => {
    setSchermata("home");
    setBudget(0);
    setListaSpesa([]);
    setFiltri({ locale: false, sostenibile: false, risparmio: false });
    setRicercaCat("");
    setIsScanning(false);
  };

  const aggiungiSpecifico = (prodotto) => {
    if (!listaSpesa.find((p) => p.id === prodotto.id)) {
      setListaSpesa([...listaSpesa, prodotto]);
      setRicercaCat("");
    }
  };

  const aggiungiGenerico = (categoria) => {
    const idGen = "gen-" + categoria + "-" + Date.now();
    const prezzoMedio = PREZZI_MEDI[categoria] || 2;
    const prodottoGenerico = {
      id: idGen,
      isGeneric: true,
      categoria: categoria,
      nome: categoria,
      brand: "Qualsiasi",
      prezzo: prezzoMedio,
      sostenibilita: 5,
    };
    setListaSpesa([...listaSpesa, prodottoGenerico]);
    setRicercaCat("");
  };

  const rimuoviProdotto = (idProdotto) => {
    setListaSpesa(listaSpesa.filter((item) => item.id !== idProdotto));
  };

  const stimaCostoAttuale = useMemo(() => {
    return listaSpesa.reduce((totale, prodotto) => totale + prodotto.prezzo, 0);
  }, [listaSpesa]);

  const budgetSuperato = stimaCostoAttuale > budget;

  // Finta animazione dello scanner barcode, estrae un prodotto a caso dopo 1.5s
  const simulaScannerBarcode = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const randomProd =
        DATABASE_PRODOTTI[Math.floor(Math.random() * DATABASE_PRODOTTI.length)];
      setProdottoIspezionato(randomProd);
    }, 1500);
  };

  const generaCarrelli = () => {
    // Punteggio assegnato in base ai filtri scelti dall'utente
    const calcolaScoreUtente = (p) => {
      let score = 0;
      const noFiltri =
        !filtri.locale && !filtri.sostenibile && !filtri.risparmio;

      if (filtri.locale) score += p.locale ? 20 : 0;
      if (filtri.sostenibile) score += p.sostenibilita * 3;
      if (filtri.risparmio) score += (10 - p.prezzo) * 4;

      if (noFiltri) {
        score += 10 - p.prezzo + p.sostenibilita;
      }
      return score;
    };

    // Seleziona il prodotto giusto in base all'archetipo desiderato
    const pickProd = (tipo, prods, prodsToAvoid) => {
      let availableProds = prods.filter((p) => !prodsToAvoid.includes(p.id));
      if (availableProds.length === 0) availableProds = prods; // Fallback se non ci sono alternative

      if (tipo === "etica") {
        return [...availableProds].sort((a, b) => {
          let scoreA = a.sostenibilita;
          let scoreB = b.sostenibilita;
          // Se clicchi su "Locali (Km0)", l'algoritmo dà un bonus per farli apparire nella Scelta Etica
          if (filtri.locale) {
            scoreA += a.locale ? 5 : 0;
            scoreB += b.locale ? 5 : 0;
          }
          return scoreB - scoreA;
        })[0];
      }

      if (tipo === "km0") {
        const locals = availableProds.filter((p) => p.locale);
        if (locals.length > 0) {
          return locals.sort((a, b) => b.sostenibilita - a.sostenibilita)[0];
        } else {
          return [...availableProds].sort(
            (a, b) => b.sostenibilita - a.sostenibilita,
          )[0];
        }
      }

      if (tipo === "risparmio") {
        return [...availableProds].sort((a, b) => a.prezzo - b.prezzo)[0];
      }

      if (tipo === "commerciale") {
        // Mix tra economico ma con sostenibilità non altissima per simulare un brand commerciale
        const list = [...availableProds].sort((a, b) => a.prezzo - b.prezzo);
        const nonEco = list.find((p) => p.sostenibilita < 7);
        return nonEco || list[0];
      }
      return availableProds[0];
    };

    let tipoAlt1 = "etica";
    let nomeAlt1 = "Alternativa Etica";
    let tipoAlt2 = "risparmio";
    let nomeAlt2 = "Alternativa Risparmio";

    // Definiamo i carrelli alternativi basandoci per contrasto sulle preferenze utente
    if (filtri.sostenibile && !filtri.locale && !filtri.risparmio) {
      tipoAlt1 = "km0";
      nomeAlt1 = "Alternativa Km0";
      tipoAlt2 = "risparmio";
      nomeAlt2 = "Alternativa Risparmio";
    } else if (filtri.locale && !filtri.sostenibile && !filtri.risparmio) {
      tipoAlt1 = "etica";
      nomeAlt1 = "Alternativa Sostenibile";
      tipoAlt2 = "risparmio";
      nomeAlt2 = "Alternativa Risparmio";
    } else if (filtri.risparmio && !filtri.sostenibile && !filtri.locale) {
      tipoAlt1 = "etica";
      nomeAlt1 = "Alternativa Etica";
      tipoAlt2 = "commerciale";
      nomeAlt2 = "Brand Sponsorizzati";
    } else if ((filtri.sostenibile || filtri.locale) && !filtri.risparmio) {
      tipoAlt1 = "risparmio";
      nomeAlt1 = "Alternativa Risparmio";
      tipoAlt2 = "commerciale";
      nomeAlt2 = "Brand Sponsorizzati";
    } else if (filtri.risparmio && (filtri.sostenibile || filtri.locale)) {
      tipoAlt1 = "commerciale";
      nomeAlt1 = "Brand Sponsorizzati";
      tipoAlt2 = filtri.sostenibile ? "km0" : "etica";
      nomeAlt2 = filtri.sostenibile
        ? "Alternativa Km0"
        : "Estrema Sostenibilità";
    }

    // Funzione per capire se il carrello generato rispecchia i filtri scelti
    const checkMatch = (tipo) => {
      if (filtri.risparmio && tipo === "risparmio") return true;
      if (filtri.sostenibile && (tipo === "etica" || tipo === "km0"))
        return true;
      if (filtri.locale && (tipo === "km0" || tipo === "etica")) return true;
      return false;
    };

    const carrelloUtente = {
      nome: "Le Tue Scelte",
      prodotti: [...listaSpesa],
      totale: stimaCostoAttuale,
      scoreSos: 0,
    };
    const carrelloEconomico = {
      nome: nomeAlt1,
      prodotti: [],
      totale: 0,
      scoreSos: 0,
      isMatchFiltri: checkMatch(tipoAlt1),
    };
    const carrelloSostenibile = {
      nome: nomeAlt2,
      prodotti: [],
      totale: 0,
      scoreSos: 0,
      isMatchFiltri: checkMatch(tipoAlt2),
    };

    carrelloUtente.prodotti = []; // Svuotiamo i vecchi dati, li popoliamo ottimizzati
    carrelloUtente.totale = 0;
    carrelloUtente.scoreSos = 0;

    listaSpesa.forEach((itemScelto) => {
      // Cerca SEMPRE E SOLO nella stessa categoria
      let prodottiCat = DATABASE_PRODOTTI.filter(
        (p) => p.categoria === itemScelto.categoria,
      );

      // --- 1. PRODOTTO UTENTE ---
      // Se l'ha selezionato esplicitamente lo manteniamo. Se generico, l'IA seleziona con i filtri
      let prodUtente = itemScelto;
      if (itemScelto.isGeneric) {
        prodUtente =
          [...prodottiCat].sort(
            (a, b) => calcolaScoreUtente(b) - calcolaScoreUtente(a),
          )[0] || itemScelto;
      }

      if (prodUtente) {
        carrelloUtente.prodotti.push({
          ...prodUtente,
          wasGeneric: itemScelto.isGeneric,
        });
        carrelloUtente.totale += prodUtente.prezzo;
        carrelloUtente.scoreSos += prodUtente.sostenibilita;
      }

      // --- 2. PRODOTTO ALT 1 ---
      let prodAlt1 = pickProd(tipoAlt1, prodottiCat, [prodUtente?.id]);
      let alt1Same = false;

      // Controllo: se la scelta dell'utente è oggettivamente migliore dell'alternativa, teniamo quella dell'utente
      if (prodUtente && prodAlt1) {
        if (
          tipoAlt1 === "etica" &&
          prodUtente.sostenibilita > prodAlt1.sostenibilita
        ) {
          prodAlt1 = prodUtente;
          alt1Same = true;
        } else if (
          tipoAlt1 === "risparmio" &&
          prodUtente.prezzo < prodAlt1.prezzo
        ) {
          prodAlt1 = prodUtente;
          alt1Same = true;
        } else if (
          tipoAlt1 === "km0" &&
          prodUtente.locale &&
          !prodAlt1.locale
        ) {
          prodAlt1 = prodUtente;
          alt1Same = true;
        }
      }

      if (prodAlt1) {
        let motivazione = "Scelta dell'algoritmo.";
        if (alt1Same) {
          motivazione =
            "Ottima scelta! Hai già nel carrello il prodotto migliore per questo parametro.";
        } else if (tipoAlt1 === "risparmio") {
          const risparmio = prodUtente
            ? prodUtente.prezzo - prodAlt1.prezzo
            : 0;
          if (risparmio > 0)
            motivazione = `Risparmi €${risparmio.toFixed(2)} rispetto alla tua scelta.`;
          else motivazione = "Il prodotto più economico disponibile.";
        } else if (tipoAlt1 === "etica") {
          motivazione = `Miglior Eco-Score della categoria (${prodAlt1.sostenibilita}/10)`;
          if (filtri.locale && prodAlt1.locale)
            motivazione += " e prodotto a Km0.";
        } else if (tipoAlt1 === "km0") {
          motivazione = "Prodotto a Km0, supporta l'economia locale.";
        } else if (tipoAlt1 === "commerciale") {
          motivazione =
            "Scelta Sponsorizzata: l'azienda ha pagato per essere in evidenza.";
        }

        carrelloEconomico.prodotti.push({
          ...prodAlt1,
          motivazioneAI: motivazione,
        });
        carrelloEconomico.totale += prodAlt1.prezzo;
        carrelloEconomico.scoreSos += prodAlt1.sostenibilita;
      }

      // --- 3. PRODOTTO ALT 2 ---
      let prodAlt2 = pickProd(tipoAlt2, prodottiCat, [
        prodUtente?.id,
        prodAlt1?.id,
      ]);
      let alt2Same = false;

      // Controllo: se la scelta dell'utente è oggettivamente migliore dell'alternativa, teniamo quella dell'utente
      if (prodUtente && prodAlt2) {
        if (
          tipoAlt2 === "etica" &&
          prodUtente.sostenibilita > prodAlt2.sostenibilita
        ) {
          prodAlt2 = prodUtente;
          alt2Same = true;
        } else if (
          tipoAlt2 === "risparmio" &&
          prodUtente.prezzo < prodAlt2.prezzo
        ) {
          prodAlt2 = prodUtente;
          alt2Same = true;
        } else if (
          tipoAlt2 === "km0" &&
          prodUtente.locale &&
          !prodAlt2.locale
        ) {
          prodAlt2 = prodUtente;
          alt2Same = true;
        }
      }

      if (prodAlt2) {
        let motivazione = "Scelta dell'algoritmo.";
        if (alt2Same) {
          motivazione =
            "Ottima scelta! Hai già nel carrello il prodotto migliore per questo parametro.";
        } else if (tipoAlt2 === "risparmio") {
          const risparmio = prodUtente
            ? prodUtente.prezzo - prodAlt2.prezzo
            : 0;
          if (risparmio > 0)
            motivazione = `Risparmi €${risparmio.toFixed(2)} rispetto alla tua scelta.`;
          else motivazione = "Il prodotto più economico in alternativa.";
        } else if (tipoAlt2 === "etica") {
          motivazione = `Miglior Eco-Score della categoria (${prodAlt2.sostenibilita}/10)`;
          if (filtri.locale && prodAlt2.locale)
            motivazione += " e prodotto a Km0.";
        } else if (tipoAlt2 === "km0") {
          motivazione = "Prodotto a Km0, supporta l'economia locale.";
        } else if (tipoAlt2 === "commerciale") {
          motivazione =
            "Scelta Sponsorizzata: l'azienda ha pagato per essere in evidenza.";
        }

        carrelloSostenibile.prodotti.push({
          ...prodAlt2,
          motivazioneAI: motivazione,
        });
        carrelloSostenibile.totale += prodAlt2.prezzo;
        carrelloSostenibile.scoreSos += prodAlt2.sostenibilita;
      }
    });

    if (listaSpesa.length > 0) {
      carrelloUtente.scoreSos = (
        carrelloUtente.scoreSos / listaSpesa.length
      ).toFixed(1);
      carrelloEconomico.scoreSos = (
        carrelloEconomico.scoreSos / listaSpesa.length
      ).toFixed(1);
      carrelloSostenibile.scoreSos = (
        carrelloSostenibile.scoreSos / listaSpesa.length
      ).toFixed(1);
    }
    return [carrelloUtente, carrelloSostenibile, carrelloEconomico];
  };

  // --- Render dei modali e overlay ---
  const renderScannerOverlay = () => {
    if (!isScanning) return null;
    return (
      <div className="fixed inset-0 bg-black/80 z-[60] flex flex-col items-center justify-center p-4 backdrop-blur-sm">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2 animate-pulse">
            Scansione in corso...
          </h2>
          <p className="text-gray-400 text-sm">
            Inquadra il codice a barre del prodotto
          </p>
        </div>
        <div className="relative w-64 h-64 border-4 border-white/20 rounded-3xl overflow-hidden flex items-center justify-center bg-black/40 shadow-[0_0_50px_rgba(59,130,246,0.3)]">
          <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-blue-500 rounded-tl-xl"></div>
          <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-tr-xl"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-blue-500 rounded-bl-xl"></div>
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-blue-500 rounded-br-xl"></div>
          <ScanLine size={80} className="text-gray-600/50" />
          <div className="absolute left-0 w-full h-1 bg-red-500 shadow-[0_0_15px_rgba(239,68,68,1)] animate-laser" />
        </div>
        <button
          onClick={() => setIsScanning(false)}
          className="mt-12 px-6 py-3 bg-white/10 text-white rounded-full font-bold hover:bg-white/20 transition-colors border border-white/20"
        >
          Annulla Scansione
        </button>
      </div>
    );
  };

  const renderSchedaProdotto = () => {
    if (!prodottoIspezionato) return null;
    const p = prodottoIspezionato;
    const nutriColori = {
      A: "bg-green-500",
      B: "bg-green-400",
      C: "bg-yellow-400",
      D: "bg-orange-400",
      E: "bg-red-500",
    };
    const giaNelCarrello = listaSpesa.some((item) => item.id === p.id);

    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
        <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
          <div className="bg-blue-600 p-6 text-white flex justify-between items-start shrink-0">
            <div>
              <p className="text-blue-200 text-sm uppercase tracking-wide font-bold mb-1">
                {p.categoria}
              </p>
              <h3 className="text-2xl font-bold leading-tight">{p.nome}</h3>
              <p className="opacity-90 mt-1">{p.brand}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-extrabold">€{p.prezzo.toFixed(2)}</p>
            </div>
          </div>

          {/* Banner scorrevole per ricordare agli utenti che è una demo */}
          <div className="bg-yellow-400 text-yellow-900 text-xs font-bold py-1.5 overflow-hidden shrink-0 border-b border-yellow-500 flex">
            <div className="animate-marquee whitespace-nowrap inline-block w-full">
              ⚠️ ATTENZIONE: Simulazione didattica ai fini del progetto "Scelte
              che Contano". I dati, i prezzi e le certificazioni mostrate in
              questa scheda sono generati casualmente e non riflettono
              necessariamente la realtà. ⚠️
            </div>
          </div>

          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center">
                <Activity className="text-gray-400 mb-2" size={24} />
                <span className="text-xs text-gray-500 font-bold uppercase mb-1">
                  Nutri-Score
                </span>
                <span
                  className={`text-white font-black text-2xl w-12 h-12 flex items-center justify-center rounded-xl shadow-sm ${nutriColori[p.nutrizionale]}`}
                >
                  {p.nutrizionale}
                </span>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center">
                <MapPin
                  className={
                    p.locale ? "text-orange-500 mb-2" : "text-gray-400 mb-2"
                  }
                  size={24}
                />
                <span className="text-xs text-gray-500 font-bold uppercase mb-1">
                  Provenienza
                </span>
                <span
                  className={`font-bold ${p.locale ? "text-orange-600" : "text-gray-700"}`}
                >
                  {p.locale ? "Locale (Km0)" : "Importato"}
                </span>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wider">
                  Valori Nutrizionali (per 100g)
                </h4>
              </div>
              <div className="divide-y divide-gray-100 text-sm text-gray-700">
                <div className="flex justify-between px-4 py-2 bg-white">
                  <span className="font-medium text-gray-500">Energia</span>
                  <span className="font-bold">{p.valori.kcal} kcal</span>
                </div>
                <div className="flex justify-between px-4 py-2 bg-white">
                  <span className="font-medium text-gray-500">Grassi</span>
                  <span className="font-bold">{p.valori.grassi} g</span>
                </div>
                <div className="flex justify-between px-4 py-2 bg-white">
                  <span className="font-medium text-gray-500">Carboidrati</span>
                  <span className="font-bold">{p.valori.carboidrati} g</span>
                </div>
                <div className="flex justify-between px-4 py-2 bg-white">
                  <span className="font-medium text-gray-500">Proteine</span>
                  <span className="font-bold">{p.valori.proteine} g</span>
                </div>
                <div className="flex justify-between px-4 py-2 bg-white">
                  <span className="font-medium text-gray-500">Sale</span>
                  <span className="font-bold">{p.valori.sale} g</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-green-50 text-green-800 rounded-xl border border-green-100">
                <div className="flex items-center gap-2">
                  <Leaf size={18} />{" "}
                  <span className="font-bold">Eco-Score</span>
                </div>
                <span className="font-black text-lg">{p.sostenibilita}/10</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 text-blue-800 rounded-xl border border-blue-100">
                <div className="flex items-center gap-2">
                  <Package size={18} />{" "}
                  <span className="font-bold">Packaging</span>
                </div>
                <span className="text-sm font-semibold">{p.packaging}</span>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-100 bg-gray-50 shrink-0 flex gap-3">
            {schermata === "spesa" && !giaNelCarrello && (
              <button
                onClick={() => {
                  aggiungiSpecifico(p);
                  setProdottoIspezionato(null);
                }}
                className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors flex justify-center items-center"
              >
                <ShoppingCart size={18} className="mr-2" /> Aggiungi
              </button>
            )}
            {schermata === "spesa" && giaNelCarrello && (
              <button
                onClick={() => {
                  rimuoviProdotto(p.id);
                  setProdottoIspezionato(null);
                }}
                className="flex-1 py-3 bg-red-100 text-red-700 font-bold rounded-xl hover:bg-red-200 transition-colors"
              >
                Rimuovi dal Carrello
              </button>
            )}
            <button
              onClick={() => setProdottoIspezionato(null)}
              className="flex-1 py-3 bg-gray-200 text-gray-800 font-bold rounded-xl hover:bg-gray-300 transition-colors"
            >
              Chiudi
            </button>
          </div>
        </div>
      </div>
    );
  };

  // --- Render delle varie pagine dell'app ---
  const renderHome = () => (
    <div className="flex flex-col items-center justify-center space-y-8 animate-fade-in py-10">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 tracking-tight">
          Scelte che Cont@no
        </h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          L'app che ti aiuta a fare acquisti consapevoli, smascherando gli
          algoritmi e premiando la sostenibilità.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mt-8">
        <button
          onClick={() => vaiA("budget")}
          className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-lg border-2 border-transparent hover:border-blue-500 transition-all hover:-translate-y-1 group"
        >
          <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <ShoppingCart size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Spesa Intelligente
          </h2>
          <p className="text-center text-gray-500">
            Pianifica la spesa al supermercato rispettando il tuo budget e
            l'ambiente.
          </p>
        </button>
        <button
          onClick={() => vaiA("fastfashion")}
          className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-lg border-2 border-transparent hover:border-purple-500 transition-all hover:-translate-y-1 group"
        >
          <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Smartphone size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Shopping Online
          </h2>
          <p className="text-center text-gray-500">
            Analizza l'affidabilità dei brand di abbigliamento (Fast Fashion vs
            Etico).
          </p>
        </button>
      </div>
    </div>
  );

  const renderBudget = () => (
    <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl animate-fade-in mt-10">
      <button
        onClick={() => vaiA("home")}
        className="flex items-center text-gray-500 hover:text-blue-600 mb-6 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" /> Torna indietro
      </button>
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <DollarSign size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          Imposta il tuo Budget
        </h2>
      </div>
      <div className="space-y-6">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-xl">
            €
          </span>
          <input
            type="number"
            value={budget || ""}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full pl-10 pr-4 py-4 text-2xl font-bold bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 outline-none text-gray-800"
            placeholder="0.00"
          />
        </div>
        <button
          onClick={() => vaiA("spesa")}
          disabled={!budget || budget <= 0}
          className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
        >
          Inizia la Spesa <ArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );

  const renderSpesa = () => {
    const categorieFiltrate = CATEGORIE_DISPONIBILI.filter((c) =>
      c.toLowerCase().includes(ricercaCat.toLowerCase()),
    );
    const prodottiRicercati = DATABASE_PRODOTTI.filter(
      (p) =>
        p.nome.toLowerCase().includes(ricercaCat.toLowerCase()) ||
        p.categoria.toLowerCase().includes(ricercaCat.toLowerCase()),
    );

    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <button
            onClick={() => vaiA("budget")}
            className="flex items-center text-gray-500 hover:text-blue-600"
          >
            <ArrowLeft size={20} className="mr-2" /> Modifica budget
          </button>
          <div className="text-right bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
              Budget disp.
            </p>
            <p className="text-xl font-bold text-green-600">
              € {budget.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Seleziona i prodotti per la tua spesa
          </h2>

          <div className="flex gap-2 mb-6 relative">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={ricercaCat}
                onChange={(e) => setRicercaCat(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 outline-none"
                placeholder="Cerca un prodotto (es. Pasta) o usa scanner..."
              />
            </div>

            <button
              onClick={simulaScannerBarcode}
              className="flex flex-col items-center justify-center px-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all shrink-0 active:scale-95"
            >
              <ScanLine size={20} className="mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Scanner
              </span>
            </button>
          </div>

          {/* Mostro i risultati della ricerca (prima categorie, poi prodotti esatti) */}
          {ricercaCat &&
            (categorieFiltrate.length > 0 || prodottiRicercati.length > 0) && (
              <div className="mb-8 space-y-4">
                {/* Match per categoria */}
                {categorieFiltrate.length > 0 && (
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-4 py-2 bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider border-b">
                      Aggiungi Categoria Generica
                    </div>
                    {categorieFiltrate.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => aggiungiGenerico(cat)}
                        className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-0 flex justify-between items-center group"
                      >
                        <span className="font-medium text-gray-700">
                          {cat}{" "}
                          <span className="text-gray-400 text-sm font-normal">
                            (Sceglierà l'algoritmo)
                          </span>
                        </span>
                        <Plus
                          size={16}
                          className="text-gray-300 group-hover:text-blue-500"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Match esatto sul prodotto */}
                {prodottiRicercati.length > 0 && (
                  <div className="bg-blue-50/50 rounded-xl border border-blue-100 overflow-hidden shadow-sm">
                    <p className="text-sm font-bold text-blue-800 bg-blue-100 px-4 py-2 flex items-center">
                      <Search size={14} className="mr-2" /> Prodotti in
                      catalogo:
                    </p>
                    <div className="p-2 space-y-2">
                      {prodottiRicercati.map((prod) => {
                        const nelCarrello = listaSpesa.some(
                          (p) => p.id === prod.id,
                        );
                        return (
                          <div
                            key={prod.id}
                            className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200 shadow-sm"
                          >
                            <div
                              className="flex-1 cursor-pointer"
                              onClick={() => setProdottoIspezionato(prod)}
                            >
                              <p className="font-bold text-gray-800 text-sm">
                                {prod.nome}
                              </p>
                              <p className="text-xs text-gray-500 flex items-center gap-2">
                                €{prod.prezzo.toFixed(2)}{" "}
                                <span className="text-gray-300">|</span>{" "}
                                <span className="text-blue-500 hover:underline">
                                  Vedi info nutrizionali
                                </span>
                              </p>
                            </div>
                            <button
                              disabled={nelCarrello}
                              onClick={() => aggiungiSpecifico(prod)}
                              className={`ml-3 px-3 py-2 rounded-lg font-bold text-xs flex items-center transition-colors ${nelCarrello ? "bg-gray-100 text-gray-400" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                            >
                              {nelCarrello ? (
                                <CheckCircle2 size={16} className="mr-1" />
                              ) : (
                                <Plus size={16} className="mr-1" />
                              )}
                              {nelCarrello ? "Nel Carrello" : "Aggiungi"}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

          {!ricercaCat && (
            <div className="flex flex-wrap gap-2 mb-8">
              {CATEGORIE_DISPONIBILI.map((cat) => (
                <button
                  key={cat}
                  onClick={() => aggiungiGenerico(cat)}
                  className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-full text-sm font-medium hover:bg-blue-50 hover:text-blue-700 transition-all shadow-sm"
                >
                  + {cat} (Generico)
                </button>
              ))}
            </div>
          )}

          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
              Nel tuo carrello ({listaSpesa.length})
            </h3>
            {listaSpesa.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                <ShoppingCart
                  className="mx-auto text-gray-300 mb-2"
                  size={32}
                />
                <p className="text-gray-400 font-medium text-sm">
                  Cerca un prodotto o usa lo scanner per iniziare.
                </p>
              </div>
            ) : (
              <ul className="space-y-3">
                {listaSpesa.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-sm"
                  >
                    <div>
                      <span className="font-bold text-gray-800 text-sm flex items-center gap-2">
                        {item.nome}{" "}
                        {item.isGeneric && (
                          <span className="px-2 py-0.5 bg-gray-200 text-gray-500 text-[10px] uppercase rounded-md">
                            Generico
                          </span>
                        )}
                      </span>
                      <span className="text-xs font-medium text-gray-500">
                        {item.isGeneric
                          ? `~ €${item.prezzo.toFixed(2)} (stima)`
                          : `€${item.prezzo.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {!item.isGeneric && (
                        <button
                          onClick={() => setProdottoIspezionato(item)}
                          className="p-2 text-blue-500 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center"
                          title="Vedi Info Nutrizionali"
                        >
                          <Info size={18} />
                        </button>
                      )}
                      <button
                        onClick={() => rimuoviProdotto(item.id)}
                        className="p-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                        title="Rimuovi"
                      >
                        <XCircle size={18} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {listaSpesa.length > 0 && (
          <div
            className={`p-4 rounded-xl border-2 flex items-start gap-4 shadow-sm ${budgetSuperato ? "bg-red-50 border-red-200" : "bg-blue-50 border-blue-100"}`}
          >
            {budgetSuperato ? (
              <AlertTriangle className="text-red-500 shrink-0 mt-0.5" />
            ) : (
              <Info className="text-blue-500 shrink-0 mt-0.5" />
            )}
            <div>
              <h4
                className={`font-bold ${budgetSuperato ? "text-red-800" : "text-blue-800"}`}
              >
                Totale Spesa: € {stimaCostoAttuale.toFixed(2)}
              </h4>
              <p
                className={`text-sm mt-1 leading-relaxed ${budgetSuperato ? "text-red-600" : "text-blue-600"}`}
              >
                {budgetSuperato
                  ? "Attenzione! Hai superato il budget inserito. Rimuovi qualcosa o accetta il sovrapprezzo."
                  : "Sei in linea col budget."}
              </p>
            </div>
          </div>
        )}

        <button
          onClick={() => vaiA("filtri")}
          disabled={listaSpesa.length === 0}
          className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center shadow-lg"
        >
          Procedi all'Analisi Algoritmo <ArrowRight className="ml-2" />
        </button>
      </div>
    );
  };

  const renderFiltri = () => (
    <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl animate-fade-in mt-6">
      <button
        onClick={() => vaiA("spesa")}
        className="flex items-center text-gray-500 hover:text-blue-600 mb-8"
      >
        <ArrowLeft size={20} className="mr-2" /> Torna alla spesa
      </button>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">I tuoi Valori</h2>
      <p className="text-gray-500 mb-8 text-sm leading-relaxed">
        Mostriamo come l'algoritmo potrebbe modificare le tue scelte in base a
        diverse priorità.
      </p>

      <div className="space-y-4 mb-8">
        <label className="flex items-center justify-between p-4 border-2 border-gray-100 rounded-xl cursor-pointer hover:border-orange-200 hover:bg-orange-50/30">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
              <MapPin size={20} />
            </div>
            <div>
              <p className="font-bold text-gray-800">Prodotti Locali (Km0)</p>
            </div>
          </div>
          <input
            type="checkbox"
            className="w-6 h-6 rounded text-orange-600 focus:ring-0 border-gray-300"
            checked={filtri.locale}
            onChange={(e) => setFiltri({ ...filtri, locale: e.target.checked })}
          />
        </label>
        <label className="flex items-center justify-between p-4 border-2 border-gray-100 rounded-xl cursor-pointer hover:border-green-200 hover:bg-green-50/30">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-green-100 rounded-lg text-green-600">
              <Leaf size={20} />
            </div>
            <div>
              <p className="font-bold text-gray-800">Alta Sostenibilità</p>
            </div>
          </div>
          <input
            type="checkbox"
            className="w-6 h-6 rounded text-green-600 focus:ring-0 border-gray-300"
            checked={filtri.sostenibile}
            onChange={(e) =>
              setFiltri({ ...filtri, sostenibile: e.target.checked })
            }
          />
        </label>
        <label className="flex items-center justify-between p-4 border-2 border-gray-100 rounded-xl cursor-pointer hover:border-blue-200 hover:bg-blue-50/30">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <DollarSign size={20} />
            </div>
            <div>
              <p className="font-bold text-gray-800">Massimo Risparmio</p>
            </div>
          </div>
          <input
            type="checkbox"
            className="w-6 h-6 rounded text-blue-600 focus:ring-0 border-gray-300"
            checked={filtri.risparmio}
            onChange={(e) =>
              setFiltri({ ...filtri, risparmio: e.target.checked })
            }
          />
        </label>
      </div>

      <button
        onClick={() => vaiA("risultati")}
        className="w-full py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 flex justify-center items-center"
      >
        Analizza e Confronta <BarChart3 className="ml-2" />
      </button>
    </div>
  );

  const renderRisultati = () => {
    const carrelli = generaCarrelli();

    return (
      <div className="max-w-6xl mx-auto animate-fade-in space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-gray-200 pb-4 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Analisi e Alternative
            </h2>
            <p className="text-gray-500 mt-1">
              Confronta la tua spesa iniziale con le ottimizzazioni
              dell'algoritmo.
            </p>
          </div>
          <button
            onClick={resettaTutto}
            className="px-4 py-2 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300"
          >
            Nuova Spesa
          </button>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-xl shadow-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-800 font-bold">
                Nota sui risultati dell'Algoritmo
              </p>
              <p className="text-sm text-yellow-700 mt-1">
                I dati di questa applicazione sono stati creati dagli studenti
                per un esperimento didattico. Trattandosi di un dataset
                limitato, l'algoritmo potrebbe restituire incoerenze,
                specialmente per prodotti molto specifici senza alternative in
                archivio. In un contesto reale con i veri dati dei supermercati,
                l'algoritmo lavorerebbe in modo impeccabile.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-8">
          <h3 className="font-bold text-gray-800 mb-4 text-lg">
            Riepilogo Profilazione
          </h3>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block mb-2">
                I tuoi Filtri e Budget:
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-lg flex items-center gap-1.5 border border-indigo-200">
                  Budget: €{budget.toFixed(2)}
                </span>
                {filtri.locale && (
                  <span className="px-3 py-1.5 bg-orange-100 text-orange-700 text-xs font-bold rounded-lg flex items-center gap-1.5 border border-orange-200">
                    <MapPin size={14} /> Km0 / Locale
                  </span>
                )}
                {filtri.sostenibile && (
                  <span className="px-3 py-1.5 bg-green-100 text-green-700 text-xs font-bold rounded-lg flex items-center gap-1.5 border border-green-200">
                    <Leaf size={14} /> Alta Sostenibilità
                  </span>
                )}
                {filtri.risparmio && (
                  <span className="px-3 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-lg flex items-center gap-1.5 border border-blue-200">
                    <DollarSign size={14} /> Massimo Risparmio
                  </span>
                )}
                {!filtri.locale && !filtri.sostenibile && !filtri.risparmio && (
                  <span className="text-sm text-gray-400 italic">
                    Nessun filtro specifico applicato
                  </span>
                )}
              </div>
            </div>
            <div className="flex-1 border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0 sm:pl-6">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block mb-2">
                Il tuo Carrello Iniziale:
              </span>
              <div className="flex flex-wrap gap-2">
                {listaSpesa.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-gray-50 text-gray-700 text-xs font-medium rounded-lg border border-gray-200 shadow-sm flex items-center gap-1.5"
                  >
                    {item.nome}
                    {item.isGeneric && (
                      <span className="text-[9px] bg-gray-200 text-gray-500 px-1 py-0.5 rounded uppercase ml-1">
                        Generico
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {carrelli.map((carrello, idx) => {
            let borderColor = "border-gray-300";
            let bgColor = "bg-white";
            let badgeColor = "bg-gray-600";
            let iconColorClass = "text-gray-500";
            let badgeText = idx === 0 ? "Le Tue Scelte" : "Alternativa AI";

            if (idx !== 0) {
              if (carrello.nome.includes("Km0")) {
                borderColor = "border-orange-400";
                bgColor = "bg-orange-50/40";
                badgeColor = "bg-orange-500";
                iconColorClass = "text-orange-500";
                badgeText = "Scelta Km0";
              } else if (
                carrello.nome.includes("Etica") ||
                carrello.nome.includes("Sostenibilità") ||
                carrello.nome.includes("Sostenibile")
              ) {
                borderColor = "border-green-400";
                bgColor = "bg-green-50/40";
                badgeColor = "bg-green-500";
                iconColorClass = "text-green-500";
                badgeText = "Scelta Sostenibile";
              } else if (carrello.nome.includes("Risparmio")) {
                borderColor = "border-blue-400";
                bgColor = "bg-blue-50/40";
                badgeColor = "bg-blue-500";
                iconColorClass = "text-blue-500";
                badgeText = "Scelta Economica";
              } else if (carrello.nome.includes("Sponsorizzati")) {
                borderColor = "border-purple-400";
                bgColor = "bg-purple-50/40";
                badgeColor = "bg-purple-500";
                iconColorClass = "text-purple-500";
                badgeText = "Proposte Sponsorizzate";
              }
            }

            return (
              <div
                key={idx}
                className={`p-6 rounded-3xl border-2 shadow-sm relative overflow-hidden flex flex-col ${borderColor} ${bgColor}`}
              >
                <div
                  className={`absolute top-0 right-0 px-4 py-1.5 rounded-bl-xl font-bold text-xs text-white shadow-sm ${badgeColor}`}
                >
                  {badgeText}
                </div>

                {carrello.isMatchFiltri && (
                  <div className="absolute top-0 left-0 px-3 py-1.5 bg-yellow-400 text-yellow-900 font-bold text-xs rounded-br-xl shadow-sm flex items-center gap-1 z-10">
                    🎯 In linea coi tuoi filtri
                  </div>
                )}

                <div className="mb-6 mt-6">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {carrello.nome}
                  </h3>
                  <div className="flex items-center gap-3 mt-3">
                    <span
                      className={`px-3 py-1 rounded-lg text-sm font-bold border flex items-center shadow-sm ${idx === 0 ? "bg-gray-50 border-gray-200 text-gray-700" : "bg-white border-white"}`}
                    >
                      <Leaf size={14} className={`mr-1.5 ${iconColorClass}`} />{" "}
                      Eco Score: {carrello.scoreSos}/10
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-2xl shadow-sm mb-6 border border-gray-100 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-gray-500 font-medium text-sm uppercase tracking-wider">
                      Totale
                    </span>
                    {carrello.totale > budget && (
                      <span className="text-red-500 text-[10px] font-bold uppercase mt-0.5">
                        Fuori Budget
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-3xl font-black ${carrello.totale > budget ? "text-red-600" : "text-gray-900"}`}
                  >
                    €{carrello.totale.toFixed(2)}
                  </span>
                </div>

                <div className="space-y-3 flex-1">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">
                    Prodotti:
                  </p>
                  {carrello.prodotti.map((prod, pIdx) => (
                    <div
                      key={pIdx}
                      className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-2"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-gray-800 text-sm flex items-center flex-wrap gap-1">
                            {prod.nome}
                            {idx === 0 && prod.wasGeneric && (
                              <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[9px] uppercase rounded-md whitespace-nowrap">
                                Scelto per te
                              </span>
                            )}
                          </p>
                          <p className="text-[10px] text-gray-500 uppercase mt-0.5">
                            {prod.brand} {prod.locale && "• KM0"}
                          </p>
                        </div>
                        <span className="font-bold text-gray-700 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100 text-xs shrink-0 ml-2">
                          €{prod.prezzo.toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={() => setProdottoIspezionato(prod)}
                        className="text-xs text-blue-600 font-bold hover:text-blue-800 flex items-center w-max p-1 -ml-1 rounded hover:bg-blue-50 mt-1"
                      >
                        <Info size={14} className="mr-1" /> Info nutrizionali
                      </button>

                      {prod.motivazioneAI && (
                        <div className="mt-2 bg-indigo-50/50 p-2 rounded-lg border border-indigo-100 flex items-start gap-2">
                          <span className="text-sm">🤖</span>
                          <p className="text-xs text-indigo-800 font-medium leading-tight pt-0.5">
                            {prod.motivazioneAI}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderFastFashion = () => (
    <div className="max-w-5xl mx-auto animate-fade-in py-6">
      <button
        onClick={() => vaiA("home")}
        className="flex items-center text-gray-500 hover:text-purple-600 mb-8"
      >
        <ArrowLeft size={20} className="mr-2" /> Torna alla Home
      </button>

      <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl mb-10 relative overflow-hidden">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Scanner Affidabilità Brand
        </h2>
        <p className="text-purple-200 text-lg max-w-2xl leading-relaxed mb-8">
          Gli algoritmi dei social ci spingono a comprare capi a prezzi
          stracciati. Inserisci il nome di un brand per analizzarlo in tempo
          reale.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
          <input
            type="text"
            disabled
            placeholder="Esempio: UltraFastFashion Brand..."
            className="w-full px-6 py-4 rounded-xl text-gray-800 opacity-70 bg-white"
          />
          <button
            disabled
            className="px-8 py-4 bg-purple-500 rounded-xl font-bold opacity-70"
          >
            Analizza Sito
          </button>
        </div>

        <div className="mt-6 bg-black/20 rounded-xl p-5 flex gap-4 text-sm text-purple-100 items-start max-w-2xl border border-purple-500/30">
          <Info size={24} className="shrink-0 text-purple-300 mt-0.5" />
          <div>
            <p className="font-bold text-white mb-1 uppercase tracking-wider text-xs">
              Nota per la presentazione
            </p>
            <p className="leading-relaxed">
              In un'applicazione reale, l'inserimento dell'URL in questa barra
              attiverebbe un'Intelligenza Artificiale capace di scansionare il
              web alla ricerca di scandali, recensioni Trustpilot e
              certificazioni. Per questa{" "}
              <strong className="text-white">versione dimostrativa</strong> la
              ricerca è disattivata: abbiamo pre-caricato due scenari tipici qui
              sotto per illustrare il funzionamento.
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white border border-red-100 rounded-3xl p-8 shadow-lg relative flex flex-col h-full">
          <div className="absolute top-0 right-0 bg-red-500 text-white px-6 py-1.5 rounded-bl-2xl font-bold text-sm">
            Rischio Alto
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2 mt-2">
            Brand "Fast & Cheap"
          </h3>
          <div className="space-y-4 mb-8 flex-1 mt-6">
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100">
              <span className="font-semibold text-red-900">
                Trasparenza Filiera
              </span>
              <span className="font-black text-red-600 bg-white px-3 py-1 rounded-lg">
                2/10
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-100">
              <span className="font-semibold text-orange-900">
                Qualità Materiali
              </span>
              <span className="font-black text-orange-600 bg-white px-3 py-1 rounded-lg">
                4/10
              </span>
            </div>
          </div>
          <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center text-sm uppercase">
              <AlertTriangle size={18} className="mr-2 text-red-500" /> Notizie
              Rilevate dall'AI:
            </h4>
            <ul className="text-sm text-gray-600 space-y-3 list-disc pl-5">
              <li>
                <span className="font-medium text-gray-800">
                  Scandalo lavorativo:
                </span>{" "}
                Inchieste sulle condizioni di lavoro nel sud-est asiatico.
              </li>
              <li>
                <span className="font-medium text-gray-800">
                  Impatto Ambientale:
                </span>{" "}
                Materiali contenenti tracce di microplastiche e PFAS.
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white border border-green-100 rounded-3xl p-8 shadow-lg relative flex flex-col h-full">
          <div className="absolute top-0 right-0 bg-green-500 text-white px-6 py-1.5 rounded-bl-2xl font-bold text-sm">
            Scelta Etica
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2 mt-2">
            Brand "EcoWear"
          </h3>
          <div className="space-y-4 mb-8 flex-1 mt-6">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100">
              <span className="font-semibold text-green-900">
                Sostenibilità Materiali
              </span>
              <span className="font-black text-green-600 bg-white px-3 py-1 rounded-lg">
                9/10
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100">
              <span className="font-semibold text-green-900">
                Condizioni Lavoro
              </span>
              <span className="font-bold text-green-700 bg-white px-3 py-1 rounded-lg text-xs">
                Certificato FairTrade
              </span>
            </div>
          </div>
          <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center text-sm uppercase">
              <CheckCircle2 size={18} className="mr-2 text-green-500" /> Punti
              di Forza Rilevati:
            </h4>
            <ul className="text-sm text-gray-600 space-y-3 list-disc pl-5">
              <li>
                <span className="font-medium text-gray-800">Materiali:</span>{" "}
                Utilizzo esclusivo di cotone biologico tracciabile.
              </li>
              <li>
                <span className="font-medium text-gray-800">Circolarità:</span>{" "}
                Programma di ritiro e riciclo dell'usato gratuito.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      {/* CSS inline per le animazioni dello scanner e del marquee */}
      <style>
        {`
          @keyframes laserScan {
            0% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
          .animate-laser {
            animation: laserScan 1.2s ease-in-out infinite;
          }
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-150%); }
          }
          .animate-marquee {
            animation: marquee 14s linear infinite;
          }
        `}
      </style>

      {renderScannerOverlay()}
      {renderSchedaProdotto()}

      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => vaiA("home")}
          >
            <img
              src="/public/logo-scuola.png"
              alt="Logo Istituto Locatelli"
              className="h-10 w-auto object-contain group-hover:scale-105 transition-transform"
              onError={(e) => {
                e.target.onerror = null;
                e.target.outerHTML =
                  '<div class="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-md">S</div>';
              }}
            />
            <div>
              <span className="font-bold text-gray-800 block text-lg leading-none">
                Scelte che Contano
              </span>
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider hidden sm:block mt-1">
                App per il consumo intelligente
              </span>
            </div>
          </div>
          <div className="text-xs font-bold text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 shadow-sm">
            Prototipo Didattico v1.7
          </div>
        </div>
      </header>
      <main className="px-4 pb-12">
        {schermata === "home" && renderHome()}
        {schermata === "budget" && renderBudget()}
        {schermata === "spesa" && renderSpesa()}
        {schermata === "filtri" && renderFiltri()}
        {schermata === "risultati" && renderRisultati()}
        {schermata === "fastfashion" && renderFastFashion()}
      </main>
    </div>
  );
}
