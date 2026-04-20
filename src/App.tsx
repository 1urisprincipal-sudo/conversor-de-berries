import ConverterPanel from "./components/ConverterPanel";
import BountyTable from "./components/BountyTable";
import { useConverter } from "./hooks/useConverter";

export default function App() {
  const { selectedCurrency } = useConverter();

  return (
    <div className="min-h-screen bg-zinc-900 py-8">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500 mb-6 px-4">
        Belly Converter – One Piece Edition
      </h1>
      <ConverterPanel />
      <BountyTable selectedCurrency={selectedCurrency} />
    </div>
  );
}
