import React from 'react'

const Footersection = () => {
  return (
    <section className='footer-section'>
        <img src="\images\footer-dip.png" alt="" className='w-full  object-cover translate-y-1' />

        <div className="2xl:h-[110dvh] relative md:pt-[20vh] pt-[10vh]">
            <div className="overflow-hidden z-10">
                <h1 className='general-title text-center text-milk py-5'>#CHUGRESPONSIBLY</h1>
            </div>
            <video src="\videos\splash.mp4" 
            autoPlay
            playsInline
            muted
            className='absolute top-0 object-contain mix-blend-lighten z-100'
            ></video>
            <div className='flex-center gap-5 relative z-10 md:mt-20 mt-5'>
                <div className="social-btn">
                    <img src="\images\yt.svg" alt="" />
                </div>
                <div className="social-btn">
                    <img src="\images\insta.svg" alt="" />
                </div>
                <div className="social-btn">
                    <img src="\images\tiktok.svg" alt="" />
                </div>
                
            </div>

            <div className="mt-49 md:px-5 px-5 flex gap-10 md:flex-col flex-col justify-between text-milk font-paragraph md:text-sm font-medium">
                <div className="flex items-center md:gap-16 gap-5 ">
                    <div className='z-1000   ' >
                        <p className='cursor-pointer ' >SPYLT Flavours</p>
                    </div>
                    <div className='z-1000  '>
                        <p className='cursor-pointer'>Chug Club</p>
                        <p className='cursor-pointer'>Student Marketing</p>
                        <p className='cursor-pointer'>Dairy Dealers</p>
                    </div>
                    <div className='z-1000 '>
                        <p className='cursor-pointer'>Company</p>
                        <p className='cursor-pointer'>Contact</p>
                        <p className='cursor-pointer'>Tasty Talk</p>
                    </div>
                </div>
                <div className="max-w-sm absolute md:right-[5%]">
                    <p>Get Exclusive Early Access & Stay Informed About Product Updates Events & More !</p>
                </div>
                <br/>
                 <br/>
                  <br/>
                  
                  <div className="copyright-box">
                    <p>Copyright © 2025 Spylt - All Rights Reserved</p>
                    <div className="flex item-center gap-7 z-1000">
                        <p className='cursor-pointer'>Privacy Policy</p>
                        <p className='cursor-pointer'>Terms Of Services</p>
                    </div>
                  </div>
                
            </div>
        </div>
    </section>
  )
}

export default Footersection
