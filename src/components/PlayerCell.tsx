import React from 'react';
import type { Player, Standing } from '../types';
import type { OpponentResult } from '../utils/standings';

interface PlayerCellProps {
    standing?: Standing;
    player?: Player;
    matchResults?: OpponentResult[];
}

const MATCH_ICON: Record<OpponentResult['result'], string> = {
    win: '✓',
    loss: '✕',
    tie: '–',
    unplayed: ''
};

/** One quarter of a group box: a player's name, army, record and score. */
const PlayerCell: React.FC<PlayerCellProps> = ({
    standing,
    player,
    matchResults
}) => {
    if (!standing) {
        return <div className="player-cell player-cell-empty">—</div>;
    }

    const { name, wins, ties, losses, score } = standing;
    const hasList = Boolean(player?.list);

    return (
        <div className="player-cell" tabIndex={0}>
            <div className="player-cell-name">{name}</div>
            {player?.army && <div className="player-cell-army">{player.army}</div>}

            <div className="player-cell-stats">
                <div className="player-cell-record-group">
                    <span className="player-cell-record" title="Wins-Ties-Losses">
                        {wins}-{ties}-{losses}
                    </span>
                    {matchResults && (
                        <span className="player-cell-matches">
                            {matchResults.map(({ opponent, result }) => (
                                <span
                                    key={opponent}
                                    className={`match-box match-box-${result}`}
                                    title={
                                        result === 'unplayed'
                                            ? `Not yet played vs ${opponent}`
                                            : `${result} vs ${opponent}`
                                    }
                                >
                                    {MATCH_ICON[result]}
                                </span>
                            ))}
                        </span>
                    )}
                </div>
                <span className="player-cell-score">
                    {score} <span className="player-cell-score-label">pts</span>
                </span>
            </div>

            {hasList && (
                <div className="player-cell-list">
                    <pre>{player!.list}</pre>
                </div>
            )}
        </div>
    );
};

export default PlayerCell;
