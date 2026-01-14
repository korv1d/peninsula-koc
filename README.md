# Peninsula KoC Live Tracker

In the grim darkness of the far future, there is only war.

Visualize the matchups, lists, and rankings of the Warhammer 40,000 Peninsula King of the Colosseum league!

## Navigation

| Page        | Description                                                                 |
|------------ |---------------------------------------------------------------------------- |
| main        | Displays standings and player matchups, past and future.                    |
| leaderboard | Players can collect stats from their games. The top performers are honored.|
| lists       | View the submitted lists of all players.                                    |

## Backlog
- Leaderboard entries should display the highest score/best value even when Contested
- Expand tournament bracket from 8 players to however many exist
- Beautify tournament bracket

## Contributions

Help wanted! The technically inclined are welcome to contribute to this humble website.

## Testing

I test with `npm run dev`  

## Linting

I'm using eslint to lint.  
  
Install:  
`npm install --save-dev eslint eslint-plugin-react @typescript-eslint/parser @typescript-eslint/eslint-plugin`  
  
Lint:  
`npx eslint "src/**/*.{ts,tsx,js,jsx}"`

## Heinekenmarines

### Tactics

Battle Plan 1:  
* All squads drop, leader with BGVs
* Dynamic reactions based on ABC practice deployments
  
Battle Plan 2:  
* Intercessors start in reserves, Rapid-Ingress onto enemy home Obj. 

Battle Plan 3:
* Double Inceptor deep strike

Battle Plan 4:
* Judiciar does NOT lead BGVs.
* Get full deployment info before dropping inceptors.
    * Maybe this is how I deal with Impulsors?

## Terrain Rules

All L-shaped terrain pieces and all straight terrain pieces are ruins. These ruins footprint is defined by the physical space in which they are in contact with the ground. All Core Rules rules regarding ruins apply to this terrain, as does the Games Workshop rules commentary.

The Colosseum Walls are a special type of terrain. Models may claim cover from this terrain as if it were a ruin as defined in the Core Rules and associated rules commentary.

Colosseum Walls are impassable except for Infantry, Beast, and Swarm models. These models may pass through this terrain by first reducing their movement characteristic by 4" (2" if the model has the FLY keyword). To do so, the model must be in base-to-base contact with the Colosseum Wall, after paying the 4" (or 2" for FLY) tax, the model is then moved to the point on the opposite wall nearest its starting position while in base-to-base contact. Models must retain their orientation before traversing the terrain in this way. A model which has used some distance in movement already during the phase in which it is moving such that it lacks the 4" (or 2" for FLY) remaining needed to pay the tranversal tax may not make such a move.

The Colosseum Walls may be traversed in this fashion during a Normal, Advance, Fall-Back, or Charge move.

Units disembarking from transports may not be set up on the opposite side of Colosseum Walls as the transport they are disembarking from.

The Colosseum Walls are considered to be 1.01" thick, meaning that two opposing models on opposite sides of the wall cannot be considered to be within engagement range of one another
OR
The Colosseum Walls are considered to be 0.99" thick, and two opposing models on opposite sides of the wall are considered to be within engagement range of one another

For the purposes of the Sabotage secondary mission, Colosseum walls are considered to be wholly within a the deployment zone of the player whose side they are on. Being in base-to-base contact with a Colosseum Wall makes a unit eligible to perform the Sabotage action.