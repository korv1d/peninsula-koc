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
- Integrate Roman's app?

## Contributions

Help wanted! The technically inclined are welcome to contribute to this humble website.  

The site code is organized into 4 typescript pages: main, rules, leaderboard, and lists. The most complicated element is the TournamentBracket object, which takes the file `tournament.json` file and populates the Bracket. All pages derive data and perform calculations based on the contents of the player files located in `./public/`.

Deployment is managed automatically by Cloudflare workers. Pushing to `main` triggers a new release.

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

Intercessors:
- ( 20 * (8/9) * (2/3) * (1/3))
= 3.95 W => 1 Kill

Scenarios:
1. Ultras
1.1. AoC, then Devastator:       = 7-7.8 kills (2.59+5.18)
1.2. No AoC, then AoC Devastator = 7-7.7 kills (3.45+4.32)
2. Ravenguard
2.1 AoC, then Fusilade:          = 6-7.3 kills (2.59+4.72)
2.1 No AoC, then AoC Fusilade:   = 6-7.2 kills (3.45+3.78)
3. Double base, no AoC:          = 6-7 kills   (3.45+3.45)
4. Double base, one AoC:         = 5-6 kills   (3.45+2.59)



Chance of killing self with double broadside:
- (1-(5^6/6^6))
= 0.66


Average damage of Sternguard (Ultramarines, no Rapid Fire, dev wounds only):
- ( 16 * (8/9) * 0.30555 ) + ( 6 * (0.75) * 0.30555 * 2 )
= 4.34 + 2.75 = 7.09

Average damage of Sternguard (Ultramarines, Rapid Fire, dev wounds only):
- ( 24 * (8/9) * 0.30555 ) + ( 6 * (0.75) * 0.30555 * 2 )
= 6.52 + 2.75 = 9.27


Average damage of Sternguard (Ravenguard, no Rapid Fire, dev wounds only):
- ( 16 * (0.75) * 0.30555 ) + ( 6 * (0.75) * 0.30555 * 2 )
= 3.67 + 2.75 = 6.42

Average damage of Sternguard (Ravenguard, Rapid Fire, dev wounds only):
- ( 24 * (8/9) * 0.30555 ) + ( 6 * (8/9) * 0.30555 * 2 )
= 6.52 + 3.25 = 9.77


Average Sternguard overwatch (Rapid Fire)
- ( 24 * 0.30555 * 0.30555 ) + ( 6 * (0.30555 * 2) * 0.30555 * 2 )
= 2.24 + 2.24 = 4.48

Average Sternguard overwatch (no Rapid Fire)
- ( 16 * 0.30555 * 0.30555 ) + ( 6 * (0.30555 * 2) * 0.30555 * 2 )
= 1.49 + 2.24 = 3.73

* note: odds of 6 with re-rolls is (1-((5^2)/(6^2))), 0.30555

# Matt Prep

Given a choice, pick Defender and go Adapt or Die.
If Attacker, pick linchpin

## Deployment vs Matt


1. Intercessors - Home Right

Case A: Impulsor Left
Case B: Impulsor Center
Case C: Impulsor Right
Case D: Sterngard Left
Case E: Sterngard Right

Scenario A:
2. Inceptors tucked Right???
    * No matter where he drops sterngard, drop BGVs infiltrating Right and Inceptors tucked Right

Scenario B:
2. Inceptors tucked Right
* Sterngard Left ?: 
* Sterngard Right ?:

Scenario C:
2. Inceptors tucked Right
* Sterngard Left ?:
* Sterngard Center ?:
* Sterngard Right ?:
