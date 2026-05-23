import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import { SplitText } from "gsap/all"
import { useMediaQuery } from "react-responsive";
import BurgerMenu from "../components/BurgerMenu";


const Herosection = () => {

    const isMobile = useMediaQuery({
        query: "(max-width: 768px)",
    })

    const isTablet = useMediaQuery({
        query: "(max-width: 1024px)",
    })


    useGSAP(() => {
        const titleSplit = SplitText.create(".hero-title", { type: "chars" });


        const tl = gsap.timeline({
            delay: 1,
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
        }, "-0.01").to(".order-btn" , {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1 ,
            ease:"power1.inOut",
        } )
        const heroTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".hero-container",
                start: "1% top",
                end: "bottom top",
                scrub: true,

            }
        })
        heroTl.to(".hero-container", {
            rotate: 7,
            scale: 0.9,
            yPercent: 30,
            ease: "power1.inOut"
        })

    })

    return (
        <div>
            <section id="hero-container" className='bg-main-bg'>
                <div className='hero-container'>
                    <a href="#" className="absolute z-20000 scale-80 inline-flex items-center justify-center bg-white/70 text-dark-brown font-extrabold right-[1%] top-[3%]  uppercase tracking-wide py-4 px-8 rounded-full transition-all duration-300 ease-in-out hover:bg-light-brown   ">
  FIND IN STORES
</a>
                    
                    
                    
                    {
                        isTablet ? (
                            <> {
                                isMobile && (<img src="\images\hero-img.png" alt="" className="absolute bottom-0 left-1/2 translate-x-1/2  object-auto" />)
                            }
                                <img src="\images\hero-bg.png" alt="" className="absolute bottom-40 size-full  object-cover" />
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
                        
                        
                    <div className='hero-content opacity-0'>
                        <div className='overflow-hidden'>
                            <h1 className='hero-title'>Freaking Delicious</h1>
                        </div>
                        <div style={{
                            clipPath: "polygon(50% 0, 0% 0, 0% 100%, 100% 100%)",
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
    
    {/* SVG Filter for Hero Button (ID change ki hai taaky pichle button se conflict na ho) */}
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
        <div className="absolute inset-0  bg-light-brown rounded-full"></div>
        
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
    <p className="relative z-10 text-dark-brown font-extrabold uppercase tracking-wide m-0">
        chug a Spylt
    </p>
</div>
                    </div>
                </div >
                

            </section>
        </div>
    )
}

export default Herosection
