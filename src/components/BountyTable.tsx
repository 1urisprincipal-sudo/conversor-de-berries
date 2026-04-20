import { useEffect, useState } from "react";

interface Bounty {
  name: string;
  bounty: number;
}

const strawHatCrew: Bounty[] = [
  { name: "Monkey D. Luffy", bounty: 3_000_000_000 },
  { name: "Roronoa Zoro", bounty: 1_111_000_000 },
  { name: "Nami", bounty: 366_000_000 },
  { name: "Usopp", bounty: 500_000_000 },
  { name: "Sanji", bounty: 1_032_000_000 },
  { name: "Tony Tony Chopper", bounty: 1_000 },
  { name: "Nico Robin", bounty: 930_000_000 },
  { name: "Franky", bounty: 394_000_000 },
  { name: "Brook", bounty: 383_000_000 },
  { name: "Jinbe", bounty: 1_100_000_000 },
];

interface BountyTableProps {
  selectedCurrency: string;
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  BRL: "R$",
  EUR: "€",
  JPY: "¥",
};

const EXCHANGE_RATES: Record<string, number> = {
  USD: 1,
  BRL: 5.25,
  EUR: 0.92,
  JPY: 150.5,
};

const BELLY_TO_USD = 0.01;

export default function BountyTable({ selectedCurrency }: BountyTableProps) {
  const [convertedBounties, setConvertedBounties] = useState<number[]>(
    new Array(strawHatCrew.length).fill(0)
  );

  useEffect(() => {
    const rate = EXCHANGE_RATES[selectedCurrency];
    const converted = strawHatCrew.map((member) => {
      const usd = member.bounty * BELLY_TO_USD;
      return usd * rate;
    });
    setConvertedBounties(converted);
  }, [selectedCurrency]);

  const formatBounty = (value: number) => {
    if (value >= 1_000_000_000) {
      return (value / 1_000_000_000).toFixed(2) + " B";
    } else if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(2) + " M";
    }
    return value.toLocaleString();
  };

  const formatCurrency = (value: number | undefined) => {
    if (value === undefined || isNaN(value)) return "0.00";
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="mt-12 w-full max-w-4xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-yellow-400 drop-shadow-lg font-pirata">
        ⚔️ Straw Hat Crew Bounties ⚔️
      </h2>
      <div className="bg-zinc-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-yellow-600/30">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-yellow-600/50">
              <tr>
                <th className="py-3 px-4 text-yellow-300 font-bold">Pirate</th>
                <th className="py-3 px-4 text-yellow-300 font-bold">Bounty (Bellies)</th>
                <th className="py-3 px-4 text-yellow-300 font-bold">
                  Value in {selectedCurrency}
                </th>
              </tr>
            </thead>
            <tbody>
              {strawHatCrew.map((member, index) => (
                <tr key={member.name} className="border-b border-zinc-700 hover:bg-zinc-700/50 transition">
                  <td className="py-3 px-4 font-medium text-white">{member.name}</td>
                  <td className="py-3 px-4 font-mono text-yellow-200">
                    {formatBounty(member.bounty)} 🍇
                  </td>
                  <td className="py-3 px-4 font-mono text-emerald-300">
                    {CURRENCY_SYMBOLS[selectedCurrency]} {formatCurrency(convertedBounties[index])}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-400 mt-4 text-center">
          * Fixed exchange rates for demonstration
        </p>
      </div>
    </div>
  );
}
