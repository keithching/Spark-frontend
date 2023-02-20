import HeroStyles from "../styles/hero.module.css";
import { LogInBtn } from "./header/LogInBtn";
import { SignUpBtn } from "./header/SignUpBtn";

export const Hero = () => {
  return (
    <div className={HeroStyles.container}>
      <h1 className={HeroStyles.header}>your next adventure awaits.</h1>
      <div className={HeroStyles.buttons}>
        <LogInBtn />
        <SignUpBtn />
      </div>
    </div>
  );
};
