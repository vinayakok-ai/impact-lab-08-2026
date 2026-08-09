// Final name is not decided yet — swap between 'DUO' and 'Mitra' here.
export const ROBOT_NAME = 'DUO';
export const TAGLINE = 'Your rehab. Your partner.';
export const CLOSING_LINE = 'A companion that reduces isolation.';
export const CREDIT = 'BUILT AT CLAUDE IMPACT LAB · AUGUST 2026';

export const FPS = 30;

// Scene boundaries in frames (must stay in sync with SCENES below).
export const SCENES = {
  world: {from: 0, duration: 240}, // 0:00–0:08
  games: {from: 240, duration: 270}, // 0:08–0:17
  turn: {from: 510, duration: 300}, // 0:17–0:27
  reveal: {from: 810, duration: 390}, // 0:27–0:40
  montage: {from: 1200, duration: 330}, // 0:40–0:51
  close: {from: 1530, duration: 270}, // 0:51–1:00
};

export const TOTAL_FRAMES = 1800;
