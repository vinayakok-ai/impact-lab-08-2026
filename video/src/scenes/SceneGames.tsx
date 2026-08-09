import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Caption, DIM, SANS, Stage} from '../ui';

const Bean: React.FC<{
  color: string;
  x: number;
  y: number;
  scale: number;
  flip?: boolean;
  drift: number;
  wobble: number;
}> = ({color, x, y, scale, flip, drift, wobble}) => (
  <div
    style={{
      position: 'absolute',
      left: `${x}%`,
      top: `${y}%`,
      transform: `translate(${drift}px, ${Math.sin(wobble) * 14}px) scale(${scale}) ${
        flip ? 'scaleX(-1)' : ''
      } rotate(${Math.sin(wobble * 0.7) * 8}deg)`,
    }}
  >
    <div
      style={{
        width: 110,
        height: 136,
        borderRadius: '52px 52px 32px 32px',
        background: color,
        position: 'relative',
        boxShadow: 'inset -14px -10px 0 rgba(0,0,0,0.22)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 26,
          left: '52%',
          width: 62,
          height: 38,
          background: 'rgba(210,235,255,0.9)',
          borderRadius: 22,
          boxShadow: 'inset 0 6px 0 rgba(255,255,255,0.7)',
        }}
      />
      {/* backpack */}
      <div
        style={{
          position: 'absolute',
          top: 34,
          left: -22,
          width: 26,
          height: 62,
          background: color,
          borderRadius: 10,
          filter: 'brightness(0.85)',
        }}
      />
    </div>
  </div>
);

// Scene 2 · 0:08–0:17 — "We found ways to play."
export const SceneGames: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, duration], [-60, 60]);

  const stars = [
    [8, 14], [24, 78], [38, 8], [55, 30], [66, 84], [78, 12], [90, 55], [95, 25],
    [15, 45], [45, 62], [85, 78], [60, 6],
  ];

  const captionOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <Stage duration={duration} bg="#0b1020">
      {stars.map(([x, y], i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${x}%`,
            top: `${y}%`,
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: '#cfd8dd',
            opacity: 0.4 + 0.6 * Math.abs(Math.sin(frame / 20 + i)),
          }}
        />
      ))}
      <Bean color="#d94f4f" x={16} y={26} scale={1.15} drift={drift} wobble={frame / 16} />
      <Bean color="#4f8ed9" x={44} y={48} scale={0.9} drift={-drift * 0.7} wobble={frame / 13 + 2} />
      <Bean color="#58c470" x={68} y={20} scale={1.25} flip drift={drift * 0.5} wobble={frame / 18 + 4} />
      <div
        style={{
          position: 'absolute',
          top: '13%',
          width: '100%',
          textAlign: 'center',
          fontFamily: SANS,
          fontSize: 30,
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: DIM,
          opacity: captionOpacity,
        }}
      >
        game night · every night
      </div>
      <Caption
        appearAt={16}
        text="So we got creative. Whole friendships lived inside tiny crewmates on a screen. We played through it — together, apart."
      />
    </Stage>
  );
};
