import type { Song } from "../../types/song";

export const pirates: Song = {
  id: "pirates",
  title: "He's a Pirate",
  artist: "Klaus Badelt",
  notation: `
X:1
T:He's a Pirate
C:Klaus Badelt
M:6/8
L:1/8
Q:1/4=160
K:Dm
%%score (1 2)
%%indent 0
V:1
V:2 
% --- Classical Guitar Arrangement ---
[V:1] z2 A, | D2 D D2 E | F2 F F2 G | E2 E E2 D |
[V:1] C2 D A,2 A, | D2 D D2 E | F2 F F2 G | E2 E E2 D |
[V:1] C2 D A,2 A | d2 d d2 e | f2 f f2 g | e2 e e2 d |
[V:1] c2 B A2 d | d2 A d2 e | f2 f f2 g | e2 e f2 d |
[V:1] "A7"A3 d2 z |]
[V:2] D3- | D3 D3 | D3 D3 | A,3 A,3 |
[V:2] D3 A,3 | D3 D3 | D3 D3 | A,3 A,3 |
[V:2] D3 A,2 z | D3 D3 | D3 D3 | A,3 A,3 |
[V:2] A,3 A,3 | D3 D3 | D3 D3 | A,3 D3 |
[V:2] A,3 D2 z |]
  `,
};
