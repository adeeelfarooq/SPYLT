import React from 'react'
import Flavourtitle from '../components/Flavourtitle'
import Flavourslider from '../components/Flavourslider'

const FlavourSection = () => {
  return (
    <section id='flavor-section' className='flavor-section relative'>
        
        {/* SVG Filter: Yeh katron ko button k sath smoothly blend karega */}
        <svg className="absolute w-0 h-0">
            <filter id="gooey-drips">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="gooey-drips" />
            </filter>
        </svg>

        {/* AAPKA BUTTON - Hover par exact pic jaisa Left-to-Right Drip Effect */}
        <div className="absolute  z-[200000] scale-[0.8] max-md:bottom-[-120%] max-md:left-[25%] left-[50%] md:-translate-x-1/2 top-[89%] group cursor-pointer">
            <a href="#" className="relative inline-flex items-center justify-center py-5 px-[72px]">
                
                {/* Gooey Container (Ispe filter apply hua hai) */}
                <div 
                    className="absolute inset-0 pointer-events-none" 
                    style={{ filter: "url(#gooey-drips)" }}
                >
                    {/* Main Button Background */}
                    <div className="absolute inset-0 bg-light-brown rounded-full"></div>
                    
                    {/* KATRY (Drops) - Exact Spylt size aur Left-to-Right Delay k sath */}
                    
                    {/* Drip 1: Leftmost (Medium length, pehlay girega) */}
                     <div className="absolute w-3 h-15 bg-light-brown rounded-full left-[25%] bottom-0 transition-transform duration-300 ease-in-out group-hover:translate-y-[36px] delay-[225ms]"></div>
                    
                    {/* Drip 2: Mid-Left (Sub se lamba, Drip 1 k baad girega) */}
                    <div className="absolute w-4 h-6 bg-light-brown rounded-full left-[42%] bottom-0 transition-transform duration-300 ease-in-out group-hover:translate-y-[18px] delay-[150ms]"></div>
                    
                    {/* Drip 3: Mid-Right (Sub se chhota aur patla) */}
                    <div className="absolute w-2 h-9 bg-light-brown rounded-full left-[60%] bottom-0 transition-transform duration-300 ease-in-out group-hover:translate-y-[24px] delay-[75ms]"></div>
                    
                    {/* Drip 4: Rightmost (Medium length, aakhir mein girega) */}
                    <div className="absolute w-2 h-5 bg-light-brown rounded-full left-[75%] bottom-0 transition-transform duration-300 ease-in-out group-hover:translate-y-[15px] delay-0"></div>
                </div>

                {/* Main Text (Yeh filter se bahar hai taaky text blur na ho) */}
                <span className="relative z-10 text-dark-brown font-extrabold uppercase tracking-wide">
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