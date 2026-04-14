import type { Song } from "../types/song";
import { pirates } from "./songs/pirates";
import { starwars } from "./songs/starwars";

export type { Song };

export const songs: Song[] = [pirates, starwars];
