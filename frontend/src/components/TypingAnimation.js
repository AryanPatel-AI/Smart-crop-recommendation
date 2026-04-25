import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TypingAnimation = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const phrases = ['Patel & Co. Smart Farming Hub', 'Patel & Co. Limited'];

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      if (isDeleting) {
        // When deleting, we want to delete "Smart Farming Hub" and then type "Limited"
        // But the requirement says: "Patel & Co. Smart Farming Hub" -> erase "Smart Farming Hub" -> type "Limited"
        // This means "Patel & Co. " is constant in the transition.
        
        const constantPart = "Patel & Co. ";
        const dynamicPart = fullText.replace(constantPart, "");
        
        if (text === constantPart && i === 0) {
            // Finished deleting "Smart Farming Hub", now switch to next phrase
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            return;
        }

        setText(fullText.substring(0, text.length - 1));
        setTypingSpeed(50);
      } else {
        setText(fullText.substring(0, text.length + 1));
        setTypingSpeed(150);

        if (text === fullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <div className="inline-block min-h-[1.5em]">
      <span className="text-emerald-400 font-bold">{text}</span>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[3px] h-[1em] bg-emerald-400 ml-1 align-middle"
      >
        |
      </motion.span>
    </div>
  );
};

export default TypingAnimation;
