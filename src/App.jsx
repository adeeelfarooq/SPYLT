
import NavBar from './components/NavBar'
import Herosection from './sections/Herosection'
import { ScrollSmoother, ScrollToPlugin , ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';
import Messagesection from './sections/Messagesection';
import FlavourSection from './sections/FlavourSection'; 
import { useGSAP } from '@gsap/react';
import Nutritionsection from './sections/Nutritionsection';
import Benefitsection from './sections/Benefitsection';
import Testimonialsection from './sections/Testimonialsection';
import Footersection from './sections/Footersection';

gsap.registerPlugin(ScrollTrigger , ScrollToPlugin ,  ScrollSmoother);

const App = () => {

  useGSAP(()=>{
  ScrollSmoother.create({
    smooth: 2,
    effects: true,
  } )
})  
  return (
    
      
        <main>
          <NavBar />
          <div id="smooth-wrapper">   
      <div id="smooth-content">
          <Herosection />
          <Messagesection />
          <FlavourSection />
          <Nutritionsection/>
          <div>
            <Benefitsection/>
          <Testimonialsection/>
          </div>
          <Footersection/>
          
          </div>
          </div>
        </main>
      
    
  
  )
}

export default App
