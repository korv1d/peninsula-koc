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

# Question: Ravenguard vs Ultramarines?

Ultramarines pros:
* guarnteed once per games IC AP 4 fusilade
* 1 more attack on Judiciar
* Good reactive move in Tactical doctrine
* Free advance and charge in Assault doctrine
* -1 to wound vs hellblasters

Ravenguard pros:
* Infiltrating bladeguard
* +1 bs +1 AP fusilade
* -1 to hit most the time
* Fall back shoot and charge for a CP {irrelevant?}

Question: How many kills into a marine squad with oath? Both Overcharge.

Base Marines:
base, no AOC, cover:
- ( 6 * (8/9) * 35/36 * (2/3))
= 3.456
base, AOC, cover:
- ( 6 * (8/9) * 35/36 * (1/2))
= 2.592

Ravenguard:
Fulsilade, no AOC, cover:
- ( 6 * (35/36) * 35/36 * (5/6))
= 4.726
Fulsilade, AOC, cover:
- ( 6 * (35/36) * 35/36 * (2/3))
= 3.780

Ultramarines:
Devastator, no AOC:
- ( 6 * (8/9) * 35/36 * (6/6))
= 5.18
Devastator, AOC:
- ( 6 * (8/9) * 35/36 * (5/6))
= 4.320

Scenarios:
1. Ultras
1.1. AoC, then Devastator:       = 7-7.8 kills (2.59+5.18)
1.2. No AoC, then AoC Devastator = 7-7.7 kills (3.45+4.32)
2. Ravenguard
2.1 AoC, then Fusilade:          = 6-7.3 kills (2.59+4.72)
2.1 No AoC, then AoC Fusilade:   = 6-7.2 kills (3.45+3.78)
3. Double base, no AoC:          = 6-7 kills 
4. Double base, one AoC:         = 5-6 kills



Chance of killing self with double broadside:
- (1-(5^6/6^6))
= 0.66