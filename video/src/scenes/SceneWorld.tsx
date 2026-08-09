import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Caption, DIM, INK, SANS, Stage} from '../ui';

// Scene 1 · 0:00–0:08 — "2020. The world stopped."
export const SceneWorld: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, duration], [1, 1.12]);
  const punch = interpolate(frame, [6, 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const subOpacity = interpolate(frame, [50, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <Stage duration={duration} bg="#07090b">
      <div style={{transform: `scale(${scale})`, textAlign: 'center'}}>
        <div
          style={{
            fontFamily: SANS,
            fontWeight: 800,
            fontSize: 300,
            letterSpacing: '0.06em',
            color: INK,
            opacity: punch,
            transform: `scale(${0.9 + punch * 0.1})`,
          }}
        >
          2020
        </div>
        <div
          style={{
            fontFamily: SANS,
            fontSize: 34,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: DIM,
            opacity: subOpacity,
            marginTop: 10,
          }}
        >
          the world went quiet
        </div>
      </div>
      {/* vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
        }}
      />
      <Caption
        appearAt={80}
        text="The world stopped. And for the first time, all of us learned what loneliness really feels like."
      />
    </Stage>
  );
};
