import { CloseBtn, ImageRules } from './IconComponents';
export default function Rules({ hideRules }) {
  return (
    <>
      <div className="rules-overlay">
        <div className="rules-menu-interact">
          <h3>RULES</h3>
          <CloseBtn hideRules={hideRules} />
        </div>
        <ImageRules />
      </div>
      <div className="overlay"></div>
    </>
  );
}
