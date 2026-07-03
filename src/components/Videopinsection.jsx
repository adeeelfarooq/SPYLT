import React, { useRef, useEffect, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useMediaQuery } from "react-responsive"

const Videopinsection = () => {
    // OPTIMIZATION 1: Scoping ke liye ref banaya
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const sectionRef = useRef(null);

    // 🚀 Video ka network request tab tak start nahi hota jab tak section
    // viewport ke qareeb na aaye — initial page load / LCP pe bojh kam hota hai
    const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

    const isMobile = useMediaQuery({
        query: "(max-width: 768px)",
    })

    // 🚀 IntersectionObserver: 300px pehle hi video load start kar do
    // taake jab scroll wahan pohanche to video ready ho, buffering na dikhe
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setShouldLoadVideo(true);
                        observer.disconnect(); // ek dafa load ho gaya, dobara observe karne ki zaroorat nahi
                    }
                });
            },
            { rootMargin: "300px" }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Video load hone ke baad autoplay ensure karo (kuch mobile browsers
    // programmatic .play() chahte hain even with autoPlay attribute)
    useEffect(() => {
        if (shouldLoadVideo && videoRef.current) {
            videoRef.current.play?.().catch(() => {
                // Autoplay block hua to koi masla nahi, video already muted/loop hai,
                // user interaction pe khud chal jayegi
            });
        }
    }, [shouldLoadVideo]);

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
            <section className="vd-pin-section" ref={sectionRef}>
                <div 
                    className="size-full video-box"
                    style={{
                        clipPath: isMobile ? "circle(100% at 50% 50%)" : "circle(9% at 50% 50%)",
                        willChange: "clip-path" // SAB SE BARA FIX: Browser ko advance mein clip-path animation ki tayari karwayega
                    }} 
                >
                    <video 
                        ref={videoRef}
                        src={shouldLoadVideo ? "/videos/pin-video.mp4" : undefined}
                        poster="/images/pin-video-poster.jpg" // 🚀 video load hone tak blank box ki jagah poster frame dikhega
                        preload={shouldLoadVideo ? "auto" : "none"} // 🚀 zaroorat se pehle bandwidth waste nahi hoga
                        playsInline 
                        muted 
                        autoPlay 
                        loop
                        disablePictureInPicture
                        disableRemotePlayback
                        style={{ willChange: 'transform' }} // Video hardware decoding fix
                    ></video>
                    
                    <div className="abs-center md:scale-100 scale-200">
                        {/* Image load fix */}
                        <img loading="lazy" src="/images/circle-text.svg" alt="" className="spin-circle" />
                        <div className="play-btn">
                            <img loading="lazy" src="/images/play.svg" alt="" className="size-[4vw] ml-[.5vw]" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
        
    )
}

export default Videopinsection