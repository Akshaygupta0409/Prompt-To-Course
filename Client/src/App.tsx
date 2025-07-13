import { RecoilRoot } from "recoil"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import CoursePage from "./pages/CoursePage";


function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/course" element={<CoursePage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>

  )
}

export default App
