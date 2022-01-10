import React, {useRef, useEffect, useState} from 'react';
import gsap from 'gsap';

import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from 'splitting'

import './app.css';

export default function App() {

  const [splitting, setSplitting] = useState([]);

  const headerRef = useRef();
  const wrapperRef = useRef();

  useEffect(() => {
    if (headerRef) {

      // move the text up outside its container.
      gsap.set(headerRef.current, {yPercent: -103})
      // workaround.
      gsap.set(wrapperRef.current, {autoAlpha: 1})

      // initialize splitting.
      const results = Splitting({
        target: headerRef.current,
      });
      // update the state of splitting.
      setSplitting(results);
    }
  }, [headerRef]);

  useEffect(() => {
    // Check for empty splittings.
    if (splitting.length) {
      // total number of characters in headerRef.
      const totalChars = splitting[0].chars.length;
      const totalCharsCeiled = Math.ceil(totalChars / 2);

      // Animate each char from the splitting obj.
      splitting[0].chars.forEach((char, index) => {
        // Calculate so the middle chars have to higher value: bending effect.
        let delay = index < totalCharsCeiled ? index : totalCharsCeiled - Math.abs(totalCharsCeiled - (index)) - 1;
        // Optional calculation, we want to start from 1 and adds a 0.5 for the next value, so 1 -> 1.5,  2 -> 2 and so on...
        let calculatedDelay = delay - (delay/2) + 1;

        // animate the chars back down inside it's container.
        gsap.to(char, {
          duration: calculatedDelay - 0.4,
          yPercent: 103,
          ease: 'expo.out'
          });

      });
    }
  }, [splitting]);

  return (
    <div className="app">
      <div className='title-wrapper' ref={wrapperRef}>
      <h1 ref={headerRef} id='header-title'>PROMETHEAN</h1>
      </div>
      <p id='header-subtitle'>breathing life into your ideas</p>
    </div>
  );

}
