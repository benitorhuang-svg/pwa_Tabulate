import type { Song } from "../../types/song";

export const starwars: Song = {
  id: "starwars",
  title: "Star Wars Main Theme",
  artist: "John Williams",
  notation: `
X:1
T:Star Wars
C:John Williams
M:4/4
L:1/8
Q:1/4=120
K:G
%%score (1 2)
%%indent 0
V:1
V:2
% --- Classical Guitar Arrangement ---
[V:1] D2 | G4 d4 | (3cBAG4 d2 | (3cBAG4 d2 | (3cBc A4 D2 |
[V:1] G4 d4 | (3cBAG4 d2 | (3cBAG4 d2 | (3cBc A4 d2 |
[V:1] e4 (3dcB | d4 (3cBA | c4 (3BAG | A6 D2 |
[V:1] G4 d4 | (3cBAG4 d2 | (3cBAG4 d2 | (3cBc A4 z2 |]
[V:2] D2 | G,4 D,4 | G,4 D,4 | G,4 D,4 | D,4 C,4 |
[V:2] G,4 D,4 | G,4 D,4 | G,4 D,4 | D,4 C,4 |
[V:2] C,4 G,,4 | D,4 A,,4 | E,4 B,,4 | D,6 D,2 |
[V:2] G,4 D,4 | G,4 D,4 | G,4 D,4 | D,4 G,,2 |]
  `,
};
