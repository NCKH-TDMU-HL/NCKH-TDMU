import Study from "../components/Hoc-Tap";

export default function StudyPage({ username, setUsername }) { 
  return (
    <div>
      <Study username={username} setUsername={setUsername} />
    </div>
  );
}