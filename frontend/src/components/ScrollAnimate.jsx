import React from 'react';
import { motion } from 'framer-motion';

/**
 * A reusable scroll animation wrapper utilizing Framer Motion.
 * It animates child elements when they enter the viewport.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Elements to animate
 * @param {string} [props.direction='up'] - Direction of entry ('up', 'down', 'left', 'right', 'fade')
 * @param {number} [props.delay=0] - Delay before animation starts (seconds)
 * @param {number} [props.duration=0.6] - Duration of the animation transition (seconds)
 * @param {number} [props.distance=50] - Distance offset in pixels
 * @param {boolean} [props.once=true] - Trigger animation only once
 */
const ScrollAnimate = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 50,
  once = true
}) => {
  const getVariants = () => {
    switch (direction) {
      case 'up':
        return {
          hidden: { y: distance, opacity: 0 },
          visible: { y: 0, opacity: 1 }
        };
      case 'down':
        return {
          hidden: { y: -distance, opacity: 0 },
          visible: { y: 0, opacity: 1 }
        };
      case 'left':
        return {
          hidden: { x: distance, opacity: 0 },
          visible: { x: 0, opacity: 1 }
        };
      case 'right':
        return {
          hidden: { x: -distance, opacity: 0 },
          visible: { x: 0, opacity: 1 }
        };
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
      default:
        return {
          hidden: { y: distance, opacity: 0 },
          visible: { y: 0, opacity: 1 }
        };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      variants={getVariants()}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimate;
