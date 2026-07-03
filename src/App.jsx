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

// 🚀 SAB SE BARA FIX: Mobile browsers (iOS/Android) mein address bar
// show/hide hone par bhi "resize" event fire hota hai. Pehle is par
// har baar ScrollTrigger.refresh() (bohot heavy — saare pinned sections
// ki positions dobara calculate karta hai) chal raha tha, isi wajah se
// scroll beech mein "atak/stuck" feel hota tha. Ye line GSAP ko batati
// hai ke sirf real resize (orientation change / window resize) par hi
// react kare, address-bar wale fake resize ko ignore kare.
ScrollTrigger.config({ ignoreMobileResize: true });

// 🚀 Debounce helper: agar real resize event fire bhi ho (jaise window
// drag karke resize karna), to refresh baar baar nahi, sirf ek dafa —
// jab user resize "rok" de — chalega.
const debounce = (fn, delay = 250) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

const App = () => {
  const mainRef = useRef(null); // Pure app ka ref

  useGSAP(() => {
    // 1. ScrollSmoother Create karna
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.5, // Same as first code (best for performance)
      effects: true,
      normalizeScroll: true, // Touch devices pe scroll bugs fix karta hai
    });

    // 2. SAB SE BARA FIX (Sections Merging Issue)
    // Jab images aur heavy elements load ho jayen, toh GSAP ko refresh karo
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000); // 1 second ka delay taa ke sab kuch render ho jaye

    // 🚀 Slow network par 1 second kaafi na ho to window 'load' pe bhi
    // ek dafa refresh — taake positions hamesha sahi rahein
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);

    // 🐛 FIX: Ab same function reference add/remove dono jagah use ho
    // raha hai (pehle alag-alag anonymous functions the, is liye cleanup
    // kabhi kaam nahi karta tha) + debounce laga diya taake rapid resize
    // events par baar baar heavy refresh na chale.
    const handleResize = debounce(() => ScrollTrigger.refresh(), 250);
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('resize', handleResize);
      smoother?.kill(); // 🚀 Unmount pe smoother properly cleanup hoga (memory leak se bachao)
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