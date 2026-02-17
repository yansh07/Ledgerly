import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import Tech from "../components/Tech";
import Footer from "../components/Footer";

function Landing() {
  return (
    <div className="max-w-4xl mx-auto w-full">
        <Navbar />
        <HeroSection />
        <Features />
        <Tech />
        <Footer />
    </div>
  )
}

export default Landing