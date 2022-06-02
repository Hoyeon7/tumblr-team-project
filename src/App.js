import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeComp from "./pages/Home/Home";
import Header from "./components/HeaderComp";
import Footer from "./components/FooterComp";
import MypageComp from "./components/Mypage/MypageComp";
import ReviewComp from "./pages/Review/Review";
import CreateComp from "./components/createcomp/CreateComp";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomeComp />} />
            <Route path="/mypage" element={<MypageComp />} />
            <Route path="/review" element={<ReviewComp />} />
            <Route path="/create" element={<CreateComp />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
