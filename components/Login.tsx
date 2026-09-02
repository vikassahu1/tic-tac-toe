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
        "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500";
    const labelClass = "text-sm font-medium text-zinc-700 dark:text-zinc-300";

    return (
        <div className="flex w-full flex-col gap-6">
            <div className="text-center">
                <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                    Welcome to Tic-Tac-Toe
                </h1>
                <h3 className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                    Configuration
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
                    className="mt-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                >
                    Start
                </button>
            </form>
        </div>
    );
};
