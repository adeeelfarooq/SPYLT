import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';


// Menu Items and Placeholder Images
const menuItems = [
  { name: "Shop", img: "/images/Contact.webp" },
  { name: "Find In Stores", img: "/images/modelss.jpg" },
  { name: "About Us", img: "/images/racing.jpg" },
  { name: "Tasty Talks", img: "/images/aboutus.jpg", scale: "scale-110" },
  { name: "Program", img: "/images/cnt.webp" },
  { name: "Contacts", img: "/images/cnt.webp" }
];

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null); 
  
  const magneticWrapRef = useRef(null);
  const buttonRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const menuRef = useRef(null);

  // Array of refs for direct GSAP manipulation (Removes React re-render lag)
  const menuTextRefs = useRef([]);

  useGSAP(() => {
    gsap.set(menuRef.current, { yPercent: -100 });
  }, []);

  // 🧲 1. MAGNETIC HOVER LOGIC (Spylt.com style)
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const rect = magneticWrapRef.current.getBoundingClientRect();
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distX = clientX - centerX;
    const distY = clientY - centerY;

    gsap.to(buttonRef.current, {
      x: distX * 0.4,
      y: distY * 0.4,
      duration: 0.5,
      ease: "power3.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)" 
    });
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  // 🚪 2. SHUTTER DROP & CROSS ANIMATION
  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, { yPercent: 0, duration: 1.8, ease: "power4.inOut" });
      gsap.to(line1Ref.current, { y: 4.2, rotate: 45, scaleX: 0.42, duration: 1.2, ease: "power3.inOut" });
      gsap.to(line2Ref.current, { y: -4.2, rotate: -45, scaleX: 0.42, duration: 1.2, ease: "power3.inOut" });
    } else {
      gsap.to(menuRef.current, { yPercent: -100, duration: 1.8, ease: "power4.inOut" });
      gsap.to(line1Ref.current, { y: 0, rotate: 0, scaleX: 1, duration: 1.2, ease: "power3.inOut" });
      gsap.to(line2Ref.current, { y: 0, rotate: 0, scaleX: 1, duration: 1.2, ease: "power3.inOut" });
      
      // Reset hover state immediately when menu closes
      handleItemLeave(); 
    }
  }, [isOpen]);

  // 🚀 3. PERFORMANCE FIX: GSAP based Hover logic for Menu Items
  // Yeh lag khatam karta hai kyun ke ye React state ke bajaye DOM directly update karta hai
  const handleItemEnter = (index) => {
    setHoveredIndex(index);
    menuTextRefs.current.forEach((el, i) => {
      if (i !== index) {
        gsap.to(el, { opacity: 0.1, duration: 0.4, ease: "power2.out" });
      } else {
        gsap.to(el, { opacity: 1, duration: 0.4, ease: "power2.out" });
      }
    });
  };

  const handleItemLeave = () => {
    setHoveredIndex(null);
    gsap.to(menuTextRefs.current, { opacity: 1, duration: 0.4, ease: "power2.out" });
  };

  return (
    <>
      {/* ⬛ FULL SCREEN SHUTTER MENU (SPLIT 50/50) */}
      <div 
        ref={menuRef}
        className="fixed top-0 left-0 w-full h-screen bg-toyota-red-soft z-[90] flex flex-row overflow-hidden transform-gpu"
      >
        {/* LEFT 50% - MENU ITEMS & SOCIALS */}
        <div className="w-1/2 h-full flex flex-col items-center justify-center relative">
          <ul className="text-dark-brown text-5xl md:text-7xl font-black uppercase text-left space-y-6 tracking-tighter w-max flex flex-col items-center">
            {menuItems.map((item, index) => (
              <li 
                key={index}
                ref={el => menuTextRefs.current[index] = el} // Ref attach for GSAP
                onMouseEnter={() => handleItemEnter(index)}
                onMouseLeave={handleItemLeave}
                className="cursor-pointer transform-gpu will-change-transform"
                // transition classes hatadi gain hain kyun ke ab GSAP handle kar raha hai
              >
                {item.name}
              </li>
            ))}
          </ul>

          {/* SPYLT STYLE BOTTOM SOCIALS */}
          <div className="absolute font-paragraph bottom-8 md:bottom-12 flex gap-6 md:gap-6 text-white text-[10px] md:text-xs cursor-pointer  ">
            <span>Facebook</span>
            <span>Instagram</span>
            <span>TikTok</span>
          </div>
        </div>

        {/* RIGHT 50% - IMAGES (WITH FLASH & ZOOM OUT EFFECT) */}
        <div className="w-1/2 h-full relative overflow-hidden bg-black bg-cover bg-center  " 
        style={{ backgroundImage: "url('/images/Toyota1.avif')"  }}
        
        >
          {menuItems.map((item, index) => (
            <div
            
              key={`img-${index}`}
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-out transform-gpu ${
                hoveredIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {/* Flash Overlay Layer (White flash that fades out) */}
              <div
                className={`absolute inset-0 bg-white z-20 transition-opacity duration-300 ease-out pointer-events-none transform-gpu ${
                  hoveredIndex === index ? "opacity-0" : "opacity-100"
                }`}
              ></div>
              
              {/* Image (Zoom out logic fixed with hardware acceleration) */}
              <img
                src={item.img}
                alt={item.name}
                // transform-gpu aur will-change-transform se image scaling ka stutter 100% khatam hoga!
                className={`w-full h-full object-cover transition-transform duration-[0.8s] ease-[cubic-bezier(0.25,1,0.5,1)] transform-gpu will-change-transform 
                    ${
                  hoveredIndex === index 
                    ? (index === 3 ? "scale-100" : "scale-100")
                    : (index === 3 ? "scale-110" : "scale-110")}
                `}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 🧲 INVISIBLE SENSOR WRAPPER (Top Center Positioned) */}
      <div 
        ref={magneticWrapRef}
        className="fixed top-6 md:top-0 left-1/2 -translate-x-1/2 z-[100] p-8 cursor-pointer pointer-events-auto"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={toggleMenu}
      >
        {/* 🍔 THE ACTUAL BUTTON */}
        <div 
          ref={buttonRef}
          className={`w-14 h-14 rounded-full flex flex-col items-center justify-center gap-[6px] transition-colors duration-500 transform-gpu ${
            isOpen ? 'bg-white shadow-xl' : 'bg-transparent'
          }`}
        >
          {/* Burger Line 1 (toyota-red/60 applied via rgba) */}
          <div 
            ref={line1Ref} 
            className="w-10 h-[2px] origin-center transition-colors duration-500 transform-gpu"
            style={{ backgroundColor: 'rgba(235, 10, 30, 0.6)' }}
          ></div>
          
          {/* Burger Line 2 (toyota-red/60 applied via rgba) */}
          <div 
            ref={line2Ref} 
            className="w-10 h-[2px] origin-center transition-colors duration-500 transform-gpu"
            style={{ backgroundColor: 'rgba(235, 10, 30, 0.6)' }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default BurgerMenu;