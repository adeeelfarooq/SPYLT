import React from 'react'
import Flavourtitle from '../components/Flavourtitle'
import Flavourslider from '../components/Flavourslider'

const FlavourSection = () => {
  return (
    <section id='flavor-section' className='flavor-section'>
        <div className="h-full flex lg:flex-row flex-col items-center relative">
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
