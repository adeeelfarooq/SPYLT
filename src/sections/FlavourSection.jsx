import React from 'react'
import Flavourtitle from '../components/Flavourtitle'
import Flavourslider from '../components/Flavourslider'
// GSAP Imports
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ScrollTrigger Register
gsap.registerPlugin(ScrollTrigger);

const FlavourSection = () => {

  // SIRF GSAP LOGIC ADD KI HAI MOBILE KE LIYE
  useGSAP(() => {
    let mm = gsap.matchMedia();

    // Ye block sirf mobile (768px ya chota) par chalega
    mm.add("(max-width: 768px)", () => {
      
      // 1. Button ko start mein exactly viewport ke bottom (85vh) par set karega
      gsap.set(".flavor-btn", {
        position: "relative",
        top: "5vh", // Screen ke bottom par show hone ke liye
        left: "69%",
        scale:"0.8",
        zIndex: 200000
      });

      // 2. Button ko Pin kar dega jab tak section screen par hai
      ScrollTrigger.create({
        trigger: ".flavor-section",
        start: "top top",       // Jab section top se start ho
        end: "bottom bottom",   // Jab section bottom se end ho
        pin: ".flavor-btn",     // Hamary button ko pin kare
        pinSpacing: false,      // Extra space na banaye
      });
    });
  });

  return (
    <section id='flavor-section' className='flavor-section relative'>
        
        {/* SVG Filter: Yeh katron ko button k sath smoothly blend karega */}
        <svg className="absolute w-0 h-0">
            <filter id="gooey-drips">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="gooey-drips" />
            </filter>
        </svg>

        {/* AAPKA BUTTON - Sirf GSAP ke target ke liye 'flavor-btn' class add ki hai. Baqi apka purana code hai */}
        <div className="flavor-btn  md:absolute z-[200000]  md:scale-[0.8] left-[50%] -translate-x-1/2 top-[89%] group cursor-pointer">
            <a href="#" className="relative inline-flex items-center justify-center py-5 px-[72px]">
                
                {/* Gooey Container (Ispe filter apply hua hai) */}
                <div 
                    className="absolute inset-0 pointer-events-none" 
                    style={{ filter: "url(#gooey-drips)" }}
                >
                    {/* Main Button Background */}
                    <div className="absolute inset-0 bg-light-brown rounded-full"></div>
                    
                    {/* KATRY (Drops) - Exact Spylt size aur Left-to-Right Delay k sath */}
                    <div className="absolute w-3 h-15 bg-light-brown rounded-full left-[25%] bottom-0 transition-transform duration-300 ease-in-out group-hover:translate-y-[36px] delay-[225ms]"></div>
                    <div className="absolute w-4 h-6 bg-light-brown rounded-full left-[42%] bottom-0 transition-transform duration-300 ease-in-out group-hover:translate-y-[18px] delay-[150ms]"></div>
                    <div className="absolute w-2 h-9 bg-light-brown rounded-full left-[60%] bottom-0 transition-transform duration-300 ease-in-out group-hover:translate-y-[24px] delay-[75ms]"></div>
                    <div className="absolute w-2 h-5 bg-light-brown rounded-full left-[75%] bottom-0 transition-transform duration-300 ease-in-out group-hover:translate-y-[15px] delay-0"></div>
                </div>

                {/* Main Text (Yeh filter se bahar hai taaky text blur na ho) */}
                <span className="relative z-10 text-dark-brown max-md:text-md max-md:scale-120 font-extrabold uppercase tracking-wide">
                    GET IT NOW 
                </span>
            </a>
        </div>

        {/* Aapka Horizontal Scroll Wala Content */}
        <div className="flavor-container h-full flex lg:flex-row flex-col items-center relative">
            <div className="lg:w-[57%] flex-none h-80 lg:h-full md:mt-20 mt-0">
                <Flavourtitle/>
            </div>
            <div className="h-full">
                <Flavourslider/>
            </div>
        </div>
        
    </section>
  )
}

export default FlavourSection