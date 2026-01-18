// src/components/hero/styles.ts

export const styles = {
  layout: {
    wrapper: "relative w-full min-h-screen flex flex-col items-center justify-center bg-[#05050A] overflow-hidden selection:bg-green-500/30",
    container: "relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center text-center",
    bgGlow: "absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none",
    stars: "absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay",
  },
  
  text: {
    h1: "text-4xl md:text-6xl lg:text-6xl font-bold tracking-tight text-white mb-8 leading-[1.1]",
    p: "text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10",
    
    
    // Footer do botão de pay
    footer: "mt-6 text-sm text-gray-500 font-medium tracking-wide select-none",
  },

  button: {
    base: "group relative px-8 py-4 rounded-full border border-[#00D959] text-[#00D959] font-bold text-sm md:text-base uppercase tracking-widest transition-all duration-300 hover:bg-[#00D959] hover:text-black hover:shadow-[0_0_20px_rgba(0,217,89,0.4)] active:scale-95",
    loading: "opacity-70 cursor-wait",
  }
};