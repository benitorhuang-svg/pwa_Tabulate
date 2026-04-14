import type { Song } from "../types/song";

export type { Song };

export const songs: Song[] = [
  {
    id: "demo-score",
    title: "樂譜架構測試",
    artist: "作曲家名稱",
    notation: `X:1
T:樂譜架構測試
C:作曲家
M:4/4
L:1/4
Q:1/4=120
K:C
| C D E F | G A B c | c B A G | F E D C |]`,
  },
];
