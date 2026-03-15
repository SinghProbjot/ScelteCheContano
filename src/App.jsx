import React, { useState, useMemo } from "react";
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
} from "lucide-react";

// ==========================================
// 1. IL "FINTO DATABASE" (Qui lavoreranno gli studenti!)
// ==========================================
// Questo è il dataset simulato. Potrai chiedere agli studenti di
// cercare dati reali e ampliare questo array.
const DATABASE_PRODOTTI = [
  {
    id: 1,
    categoria: "Pasta",
    nome: "Pasta Bio Km0",
    prezzo: 1.8,
    sostenibilita: 9,
    locale: true,
    brand: "Agricola Bergamo",
  },
  {
    id: 2,
    categoria: "Pasta",
    nome: "Pasta Sottomarca",
    prezzo: 0.6,
    sostenibilita: 3,
    locale: false,
    brand: "Discount X",
  },
  {
    id: 3,
    categoria: "Pasta",
    nome: "Pasta Classica",
    prezzo: 1.1,
    sostenibilita: 5,
    locale: false,
    brand: "Marca Famosa",
  },

  {
    id: 4,
    categoria: "Latte",
    nome: "Latte Fresco Val Seriana",
    prezzo: 1.9,
    sostenibilita: 8,
    locale: true,
    brand: "Latteria Locale",
  },
  {
    id: 5,
    categoria: "Latte",
    nome: "Latte UHT",
    prezzo: 0.9,
    sostenibilita: 4,
    locale: false,
    brand: "Multinazionale",
  },

  {
    id: 6,
    categoria: "Biscotti",
    nome: "Frollini Artigianali",
    prezzo: 3.5,
    sostenibilita: 8,
    locale: true,
    brand: "Forno di Città",
  },
  {
    id: 7,
    categoria: "Biscotti",
    nome: "Biscotti con Olio di Palma",
    prezzo: 1.2,
    sostenibilita: 2,
    locale: false,
    brand: "Industria Dolciaria",
  },

  {
    id: 8,
    categoria: "Frutta",
    nome: "Mele del Trentino",
    prezzo: 2.0,
    sostenibilita: 9,
    locale: true,
    brand: "Consorzio Mela",
  },
  {
    id: 9,
    categoria: "Frutta",
    nome: "Banane Sudamerica",
    prezzo: 1.5,
    sostenibilita: 4,
    locale: false,
    brand: "Import Export",
  },
];

const CATEGORIE_DISPONIBILI = ["Pasta", "Latte", "Biscotti", "Frutta"];

// Prezzi medi stimati per il calcolo in tempo reale del budget
const PREZZI_MEDI = {
  Pasta: 1.2,
  Latte: 1.4,
  Biscotti: 2.3,
  Frutta: 1.8,
};

