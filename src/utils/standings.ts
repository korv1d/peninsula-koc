import type { Group, GroupMatch, Standing } from '../types';

/** League points awarded per best-of-3 series result. */
export const POINTS_PER_WIN = 3;
export const POINTS_PER_TIE = 1;
export const POINTS_PER_LOSS = 0;
/** League points awarded per individual game won within a series. */
export const POINTS_PER_GAME_WIN = 1;

/** A 0-0 series has not been played yet and contributes nothing. */
export function isPlayed(match: GroupMatch): boolean {
    return match.p1Games !== 0 || match.p2Games !== 0;
}

/**
 * Derives each group member's game win-tie-loss record (games won/lost summed
 * across all their played series) and league score (points per series result,
 * plus a point per individual game won) from the group's played series.
 * Sorted by score, then wins, then name.
 */
export function computeStandings(group: Group): Standing[] {
    const table = new Map<string, Standing>(
        group.players.map(name => [
            name,
            { name, wins: 0, ties: 0, losses: 0, score: 0 }
        ])
    );
    const seriesRecord = new Map<string, { wins: number; ties: number; losses: number }>(
        group.players.map(name => [name, { wins: 0, ties: 0, losses: 0 }])
    );

    for (const match of group.matches) {
        if (!isPlayed(match)) continue;

        const p1 = table.get(match.p1);
        const p2 = table.get(match.p2);
        if (!p1 || !p2) {
            if (import.meta.env.DEV) {
                console.warn(
                    `[standings] ${group.name}: match "${match.p1} vs ${match.p2}" ` +
                        'references a player outside the group roster'
                );
            }
            continue;
        }

        // Games record: each player's total games won/lost across the season.
        p1.wins += match.p1Games;
        p1.losses += match.p2Games;
        p2.wins += match.p2Games;
        p2.losses += match.p1Games;

        // Series record: drives league score, kept separate from games above.
        const s1 = seriesRecord.get(match.p1)!;
        const s2 = seriesRecord.get(match.p2)!;
        if (match.p1Games === match.p2Games) {
            p1.ties += 1;
            p2.ties += 1;
            s1.ties += 1;
            s2.ties += 1;
        } else if (match.p1Games > match.p2Games) {
            s1.wins += 1;
            s2.losses += 1;
        } else {
            s2.wins += 1;
            s1.losses += 1;
        }
    }

    const standings = [...table.values()];
    for (const s of standings) {
        const series = seriesRecord.get(s.name)!;
        s.score =
            series.wins * POINTS_PER_WIN +
            series.ties * POINTS_PER_TIE +
            series.losses * POINTS_PER_LOSS +
            s.wins * POINTS_PER_GAME_WIN;
    }

    return standings.sort(
        (a, b) =>
            b.score - a.score ||
            b.wins - a.wins ||
            a.name.localeCompare(b.name)
    );
}
