import StudyTopics from "../components/tu-vung-chu-de";

export default function StudyTopicsPage({ username, setUsername}) {
  return (
    <div>
      <StudyTopics username={username} setUsername={setUsername} />
    </div>
  );
}