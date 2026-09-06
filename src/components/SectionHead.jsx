import Reveal from './Reveal.jsx';

/** Monospace eyebrow + big title + hairline rule, shared by every section. */
export default function SectionHead({ eyebrow, title, lead }) {
  return (
    <Reveal className="section-header">
      <div className="section-head">
        <span className="eyebrow">{eyebrow}</span>
        <span className="rule" />
      </div>
      <h2 className="section-title">{title}</h2>
      {lead ? <p className="section-lead">{lead}</p> : null}
    </Reveal>
  );
}
