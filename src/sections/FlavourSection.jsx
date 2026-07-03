import React from 'react'
import Flavourtitle from '../components/Flavourtitle' // Apne path ke hisab se set rakhna
import Flavourslider from '../components/Flavourslider'

const FlavourSection = () => {
  return (
    <section id='flavor-section' className='flavor-section relative overflow-hidden'>
        
        {/* SVG Filter: Performance friendly tarike se render hoga */}
        <svg className="absolute w-0 h-0" style={{ pointerEvents: "none" }}>
            <filter id="gooey-drips">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="gooey-drips" />
            </filter>
        </svg>

        {/* AAPKA BUTTON */}
        <div className="absolute z-[200000] scale-[0.8] max-md:bottom-[-120%] max-md:left-[25%] left-[50%] md:-translate-x-1/2 top-[89%] group cursor-pointer">
            <a href="#" className="relative inline-flex items-center justify-center py-5 px-[72px]">
                
                {/* Gooey Container: GPU Optimization */}
                <div 
                    className="absolute inset-0 pointer-events-none" 
                    style={{ filter: "url(#gooey-drips)", willChange: "filter" }}
                >
                    <div className="absolute inset-0 bg-light-brown rounded-full"></div>
                    
                    {/* Drops (willChange add kiya for smooth translation) */}
                    <div className="absolute w-3 h-15 bg-light-brown rounded-full left-[25%] bottom-0 transition-transform duration-300 ease-in-out group-hover:translate-y-[36px] delay-[225ms]" style={{ willChange: "transform" }}></div>
                    <div className="absolute w-4 h-6 bg-light-brown rounded-full left-[42%] bottom-0 transition-transform duration-300 ease-in-out group-hover:translate-y-[18px] delay-[150ms]" style={{ willChange: "transform" }}></div>
                    <div className="absolute w-2 h-9 bg-light-brown rounded-full left-[60%] bottom-0 transition-transform duration-300 ease-in-out group-hover:translate-y-[24px] delay-[75ms]" style={{ willChange: "transform" }}></div>
                    <div className="absolute w-2 h-5 bg-light-brown rounded-full left-[75%] bottom-0 transition-transform duration-300 ease-in-out group-hover:translate-y-[15px] delay-0" style={{ willChange: "transform" }}></div>
                </div>

                <span className="relative z-10 text-dark-brown font-extrabold uppercase tracking-wide">
                    GET IT NOW 
                </span>
            </a>
        </div>

        {/* Horizontal Scroll Wala Content */}
        <div className="flavor-container h-full flex lg:flex-row flex-col items-center relative" style={{ willChange: "transform" }}>
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