// ==========================================
// 2. COMPONENTE PRINCIPALE DELL'APP
// ==========================================
export default function App() {
  // Stati dell'applicazione
  const [schermata, setSchermata] = useState("home"); // home, budget, spesa, filtri, risultati, fastfashion
  const [budget, setBudget] = useState(0);
  const [listaSpesa, setListaSpesa] = useState([]);
  const [filtri, setFiltri] = useState({
    locale: false,
    sostenibile: false,
    risparmio: false,
  });
  const [ricercaCat, setRicercaCat] = useState("");

  // Navigazione
  const vaiA = (nuovaSchermata) => setSchermata(nuovaSchermata);
  const resettaTutto = () => {
    setSchermata("home");
    setBudget(0);
    setListaSpesa([]);
    setFiltri({ locale: false, sostenibile: false, risparmio: false });
  };

  // ==========================================
  // LOGICA: GESTIONE LISTA SPESA E BUDGET
  // ==========================================
  const aggiungiProdotto = (categoria) => {
    if (!listaSpesa.includes(categoria)) {
      setListaSpesa([...listaSpesa, categoria]);
      setRicercaCat("");
    }
  };

  const rimuoviProdotto = (categoria) => {
    setListaSpesa(listaSpesa.filter((item) => item !== categoria));
  };

  const stimaCostoAttuale = useMemo(() => {
    return listaSpesa.reduce(
      (totale, cat) => totale + (PREZZI_MEDI[cat] || 2),
      0,
    );
  }, [listaSpesa]);

  const budgetSuperato = stimaCostoAttuale > budget;

  // ==========================================
  // LOGICA: GENERAZIONE CARRELLI OTTIMIZZATI
  // ==========================================
  const generaCarrelli = () => {
    // Generiamo 2 carrelli fittizi in base alla lista: Uno Economico, Uno Sostenibile
    const carrelloEconomico = {
      nome: "Carrello Risparmio",
      prodotti: [],
      totale: 0,
      scoreSos: 0,
    };
    const carrelloSostenibile = {
      nome: "Carrello Etico/Locale",
      prodotti: [],
      totale: 0,
      scoreSos: 0,
    };

    listaSpesa.forEach((cat) => {
      const prodottiCat = DATABASE_PRODOTTI.filter((p) => p.categoria === cat);

      // Trova il più economico
      const minPriceProd = [...prodottiCat].sort(
        (a, b) => a.prezzo - b.prezzo,
      )[0];
      if (minPriceProd) {
        carrelloEconomico.prodotti.push(minPriceProd);
        carrelloEconomico.totale += minPriceProd.prezzo;
        carrelloEconomico.scoreSos += minPriceProd.sostenibilita;
      }

      // Trova il più sostenibile
      const maxSosProd = [...prodottiCat].sort(
        (a, b) => b.sostenibilita - a.sostenibilita,
      )[0];
      if (maxSosProd) {
        carrelloSostenibile.prodotti.push(maxSosProd);
        carrelloSostenibile.totale += maxSosProd.prezzo;
        carrelloSostenibile.scoreSos += maxSosProd.sostenibilita;
      }
    });

    if (listaSpesa.length > 0) {
      carrelloEconomico.scoreSos = (
        carrelloEconomico.scoreSos / listaSpesa.length
      ).toFixed(1);
      carrelloSostenibile.scoreSos = (
        carrelloSostenibile.scoreSos / listaSpesa.length
      ).toFixed(1);
    }

    return [carrelloSostenibile, carrelloEconomico];
  };

  // ==========================================
  // SCHERMATE DELL'INTERFACCIA
  // ==========================================

  // 1. Schermata Home (Dashboard)
  const renderHome = () => (
    <div className="flex flex-col items-center justify-center space-y-8 animate-fade-in">
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

  // 2. Schermata Budget
  const renderBudget = () => (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg animate-fade-in">
      <button
        onClick={() => vaiA("home")}
        className="flex items-center text-gray-500 hover:text-blue-600 mb-6"
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
        <p className="text-gray-500 mt-2">
          Prima di iniziare, quanto vuoi spendere al massimo per questa spesa?
        </p>
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
            className="w-full pl-10 pr-4 py-4 text-2xl font-bold bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 outline-none transition-all"
            placeholder="0.00"
          />
        </div>

        <button
          onClick={() => vaiA("spesa")}
          disabled={!budget || budget <= 0}
          className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center transition-colors"
        >
          Inizia la Spesa <ArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );

  // 3. Schermata Compilazione Lista Spesa
  const renderSpesa = () => (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <button
          onClick={() => vaiA("budget")}
          className="flex items-center text-gray-500 hover:text-blue-600"
        >
          <ArrowLeft size={20} className="mr-2" /> Modifica budget
        </button>
        <div className="text-right">
          <p className="text-sm text-gray-500 font-medium">
            Budget disponibile
          </p>
          <p className="text-2xl font-bold text-green-600">
            € {budget.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Cosa devi comprare?
        </h2>

        {/* Barra di ricerca / Autocompletamento simulato */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={ricercaCat}
            onChange={(e) => setRicercaCat(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 outline-none"
            placeholder="Cerca prodotto o scansiona barcode..."
          />
          {ricercaCat && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg">
              {CATEGORIE_DISPONIBILI.filter((c) =>
                c.toLowerCase().includes(ricercaCat.toLowerCase()),
              ).map((cat) => (
                <button
                  key={cat}
                  onClick={() => aggiungiProdotto(cat)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-0"
                >
                  Aggiungi "{cat}"
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Categorie Rapide */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIE_DISPONIBILI.filter((c) => !listaSpesa.includes(c)).map(
            (cat) => (
              <button
                key={cat}
                onClick={() => aggiungiProdotto(cat)}
                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
              >
                + {cat}
              </button>
            ),
          )}
        </div>

        {/* La mia lista */}
        <div>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
            La mia lista ({listaSpesa.length})
          </h3>
          {listaSpesa.length === 0 ? (
            <p className="text-gray-400 text-center py-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              Il tuo carrello è vuoto.
            </p>
          ) : (
            <ul className="space-y-2">
              {listaSpesa.map((item) => (
                <li
                  key={item}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100"
                >
                  <span className="font-medium text-gray-700">{item}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-400">
                      ~ €{PREZZI_MEDI[item].toFixed(2)} stima
                    </span>
                    <button
                      onClick={() => rimuoviProdotto(item)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <XCircle size={20} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Box Avviso Budget */}
      {listaSpesa.length > 0 && (
        <div
          className={`p-4 rounded-xl border-2 flex items-start gap-4 transition-all ${budgetSuperato ? "bg-red-50 border-red-200" : "bg-blue-50 border-blue-100"}`}
        >
          {budgetSuperato ? (
            <AlertTriangle className="text-red-500 shrink-0" />
          ) : (
            <Info className="text-blue-500 shrink-0" />
          )}
          <div>
            <h4
              className={`font-bold ${budgetSuperato ? "text-red-800" : "text-blue-800"}`}
            >
              Stima Spesa: € {stimaCostoAttuale.toFixed(2)}
            </h4>
            <p
              className={`text-sm mt-1 ${budgetSuperato ? "text-red-600" : "text-blue-600"}`}
            >
              {budgetSuperato
                ? "Attenzione! La stima basata sui prezzi medi supera il tuo budget iniziale. Potrebbe esserti suggerito di rimuovere un prodotto."
                : "Sei perfettamente in linea con il budget impostato. Continua così!"}
            </p>
          </div>
        </div>
      )}

      <button
        onClick={() => vaiA("filtri")}
        disabled={listaSpesa.length === 0}
        className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
      >
        Procedi ai Filtri Etici <ArrowRight className="ml-2" />
      </button>
    </div>
  );

  // 4. Schermata Impostazione Filtri
  const renderFiltri = () => (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg animate-fade-in">
      <button
        onClick={() => vaiA("spesa")}
        className="flex items-center text-gray-500 hover:text-blue-600 mb-6"
      >
        <ArrowLeft size={20} className="mr-2" /> Torna alla lista
      </button>

      <h2 className="text-2xl font-bold text-gray-800 mb-2">I tuoi Valori</h2>
      <p className="text-gray-500 mb-8">
        L'intelligenza artificiale cercherà i prodotti in base a cosa ritieni
        più importante.
      </p>

      <div className="space-y-4 mb-8">
        {/* Toggle 1 */}
        <label className="flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <MapPin className="text-orange-500" />
            <div>
              <p className="font-bold text-gray-700">Prodotti Locali (Km0)</p>
              <p className="text-sm text-gray-500">
                Sostieni l'economia locale
              </p>
            </div>
          </div>
          <input
            type="checkbox"
            className="w-6 h-6 rounded text-blue-600 focus:ring-0"
            checked={filtri.locale}
            onChange={(e) => setFiltri({ ...filtri, locale: e.target.checked })}
          />
        </label>

        {/* Toggle 2 */}
        <label className="flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <Leaf className="text-green-500" />
            <div>
              <p className="font-bold text-gray-700">Alta Sostenibilità</p>
              <p className="text-sm text-gray-500">
                Packaging eco e basso impatto
              </p>
            </div>
          </div>
          <input
            type="checkbox"
            className="w-6 h-6 rounded text-blue-600 focus:ring-0"
            checked={filtri.sostenibile}
            onChange={(e) =>
              setFiltri({ ...filtri, sostenibile: e.target.checked })
            }
          />
        </label>

        {/* Toggle 3 */}
        <label className="flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <DollarSign className="text-blue-500" />
            <div>
              <p className="font-bold text-gray-700">Massimo Risparmio</p>
              <p className="text-sm text-gray-500">
                Priorità al prezzo più basso
              </p>
            </div>
          </div>
          <input
            type="checkbox"
            className="w-6 h-6 rounded text-blue-600 focus:ring-0"
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
        Genera Carrelli Ottimizzati <BarChart3 className="ml-2" />
      </button>
    </div>
  );

  // 5. Schermata Risultati (Confronto Carrelli)
  const renderRisultati = () => {
    const carrelli = generaCarrelli();

    return (
      <div className="max-w-4xl mx-auto animate-fade-in space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Le nostre Proposte
          </h2>
          <button
            onClick={resettaTutto}
            className="text-blue-600 hover:underline font-medium"
          >
            Nuova Spesa
          </button>
        </div>
        <p className="text-gray-600">
          Il nostro algoritmo ha elaborato la tua lista trovando queste due
          combinazioni in base al database disponibile.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {carrelli.map((carrello, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border-2 ${idx === 0 ? "border-green-400 bg-green-50/30" : "border-blue-400 bg-blue-50/30"}`}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {carrello.nome}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-3 py-1 bg-white rounded-full text-sm font-bold border flex items-center shadow-sm">
                      <Leaf size={14} className="text-green-500 mr-1" /> Eco
                      Score: {carrello.scoreSos}/10
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Totale</p>
                  <p
                    className={`text-3xl font-bold ${carrello.totale > budget ? "text-red-600" : "text-gray-900"}`}
                  >
                    €{carrello.totale.toFixed(2)}
                  </p>
                </div>
              </div>

              {carrello.totale > budget && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-lg flex items-center gap-2">
                  <AlertTriangle size={16} /> Attenzione: Supera il tuo budget
                  di €{budget.toFixed(2)}
                </div>
              )}

              <div className="space-y-3">
                <p className="text-sm font-bold text-gray-400 uppercase">
                  Prodotti selezionati:
                </p>
                {carrello.prodotti.map((prod, pIdx) => (
                  <div
                    key={pIdx}
                    className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center"
                  >
                    <div>
                      <p className="font-bold text-gray-800 text-sm">
                        {prod.nome}
                      </p>
                      <p className="text-xs text-gray-500">
                        {prod.brand} {prod.locale && "• 📍 Km0"}
                      </p>
                    </div>
                    <span className="font-semibold text-gray-700">
                      €{prod.prezzo.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 6. Schermata Dimostrativa "Fast Fashion" (Shopping Online)
  const renderFastFashion = () => (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <button
        onClick={() => vaiA("home")}
        className="flex items-center text-gray-500 hover:text-purple-600 mb-6"
      >
        <ArrowLeft size={20} className="mr-2" /> Torna alla Home
      </button>

      <div className="bg-gradient-to-br from-purple-900 to-indigo-800 rounded-3xl p-8 text-white shadow-xl mb-8">
        <h2 className="text-3xl font-bold mb-4">Scanner Affidabilità Brand</h2>
        <p className="text-purple-200 text-lg max-w-2xl">
          Gli algoritmi dei social ci spingono a comprare capi a prezzi
          stracciati. Ma qual è il vero costo? Inserisci il link o il nome di un
          brand per analizzarlo.
        </p>

        <div className="mt-6 flex gap-4">
          <input
            type="text"
            disabled
            placeholder="Esempio: UltraFastFashion Brand..."
            className="w-full px-6 py-4 rounded-xl text-gray-800 opacity-70 cursor-not-allowed bg-white"
          />
          <button
            disabled
            className="px-8 py-4 bg-purple-500 rounded-xl font-bold opacity-70 cursor-not-allowed"
          >
            Analizza
          </button>
        </div>
        <p className="text-xs text-purple-300 mt-2 flex items-center">
          <Info size={14} className="mr-1" /> Funzione demo: Dati pre-caricati
          per la presentazione.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Brand Negativo */}
        <div className="bg-white border-2 border-red-100 rounded-2xl p-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-1 rounded-bl-xl font-bold text-sm">
            Rischio Alto
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            Brand "Fast & Cheap"
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Analisi basata su 14.000 recensioni e notizie web
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <span className="font-medium text-red-800">
                Trasparenza Filiera
              </span>
              <span className="font-bold text-red-600">2/10</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <span className="font-medium text-orange-800">
                Qualità Materiali
              </span>
              <span className="font-bold text-orange-600">4/10</span>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-bold text-gray-700 mb-2 flex items-center text-sm">
              <AlertTriangle size={16} className="mr-1 text-red-500" /> Notizie
              Rilevate dall'AI:
            </h4>
            <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
              <li>
                Scandalo sulle condizioni di lavoro nel sud-est asiatico (Marzo
                2024).
              </li>
              <li>
                Materiali contenenti tracce di microplastiche sopra la norma.
              </li>
              <li>
                Trustpilot: 70% di recensioni negative per resi impossibili.
              </li>
            </ul>
          </div>
        </div>

        {/* Brand Virtuoso */}
        <div className="bg-white border-2 border-green-100 rounded-2xl p-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 rounded-bl-xl font-bold text-sm">
            Scelta Etica
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            Brand "EcoWear"
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Analisi basata su certificazioni e recensioni verificate
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="font-medium text-green-800">
                Sostenibilità Materiali
              </span>
              <span className="font-bold text-green-600">9/10</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="font-medium text-green-800">
                Condizioni Lavorative
              </span>
              <span className="font-bold text-green-600">
                Certificato FairTrade
              </span>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-bold text-gray-700 mb-2 flex items-center text-sm">
              <CheckCircle2 size={16} className="mr-1 text-green-500" /> Note
              Positive:
            </h4>
            <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
              <li>Utilizzo esclusivo di cotone biologico tracciabile.</li>
              <li>Programma di ritiro e riciclo dell'usato gratuito.</li>
              <li>Recensioni: "Costa il doppio, ma dura 5 anni in più".</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  // Router semplice
  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900 p-4 md:p-8">
      {/* Header piccolo in alto */}
      <header className="max-w-6xl mx-auto flex items-center justify-between mb-8">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => vaiA("home")}
        >
          <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">
            S
          </div>
          <span className="font-bold text-gray-700 hidden sm:block">
            Scelte che Contano
          </span>
        </div>
        <div className="text-xs text-gray-400 font-medium px-3 py-1 bg-gray-200 rounded-full">
          Prototipo v1.0 • ITA Locatelli
        </div>
      </header>

      {/* Area Contenuto */}
      <main className="max-w-6xl mx-auto">
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
