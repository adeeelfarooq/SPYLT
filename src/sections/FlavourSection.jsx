import React from 'react'
import Flavourtitle from '../components/Flavourtitle'
import Flavourslider from '../components/Flavourslider'

const FlavourSection = () => {
  return (
    <section id='flavor-section' className='flavor-section relative'>
        
        {/* YEH WOH JADOO HAI JO "KATRON" KO LIQUID JESA BANAYEGA (Gooey Filter) */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <filter id="gooey-drips">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="gooey-drips" />
            </filter>
        </svg>

        {/* AAPKA NAYA BUTTON - Jiske neechy sy Katry niklenge */}
        <div className="absolute z-[20000] scale-[0.8] left-[50%] -translate-x-1/2 top-[90%] group cursor-pointer">
            <a href="#" className="relative inline-flex items-center justify-center py-5 px-[72px]">
                
                {/* Gooey Filter is div pe laga hai taaky sab cheezein liquid ki tarah mix hon */}
                <div 
                    className="absolute inset-0 pointer-events-none" 
                    style={{ filter: "url(#gooey-drips)" }}
                >
                    {/* Yeh Main Button ka background (Pill shape) hai */}
                    <div className="absolute inset-0 bg-light-brown rounded-full"></div>
                    
                    {/* YEH HAIN WOH KATRY (Drops) JO HOVER PAR NEECHY AYENGE */}
                    {/* Pehla katra */}
                    <div className="absolute w-7 h-7 bg-light-brown rounded-full left-[20%] bottom-0 transition-transform duration-500 ease-out group-hover:translate-y-5 delay-75"></div>
                    {/* Doosra katra (Thora lamba) */}
                    <div className="absolute w-8 h-8 bg-light-brown rounded-full left-[45%] bottom-0 transition-transform duration-700 ease-out group-hover:translate-y-7"></div>
                    {/* Teesra katra (Chhota) */}
                    <div className="absolute w-5 h-5 bg-light-brown rounded-full left-[70%] bottom-0 transition-transform duration-300 ease-out group-hover:translate-y-4 delay-100"></div>
                    {/* Choutha katra */}
                    <div className="absolute w-7 h-7 bg-light-brown rounded-full left-[85%] bottom-0 transition-transform duration-500 ease-out group-hover:translate-y-6 delay-150"></div>
                </div>

                {/* Yeh aapka Text hai (Ispe filter nahi laga taaky text blur na ho) */}
                <span className="relative z-10 text-dark-brown font-extrabold uppercase tracking-wide">
                    GET IT NOW 
                </span>
            </a>
        </div>

        {/* Andar wala scroll section (Aapka purana code) */}
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