import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useMediaQuery } from "react-responsive"


const Videopinsection = () => {

    const isMobile = useMediaQuery({
        query: "(max-width: 768px)",
    })
  
    useGSAP(()=>{
        if(!isMobile){
            const Tl = gsap.timeline({
            scrollTrigger:{
                trigger:".vd-pin-section",
                start:"-15% top",
                end:"200% top",
                scrub:1.5 , 
                
                pin: true,
            }
        })

        Tl.to(".video-box" , {
            clipPath:"circle(100% at 50% 50%)",
            ease:"power1.inOut",
        })
        }
    })

  return (
    <section className="vd-pin-section">
        <div style={{

          clipPath: isMobile ? "circle(100% at 50% 50%)" : "circle(9% at 50% 50%)"
        }} className="size-full video-box">
            <video src="\videos\pin-video.mp4" playsInline muted autoPlay ></video>
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
