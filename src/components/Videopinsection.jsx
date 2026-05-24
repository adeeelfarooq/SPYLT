import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useMediaQuery } from "react-responsive"


const Videopinsection = () => {

    const isMobile = useMediaQuery({
        query: "(max-width: 768px)",
    })
  
    // Yahan [isMobile] dependency mein add kiya hai taake screen size change par GSAP update ho
    useGSAP(()=>{
        // Timeline dono (mobile + desktop) k liye banegi taaky PIN kaam kare
        const Tl = gsap.timeline({
            scrollTrigger:{
                trigger:".vd-pin-section",
                // Mobile par exact top se pin acha lagta hai, desktop par apka -15% same rakha hai
                start: isMobile ? "top top" : "-15% top", 
                end:"200% top",
                scrub:1.5 , 
                pin: true, // Ab ye mobile par bhi PIN karega
            }
        })

        // ClipPath circle wali animation sirf desktop par chalegi
        if(!isMobile){
            Tl.to(".video-box" , {
                clipPath:"circle(100% at 50% 50%)",
                ease:"power1.inOut",
            })
        }
    }, [isMobile])

  return (
    <section className="vd-pin-section">
        <div style={{
          // Apki logic same rakhi hai
          clipPath: isMobile ? "circle(100% at 50% 50%)" : "circle(9% at 50% 50%)"
        }} className="size-full video-box">
            <video src="\videos\pin-video.mp4" playsInline muted autoPlay loop></video>
            <div className="abs-center md:scale-100 scale-200">
                <img src="\images\circle-text.svg" alt="" className="spin-circle" />
                <div className="play-btn">
                    <img src="\images\play.svg" alt="" className="size-[4vw ] ml-[.5vw]" />
                </div>
            </div>
        </div>
    </section>
  )
}

export default Videopinsection