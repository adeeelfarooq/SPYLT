import React from 'react'
import ClipPathTitle from '../components/ClipPathTitle'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Videopinsection from '../components/Videopinsection'

const Benefitsection = () => {

    useGSAP(()=>{
        const revealTl = gsap.timeline({
            delay: 1,
            scrollTrigger:{
                trigger:".benefit-section",
                start:"top 60%",
                end:"top top",
                scrub: 1.5,
                
            }
        })

        revealTl.to(".benefit-section .first-title" , {
            duration: 1,
            opacity:1,
            clipPath:"polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
            ease:"circ.out"
        }).to(".benefit-section .second-title" , {
            duration: 1,
            opacity:1,
            clipPath:"polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
            ease:"circ.out"
        }).to(".benefit-section .third-title" , {
            duration: 1,
            opacity:1,
            clipPath:"polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
            ease:"circ.out"
        }).to(".benefit-section .fourth-title" , {
            duration: 1,
            opacity:1,
            clipPath:"polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
            ease:"circ.out"
        })
    })




  return (
    <section id="benefit-section" className='benefit-section'>
        <div className="container mx-auto pt-20">
            <div className="col-center">
                <p>Unlock the Advantages:<br/> 
                Explore the Key Benefits of Choosing SPYLT</p>
                <div className="mt-20 col-center">
                    <ClipPathTitle 
                     title={"Shelf Stable"}
                     color={"#faeade"}
                     bg={"#c88864"}
                     className={"first-title"}
                     borderColor={"#222123"}
                    />
                     <ClipPathTitle 
                     title={"Protein + Caffeine"}
                     color={"#222123"}
                     bg={"#faeade"}
                     className={"second-title"}
                     borderColor={"#222123"}
                    />
                     <ClipPathTitle 
                     title={"Infinity recyclable"}
                     color={"#faeade"}
                     bg={"#7f3b2d"}
                     className={"third-title"}
                     borderColor={"#222123"}
                    />
                     <ClipPathTitle 
                     title={"Lactose free"}
                     color={"#2e2d2f"}
                     bg={"#fed775"}
                     className={"fourth-title"}
                     borderColor={"#222123"}
                    />
                    
                </div>
                <div className="md:mt-0 mt-10">
                    <p>And Much More ...</p>
                </div>

                
            </div>
        </div>
        <div className="relative overlay-box">
            <Videopinsection/>
        </div>
    </section>
  )
}

export default Benefitsection
