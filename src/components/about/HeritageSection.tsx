import { Heart } from 'lucide-react';

export default function HeritageSection() {
  return (
    <section className="container mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="animate-in fade-in slide-in-from-left-4 duration-700">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2">
            <Heart className="h-4 w-4 text-[#8B4513]" />
            <span className="text-sm font-medium tracking-wide text-[#8B4513] uppercase">
              The Heart of Eastern Sri Lanka
            </span>
          </div>
          <h2 className="mb-6 font-serif text-3xl font-bold text-[#8B4513] md:text-4xl lg:text-5xl">
            The Heritage of Maruthamunai
          </h2>
          <div className="space-y-4 text-gray-700">
            <p className="leading-relaxed">
              Nestled in the heart of Sri Lanka's Eastern Province, the village of Maruthamunai is
              renowned for its rich heritage in handloom weaving. For generations, this vibrant
              community has preserved and perfected the art of crafting exquisite handloom products.
            </p>
            <p className="leading-relaxed">
              In Maruthamunai, handloom is not merely an occupation — it is a way of life. Almost
              every household is connected to this timeless tradition, and families contribute their
              skills and passion to sustain an industry deeply rooted in culture and craftsmanship.
            </p>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <StatBadge number="100+" label="Skilled Artisans" />
            <StatBadge number="50K+" label="Happy Customers" />
          </div>
        </div>

        <div className="relative">
          <div className="group relative overflow-hidden rounded-2xl shadow-2xl">
            <div className="relative flex h-96 w-full items-center justify-center overflow-hidden bg-linear-to-br from-amber-100 to-amber-50">
              <div className="z-20 text-center">
                <div className="mb-4 animate-bounce text-8xl">🧵</div>
                <span className="font-serif text-2xl font-bold text-[#8B4513]">Maruthamunai</span>
                <p className="mt-2 text-gray-500">The Village of Weavers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatBadge({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-amber-500 to-amber-600">
        <span className="font-bold text-white">{number}</span>
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-semibold text-gray-900">{label.split(' ')[0]}</p>
      </div>
    </div>
  );
}
