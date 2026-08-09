import React from 'react';
import {Audio, Composition, Sequence, staticFile} from 'remotion';
import {FPS, SCENES, TOTAL_FRAMES} from './config';
import {SceneClose} from './scenes/SceneClose';
import {SceneGames} from './scenes/SceneGames';
import {SceneMontage} from './scenes/SceneMontage';
import {SceneReveal} from './scenes/SceneReveal';
import {SceneTurn} from './scenes/SceneTurn';
import {SceneWorld} from './scenes/SceneWorld';

const VO: Record<keyof typeof SCENES, string> = {
  world: 'vo-world.mp3',
  games: 'vo-games.mp3',
  turn: 'vo-turn.mp3',
  reveal: 'vo-reveal.mp3',
  montage: 'vo-montage.mp3',
  close: 'vo-close.mp3',
};

const Video: React.FC = () => (
  <>
    {(Object.keys(SCENES) as (keyof typeof SCENES)[]).map((key) => (
      <Sequence key={`vo-${key}`} from={SCENES[key].from} durationInFrames={SCENES[key].duration}>
        <Audio src={staticFile(VO[key])} />
      </Sequence>
    ))}
    <Sequence from={SCENES.world.from} durationInFrames={SCENES.world.duration}>
      <SceneWorld duration={SCENES.world.duration} />
    </Sequence>
    <Sequence from={SCENES.games.from} durationInFrames={SCENES.games.duration}>
      <SceneGames duration={SCENES.games.duration} />
    </Sequence>
    <Sequence from={SCENES.turn.from} durationInFrames={SCENES.turn.duration}>
      <SceneTurn duration={SCENES.turn.duration} />
    </Sequence>
    <Sequence from={SCENES.reveal.from} durationInFrames={SCENES.reveal.duration}>
      <SceneReveal duration={SCENES.reveal.duration} />
    </Sequence>
    <Sequence from={SCENES.montage.from} durationInFrames={SCENES.montage.duration}>
      <SceneMontage duration={SCENES.montage.duration} />
    </Sequence>
    <Sequence from={SCENES.close.from} durationInFrames={SCENES.close.duration}>
      <SceneClose duration={SCENES.close.duration} />
    </Sequence>
  </>
);

export const Root: React.FC = () => (
  <Composition
    id="ImpactLabVideo"
    component={Video}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={1920}
    height={1080}
  />
);
