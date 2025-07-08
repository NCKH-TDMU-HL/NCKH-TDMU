import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Allclass from "./pages/Allclass";
import Class11 from "./pages/Class11";
import StudyTopics from "./pages/StudyTopics";
import Study from "./pages/Study";
import LoTrinh from "./components/LoTrinh";
import Level1 from "./components/Level1";
import LoginRegisterForm from "./components/LoginFrom";
import TopicTask from "./TopicTask/TopicTask";
import TopicPage from "./Topic1/TopicPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fullclass" element={<Allclass />} />
        <Route path="/:classId" element={<Class11  />} />
        <Route path="/:classId/tu-vung" element={<StudyTopics  />} />
        <Route path="/:classId/hoc-tap" element={<Study  />} />
        <Route path="/:classId/lo-trinh" element={<LoTrinh  />} />
        <Route path="/:classId/lo-trinh/level:levelId" element={<Level1 />} />
        <Route path="/dang-nhap" element={<LoginRegisterForm  />} />
        <Route path="/:lop/:topic" element={<TopicPage />} />
        <Route path="/:classId/:taskId/:topic" element={<TopicTask />} />
      </Routes>
    </Router>
  );
}

export default App;