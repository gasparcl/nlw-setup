import "./styles/global.css"
import { Habit } from "./components/Habit"

function App() {
    return (
        <>
            <div className="App">
                <Habit completed={5} />
                <Habit completed={15} />
                <Habit completed={25} />
                <Habit completed={35} />
            </div>
        </>
    )
}

export default App
