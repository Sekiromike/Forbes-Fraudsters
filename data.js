// ─────────────────────────────────────────────────────────────────────────────
//  data.js — The Rogues Gallery
//
//  A carefully curated collection of individuals who, at some point, had
//  a Forbes journalist look them in the eye and think: "yes. THIS one."
//
//  I want to be clear that I spent a weekend building this. I want that on
//  the record. I could have been hiking. I chose this.
//
//  Each entry follows the same general narrative arc:
//    1. Gets Forbes 30 Under 30 placement (🎉 confetti 🎉)
//    2. Raises improbable sum of money from people who should know better
//    3. Turns out the core business was mostly vibes and wire fraud
//    4. Federal indictment (🎉 different confetti 🎉)
//
//  Fields:
//    fraudAmount  — our best estimate from court docs. "0" doesn't mean innocent,
//                   it means the fraud was non-monetary (worse, somehow)
//    notoriety    — completely subjective 1-10 scale of how much
//                   they made the news cycle insufferable
//    tags         — for filtering. I know the tags are chaotic. The subject
//                   matter is also chaotic. We're all just doing our best.
// ─────────────────────────────────────────────────────────────────────────────

const FRAUDSTERS = [
  {
    id: 1,
    name: "Sam Bankman-Fried",
    alias: "SBF",
    year: 2021,
    category: "Finance",
    company: "FTX / Alameda Research",
    region: "USA",
    fraudType: ["Customer Fund Theft", "Wire Fraud", "Bribery"],
    fraudAmount: 8000000000,
    legalStatus: "Convicted",
    outcome: "Sentenced to 25 years in federal prison",
    sentence: "25 years",
    // The man slept on a beanbag. He played video games during investor calls.
    // He donated to both political parties simultaneously.
    // He was described as "the next Warren Buffett" by people who manage
    // large amounts of other people's money. We live on a planet.
    description:
      "As founder of the FTX cryptocurrency exchange, Bankman-Fried diverted billions in customer funds to his trading firm Alameda Research to cover losses, finance luxury real estate, bribe foreign officials, and make illegal political donations. Convicted on 7 counts of fraud and conspiracy. Forbes described him as a visionary in 2021; federal prosecutors described him slightly differently in 2023.",
    image: "sbf",
    tags: ["crypto", "convicted", "hall-of-shame"],
    notoriety: 10,
  },
  {
    id: 2,
    name: "Caroline Ellison",
    alias: null,
    year: 2022,
    category: "Finance",
    company: "Alameda Research",
    region: "USA",
    fraudType: ["Wire Fraud", "Conspiracy"],
    fraudAmount: 8000000000,
    legalStatus: "Convicted",
    outcome: "Pled guilty; sentenced to 2 years in prison",
    sentence: "2 years",
    description:
      "CEO of Alameda Research and co-conspirator of SBF. Managed the commingling of billions in FTX customer funds into Alameda's trading operations. Cooperated with federal prosecutors and testified against Bankman-Fried, receiving a reduced sentence.",
    image: "ellison",
    tags: ["crypto", "convicted", "hall-of-shame", "cooperating-witness"],
    notoriety: 8,
  },
  {
    id: 3,
    name: "Charlie Javice",
    alias: null,
    year: 2019,
    category: "Finance",
    company: "Frank",
    region: "USA",
    fraudType: ["Acquisition Fraud", "Data Fabrication", "Wire Fraud"],
    fraudAmount: 175000000,
    legalStatus: "Convicted",
    outcome: "Sentenced to 7 years 1 month in federal prison",
    sentence: "7 years",
    // She paid a data science professor $18,000 to build a spreadsheet of fake
    // students. JP Morgan — which has a $3.9 trillion balance sheet and an entire
    // division dedicated to risk — bought the spreadsheet for $175 million.
    // The fraud was discovered because they tried to email the fake students
    // and the emails bounced.
    // The emails. Bounced.
    // We cannot stress this enough.
    description:
      "Founder of 'Frank,' an EdTech platform. Fabricated a user base of 4.25 million students (actual: ~300,000) to orchestrate a fraudulent $175M acquisition by JP Morgan Chase. Paid an external data professor $18,000 to generate a synthetic database of millions of fake identities. JP Morgan discovered the fraud after mass-mailing campaigns produced catastrophic bounce rates. The largest bank in America was defeated by a bounce rate.",
    image: "javice",
    tags: ["edtech", "acquisition-fraud", "convicted", "hall-of-shame", "data-fabrication"],
    notoriety: 9,
  },
  {
    id: 4,
    name: "Martin Shkreli",
    alias: "Pharma Bro",
    year: 2013,
    category: "Finance",
    company: "MSMB Capital / Retrophin",
    region: "USA",
    fraudType: ["Securities Fraud", "Ponzi Scheme", "Misappropriation"],
    fraudAmount: 64000000,
    legalStatus: "Convicted",
    outcome: "Sentenced to 7 years; lifetime pharma industry ban; $64M civil judgment",
    sentence: "7 years",
    description:
      "Infamous 'Pharma Bro' who raised Daraprim's price 5,000% overnight. His criminal conviction, however, stemmed from operating his hedge funds as a Ponzi scheme, lying to investors about performance, and misappropriating assets from publicly-traded Retrophin to pay off defrauded clients.",
    image: "shkreli",
    tags: ["pharma", "ponzi", "convicted", "hall-of-shame"],
    notoriety: 9,
  },
  {
    id: 5,
    name: "Do Kwon",
    alias: null,
    year: 2019,
    category: "Finance",
    company: "Terraform Labs / Luna / TerraUSD",
    region: "International",
    fraudType: ["Cryptocurrency Fraud", "Market Manipulation"],
    fraudAmount: 40000000000,
    legalStatus: "Convicted",
    outcome: "Convicted of cryptocurrency fraud; extradited internationally",
    sentence: "Pending sentencing",
    // Multiple credentialed analysts published papers calling TerraUSD
    // a structural death spiral BEFORE it collapsed.
    // Those papers were ignored.
    // Do Kwon called critics "poor" on Twitter.
    // $40 billion evaporated in 72 hours.
    // He then fled internationally.
    // Forbes: "One of the most exciting minds in crypto."
    description:
      "Architect of the TerraUSD (UST) algorithmic stablecoin and Luna token ecosystem. When the peg failed in May 2022 it vaporized ~$40 billion in global market value in days and triggered a crypto market contagion that bankrupted multiple other firms. Kwon fled internationally before being apprehended. Analysts had warned this would happen. The warnings were described as 'FUD' by his community. They were not FUD.",
    image: "kwon",
    tags: ["crypto", "convicted", "collapse"],
    notoriety: 10,
  },
  {
    id: 6,
    name: "Nate Paul",
    alias: null,
    year: 2016,
    category: "Finance",
    company: "World Class Capital Group",
    region: "USA",
    fraudType: ["Bank Fraud", "Wire Fraud", "Document Falsification"],
    fraudAmount: 150000000,
    legalStatus: "Convicted",
    outcome: "Convicted on multiple counts of bank fraud and conspiracy",
    sentence: "Pending sentencing",
    description:
      "Built a $1 billion real estate empire by age 30 through fabricated lending documents and false statements to lenders to secure millions in loans his firm would not have otherwise qualified for. Faced multiple federal indictments for bank fraud, wire fraud, and conspiracy.",
    image: "paul",
    tags: ["real-estate", "bank-fraud", "convicted", "hall-of-shame"],
    notoriety: 7,
  },
  {
    id: 7,
    name: "Charlie Cody Wilson",
    alias: "Cody Wilson",
    year: 2014,
    category: "Law & Policy",
    company: "Defense Distributed",
    region: "USA",
    fraudType: ["Sexual Assault of a Minor"],
    fraudAmount: 0,
    legalStatus: "Convicted",
    outcome: "Pled guilty; 7 years probation; registered sex offender",
    sentence: "7 years probation",
    description:
      "Self-described crypto-anarchist who created the world's first fully 3D-printable firearm. Convicted for the sexual assault of a minor he paid $500 to after meeting online. Accepted a plea deal resulting in 7 years probation and permanent sex offender registration.",
    image: "wilson",
    tags: ["non-financial", "sexual-misconduct", "convicted", "hall-of-shame"],
    notoriety: 8,
  },
  {
    id: 8,
    name: "Lucas Duplan",
    alias: null,
    year: 2014,
    category: "Finance",
    company: "Clinkle",
    region: "USA",
    fraudType: ["Misuse of Investor Funds"],
    fraudAmount: 30000000,
    legalStatus: "Alleged",
    outcome: "Misused $30M in VC funds without delivering a viable product",
    sentence: "None",
    description:
      "Raised $30 million in venture capital for a mobile payments startup that never delivered a working product. Executed rapid mass layoffs shortly after securing capital. Widely regarded as a cautionary tale of premature hype enabling incompetent or bad-faith use of investor funds.",
    image: "duplan",
    tags: ["fintech", "misuse-of-funds", "hall-of-shame"],
    notoriety: 5,
  },
  {
    id: 9,
    name: "James O'Keefe",
    alias: null,
    year: 2012,
    category: "Media",
    company: "Project Veritas",
    region: "USA",
    fraudType: ["Misuse of Charitable Funds"],
    fraudAmount: 0,
    legalStatus: "Alleged",
    outcome: "Ousted from his own organization; accused of misusing donor funds",
    sentence: "None",
    description:
      "Conservative undercover journalism operation founder ousted amid accusations of severe financial malfeasance. Allegedly misused corporate donor funds for personal expenses including private charter flights and luxury travel.",
    image: "okeefe",
    tags: ["media", "non-profit-fraud", "alleged", "hall-of-shame"],
    notoriety: 6,
  },
  {
    id: 10,
    name: "Phadria Prendergast",
    alias: null,
    year: 2023,
    category: "Marketing & Media",
    company: "WOTC Magazine",
    region: "Europe",
    fraudType: ["Pay-to-Play Fraud", "Client Fraud"],
    fraudAmount: 195000,
    legalStatus: "Alleged",
    outcome: "Accused of defrauding clients out of ~$195K; linked to cult operations",
    sentence: "None",
    description:
      "Editor-in-chief of Women of the City Magazine. Accused of running an illicit pay-to-play media operation, charging clients for coverage under false pretenses, and stealing approximately $195,000. Simultaneously linked to operations associated with a religious cult.",
    image: "prendergast",
    tags: ["media", "fraud", "alleged", "hall-of-shame", "cult"],
    notoriety: 5,
  },
  {
    id: 11,
    name: "Steph Korey",
    alias: null,
    year: 2016,
    category: "Retail & E-Commerce",
    company: "Away",
    region: "USA",
    fraudType: ["Workplace Abuse", "Toxic Culture"],
    fraudAmount: 0,
    legalStatus: "Resigned",
    outcome: "Forced CEO resignation; company underwent executive restructuring",
    sentence: "None",
    description:
      "Co-founder of direct-to-consumer luggage brand Away. Forced to step down as CEO after investigative reports exposed severe workplace bullying—imposing impossible workloads, blocking employees from paid time off, and publicly berating staff in internal communication channels.",
    image: "korey",
    tags: ["retail", "workplace-abuse", "hall-of-shame"],
    notoriety: 4,
  },
  {
    id: 12,
    name: "Joanna Smith-Griffin",
    alias: null,
    year: 2021,
    category: "Education",
    company: "AllHere Education",
    region: "USA",
    fraudType: ["Securities Fraud", "Wire Fraud", "Embezzlement", "Identity Theft"],
    fraudAmount: 10000000,
    legalStatus: "Indicted",
    outcome: "Arrested; company entered Chapter 7 bankruptcy; entire workforce laid off",
    sentence: "Pending trial",
    description:
      "Harvard-incubated AI startup founder who secured a high-profile LAUSD contract. Falsely claimed $3.7M in revenue (actual: $11,000) and defrauded investors of ~$10M. Embezzled $600,000+ to finance a house down payment and her 2021 wedding.",
    image: "smith-griffin",
    tags: ["edtech", "ai", "securities-fraud", "embezzlement", "indicted"],
    notoriety: 8,
  },
  {
    id: 13,
    name: "Abraham Shafi",
    alias: null,
    year: 2021,
    category: "Consumer Technology",
    company: "IRL (In Real Life)",
    region: "USA",
    fraudType: ["Securities Fraud", "Metric Manipulation", "Personal Fund Misuse"],
    fraudAmount: 170000000,
    legalStatus: "Charged (SEC)",
    outcome: "SEC charges filed; company dissolved",
    sentence: "Pending",
    description:
      "Claimed IRL had 20 million organic users to raise a $170M Series C from SoftBank Vision Fund and Founders Fund. In reality, user growth was purchased through hidden advertising expenditures routed through third parties to simulate virality. Also accused of using company funds for luxury personal expenses including Hawaii hotels.",
    image: "shafi",
    tags: ["social-media", "metric-manipulation", "sec-charged"],
    notoriety: 7,
  },
  {
    id: 14,
    name: "Manish Lachwani",
    alias: null,
    year: 2020,
    category: "Enterprise Technology",
    company: "HeadSpin",
    region: "USA",
    fraudType: ["Securities Fraud", "Wire Fraud", "Revenue Fabrication"],
    fraudAmount: 95000000,
    legalStatus: "Convicted",
    outcome: "Pled guilty; company returned $95M to investors; 80% valuation slash",
    sentence: "Pending sentencing",
    description:
      "Founder of app-testing startup HeadSpin who fabricated $100M in annual recurring revenue (actual: $15M) to secure a $1.16 billion Series C valuation. The fraud was uncovered by former Google executives on the board, triggering a criminal investigation and investor refunds.",
    image: "lachwani",
    tags: ["enterprise-tech", "revenue-fabrication", "convicted"],
    notoriety: 7,
  },
  {
    id: 15,
    name: "Heather Morgan",
    alias: "Razzlekhan",
    year: 2020,
    category: "Business / Media",
    company: "Forbes Contributor / Bitfinex Launderer",
    region: "USA",
    fraudType: ["Money Laundering", "Conspiracy"],
    fraudAmount: 4500000000,
    legalStatus: "Convicted",
    outcome: "Sentenced to 18 months in prison for money laundering conspiracy",
    sentence: "18 months",
    // She wrote a Forbes article titled:
    // "Experts Share Tips To Protect Your Business From Cybercriminals"
    // WHILE laundering $4.5 billion in stolen crypto.
    // She described herself in that article as an expert in
    // "persuasion and social engineering."
    // She was not lying about the social engineering part.
    // She also made rap videos. Under the name Razzlekhan.
    // The "Crocodile of Wall Street."
    // I cannot make this up. I have simply documented it.
    description:
      "While laundering $4.5 billion in stolen Bitfinex bitcoin, Morgan published over 100 articles for Inc. magazine and Forbes — including one literally titled 'Experts Share Tips To Protect Your Business From Cybercriminals.' She styled herself as surrealist rapper 'Razzlekhan' and self-described as the 'Crocodile of Wall Street.' Husband Ilya Lichtenstein received 5 years in what was the largest financial seizure ($3.6B) in DOJ history. We did not invent any of this.",
    image: "morgan",
    tags: ["crypto", "money-laundering", "convicted", "irony"],
    notoriety: 9,
  },
  {
    id: 16,
    name: "Rishi Shah",
    alias: null,
    year: 2014,
    category: "Healthcare Technology",
    company: "Outcome Health",
    region: "USA",
    fraudType: ["Wire Fraud", "Mail Fraud", "Bank Fraud", "Money Laundering"],
    fraudAmount: 1000000000,
    legalStatus: "Convicted",
    outcome: "Sentenced to 7.5 years in federal prison",
    sentence: "7.5 years",
    description:
      "Built Outcome Health into a $5.6 billion pharma advertising empire by systematically charging clients for placements on far more medical facility screens than actually existed. The $1 billion fraud affected pharmaceutical companies, investors, and lenders. Co-founder Shradha Agarwal and COO were also convicted.",
    image: "shah",
    tags: ["healthcare", "advertising-fraud", "convicted"],
    notoriety: 8,
  },
  {
    id: 17,
    name: "Obinwanne Okeke",
    alias: "Invictus Obi",
    year: 2016,
    category: "Business",
    company: "Invictus Group",
    region: "Africa",
    fraudType: ["Business Email Compromise", "Wire Fraud", "Phishing", "Cybercrime"],
    fraudAmount: 11000000,
    legalStatus: "Convicted",
    outcome: "Sentenced to 10 years in US federal prison",
    sentence: "10 years",
    description:
      "Celebrated Forbes Africa entrepreneur and regular magazine contributor who secretly operated a sophisticated cybercriminal syndicate. His BEC operations and phishing campaigns stole $11M from corporate victims globally. Featured at the Forbes EMEA Summit in Tel Aviv. Viewed as an inspirational figure for African youth before his FBI arrest.",
    image: "okeke",
    tags: ["cybercrime", "bec", "convicted", "forbes-africa"],
    notoriety: 8,
  },
  {
    id: 18,
    name: "Gökçe Güven",
    alias: null,
    year: 2025,
    category: "Fintech",
    company: "Kalder",
    region: "International",
    fraudType: ["Wire Fraud", "Securities Fraud", "Identity Theft", "Visa Fraud"],
    fraudAmount: 7000000,
    legalStatus: "Indicted",
    outcome: "Faces up to 52 years in federal prison; currently awaiting trial",
    sentence: "Pending trial",
    description:
      "2025 honoree charged just weeks after listing. Fabricated client lists naming Godiva and IATA as partners, maintained dual financial books (real vs. investor-facing), and used proceeds to fraudulently obtain an O-1A 'extraordinary ability' visa. Secured a $7M seed round on entirely fabricated metrics.",
    image: "guven",
    tags: ["fintech", "fabricated-clients", "visa-fraud", "indicted", "2025"],
    notoriety: 8,
  },
  {
    id: 19,
    name: "Ashneer Grover",
    alias: null,
    year: 2019,
    category: "Finance",
    company: "BharatPe",
    region: "Asia",
    fraudType: ["Corporate Fund Siphoning", "Fictitious Employment Fraud"],
    fraudAmount: 10700000,
    legalStatus: "Under Investigation",
    outcome: "Ousted from BharatPe; civil suits filed; criminal investigation by Delhi EOW",
    sentence: "Pending",
    description:
      "Forbes India honoree and former BharatPe MD who allegedly set up fake HR consultancies to systematically siphon ₹81 crore from the company. Civil suits seek ₹88 crore in damages. Became famous as a sharp-tongued 'Shark Tank India' judge, making the scandal a national spectacle.",
    image: "grover",
    tags: ["fintech", "india", "embezzlement", "under-investigation"],
    notoriety: 7,
  },
  {
    id: 20,
    name: "Chiara Ferragni",
    alias: null,
    year: 2015,
    category: "Retail & E-Commerce",
    company: "Chiara Ferragni Brand",
    region: "Europe",
    fraudType: ["False Charitable Claims", "Consumer Fraud", "Misleading Advertising"],
    fraudAmount: 1000000,
    legalStatus: "Fined",
    outcome: "Fined by Italian regulators; triggered national legislation ('Ferragni Law')",
    sentence: "Regulatory fine",
    description:
      "Europe's most powerful fashion influencer orchestrated 'Pandorogate'—misleading millions of followers into believing premium Christmas cake purchases benefited a children's cancer hospital. In reality, a small fixed donation was made prior to the campaign. The scandal was so severe it triggered entirely new Italian legislation governing influencer marketing and charitable claims.",
    image: "ferragni",
    tags: ["influencer", "charity-fraud", "europe", "regulatory"],
    notoriety: 7,
  },
  {
    id: 21,
    name: "Inigo Philbrick",
    alias: null,
    year: 2017,
    category: "Art & Culture",
    company: "Inigo Philbrick Ltd.",
    region: "International",
    fraudType: ["Art Fraud", "Ponzi Scheme", "Fraudulent Collateral"],
    fraudAmount: 86000000,
    legalStatus: "Convicted",
    outcome: "Sentenced to 7 years in federal prison; apprehended in Vanuatu",
    sentence: "7 years",
    description:
      "Wunderkind art dealer who sold more than 100% ownership stakes in single artworks (including Basquiats) to multiple investors simultaneously, while using the same works as collateral for overlapping loans. Defrauded clients of $86M before fleeing internationally and was eventually captured on a remote Pacific island.",
    image: "philbrick",
    tags: ["art", "ponzi", "convicted", "fugitive"],
    notoriety: 7,
  },
  {
    id: 22,
    name: "Nate Chastain",
    alias: null,
    year: 2021,
    category: "Web3 / NFT",
    company: "OpenSea",
    region: "USA",
    fraudType: ["Insider Trading", "Money Laundering"],
    fraudAmount: 50000,
    legalStatus: "Convicted",
    outcome: "Convicted in first-ever digital asset insider trading case; 3-month prison sentence",
    sentence: "3 months",
    description:
      "Former Head of Product at OpenSea who front-ran NFT listings—secretly purchasing digital assets before they appeared on the platform's high-traffic homepage, then selling into the resulting price spike. Convicted in a landmark case establishing insider trading law applies to digital asset markets.",
    image: "chastain",
    tags: ["nft", "insider-trading", "convicted", "crypto"],
    notoriety: 6,
  },
  {
    id: 23,
    name: "Ishan Wahi",
    alias: null,
    year: 2021,
    category: "Web3 / Crypto",
    company: "Coinbase",
    region: "USA",
    fraudType: ["Insider Trading", "Securities Fraud"],
    fraudAmount: 1500000,
    legalStatus: "Convicted",
    outcome: "Sentenced to 2 years in federal prison",
    sentence: "2 years",
    description:
      "Former Coinbase product manager who tipped off his brother and a friend about crypto assets scheduled for exchange listing, generating $1.5M in illegal profits. The SEC utilized this case as a landmark to establish regulatory jurisdiction over cryptocurrency assets as securities.",
    image: "wahi",
    tags: ["crypto", "insider-trading", "convicted"],
    notoriety: 6,
  },
  {
    id: 24,
    name: "Elizabeth Holmes",
    alias: null,
    year: 2015,
    category: "Healthcare (Forbes Cover)",
    company: "Theranos",
    region: "USA",
    fraudType: ["Wire Fraud", "Technology Fabrication", "Investor Fraud"],
    fraudAmount: 945000000,
    legalStatus: "Convicted",
    outcome: "Sentenced to 11+ years; conviction upheld on appeal in 2025",
    sentence: "11+ years",
    description:
      "Never officially on the 30 Under 30 list but appeared on a Forbes cover in 2015 as 'youngest self-made female billionaire' ($4.5B net worth). Forbes was also forced to revise her net worth to $0. Featured speaker at the 30 Under 30 Summit. Her blood-testing technology was a complete fabrication that endangered patient lives.",
    image: "holmes",
    tags: ["healthcare", "technology-fraud", "convicted", "adjacent", "forbes-cover"],
    notoriety: 10,
  },
  {
    id: 25,
    name: "Trevor Milton",
    alias: null,
    year: 2019,
    category: "Energy / Automotive (Summit Speaker)",
    company: "Nikola Corporation",
    region: "USA",
    fraudType: ["Securities Fraud", "Wire Fraud", "Technology Fabrication"],
    fraudAmount: 168000000,
    legalStatus: "Convicted (Pardoned)",
    outcome: "Convicted; sentenced to 4 years; ordered $168M restitution; received presidential pardon in 2025",
    sentence: "4 years (pardoned)",
    description:
      "Founder of electric/hydrogen truck company Nikola who staged fake vehicle demonstrations—most infamously rolling a non-functional prototype down a hill to simulate propulsion. Convicted of securities and wire fraud in 2022. Received a full presidential pardon in early 2025, absolving him of $168M in investor restitution.",
    image: "milton",
    tags: ["automotive", "ev", "technology-fraud", "convicted", "pardoned", "adjacent"],
    notoriety: 9,
  },
  {
    id: 26,
    name: "Olivia Nuzzi",
    alias: null,
    year: 2018,
    category: "Media",
    company: "New York Magazine",
    region: "USA",
    fraudType: ["Journalistic Ethics Violation"],
    fraudAmount: 0,
    legalStatus: "Resigned",
    outcome: "Suspended then resigned from New York Magazine",
    sentence: "None",
    description:
      "Prominent political journalist who engaged in a personal relationship with U.S. Presidential candidate Robert F. Kennedy Jr. while actively covering his campaign, raising profound journalistic ethics and conflict-of-interest concerns that ended her tenure at New York Magazine.",
    image: "nuzzi",
    tags: ["media", "ethics", "non-financial"],
    notoriety: 4,
  },
  {
    id: 27,
    name: "Matilda Djerf",
    alias: null,
    year: 2023,
    category: "Retail & E-Commerce",
    company: "Djerf Avenue",
    region: "Europe",
    fraudType: ["Workplace Abuse", "Toxic Culture"],
    fraudAmount: 0,
    legalStatus: "Alleged",
    outcome: "Issued public apology; brand reputation severely damaged",
    sentence: "None",
    description:
      "Swedish fashion influencer and founder of Djerf Avenue, accused of severe workplace bullying and fostering a toxic corporate environment. Multiple former employees described intense psychological abuse, impossible standards, and a culture of fear. Issued a public apology but brand reputation was significantly damaged.",
    image: "djerf",
    tags: ["retail", "influencer", "workplace-abuse", "alleged", "europe"],
    notoriety: 4,
  },
];

