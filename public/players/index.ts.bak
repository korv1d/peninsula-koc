import { PLAYER_NAMES } from '../constants/players';

/**
 * Canonical player name type
 * Derived from PLAYER_NAMES to prevent drift
 */
export type PlayerName = typeof PLAYER_NAMES[number];

/**
 * Canonical Player data model
 */
export interface Player {
    name: PlayerName;
    list: string;
    winrate: number;
    mostEnemiesKilled: number;
    greatestPointsDifference: number;
    highestScore: number;

    /* Optional derived / extended stats */
    mostPointsInRound?: number;
    shortestGame?: string | number;
    shortestTurn?: string | number;
}

/**
 * Runtime loader for player JSON files.
 * Uses public/players/*.json (Cloudflare-safe).
 */
export async function loadPlayers(): Promise<Player[]> {
    return Promise.all(
        PLAYER_NAMES.map(async name => {
            const res = await fetch(`/players/${name}.json`);
            if (!res.ok) {
                throw new Error(`Failed to load player ${name} (HTTP ${res.status})`);
            }
            return res.json() as Promise<Player>;
        })
    );
}
