import React, { useRef } from 'react'
import { flavorlists } from '../constants'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
// 1. ScrollTrigger lazmi import karna hai
import { ScrollTrigger } from 'gsap/all'
import { useMediaQuery } from 'react-responsive'

// 2. Register karna zaroori hai horizontal scroll ke liye
gsap.registerPlugin(ScrollTrigger);

const Flavourslider = () => {
    const isTablet = useMediaQuery({
        query: "(max-width: 1024px)" ,
    });
    const sliderRef = useRef(null);

    useGSAP(() => {
        // FIX: Isko normal variable ki jagah function bana diya hai. 
        // Ab jab bhi screen resize hogi ya invalidateOnRefresh chalega, ye correct width layega.
        const getScrollAmount = () => {
            if (sliderRef.current) {
                return sliderRef.current.scrollWidth - window.innerWidth;
            }
            return 0;
        };

        if(!isTablet){
            const tL = gsap.timeline({
                scrollTrigger:{
                    trigger: ".flavor-section", 
                    start: "2% top",
                    pin: true,                  
                    // FIX: Function call `getScrollAmount()` use kiya hai
                    end: () => `+=${getScrollAmount() + 1500}px`, 
                    scrub: 1, 
                    invalidateOnRefresh: true, 
                    fastScrollEnd: true 
                },
                defaults: { force3D: true } 
            })
            
            tL.to(".flavor-container" , {
                // FIX: Yahan bhi function call lagayi hai perfect horizontal slide ke liye
                x: () => `-${getScrollAmount() + 1500}px`, 
                ease: "none", 
            })
        }
        
        const titleTl = gsap.timeline({
            scrollTrigger:{
                trigger:".flavor-section",
                start:'top top',
                end:"bottom 80%",
                scrub: 1, 
                fastScrollEnd: true
            },
            defaults: { force3D: true } 
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

        // Ek safety refresh taake agar images baad mein load hon to ScrollTrigger apne aap ko theek kar le
        ScrollTrigger.refresh();

    // 3. Dependencies mein isTablet de diya taake resize par theek re-render ho
    }, { dependencies: [isTablet] }) 

  return (
    <div ref={sliderRef} className='slider-wrapper'>
        <div className="flavors flex"> 
            {
                flavorlists.map((flavor)=>(
                    <div key={flavor.name} className={`z-30 lg:w-[40vw] w-96 lg:h-[70vh] md:w-[90vw] md:h-[50vh] h-80 flex-none ${flavor.rotation}`}>
                        {/* High Quality Optimization: Lazy Loading aur decoding apply ki taake mobile hang na ho */}
                        <img loading="lazy" decoding="async" src={`/images/${flavor.color}-bg.svg`} alt="" className='absolute bottom-0' />
                        <img loading="lazy" decoding="async" src={`images/${flavor.color}-drink.webp`} alt="" className='drinks'/>
                        <img loading="lazy" decoding="async" src={`images/${flavor.color}-elements.webp`} alt="" className='elements'/>
                        <h1>{flavor.name}</h1>
                    </div>
                ))
            }
            
        </div>
    </div>
  )
}

export default Flavourslider