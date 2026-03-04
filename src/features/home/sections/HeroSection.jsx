import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import brandConfig from "../../../config/brandConfig";

const SLIDER_PRODUCTS = [
  {
    id: 1,
    title: "Timeless",
    subtitle: "Comfort.",
    description: "Upgrade your everyday style with these classic brown casual sneakers designed for comfort and durability.",
    tag: "Classic Brown",
    image: "/images/shoes/brown-casual.png",
    color: "bg-orange-500/15"
  },
  {
    id: 2,
    title: "Urban",
    subtitle: "Boldness.",
    description: "Make a bold style statement with these modern chunky sneakers featuring a beige and green color combination.",
    tag: "Chunky Aesthetic",
    image: "/images/shoes/beige-green-chunky.png",
    color: "bg-emerald-500/15"
  },
  {
    id: 3,
    title: "Vibrant",
    subtitle: "Energy.",
    description: "Add a fresh pop of color to your wardrobe with these yellow and white casual sneakers featuring breathable mesh.",
    tag: "Pop of Color",
    image: "/images/shoes/yellow-white-casual.png",
    color: "bg-yellow-500/15"
  },
  {
    id: 4,
    title: "Sleek",
    subtitle: "Versatile.",
    description: "Keep it sleek and minimalist with these black low-top casual shoes. Ideal for office casuals and evening outings.",
    tag: "Minimalist Edge",
    image: "/images/shoes/black-low-top.png",
    color: "bg-blue-500/15"
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDER_PRODUCTS.length);
    }, 3000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDER_PRODUCTS.length);
    startTimer();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDER_PRODUCTS.length) % SLIDER_PRODUCTS.length);
    startTimer();
  };

  const product = SLIDER_PRODUCTS[currentSlide];

  return (
    <section className="relative min-h-[85vh] overflow-hidden rounded-[3rem] bg-slate-950 px-6 py-20 text-white shadow-premium sm:px-12 lg:px-20 flex items-center transition-colors duration-1000">
      {/* Ghost Text Background */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
        <h2 className="text-[25vw] font-black leading-none text-ghost opacity-20 tracking-tighter uppercase">
          {product.title}
        </h2>
      </div>

      {/* Decorative Glow Elements */}
      <div className="absolute right-[-10%] top-[-10%] h-[50rem] w-[50rem] rounded-full bg-accent/20 blur-[180px] animate-pulse transition-all duration-1000" />
      <div className={`absolute bottom-[-5%] left-[-5%] h-[40rem] w-[40rem] rounded-full blur-[150px] transition-all duration-1000 ${product.color}`} />
      <div className="absolute top-1/4 left-1/2 h-[30rem] w-[30rem] rounded-full bg-blue-500/5 blur-[120px]" />

      {/* Navigation Arrows */}
      <div className="absolute left-4 top-1/2 z-30 -translate-y-1/2 sm:left-8 lg:left-12">
        <button
          onClick={prevSlide}
          className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all hover:bg-accent hover:border-accent hover:shadow-glow active:scale-90"
          aria-label="Previous slide"
        >
          <svg className="h-6 w-6 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      <div className="absolute right-4 top-1/2 z-30 -translate-y-1/2 sm:right-8 lg:right-12">
        <button
          onClick={nextSlide}
          className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all hover:bg-accent hover:border-accent hover:shadow-glow active:scale-90"
          aria-label="Next slide"
        >
          <svg className="h-6 w-6 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="relative z-10 grid w-full items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="space-y-10 reveal-up">
          <div className="inline-flex items-center space-x-3 rounded-full border border-white/10 bg-white/5 py-2 pl-2 pr-6 backdrop-blur-md">
            <span className="rounded-full bg-accent px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">TRENDING</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-100 transition-opacity duration-500">
              {product.tag}
            </span>
          </div>

          <h1 className="font-display text-6xl font-black leading-none tracking-tighter sm:text-8xl lg:text-[10rem] transition-all duration-500">
            {product.title} <br />
            <span className="text-accent">{product.subtitle}</span>
          </h1>

          <div className="max-w-md space-y-8">
            <p className="text-lg leading-relaxed text-slate-400 min-h-[5rem] transition-opacity duration-500">
              {product.description}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/products" className="group flex items-center justify-center space-x-3 rounded-full bg-accent px-10 py-5 font-black uppercase tracking-widest text-white transition-all hover:bg-accent-dark hover:shadow-glow active:scale-95">
                <span>Shop Now</span>
                <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link to="/admin" className="flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-10 py-5 font-black uppercase tracking-widest text-white backdrop-blur-md transition-all hover:bg-white/10 active:scale-95">
                Vault
              </Link>
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute -left-10 top-20 z-20 h-32 w-32 rounded-3xl bg-accent p-6 shadow-glow transition-transform hover:scale-110 rotate-12">
            <p className="text-xs font-black uppercase leading-tight text-white">Premium Quality</p>
          </div>
          <div className="group relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:bg-white/10">
            <div className="absolute inset-0 flex items-center justify-center opacity-40">
              <p className="text-ghost text-6xl font-black rotate-[-45deg] transition-opacity duration-1000">SOLESYSTEM</p>
            </div>
            <div className="relative z-10 flex h-full w-full items-center justify-center overflow-visible">
              <img
                key={product.image}
                src={product.image}
                alt={product.title}
                className="h-auto w-[90%] max-w-none -rotate-6 transition-all duration-700 hover:scale-110 hover:rotate-0 drop-shadow-[0_20px_60px_rgba(255,87,34,0.4)] animate-in fade-in zoom-in duration-1000"
              />
            </div>

            {/* Reflective shine effect on hover */}
            <div className="absolute inset-0 z-20 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />
          </div>
        </div>
      </div>
      <SlideIndicators current={currentSlide} length={SLIDER_PRODUCTS.length} onSelect={(idx) => { setCurrentSlide(idx); startTimer(); }} />
    </section>
  );
}

{/* Slide Indicators Helper Component */ }
const SlideIndicators = ({ current, length, onSelect }) => (
  <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-3 z-30">
    {Array.from({ length }).map((_, idx) => (
      <button
        key={idx}
        onClick={() => onSelect(idx)}
        className={`h-1.5 transition-all duration-500 rounded-full ${current === idx ? "w-10 bg-accent shadow-glow" : "w-4 bg-white/20 hover:bg-white/40"
          }`}
        aria-label={`Go to slide ${idx + 1}`}
      />
    ))}
  </div>
);
