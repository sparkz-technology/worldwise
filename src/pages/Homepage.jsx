import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import PageNave from "../components/PageNave";
export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNave />
      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <Link to="/login" className="cta">
          Start tracking now
        </Link>
      </section>
    </main>
  );
}
