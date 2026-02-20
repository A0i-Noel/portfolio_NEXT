import { ReactNode } from "react";
import TitleFadeIn from "./animation/TitleFadeIn";

const Section = ({ title, children } : { title : string, children : ReactNode}) => {
  return (
    <section className="l-page__section">
      <TitleFadeIn>
        <h4>{title}</h4>
      </TitleFadeIn>
      {children}
    </section>
  );
}

export default Section;