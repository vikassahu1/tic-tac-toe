"use client";

import { Difficulty, PlayerInfo } from "@/types/stateManagement";

export const Login = ({ playerInfo, setLoginflag }: { playerInfo: PlayerInfo, setLoginflag: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const { setPlayerName, setCurrentRound, setDim, setPlaywithAI, playwithAI, setDifficulty } = playerInfo;

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted");
        let formData = new FormData(e.target as HTMLFormElement);
        let playeroneName = formData.get("playeroneName") as string;
        let playertwoName = formData.get("playertwoName") as string;
        let rounds = formData.get("rounds") as string;
        let dim = formData.get("dim") as string;
        const difficultyValue = (formData.get("difficulty") as Difficulty) || Difficulty.MEDIUM;

        if (playeroneName === "") playeroneName = "Player 1";
        if (playertwoName === "") playertwoName = "Player 2";

        if (playwithAI) playertwoName = "Computer";
        if (rounds === "") rounds = "1";
        let dimValue = Number(dim);

        if (
            dim === "" ||
            Number.isNaN(dimValue) ||
            dimValue < 3 ||
            dimValue > 9 ||
            dimValue % 2 === 0
        ) {
            dimValue = 3;
        }

        setPlayerName([playeroneName, playertwoName]);
        setCurrentRound(parseInt(rounds, 10) || 1);
        setDim(dimValue);
        if (playwithAI) setDifficulty(difficultyValue);
        else setDifficulty(null);

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

                <div className="flex items-center w-full">
                    
                    <div className="flex flex-col w-[88%]">
                        <label htmlFor="playertwoName" className={labelClass}> Player 2 Name </label>
                        <input type="text" id="playertwoName" name="playertwoName" placeholder={playwithAI?"Computer":"Player 2"} className={fieldClass} readOnly={playwithAI}/>
                    </div>

                <div className="flex justify-center align-middle w-[12%] pt-5" onClick={() => { setPlaywithAI(!playwithAI);}}>
                        {/* Added w-6 h-6 for sizing, and changed fill to currentColor or a visible Tailwind text color */}
                        <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        className="w-8 h-8 text-gray-700 dark:text-white" 
                        fill="currentColor"
                        >
                        <path d="M14 18V20L16 21V22H8L7.99639 21.0036L10 20V18H2.9918C2.44405 18 2 17.5511 2 16.9925V4.00748C2 3.45107 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44892 22 4.00748V16.9925C22 17.5489 21.5447 18 21.0082 18H14ZM4 5V14H20V5H4Z"></path>
                        </svg>
                </div>
                </div>


                {playwithAI && (
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="difficulty" className={labelClass}>
                            Difficulty
                        </label>
                        <select id="difficulty" name="difficulty" className={fieldClass}>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                )}  

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="rounds" className={labelClass}>
                        Rounds
                    </label>
                    <input
                        type="number"
                        id="rounds"
                        name="rounds"
                        placeholder="1"
                        className={fieldClass}
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="dim" className={labelClass}>
                        Board size (odd: 3, 5, 7, 9)
                    </label>
                    <input
                        type="number"
                        id="dim"
                        name="dim"
                        min={3}
                        max={9}
                        step={2}
                        defaultValue={3}
                        placeholder="3"
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
