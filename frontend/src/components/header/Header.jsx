import "./header.css";
import background from"../../images/background.avif"
export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleLg">FlavorHand</span>
        <span className="headerTitleSm"> - Food Blog </span>
      </div>
      <img
        className="headerImg"
        src={background} alt="background"
      />
    </div>
  );
}