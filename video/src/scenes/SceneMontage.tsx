import React from 'react';
import {AbsoluteFill, interpolate, Sequence, useCurrentFrame} from 'remotion';
import {Emotion, Robot} from '../Robot';
import {Caption, DIM, GLOW, INK, SANS, Stage} from '../ui';

const Panel: React.FC<{
  label: string;
  emotion: Emotion;
  children?: React.ReactNode;
}> = ({label, emotion, children}) => {
  const frame = useCurrentFrame();
  const slideIn = interpolate(frame, [0, 12], [80, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill
      style={{
        background: '#10151a',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `translateX(${slideIn}px)`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 90,
          width: '100%',
          textAlign: 'center',
          fontFamily: SANS,
          fontSize: 34,
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: DIM,
        }}
      >
        {label}
      </div>
      <div style={{transform: 'translateY(60px)'}}>
        <Robot emotion={emotion} scale={1.15} lean={Math.sin(frame / 10) * 2} />
      </div>
      {children}
    </AbsoluteFill>
  );
};

const Person: React.FC<{x: number; walking?: boolean}> = ({x, walking}) => {
  const frame = useCurrentFrame();
  const bob = walking ? Math.sin(frame / 5) * 8 : 0;
  return (
    <div style={{position: 'absolute', left: x, bottom: 260, transform: `translateY(${bob}px)`}}>
      <div style={{width: 46, height: 46, borderRadius: '50%', background: '#2c3540', margin: '0 auto'}} />
      <div style={{width: 60, height: 150, borderRadius: '24px 24px 8px 8px', background: '#2c3540', marginTop: 8}} />
    </div>
  );
};

// Scene 5 · 0:40–0:51 — demo montage: Follow Me / Boxing Partner / Reaction Game.
export const SceneMontage: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  const third = Math.floor(duration / 3);

  return (
    <Stage duration={duration} bg="#10151a" fade>
      <Sequence from={0} durationInFrames={third} layout="none">
        <Panel label="follow me" emotion="happy">
          <Person x={1350} walking />
          {/* motion arrows */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 780 + i * 90,
                bottom: 340,
                fontSize: 60,
                color: GLOW,
                opacity: 0.25 + 0.75 * Math.abs(Math.sin(frame / 8 - i)),
                fontFamily: SANS,
              }}
            >
              →
            </div>
          ))}
        </Panel>
      </Sequence>

      <Sequence from={third} durationInFrames={third} layout="none">
        <Panel label="boxing partner" emotion="focused">
          <Person x={1330} />
          {/* boxing glove jabbing */}
          <div
            style={{
              position: 'absolute',
              left: 1230 - Math.abs(Math.sin((frame - third) / 6)) * 130,
              bottom: 430,
              width: 90,
              height: 76,
              background: '#c9403f',
              borderRadius: '38px 30px 26px 26px',
              boxShadow: 'inset -10px -8px 0 rgba(0,0,0,0.25)',
            }}
          />
        </Panel>
      </Sequence>

      <Sequence from={third * 2} durationInFrames={duration - third * 2} layout="none">
        <Panel label="reaction game" emotion="cheering">
          {/* colored targets, one lit at a time */}
          <div style={{position: 'absolute', top: 220, display: 'flex', gap: 34, left: '50%', transform: 'translateX(-50%)'}}>
            {['#d94f4f', '#58c470', '#4f8ed9', '#e0a422'].map((c, i) => {
              const lit = Math.floor((frame - third * 2) / 14) % 4 === i;
              return (
                <div
                  key={c}
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: '50%',
                    background: c,
                    opacity: lit ? 1 : 0.3,
                    boxShadow: lit ? `0 0 40px ${c}` : 'none',
                    transform: lit ? 'scale(1.25)' : 'scale(1)',
                  }}
                />
              );
            })}
          </div>
          {/* score toast */}
          <div
            style={{
              position: 'absolute',
              right: 220,
              top: 420,
              fontFamily: SANS,
              color: INK,
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.16)',
              borderRadius: 18,
              padding: '26px 44px',
              textAlign: 'center',
            }}
          >
            <div style={{fontSize: 76, fontWeight: 800, fontVariantNumeric: 'tabular-nums'}}>
              {Math.min(12, Math.floor((frame - third * 2) / 9))}
            </div>
            <div style={{fontSize: 22, letterSpacing: '0.24em', textTransform: 'uppercase', color: DIM}}>hits</div>
            <div style={{fontSize: 24, color: GLOW, marginTop: 10}}>"Beautiful reflexes!"</div>
          </div>
        </Panel>
      </Sequence>

      <Caption
        appearAt={10}
        text="It moves with you and turns rehab into play — cheering every rep, celebrating every win."
      />
    </Stage>
  );
};
