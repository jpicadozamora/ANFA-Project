export default function Hero() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />

      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 25% 40%, white 0%, transparent 50%), radial-gradient(circle at 75% 60%, white 0%, transparent 50%)'
        }}
      />

      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }} />

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />

      <div className="relative z-10 text-center max-w-4xl px-6 pt-20 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs tracking-[0.2em] uppercase mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
          Construcción & Bienes Raíces
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.05] mb-6 tracking-tight font-light animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Construimos
          <br />
          tu <span className="font-bold">futuro</span>
        </h1>

        <p className="text-white/40 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-light animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          Transformamos espacios en hogares y proyectos en realidades. Calidad, confianza y excelencia en cada obra.
        </p>

        <div className="flex gap-4 justify-center flex-wrap animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <button
            onClick={() => scrollTo('#portfolio')}
            className="px-8 py-3.5 rounded-xl bg-white text-black font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-white/10 hover:-translate-y-0.5"
          >
            Ver Portafolio
          </button>
          <button
            onClick={() => scrollTo('#contact')}
            className="px-8 py-3.5 rounded-xl border border-white/20 text-white/80 font-semibold transition-all duration-300 hover:bg-white/5 hover:border-white/40 hover:-translate-y-0.5"
          >
            Contáctanos
          </button>
        </div>
      </div>
    </section>
  )
}
