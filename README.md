# tic-tac-toe

Simple tic-tac-toe in the browser. Play against a friend or against a computer opponent.

Built with Next.js, React, and Tailwind. The computer moves go through a small API route that uses [TypeSafe / JEV](https://www.typesafe.ai/) to pick a square.

## Features

- Human vs human, or human vs computer
- Easy / medium / hard when playing the computer
- Odd board sizes: 3×3, 5×5, 7×7, 9×9
- Best-of-N rounds
- Restart / back to setup without refreshing the page

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Env

For computer mode you need a TypeSafe API key:

```bash
TYPESAFE_API_KEY=your_key_here
```

Optional:

```bash
TYPESAFE_BASE_URL=
TYPESAFE_DEFAULT_MODEL=jev-latest
```

Without the key, local PvP still works; AI moves will fail.

## Project layout

```
app/                 # pages + /api/ai-move
components/          # Login, Board, Round, etc.
lib/utiliy.ts        # win / draw / move logic
packages/jev/        # JEV client + play() prompt
types/               # shared state types
```

## Scripts

| Command       | What it does        |
|---------------|---------------------|
| `npm run dev` | local dev server    |
| `npm run build` | production build  |
| `npm start`   | serve the build     |
| `npm run lint`  | eslint            |

## Notes

- Board size must be odd (win condition is a full line).
- Computer is always player 2 (`O`).
- AI difficulty is chosen on the setup screen and passed into the move prompt.
