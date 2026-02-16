---

## Why I Built This

I created litrainer because I was frustrated with the lack of bulk puzzle/game review tools on Lichess. The official "Learn from your mistakes" feature required visiting each game individually, which was tedious and slow. I wanted a system more like Chess.com's move classification and feedback, but for Lichess, and noticed the Lichess devs weren't actively improving this part of the site. litrainer fills that gap by letting you review your mistakes in bulk, with rich feedback and a modern UI.
![License](https://img.shields.io/github/license/JamarTG/litrainer)
![Issues](https://img.shields.io/github/issues/JamarTG/litrainer)
![Last Commit](https://img.shields.io/github/last-commit/JamarTG/litrainer)
![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blue.svg)
![Deploy](https://img.shields.io/badge/deployed-vercel-000?logo=vercel)


# litrainer

[Live Demo](http://litrainer.vercel.app/)

**litrainer** is a modern chess improvement tool that helps you learn from your mistakes by turning your real games into interactive puzzles. It extends Lichess’s "Learn from your mistakes" with:

- Detailed move feedback and classification (blunder, mistake, inaccuracy, etc.)
- Customizable board and piece themes
- Opening recommendations and direct study links
- Responsive, mobile-friendly UI
- Game filtering and metadata

The app uses the [Lichess API](https://lichess.org/api) to fetch your games and mistakes, then analyzes them with Stockfish 17 (multi/single thread depending on device). All puzzles are interactive and visually rich.

---

## Key Features

- **Move Feedback & Classification:** Every move is analyzed and classified (blunder, mistake, inaccuracy, good, excellent, best, book, great) with clear visual feedback and icons.
- **Customizable Board & Pieces:** Choose from a wide range of board and piece themes inspired by Lichess.
- **Opening Recommendations:** When you make a mistake in the opening, get a direct link to the [Lichess Opening Explorer](https://lichess.org/analysis#explorer) for further study.
- **Game Filtering:** Filter puzzles by player, date, time control, color, and more.
- **Game Links & Metadata:** Instantly jump to the full game on Lichess, and see rating changes, phase, and more for each puzzle.
- **Responsive UI:** Works great on desktop and mobile, with a clean, modern look.
- **Project & Feedback:** Easy access to bug reporting and GitHub links from the navigation.

---

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Chess Engine:** Stockfish 17 (multi/single thread)
- **Board UI:** react-chessground
- **API:** Lichess API for games, moves, and PGN

---

## Project Structure

- `src/` — Main source code
- `src/features/` — Feature modules (chessboard, panel, training-session, etc.)
- `src/components/` — Shared layout and UI components
- `src/constants/` — App-wide constants (piece values, URLs, etc.)
- `src/state/` — Redux state slices and hooks
- `src/assets/` — Icons and images

---

## Getting Started

1. **Clone the repo:**
	```sh
	git clone https://github.com/JamarTG/litrainer.git
	cd litrainer
	```
2. **Install dependencies:**
	```sh
	npm install
	```
3. **Start the development server:**
	```sh
	npm run dev
	```
4. **Open [http://localhost:5173](http://localhost:5173) in your browser.**

**Note:** Requires Node.js 18+ and npm 9+.

---

## Contributing & Feedback

- Found a bug? Use the "Report a bug" link in the app nav or open an issue on GitHub.
- Want to contribute? PRs are welcome! See the [Project & Feedback](#) section in the app nav for links.

---
