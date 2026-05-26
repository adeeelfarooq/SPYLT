import React from 'react'

const Footersection = () => {
  return (
    // willChange transform section ko GPU layer de dega
    <section className='footer-section' style={{ willChange: 'transform' }}>
        {/* Images Lazy Load ki hain taake website foran khulay */}
        <img loading="lazy" src="\images\footer-dip.png" alt="" className='w-full object-cover translate-y-1' />

        <div className="2xl:h-[110dvh] relative md:pt-[20vh] pt-[10vh]">
            <div className="overflow-hidden ">
                <h1 className='general-title text-center text-milk py-5'>#CHUGRESPONSIBLY</h1>
            </div>
            
            {/* VIDEO OPTIMIZATION: willChange='opacity' add kiya hai kyunke mix-blend-lighten render engine ko boht tang karta hai */}
            <video 
                src="\videos\splash.mp4" 
                autoPlay
                playsInline
                muted
                 // Splash effect k liye loop zaroori hota hai
                className='absolute top-0 object-contain mix-blend-lighten max-md:h-full max-md:w-full'
                style={{ willChange: 'opacity' }}
            ></video>

            <div className='flex-center gap-5 relative z-10 md:mt-20 mt-5'>
                <div className="social-btn">
                    <img loading="lazy" src="\images\yt.svg" alt="" />
                </div>
                <div className="social-btn">
                    <img loading="lazy" src="\images\insta.svg" alt="" />
                </div>
                <div className="social-btn">
                    <img loading="lazy" src="\images\tiktok.svg" alt="" />
                </div>
            </div>

            <div className="mt-49 md:px-5 px-5 flex gap-10 md:flex-col flex-col justify-between text-milk font-paragraph md:text-sm font-medium max-md:text-[11px] max-md:gap-8 max-md:relative max-md:z-10">
                
                <div className="flex items-center md:gap-16 gap-5 max-md:w-full max-md:items-start max-md:justify-between">
                    <div className='z-1000 md:mb-10 max-md:w-[30%]' >
                        <p className='cursor-pointer hover:text-white/50 ' >SPYLT Flavours</p>
                    </div>
                    <div className='z-1000 max-md:w-[35%] max-md:flex max-md:flex-col max-md:gap-2'>
                        <p className='cursor-pointer hover:text-white/50'>Chug Club</p>
                        <p className='cursor-pointer hover:text-white/50'>Student Marketing</p>
                        <p className='cursor-pointer hover:text-white/50'>Dairy Dealers</p>
                    </div>
                    <div className='z-1000 max-md:w-[30%] max-md:flex max-md:flex-col max-md:gap-2 max-md:text-right'>
                        <p className='cursor-pointer hover:text-white/50' >Company</p>
                        <p className='cursor-pointer hover:text-white/50'>Contacts</p>
                        <p className='cursor-pointer hover:text-white/50'>Tasty Talk</p>
                    </div>
                </div>
                
                <div className="max-w-sm absolute md:right-[5%] max-md:relative max-md:mt-6 max-md:max-w-full">
                    <p className='max-md:pr-4'>Get Exclusive Early Access & Stay Informed About Product Updates Events & More !</p>
                
                    <div className=" mt-10 flex items-center w-[428px] justify-between border-b border-milk pb-2 group max-md:w-full max-md:mt-8">
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="w-full bg-transparent font-sans border-none outline-none text-milk placeholder:text-milk/60 text-3xl font-extrabold focus:ring-0 max-md:text-xl"
                        />
                        <button type="submit" className="text-milk ml-4 cursor-pointer max-md:shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8 max-md:w-6 max-md:h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </button>
                    </div>
                </div>
                
                <br className='max-md:hidden'/>
                <br className='max-md:hidden'/>
                <br className='max-md:hidden'/>
                  
                <div className="copyright-box max-md:flex max-md:flex-col-reverse max-md:items-center max-md:gap-4 max-md:pb-10 max-md:mt-4 max-md:text-[10px]">
                    <p>Copyright © 2025 Spylt - All Rights Reserved</p>
                    <div className="flex item-center gap-7 z-1000">
                        <p className='cursor-pointer hover:text-white/40'>Privacy Policy</p>
                        <p className='cursor-pointer hover:text-white/40'>Terms of Service</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Footersection