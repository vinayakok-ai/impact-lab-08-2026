import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {ROBOT_NAME, TAGLINE} from '../config';
import {Emotion, Robot} from '../Robot';
import {Caption, DIM, INK, SANS, Stage, YELLOW} from '../ui';

// Scene 4 · 0:27–0:40 — the reveal: eyes open, pull back to full robot.
export const SceneReveal: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Start zoomed hard onto the face, pull back to full body.
  const pullBack = spring({
    frame: frame - 40,
    fps,
    config: {damping: 200},
    durationInFrames: 70,
  });
  const scale = interpolate(pullBack, [0, 1], [3.4, 1.05]);
  const ty = interpolate(pullBack, [0, 1], [340, 0]);

  // Emotion cycle after the pull-back, from the spec sheet.
  const emotions: Emotion[] = ['happy', 'excited', 'surprised', 'cheering'];
  const emotion =
    frame < 130 ? 'happy' : emotions[Math.floor((frame - 130) / 55) % emotions.length];

  const nameIn = spring({frame: frame - 150, fps, config: {damping: 14}});
  const tagIn = interpolate(frame, [185, 205], [0, 1], {
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
            'radial-gradient(ellipse at 50% 62%, rgba(224,164,34,0.14) 0%, transparent 55%)',
        }}
      />
      <div
        style={{
          transform: `translateY(${ty - 40}px) scale(${scale})`,
        }}
      >
        <Robot emotion={emotion} />
      </div>
      {/* name lockup */}
      <div
        style={{
          position: 'absolute',
          bottom: 110,
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
        appearAt={55}
        disappearAt={138}
        bottom={70}
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
          opacity: interpolate(frame, [120, 140], [0, 1], {
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
