import React, { useRef } from 'react'
import { cards } from '../constants'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Testimonialsection = () => {

    const vdRef = useRef([]);

    // Yahan scope hata diya hai taake ".testimonials-section" easily mil jaye aur overlap break na ho
    useGSAP(() => {
        const isMobile = window.innerWidth <= 768;
        
        // YE LINE BILKUL SAFE HAI AB (Overlap properly kaam karega)
        gsap.set(".testimonials-section", {
            marginTop: "-140dvh"
        })

        const Tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".testimonials-section",
                start: "top bottom",
                end: "200% top",
                scrub: 1, // Optimization: True ki jagah 1 lagaya for smoother text parallax
                fastScrollEnd: true, 
                invalidateOnRefresh: true 
            },
            defaults: { force3D: true } // GPU Acceleration
        })

        Tl.to(".testimonials-section .first-title", {
            xPercent: 70,
        }).to(".testimonials-section .second-title", {
            xPercent: 25,
        }, "<").to(".testimonials-section .third-title", {
            xPercent: -50,
        }, "<")

        let pinTl;

        if (isMobile) {
            pinTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".testimonials-section",
                    start: "top top", 
                    end: "200% top",
                    scrub: 1.5,
                    pin: true,
                    fastScrollEnd: true,
                    invalidateOnRefresh: true
                },
                defaults: { force3D: true } 
            }) 
        } else {
            pinTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".testimonials-section",
                    start: "10% top",
                    end: "200% top",
                    scrub: 1.5,
                    pin: true,
                    fastScrollEnd: true,
                    invalidateOnRefresh: true
                },
                defaults: { force3D: true }
            }) 
        } 

        pinTl.from(".vd-card", {
            yPercent: 150, 
            stagger: 0.3,
            ease: "power1.inOut",
            force3D: true // GPU Rendering for Videos
        })
    })

    // 🚀 NEW LOGIC: Desktop ke liye Hover
    const handleplay = (index) => {
        if (window.innerWidth > 768) { // Sirf Desktop par hover chalay ga
            const video = vdRef.current[index];
            if(video) video.play(); 
        }
    };
    
    const handlepause = (index) => {
        if (window.innerWidth > 768) { // Sirf Desktop par hover chalay ga
            const video = vdRef.current[index];
            if(video) video.pause(); 
        }
    }

    // 🚀 NEW LOGIC: Mobile ke liye Tap (Click)
    const handleMobileTap = (index) => {
        if (window.innerWidth <= 768) { // Sirf Mobile par click chalay ga
            const video = vdRef.current[index];
            if (video) {
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            }
        }
    };

    return (
        <section id='testimonials-section' className="testimonials-section">
            
            <div className="absolute size-full flex flex-col items-center pt-[5vw]">
                <h1 className='text-black first-title' style={{ willChange: 'transform' }}>What's</h1>
                <h1 className='text-light-brown second-title' style={{ willChange: 'transform' }}>Everyone</h1>
                <h1 className='text-black third-title' style={{ willChange: 'transform' }}>Talking</h1>
            </div>
            
            <div className="pin-box">
                {
                    cards.map((card, index) => (
                        <div 
                            key={index} 
                            className={`vd-card ${card.translation} ${card.rotation} `}
                            style={{ willChange: 'transform' }} 
                            onMouseEnter={() => handleplay(index)} 
                            onMouseLeave={() => handlepause(index)}
                            onClick={() => handleMobileTap(index)} // 👈 Mobile Tap Fix Yahan Laga Hai
                        >
                           <video 
                               ref={(el) => (vdRef.current[index]=el)}
                               src={card.src}
                               playsInline
                               muted
                               loop
                               className='sized-full object-cover pointer-events-none' // pointer-events-none taake click seedha div par lagay
                           ></video>
                        </div>
                    ))
                }
            </div>

            <div className="absolute bottom-45 md:bottom-20 md:left-[50%] left-[50%] -translate-x-1/2 z-50">
                <div className="hero-button relative inline-flex items-center justify-center py-4 px-15 group cursor-pointer scale-[0.9]">
                    
                    <svg className="absolute w-0 h-0">
                        <filter id="gooey-drips-hero">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="gooey" />
                        </filter>
                    </svg>

                    <div 
                        className="absolute inset-0 pointer-events-none" 
                        style={{ filter: "url(#gooey-drips-hero)", willChange: 'filter' }}
                    >
                        <div className="absolute inset-0 bg-light-brown rounded-full"></div>
                        
                        <div className="absolute w-3 h-15 bg-light-brown rounded-full left-[25%] bottom-0 transition-transform duration-300 ease-in-out group-hover:translate-y-[36px] delay-[225ms]" style={{ willChange: 'transform' }}></div>
                        <div className="absolute w-4 h-6 bg-light-brown rounded-full left-[42%] bottom-0 transition-transform duration-300 ease-in-out group-hover:translate-y-[18px] delay-[150ms]" style={{ willChange: 'transform' }}></div>
                        <div className="absolute w-2 h-9 bg-light-brown rounded-full left-[60%] bottom-0 transition-transform duration-300 ease-in-out group-hover:translate-y-[24px] delay-[75ms]" style={{ willChange: 'transform' }}></div>
                        <div className="absolute w-2 h-5 bg-light-brown rounded-full left-[75%] bottom-0 transition-transform duration-300 ease-in-out group-hover:translate-y-[15px] delay-0" style={{ willChange: 'transform' }}></div>
                    </div>

                    <p className="relative whitespace-nowrap z-10 text-dark-brown font-extrabold uppercase tracking-wide m-0">
                        EXPLORE ALL
                    </p>
                </div>
            </div>
            
        </section>
    )
}

export default Testimonialsection