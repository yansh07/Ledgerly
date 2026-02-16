import "./App.css";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Features from "./components/Features";
import Tech from "./components/Tech";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        <Navbar />
        <HeroSection />
        <Features />
        <Tech />
        <Footer />
      </div>
    </div>
  );
}

export default App;
