export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-4xl">
      <h1 className="text-5xl font-serif font-bold text-center mb-12 text-[var(--accent)]">
        Our Story
      </h1>

      <div className="prose prose-lg text-gray-700">
        <p>
          HandloomVilla is a family-owned business in Singapore dedicated to bringing 
          authentic handwoven textiles from India to you.
        </p>
        <p>
          Every piece is carefully handpicked from skilled artisans who have preserved 
          traditional weaving techniques for generations. From luxurious Banarasi silk 
          sarees to everyday comfortable cotton kurtis — each item tells a story of craftsmanship.
        </p>
        <p>
          Founded by my brother with a passion for preserving Indian heritage while 
          making it accessible in Singapore.
        </p>
      </div>

      <div className="mt-16 text-center">
        <p className="text-2xl font-serif text-[var(--accent)]">
          "Wear the tradition. Feel the love."
        </p>
      </div>
    </div>
  );
}