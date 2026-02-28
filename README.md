# Forbes 30 Under 30: The Prison Pipeline 🏆

> *"Our selection process is rigorous."*
> — Forbes, repeatedly, while nominating future federal defendants

---

I built this on a weekend I will never get back. It is a fully interactive investigative dashboard tracking Forbes 30 Under 30 alumni who went on to be indicted, convicted, or otherwise entangled with law enforcement in ways that make for very uncomfortable reading.

The short version: the alumni of a single magazine list have collectively been implicated in over **$63 billion** in financial fraud. Which is, to use the technical term, a lot.

## What this is

A dark-themed single-page web app with five sections:

- **The Damage** — KPI overview and charts of the overall situation
- **The "Visionaries"** — searchable, filterable grid/table of all 27 profiled individuals, each with a full case summary
- **Charts of Doom** — five Chart.js visualizations breaking down fraud by sector, geography, legal status, and year
- **A History of Oops** — a chronological timeline from the franchise's 2011 launch through February 2026
- **Why Though** — a breakdown of the six systemic reasons this keeps happening and will probably keep happening

## How to run it

It's a static site. No build step, no dependencies, no npm install, no webpack config that takes 40 minutes to understand. Just a few files.

```bash
# Clone it
git clone https://github.com/Sekiromike/Forbes-Fraudsters.git
cd Forbes-Fraudsters

# Serve it (any static server works)
python -m http.server 5500
# then open http://localhost:5500
```

That's it. If you have VS Code with Live Server installed, that works too. If you just double-click `index.html` some chart fonts load weirdly but it mostly works and honestly that's fine.

## What's in the box

```
index.html   — the whole app structure and copy
styles.css   — dark investigative-journalism aesthetic (the comments explain the color choices)
app.js       — all interactivity: tabs, filters, search, charts, modal, sorting
data.js      — the actual data: 27 individuals, 30+ timeline events, stats
```

No frameworks. No build tooling. Just vanilla JS, HTML, CSS, and Chart.js loaded from a CDN. I wanted anyone to be able to open this and understand it in five minutes.

## Who's in it

The 10 people Forbes officially put in their own 2023 "Hall of Shame" — Sam Bankman-Fried, Charlie Javice, Martin Shkreli, Do Kwon, et al. — plus 17 additional cases the magazine didn't formally address, including Heather Morgan (laundered $4.5B in stolen crypto while writing Forbes articles about cybersecurity), Rishi Shah (charged for billing pharma companies for screens that didn't exist), Obinwanne Okeke (ran an $11M cybercrime syndicate between Forbes Africa speaking engagements), and Gökçe Güven (made the 2025 list and was indicted for fraud shortly after, which is genuinely an impressive turnaround).

It also covers Elizabeth Holmes and Trevor Milton, who weren't on the 30 Under 30 list per se but were featured prominently at Forbes events and given cover treatment — and whose stories are so woven into this whole narrative that leaving them out felt dishonest.

## A note on the data

All fraud amounts and legal statuses come from federal court filings, DOJ press releases, and SEC enforcement actions — not from the articles calling these people "visionaries." Where exact figures were contested or unavailable I've used the lower end of reported ranges and noted it.

Legal statuses are current as of **February 2026**. Some cases are still in progress. The pipeline replenishes itself.

## Why I made this

Honestly? Because the Forbes Hall of Shame article framed 10 criminal convictions as proof the system works, and I found that framing genuinely maddening. A 99.9% success rate sounds great until you do the math on what the 0.1% actually did. The 0.1% stole sixty-three billion dollars.

The deeper thing that bothers me is the circular validation loop — Forbes puts founders on a list partly because they've raised VC money, VCs invest partly because Forbes put them on a list, and nobody at any point actually audits the underlying business. JP Morgan Chase acquired a company for $175 million based on a spreadsheet of fake students. The spreadsheet was discovered to be fake because the emails bounced. I cannot move on from this.

## Contributing

If someone new makes the list in the bad way, open a PR. The `data.js` schema is straightforward. Each entry needs a name, year, category, region, fraud type array, fraud amount (use 0 for non-monetary cases), legal status, outcome, sentence, description, tags, and a notoriety score out of 10.

The notoriety score is subjective. I stand by my ratings.

## License

MIT. Use it however you want. Show it to your startup founder friends. Show it to your VC friends. Show it to anyone who has ever described a 24-year-old with a pitch deck and a Forbes mention as "the next Steve Jobs."

---

*Data current as of February 2026. Built with vanilla JS, Chart.js, and a steadily deepening sense of institutional disillusionment.*
