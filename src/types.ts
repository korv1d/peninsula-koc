// Player and Tournament Types

export interface Player {
    name: string;
    list: string;
    /** Short faction/detachment label; empty until a list is submitted. */
    army: string;
    winrate: number;
    mostEnemiesKilled: number;
    greatestPointsDifference: number;
    highestScore: number;
}

export interface Match {
    player1?: string;
    player2?: string;
    winner?: string | null;
}

export interface Tournament {
    rounds: {
        matches: Match[];
    }[];
}

/** One best-of-3 series between two players in the same group. */
export interface GroupMatch {
    round: number;
    p1: string;
    p2: string;
    p1Games: number;
    p2Games: number;
}

export type GroupColor = 'blue' | 'red' | 'green';

export interface Group {
    id: string;
    name: string;
    color: GroupColor;
    players: string[];
    matches: GroupMatch[];
}

export interface GroupStageData {
    groups: Group[];
}

/** A player's computed round-robin position within their group. */
export interface Standing {
    name: string;
    wins: number;
    ties: number;
    losses: number;
    score: number;
}
