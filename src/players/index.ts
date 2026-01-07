// src/players/index.ts
import Ayden from './Ayden.json';
import Ben from './Ben.json';
import DadMatt from './DadMatt.json';
import Emerson from './Emerson.json';
import MattG from './MattG.json';
import Francisco from './Francisco.json';
import Gabe from './Gabe.json';
import Ian from './Ian.json';
import James from './James.json';
import Keivahn from './Keivahn.json';
import Legend from './Legend.json';
import Logan from './Logan.json';
import Mitch from './Mitch.json';
import Nate from './Nate.json';
import Noah from './Noah.json';
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
    Ayden,
    Ben,
    DadMatt,
    Emerson,
    Francisco,
    Gabe,
    Ian,
    James,
    Keivahn,
    Legend,
    Logan,
    Mitch,
    MattG,
    Nate,
    Noah,
    Roman
};
