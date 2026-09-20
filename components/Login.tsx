"use client";

import { useState } from "react";
import { PlayerInfo } from "@/types/stateManagement";

export const Login = ({ playerInfo, setLoginflag }: { playerInfo: PlayerInfo, setLoginflag: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const { setPlayerName, setCurrentRound, setDim} = playerInfo;

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted");
        let formData = new FormData(e.target as HTMLFormElement);
        let playeroneName = formData.get("playeroneName") as string;
        let playertwoName = formData.get("playertwoName") as string;
        let rounds = formData.get("rounds") as string;
        let dim = formData.get("dim") as string;

        if (playeroneName === "") playeroneName = "Player 1";
        if (playertwoName === "") playertwoName = "Player 2";
        if (rounds === "") rounds = "1";
        let dimValue = Number(dim);

        if (
            dim === "" ||
            Number.isNaN(dimValue) ||
            dimValue < 3 ||
            dimValue > 10 ||
            dimValue % 2 === 0
        ) {
            dimValue = 3;
        }

        setPlayerName([playeroneName, playertwoName]);
        setCurrentRound(parseInt(rounds));
        setDim(dimValue);

        setLoginflag(false);
    };

    const fieldClass =
        "w-full rounded-xl border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/20";
    const labelClass = "text-sm font-medium text-stone-600 dark:text-zinc-300";

    return (
        <div className="flex w-full flex-col gap-6">
            <div className="text-center">
                <h1 className="text-3xl font-semibold tracking-tight text-stone-900 dark:text-zinc-50">
                    Tic-Tac-Toe
                </h1>
                <h3 className="mt-2 text-sm text-stone-500 dark:text-zinc-400">
                    Set up your match
                </h3>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="playeroneName" className={labelClass}>
                        Player 1 Name
                    </label>
                    <input
                        type="text"
                        id="playeroneName"
                        name="playeroneName"
                        placeholder="Player 1"
                        className={fieldClass}
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="playertwoName" className={labelClass}>
                        Player 2 Name
                    </label>
                    <input
                        type="text"
                        id="playertwoName"
                        name="playertwoName"
                        placeholder="Player 2"
                        className={fieldClass}
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="rounds" className={labelClass}>
                        Rounds
                    </label>
                    <input
                        type="number"
                        id="rounds"
                        name="rounds"
                        className={fieldClass}
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="dim" className={labelClass}>
                        Dimension
                    </label>
                    <input
                        type="number"
                        id="dim"
                        name="dim"
                        className={fieldClass}
                    />
                </div>

                <button
                    type="submit"
                    className="mt-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-teal-600 active:scale-[0.99] dark:bg-teal-500 dark:text-zinc-950 dark:hover:bg-teal-400"
                >
                    Start
                </button>
            </form>
        </div>
    );
};
