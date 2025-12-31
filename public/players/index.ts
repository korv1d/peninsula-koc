// src/players/index.ts
import Anthony from './Anthony.json';
import Ayden from './Ayden.json';
import Belisarius from './Belisarius.json';
import Ben from './Ben.json';
import Gabe from './Gabe.json';
import Ian from './Ian.json';
import Nate from './Nate.json';
import Roman from './Roman.json';

export interface Player {
    name: string;
    list: string;
    winrate: number;
    mostEnemiesKilled: number;
    greatestPointsDifference: number;
    highestScore: number;
}

export const players: Record<string, Player> = {
    Anthony,
    Ayden,
    Belisarius,
    Ben,
    Gabe,
    Ian,
    Nate,
    Roman,
};
