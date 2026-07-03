import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import { useMediaQuery } from "react-responsive";
import BurgerMenu from "../components/BurgerMenu";

// Plugins register karna zaroori hai taake GSAP perfectly kaam kare
gsap.registerPlugin(SplitText, ScrollTrigger);

const Herosection = () => {
    // 1. Ref banaya taake GSAP sirf is component ke andar search kare (Optimization)
    const containerRef = useRef(null);

    const isMobile = useMediaQuery({
        query: "(max-width: 768px)",
    });

    const isTablet = useMediaQuery({
        query: "(max-width: 1024px)",
    });

    useGSAP(() => {
        const titleSplit = new SplitText(".hero-title", { type: "chars" });

        // 2. defaults: { force3D: true } add kiya for GPU Acceleration
        const tl = gsap.timeline({
            delay: 1,
            defaults: { force3D: true }
        });

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
        });

        // 3. ScrollTrigger optimizations
        const heroTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".hero-container",
                start: "1% top",
                end: "bottom top",
                scrub: 1, 
                invalidateOnRefresh: true, 
                fastScrollEnd: true, 
            },
            defaults: { force3D: true } 
        });

        heroTl.to(".hero-container", {
            rotate: 7,
            scale: 0.9,
            yPercent: 30,
            ease: "none" // Scrub k sath ease "none" rakhna best practice hai to avoid scroll lag
        });

        // 4. Memory Leak Protection: Component unmount hone par SplitText ko wapis normal kar dega taake RAM free ho jaye
        return () => {
            titleSplit.revert();
        };

    }, { scope: containerRef }); 

    return (
        <div ref={containerRef}>
            <section id="hero-container" className='bg-main-bg'>
                <div className='hero-container' style={{ willChange: "transform" }}>
                    
                    {
                        isTablet ? (
                            <> 
                                {isMobile && (
                                    <img 
                                        src="\images\hero-img.png" 
                                        alt="" 
                                        className="absolute bottom-[-23%] left-1/2 -translate-x-1/2 z-10000 object-auto"
                                        decoding="async" // Image background main process hogi
                                        fetchpriority="high" 
                                    />
                                )}
                                <img 
                                    src="\images\hero-bg.png" 
                                    alt="" 
                                    className="absolute scale-120 bottom-40 size-full object-cover" 
                                    decoding="async"
                                    fetchpriority="high"
                                />
                            </>
                        ) : (
                            <>
                                <BurgerMenu/>
                                <video 
                                    src="\videos\hero-bg.mp4" 
                                    className="absolute inset-0 h-full w-full object-cover"
                                    autoPlay
                                    playsInline // iOS devices par full screen hone se rokega
                                    disablePictureInPicture // Mobile RAM save karega
                                    muted
                                     // Video k liye loop best rehta hai
                                />
                            </>
                        )}
                        
                    <div className='hero-content opacity-0' style={{ willChange: "transform, opacity" }}>
                        <div className='md:overflow-hidden'>
                            <h1 className='hero-title'>Freaking Delicious</h1>
                        </div>
                        <div 
                            style={{
                                clipPath: "polygon(50% 0, 0% 0, 0% 100%, 100% 100%)",
                                willChange: "clip-path" 
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
                            
                            <svg className="absolute w-0 h-0">
                                <filter id="gooey-drips-hero">
                                    <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="gooey" />
                                </filter>
                            </svg>

                            {/* Gooey Container */}
                            <div 
                                className="absolute inset-0 pointer-events-none" 
                                style={{ filter: "url(#gooey-drips-hero)", willChange: "filter" }} 
                            >
                                <div className="absolute inset-0 bg-light-brown rounded-full"></div>
                                {/* SYNTAX FIX: style aur className mix the, unhe separate kar diya */}
                                <div className="absolute w-3 h-15 bg-light-brown rounded-full left-[25%] bottom-0 transition-transform duration-300 ease-in-out group-hover:translate-y-[36px] delay-[225ms]" style={{ willChange: 'transform' }}></div>
                                <div className="absolute w-4 h-6 bg-light-brown rounded-full left-[42%] bottom-0 transition-transform duration-300 ease-in-out group-hover:translate-y-[18px] delay-[150ms]" style={{ willChange: 'transform' }}></div>
                                <div className="absolute w-2 h-9 bg-light-brown rounded-full left-[60%] bottom-0 transition-transform duration-300 ease-in-out group-hover:translate-y-[24px] delay-[75ms]" style={{ willChange: 'transform' }}></div>
                                <div className="absolute w-2 h-5 bg-light-brown rounded-full left-[75%] bottom-0 transition-transform duration-300 ease-in-out group-hover:translate-y-[15px] delay-0" style={{ willChange: 'transform' }}></div>
                            </div>

                            <p className="relative z-10 text-dark-brown font-extrabold uppercase tracking-wide m-0">
                                chug a Spylt
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Herosection;