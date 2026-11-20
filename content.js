/* =====================================================================
   KENTO BABA — SITE CONTENT
   ---------------------------------------------------------------------
   This is the only file you need to edit to change the website.
   Every piece of text has an English (en) and Japanese (ja) version.
   Anything in [square brackets] / ［］ is a placeholder for you to fill.

   Quick guide (full guide in README.md):
   • Change text      → edit the words between the quotes '…'
   • Add a project    → copy a block in `cases` and change it
   • Add a photo      → put the file in /images and write its path in `src`
   • Keep the commas! Every block ends with a comma except the last one.
   ===================================================================== */

window.SITE = {

  /* ---------- About you ---------- */
  person: {
    name: 'kento baba',
    nameJa: '馬場健冬',
    email: 'kento22.sao@gmail.com',
    linkedin: 'https://www.linkedin.com/in/kentobaba/',
    resume: 'images/Kento_Baba_Resume.pdf',
    number: '04',                       // your old soccer number — the site's "issue number"
    camera: 'MINOLTA 303si SUPER',
    clockZone: 'Asia/Tokyo',            // live clock in the hero
    clockLabel: 'JST',
    place: { en: 'SAITAMA', ja: '埼玉' },
    fuel: { en: 'FUELLED BY ICED LONG BLACKS', ja: 'アイスロングブラックで動いています' }
  },

  /* ---------- Landing page: hero + intro ---------- */
  home: {
    role: { en: 'MARKETING — EVENTS · COMMUNITY · CONTENT', ja: 'マーケティング — イベント · コミュニティ · コンテンツ' },
    keywords: {
      en: 'Digital marketing · campaign planning · events · community · market research · EN / JP · digital marketing · campaign planning · events · community · market research · EN / JP',
      ja: 'デジタルマーケティング · キャンペーン企画 · イベント · コミュニティ · 市場調査 · EN / JP · デジタルマーケティング · キャンペーン企画 · イベント · コミュニティ · 市場調査'
    },
    tagline: { en: 'Marketing that translates.', ja: '国境を越えて、伝わる。' },
    intro: {
      en: 'Marketing graduate from Queensland University of Technology (QUT) with a passion for events, community building and content that brings people together around a brand.',
      ja: 'クイーンズランド工科大学（QUT）マーケティング専攻卒業。イベント、コミュニティづくり、そして人とブランドをつなぐコンテンツ制作に情熱を注いでいます。'
    },
    filmLine: {
      en: '[A line on why you shoot film — what you look for, and what it taught you about framing a story.]',
      ja: '［フィルムで撮る理由 — 何を見つめ、物語の切り取り方について何を学んだか］'
    }
  },

  /* ---------- Chapters (the big cards on the landing page) ----------
     visual: 'network-sun' | 'broadcast' | 'datagrid'
     stats:  count → the number animates up to this value             */
  chapters: [
    {
      id: 'qut', num: '01', word: 'JP', visual: 'network-sun',
      title: { en: 'QUT Japan', ja: 'QUT Japan' },
      role: { en: 'President', ja: '代表' },
      dates: { en: 'DEC 2024 – DEC 2025', ja: '2024年12月 – 2025年12月' },
      cardYears: '2024–2025',
      cardTitle: { en: 'QUT Japan — President', ja: 'QUT Japan — 代表' },
      cardDesc: { en: 'Led the QUT Japan student society: events, partnerships, social content and a growing community.', ja: '学生団体QUT Japanを率い、イベント、パートナーシップ、SNS運用、コミュニティの拡大を担当。' },
      chips: { en: ['+30% engagement', '+10% members', 'Events', 'Partnerships'], ja: ['エンゲージメント+30%', '会員数+10%', 'イベント', 'パートナーシップ'] },
      sub: { en: 'PRESIDENT · [COMMITTEE SIZE] · MARKETING, EVENTS, PARTNERSHIPS', ja: '代表 · ［運営メンバー数］ · マーケティング、イベント、パートナーシップ' },
      hook: { en: 'Leading the QUT Japan student society — events, partnerships, social content and a community that grew.', ja: 'QUT Japanの代表として、イベント、パートナーシップ、SNS運用を担い、コミュニティを成長させました。' },
      stats: [
        { value: '+30%', count: 30, prefix: '+', suffix: '%', label: { en: 'SOCIAL ENGAGEMENT', ja: 'SNSエンゲージメント' } },
        { value: '+10%', count: 10, prefix: '+', suffix: '%', label: { en: 'MEMBERS, YEAR ON YEAR', ja: '会員数（前年比）' } },
        { value: '[00]', label: { en: 'EVENTS RUN', ja: '開催イベント数' } },
        { value: '[00]', label: { en: 'PARTNERS', ja: 'パートナー' } }
      ],
      timeline: {
        kick: { en: 'THE YEAR', ja: 'この1年' },
        head: { en: 'Dec 2024 → Dec 2025', ja: '2024年12月 → 2025年12月' },
        side: { en: 'ONE YEAR AS PRESIDENT', ja: '代表としての1年' },
        items: [
          { date: { en: 'DEC 2024', ja: '2024年12月' }, title: { en: 'Took over as President', ja: '代表に就任' }, note: { en: '[What you set out to change]', ja: '［変えたかったこと］' } },
          { date: { en: '[MONTH] 2025', ja: '2025年［月］' }, title: { en: 'Welcome Party', ja: 'ウェルカムパーティー' }, note: { en: '[Turnout and one highlight]', ja: '［参加者数とハイライト］' } },
          { date: { en: '[MONTH] 2025', ja: '2025年［月］' }, title: { en: '[Milestone]', ja: '［マイルストーン］' }, note: { en: '[A partnership, a campaign, a record month…]', ja: '［パートナーシップ、キャンペーン、記録的な月など］' } },
          { date: { en: '[MONTH] 2025', ja: '2025年［月］' }, title: { en: 'End-of-Year Party', ja: '年末パーティー' }, note: { en: 'Strong attendance and a smoothly run night.', ja: '多くの参加者を集め、スムーズに運営。' } },
          { date: { en: 'DEC 2025', ja: '2025年12月' }, title: { en: 'Handed over', ja: '引き継ぎ' }, note: { en: '[What you left behind for the next committee]', ja: '［次の運営チームに残したもの］' } }
        ]
      },
      filmLabel: { en: 'ON FILM — MOMENTS FROM THE YEAR', ja: 'フィルム — この1年の瞬間' },
      film: [],   // add photos: { src: 'images/qut/01.jpg', caption: { en: 'Welcome Party', ja: 'ウェルカムパーティー' } }
      quote: { en: "[What leading QUT Japan taught you — about people, decisions, and what you'd do differently]", ja: '［QUT Japanの代表として学んだこと — 人、意思決定、次に活かしたいこと］' },
      cite: { en: '— KENTO BABA, PRESIDENT 2024–2025', ja: '— 馬場健冬、代表 2024–2025' }
    },
    {
      id: 'workato', num: '02', word: 'WOW', visual: 'broadcast',
      title: { en: 'Workato', ja: 'Workato' },
      role: { en: 'Field Marketing Intern', ja: 'フィールドマーケティング・インターン' },
      dates: { en: 'OCT 2026 – APR 2027', ja: '2026年10月 – 2027年4月' },
      cardYears: '2026–2027',
      cardTitle: { en: 'Workato — Field Marketing Intern', ja: 'Workato — フィールドマーケティング・インターン' },
      cardDesc: { en: 'Field marketing with Workato’s global team in Japan — WOW Tokyo, content creation and graphic design.', ja: '日本でWorkatoのグローバルチームとともにフィールドマーケティングを担当。WOW Tokyo、コンテンツ制作、グラフィックデザイン。' },
      chips: { en: ['WOW Tokyo', 'Content', 'Design'], ja: ['WOW Tokyo', 'コンテンツ', 'デザイン'] },
      sub: { en: 'FIELD MARKETING INTERN · JAPAN · GLOBAL TEAM', ja: 'フィールドマーケティング・インターン · 日本 · グローバルチーム' },
      hook: { en: 'Field marketing with Workato’s global team in Japan — WOW Tokyo, content creation and graphic design.', ja: '日本でWorkatoのグローバルチームとともにフィールドマーケティングを担当。WOW Tokyo、コンテンツ制作、グラフィックデザイン。' },
      stats: [
        { value: 'EN / JP', label: { en: 'WORKING LANGUAGES', ja: '使用言語' } },
        { value: '[000]', label: { en: 'WOW TOKYO ATTENDEES', ja: 'WOW Tokyo 参加者数' } },
        { value: '[00]', label: { en: 'POSTS PUBLISHED', ja: '公開した投稿' } },
        { value: '[00]', label: { en: 'DESIGNS DELIVERED', ja: '制作したデザイン' } }
      ],
      timeline: {
        kick: { en: 'THE INTERNSHIP', ja: 'インターンシップ' },
        head: { en: 'Oct 2026 → Apr 2027', ja: '2026年10月 → 2027年4月' },
        side: { en: 'FIELD MARKETING, JAPAN', ja: 'フィールドマーケティング、日本' },
        items: [
          { date: { en: 'OCT 2026', ja: '2026年10月' }, title: { en: 'Joined Workato', ja: 'Workatoに参加' }, note: { en: 'Field Marketing Intern, working with the global team in Japan.', ja: 'フィールドマーケティング・インターンとして、日本でグローバルチームと協働。' } },
          { date: { en: '[MONTH YEAR]', ja: '［年月］' }, title: { en: 'WOW Tokyo', ja: 'WOW Tokyo' }, note: { en: '[Your role and the biggest moment]', ja: '［役割と一番の瞬間］' } },
          { date: { en: '[MONTH YEAR]', ja: '［年月］' }, title: { en: '[Milestone]', ja: '［マイルストーン］' }, note: { en: '[A campaign, a launch, a first…]', ja: '［キャンペーン、ローンチ、初めての経験など］' } },
          { date: { en: 'APR 2027', ja: '2027年4月' }, title: { en: 'Wrapping up', ja: 'インターン修了' }, note: { en: '[What you’ll take from the internship]', ja: '［インターンで得たこと］' } }
        ]
      },
      filmLabel: { en: 'ON FILM — FROM THE INTERNSHIP', ja: 'フィルム — インターンの記録' },
      film: [],
      quote: { en: '[What working with a global marketing team taught you]', ja: '［グローバルなマーケティングチームで働いて学んだこと］' },
      cite: { en: '— KENTO BABA, FIELD MARKETING INTERN', ja: '— 馬場健冬、フィールドマーケティング・インターン' }
    },
    {
      id: 'uni', num: '03', word: 'QUT', visual: 'datagrid',
      title: { en: 'University', ja: '大学' },
      role: { en: 'Bachelor of Business (Marketing)', ja: 'ビジネス学士（マーケティング専攻）' },
      dates: { en: '2023 – 2025', ja: '2023 – 2025' },
      cardYears: '2023–2025',
      cardTitle: { en: 'University — QUT Marketing', ja: '大学 — QUT マーケティング専攻' },
      cardDesc: { en: 'Selected work from QUT’s Bachelor of Business (Marketing): market research, strategy and campaigns.', ja: 'QUTビジネス学士（マーケティング専攻）での主な課題：市場調査、戦略、キャンペーン。' },
      chips: { en: ['Market research', 'Strategy', 'Campaigns'], ja: ['市場調査', '戦略', 'キャンペーン'] },
      sub: { en: 'BACHELOR OF BUSINESS (MARKETING) · QUT · BRISBANE', ja: 'ビジネス学士（マーケティング専攻） · QUT · ブリスベン' },
      hook: { en: 'Selected work from QUT’s marketing degree — market research, strategy and campaigns.', ja: 'QUTマーケティング専攻での主な課題 — 市場調査、戦略、キャンペーン。' },
      stats: [
        { value: '2023–25', label: { en: 'AT QUT, BRISBANE', ja: 'QUT（ブリスベン）在学' } },
        { value: '03', label: { en: 'CASES IN THIS CHAPTER', ja: 'このチャプターのケース' } },
        { value: 'EN', label: { en: 'STUDIED IN A 2ND LANGUAGE', ja: '第二言語で学ぶ' } },
        { value: '[—]', label: { en: 'HIGHLIGHT / AWARD', ja: 'ハイライト・受賞' } }
      ],
      timeline: {
        kick: { en: 'THE DEGREE', ja: '学位' },
        head: { en: '2023 → 2025', ja: '2023 → 2025' },
        side: { en: 'BACHELOR OF BUSINESS (MARKETING)', ja: 'ビジネス学士（マーケティング専攻）' },
        items: [
          { date: { en: '2023', ja: '2023' }, title: { en: 'Started at QUT', ja: 'QUTに入学' }, note: { en: 'Bachelor of Business, majoring in Marketing.', ja: 'ビジネス学士、マーケティング専攻。' } },
          { date: { en: '[YEAR]', ja: '［年］' }, title: { en: '[Key unit or project]', ja: '［主要科目・プロジェクト］' }, note: { en: '[What clicked for you]', ja: '［手応えを感じたこと］' } },
          { date: { en: '[YEAR]', ja: '［年］' }, title: { en: 'Bundaberg Brewed Drinks', ja: 'Bundaberg Brewed Drinks' }, note: { en: 'A Japan market-entry strategy for an Australian brand.', ja: 'オーストラリアのブランドの日本市場参入戦略。' } },
          { date: { en: '2025', ja: '2025' }, title: { en: 'Graduated', ja: '卒業' }, note: { en: '[A line on finishing the degree]', ja: '［学位を終えて一言］' } }
        ]
      },
      filmLabel: { en: 'ON FILM — UNI DAYS', ja: 'フィルム — 大学生活' },
      film: [],
      quote: { en: '[What studying marketing in Australia — in your second language — taught you]', ja: '［オーストラリアで、第二言語でマーケティングを学んで得たこと］' },
      cite: { en: '— KENTO BABA, QUT 2023–2025', ja: '— 馬場健冬、QUT 2023–2025' }
    }
  ],

  /* ---------- Labels for the archive tags (chapter part of "QUT JAPAN · EVENTS") ---------- */
  chapterTags: {
    qut: { en: 'QUT JAPAN', ja: 'QUT JAPAN' },
    workato: { en: 'WORKATO', ja: 'WORKATO' },
    uni: { en: 'UNIVERSITY', ja: '大学' },
    personal: { en: 'PERSONAL', ja: '個人' }
  },

  /* ---------- Archive filter categories ---------- */
  categories: [
    { id: 'events', en: 'EVENTS', ja: 'イベント' },
    { id: 'content', en: 'CONTENT & SOCIAL', ja: 'コンテンツ・SNS' },
    { id: 'design', en: 'BRAND & DESIGN', ja: 'ブランド・デザイン' },
    { id: 'research', en: 'RESEARCH & STRATEGY', ja: '調査・戦略' },
    { id: 'partnerships', en: 'PARTNERSHIPS', ja: 'パートナーシップ' },
    { id: 'leadership', en: 'LEADERSHIP & COMMUNITY', ja: 'リーダーシップ・コミュニティ' },
    { id: 'data', en: 'DATA & DIGITAL', ja: 'データ・デジタル' },
    { id: 'personal', en: 'PERSONAL', ja: '個人・ライフスタイル' }
  ],

  /* ---------- Cases (every project) ----------
     chapter : which chapter it belongs to (qut / workato / uni / personal)
     code    : its track number inside the chapter (A1, A2…)
     word    : the word drawn in ASCII on the chapter preview
     page    : the full case-study page. Leave it out (or null) and the
               project shows as "SOON" with no page yet.
     link    : optional — send the row somewhere else instead (e.g. '#lens')  */
  cases: [
    /* ===== QUT JAPAN ===== */
    {
      id: 'eoy-party', chapter: 'qut', code: 'A1', word: 'EOY', category: 'events',
      title: { en: 'End-of-Year Party', ja: '年末パーティー' },
      line: { en: 'Promotion, content, procurement, budgeting and on-the-day coordination — strong attendance and a smoothly run night.', ja: '告知、コンテンツ制作、調達、予算管理、当日の運営を担当。多くの参加者を集め、スムーズに運営。' },
      page: {
        layout: 'event',
        header: { visual: 'stage' },
        title: { en: 'QUT Japan End-of-Year Party', ja: 'QUT Japan 年末パーティー' },
        hook: { en: 'Closing out the year for QUT Japan members — planned, promoted and run from first post to final song.', ja: 'QUT Japanメンバーのための年末イベント。最初の告知から最後の一曲まで、企画・宣伝・運営を担当。' },
        details: [
          { label: { en: 'ROLE', ja: '役割' }, value: { en: 'President, QUT Japan', ja: 'QUT Japan 代表' } },
          { label: { en: 'DATE', ja: '日付' }, value: { en: '[Date]', ja: '［日付］' } },
          { label: { en: 'VENUE', ja: '会場' }, value: { en: '[Venue], Brisbane', ja: '［会場］、ブリスベン' } },
          { label: { en: 'TEAM', ja: 'チーム' }, value: { en: '[Committee size]', ja: '［運営メンバー数］' } }
        ],
        stats: [
          { value: '[000]', label: { en: 'ATTENDEES', ja: '参加者' } },
          { value: '[00]', label: { en: 'PARTNERS / SPONSORS', ja: 'パートナー・スポンサー' } },
          { value: '[$000]', label: { en: 'BUDGET MANAGED', ja: '管理した予算' } },
          { value: '[00]', label: { en: 'POSTS & REELS', ja: '投稿・リール' } }
        ],
        filmLabel: { en: 'ON FILM — PHOTOS FROM THE NIGHT', ja: 'フィルム — 当日の写真' },
        film: [],   // { src: 'images/eoy/01.jpg', caption: { en: '…', ja: '…' } }
        sections: [
          { type: 'text', heading: { en: 'The brief', ja: '概要' }, paras: [
            { en: "Plan and run QUT Japan's end-of-year event for members — from the first promotion to the night itself.", ja: 'メンバー向けの年末イベントを、最初の告知から当日まで企画・運営する。' },
            { muted: true, en: '[Add the goal — who it was for, the budget, any constraints]', ja: '［目的 — 対象、予算、制約など］' }
          ] },
          { type: 'steps', heading: { en: 'Run of show', ja: '進行' }, items: [
            { title: { en: 'Promotion', ja: '告知' }, text: { en: 'Planned the promotional campaign.', ja: 'プロモーションを企画。' } },
            { title: { en: 'Content', ja: 'コンテンツ' }, text: { en: 'Created the posts and promo content.', ja: '告知投稿やプロモーション用コンテンツを制作。' } },
            { title: { en: 'Procurement & budget', ja: '調達・予算' }, text: { en: 'Sourced what the night needed and managed the budget.', ja: '当日に必要なものを手配し、予算を管理。' } },
            { title: { en: 'Stakeholders', ja: '関係者調整' }, text: { en: 'Kept the committee, venue and partners aligned.', ja: '運営メンバー、会場、パートナーとの調整。' } },
            { title: { en: 'On the night', ja: '当日' }, text: { en: 'Ran operations so the event went smoothly.', ja: 'イベントがスムーズに進むよう当日の運営を担当。' } }
          ] },
          { type: 'reel', heading: { en: 'Recap reel', ja: 'リキャップ動画' }, video: '', label: { en: 'RECAP REEL — [ADD VIDEO]', ja: 'リキャップ動画 — ［動画を追加］' } },
          { type: 'outcome', heading: { en: 'Outcome', ja: '成果' },
            text: { en: 'Strong attendance and a smoothly run night.', ja: '多くの参加者を集め、スムーズに運営。' },
            muted: { en: '[Add any results — turnout against target, feedback, budget outcome]', ja: '［成果 — 目標に対する参加者数、フィードバック、予算の結果］' },
            quote: { en: '“[A line from an attendee, partner or committee member]”', ja: '「［参加者・パートナー・運営メンバーの声］」' },
            cite: { en: '— [NAME, ROLE]', ja: '— ［名前、役職］' } },
          { type: 'text', heading: { en: 'Reflection', ja: '振り返り' }, paras: [
            { muted: true, en: "[What you learned running it, and what you'd do differently next time]", ja: '［運営して学んだこと、次に改善したいこと］' }
          ] }
        ]
      }
    },
    {
      id: 'welcome-party', chapter: 'qut', code: 'A2', word: 'HELLO', category: 'events',
      title: { en: 'Welcome Party', ja: 'ウェルカムパーティー' },
      line: { en: '[Your role, the turnout and one result]', ja: '［役割、参加者数、成果］' }
    },
    {
      id: 'qut-partnerships', chapter: 'qut', code: 'A3', word: 'P&S', category: 'partnerships',
      title: { en: 'Partnerships & sponsors', ja: 'パートナーシップ・スポンサー' },
      line: { en: 'Sought external sponsors and partners, and managed stakeholder communication. [Add how many / who]', ja: '外部スポンサーやパートナーの獲得に取り組み、関係者とのコミュニケーションを担当。［件数・企業名］' }
    },
    {
      id: 'qut-social', chapter: 'qut', code: 'A4', word: '+30%', category: 'content',
      title: { en: 'Social content', ja: 'SNSコンテンツ' },
      line: { en: 'Instagram content planned and made in Canva, CapCut and Meta — 30% more engagement on the official account.', ja: 'Canva、CapCut、Metaを使ってInstagramコンテンツを企画・制作し、公式アカウントのエンゲージメントが30%増加。' }
    },
    {
      id: 'qut-leadership', chapter: 'qut', code: 'A5', word: '+10%', category: 'leadership',
      title: { en: 'Leading the committee', ja: '運営チームのリード' },
      line: { en: 'Led the committee and grew membership 10% year on year. [Add team size and how you led]', ja: '運営チームを率い、会員数を前年比10%増加。［チーム人数とリーダーシップの詳細］' }
    },

    /* ===== WORKATO ===== */
    {
      id: 'wow-tokyo', chapter: 'workato', code: 'A1', word: 'WOW', category: 'events',
      title: { en: 'WOW Tokyo', ja: 'WOW Tokyo' },
      line: { en: '[Your role at WOW Tokyo, who it was for, and one result]', ja: '［WOW Tokyoでの役割、対象、成果］' }
    },
    {
      id: 'workato-content', chapter: 'workato', code: 'A2', word: 'POST', category: 'content',
      title: { en: 'Content creation', ja: 'コンテンツ制作' },
      line: { en: 'LinkedIn posts and campaign content for Workato in Japan. [Add examples and results]', ja: 'Workato日本向けのLinkedIn投稿やキャンペーン用コンテンツ。［事例と成果］' }
    },
    {
      id: 'workato-design', chapter: 'workato', code: 'A3', word: 'DSGN', category: 'design',
      title: { en: 'Graphic design', ja: 'グラフィックデザイン' },
      line: { en: '[Event visuals, social graphics — add examples]', ja: '［イベント用ビジュアル、SNS用グラフィックなど］' }
    },
    {
      id: 'workato-extra', chapter: 'workato', code: 'A4', word: '[ ]', category: 'content',
      title: { en: '[Project title]', ja: '［プロジェクト名］' },
      line: { en: '[Another piece of work from the internship]', ja: '［インターンでのその他の実績］' }
    },

    /* ===== UNIVERSITY ===== */
    {
      id: 'bundaberg', chapter: 'uni', code: 'A1', word: 'JP', category: 'research',
      title: { en: 'Bundaberg Brewed Drinks: Japan market entry', ja: 'Bundaberg Brewed Drinks：日本市場への進出' },
      line: { en: 'Market research, brand positioning and a localisation strategy for Japan.', ja: '市場調査、ブランドポジショニング、日本向けローカライズ戦略。' },
      page: {
        layout: 'research',
        header: { visual: 'bubbles', route: ['BUNDABERG, QLD · 24.9°S', 'TOKYO · 35.7°N'] },
        title: { en: 'Bundaberg Brewed Drinks: expanding into Japan', ja: 'Bundaberg Brewed Drinks：日本市場への進出' },
        hook: { en: "Could an Australian brewed soft drink win over Japanese consumers? A market-entry study of Japan's non-alcoholic beverage sector.", ja: 'オーストラリアのブルードソフトドリンクは、日本の消費者に受け入れられるのか？日本のノンアルコール飲料市場への参入戦略を検討しました。' },
        details: [
          { label: { en: 'ROLE', ja: '役割' }, value: { en: '[Your role in the team]', ja: '［チームでの役割］' } },
          { label: { en: 'TEAM', ja: 'チーム' }, value: { en: '[Group size]', ja: '［人数］' } },
          { label: { en: 'TIMELINE', ja: '期間' }, value: { en: '[Semester, year]', ja: '［学期・年］' } },
          { label: { en: 'METHODS', ja: '手法' }, value: { en: 'Market & environment research, positioning analysis', ja: '市場・環境調査、ポジショニング分析' } }
        ],
        filmLabel: { en: 'ON FILM — SLIDES, CHARTS & MOCKUPS FROM THE PROJECT', ja: 'フィルム — スライド、チャート、モックアップ' },
        film: [],   // { src: 'images/bundaberg/slide-1.jpg', caption: { en: '…', ja: '…' } }
        filmPlaceholders: ['SLIDE', 'CHART', 'MOCKUP', 'SLIDE', 'CHART', 'PHOTO'],
        sections: [
          { type: 'text', heading: { en: 'The brief', ja: '概要' }, paras: [
            { en: "Assess Bundaberg Brewed Drinks' potential in Japan, and recommend how the brand should enter the market.", ja: 'Bundaberg Brewed Drinksの日本市場での可能性を評価し、参入方法を提案する。' },
            { muted: true, en: '[Add detail from the brief — the unit, the client question, any constraints]', ja: '［課題の詳細 — 科目、クライアントの問い、制約など］' }
          ] },
          { type: 'list', heading: { en: 'The research', ja: '調査' }, items: [
            { en: "Consumer trends in Japan's non-alcoholic drinks market", ja: '日本のノンアルコール飲料市場の消費者トレンド' },
            { en: 'Cultural factors that shape taste and buying behaviour', ja: '嗜好や購買行動に影響する文化的要因' },
            { en: 'Competitors on the shelf Bundaberg would be entering', ja: '参入先の売り場での競合' },
            { en: 'Barriers to entry', ja: '参入障壁' }
          ] },
          { type: 'text', heading: { en: 'Positioning', ja: 'ポジショニング' }, paras: [
            { en: "Assessed Bundaberg's brand positioning and product–market fit for Japanese consumers.", ja: '日本の消費者に向けた、Bundabergのブランドポジショニングと製品・市場の適合性を評価。' },
            { muted: true, en: "[Where the brand fits in Japan — and where it doesn't]", ja: '［日本でブランドが合う点、合わない点］' }
          ] },
          { type: 'cards', heading: { en: 'Recommendations', ja: '提案' }, cards: [
            { tag: { en: 'TARGET AUDIENCE', ja: 'ターゲット' }, text: { en: '[Who Bundaberg should speak to first in Japan]', ja: '［日本で最初に狙うべき顧客層］' } },
            { tag: { en: 'PROMOTION', ja: 'プロモーション' }, text: { en: '[How to reach them — channels, message]', ja: '［届け方 — チャネル、メッセージ］' } },
            { tag: { en: 'LOCALISATION', ja: 'ローカライズ' }, text: { en: '[What changes for Japan — product, packaging, story]', ja: '［日本向けに変えること — 製品、パッケージ、ストーリー］' } }
          ] },
          { type: 'text', heading: { en: 'Reflection', ja: '振り返り' }, paras: [
            { muted: true, en: "[What you learned, the result or feedback, and what you'd do differently next time]", ja: '［学んだこと、結果やフィードバック、次に改善したいこと］' }
          ] }
        ]
      }
    },
    {
      id: 'uni-project-2', chapter: 'uni', code: 'A2', word: '[ ]', category: 'research',
      title: { en: '[University project]', ja: '［大学プロジェクト］' },
      line: { en: '[The unit, the brief and your contribution]', ja: '［科目、課題、担当内容］' }
    },
    {
      id: 'uni-project-3', chapter: 'uni', code: 'A3', word: '[ ]', category: 'design',
      title: { en: '[University project]', ja: '［大学プロジェクト］' },
      line: { en: '[The unit, the brief and your contribution]', ja: '［科目、課題、担当内容］' }
    },

    /* ===== PERSONAL (shows in the archive only) ===== */
    {
      id: 'film-photography', chapter: 'personal', category: 'personal', link: 'index.html#lens',
      title: { en: '35mm photography', ja: '35mmフィルム写真' },
      line: { en: 'Shooting on film — see Through the lens below.', ja: 'フィルムでの撮影。下の「レンズ越しに」をご覧ください。' }
    },
    {
      id: 'personal-music', chapter: 'personal', category: 'personal',
      title: { en: '[Music]', ja: '［音楽］' },
      line: { en: '[A mix, a playlist or a track you made — or delete this]', ja: '［ミックス、プレイリスト、制作した曲など — 不要なら削除］' }
    },
    {
      id: 'personal-fashion', chapter: 'personal', category: 'personal',
      title: { en: '[Fashion]', ja: '［ファッション］' },
      line: { en: '[Styling, a lookbook, a brand you love and why — or delete this]', ja: '［スタイリング、ルックブック、好きなブランドとその理由など — 不要なら削除］' }
    },
    {
      id: 'personal-design', chapter: 'personal', category: 'personal',
      title: { en: '[Design]', ja: '［デザイン］' },
      line: { en: '[Posters, graphics, anything you designed for fun — or delete this]', ja: '［ポスター、グラフィックなど、趣味でデザインしたもの — 不要なら削除］' }
    }
  ],

  /* ---------- Experience ("Set times") ---------- */
  experience: [
    { current: true, date: { en: 'OCT 2026 – APR 2027', ja: '2026年10月 – 2027年4月' }, title: { en: 'Field Marketing Intern — Workato', ja: 'フィールドマーケティング・インターン — Workato' }, text: { en: 'Field marketing with Workato’s global team in Japan: WOW Tokyo, content creation and graphic design. [Add details]', ja: '日本でWorkatoのグローバルチームとともにフィールドマーケティングを担当：WOW Tokyo、コンテンツ制作、グラフィックデザイン。［詳細を追加］' } },
    { date: { en: 'DEC 2024 – DEC 2025', ja: '2024年12月 – 2025年12月' }, title: { en: 'President — QUT Japan', ja: '代表 — QUT Japan' }, text: { en: 'Led marketing and events: promotional campaigns, budgets, sponsorships and stakeholder communication.', ja: 'マーケティングとイベント運営を統括：プロモーション、予算、スポンサー、関係者との調整。' } },
    { date: { en: 'APR 2025 – OCT 2026', ja: '2025年4月 – 2026年10月' }, title: { en: 'Retail Assistant — Big W', ja: 'リテールアシスタント — Big W' }, text: { en: 'Tailored sales and upselling, led merchandising team operations, high-volume customer service.', ja: 'お客様に合わせた提案販売、マーチャンダイジングチームのリード、繁忙店舗での接客。' } },
    { date: { en: '2023 – 2025', ja: '2023 – 2025' }, title: { en: 'Bachelor of Business (Marketing) — QUT', ja: 'ビジネス学士（マーケティング専攻）— QUT' }, text: { en: 'Market research and analysis, campaign development, consumer behaviour, marketing strategy.', ja: '市場調査・分析、キャンペーン開発、消費者行動、マーケティング戦略。' } }
  ],

  /* ---------- Film photos on the landing page ("Through the lens") ----------
     Add up to ~12. Wide (3:2) photos look best.
     { src: 'images/film/01.jpg', place: 'Tokyo', year: '2025' }          */
  film: [],

  /* ---------- Toolkit ---------- */
  tools: [
    { label: { en: 'MARKETING & CRM', ja: 'マーケティング・CRM' }, items: ['Meta Business Suite', 'Google Ads'] },
    { label: { en: 'CONTENT & DESIGN', ja: 'コンテンツ・デザイン' }, items: ['Canva', 'Photoshop', 'Figma', 'CapCut', 'Premiere Pro'] },
    { label: { en: 'PROJECT & COLLABORATION', ja: 'プロジェクト管理・コラボレーション' }, items: ['Jira', 'Trello', 'Notion', 'Teams', 'Slack'] },
    { label: { en: 'ANALYTICS & REPORTING', ja: '分析・レポーティング' }, items: ['Power BI', 'Tableau', 'Excel'] },
    { label: { en: 'INSIGHTS & DATA', ja: 'インサイト・データ' }, items: ['Qualtrics', 'SurveyMonkey', 'SPSS', 'R', { en: 'Python (basic)', ja: 'Python（基礎）' }, { en: 'SQL (basic)', ja: 'SQL（基礎）' }] },
    { label: { en: 'LANGUAGES & CERTIFICATES', ja: '言語・資格' }, items: [{ en: 'Japanese — native', ja: '日本語 — ネイティブ' }, { en: 'English — IELTS 7.5', ja: '英語 — IELTS 7.5' }, 'SQL & Python — HackerRank', 'Bloomberg Finance Fundamentals'] }
  ],

  /* ---------- Interface words (menus, buttons, labels) ---------- */
  ui: {
    en: {
      navWork: 'WORK', navExp: 'EXPERIENCE', navFilm: 'FILM', navTools: 'TOOLKIT', navContact: 'CONTACT',
      shootHint: '[ CLICK TO SHOOT ]', viewWork: 'View work', resume: 'Download résumé',
      workKick: '01 — SELECTED WORK', workHead: 'Projects', workHint: 'HOVER TO TUNE IN', chapter: 'CHAPTER',
      archKick: '02 — ARCHIVE', archHead: 'Everything else', all: 'ALL', inProgress: 'IN PROGRESS', emptyLine: 'New {cat} work is on the way.',
      showAll: 'SHOW ALL', showLess: 'SHOW LESS',
      expKick: '03 — EXPERIENCE', expHead: 'Set times',
      lensKick: '04 — OFF DUTY · 35MM', lensHead: 'Through the lens', placeYear: '[PLACE · YEAR]', scroll: 'SCROLL →',
      toolKick: '05 — TOOLKIT', toolHead: 'Equipment',
      hello: 'Say hello', helloDot: '.', helloLine: 'English or 日本語 — either works.', resumePdf: 'RÉSUMÉ (PDF)',
      rollDone: 'ROLL COMPLETE — 36 / 36', rollLine: 'Let’s develop something together →',
      allWork: '← ALL WORK', back: 'BACK', allWorkT: 'All work', hoverPause: 'HOVER TO PAUSE',
      sideA: 'SIDE A — {n} TRACKS', theWork: 'The work', hoverTrack: 'HOVER A TRACK TO PREVIEW',
      statusReady: 'CASE →', statusSoon: 'SOON', ctaReady: 'OPEN CASE →', ctaSoon: 'CASE COMING SOON',
      reflection: 'REFLECTION', prevChapter: '← PREVIOUS CHAPTER — {n}', nextChapter: 'NEXT CHAPTER — {n} →', loopChapter: 'BACK TO CHAPTER — {n} →',
      backToChapter: '← BACK TO CHAPTER — {n}', nextInChapter: 'NEXT IN THIS CHAPTER — {code} →', soonSuffix: ' (SOON)',
      caseKick: 'CHAPTER {n} · {code} — {cat}', photo: 'PHOTO', caption: '[CAPTION]', rec: '● REC [00:00]'
    },
    ja: {
      navWork: '実績', navExp: '経歴', navFilm: 'フィルム', navTools: 'スキル', navContact: 'お問い合わせ',
      shootHint: '[ クリックで撮影 ]', viewWork: '実績を見る', resume: '履歴書をダウンロード',
      workKick: '01 — 主な実績', workHead: 'プロジェクト', workHint: 'ホバーで表示', chapter: 'チャプター',
      archKick: '02 — アーカイブ', archHead: 'その他の実績', all: 'すべて', inProgress: '準備中', emptyLine: '{cat}の実績を準備中です。',
      showAll: 'すべて表示', showLess: '閉じる',
      expKick: '03 — 経歴', expHead: 'タイムテーブル',
      lensKick: '04 — オフの時間 · 35MM', lensHead: 'レンズ越しに', placeYear: '［場所 · 年］', scroll: 'スクロール →',
      toolKick: '05 — スキル', toolHead: '使用ツール',
      hello: 'お気軽にご連絡を', helloDot: '。', helloLine: '日本語でも英語でも、どちらでも大丈夫です。', resumePdf: '履歴書（PDF）',
      rollDone: '撮り切り — 36 / 36', rollLine: '一緒に何かを「現像」しませんか →',
      allWork: '← 実績一覧', back: '戻る', allWorkT: '実績一覧', hoverPause: 'ホバーで一時停止',
      sideA: 'SIDE A — {n}トラック', theWork: '取り組み', hoverTrack: 'ホバーでプレビュー',
      statusReady: 'ケース →', statusSoon: '準備中', ctaReady: 'ケースを見る →', ctaSoon: '準備中',
      reflection: '振り返り', prevChapter: '← 前のチャプター — {n}', nextChapter: '次のチャプター — {n} →', loopChapter: 'チャプター{n}に戻る →',
      backToChapter: '← チャプターに戻る — {n}', nextInChapter: 'このチャプターの次 — {code} →', soonSuffix: '（準備中）',
      caseKick: 'チャプター {n} · {code} — {cat}', photo: 'PHOTO', caption: '［キャプション］', rec: '● REC [00:00]'
    }
  }
};
