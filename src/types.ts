// Player and Tournament Types

export interface Player {
    name: string;
    list: string;
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
