import React from 'react'
import Flavourtitle from '../components/Flavourtitle'
import Flavourslider from '../components/Flavourslider'

const FlavourSection = () => {
  return (
    <section id='flavor-section' className='flavor-section'>
        <a 
            href="#" 
            className="absolute z-[20000] scale-80 inline-flex items-center justify-center bg-light-brown text-dark-brown font-extrabold left-[50%] -translate-x-1/2 top-[90%] uppercase tracking-wide py-5 px-18 rounded-full transition-all duration-300 ease-in-out "
        > 
            GET IT NOW 
        </a>

        {/* Is div pe 'flavor-container' class add ki hai jisko hum move karenge */}
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
