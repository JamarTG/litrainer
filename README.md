![License](https://img.shields.io/github/license/JamarTG/litrainer)
![Issues](https://img.shields.io/github/issues/JamarTG/litrainer)
![Last Commit](https://img.shields.io/github/last-commit/JamarTG/litrainer)
![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blue.svg)
![Deploy](https://img.shields.io/badge/deployed-vercel-000?logo=vercel)

# [litrainer](http://litrainer.vercel.app/)

![image](https://github.com/user-attachments/assets/87762cae-f0e4-4232-8b68-3e2eb021496a)


A chess improvement tool based on Lichess’s **Learn from your mistakes** feature extended with custom themes, detailed move feedback and recommended opening study links.

The tool uses the [Lichess API](https://lichess.org/api) to grab your in-game mistakes and serves them in the form of chess puzzles.

---

## Features

### Move Feedback with Classification

Each move is analyzed and classified using a system inspired by Chess.com:

- Blunder  
- Mistake  
- Inaccuracy  
- Good  
- Excellent  
- Best  


### Customizable Board and Pieces

Choose from Lichess’s available board themes and piece styles.

### Opening Recommendations

When a mistake occurs in the opening phase, it identifies the relevant opening and provides a direct link to the [Lichess Opening Explorer](https://lichess.org/analysis#explorer).


### Game Filtering

Analyze games based on filters such as:

- Player name  
- Date range  
- Time control
- Max number of games to select from
- Color
- Order to select puzzles

More to be added later..

### Game Links

Each puzzle provides a direct link to view the full game on [lichess.org](https://lichess.org).

### Game Metadata

Additional game details include:
- Rating difference (points lost or gained)
- Time control  
- Game Phase of Puzzle
- Termination of Game
---

## Info about the tech used

The application relies on the Lichess API to fetch games and PGN data. The engines are stockfish17 with multithread or single thread options depending on device. Cached positions from Lichess API are used as well. The interactive board uses react-chessground. 

Other Tools: TypeScript, React, Tailwind CSS.

## Architecture note

- Use `@/state/*` for app state imports.
- Use `@/services/*` for external IO modules (e.g. Lichess API access).
- Use `@/shared/*` for cross-feature shared utilities.
- `@/redux/*` and `@/libs/*` are considered legacy internals and are restricted by lint for app-facing modules.

---

## Installation

```
git clone https://github.com/JamarTG/litrainer.git
cd litrainer
npm install
npm run dev
```
