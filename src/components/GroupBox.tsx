import React from 'react';
import PlayerCell from './PlayerCell';
import type { Group, Player, Standing } from '../types';

const CELLS_PER_GROUP = 4;

interface GroupBoxProps {
    group: Group;
    standings: Standing[];
    playersByName: Record<string, Player>;
}

/** A single colour-outlined group, holding four player cells in a 2x2 grid. */
const GroupBox: React.FC<GroupBoxProps> = ({
    group,
    standings,
    playersByName
}) => {
    // Pad to four so an undrawn group keeps the same layout.
    const cells = Array.from(
        { length: Math.max(CELLS_PER_GROUP, standings.length) },
        (_, i) => standings[i]
    );

    return (
        <section className="group-box" data-color={group.color}>
            <h2 className="group-box-title">{group.name}</h2>
            {cells.map((standing, idx) => (
                <PlayerCell
                    key={standing?.name ?? `empty-${idx}`}
                    standing={standing}
                    player={standing ? playersByName[standing.name] : undefined}
                />
            ))}
        </section>
    );
};

export default GroupBox;
