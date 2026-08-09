import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';

export type Emotion = 'happy' | 'excited' | 'focused' | 'cheering' | 'surprised';

const YELLOW = '#e0a422';
const BODY = '#efece6';
const SCREEN = '#0a0d10';
const BEZEL = '#2c3237';

// Eye + mouth shapes per emotion, drawn on the phone screen.
const Face: React.FC<{emotion: Emotion; blink: number}> = ({emotion, blink}) => {
  const eyeH = 44 * blink;
  const eye = (dx: number) => {
    switch (emotion) {
      case 'focused':
        return (
          <div
            style={{
              width: 40,
              height: Math.max(6, eyeH * 0.55),
              borderRadius: 10,
              background: '#fff',
              transform: `translateX(${dx}px)`,
            }}
          />
        );
      case 'cheering':
        // happy closed arcs
        return (
          <div
            style={{
              width: 40,
              height: 20,
              borderRadius: '40px 40px 0 0',
              border: '7px solid #fff',
              borderBottom: 'none',
              boxSizing: 'border-box',
              transform: `translateX(${dx}px)`,
            }}
          />
        );
      case 'surprised':
        return (
          <div
            style={{
              width: 44,
              height: Math.max(6, 48 * blink),
              borderRadius: '50%',
              background: '#fff',
              transform: `translateX(${dx}px)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{width: 16, height: 16 * blink, borderRadius: '50%', background: SCREEN}} />
          </div>
        );
      default:
        return (
          <div
            style={{
              width: 38,
              height: Math.max(5, eyeH),
              borderRadius: '50%',
              background: '#fff',
              position: 'relative',
              transform: `translateX(${dx}px)`,
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 7,
                top: 8 * blink,
                width: 12,
                height: 12 * blink,
                borderRadius: '50%',
                background: SCREEN,
              }}
            />
          </div>
        );
    }
  };

  const mouth = () => {
    switch (emotion) {
      case 'excited':
      case 'cheering':
        return (
          <div
            style={{
              width: 46,
              height: 24,
              borderRadius: '0 0 46px 46px',
              background: '#fff',
            }}
          />
        );
      case 'focused':
        return <div style={{width: 26, height: 7, borderRadius: 4, background: '#fff'}} />;
      case 'surprised':
        return <div style={{width: 22, height: 26, borderRadius: '50%', border: '7px solid #fff', boxSizing: 'border-box'}} />;
      default:
        return (
          <div
            style={{
              width: 40,
              height: 18,
              borderRadius: '0 0 40px 40px',
              border: '7px solid #fff',
              borderTop: 'none',
              boxSizing: 'border-box',
            }}
          />
        );
    }
  };

  return (
    <>
      <div style={{display: 'flex', gap: 34, alignItems: 'center', height: 52}}>
        {eye(0)}
        {eye(0)}
      </div>
      <div style={{marginTop: 10, display: 'flex', justifyContent: 'center'}}>{mouth()}</div>
    </>
  );
};

export const Robot: React.FC<{
  scale?: number;
  emotion?: Emotion;
  // extra rotation of the whole body, for playful leans
  lean?: number;
}> = ({scale = 1, emotion = 'happy', lean = 0}) => {
  const frame = useCurrentFrame();

  // Blink: fully open except a quick close every ~3.5s.
  const cycle = frame % 105;
  const blink =
    cycle > 96 && cycle < 103
      ? interpolate(cycle, [96, 99, 103], [1, 0.06, 1])
      : 1;

  const boing = Math.sin(frame / 9) * 5;

  return (
    <div
      style={{
        transform: `scale(${scale}) rotate(${lean}deg)`,
        transformOrigin: 'bottom center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* antennae */}
      <div style={{display: 'flex', gap: 150, marginBottom: -10}}>
        {[-1, 1].map((dir) => (
          <div key={dir} style={{position: 'relative', width: 8, height: 64, transform: `rotate(${10 * dir}deg)`}}>
            <div style={{position: 'absolute', inset: 0, background: '#23282c', borderRadius: 4}} />
            <div
              style={{
                position: 'absolute',
                top: -26 + (dir === 1 ? boing : -boing) * 0.6,
                left: -8,
                width: 26,
                height: 26,
                borderRadius: '50%',
                background: YELLOW,
                boxShadow: '0 0 18px rgba(224,164,34,0.55)',
              }}
            />
          </div>
        ))}
      </div>
      {/* phone head */}
      <div
        style={{
          width: 260,
          height: 132,
          background: SCREEN,
          border: `8px solid ${BEZEL}`,
          borderRadius: 28,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Face emotion={emotion} blink={blink} />
        {/* side ears */}
        <div style={{position: 'absolute', left: -26, top: 40, width: 20, height: 44, background: YELLOW, borderRadius: 8}} />
        <div style={{position: 'absolute', right: -26, top: 40, width: 20, height: 44, background: YELLOW, borderRadius: 8}} />
      </div>
      {/* neck */}
      <div style={{width: 38, height: 190, background: BODY, position: 'relative'}}>
        <div style={{position: 'absolute', top: 38, left: -6, right: -6, height: 22, background: YELLOW, borderRadius: 5}} />
        <div style={{position: 'absolute', bottom: 38, left: -6, right: -6, height: 22, background: YELLOW, borderRadius: 5}} />
      </div>
      {/* LEGO base */}
      <div
        style={{
          width: 180,
          height: 48,
          background: '#3a67b0',
          borderRadius: 10,
          position: 'relative',
        }}
      >
        <div style={{position: 'absolute', top: 12, left: 66, width: 48, height: 14, background: '#22406f', borderRadius: 4}} />
        {[-18, 150].map((x) => (
          <div
            key={x}
            style={{
              position: 'absolute',
              bottom: -22,
              left: x,
              width: 50,
              height: 50,
              borderRadius: '50%',
              background: '#171b1f',
              border: '8px solid #46525c',
              boxSizing: 'border-box',
              transform: `rotate(${frame * 2}deg)`,
            }}
          >
            <div style={{position: 'absolute', top: 2, left: '50%', width: 4, height: 12, background: '#46525c', marginLeft: -2}} />
          </div>
        ))}
      </div>
      <div style={{height: 26}} />
    </div>
  );
};
