import { HeroSection } from "./_components/hero-section";
import { AboutSection } from "./_components/about-section";
import { SkillsSection } from "./_components/skills-section";
import { ContactSection } from "./_components/contact-section";
import { MountainScene } from "./_components/mountain-scene";
import { SectionProgressBar } from "./_components/section-progress-bar";
import styles from "./_components/home.module.css";

export default function HomePage() {
  return (
    <div
      className={`relative -mx-6 -my-6 w-[calc(100%+3rem)] lg:-mb-6 ${styles.pageRoot}`}
    >
      <MountainScene />
      <SectionProgressBar />
      <div className="relative z-10 flex flex-col">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ContactSection />
      </div>
    </div>
  );
}
