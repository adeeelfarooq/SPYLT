import React, { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useMediaQuery } from "react-responsive"

const Videopinsection = () => {
    // OPTIMIZATION 1: Scoping ke liye ref banaya
    const containerRef = useRef(null);

    const isMobile = useMediaQuery({
        query: "(max-width: 768px)",
    })
  
    // Scope aur dependency array dono properly pass kiye gaye hain
    useGSAP(() => {
        const Tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".vd-pin-section",
                start: isMobile ? "top top" : "-15% top", 
                end: "200% top",
                scrub: 1.5, 
                pin: true, 
                fastScrollEnd: true, // OPTIMIZATION 2: Tezi se scroll par video atakne se rokega
                invalidateOnRefresh: true // OPTIMIZATION 3: Mobile url bar bug se bachayega
            },
            defaults: { force3D: true } // OPTIMIZATION 4: Hardware/GPU acceleration on
        })

        if (!isMobile) {
            Tl.to(".video-box", {
                clipPath: "circle(100% at 50% 50%)",
                ease: "power1.inOut",
            })
        }
    }, { scope: containerRef, dependencies: [isMobile] }); // Scope aur dependency combined

    return (
        // Scope container
        <div ref={containerRef}>
            <section className="vd-pin-section">
                <div 
                    className="size-full video-box"
                    style={{
                        clipPath: isMobile ? "circle(100% at 50% 50%)" : "circle(9% at 50% 50%)",
                        willChange: "clip-path" // SAB SE BARA FIX: Browser ko advance mein clip-path animation ki tayari karwayega
                    }} 
                >
                    <video 
                        src="\videos\pin-video.mp4" 
                        playsInline 
                        muted 
                        autoPlay 
                        loop
                        style={{ willChange: 'transform' }} // Video hardware decoding fix
                    ></video>
                    
                    <div className="abs-center md:scale-100 scale-200">
                        {/* Image load fix */}
                        <img loading="lazy" src="\images\circle-text.svg" alt="" className="spin-circle" />
                        <div className="play-btn">
                            <img loading="lazy" src="\images\play.svg" alt="" className="size-[4vw ] ml-[.5vw]" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Videopinsection