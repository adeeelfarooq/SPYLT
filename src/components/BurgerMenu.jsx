import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const menuItems = [
  { name: "Shop", img: "/images/Burgermenu6.png" },
  { name: "Find In Stores", img: "/images/Burgermenu5.png" },
  { name: "About Us", img: "/images/Burgermenu4.png" },
  { name: "Tasty Talks", img: "/images/Burgermenu3.png"},
  { name: "Programs", img: "/images/Burgermenu2.png" },
  { name: "Contacts", img: "/images/Burgermenu1.png" }
];

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null); 
  
  const magneticWrapRef = useRef(null);
  const buttonRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const menuRef = useRef(null);

  const menuTextRefs = useRef([]);

  useGSAP(() => {
    gsap.set(menuRef.current, { yPercent: -100 });
  }, []);

  // 🧲 1. MAGNETIC HOVER LOGIC
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
      ease: "power3.out",
      force3D: true // OPTIMIZATION: Hardware Acceleration on
    });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)",
      force3D: true // OPTIMIZATION: GPU par snap back karega
    });
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  // 🚪 2. SHUTTER DROP & CROSS ANIMATION
  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, { yPercent: 0, duration: 1.8, ease: "power4.inOut", force3D: true });
      gsap.to(line1Ref.current, { y: 4.2, rotate: 45, scaleX: 0.42, duration: 1.2, ease: "power3.inOut", force3D: true });
      gsap.to(line2Ref.current, { y: -4.2, rotate: -45, scaleX: 0.42, duration: 1.2, ease: "power3.inOut", force3D: true });
    } else {
      gsap.to(menuRef.current, { yPercent: -100, duration: 1.8, ease: "power4.inOut", force3D: true });
      gsap.to(line1Ref.current, { y: 0, rotate: 0, scaleX: 1, duration: 1.2, ease: "power3.inOut", force3D: true });
      gsap.to(line2Ref.current, { y: 0, rotate: 0, scaleX: 1, duration: 1.2, ease: "power3.inOut", force3D: true });
      
      handleItemLeave(); 
    }
  }, [isOpen]);

  // 🚀 3. PERFORMANCE FIX: GSAP Text Hover Logic
  const handleItemEnter = (index) => {
    setHoveredIndex(index);
    menuTextRefs.current.forEach((el, i) => {
      if (i !== index) {
        gsap.to(el, { opacity: 0.1, duration: 0.4, ease: "power2.out", force3D: true });
      } else {
        gsap.to(el, { opacity: 1, duration: 0.4, ease: "power2.out", force3D: true });
      }
    });
  };

  const handleItemLeave = () => {
    setHoveredIndex(null);
    gsap.to(menuTextRefs.current, { opacity: 1, duration: 0.4, ease: "power2.out", force3D: true });
  };

  return (
    <>
      <div 
        ref={menuRef}
        // will-change: transform add kiya hai taake dropdown menu frame drops create na kare
        className="fixed top-0 left-0 w-full h-screen bg-milk z-[90] flex flex-row overflow-hidden transform-gpu will-change-transform"
      >
        {/* LEFT 50% */}
        <div className="w-1/2 h-full flex flex-col items-center justify-center relative">
          <ul className="text-dark-brown text-5xl md:text-7xl font-black uppercase text-left space-y-1 tracking-tighter w-max flex flex-col items-center">
            {menuItems.map((item, index) => (
              <li 
                key={index}
                ref={el => menuTextRefs.current[index] = el} 
                onMouseEnter={() => handleItemEnter(index)}
                onMouseLeave={handleItemLeave}
                className="cursor-pointer transform-gpu will-change-opacity" // Optimizing opacity changes
              >
                {item.name}
              </li>
            ))}
          </ul>

          <div className="absolute font-paragraph bottom-8 md:bottom-12 flex gap-6 md:gap-6 text-dark-brown text-[10px] md:text-sm cursor-pointer">
            <span>Youtube</span>
            <span>Instagram</span>
            <span>TikTok</span>
          </div>
        </div>

        {/* RIGHT 50% */}
        <div className="w-1/2 h-full relative overflow-hidden bg-black bg-cover" 
             style={{ backgroundImage: "url('/images/Burgermenu7.png')" }}
        >
          {menuItems.map((item, index) => (
            <div
              key={`img-${index}`}
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-out transform-gpu ${
                hoveredIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              style={{ willChange: 'opacity' }} // Layer allocation for container
            >
              <div
                className={`absolute inset-0 bg-white z-20 transition-opacity duration-300 ease-out pointer-events-none transform-gpu ${
                  hoveredIndex === index ? "opacity-0" : "opacity-100"
                }`}
                style={{ willChange: 'opacity' }} // Flash effect optimization
              ></div>
              
              <img
                src={item.img}
                alt={item.name}
                loading="lazy" // SAB SE BARA FIX 1: Menu load hote hi site ko hang nahi karega
                decoding="async" // SAB SE BARA FIX 2: Images main thread ke bajaye background mein decode hongi
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

      {/* SENSOR WRAPPER */}
      <div 
        ref={magneticWrapRef}
        className="fixed top-6 md:top-0 left-1/2 -translate-x-1/2 z-[100] p-8 cursor-pointer pointer-events-auto"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={toggleMenu}
      >
        <div 
          ref={buttonRef}
          className={`w-10 h-10 rounded-full flex flex-col items-center justify-center gap-[6px] transition-colors duration-500 transform-gpu ${
            isOpen ? 'bg-milk shadow-xl' : 'bg-transparent'
          }`}
          style={{ willChange: 'transform' }} // Magnetic button layer allocation
        >
          <div 
            ref={line1Ref} 
            className="w-10 h-[2px] origin-center transition-colors duration-500 transform-gpu"
            style={{ backgroundColor: 'rgba(92, 64, 51, 1)', willChange: 'transform' }} // Line rotation GPU fix
          ></div>
          
          <div 
            ref={line2Ref} 
            className="w-10 h-[2px] origin-center transition-colors duration-500 transform-gpu"
            style={{ backgroundColor: 'rgba(92, 64, 51, 1)', willChange: 'transform' }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default BurgerMenu;