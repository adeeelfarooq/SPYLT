import React, { useRef } from 'react'
import { flavorlists } from '../constants'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMediaQuery } from 'react-responsive'

const Flavourslider = () => {
    const isTablet = useMediaQuery({
        query: "(max-width: 1024px)" ,
    });
    const sliderRef = useRef();

    useGSAP(() => {
        const scrollAmount = sliderRef.current.scrollWidth - window.innerWidth;

        if(!isTablet){
            const tL = gsap.timeline({
                scrollTrigger:{
                    trigger: ".flavor-section", 
                    start: "2% top",
                    pin: true,                  
                    end: () => `+=${scrollAmount + 1500}px`, // Function format is better for recalculation
                    scrub: 1, // 1 for butter-smooth scrub
                    invalidateOnRefresh: true, // Resize par lag/breaking fix karega
                    fastScrollEnd: true // Tezi se scroll par stuck nahi hoga
                },
                defaults: { force3D: true } // GPU Acceleration
            })
            
            tL.to(".flavor-container" , {
                x: () => `-${scrollAmount + 1500}px`, // Same function format here
                ease: "none", // Horizontal scroll me ease "none" rakhna best hota hai taaky drag aur scroll sync lagy
            })
        }
        
        const titleTl = gsap.timeline({
            scrollTrigger:{
                trigger:".flavor-section",
                start:'top top',
                end:"bottom 80%",
                scrub: 1, // Smooth scrubbing
                fastScrollEnd: true
            },
            defaults: { force3D: true } // GPU Acceleration
        })

        titleTl.to(".first-text-split" , {
            xPercent: -30,
            ease: "power1.inOut",
        }).to(".flavor-text-scroll" , {
            xPercent: -22,
            ease: "power1.inOut", 
        }, "<").to(".second-text-split" , {
            xPercent: -10,
            ease: "power1.inOut",
        } )
    })

  return (
    <div ref={sliderRef} className='slider-wrapper'>
        <div className="flavors flex"> 
            {
                flavorlists.map((flavor)=>(
                    <div key={flavor.name} className={`z-30 lg:w-[40vw] w-96 lg:h-[70vh] md:w-[90vw] md:h-[50vh] h-80 flex-none ${flavor.rotation}`}>
                        <img src={`/images/${flavor.color}-bg.svg`} alt="" className='absolute bottom-0' />
                        <img src={`images/${flavor.color}-drink.webp`} alt="" className='drinks'/>
                        <img src={`images/${flavor.color}-elements.webp`} alt="" className='elements'/>
                        <h1>{flavor.name}</h1>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Flavourslider