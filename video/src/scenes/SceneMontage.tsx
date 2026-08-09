import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {Caption, DIM, GLOW, INK, SANS, Stage} from '../ui';

// One demo cut: the real photo on a card, label above.
const Panel: React.FC<{label: string; photo: string; children?: React.ReactNode}> = ({
  label,
  photo,
  children,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const cardIn = spring({frame, fps, config: {damping: 18}, durationInFrames: 30});
  const zoom = interpolate(frame, [0, 120], [1, 1.06], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{background: '#10151a', alignItems: 'center', justifyContent: 'center'}}>
      <div
        style={{
          position: 'absolute',
          top: 84,
          width: '100%',
          textAlign: 'center',
          fontFamily: SANS,
          fontSize: 36,
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: DIM,
          opacity: cardIn,
        }}
      >
        {label}
      </div>
      <div
        style={{
          marginTop: -20,
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: '0 26px 80px rgba(0,0,0,0.6), 0 0 0 10px rgba(255,255,255,0.05)',
          transform: `translateY(${interpolate(cardIn, [0, 1], [70, 0])}px) scale(${
            0.85 + cardIn * 0.15
          })`,
          opacity: Math.min(1, cardIn * 1.4),
        }}
      >
        <Img
          src={staticFile(photo)}
          style={{height: 640, display: 'block', transform: `scale(${zoom})`}}
        />
      </div>
      {children}
    </AbsoluteFill>
  );
};

// Scene 5 · 0:40–0:51 — demo montage with the real footage stills.
export const SceneMontage: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  const third = Math.floor(duration / 3);

  return (
    <Stage duration={duration} bg="#10151a" fade>
      <Sequence from={0} durationInFrames={third} layout="none">
        <Panel label="follow me" photo="photo-follow.jpg" />
      </Sequence>

      <Sequence from={third} durationInFrames={third} layout="none">
        <Panel label="boxing partner" photo="photo-boxing.jpg" />
      </Sequence>

      <Sequence from={third * 2} durationInFrames={duration - third * 2} layout="none">
        <Panel label="reaction game" photo="photo-reaction.jpg">
          {/* score toast over the photo card */}
          <div
            style={{
              position: 'absolute',
              right: 200,
              top: 300,
              fontFamily: SANS,
              color: INK,
              background: 'rgba(10,13,16,0.78)',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: 18,
              padding: '22px 40px',
              textAlign: 'center',
            }}
          >
            <div style={{fontSize: 68, fontWeight: 800, fontVariantNumeric: 'tabular-nums'}}>
              {Math.min(12, Math.floor((frame - third * 2) / 9))}
            </div>
            <div style={{fontSize: 20, letterSpacing: '0.24em', textTransform: 'uppercase', color: DIM}}>
              hits
            </div>
            <div style={{fontSize: 22, color: GLOW, marginTop: 8}}>"Beautiful reflexes!"</div>
          </div>
        </Panel>
      </Sequence>

      <Caption
        appearAt={10}
        text="It moves with you and turns rehab into play — follow-me walks, boxing rounds, reaction games."
      />
    </Stage>
  );
};
