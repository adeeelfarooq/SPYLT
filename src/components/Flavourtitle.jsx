import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'
import React, { useRef } from 'react'

const Flavourtitle = () => {
    // Optimization: Ref add kiya for scoping
    const titleRef = useRef(null);

    useGSAP(() => {
        const firstF = SplitText.create(".first-text-split" , {
            type: "chars",
        })
        const secondF = SplitText.create(".second-text-split" , {
            type: "chars",
        })
        
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
        })
        
        gsap.to(".flavor-text-scroll" , {
            duration: 1.5 , 
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            force3D: true,
            scrollTrigger:{
                trigger:".flavor-section",
                start: "top 20%",
                fastScrollEnd: true
            }
        })
        
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
        })
    }, { scope: titleRef }) // Ref scope add kiya

  return (
    <div ref={titleRef} className='general-title col-center h-full 2xl:gap-32 xl:gap-24 gap-16 '>
      {/* willChange add kiya */}
      <div className="overflow-hidden 2xl:py-0 py-3 first-text-split" style={{ willChange: "transform" }}>
        <h1>We have 6</h1>
      </div>
      
      <div style={{
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        willChange: "clip-path" // Clip path rendering optimisation
      }} className="flavor-text-scroll">
        <div className="bg-mid-brown pb-5 2xl:pt-0 pt-3 2xl:px-5 px-3">
            <h2 className='text-milk'>freaking</h2>
        </div>
      </div>
      
      {/* willChange add kiya */}
      <div className="overflow-hidden 2xl:py-0 py-3 second-text-split" style={{ willChange: "transform" }}>
        <h1>Delicious flavours </h1>
      </div>
    </div>
  )
}

export default Flavourtitle