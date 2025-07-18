'use client';

import { useState, useRef, useEffect } from 'react';

const PromoBar = () => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  
  // Mock data with added color schemes
  const coupons = [
    {
      id: 1,
      code: 'WELCOME50',
      description: '50% off on your first order',
      maxDiscount: '₹200',
      minOrder: '₹399',
      expiresIn: '2 days',
      colorClass: 'bg-gradient-to-r from-purple-500 to-indigo-600',
      textColor: 'text-white',
      labelColor: 'bg-purple-300 text-purple-800'
    },
    {
      id: 2,
      code: 'FLASH30',
      description: '30% off on all shoes',
      maxDiscount: '₹500',
      minOrder: '₹999',
      expiresIn: '12 hours',
      colorClass: 'bg-gradient-to-r from-yellow-400 to-orange-500',
      textColor: 'text-white',
      labelColor: 'bg-yellow-200 text-yellow-800'
    },
    {
      id: 3,
      code: 'WEEKEND20',
      description: '20% off on weekend shopping',
      maxDiscount: '₹350',
      minOrder: '₹799',
      expiresIn: '3 days',
      colorClass: 'bg-gradient-to-r from-green-400 to-teal-500',
      textColor: 'text-white',
      labelColor: 'bg-green-200 text-green-800'
    },
  ];
  
  // Check scroll position to show/hide arrows
  useEffect(() => {
    const checkScrollPosition = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
      }
    };
    
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollPosition);
      // Initial check
      checkScrollPosition();
      
      return () => {
        scrollContainer.removeEventListener('scroll', checkScrollPosition);
      };
    }
  }, []);
  
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  return (
    <section className="my-8">
      <h2 className="text-2xl font-display font-bold mb-4">Available Coupons</h2>
      
      <div className="relative px-12"> {/* Add horizontal padding to make room for buttons */}
        <div 
          className="flex items-stretch gap-3 overflow-x-auto pb-4 scrollbar-none"
          ref={scrollRef}
        >
          {coupons.map((coupon) => (
            <div key={coupon.id} className="min-w-52 max-w-56 flex-shrink-0">
              <div className={`rounded-lg shadow-md overflow-hidden ${coupon.colorClass}`}>
                <div className="p-3 flex justify-between items-stretch">
                  <div className="flex-1">
                    <div className={`text-xs font-bold px-1.5 py-0.5 rounded-full inline-block mb-1 ${coupon.labelColor}`}>New</div>
                    <div className={`text-lg font-bold mb-0.5 ${coupon.textColor}`}>{coupon.code}</div>
                    <div className={`text-xs mb-1 ${coupon.textColor} opacity-90`}>{coupon.description}</div>
                    <div className={`text-xs ${coupon.textColor} opacity-80`}>
                      Max: {coupon.maxDiscount} | Min: {coupon.minOrder}
                    </div>
                  </div>
                  
                  <div className="relative ml-2">
                    {/* Dotted line separator */}
                    <div className="absolute left-0 top-0 bottom-0 border-l border-dashed border-white border-opacity-40"></div>
                    
                    <div className="pl-2 flex flex-col justify-between h-full">
                      <button className="bg-white hover:bg-opacity-90 text-gray-800 px-2 py-1 rounded-full text-xs font-bold transition-colors">
                        Apply
                      </button>
                      <div className={`text-xs ${coupon.textColor} opacity-90 mt-1`}>
                        Expires: {coupon.expiresIn}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation buttons positioned outside the scroll area */}
        {showLeftArrow && (
          <button 
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 glass rounded-full flex items-center justify-center z-10 opacity-80 hover:opacity-100 shadow-lg"
            onClick={() => scroll('left')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        )}
        
        {showRightArrow && (
          <button 
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 glass rounded-full flex items-center justify-center z-10 opacity-80 hover:opacity-100 shadow-lg"
            onClick={() => scroll('right')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
};

export default PromoBar;