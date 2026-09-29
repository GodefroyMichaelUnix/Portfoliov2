import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

type TiltCardProps = HTMLMotionProps<'div'> & { max?: number };

export const TiltCard: React.FC<TiltCardProps> = ({ children, className = '', max: _max, ...rest }) => (
  <motion.div className={className} {...rest}>
    {children as React.ReactNode}
  </motion.div>
);
