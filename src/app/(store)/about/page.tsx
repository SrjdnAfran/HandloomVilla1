'use client';

import AboutHero from '@/components/about/AboutHero';
import HeritageSection from '@/components/about/HeritageSection';
import LegacySection from '@/components/about/LegacySection';
import ProcessTimeline from '@/components/about/ProcessTimeline';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import VisionMission from '@/components/about/VisionMission';
import StatsSection from '@/components/ui/StatsSection';
import AboutCTA from '@/components/about/AboutCTA';

const aboutStats = [
  { value: 100, suffix: '+', label: 'Skilled Artisans', iconName: 'Users' as const },
  { value: 50000, suffix: '+', label: 'Happy Customers', iconName: 'Heart' as const },
  { value: 1924, label: 'Year Established', iconName: 'Clock' as const, isYear: true },
  { value: 30, suffix: '+', label: 'Countries Served', iconName: 'Globe' as const },
];

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden bg-gradient-to-b from-white via-amber-50/30 to-white">
      <AboutHero />
      <HeritageSection />
      <LegacySection />
      <ProcessTimeline />
      <WhyChooseUs />
      <VisionMission />

      <StatsSection
        stats={aboutStats}
        title="Our Milestones"
        subtitle="A century of excellence in handloom craftsmanship"
      />

      <AboutCTA />
    </div>
  );
}
