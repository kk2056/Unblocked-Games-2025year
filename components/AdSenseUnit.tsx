import React, { useEffect, useRef } from 'react';
import { AdUnitProps } from '../types';
import { ADSENSE_ID } from '../constants';

const AdSenseUnit: React.FC<AdUnitProps> = ({ slot, format = 'auto', layout, layoutKey, style }) => {
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    // Avoid double push in StrictMode or re-renders
    if (initialized.current) return;

    // We use a timeout to ensure the DOM has fully rendered and calculated layout
    // before the AdSense script tries to measure the container.
    // This fixes the "availableWidth=0" error common in React.
    const timer = setTimeout(() => {
        if (adRef.current) {
            try {
                // @ts-ignore
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                initialized.current = true;
            } catch (e) {
                console.error('AdSense error:', e);
            }
        }
    }, 200);

    return () => clearTimeout(timer);
  }, [slot]);

  return (
    <div className="w-full flex justify-center items-center my-4 bg-gaming-800/50 rounded-lg overflow-hidden relative min-h-[100px]">
        <div className="text-[10px] uppercase tracking-widest text-slate-500 absolute top-0 left-0 p-1 bg-gaming-900/50 z-10 pointer-events-none">Advertisement</div>
        <ins
            ref={adRef}
            className="adsbygoogle"
            // Adding minWidth prevents "Fluid responsive ads must be at least 250px wide" error
            // when the container is initially collapsing or on very small screens.
            style={{ display: 'block', width: '100%', minWidth: '250px', ...style }}
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