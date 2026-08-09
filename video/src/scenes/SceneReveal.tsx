import React from 'react';
import {Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {ROBOT_NAME, TAGLINE} from '../config';
import {Caption, DIM, INK, SANS, Stage, YELLOW} from '../ui';

// Scene 4 · 0:27–0:40 — the reveal: the real robot, photo-first.
export const SceneReveal: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const cardIn = spring({frame: frame - 8, fps, config: {damping: 16}, durationInFrames: 45});
  // slow push-in on the photo for life
  const zoom = interpolate(frame, [0, duration], [1, 1.07]);

  const nameIn = spring({frame: frame - 165, fps, config: {damping: 14}});
  const tagIn = interpolate(frame, [200, 220], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <Stage duration={duration} bg="#0d1114">
      {/* warm spotlight */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 55%, rgba(224,164,34,0.16) 0%, transparent 55%)',
        }}
      />
      {/* the real robot, on a photo card */}
      <div
        style={{
          transform: `translateY(${interpolate(cardIn, [0, 1], [80, -30])}px) scale(${
            0.7 + cardIn * 0.3
          })`,
          opacity: Math.min(1, cardIn * 1.4),
        }}
      >
        <div
          style={{
            borderRadius: 26,
            overflow: 'hidden',
            boxShadow: '0 30px 90px rgba(0,0,0,0.6), 0 0 0 10px rgba(255,255,255,0.05)',
          }}
        >
          <Img
            src={staticFile('photo-hero.jpg')}
            style={{
              height: 780,
              display: 'block',
              transform: `scale(${zoom})`,
            }}
          />
        </div>
      </div>
      {/* name lockup */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          width: '100%',
          textAlign: 'center',
          transform: `scale(${Math.max(0, nameIn)})`,
        }}
      >
        <span
          style={{
            fontFamily: SANS,
            fontWeight: 800,
            fontSize: 84,
            letterSpacing: '0.14em',
            color: INK,
          }}
        >
          {ROBOT_NAME.toUpperCase()}
        </span>
        <span
          style={{
            fontFamily: SANS,
            fontSize: 36,
            letterSpacing: '0.1em',
            color: YELLOW,
            marginLeft: 26,
            opacity: tagIn,
          }}
        >
          {TAGLINE}
        </span>
      </div>
      <Caption
        appearAt={30}
        disappearAt={155}
        bottom={60}
        text={`That's why we built ${ROBOT_NAME} — a four-foot companion with a phone for a face, wheels under its feet, and one job: to be there.`}
      />
      {/* corner detail label, spec-sheet style */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          right: 80,
          fontFamily: SANS,
          fontSize: 24,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: DIM,
          opacity: interpolate(frame, [60, 80], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        phone head · pvc neck · lego base
      </div>
    </Stage>
  );
};
