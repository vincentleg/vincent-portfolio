import Link from 'next/link';
import { articles, articleHref, featured, formatDate, notebookUrl } from '@/lib/notebook';

const first = articles[articles.length - 1].date, last = articles[0].date;
const monthYear = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }).toUpperCase();

export function NotebookSection({ kicker = '05 / MEDIA & WRITING', caseStudy = false }: { kicker?: string; caseStudy?: boolean }) {
  return <section id="notebook" className="notebook section-pad" aria-labelledby="notebook-title">
    <div className="section-kicker"><span>{kicker}</span><span>INDEPENDENT PUBLICATION</span></div>
    <div className="notebook-nameplate" aria-hidden="true">
      <span>NO. {String(articles.length).padStart(2, '0')} ESSAYS</span><span>{monthYear(first)} — {monthYear(last)}</span><span>SILICON VALLEY, CALIFORNIA</span>
    </div>
    <div className="notebook-masthead" aria-hidden="true"><span>Notebook</span> <em>from the Valley</em></div>
    <div className="notebook-layout">
      <div className="notebook-copy" data-reveal>
        <p className="eyebrow">FOUNDER & AUTHOR</p>
        <h2 id="notebook-title">Notes from inside<br/><em>the ecosystem.</em></h2>
        <p>An independent technology publication documenting Silicon Valley from the ground: the companies, people, conferences and infrastructure shaping artificial intelligence, written firsthand since moving from France to California.</p>
        <blockquote>“Some of the most interesting insights rarely come from keynote slides. They come from conversations after a panel.”<cite>— These are my notes from the Valley</cite></blockquote>
        <div className="notebook-actions">{!caseStudy && <Link className="text-link" href="/work/notebook-from-the-valley">Read the case study <span>↗</span></Link>}<a className="text-link" href={notebookUrl} target="_blank" rel="noopener noreferrer">Visit the publication <span>↗</span></a></div>
      </div>
      <div className="notebook-stage">
        <ol className="notebook-plane" aria-label="Selected articles from Notebook from the Valley">
          {featured.map((a, i) => <li className="note-slot" key={a.slug} data-depth={[1.2, .5, .9, .3, 1, .6][i]}>
            <a className={`note-card ${i === 0 ? 'note-lead' : ''}`} href={articleHref(a)} target="_blank" rel="noopener noreferrer" style={{ animationDelay: `${i * -1.3}s` }}>
              <span className="note-meta"><time dateTime={a.date}>{formatDate(a.date)}</time><span>{a.topic}</span></span>
              <span className="note-title">{a.title}</span>
              <span className="note-lede">{a.lede}</span>
              <span className="note-read">READ ON THE NOTEBOOK <i aria-hidden="true">↗</i></span>
            </a>
          </li>)}
        </ol>
      </div>
    </div>
    <div className="notebook-ticker" aria-hidden="true"><div>{[0, 1].map(k => <span key={k}>{articles.map(a => <span key={a.slug}>{a.title}<i>◆</i></span>)}</span>)}</div></div>
  </section>;
}

export function Archive() {
  return <section id="archive" className="notebook-archive section-pad" aria-labelledby="archive-title">
    <div className="ledger-heading"><div><span className="eyebrow">FROM THE NOTEBOOK / THE ARCHIVE</span><h2 id="archive-title">{articles.length} essays<span>.</span></h2></div><p>Titles and dates as published on<br/>notebookfromthevalley.com.<br/>Retrieved October 8, 2026.</p></div>
    <ol className="archive-list">{articles.map(a => <li key={a.slug}><a href={articleHref(a)} target="_blank" rel="noopener noreferrer"><time dateTime={a.date}>{formatDate(a.date)}</time><span className="archive-topic">{a.topic}</span><span className="archive-title">{a.title}</span><i aria-hidden="true">↗</i></a></li>)}</ol>
  </section>;
}
