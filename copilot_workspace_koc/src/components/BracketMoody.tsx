import React, { useEffect, useState } from 'react';
import { Bracket, RoundProps, Seed, SeedItem, SeedTeam } from 'react-tournament-bracket';
import type { Tournament } from '../types';

const playerNames = [
  'Azrael', 'Balthasar', 'Cypher', 'Dante', 'Ezekiel', 'Fenris', 'Gideon', 'Horus'
];

function buildBracketData(tournament: Tournament) {
  // Build bracket data for react-tournament-bracket
  // This library expects a structure of rounds -> seeds (matches)
  return tournament.rounds.map((round, rIdx) => ({
    title: `Round ${rIdx + 1}`,
    seeds: round.matches.map((match, mIdx) => ({
      id: `${rIdx + 1}-${mIdx + 1}`,
      date: '',
      teams: [
        match.player1 ? { name: match.player1 } : { name: 'TBD' },
        match.player2 ? { name: match.player2 } : { name: 'TBD' }
      ],
      winner: match.winner || null
    }))
  }));
}

const BracketMoody: React.FC = () => {
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [rounds, setRounds] = useState<any[]>([]);

  useEffect(() => {
    fetch('/src/tournament/tournament.json')
      .then(res => res.json())
      .then((data) => {
        setTournament(data);
        setRounds(buildBracketData(data));
      });
  }, []);

  if (!tournament || rounds.length === 0) return <div>Loading bracket...</div>;

  return (
    <div style={{ width: '100%', minHeight: 700, background: 'rgba(30, 32, 44, 0.92)', borderRadius: 18, boxShadow: '0 4px 32px #000a', padding: '2rem 1vw', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
      <Bracket rounds={rounds} renderSeedComponent={CustomSeed} />
    </div>
  );
};

// Custom seed to style the match tiles
const CustomSeed: React.FC<RoundProps> = (props) => {
  return (
    <Seed {...props}>
      <SeedItem>
        <SeedTeam>{props.seed.teams[0]?.name}</SeedTeam>
        <SeedTeam>{props.seed.teams[1]?.name}</SeedTeam>
      </SeedItem>
    </Seed>
  );
};

export default BracketMoody;
