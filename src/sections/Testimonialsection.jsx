import React, { useRef } from 'react'
import { cards } from '../constants'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Testimonialsection = () => {

    const vdRef = useRef([]);


    useGSAP(()=>{

        const isMobile = window.innerWidth <= 768;
        gsap.set(".testimonials-section" , {
            marginTop: "-140dvh"
        })

        const Tl = gsap.timeline({
            scrollTrigger:{
                trigger:".testimonials-section",
                start:"top bottom",
                end:"200% top",
                scrub: true,
            }
        })

        Tl.to(".testimonials-section .first-title" , {
            xPercent:70,
        } , ).to(".testimonials-section .second-title" , {
            xPercent:25,
        } , "<").to(".testimonials-section .third-title" , {
            xPercent:-50,
        } , "<")

         let pinTl;

        if (isMobile) {
            // MOBILE KE LIYE ALAG PIN (start: "top top" rakha hai taake perfect pin ho)
            pinTl = gsap.timeline({
                scrollTrigger:{
                    trigger:".testimonials-section",
                    start:"top top", 
                    end:"200% top",
                    scrub: 1.5,
                    pin: true,
                }
            }) 
        } else {
            // DESKTOP KE LIYE AAPKA PURANA PIN (start: "10% top")
            pinTl = gsap.timeline({
                scrollTrigger:{
                    trigger:".testimonials-section",
                    start:"10% top",
                    end:"200% top",
                    scrub: 1.5,
                    pin: true,
                }
            }) 
        } 

    pinTl.from(".vd-card" , {
        yPercent:150 , 
        stagger:0.3,
        ease:"power1.inOut",
    })
    })

    

    const handleplay = (index) =>{
        const video = vdRef.current[index];
        video.play();
    };
    const handlepause = (index) =>{
        const video = vdRef.current[index];
        video.pause();
    }
  return (
    <section id='testimonials-section' className="testimonials-section">
        
        <div className="absolute size-full flex flex-col items-center pt-[5vw]">
            <h1 className='text-black first-title'>What's</h1>
            <h1 className='text-light-brown second-title'>Everyone</h1>
            <h1 className='text-black third-title'>Talking</h1>
        </div>
        <div className="pin-box">
            {
                cards.map((card , index)=>(
                    <div key={index} className={`vd-card ${card.translation} ${card.rotation} `}
                    onMouseEnter={()=> handleplay(index)} 
                    onMouseLeave={()=> handlepause(index)}
                    >
                       <video 
                       ref={(el) => (vdRef.current[index]=el)}
                       src={card.src}
                       playsInline
                       muted
                       loop
                       className='sized-full object-cover'
                       ></video>
                    </div>
                ))
            }
        </div>
        {/* AAPKA BUTTON YAHAN LAGA DIYA HAI BINA KISI CHANGE KE (Center krny k liye wrapper add kiya hai bas) */}
        <div className="absolute bottom-45 md:bottom-20 md:left-[50%] left-[50%] -translate-x-1/2 z-50">
            <div className="hero-button relative inline-flex items-center justify-center py-4 px-15 group cursor-pointer scale-[0.9]">
                
                {/* SVG Filter for Hero Button */}
                <svg className="absolute w-0 h-0">
                    <filter id="gooey-drips-hero">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="gooey" />
                    </filter>
                </svg>

                {/* Gooey Container (Liquid Drops k liye) */}
                <div 
                    className="absolute inset-0 pointer-events-none" 
                    style={{ filter: "url(#gooey-drips-hero)" }}
                >
                    {/* Main Background */}
                    <div className="absolute inset-0 bg-light-brown rounded-full"></div>
                    
                    {/* Drops (Katry) - Same Left to Right Flow */}
                    <div className="absolute w-3 h-15 bg-light-brown rounded-full left-[25%] bottom-0 transition-transform duration-300 ease-in-out group-hover:translate-y-[36px] delay-[225ms]"></div>
                                
                    {/* Drip 2: Mid-Left (Sub se lamba, Drip 1 k baad girega) */}
                    <div className="absolute w-4 h-6 bg-light-brown rounded-full left-[42%] bottom-0 transition-transform duration-300 ease-in-out group-hover:translate-y-[18px] delay-[150ms]"></div>
                    
                    {/* Drip 3: Mid-Right (Sub se chhota aur patla) */}
                    <div className="absolute w-2 h-9 bg-light-brown rounded-full left-[60%] bottom-0 transition-transform duration-300 ease-in-out group-hover:translate-y-[24px] delay-[75ms]"></div>
                    
                    {/* Drip 4: Rightmost (Medium length, aakhir mein girega) */}
                    <div className="absolute w-2 h-5 bg-light-brown rounded-full left-[75%] bottom-0 transition-transform duration-300 ease-in-out group-hover:translate-y-[15px] delay-0"></div>
                </div>

                {/* Aapka Text */}
                <p className="relative whitespace-nowrap  z-10 text-dark-brown font-extrabold uppercase tracking-wide m-0">
                    EXPLORE ALL
                </p>
            </div>
        </div>
        
    </section>
  )
}

export default Testimonialsection
