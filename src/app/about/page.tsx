export default function AboutPage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[var(--accent)]/5 px-6 py-24 text-center md:py-32">
        <div className="relative z-10">
          <span className="mb-4 inline-block font-mono text-sm tracking-[0.3em] text-[var(--accent)]/60 uppercase">
            Est. 1924
          </span>
          <h1 className="mb-6 font-serif text-5xl font-bold tracking-tight text-[var(--accent)] md:text-6xl lg:text-7xl">
            A Legacy Woven with <br /> Tradition & Excellence
          </h1>
          <p className="mx-auto max-w-2xl text-lg font-light text-gray-600 md:text-xl">
            For over a century, we have transformed threads into masterpieces — bringing the soul of
            Maruthamunai's handloom heritage to the world.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent"></div>
      </section>

      {/* Introduction - Maruthamunai Heritage */}
      <section className="container mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <span className="mb-3 block font-mono text-sm tracking-widest text-[var(--accent)]/70 uppercase">
              The Heart of Eastern Sri Lanka
            </span>
            <h2 className="mb-6 font-serif text-3xl font-semibold text-[var(--accent)] md:text-4xl">
              The Heritage of Maruthamunai
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              Nestled in the heart of Sri Lanka's Eastern Province, the village of Maruthamunai is
              renowned for its rich heritage in handloom weaving. For generations, this vibrant
              community has preserved and perfected the art of crafting exquisite handloom products.
            </p>
            <p className="mb-4 leading-relaxed text-gray-700">
              In Maruthamunai, handloom is not merely an occupation — it is a way of life. Almost
              every household is connected to this timeless tradition, and families contribute their
              skills and passion to sustain an industry deeply rooted in culture and craftsmanship.
            </p>
            <p className="leading-relaxed text-gray-700">
              Whether employed elsewhere or not, nearly every family in the village participates in
              the production of handloom textiles. This collective effort ensures that the knowledge
              and techniques of this ancient craft are passed down through generations.
            </p>
          </div>

          <div className="group flex h-96 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)]/10 to-gray-100 shadow-inner transition-all duration-500 hover:shadow-xl">
            <div className="text-center">
              <div className="mb-3 text-7xl">🧵</div>
              <span className="font-serif text-xl text-[var(--accent)]">Maruthamunai</span>
              <p className="mt-2 text-sm text-gray-400">The Village of Weavers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy Since 1924 - Featured Section */}
      <section className="bg-gradient-to-r from-[var(--accent)]/10 via-[var(--accent)]/5 to-[var(--accent)]/10 px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center justify-center rounded-full bg-[var(--accent)]/10 px-6 py-2">
            <span className="font-mono text-sm font-medium tracking-wider text-[var(--accent)] uppercase">
              ✦ A Century of Craftsmanship ✦
            </span>
          </div>
          <h2 className="mb-6 font-serif text-4xl font-semibold text-[var(--accent)] md:text-5xl">
            Our Legacy Since 1924
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-700">
            Handloom Villa is built upon a foundation of experience and trust that spans more than a
            century. Since 1924, our family has actively contributed to the growth and excellence of
            the handloom industry. This legacy has been shaped by generations of skilled craftsmen
            who have devoted their lives to mastering the art of weaving.
          </p>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-700">
            Today, we proudly continue this tradition by blending time-honored techniques with
            modern quality standards. Our mission is to deliver products that embody the spirit of
            Sri Lankan culture while meeting the expectations of contemporary customers around the
            world.
          </p>
        </div>
      </section>

      {/* The Journey - Process Timeline */}
      <section className="container mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="mb-12 text-center">
          <span className="mb-3 block font-mono text-sm tracking-widest text-[var(--accent)]/70 uppercase">
            From Thread to Treasure
          </span>
          <h2 className="font-serif text-3xl font-semibold text-[var(--accent)] md:text-4xl">
            The Journey of a Handloom Product
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Creating a handloom product is a meticulous and collaborative process involving multiple
            stages and skilled individuals. Each piece tells a story of dedication and artistry.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-5">
          {[
            {
              step: '01',
              title: 'Premium Yarn',
              desc: 'Only the finest yarn is chosen for durability, comfort, and elegance.',
            },
            {
              step: '02',
              title: 'Expert Dyeing',
              desc: 'Carefully dyed using refined techniques for vibrant, long-lasting colors.',
            },
            {
              step: '03',
              title: 'Traditional Weaving',
              desc: 'Skilled artisans weave intricate patterns on hand-operated looms.',
            },
            {
              step: '04',
              title: 'Quality Inspection',
              desc: 'Thorough checks ensure perfection in design, texture, and finish.',
            },
            {
              step: '05',
              title: 'Finishing',
              desc: 'Prepared with care before reaching our valued customers.',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="relative rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm transition hover:shadow-md"
            >
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[var(--accent)] px-4 py-1 text-xs font-bold text-white">
                {item.step}
              </span>
              <h3 className="mt-3 mb-2 font-serif text-lg font-semibold text-[var(--accent)]">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
              {index < 4 && (
                <div className="absolute top-1/2 -right-3 hidden -translate-y-1/2 text-[var(--accent)]/40 md:block">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us - 7 Key Points */}
      <section className="bg-gray-50 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-semibold text-[var(--accent)] md:text-4xl">
              Why Choose Handloom Villa?
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: '📜',
                title: 'A Century of Experience',
                desc: 'Heritage dating back to 1924, built on generations of knowledge and craftsmanship.',
              },
              {
                icon: '✨',
                title: 'Premium Quality Yarn',
                desc: 'Only the finest yarn ensures comfort, durability, and a luxurious feel.',
              },
              {
                icon: '🎨',
                title: 'Exceptional Dyeing',
                desc: 'Specialized methods enhance vibrancy and longevity for outstanding results.',
              },
              {
                icon: '✅',
                title: '5-Year Color Guarantee',
                desc: 'We proudly guarantee color quality for up to five years — a testament to our superior process.',
              },
              {
                icon: '🤲',
                title: 'Authentic Handcrafted',
                desc: 'Every item is meticulously handcrafted by skilled artisans.',
              },
              {
                icon: '🤝',
                title: 'Community Empowerment',
                desc: 'Your support sustains the livelihoods of talented artisans in Maruthamunai.',
              },
              {
                icon: '🌿',
                title: 'Timeless Sustainability',
                desc: 'Eco-friendly products that combine tradition with modern style.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 text-4xl">{item.icon}</div>
                <h3 className="mb-3 font-serif text-lg font-semibold text-[var(--accent)]">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="container mx-auto max-w-4xl px-6 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl bg-[var(--accent)]/5 p-8 text-center md:p-10">
            <div className="mb-4 text-4xl">👁️</div>
            <h3 className="mb-4 font-serif text-2xl font-semibold text-[var(--accent)]">
              Our Vision
            </h3>
            <p className="leading-relaxed text-gray-700">
              To preserve and promote the rich heritage of handloom craftsmanship while delivering
              premium-quality products to customers worldwide.
            </p>
          </div>

          <div className="rounded-2xl bg-[var(--accent)]/5 p-8 text-center md:p-10">
            <div className="mb-4 text-4xl">🎯</div>
            <h3 className="mb-4 font-serif text-2xl font-semibold text-[var(--accent)]">
              Our Mission
            </h3>
            <p className="leading-relaxed text-gray-700">
              To empower local artisans, uphold traditional weaving techniques, and provide
              sustainable, high-quality textiles that reflect elegance, durability, and cultural
              pride.
            </p>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="relative overflow-hidden bg-[var(--accent)]/5 px-6 py-24 text-center">
        <h2 className="mb-6 font-serif text-4xl text-[var(--accent)] md:text-5xl">
          Experience the Art of True Craftsmanship
        </h2>
        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-700">
          At Handloom Villa, every thread tells a story, every design reflects heritage, and every
          product embodies excellence. When you choose us, you are not just purchasing a textile —
          you are embracing a legacy of tradition, supporting skilled artisans, and celebrating the
          beauty of authentic Sri Lankan craftsmanship.
        </p>
        <div className="mx-auto mt-8 h-px w-24 bg-[var(--accent)]/30"></div>
        <p className="mt-8 font-serif text-2xl text-[var(--accent)] italic md:text-3xl">
          Handloom Villa — Where Tradition Meets Timeless Elegance.
        </p>
      </section>
    </div>
  );
}
