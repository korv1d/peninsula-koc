import type { Group, GroupMatch, Standing } from '../types';

/** League points awarded per best-of-3 series result. */
export const POINTS_PER_WIN = 3;
export const POINTS_PER_TIE = 1;
export const POINTS_PER_LOSS = 0;

/** A 0-0 series has not been played yet and contributes nothing. */
export function isPlayed(match: GroupMatch): boolean {
    return match.p1Games !== 0 || match.p2Games !== 0;
}

/**
 * Derives each group member's win-tie-loss record and league score from the
 * group's played series. Sorted by score, then wins, then name.
 */
export function computeStandings(group: Group): Standing[] {
    const table = new Map<string, Standing>(
        group.players.map(name => [
            name,
            { name, wins: 0, ties: 0, losses: 0, score: 0 }
        ])
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

        // Best-of-3, so an equal game count is a drawn series.
        if (match.p1Games === match.p2Games) {
            p1.ties += 1;
            p2.ties += 1;
        } else if (match.p1Games > match.p2Games) {
            p1.wins += 1;
            p2.losses += 1;
        } else {
            p2.wins += 1;
            p1.losses += 1;
        }
    }

    const standings = [...table.values()];
    for (const s of standings) {
        s.score =
            s.wins * POINTS_PER_WIN +
            s.ties * POINTS_PER_TIE +
            s.losses * POINTS_PER_LOSS;
    }

    return standings.sort(
        (a, b) =>
            b.score - a.score ||
            b.wins - a.wins ||
            a.name.localeCompare(b.name)
    );
}
