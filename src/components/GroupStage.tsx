import React, { useEffect, useState } from 'react';
import GroupBox from './GroupBox';
import { PLAYER_NAMES } from '../constants/players';
import { computeStandings } from '../utils/standings';
import type { Group, GroupStageData, Player } from '../types';
import './GroupStage.css';

/**
 * The main-page group stage: one box per round-robin group. Group membership and
 * results come from /groups.json, army lists from /players/<Name>.json.
 */
const GroupStage: React.FC = () => {
    const [groups, setGroups] = useState<Group[] | null>(null);
    const [playersByName, setPlayersByName] = useState<Record<string, Player>>(
        {}
    );

    useEffect(() => {
        fetch('/groups.json')
            .then(res => (res.ok ? res.json() : null))
            .then((data: GroupStageData | null) => setGroups(data?.groups ?? []))
            .catch(() => setGroups([]));
    }, []);

    // A missing player file degrades that cell rather than blanking the page.
    useEffect(() => {
        Promise.all(
            PLAYER_NAMES.map(name =>
                fetch(`/players/${name}.json`)
                    .then(res => (res.ok ? res.json() : null))
                    .then(data => (data ? ([name, data] as const) : null))
                    .catch(() => null)
            )
        ).then(results => {
            const map: Record<string, Player> = {};
            results.forEach(entry => {
                if (entry) {
                    const [name, player] = entry;
                    map[name] = player;
                }
            });
            setPlayersByName(map);
        });
    }, []);

    if (!groups) {
        return <div className="group-stage-loading">Loading groups…</div>;
    }

    if (groups.length === 0) {
        return <div className="group-stage-loading">No groups drawn yet.</div>;
    }

    return (
        <div className="group-stage">
            {groups.map(group => (
                <GroupBox
                    key={group.id}
                    group={group}
                    standings={computeStandings(group)}
                    playersByName={playersByName}
                />
            ))}
        </div>
    );
};

export default GroupStage;
