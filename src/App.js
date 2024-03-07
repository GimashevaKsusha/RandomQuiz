import { BrowserRouter, Route, Routes } from "react-router-dom";

import Quiz from "../src/Pages/Quiz";
import Result from "../src/Pages/Result";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route key={0} path ="/" element={<Quiz/>} />
                <Route key={1} path ="/result" element={<Result />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
