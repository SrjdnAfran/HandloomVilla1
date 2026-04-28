import { ChevronRight, Zap } from 'lucide-react';

const processSteps = [
  {
    step: '01',
    title: 'Premium Yarn',
    desc: 'Only the finest yarn is chosen for durability, comfort, and elegance.',
    icon: '🧵',
    color: 'from-blue-500 to-blue-600',
  },
  {
    step: '02',
    title: 'Natural Dyeing',
    desc: 'Carefully dyed using natural techniques for vibrant, long-lasting colors.',
    icon: '🎨',
    color: 'from-purple-500 to-purple-600',
  },
  {
    step: '03',
    title: 'Traditional Weaving',
    desc: 'Skilled artisans weave intricate patterns on hand-operated looms.',
    icon: '🪢',
    color: 'from-amber-500 to-amber-600',
  },
  {
    step: '04',
    title: 'Quality Inspection',
    desc: 'Thorough checks ensure perfection in design, texture, and finish.',
    icon: '✅',
    color: 'from-green-500 to-green-600',
  },
  {
    step: '05',
    title: 'Artisan Finishing',
    desc: 'Prepared with care before reaching our valued customers.',
    icon: '✨',
    color: 'from-pink-500 to-pink-600',
  },
];

export default function ProcessTimeline() {
  return (
    <section className="container mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="mb-16 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2">
          <Zap className="h-4 w-4 text-amber-600" />
          <span className="text-sm font-medium tracking-wide text-amber-700 uppercase">
            From Thread to Treasure
          </span>
        </div>
        <h2 className="font-serif text-3xl font-bold text-[#8B4513] md:text-4xl lg:text-5xl">
          The Journey of a Handloom Product
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-5">
        {processSteps.map((item, index) => (
          <div key={index} className="group relative">
            <div className="relative rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div
                className={`absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r ${item.color} px-4 py-1 text-xs font-bold text-white shadow-lg`}
              >
                {item.step}
              </div>
              <div className="mt-6 mb-4 text-5xl transition-transform group-hover:scale-110">
                {item.icon}
              </div>
              <h3 className="mb-2 font-serif text-lg font-bold text-[#8B4513]">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
            {index < 4 && (
              <div className="absolute top-1/2 -right-4 hidden -translate-y-1/2 text-[#8B4513]/30 md:block">
                <ChevronRight className="h-6 w-6" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
