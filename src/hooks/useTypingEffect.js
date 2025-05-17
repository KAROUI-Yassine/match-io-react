import { useState, useEffect } from 'react';

const useTypingEffect = (textToType, speed = 100, addCursor = false) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(addCursor);

  useEffect(() => {
    setDisplayedText(''); // Reset on textToType change
    if (!textToType) return;

    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < textToType.length) {
        setDisplayedText(prev => prev + textToType.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        if (addCursor) {
          // Blinking cursor logic
          const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
          }, 500); // Blink speed (from initTerminalEffect cursor blinking logic)
          return () => clearInterval(cursorInterval);
        }
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [textToType, speed, addCursor]);

  return addCursor ? (displayedText + (showCursor ? '_' : '')) : displayedText;
};

export default useTypingEffect;