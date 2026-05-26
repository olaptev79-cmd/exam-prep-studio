export default function SectionIntro({ tag, title, text }) {
  return (
    <div className="section-intro">
      {tag && <p className="eyebrow">{tag}</p>}
      <h3>{title}</h3>
      {text && <p>{text}</p>}
    </div>
  );
}
