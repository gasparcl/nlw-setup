import { Plus } from "phosphor-react"
import logoImage from "../../assets/logo.svg"

export function Header() {
    return (
        <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
            <img src={logoImage} alt="Habits logo" />

            <button
                type="button"
                className="flex gap-3 items-center border border-violet-500 rounded-lg font-semibold px-6 py-4 transition-all drop-shadow-2xl  hover:bg-violet-400 hover:bg-opacity-40 hover:shadow hover:shadow-violet-400 active:scale-90"
            >
                <Plus size={20} className="text-violet-500" />
                Novo hábito
            </button>
        </div>
    )
}
