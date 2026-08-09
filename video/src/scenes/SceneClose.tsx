import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {CLOSING_LINE, CREDIT, ROBOT_NAME} from '../config';
import {Robot} from '../Robot';
import {DIM, INK, SANS, Stage} from '../ui';

// Scene 6 · 0:51–1:00 — the close.
export const SceneClose: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Robot rolls in from the left and stops center.
  const rollIn = spring({frame, fps, config: {damping: 200}, durationInFrames: 60});
  const x = interpolate(rollIn, [0, 1], [-900, 0]);

  const logoIn = spring({frame: frame - 75, fps, config: {damping: 15}});
  const tagIn = interpolate(frame, [100, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const creditIn = interpolate(frame, [130, 150], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <Stage duration={duration} bg="#0b0f13">
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30}}>
        <div style={{transform: `translateX(${x}px)`}}>
          <Robot emotion={frame > 200 ? 'cheering' : 'happy'} scale={0.92} />
        </div>
        <div
          style={{
            fontFamily: SANS,
            fontWeight: 800,
            fontSize: 96,
            letterSpacing: '0.14em',
            color: INK,
            transform: `scale(${Math.max(0, logoIn)})`,
          }}
        >
          {ROBOT_NAME.toUpperCase()}
          <span style={{fontWeight: 500, fontSize: 48, color: DIM, letterSpacing: '0.08em'}}> / मित्र</span>
        </div>
        <div
          style={{
            fontFamily: SANS,
            fontSize: 40,
            color: DIM,
            opacity: tagIn,
          }}
        >
          {CLOSING_LINE}
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 56,
          width: '100%',
          textAlign: 'center',
          fontFamily: SANS,
          fontSize: 24,
          letterSpacing: '0.3em',
          color: '#5a646c',
          opacity: creditIn,
        }}
      >
        {CREDIT}
      </div>
    </Stage>
  );
};
