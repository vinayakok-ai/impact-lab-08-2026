import React from 'react';
import {Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {CLOSING_LINE, CREDIT, ROBOT_NAME} from '../config';
import {DIM, INK, SANS, Stage} from '../ui';

// Scene 6 · 0:51–1:00 — the close: the real face, then the lockup.
export const SceneClose: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const faceIn = spring({frame: frame - 5, fps, config: {damping: 15}, durationInFrames: 40});
  const logoIn = spring({frame: frame - 60, fps, config: {damping: 15}});
  const tagIn = interpolate(frame, [90, 110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const creditIn = interpolate(frame, [120, 140], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <Stage duration={duration} bg="#0b0f13">
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40}}>
        <div
          style={{
            borderRadius: 24,
            overflow: 'hidden',
            boxShadow: '0 24px 70px rgba(0,0,0,0.6), 0 0 0 10px rgba(255,255,255,0.05)',
            transform: `scale(${Math.max(0, faceIn)})`,
          }}
        >
          <Img src={staticFile('photo-head.jpg')} style={{width: 560, display: 'block'}} />
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
        <div style={{fontFamily: SANS, fontSize: 40, color: DIM, opacity: tagIn, marginTop: -14}}>
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
