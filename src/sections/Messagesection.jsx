import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText, ScrollTrigger } from 'gsap/all'

// Plugins lazmi register karein
gsap.registerPlugin(SplitText, ScrollTrigger);

const Messagesection = () => {
    // 1. Ref banaya for scoping (Performance Boost)
    const containerRef = useRef(null);

    useGSAP(() => {
        // Modern approach: 'new SplitText' use karna chahiye
        const firstMsgSplit = new SplitText(".first-message", {
            type: "words"
        });
        const secondMsgSplit = new SplitText(".second-message", {
            type: "words"
        });
        const paraSplit = new SplitText(".message-content p", {
            type: "words, lines",
            linesClass: "paragraph-line"
        });

        // 2. Scrub ke sath ease: "none" and scrub: 1 (Smooth Mobile Scrolling)
        gsap.to(firstMsgSplit.words, {
            color: "#faeade",
            ease: "none", // Scrub par lag rokne ke liye ease "none" zaroori hai
            stagger: 1,
            scrollTrigger: {
                trigger: ".message-content",
                scrub: 1, 
                start: "top center",
                end: "30% center",
                fastScrollEnd: true,
            }
        });

        gsap.to(secondMsgSplit.words, {
            color: "#faeade",
            ease: "none",
            stagger: 1,
            scrollTrigger: {
                trigger: ".second-message",
                scrub: 1,
                start: "top center",
                end: "top 80%",
                fastScrollEnd: true,
            }
        });

        const revealTl = gsap.timeline({
            delay: 0.2,
            scrollTrigger: {
                trigger: ".msg-text-scroll",
                start: "top 60%",
            },
        });

        revealTl.to(".msg-text-scroll", {
            duration: 1,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Choti si typo thi 0 100%, wo fix kar di
            ease: "circ.inOut",
        });

        const revealPara = gsap.timeline({
            scrollTrigger: {
                trigger: ".message-content p",
                start: "top center",
            },
            defaults: { force3D: true } // 3. GPU Acceleration for Transforms
        });

        revealPara.from(paraSplit.words, {
            yPercent: 300,
            rotate: 3,
            ease: "power1.inOut",
            duration: 1,
            stagger: 0.01,
        });

        // 4. Cleanup Function: Ye memory leak rokay ga aur RAM free karega
        return () => {
            firstMsgSplit.revert();
            secondMsgSplit.revert();
            paraSplit.revert();
        };

    }, { scope: containerRef }); // Scope pass kar diya

    return (
        // Ref yahan assign kar diya
        <section ref={containerRef} className='message-content'>
            <div className="container mx-auto flex-center py-28 relative">
                <div className='w-full h-full'>
                    <div className='msg-wrapper '>
                        <h1 className='first-message'>Stir up your fearless past and </h1>

                        <div 
                            style={{
                                clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                                willChange: "clip-path" // Browser ko pehle se batayega k clip-path animate hoga (Lag free)
                            }}
                            className='msg-text-scroll'
                        >
                            <div className='bg-light-brown md:pb-5 pb-3 px-5'>
                                <h2 className='text-red-brown'> Fuel Up</h2>
                            </div>
                        </div>
                        
                        <h1 className='second-message'>
                            your future with every gulp of perfect protein
                        </h1>
                    </div>
                    
                    <div className="flex-center md:mt-20 mt-10">
                        <div className="max-w-md px-10 flex-center overflow-hidden">
                            {/* Paragraph jisko split kiya gaya hai */}
                            <p style={{ willChange: "transform" }}>
                                Rev up yout rebel spirit and feed them the adventure of life with 
                                SPYLT , where you're one chug away from epic nostalgia and fearless fun
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Messagesection