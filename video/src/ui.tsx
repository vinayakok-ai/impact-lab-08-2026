import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

export const FRAME_BG = '#101418';
export const INK = '#e8ecef';
export const DIM = '#8b949c';
export const YELLOW = '#e0a422';
export const GLOW = '#4fd8c8';

export const SANS =
  '"Avenir Next", "Segoe UI", "Helvetica Neue", Arial, sans-serif';
export const SERIF = 'Georgia, "Times New Roman", serif';

// Full-screen dark stage with fade-in/out at scene edges.
export const Stage: React.FC<{
  children: React.ReactNode;
  duration: number;
  bg?: string;
  fade?: boolean;
}> = ({children, duration, bg = FRAME_BG, fade = true}) => {
  const frame = useCurrentFrame();
  const opacity = fade
    ? interpolate(
        frame,
        [0, 14, duration - 14, duration],
        [0, 1, 1, 0],
        {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
      )
    : 1;
  return (
    <AbsoluteFill style={{background: bg}}>
      <AbsoluteFill style={{opacity, alignItems: 'center', justifyContent: 'center'}}>
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// The VO line, shown as an elegant caption near the bottom.
export const Caption: React.FC<{
  text: string;
  appearAt?: number;
  disappearAt?: number;
  bottom?: number;
}> = ({text, appearAt = 10, disappearAt, bottom = 70}) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [appearAt, appearAt + 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut =
    disappearAt === undefined
      ? 1
      : interpolate(frame, [disappearAt, disappearAt + 15], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
  const opacity = fadeIn * fadeOut;
  const y = interpolate(frame, [appearAt, appearAt + 18], [14, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        position: 'absolute',
        bottom,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          textAlign: 'center',
          fontFamily: SERIF,
          fontStyle: 'italic',
          fontSize: 40,
          lineHeight: 1.4,
          color: INK,
          textShadow: '0 2px 18px rgba(0,0,0,0.8)',
          padding: '0 60px',
        }}
      >
        {text}
      </div>
    </div>
  );
};
