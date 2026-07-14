import { useState, useEffect, useRef } from "react";

import logoGR from "../../assets/logocorreta.png";
import salaoObraImg from "../../assets/salaoOBRA.jpeg";
import construcaoImg from "../../assets/construcao.jpg";  
import fechamentoImg from "../../assets/fechamento.jpg"; 

import antes1 from "../../assets/antes1.jpeg";
import antes2 from "../../assets/antes2.jpeg";
import depois1 from "../../assets/depois1.jpeg";
import depois2 from "../../assets/depois2.jpeg";

import servico1 from "../../assets/servico1.jpg";
import servico2 from "../../assets/servico2.jpg";
import servico3 from "../../assets/servico3.jpg";
import servico4 from "../../assets/servico4.jpg";

import miniServico1 from "../../assets/servico1.jpg"; 
import miniServico2 from "../../assets/servico2.jpg";
import miniServico3 from "../../assets/servico3.jpg";
import miniServico4 from "../../assets/servico4.jpg";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [formStatus, setFormStatus] = useState(""); // "", "loading", "success", "error"

  const carouselRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const slides = [
    {
      id: "1/3",
      bgImage: salaoObraImg,
      title: <>ESTRUTURA DE <br /><span className="text-gr-gold">ALTA COSTURA.®</span></>,
      description: "Salão de Beleza Premium — Fachada comercial moderna integrando a sofisticação do ripado de alumínio amadeirado à segurança e amplitude dos vidros fixos de 6mm temperados."
    },
    {
      id: "2/3",
      bgImage: construcaoImg, 
      title: <>FLUIDEZ EM <br /><span className="text-gr-gold">GRANDE ESCALA.®</span></>,
      description: "Residência Alphaville — Arquitetura residencial moderna integrando a fluidez do sistema linear de portas de correr à leveza e máxima abertura de vão livre com vidros temperados."
    },
    {
      id: "3/3",
      bgImage: fechamentoImg, 
      title: <>GEOMETRIA <br /><span className="text-gr-gold">MINIMALISTA.®</span></>,
      description: "Fechamento — Espaço corporativo minimalista integrando a estética industrial da caixilharia em alumínio preto fosco à segurança e isolamento acústico dos vidros laminados."
    }
  ];

  const services = [
    { id: 1, img: servico1, alt: "Serviço 1" },
    { id: 2, img: servico2, alt: "Serviço 2" },
    { id: 3, img: servico3, alt: "Serviço 3" },
    { id: 4, img: servico4, alt: "Serviço 4" }
  ];

  const otherServices = [
    {
      number: "001",
      title: "Esquadrias de alumínio",
      img: miniServico1,
      bgColor: "bg-[#EDEDED]",
      textColor: "text-black"
    },
    {
      number: "002",
      title: "Engenharia em Vidros Temperados e Laminados",
      img: miniServico2,
      bgColor: "bg-[#C4C4C4]",
      textColor: "text-black"
    },
    {
      number: "003",
      title: "Coberturas Termoacústicas",
      img: miniServico3,
      bgColor: "bg-[#9E9E9E]",
      textColor: "text-black"
    },
    {
      number: "004",
      title: "Estruturas e Projetos Especiais",
      img: miniServico4,
      bgColor: "bg-[#757575]",
      textColor: "text-black"
    }
  ];

  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.bgImage;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeft.current = carouselRef.current.scrollLeft;
  };

  const handleMouseLeaveOrUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; 
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("loading");

    const formData = new FormData(e.target);
    formData.append("access_key", "2e745cdf-1433-48e4-8dec-ae1ef15efa9c"); 
    formData.append("subject", "Novo Orçamento - GR Esquadrias");
    formData.append("from_name", "Site GR Esquadrias");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setFormStatus("success");
        e.target.reset();
        // A MENSAGEM SOME APÓS 5 SEGUNDOS
        setTimeout(() => setFormStatus(""), 5000);
      } else {
        setFormStatus("error");
        // O ERRO TAMBÉM SOME APÓS 5 SEGUNDOS
        setTimeout(() => setFormStatus(""), 5000);
      }
    } catch (error) {
      setFormStatus("error");
      setTimeout(() => setFormStatus(""), 5000);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gr-dark text-white font-inter overflow-x-hidden">
      
      <header className="fixed top-0 left-0 w-full h-24 z-50 bg-white/5 backdrop-blur-md border-b border-white/10 px-6 md:px-16">
        <div className="max-w-7xl h-full mx-auto flex items-center justify-between">
          
          <a href="#home" className="flex items-center focus:outline-none">
            <img 
              src={logoGR} 
              alt="Logo GR Esquadrias" 
              className="w-24 h-18 object-contain"
            />
          </a>

          <nav className="hidden md:flex items-center gap-12 text-sm font-semibold tracking-widest text-black">
            <a href="#home" className="hover:text-gr-gold transition-colors duration-200">INÍCIO</a>
            <a href="#about" className="hover:text-gr-gold transition-colors duration-200">SOBRE</a>
            <a href="#services" className="hover:text-gr-gold transition-colors duration-200">SERVIÇOS</a>
            <a href="#our-work" className="hover:text-gr-gold transition-colors duration-200">PROJETOS</a>
          </nav>

          <div className="hidden md:block">
            <a 
              href="https://wa.me/5511943977964?text=Ol%C3%A1%20preciso%20de%20um%20or%C3%A7amento" 
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-black text-[#FBF8F3] font-bold text-base tracking-wider pl-5 pr-3 py-2 rounded-lg shadow-md hover:bg-[#042D22] hover:text-white transition-all duration-300"
            >
              CONTATO
              <div className="w-8 h-8 bg-[#FBF8F3] text-black group-hover:bg-[#E6FF55] group-hover:text-[#042D22] rounded-md flex items-center justify-center transition-all duration-300">
                <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </a>
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="block md:hidden text-black focus:outline-none"
            aria-label="Menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

        </div>

        {isMenuOpen && (
          <div className="absolute top-24 left-0 w-full bg-gr-dark/95 backdrop-blur-lg border-b border-white/10 px-6 py-8 flex flex-col gap-6 md:hidden">
            <nav className="flex flex-col gap-5 text-base font-medium tracking-wide text-white">
              <a href="#home" onClick={() => setIsMenuOpen(false)} className="hover:text-gr-gold transition">INÍCIO</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-gr-gold transition">SOBRE</a>
              <a href="#services" onClick={() => setIsMenuOpen(false)} className="hover:text-gr-gold transition">SERVIÇOS</a>
              <a href="#our-work" onClick={() => setIsMenuOpen(false)} className="hover:text-gr-gold transition">PROJETOS</a>
            </nav>
            <a 
              href="https://wa.me/5511943977964?text=Ol%C3%A1%20preciso%20de%20um%20or%C3%A7amento"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-center bg-white text-gr-dark font-bold text-sm py-3 rounded-lg block"
            >
              SOLICITAR ORÇAMENTO
            </a>
          </div>
        )}
      </header>

      <section id="home" className="relative w-full min-h-screen flex items-end bg-gr-dark pt-32 pb-20 px-6 md:px-16 overflow-hidden">  
        
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-[800ms] ease-in-out z-0 ${
              index === currentSlide 
                ? "opacity-100 translate-x-0" 
                : index < currentSlide 
                  ? "opacity-0 -translate-x-full" 
                  : "opacity-0 translate-x-full"
            }`}
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          />
        ))}

        <div className="absolute inset-0 bg-black/60 z-10" />

        <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          
          <div 
            key={`title-${currentSlide}`} 
            className="max-w-2xl transition-all duration-500 md:-translate-y-16"
          >
            <h1 className="font-cinzel text-4xl md:text-6xl text-white font-normal leading-tight tracking-wide">
              {slides[currentSlide].title}
            </h1>
            <p className="font-inter text-base md:text-lg text-gray-400 mt-4 tracking-wider">
              — Soluções sob medida
            </p>
          </div>

          <div className="max-w-xs md:text-right flex flex-col md:items-end gap-4">
            <p key={`desc-${currentSlide}`} className="font-inter text-sm text-white/80 leading-relaxed min-h-[80px]">
              {slides[currentSlide].description}
            </p>
            
            <div className="flex items-center gap-4 mt-2">
              <span className="text-xs font-semibold tracking-widest text-white/80 min-w-[28px]">
                {slides[currentSlide].id}
              </span>

              <div className="flex items-center gap-2">
                {slides.map((_, index) => (
                  <div 
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className="relative w-16 md:w-24 h-[2px] bg-white/20 cursor-pointer overflow-hidden"
                  >
                    {currentSlide === index && (
                      <div 
                        key={`bar-${currentSlide}`} 
                        className="absolute top-0 left-0 h-full bg-white"
                        style={{
                          animation: "load 5s linear forwards",
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      <section id="about" className="w-full min-h-screen py-24 px-6 md:px-16 bg-gr-sand text-gr-dark flex items-center">
        <div className="max-w-7xl mx-auto w-full flex flex-col">
          
          <div className="mb-12">
            <h2 className="font-inter text-3xl md:text-4xl font-bold text-gray-500 tracking-tight">
              Serralheria Fina e Engenharia de Esquadrias.
            </h2>
            <p className="font-inter text-xl md:text-2xl text-slate-600 mt-4 tracking-tight">
              Soluções sob medida em alumínio e vidro para projetos de alto padrão.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-2xl aspect-square shadow-sm transform transition-transform duration-[300ms] ease-out hover:scale-105 cursor-pointer">
                <img 
                  src={antes1} 
                  alt="Estrutura Fase 1" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-2xl aspect-square shadow-sm transform transition-transform duration-[300ms] ease-out hover:scale-105 cursor-pointer">
                <img 
                  src={antes2} 
                  alt="Estrutura Fase 2" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-2xl aspect-square shadow-sm transform transition-transform duration-[300ms] ease-out hover:scale-105 cursor-pointer">
                <img 
                  src={depois1} 
                  alt="Estrutura Finalizada 1" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-2xl aspect-square shadow-sm transform transition-transform duration-[300ms] ease-out hover:scale-105 cursor-pointer">
                <img 
                  src={depois2} 
                  alt="Estrutura Finalizada 2" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-start pt-2">
              <div className="font-inter text-sm md:text-base text-slate-600 leading-relaxed font-semibold space-y-6">
                <p>
                  Desenvolvemos soluções completas e totalmente sob medida para projetos que exigem o máximo em precisão e acabamento. Especializados em serralheria de alumínio e vidro no geral — desde esquadrias minimalistas a grandes fachadas —, atuamos também com a instalação de coberturas em telha sanduíche de alta performance, garantindo conforto térmico, isolamento acústico e durabilidade cirúrgica para cada estrutura.
                </p>
                
                <div className={`transition-all duration-500 overflow-hidden space-y-6 ${
                  isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                }`}>
                  <p>
                    Nosso diferencial está na integração total entre o projeto arquitetônico e a execução fabril. Trabalhamos em estreita colaboração com escritórios de arquitetura e engenharia, transformando conceitos complexos em soluções estruturais viáveis, seguras e com estética minimalista.
                  </p>
                  <p>
                    Utilizamos ligas de alumínio certificado e sistemas de fixação ocultos, o que garante lines visuais limpas e maior resistência mecânica às intempéries. Seja na especificação de vidros com controle solar para grandes fachadas ou no cálculo estrutural para coberturas térmicas, cada etapa é submetida a um rigoroso controle de qualidade, assegurando uma instalação ágil na obra e um desempenho estético impecável por décadas.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-8 font-inter text-base font-bold tracking-wider text-black hover:text-gray-600 transition-colors duration-200 uppercase self-start"
              >
                {isExpanded ? "LER MENOS" : "LER MAIS"}
              </button>
            </div>

          </div>

        </div>
      </section>

      <section id="services" className="w-full py-24 px-6 md:px-16 bg-[#F9F9F6] text-gr-dark flex items-center border-t border-gray-200/30">
        <div className="max-w-7xl mx-auto w-full flex flex-col">
          
          <div className="mb-12">
            <h2 className="font-inter text-3xl md:text-4xl font-bold text-black tracking-tight">
              Soluções Sob Medida para Cada Projeto
            </h2>
            <p className="font-inter text-xl md:text-2xl text-slate-500 mt-4 tracking-tight">
              Projetos autorais executados com precisão cirúrgica
            </p>
          </div>

          <div 
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeaveOrUp}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseMove={handleMouseMove}
            className="w-full overflow-x-auto flex gap-6 pb-6 select-none cursor-grab active:cursor-grabbing scroll-smooth scrollbar-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {services.map((service) => (
              <div 
                key={service.id}
                className="w-[280px] md:w-[380px] h-[350px] md:h-[480px] overflow-hidden rounded-2xl shadow-sm snap-start flex-shrink-0 pointer-events-none"
              >
                <img 
                  src={service.img} 
                  alt={service.alt} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="w-full pt-24 bg-gr-dark text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          
          <div className="mb-16">
            <h2 className="font-inter text-3xl md:text-4xl font-bold text-white tracking-tight">
              Além da Estrutura
            </h2>
            <p className="font-inter text-xl md:text-2xl text-gr-gold mt-2 tracking-tight">
              — O rigor da engenharia moldado para o alto padrão
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start relative z-10 pb-32">
            
            <div className="flex flex-col gap-4">
              <h3 className="font-inter text-2xl font-bold text-white tracking-tight">
                Alumínio Certificado
              </h3>
              <p className="font-inter text-sm md:text-base text-gray-400 leading-relaxed font-medium">
                Utilização de ligas de alta performance com acabamento anodizado ou amadeirado de altíssima durabilidade.
              </p>
            </div>

            <div className="flex flex-col gap-4 md:border-l md:border-white/10 md:pl-8">
              <h3 className="font-inter text-2xl font-bold text-white tracking-tight">
                Acabamento Cirúrgico
              </h3>
              <p className="font-inter text-sm md:text-base text-gray-400 leading-relaxed font-medium">
                Alinhamento rigoroso e fixações discretas que mantêm o visual minimalista e a solidez da estrutura.
              </p>
            </div>

            <div className="flex flex-col gap-4 md:border-l md:border-white/10 md:pl-8">
              <h3 className="font-inter text-2xl font-bold text-white tracking-tight">
                Vedação Termoacústica
              </h3>
              <p className="font-inter text-sm md:text-base text-gray-400 leading-relaxed font-medium">
                Sistemas de esquadrias projetados milimetricamente para o controle eficiente de ruídos externos e temperatura.
              </p>
            </div>

          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] bg-[#F9F9F6]">
          <svg 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none" 
            className="relative block w-full h-[120px] text-gr-dark fill-current"
          >
            <path d="M0,0 C150,90 350,120 600,100 C850,80 1050,110 1200,120 L1200,0 L0,0 Z" className="opacity-20"></path>
            <path d="M0,0 C200,60 400,110 700,80 C1000,50 1100,100 1200,120 L1200,0 L0,0 Z" className="opacity-40"></path>
            <path d="M0,0 C300,30 600,90 900,40 C1100,10 1150,60 1200,120 L1200,0 L0,0 Z"></path>
          </svg>
        </div>
      </section>

      <section id="our-work" className="w-full py-24 px-6 md:px-16 bg-white text-black flex items-center">
        <div className="max-w-7xl mx-auto w-full flex flex-col">
          
          <div className="mb-12">
            <h2 className="font-inter text-3xl md:text-4xl font-bold text-black tracking-tight">
              Outros serviços
            </h2>
          </div>

          <div className="w-full flex flex-col rounded-3xl overflow-hidden shadow-sm">
            {otherServices.map((service, index) => (
              <div 
                key={index}
                className={`w-full flex items-center justify-between p-6 md:p-8 transition-all duration-300 ${service.bgColor} ${service.textColor}`}
              >
                <div className="flex items-center gap-6 md:gap-12">
                  <span className="font-inter text-sm md:text-base font-bold opacity-60">
                    {service.number}
                  </span>
                  <h3 className="font-inter text-lg md:text-2xl font-semibold tracking-tight">
                    {service.title}
                  </h3>
                </div>

                <div className="w-24 md:w-44 aspect-[16/9] rounded-xl overflow-hidden shadow-md flex-shrink-0">
                  <img 
                    src={service.img} 
                    alt={service.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section id="contato" className="w-full bg-gr-dark text-white pt-24 pb-32 px-6 md:px-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180 bg-white">
          <svg 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none" 
            className="relative block w-full h-[120px] text-gr-dark fill-current"
          >
            <path d="M0,0 C150,90 350,120 600,100 C850,80 1050,110 1200,120 L1200,0 L0,0 Z" className="opacity-45"></path>
            <path d="M0,0 C200,60 400,110 700,80 C1000,50 1100,100 1200,120 L1200,0 L0,0 Z" className="opacity-20"></path>
            <path d="M0,0 C300,30 600,90 900,40 C1100,10 1150,60 1200,120 L1200,0 L0,0 Z"></path>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start relative z-10 mt-20">
          
          <div className="flex flex-col w-full">
            <h2 className="font-inter text-3xl md:text-4xl font-bold tracking-tight mb-8">
              SOLICITE UM ORÇAMENTO
            </h2>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-5 w-full">
              <input 
                type="text" 
                name="name" 
                placeholder="Nome" 
                required
                className="w-full p-4 bg-white text-black placeholder-gray-400 font-inter text-base rounded-md focus:outline-none focus:ring-2 focus:ring-gr-gold transition"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email" 
                  required
                  className="w-full p-4 bg-white text-black placeholder-gray-400 font-inter text-base rounded-md focus:outline-none focus:ring-2 focus:ring-gr-gold transition"
                />
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="Phone" 
                  required
                  className="w-full p-4 bg-white text-black placeholder-gray-400 font-inter text-base rounded-md focus:outline-none focus:ring-2 focus:ring-gr-gold transition"
                />
              </div>

              <textarea 
                name="message" 
                placeholder="Mensagem" 
                rows="6" 
                required
                className="w-full p-4 bg-white text-black placeholder-gray-400 font-inter text-base rounded-md focus:outline-none focus:ring-2 focus:ring-gr-gold transition resize-none"
              />

              <button 
                type="submit" 
                disabled={formStatus === "loading"}
                className="self-start px-12 py-3 bg-[#1D4ED8] hover:bg-[#1E40AF] disabled:bg-blue-300 text-white font-inter font-bold text-sm uppercase rounded shadow-md transition duration-200"
              >
                {formStatus === "loading" ? "ENVIANDO..." : "ENVIAR"}
              </button>

              {formStatus === "success" && (
                <p className="text-green-400 font-semibold text-sm mt-2">
                  Orçamento enviado com sucesso! Entraremos em contato em breve.
                </p>
              )}
              {formStatus === "error" && (
                <p className="text-red-400 font-semibold text-sm mt-2">
                  Ocorreu um erro ao enviar. Por favor, tente novamente mais tarde.
                </p>
              )}
            </form>
          </div>

          <div className="flex flex-col w-full">
            <h2 className="font-inter text-3xl md:text-4xl font-bold tracking-tight mb-8">
              ENCONTRE-NOS
            </h2>

            <div className="w-full h-[370px] bg-gray-300 rounded-2xl overflow-hidden shadow-lg border-4 border-white/5">
              <iframe 
                title="Localização GR Esquadrias"
                src="https://maps.google.com/maps?q=Rua%20Augusta%20Magalh%C3%A3es%2C%2087%20-%20Vila%20%C3%81gua%20Funda%2C%20S%C3%A3o%20Paulo%20-%20SP&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </section>

      <footer className="w-full bg-gr-dark text-gray-400 pt-16 pb-12 px-6 md:px-16 border-t border-white/10 font-inter">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 items-start">
            
            <div className="flex flex-col gap-4">
              <img 
                src={logoGR} 
                alt="Logo GR Esquadrias" 
                className="w-28 h-20 object-contain self-start"
              />
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-white text-lg font-bold tracking-tight">Links</h3>
              <nav className="flex flex-col gap-3 text-sm font-semibold text-gray-400">
                <a href="#home" className="hover:text-white transition-colors duration-200">Início</a>
                <a href="#about" className="hover:text-white transition-colors duration-200">Sobre</a>
                <a href="#services" className="hover:text-white transition-colors duration-200">Serviços</a>
                <a href="#our-work" className="hover:text-white transition-colors duration-200">Projetos</a>
              </nav>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-white text-lg font-bold tracking-tight">Contato</h3>
              <div className="flex flex-col gap-3 text-sm font-semibold text-gray-400">
                <a href="mailto:luizgrsantos747@gmail.com" className="hover:text-white transition-colors duration-200">
                  luizgrsantos747@gmail.com
                </a>
                <a href="https://wa.me/5511943977964" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
                  +55 (11) 94397-7964
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-white text-lg font-bold tracking-tight">Sociais</h3>
              <div className="flex flex-col gap-3 text-sm font-semibold text-gray-400">
                <a 
                  href="https://www.instagram.com/gresquadrias" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors duration-200"
                >
                  Instagram
                </a>
              </div>
            </div>

          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs text-gray-500 font-medium border-t border-white/5 pt-8">
            <p>
              © {new Date().getFullYear()} GR Esquadrias. Todos os direitos reservados.
            </p>
            <p>
              Desenvolvido com precisão e engenharia.
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}