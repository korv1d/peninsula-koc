// src/players/index.ts
import Azrael from './Azrael.json';
import Balthasar from './Balthasar.json';
import Cypher from './Cypher.json';
import Dante from './Dante.json';
import Ezekiel from './Ezekiel.json';
import Fenris from './Fenris.json';
import Gideon from './Gideon.json';
import Horus from './Horus.json';

export interface Player {
    name: string;
    list: string;
    winrate: number;
    mostEnemiesKilled: number;
    greatestPointsDifference: number;
    highestScore: number;
}

export const players: Record<string, Player> = {
    Azrael,
    Balthasar,
    Cypher,
    Dante,
    Ezekiel,
    Fenris,
    Gideon,
    Horus,
};
