import { Game } from "@/components/Game";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-100 px-4 py-16 font-sans dark:bg-zinc-950">
      <main className="flex w-full max-w-md flex-col items-center gap-8">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Tic-Tac-Toe
        </h1>
        <Game dimension={3} numberOfPlayers={2} />
      </main>
    </div>
  );
}
