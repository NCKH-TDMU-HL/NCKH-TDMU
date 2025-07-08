import Mainmenu from "../components/Mainmenu";  

export default function Class11({ username, setUsername}) {
  return (
    <div>
      <Mainmenu username={username} setUsername={setUsername} />
    </div>
  );
}