const STATS = {
  // these numbers are real and that's the worst part
  totalHonorees: 10000,
  totalAlumniScandals: 27, // and counting, tragically
  totalFraudAmount: 63400000000, // sixty-three billion. with a B. as in "Buddy, what."
  legitimateVCRaised: 5300000000, // the non-fraud part. heartwarming by comparison.
  fraudToVCRatio: 3.5, // for every dollar raised legitimately, $3.50 was allegedly stolen
  convictionCount: 16, // formally found guilty by actual courts
  indictmentCount: 4,  // the pipeline replenishes itself
  allegedCount: 7,     // currently in or approaching the "vigorous denial" phase
  yearsSpan: "2011–2026",
  biggestFraud: "Do Kwon ($40B)", // one man. forty billion. a magazine profile.
  categories: {
    Finance: 10,       // shockingly, Finance leads
    Crypto: 6,         // the blockchain was supposed to prevent this
    Healthcare: 3,     // these ones are extra bad because people got hurt
    Media: 3,          // including people who WROTE FOR THE MAGAZINE
    Retail: 3,         // luggage and cake, somehow
    Technology: 3,
    Other: 4,          // includes fine art, which is its own special hell
  },
};

// Timeline of Events
// (or: "a chronological document of my disillusionment")
// Color-coded by type because some of us process grief through data visualization.
const TIMELINE_EVENTS = [
  { year: 2011, event: "Forbes 30 Under 30 franchise launched by editor Randall Lane", type: "milestone" },
  { year: 2012, event: "James O'Keefe honored (Media)", type: "honoree" },
  { year: 2013, event: "Martin Shkreli honored (Finance)", type: "honoree" },
  { year: 2014, event: "Cody Wilson honored (Law & Policy); Lucas Duplan honored (Finance)", type: "honoree" },
  { year: 2015, event: "Forbes names Elizabeth Holmes youngest self-made female billionaire on cover", type: "milestone" },
  { year: 2015, event: "Chiara Ferragni honored (Europe)", type: "honoree" },
  { year: 2016, event: "Steph Korey, Nate Paul, Obinwanne Okeke honored", type: "honoree" },
  { year: 2016, event: "Bitfinex hack occurs — $4.5B in bitcoin stolen (Morgan/Lichtenstein)", type: "fraud" },
  { year: 2017, event: "Rishi Shah / Outcome Health raises $500M at $5.6B valuation on fabricated metrics", type: "fraud" },
  { year: 2018, event: "Martin Shkreli sentenced to 7 years; Olivia Nuzzi honored (Media)", type: "legal" },
  { year: 2019, event: "Do Kwon, Ashneer Grover, Charlie Javice honored", type: "honoree" },
  { year: 2019, event: "Forbes 30U30 Summit; Trevor Milton and Elizabeth Holmes appear as featured guests", type: "milestone" },
  { year: 2019, event: "Cody Wilson sex offender plea deal; Obinwanne Okeke arrested by FBI", type: "legal" },
  { year: 2020, event: "Obinwanne Okeke sentenced to 10 years", type: "legal" },
  { year: 2021, event: "Sam Bankman-Fried honored; Joanna Smith-Griffin honored; Abraham Shafi honored", type: "honoree" },
  { year: 2021, event: "FTX / Alameda Research fraud fully operational; IRL raises $170M on fake metrics", type: "fraud" },
  { year: 2022, event: "Caroline Ellison honored (Finance)", type: "honoree" },
  { year: 2022, event: "Do Kwon's $40B Terra/Luna ecosystem collapses", type: "fraud" },
  { year: 2022, event: "FTX collapses; SBF arrested; DOJ seizes $3.6B in Bitfinex bitcoin (Morgan/Lichtenstein)", type: "legal" },
  { year: 2022, event: "Trevor Milton convicted of securities fraud", type: "legal" },
  { year: 2023, event: "Forbes publishes '30 Under 30 Hall of Shame'", type: "milestone" },
  { year: 2023, event: "Phadria Prendergast, Steph Korey, Matilda Djerf honored and subsequently embroiled in scandal", type: "honoree" },
  { year: 2023, event: "Sam Bankman-Fried convicted on 7 counts; sentenced to 25 years", type: "legal" },
  { year: 2023, event: "Charlie Javice indicted; Nate Chastain convicted (OpenSea insider trading)", type: "legal" },
  { year: 2024, event: "Joanna Smith-Griffin (AllHere) arrested; Abraham Shafi charged by SEC", type: "legal" },
  { year: 2024, event: "Rishi Shah sentenced to 7.5 years; Heather Morgan sentenced to 18 months", type: "legal" },
  { year: 2024, event: "Caroline Ellison sentenced to 2 years; Chiara Ferragni fined ('Pandorogate')", type: "legal" },
  { year: 2025, event: "Gökçe Güven honored on 2025 list — indicted weeks later for $7M fraud", type: "fraud" },
  { year: 2025, event: "Charlie Javice convicted; Trevor Milton receives presidential pardon", type: "legal" },
  { year: 2025, event: "Elizabeth Holmes' conviction upheld on appeal", type: "legal" },
];
