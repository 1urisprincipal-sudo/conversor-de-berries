import { useState, useEffect } from "react";

const BELLY_TO_USD = 0.01; // 100 Bellies = 1 USD

// Exchange rates relative to USD
const EXCHANGE_RATES: Record<string, number> = {
  USD: 1,
  BRL: 5.25,
  EUR: 0.92,
  JPY: 150.5,
};

export function useConverter() {
  const [berries, setBerries] = useState("");
  const [currencyValue, setCurrencyValue] = useState("");
  const [isBerriesInput, setIsBerriesInput] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const convertBerriesToCurrency = (berryAmount: number) => {
    const usd = berryAmount * BELLY_TO_USD;
    const rate = EXCHANGE_RATES[selectedCurrency];
    return (usd * rate).toFixed(2);
  };

  const convertCurrencyToBerries = (currencyAmount: number) => {
    const rate = EXCHANGE_RATES[selectedCurrency];
    const usd = currencyAmount / rate;
    return (usd / BELLY_TO_USD).toFixed(0);
  };

  useEffect(() => {
    if (isBerriesInput) {
      const value = parseFloat(berries);
      if (!isNaN(value)) {
        setCurrencyValue(convertBerriesToCurrency(value));
      } else {
        setCurrencyValue("");
      }
    }
  }, [berries, selectedCurrency]);

  useEffect(() => {
    if (!isBerriesInput) {
      const value = parseFloat(currencyValue);
      if (!isNaN(value)) {
        setBerries(convertCurrencyToBerries(value));
      } else {
        setBerries("");
      }
    }
  }, [currencyValue, selectedCurrency]);

  const handleSwap = () => {
    const tempBerries = berries;
    const tempCurrency = currencyValue;
    setBerries(tempCurrency);
    setCurrencyValue(tempBerries);
    setIsBerriesInput(!isBerriesInput);
  };

  return {
    berries,
    currencyValue,
    selectedCurrency,
    isBerriesInput,
    setBerries,
    setCurrencyValue,
    setSelectedCurrency,
    setIsBerriesInput,
    handleSwap,
  };
}
