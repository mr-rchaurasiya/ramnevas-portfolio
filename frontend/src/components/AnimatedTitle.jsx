import React from 'react';
import { motion } from 'framer-motion';

const AnimatedTitle = ({ text, className = "section-title text-white" }) => {
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const wordVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.025,
      },
    },
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 12,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.35,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.h2 
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: className.includes('text-center') || className.includes('section-title') ? 'center' : 'flex-start' }}
    >
      {words.map((word, wordIdx) => (
        <motion.span 
          key={wordIdx} 
          variants={wordVariants}
          style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.28em' }}
        >
          {word.split("").map((char, charIdx) => (
            <motion.span 
              key={charIdx} 
              variants={letterVariants} 
              style={{ display: 'inline-block' }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </motion.h2>
  );
};

export default AnimatedTitle;
