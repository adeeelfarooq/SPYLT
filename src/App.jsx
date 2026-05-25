import React, { useRef } from 'react';
import NavBar from './components/NavBar';
import Herosection from './sections/Herosection';
import { ScrollSmoother, ScrollToPlugin, ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';
import Messagesection from './sections/Messagesection';
import FlavourSection from './sections/FlavourSection'; 
import { useGSAP } from '@gsap/react';
import Nutritionsection from './sections/Nutritionsection';
import Benefitsection from './sections/Benefitsection';
import Testimonialsection from './sections/Testimonialsection';
import Footersection from './sections/Footersection';

// Plugins Register karna lazmi hai
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);

const App = () => {
  const mainRef = useRef(null); // Pure app ka ref

  useGSAP(() => {
    // 1. ScrollSmoother Create karna
    ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 2, // Same as first code (best for performance)
      effects: true,
      normalizeScroll: true, // Touch devices pe scroll bugs fix karta hai
    });

    // 2. SAB SE BARA FIX (Sections Merging Issue)
    // Jab images aur heavy elements load ho jayen, toh GSAP ko refresh karo
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000); // 1 second ka delay taa ke sab kuch render ho jaye

    // Resize event pe bhi refresh karo (agar user screen choti bari kare)
     window.addEventListener('resize', () => ScrollTrigger.refresh());
   return () => {
         clearTimeout(timeout);
         window.removeEventListener('resize', () => ScrollTrigger.refresh());
       };
     }, { scope: mainRef }); 

  return (
    <main ref={mainRef}>
      {/* NavBar ko fixed rakhne k liye wrapper se bahar rakha hai */}
      <NavBar />
      
      {/* ScrollSmoother in IDs ko dhoondta hai */}
      <div id="smooth-wrapper">   
        <div id="smooth-content">
          <Herosection />
          <Messagesection />
          <FlavourSection />
          <Nutritionsection />
          <Benefitsection />
            <Testimonialsection />
          <Footersection />
        </div>
      </div>
    </main>
  );
}

export default App;