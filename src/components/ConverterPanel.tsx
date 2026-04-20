import { ArrowLeftRight } from "lucide-react";
import { useConverter } from "../hooks/useConverter";
import { useState } from "react";

const currencySymbols: Record<string, string> = {
  USD: "$",
  BRL: "R$",
  EUR: "€",
  JPY: "¥",
};

export default function ConverterPanel() {
  const {
    berries,
    currencyValue,
    selectedCurrency,
    setBerries,
    setCurrencyValue,
    setSelectedCurrency,
    setIsBerriesInput,
    handleSwap,
  } = useConverter();

  const [isLayoutSwapped, setIsLayoutSwapped] = useState(false);

  const handleSwapAndFlip = () => {
    handleSwap();
    setIsLayoutSwapped((prev) => !prev);
  };

  return (
    <div className="relative flex items-center justify-center min-h-[60vh] p-4">
      <div
        className={`flex flex-col md:flex-row gap-6 md:gap-10 items-center justify-center transition-all duration-300 ${
          isLayoutSwapped ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* PAINEL DE CURRENCY (esquerda por padrão) */}
        <div className="wanted-border bg-emerald-50 p-6 w-full max-w-xs shadow-wanted">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-green-800 font-bold text-2xl font-pirata tracking-wide">
              💵 Currency
            </h2>
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="bg-white/20 text-stone-800 rounded-lg px-2 py-1 text-sm font-semibold backdrop-blur-sm"
            >
              {Object.keys(currencySymbols).map((cur) => (
                <option key={cur} value={cur} className="text-black">
                  {cur}
                </option>
              ))}
            </select>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-800 font-bold text-lg">
              {currencySymbols[selectedCurrency]}
            </span>
            <input
              type="number"
              inputMode="decimal"
              value={currencyValue}
              onChange={(e) => {
                setIsBerriesInput(false);
                setCurrencyValue(e.target.value);
              }}
              className="w-full p-3 pl-10 rounded-lg text-black text-lg border-2 border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* PAINEL DE BELLIES (direita por padrão) */}
        <div className="wanted-border bg-amber-100 p-6 w-full max-w-xs shadow-wanted">
          <h2 className="text-amber-900 font-bold text-2xl mb-3 flex items-center gap-2 font-pirata tracking-wide">
            💰 Bellies
          </h2>
          <input
            type="number"
            inputMode="numeric"
            value={berries}
            onChange={(e) => {
              setIsBerriesInput(true);
              setBerries(e.target.value);
            }}
            className="w-full p-3 rounded-lg text-black text-lg border-2 border-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-700"
            placeholder="0"
          />
        </div>
      </div>

      <button
        onClick={handleSwapAndFlip}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10
                   bg-gradient-to-r from-orange-600 to-yellow-500
                   p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-200
                   border-2 border-white"
        aria-label="Swap panels"
      >
        <ArrowLeftRight className="text-white w-6 h-6" />
      </button>
    </div>
  );
}
