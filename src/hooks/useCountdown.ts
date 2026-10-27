import { useState, useEffect } from 'react';

export interface CountdownTime {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isExpired: boolean;
}

export function useCountdown(targetDateTimestamp?: number): CountdownTime {
  // Default to November 15th 23:59:59 of current year
  const getTarget = () => {
    if (targetDateTimestamp) return targetDateTimestamp;
    const now = new Date();
    const currentYear = now.getFullYear();
    let target = new Date(currentYear, 10, 15, 23, 59, 59).getTime(); // month is 0-indexed (10 = November)
    if (now.getTime() > target) {
      target = new Date(currentYear + 1, 10, 15, 23, 59, 59).getTime();
    }
    return target;
  };

  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
    isExpired: false
  });

  useEffect(() => {
    const target = getTarget();

    const calculate = () => {
      const now = Date.now();
      const distance = target - now;

      if (distance <= 0) {
        setTimeLeft({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00',
          isExpired: true
        });
        return;
      }

      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);

      const pad = (n: number) => String(n).padStart(2, '0');

      setTimeLeft({
        days: pad(d),
        hours: pad(h),
        minutes: pad(m),
        seconds: pad(s),
        isExpired: false
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDateTimestamp]);

  return timeLeft;
}
