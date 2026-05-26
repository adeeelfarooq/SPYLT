import React, { useRef } from "react";
import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import { SplitText } from "gsap/all"
import { useMediaQuery } from "react-responsive";
import BurgerMenu from "../components/BurgerMenu";

const Herosection = () => {
    // 1. Ref banaya taake GSAP sirf is component ke andar search kare (Optimization)
    const containerRef = useRef(null);

    const isMobile = useMediaQuery({
        query: "(max-width: 768px)",
    })

    const isTablet = useMediaQuery({
        query: "(max-width: 1024px)",
    })

    useGSAP(() => {
        const titleSplit = SplitText.create(".hero-title", { type: "chars" });

        // 2. defaults: { force3D: true } add kiya for GPU Acceleration
        const tl = gsap.timeline({
            delay: 1,
            defaults: { force3D: true } 
        })

        tl.to(".hero-content", {
            opacity: 1,
            y: 0,
            ease: "power1.inOut",
        }).to(".hero-text-scroll", {
            duration: 1,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "circ.out"
        }, "-0.1").from(titleSplit.chars, {
            yPercent: 200,
            stagger: 0.05,
            ease: "power2.out"
        }, "-0.01").to(".order-btn", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1,
            ease: "power1.inOut",
        })

        // 3. ScrollTrigger optimizations (scrub: 1 & invalidateOnRefresh)
        const heroTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".hero-container",
                start: "1% top",
                end: "bottom top",
                scrub: 1, // true ki jagah 1 lagaya hai, is se scroll makhhan jesa smooth hota hai
                invalidateOnRefresh: true, // Resize par calculations theek rakhega
                fastScrollEnd: true, // Tezi se scroll karne par lag nahi aayega
            },
            defaults: { force3D: true } // GPU Acceleration for heavy rotation/scale
        })

        heroTl.to(".hero-container", {
            rotate: 7,
            scale: 0.9,
            yPercent: 30,
            ease: "power1.inOut"
        })

    }, { scope: containerRef }); // Scope define kar diya

    return (
        // Ref yahan attach kiya
        <div ref={containerRef}>
            <section id="hero-container" className='bg-main-bg'>
                {/* 4. willChange: "transform" add kiya taake rotation/scale smooth ho */}
                <div className='hero-container' style={{ willChange: "transform" }}>
                    
                    {
                        isTablet ? (
                            <> {
                                isMobile && (<img src="\images\hero-img.png" alt="" className="absolute bottom-[-23%] left-1/2 -translate-x-1/2 z-10000  object-auto" />
                                    
                                )
                            }
                                <img src="\images\hero-bg.png" alt="" className="absolute scale-120 bottom-40 size-full  object-cover" />
                            </>
                        ) :
                        
                         (
                            <>
                            <BurgerMenu/>
                            <video src="\videos\hero-bg.mp4" className="absolute inset-0 h-full w-full object-cover "
                                autoPlay
                                playsInline
                                muted
                            />
                            </>
                        )}
                        
                    {/* willChange add kiya */}
                    <div className='hero-content opacity-0' style={{ willChange: "transform, opacity" }}>
                        <div className='md:overflow-hidden'>
                            <h1 className='hero-title'>Freaking Delicious</h1>
                        </div>
                        <div style={{
                            clipPath: "polygon(50% 0, 0% 0, 0% 100%, 100% 100%)",
                            willChange: "clip-path" // ClipPath lag karta hai, ye usko theek karega
                        }}
                            className="hero-text-scroll">
                            <div className="hero-subtitle">
                                <h1>Protein + Caffine</h1>
                            </div>
                        </div>
                        
                        <h2>
                            Live life with a fullest with SPYLT: Shatter bordom and embrace
                            you inner kid with every deliciously smooth chug.
                        </h2>
                        
                        <div className="hero-button relative inline-flex items-center justify-center py-4 px-15 group cursor-pointer scale-[0.8]">
                            
                            {/* SVG Filter for Hero Button */}
                            <svg className="absolute w-0 h-0">
                                <filter id="gooey-drips-hero">
                                    <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="gooey" />
                                </filter>
                            </svg>

                            {/* Gooey Container */}
                            <div 
                                className="absolute inset-0 pointer-events-none" 
                                style={{ filter: "url(#gooey-drips-hero)", willChange: "filter" }} // Filter optimisation
                            >
                                <div className="absolute inset-0  bg-light-brown rounded-full"></div>
                                <div className="absolute w-3 h-15 bg-light-brown rounded-full left-[25%] bottom-0 transition-transform duration-300 ease-in-out group-hover:translate-y-[36px] delay-[225ms] style={{ willChange: 'transform' }}"></div>
                                <div className="absolute w-4 h-6 bg-light-brown rounded-full left-[42%] bottom-0 transition-transform duration-300 ease-in-out group-hover:translate-y-[18px] delay-[150ms] style={{ willChange: 'transform' }}"></div>
                                <div className="absolute w-2 h-9 bg-light-brown rounded-full left-[60%] bottom-0 transition-transform duration-300 ease-in-out group-hover:translate-y-[24px] delay-[75ms] style={{ willChange: 'transform' }}"></div>
                                <div className="absolute w-2 h-5 bg-light-brown rounded-full left-[75%] bottom-0 transition-transform duration-300 ease-in-out group-hover:translate-y-[15px] delay-0 style={{ willChange: 'transform' }}"></div>
                            </div>

                            <p className="relative z-10 text-dark-brown font-extrabold uppercase tracking-wide m-0">
                                chug a Spylt
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Herosection