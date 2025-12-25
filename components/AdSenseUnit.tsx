import React, { useEffect, useRef } from 'react';
import { AdUnitProps } from '../types';
import { ADSENSE_ID } from '../constants';

const AdSenseUnit: React.FC<AdUnitProps> = ({ slot, format = 'auto', layout, layoutKey, style }) => {
  const adRef = useRef<HTMLModElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    // Reset initialized state if slot changes
    initialized.current = false;

    const pushAd = () => {
      if (initialized.current) return;
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        initialized.current = true;
        console.debug(`AdSense slot ${slot} initialized successfully.`);
      } catch (e) {
        console.error('AdSense push error:', e);
      }
    };

    /**
     * Using ResizeObserver is the professional way to handle "availableWidth=0" in React/SPAs.
     * It ensures the AdSense script only runs once the DOM element actually has a physical width.
     */
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        // AdSense fluid units strictly require at least 250px width.
        if (width >= 250 && !initialized.current) {
          pushAd();
          observer.disconnect();
        }
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
      
      // Immediate check in case it's already sized
      if (containerRef.current.offsetWidth >= 250) {
        pushAd();
        observer.disconnect();
      }
    }

    // Fallback timer (safety net)
    const timer = setTimeout(() => {
      if (!initialized.current && containerRef.current && containerRef.current.offsetWidth >= 250) {
        pushAd();
        observer.disconnect();
      }
    }, 1000);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [slot]);

  return (
    <div 
      ref={containerRef}
      className="w-full flex justify-center items-center my-4 bg-gaming-800/50 rounded-lg overflow-hidden relative min-h-[100px]"
      style={{ minWidth: '250px' }} // Ensure parent doesn't collapse
    >
        <div className="text-[10px] uppercase tracking-widest text-slate-500 absolute top-0 left-0 p-1 bg-gaming-900/50 z-10 pointer-events-none">
          Advertisement
        </div>
        <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ 
              display: 'block', 
              width: '100%', 
              minWidth: '250px', 
              minHeight: format === 'rectangle' ? '250px' : '100px',
              ...style 
            }}
            data-ad-client={ADSENSE_ID}
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive="true"
            data-ad-layout={layout}
            data-ad-layout-key={layoutKey}
        />
    </div>
  );
};

export default AdSenseUnit;