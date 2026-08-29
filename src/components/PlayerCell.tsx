import React from 'react';
import type { Player, Standing } from '../types';

interface PlayerCellProps {
    standing?: Standing;
    player?: Player;
}

/** One quarter of a group box: a player's name, army, record and score. */
const PlayerCell: React.FC<PlayerCellProps> = ({ standing, player }) => {
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
                <span className="player-cell-record" title="Wins-Ties-Losses">
                    {wins}-{ties}-{losses}
                </span>
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
