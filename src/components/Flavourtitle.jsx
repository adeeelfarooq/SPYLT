import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText, ScrollTrigger } from 'gsap/all'

// Lazmi register karein
gsap.registerPlugin(SplitText, ScrollTrigger);

const Flavourtitle = () => {
    const titleRef = useRef(null);

    useGSAP(() => {
        // 'new' keyword use karna modern practice hai
        const firstF = new SplitText(".first-text-split", {
            type: "chars",
        });
        const secondF = new SplitText(".second-text-split", {
            type: "chars",
        });
        
        gsap.from(firstF.chars , {
            yPercent: 200 , 
            stagger: 0.02,
            ease: "power1.inOut",
            force3D: true, // GPU Acceleration
            scrollTrigger:{
                trigger: ".flavor-section",
                start: "top 30%",
                fastScrollEnd: true
            }
        });
        
        gsap.to(".flavor-text-scroll" , {
            duration: 1.5 , 
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            force3D: true,
            scrollTrigger:{
                trigger:".flavor-section",
                start: "top 20%",
                fastScrollEnd: true
            }
        });
        
        gsap.from(secondF.chars , {
            yPercent: 200 , 
            stagger: 0.02,
            ease: "power1.inOut",
            force3D: true, // GPU Acceleration
            scrollTrigger:{
                trigger: ".flavor-section",
                start: "top 1%",
                fastScrollEnd: true
            }
        });

        // MEMORY LEAK FIX: Important to clear out spans on component unmount
        return () => {
            firstF.revert();
            secondF.revert();
        };

    }, { scope: titleRef }); 

  return (
    <div ref={titleRef} className='general-title col-center h-full 2xl:gap-32 xl:gap-24 gap-16 '>
      <div className="overflow-hidden 2xl:py-0 py-3 first-text-split" style={{ willChange: "transform" }}>
        <h1>We have 6</h1>
      </div>
      
      <div style={{
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        willChange: "clip-path" 
      }} className="flavor-text-scroll">
        <div className="bg-mid-brown pb-5 2xl:pt-0 pt-3 2xl:px-5 px-3">
            <h2 className='text-milk'>freaking</h2>
        </div>
      </div>
      
      <div className="overflow-hidden md:whitespace-nowrap 2xl:py-0 py-3 second-text-split" style={{ willChange: "transform" }}>
        <h1 className='md:whitespace-nowrap'>Delicious flavours </h1>
      </div>
    </div>
  )
}


export default Flavourtitle