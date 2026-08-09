import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Caption, GLOW, INK, SANS, Stage} from '../ui';

// Scene 3 · 0:17–0:27 — the emotional pivot.
export const SceneTurn: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  const lineIn = interpolate(frame, [70, 95], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const emIn = interpolate(frame, [110, 130], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <Stage duration={duration} bg="#0c1116">
      {/* window */}
      <div
        style={{
          position: 'absolute',
          left: '11%',
          top: '12%',
          width: '30%',
          height: '76%',
          border: '10px solid #3a4650',
          borderRadius: 10,
          background: 'linear-gradient(180deg, #26313a 0%, #182028 100%)',
        }}
      >
        <div style={{position: 'absolute', left: '50%', top: 0, bottom: 0, width: 10, background: '#3a4650', marginLeft: -5}} />
        <div style={{position: 'absolute', top: '50%', left: 0, right: 0, height: 10, background: '#3a4650', marginTop: -5}} />
        {/* passers-by outside: small silhouettes crossing */}
        {[0, 1, 2].map((i) => {
          const x = ((frame * (1.1 + i * 0.5) + i * 260) % 130) - 15;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                bottom: '8%',
                left: `${x}%`,
                width: 20,
                height: 56,
                background: '#0e141a',
                borderRadius: '10px 10px 3px 3px',
                opacity: 0.9,
              }}
            />
          );
        })}
      </div>
      {/* figure at the window, inside */}
      <div
        style={{
          position: 'absolute',
          left: '19%',
          bottom: '13%',
          width: '9%',
          height: '29%',
          background: '#05070a',
          borderRadius: '46% 46% 12px 12px',
        }}
      />
      {/* the key line */}
      <div
        style={{
          position: 'absolute',
          right: '8%',
          top: '38%',
          width: '44%',
          fontFamily: SANS,
          fontWeight: 600,
          fontSize: 58,
          lineHeight: 1.35,
          color: INK,
        }}
      >
        <span style={{opacity: lineIn}}>
          For millions with limited mobility,
          <br />
        </span>
        <span style={{opacity: emIn, color: GLOW}}>lockdown never ended.</span>
      </div>
      <Caption
        appearAt={14}
        text="Then the world reopened… for most of us. For millions, that isolation was never a lockdown. It's just — every day."
      />
    </Stage>
  );
};
