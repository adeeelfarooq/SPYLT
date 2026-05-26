import { useMediaQuery } from "react-responsive"
import { nutrientLists } from "../constants"
import { useEffect, useState } from "react"
import { useGSAP } from "@gsap/react"
import { SplitText } from "gsap/all"
import gsap from "gsap"

const Nutritionsection = () => {

    const isMobile = useMediaQuery({
        query: "(max-width: 768px)",
    })

    const [lists , setLists] = useState(nutrientLists);
    
    useEffect(() => {
        if(isMobile){
            setLists(nutrientLists.slice(0 , 3));
        } else {
            setLists(nutrientLists);
        }
    }, [isMobile]);
     
    // OPTIMIZATION 1: isMobile ko dependency mein add kiya, taake mobile/desktop pe switch hote hi proper calculate ho
    useGSAP(() => {
        const firstTl = SplitText.create(".nutrition-title" , {
            type: "chars",
        })

        const secondPara = SplitText.create(".nutrition-section p" , {
            type: "words, lines",
            linesClass: "paragraph-line"
        });

        const Tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".nutrition-section",
                start: "top 25%",
                fastScrollEnd: true // OPTIMIZATION 2: Tezi se scroll par SplitText ko stuck hone se rokega
            },
            defaults: { force3D: true } // OPTIMIZATION 3: SplitText ki saari animations seedha Graphics Card (GPU) par chalayega
        });

        Tl.from(firstTl.chars , {
            yPercent: 200,
            ease: "power1.inOut",
            stagger: 0.03, // String "0.03" ko number 0.03 kar diya (GSAP better perform karta hai number pe)
        }).from(secondPara.words , {
            yPercent: 300,
            rotate: 3,
            ease: "power1.inOut",
            duration: 1,
            stagger: 0.01,
        });

        const gTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".nutrition-section",
                start: "top 25%",
                fastScrollEnd: true
            },
            defaults: { force3D: true } // GPU rendering
        })

        gTl.to(".nutrition-text-scroll" , {
            duration: 1,
            opacity: 1,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "power1.inOut",
        })
        
    }, [isMobile]); // Dependency add ki

  return (
    <section id="nutrition-section" className='nutrition-section'>
        {/* OPTIMIZATION 4: "loading='lazy'" add kiya hai taake ye bari images site load hotay hi net slow na karein */}
        <img loading="lazy" src="\images\slider-dip.png" alt="" className='w-full object-cover' />
        <img loading="lazy" src="\images\big-img.png" alt="" className='big-img' />
        
        <div className="flex md:flex-row flex-col justify-between md:px-10 px-5 mt-14 md:mt-0">
            <div className="relative inline-block md:translate-y-20">
                <div className="general-title relative flex flex-col items-center gap-24 ">
                    
                    {/* OPTIMIZATION 5: willChange add kiya hai parent elements pe */}
                    <div className="overflow-hidden place-self-start" style={{ willChange: 'transform' }}>
                        <h1 className="nutrition-title">It still does</h1>
                    </div>

                    <div style={{
                        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                        willChange: "clip-path, opacity" // Clip Path optimization
                    }} className="nutrition-text-scroll place-self-start">
                        <div className="bg-yellow-brown pb-5 md:pt-0 pt-3 md:px-5 px-3 inline-block">
                            <h2 className='text-milk-yellow '>body good</h2>
                        </div>
                    </div>

                </div>
            </div>
            <div className="flex md:justify-center items-center translate-y-5">
                {/* willChange add kiya */}
                <div className="md:max-w-xs max-w-md" style={{ willChange: 'transform' }}>
                    <p className='text-lg md:text-right text-balance font-paragraph '>
                        Milk contains a wide variety of nutrients , 
                        including vitamins , minerals & proteins & 
                        this is lactose free.
                    </p>
                </div>
            </div>
            <div className="nutrition-box">
                <div className="list-wrapper">
                    {
                        lists.map((nutrient , index)=>(
                            <div key={index} className=" relative flex-1 col-center ">
                                <div>
                                    <p className="md:text-lg font-paragraph "> {nutrient.label}</p>
                                    <p className="md:text-sm font-paragraph mt-2">up to</p>
                                    <p className="md:text-4xl text-2xl tracking-tighter font-bold">{nutrient.amount}</p>
                                </div>
                                {
                                    index !== lists.length -1 && (<div className="spacer-border"/>)
                                }
                            </div>
                       ))
                    }
                </div>
            </div>
        </div>
    </section>
  )
}

export default Nutritionsection