import missieVisieSvg from "../assets/missievisie.svg";

export const BlogSection = ({ className }) => {
  return (
    <section id="blog" className={`blog-component ${className}`}>
      <section className="info-container-missievisie">
        <img className="info-missievisie-svg" src={missieVisieSvg} />
      </section>
    </section>
  );
};
