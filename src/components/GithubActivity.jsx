import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import Reveal from './Reveal.jsx';

const USERNAME = 'ShathaAltassan';
const PROFILE = `https://github.com/${USERNAME}`;

/**
 * GitHub contribution calendar, rendered from the public jogruber API.
 * Renders nothing if the request fails so the section degrades cleanly.
 */
export default function GithubActivity() {
  const { t, lang } = useLanguage();
  const [data, setData] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`)
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then((json) => {
        if (alive) setData(json);
      })
      .catch(() => {
        if (alive) setFailed(true);
      });
    return () => {
      alive = false;
    };
  }, []);

  const weeks = useMemo(() => {
    if (!data?.contributions) return [];
    const days = data.contributions;
    const out = [];
    let week = [];
    // pad so the first column starts on Sunday
    const firstDow = new Date(days[0].date).getDay();
    for (let i = 0; i < firstDow; i += 1) week.push(null);
    days.forEach((day) => {
      week.push(day);
      if (week.length === 7) {
        out.push(week);
        week = [];
      }
    });
    if (week.length) out.push(week);
    return out;
  }, [data]);

  const total = data?.total?.lastYear ?? data?.total ?? null;

  if (failed) return null;

  return (
    <Reveal className="gh-activity">
      <div className="gh-head">
        <span className="eyebrow">{t.ui.githubActivity}</span>
        <a className="gh-handle" href={PROFILE} target="_blank" rel="noreferrer">
          @{USERNAME} <i className="fas fa-external-link-alt" />
        </a>
      </div>

      <div className="gh-graph-wrap">
        <div className="gh-graph" role="img" aria-label={t.ui.githubActivity}>
          {weeks.map((week, wi) => (
            <div className="gh-week" key={wi}>
              {week.map((day, di) => (
                <span
                  key={di}
                  className={`gh-cell${day ? ` lvl-${day.level}` : ' empty'}`}
                  title={day ? `${day.date}: ${day.count}` : ''}
                />
              ))}
            </div>
          ))}
          {!weeks.length && <div className="gh-skeleton" />}
        </div>
      </div>

      <div className="gh-legend">
        <span>
          {total != null
            ? `${total.toLocaleString(lang === 'ar' ? 'ar' : 'en')} ${t.ui.contributionsLast}`
            : ' '}
        </span>
        <div className="gh-scale">
          <span>{t.ui.less}</span>
          <span className="gh-cell lvl-0" />
          <span className="gh-cell lvl-1" />
          <span className="gh-cell lvl-2" />
          <span className="gh-cell lvl-3" />
          <span className="gh-cell lvl-4" />
          <span>{t.ui.more}</span>
        </div>
      </div>
    </Reveal>
  );
}
