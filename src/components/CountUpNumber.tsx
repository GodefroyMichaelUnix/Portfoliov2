import React, { useEffect, useRef, useState } from 'react';
import { useInView, animate, useReducedMotion } from 'motion/react';

interface CountUpNumberProps {
  value: string | number;
  className?: string;
  duration?: number;
}

/**
 * Animated counter that smoothly counts from 0 to the target number
 * when entering the viewport. Handles prefixes (e.g. "+", "< ", "-"), 
 * suffixes (e.g. "%", "h", "s", "ms", " j"), and decimals (e.g. "99.9%").
 */
export const CountUpNumber: React.FC<CountUpNumberProps> = ({
  value,
  className = '',
  duration = 1.4
}) => {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-50px' });
  const rawString = String(value).trim();

  // Match pattern: optional non-numeric prefix, target number (integer or decimal), optional suffix
  // e.g. "-82%" -> prefix: "-", number: 82, suffix: "%"
  // e.g. "< 30s" -> prefix: "< ", number: 30, suffix: "s"
  // e.g. "99.9%" -> prefix: "", number: 99.9, suffix: "%"
  // e.g. "+120h" -> prefix: "+", number: 120, suffix: "h"
  // e.g. "164ms" -> prefix: "", number: 164, suffix: "ms"
  const match = rawString.match(/^([^\d.-]*)(-?\d+(?:\.\d+)?)(.*)$/);

  if (!match) {
    // If there is no numeric value to count, render the string directly
    return <span className={className}>{rawString}</span>;
  }

  const prefix = match[1] || '';
  const targetNum = parseFloat(match[2]);
  const suffix = match[3] || '';
  const isDecimal = match[2].includes('.');
  const decimalPlaces = isDecimal ? (match[2].split('.')[1]?.length || 1) : 0;

  const [displayValue, setDisplayValue] = useState<string>(
    `${prefix}0${isDecimal ? '.' + '0'.repeat(decimalPlaces) : ''}${suffix}`
  );

  useEffect(() => {
    if (!isInView || isNaN(targetNum)) return;

    const controls = animate(0, targetNum, {
      duration: reduced ? 0 : duration,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo-like curve
      onUpdate: (latest) => {
        const formattedNum = isDecimal
          ? latest.toFixed(decimalPlaces)
          : Math.round(latest).toString();
        setDisplayValue(`${prefix}${formattedNum}${suffix}`);
      }
    });

    return () => controls.stop();
  }, [isInView, targetNum, prefix, suffix, isDecimal, decimalPlaces, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
};
