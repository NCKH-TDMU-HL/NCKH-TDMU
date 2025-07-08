import "./Mainmenu.css";
import ThanhDieuHuong from "./ThanhDieuHuong";

export default function Mainmenu({ username }) {
  return (
    <>
      <div className="container">
        <img src="/images/background.png" alt="background" />
      </div>
      <ThanhDieuHuong username={username} />
    </>
  );
}
