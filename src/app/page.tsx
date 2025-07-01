import Contact from "@/features/Contact/Contact";
import Hero from "@/features/Hero/Hero";


export default function Home() {
  return (
    <div className="l-page">
      <div className="l-page__inner">
        <Hero />

        <Contact />
      </div>
    </div>
  );
}

