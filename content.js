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
      cardDesc: { en: 'Field marketing in Japan for Workato, an enterprise AI company — WOW Tokyo, content and design.', ja: 'エンタープライズAI企業Workatoで、日本のフィールドマーケティングを担当。WOW Tokyo、コンテンツ、デザイン。' },
      chips: { en: ['WOW Tokyo', 'Field marketing', 'AI'], ja: ['WOW Tokyo', 'フィールドマーケティング', 'AI'] },
      sub: { en: 'FIELD MARKETING INTERN · JAPAN · GLOBAL TEAM', ja: 'フィールドマーケティング・インターン · 日本 · グローバルチーム' },
      hook: { en: 'Field marketing in Japan for Workato, an enterprise AI company — WOW Tokyo, content and design, with a global team.', ja: 'エンタープライズAI企業Workatoで、日本のフィールドマーケティングを担当。WOW Tokyo、コンテンツ、デザインをグローバルチームとともに。' },
      stats: [
        { value: 'EN / JP', label: { en: 'WORKING LANGUAGES', ja: '使用言語' } },
        { value: '[000]', label: { en: 'WOW TOKYO ATTENDEES', ja: 'WOW Tokyo 参加者数' } },
        { value: '02', label: { en: 'DAYS AT WOW TOKYO', ja: 'WOW Tokyo の日数' } },
        { value: '[00]', label: { en: 'POSTS & DESIGNS', ja: '投稿・デザイン' } }
      ],
      timeline: {
        kick: { en: 'THE INTERNSHIP', ja: 'インターンシップ' },
        head: { en: 'Oct 2026 → Apr 2027', ja: '2026年10月 → 2027年4月' },
        side: { en: 'FIELD MARKETING, JAPAN', ja: 'フィールドマーケティング、日本' },
        items: [
          { date: { en: 'OCT 2026', ja: '2026年10月' }, title: { en: 'Joined Workato', ja: 'Workatoに参加' }, note: { en: 'Field Marketing Intern, working with the global team in Japan.', ja: 'フィールドマーケティング・インターンとして、日本でグローバルチームと協働。' } },
          { date: { en: 'NOV 2026', ja: '2026年11月' }, title: { en: 'WOW Tokyo', ja: 'WOW Tokyo' }, note: { en: 'Workato’s AI conference in Tokyo, 18–19 Nov. [Your role and the biggest moment]', ja: 'WorkatoのAIカンファレンス、11月18–19日に東京で開催。［役割と一番の瞬間］' } },
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
      line: { en: 'Led the planning, preparation and running of QUT Japan\'s welcome event, open to every QUT student. [Add the turnout]', ja: 'QUT Japanのウェルカムイベントを企画・準備・運営。QUTの全学生が対象。［参加者数を追加］' },
      page: {
        layout: 'event',
        header: { visual: 'matsuri' },   // lanterns and fireworks — click the header to launch one
        title: { en: 'QUT Japan Welcome Party', ja: 'QUT Japan ウェルカムパーティー' },
        hook: { en: 'Opening the doors to every QUT student — a night to meet people, try something new and find a community.', ja: 'QUTのすべての学生に向けて。新しい人に出会い、新しいことに触れ、コミュニティを見つける夜。' },
        details: [
          { label: { en: 'ROLE', ja: '役割' }, value: { en: 'President, QUT Japan', ja: 'QUT Japan 代表' } },
          { label: { en: 'DATE', ja: '日付' }, value: { en: '[Date]', ja: '［日付］' } },
          { label: { en: 'VENUE', ja: '会場' }, value: { en: '[Venue], Brisbane', ja: '［会場］、ブリスベン' } },
          { label: { en: 'OPEN TO', ja: '対象' }, value: { en: 'All QUT students', ja: 'QUTの全学生' } }
        ],
        stats: [
          { value: '[000]', label: { en: 'ATTENDEES', ja: '参加者' } },
          { value: '[00]', label: { en: 'NEW MEMBERS', ja: '新規メンバー' } },
          { value: '[00]', label: { en: 'PARTNERS / SPONSORS', ja: 'パートナー・スポンサー' } },
          { value: '[00]', label: { en: 'POSTS & REELS', ja: '投稿・リール' } }
        ],
        filmLabel: { en: 'ON FILM — PHOTOS FROM THE NIGHT', ja: 'フィルム — 当日の写真' },
        film: [],
        filmPlaceholders: ['PHOTO'],
        sections: [
          { type: 'text', heading: { en: 'The brief', ja: '概要' }, paras: [
            { en: 'Plan and run QUT Japan\'s welcome event — open to any QUT student, whatever their background or how much Japanese they know.', ja: 'QUT Japanのウェルカムイベントを企画・運営する。日本語のレベルやバックグラウンドを問わず、QUTのすべての学生が対象。' },
            { muted: true, en: '[Add the goal — e.g. members to sign up, the budget, any constraints]', ja: '［目的 — 例：新規メンバー数、予算、制約など］' }
          ] },
          { type: 'steps', heading: { en: 'Run of show', ja: '進行' }, items: [
            { title: { en: 'Planning & prep', ja: '企画・準備' }, text: { en: 'Led the planning and preparation with the committee.', ja: '運営メンバーとともに企画と準備をリード。' } },
            { title: { en: 'Promotion', ja: '告知' }, text: { en: '[How the event was promoted]', ja: '［イベントの告知方法］' } },
            { title: { en: 'Content', ja: 'コンテンツ' }, text: { en: '[Posts and promo content made]', ja: '［制作した投稿・告知コンテンツ］' } },
            { title: { en: 'Logistics & budget', ja: '手配・予算' }, text: { en: '[What was organised — food, activities, venue]', ja: '［手配したもの — 食べ物、アクティビティ、会場］' } },
            { title: { en: 'On the night', ja: '当日' }, text: { en: 'Led the event on the night.', ja: '当日のイベントをリード。' } }
          ] },
          { type: 'reel', heading: { en: 'Recap reel', ja: 'リキャップ動画' }, video: '', label: { en: 'RECAP REEL — [ADD VIDEO]', ja: 'リキャップ動画 — ［動画を追加］' } },
          { type: 'outcome', heading: { en: 'Outcome', ja: '成果' },
            text: { en: '[The turnout and what the night achieved]', ja: '［参加者数とイベントの成果］' },
            muted: { en: '[Add any results — sign-ups, feedback, what happened next]', ja: '［成果 — 入会者数、フィードバック、その後の展開］' },
            quote: { en: '“[A line from an attendee or committee member]”', ja: '「［参加者・運営メンバーの声］」' },
            cite: { en: '— [NAME, ROLE]', ja: '— ［名前、役職］' } },
          { type: 'text', heading: { en: 'Reflection', ja: '振り返り' }, paras: [
            { muted: true, en: "[What you learned welcoming new people in, and what you'd do differently next time]", ja: '［新しい人を迎えて学んだこと、次に改善したいこと］' }
          ] }
        ]
      }
    },
    {
      id: 'qut-partnerships', chapter: 'qut', code: 'A3', word: 'P&S', category: 'partnerships',
      title: { en: 'Partnerships & sponsors', ja: 'パートナーシップ・スポンサー' },
      line: { en: 'Sought external sponsors and partners, and managed stakeholder communication. [Add how many / who]', ja: '外部スポンサーやパートナーの獲得に取り組み、関係者とのコミュニケーションを担当。［件数・企業名］' }
,
      page: {
        layout: 'research',
        header: { visual: 'orbit' },   // QUT Japan at the centre, partners orbiting around it
        title: { en: 'Partnerships & sponsors', ja: 'パートナーシップ・スポンサー' },
        hook: { en: 'Building a network around QUT Japan — partners who supported the club\'s events and gave members more.', ja: 'QUT Japanを中心にネットワークをつくる — イベントを支え、メンバーに還元してくれるパートナーたち。' },
        details: [
          { label: { en: 'ROLE', ja: '役割' }, value: { en: 'President, QUT Japan', ja: 'QUT Japan 代表' } },
          { label: { en: 'PERIOD', ja: '期間' }, value: { en: 'Dec 2024 – Dec 2025', ja: '2024年12月 – 2025年12月' } },
          { label: { en: 'PARTNERS', ja: 'パートナー' }, value: { en: '[Restaurants, a supermarket, other clubs — confirm]', ja: '［レストラン、スーパー、他サークルなど — 確認］' } },
          { label: { en: 'FOCUS', ja: '担当' }, value: { en: 'Sponsorship and stakeholder communication', ja: 'スポンサー獲得・関係者コミュニケーション' } }
        ],
        stats: [
          { value: '[00]', label: { en: 'PARTNERS & SPONSORS', ja: 'パートナー・スポンサー' } },
          { value: '[00]', label: { en: 'RESTAURANTS & SHOPS', ja: 'レストラン・店舗' } },
          { value: '[00]', label: { en: 'CLUB COLLABS', ja: 'サークル連携' } },
          { value: '[$000]', label: { en: 'VALUE FOR MEMBERS', ja: 'メンバーへの還元' } }
        ],
        filmLabel: { en: 'ON FILM — PARTNERS & COLLABS', ja: 'フィルム — パートナーとコラボ' },
        film: [],
        filmPlaceholders: ['PHOTO'],
        sections: [
          { type: 'text', heading: { en: 'The brief', ja: '概要' }, paras: [
            { en: 'Bring in external sponsors and partners to support QUT Japan\'s events — and give members more for being part of the club.', ja: 'QUT Japanのイベントを支える外部スポンサーやパートナーを獲得し、メンバーへの還元を増やす。' },
            { muted: true, en: '[Add the goal — e.g. funding for events, member discounts, a target number of partners]', ja: '［目的 — 例：イベント資金、メンバー割引、パートナー数の目標］' }
          ] },
          { type: 'partners', heading: { en: 'The partner wall', ja: 'パートナー' }, note: { en: '[Add names and logos — only with each partner\'s OK]', ja: '［名前とロゴを追加 — 各パートナーの許可を得てから］' }, partners: [
            { name: { en: '[Restaurant]', ja: '［レストラン］' }, type: { en: 'RESTAURANT', ja: 'レストラン' }, logo: '' },
            { name: { en: '[Restaurant]', ja: '［レストラン］' }, type: { en: 'RESTAURANT', ja: 'レストラン' }, logo: '' },
            { name: { en: '[Restaurant]', ja: '［レストラン］' }, type: { en: 'RESTAURANT', ja: 'レストラン' }, logo: '' },
            { name: { en: '[Supermarket]', ja: '［スーパー］' }, type: { en: 'SUPERMARKET', ja: 'スーパー' }, logo: '' },
            { name: { en: '[Club]', ja: '［サークル］' }, type: { en: 'CLUB COLLAB', ja: 'サークル連携' }, logo: '' },
            { name: { en: '[Club]', ja: '［サークル］' }, type: { en: 'CLUB COLLAB', ja: 'サークル連携' }, logo: '' },
            { name: { en: '[Partner]', ja: '［パートナー］' }, type: { en: 'PARTNER', ja: 'パートナー' }, logo: '' },
            { name: { en: '[Partner]', ja: '［パートナー］' }, type: { en: 'PARTNER', ja: 'パートナー' }, logo: '' }
          ] },
          { type: 'steps', heading: { en: 'How it worked', ja: '進め方' }, items: [
            { title: { en: 'Find', ja: 'リサーチ' }, text: { en: '[How you found and chose potential partners]', ja: '［パートナー候補の探し方・選び方］' } },
            { title: { en: 'Pitch', ja: '提案' }, text: { en: 'Approached external sponsors and partners. [Add what you offered them]', ja: '外部スポンサーやパートナーにアプローチ。［提案内容を追加］' } },
            { title: { en: 'Agree', ja: '合意' }, text: { en: '[What the club and members got — funding, discounts, prizes]', ja: '［クラブとメンバーが得たもの — 資金、割引、景品］' } },
            { title: { en: 'Keep in touch', ja: '関係維持' }, text: { en: 'Managed stakeholder communication throughout.', ja: '関係者とのコミュニケーションを継続的に担当。' } },
            { title: { en: 'Deliver', ja: '実施' }, text: { en: '[How partners were featured — events, posts, member perks]', ja: '［パートナーの紹介方法 — イベント、投稿、会員特典］' } }
          ] },
          { type: 'cards', heading: { en: 'What each side got', ja: 'それぞれのメリット' }, cards: [
            { tag: { en: 'FOR PARTNERS', ja: 'パートナー' }, text: { en: '[e.g. promotion to members, a spot at events]', ja: '［例：メンバーへの告知、イベントでの紹介］' } },
            { tag: { en: 'FOR MEMBERS', ja: 'メンバー' }, text: { en: '[e.g. discounts, prizes, food at events]', ja: '［例：割引、景品、イベントでの食事］' } },
            { tag: { en: 'FOR THE CLUB', ja: 'クラブ' }, text: { en: '[e.g. funding, bigger events, new collabs]', ja: '［例：資金、より大きなイベント、新しいコラボ］' } }
          ] },
          { type: 'outcome', heading: { en: 'Outcome', ja: '成果' },
            text: { en: '[How many partners came on board, and what it made possible]', ja: '［パートナー数と、それによって実現できたこと］' },
            muted: { en: '[Add any results — renewals, member feedback, events it funded]', ja: '［成果 — 継続、メンバーの声、実現したイベント］' },
            quote: { en: '“[A line from a partner or committee member]”', ja: '「［パートナー・運営メンバーの声］」' },
            cite: { en: '— [NAME, ROLE]', ja: '— ［名前、役職］' } },
          { type: 'text', heading: { en: 'Reflection', ja: '振り返り' }, paras: [
            { muted: true, en: '[What you learned about pitching and keeping partners happy]', ja: '［提案やパートナーとの関係づくりで学んだこと］' }
          ] }
        ]
      }
    },
    {
      id: 'qut-social', chapter: 'qut', code: 'A4', word: '+30%', category: 'content',
      title: { en: 'Social content', ja: 'SNSコンテンツ' },
      line: { en: 'Instagram content planned and made in Canva, CapCut and Meta — 30% more engagement on the official account.', ja: 'Canva、CapCut、Metaを使ってInstagramコンテンツを企画・制作し、公式アカウントのエンゲージメントが30%増加。' },
      page: {
        layout: 'gallery',
        header: { visual: 'feed' },   // a scrolling feed with little notifications popping up
        title: { en: 'QUT Japan on Instagram', ja: 'QUT Japan の Instagram' },
        hook: { en: 'Planning and making the club\'s content — mostly reels, plus posts — and growing engagement on the official account by 30%.', ja: 'クラブのコンテンツを企画・制作。リールを中心に投稿も手がけ、公式アカウントのエンゲージメントを30%向上。' },
        details: [
          { label: { en: 'ROLE', ja: '役割' }, value: { en: 'President, QUT Japan', ja: 'QUT Japan 代表' } },
          { label: { en: 'ACCOUNT', ja: 'アカウント' }, value: { en: '@qutjapan', ja: '@qutjapan' } },
          { label: { en: 'TOOLS', ja: 'ツール' }, value: { en: 'Canva, CapCut, Meta', ja: 'Canva、CapCut、Meta' } },
          { label: { en: 'FORMAT', ja: '形式' }, value: { en: 'Mostly reels, plus posts', ja: 'リール中心、投稿も' } }
        ],
        stats: [
          { value: '+30%', label: { en: 'ENGAGEMENT', ja: 'エンゲージメント' } },
          { value: '[00]', label: { en: 'REELS MADE', ja: '制作したリール' } },
          { value: '[00]', label: { en: 'POSTS MADE', ja: '制作した投稿' } },
          { value: '[0,000]', label: { en: 'TOP REEL VIEWS', ja: '最多再生数' } }
        ],
        filmLabel: { en: 'BEHIND THE SCENES', ja: '舞台裏' },
        film: [],
        filmPlaceholders: ['PHOTO'],
        noFilm: true,   // this page shows the feed instead of a film roll
        sections: [
          { type: 'text', heading: { en: 'The brief', ja: '概要' }, paras: [
            { en: 'Plan and make content for QUT Japan\'s official Instagram — to promote events and grow the community online.', ja: 'QUT Japanの公式Instagramのコンテンツを企画・制作し、イベントの告知とオンラインのコミュニティづくりを行う。' },
            { muted: true, en: '[Add the goal — who you wanted to reach, and what success looked like]', ja: '［目的 — 誰に届けたかったか、何を成功としたか］' }
          ] },
          // CHECK FIRST: confirm with QUT Japan which posts and numbers you're allowed to show.
          { type: 'feed', heading: { en: 'The feed', ja: 'フィード' }, handle: '@qutjapan', avatar: 'QJ', link: 'https://www.instagram.com/qutjapan/', posts: [
            { type: 'reel', src: '', caption: { en: '[Caption]', ja: '［キャプション］' }, stat: '[0,000 views]' },
            { type: 'reel', src: '', caption: { en: '[Caption]', ja: '［キャプション］' }, stat: '[0,000 views]' },
            { type: 'post', src: '', caption: { en: '[Caption]', ja: '［キャプション］' }, stat: '[0,000 views]' },
            { type: 'reel', src: '', caption: { en: '[Caption]', ja: '［キャプション］' }, stat: '[0,000 views]' },
            { type: 'post', src: '', caption: { en: '[Caption]', ja: '［キャプション］' }, stat: '[0,000 views]' },
            { type: 'reel', src: '', caption: { en: '[Caption]', ja: '［キャプション］' }, stat: '[0,000 views]' },
            { type: 'reel', src: '', caption: { en: '[Caption]', ja: '［キャプション］' }, stat: '[0,000 views]' },
            { type: 'post', src: '', caption: { en: '[Caption]', ja: '［キャプション］' }, stat: '[0,000 views]' },
            { type: 'reel', src: '', caption: { en: '[Caption]', ja: '［キャプション］' }, stat: '[0,000 views]' }
          ] },
          { type: 'phones', heading: { en: 'Reels that worked', ja: '反響のあったリール' }, reels: [
            { video: '', poster: '', caption: { en: '[What this reel was]', ja: '［このリールについて］' }, stat: '[0,000 views]' },
            { video: '', poster: '', caption: { en: '[What this reel was]', ja: '［このリールについて］' }, stat: '[0,000 views]' },
            { video: '', poster: '', caption: { en: '[What this reel was]', ja: '［このリールについて］' }, stat: '[0,000 views]' }
          ] },
          { type: 'steps', heading: { en: 'How it was made', ja: '制作の流れ' }, items: [
            { title: { en: 'Plan', ja: '企画' }, text: { en: 'Planned the content. [Add how — a calendar, ideas, trends]', ja: 'コンテンツを企画。［方法 — カレンダー、アイデア、トレンド］' } },
            { title: { en: 'Create', ja: '制作' }, text: { en: 'Designed in Canva and edited reels in CapCut.', ja: 'Canvaでデザインし、CapCutでリールを編集。' } },
            { title: { en: 'Post', ja: '投稿' }, text: { en: 'Scheduled and published with Meta.', ja: 'Metaで予約・投稿。' } },
            { title: { en: 'Measure', ja: '分析' }, text: { en: '[What you tracked and what you changed because of it]', ja: '［何を分析し、どう改善したか］' } }
          ] },
          { type: 'metric', heading: { en: 'The result', ja: '成果' }, value: 30, prefix: '+', suffix: '%', label: { en: 'more engagement on the official account', ja: '公式アカウントのエンゲージメント向上' }, before: { en: 'BEFORE', ja: '以前' }, after: { en: 'AFTER', ja: '以後' }, note: { en: '[Add the period — e.g. over the 2025 academic year]', ja: '［期間を追加 — 例：2025年度］' } },
          { type: 'text', heading: { en: 'Reflection', ja: '振り返り' }, paras: [
            { muted: true, en: '[What you learned about making content people actually watch]', ja: '［見てもらえるコンテンツづくりについて学んだこと］' }
          ] }
        ]
      }
    },
    {
      id: 'qut-leadership', chapter: 'qut', code: 'A5', word: '+10%', category: 'leadership',
      title: { en: 'Leading the committee', ja: '運営チームのリード' },
      line: { en: 'Led the committee and grew membership 10% year on year. [Add team size and how you led]', ja: '運営チームを率い、会員数を前年比10%増加。［チーム人数とリーダーシップの詳細］' },
      page: {
        layout: 'research',
        header: { visual: 'growth' },   // a growth chart drawing itself upward
        title: { en: 'Leading the QUT Japan committee', ja: 'QUT Japan 運営チームのリード' },
        hook: { en: 'A year as president — leading the team behind every event, post and partnership, and growing membership 10% year on year.', ja: '代表としての1年 — すべてのイベント、投稿、パートナーシップを支えるチームを率い、会員数を前年比10%伸ばした。' },
        details: [
          { label: { en: 'ROLE', ja: '役割' }, value: { en: 'President, QUT Japan', ja: 'QUT Japan 代表' } },
          { label: { en: 'PERIOD', ja: '期間' }, value: { en: 'Dec 2024 – Dec 2025', ja: '2024年12月 – 2025年12月' } },
          { label: { en: 'TEAM', ja: 'チーム' }, value: { en: '[Committee size]', ja: '［運営メンバー数］' } },
          { label: { en: 'RESULT', ja: '成果' }, value: { en: 'Membership +10% year on year', ja: '会員数 前年比+10%' } }
        ],
        stats: [
          { value: '+10%', label: { en: 'MEMBERSHIP GROWTH', ja: '会員数の伸び' } },
          { value: '[00]', label: { en: 'COMMITTEE MEMBERS', ja: '運営メンバー' } },
          { value: '[00]', label: { en: 'EVENTS RUN', ja: '開催イベント' } },
          { value: '[000]', label: { en: 'MEMBERS', ja: '会員数' } }
        ],
        filmLabel: { en: 'ON FILM — THE TEAM', ja: 'フィルム — チーム' },
        film: [],
        filmPlaceholders: ['PHOTO'],
        sections: [
          { type: 'text', heading: { en: 'The role', ja: '役割' }, paras: [
            { en: 'Led the QUT Japan committee as president — setting the direction for the year and leading the team behind the club\'s events, content and partnerships.', ja: 'QUT Japanの代表として運営チームを率い、1年の方向性を決め、イベント・コンテンツ・パートナーシップを担うチームをリード。' },
            { muted: true, en: '[Add what you set out to change when you took over]', ja: '［就任時に変えたかったこと］' }
          ] },
          { type: 'team', heading: { en: 'The team', ja: 'チーム' }, lead: { role: { en: 'President', ja: '代表' }, name: { en: 'Kento Baba', ja: '馬場健冬' } }, members: [
            { role: { en: 'Vice President', ja: '副代表' }, name: { en: '[Name]', ja: '［名前］' } },
            { role: { en: 'Treasurer', ja: '会計' }, name: { en: '[Name]', ja: '［名前］' } },
            { role: { en: 'Secretary', ja: '書記' }, name: { en: '[Name]', ja: '［名前］' } },
            { role: { en: 'Events', ja: 'イベント' }, name: { en: '[Name]', ja: '［名前］' } },
            { role: { en: 'Marketing & social', ja: 'マーケティング・SNS' }, name: { en: '[Name]', ja: '［名前］' } },
            { role: { en: '[Role]', ja: '［役職］' }, name: { en: '[Name]', ja: '［名前］' } }
          ], note: { en: '[Add the real roles — and names only with each person\'s OK]', ja: '［実際の役職を追加 — 名前は本人の許可を得てから］' } },
          { type: 'steps', heading: { en: 'How I led', ja: 'リーダーとして' }, items: [
            { title: { en: 'Set the direction', ja: '方向性を決める' }, text: { en: '[The goals for the year and how you shared them]', ja: '［1年の目標と、その共有方法］' } },
            { title: { en: 'Share the work', ja: '役割を分担する' }, text: { en: '[How you split roles and gave people ownership]', ja: '［役割分担と、メンバーへの任せ方］' } },
            { title: { en: 'Keep in sync', ja: '連携を保つ' }, text: { en: '[Meetings, chats, planning — how the team stayed aligned]', ja: '［ミーティング、チャット、計画 — チームの足並みのそろえ方］' } },
            { title: { en: 'Grow the club', ja: 'クラブを伸ばす' }, text: { en: 'Grew membership 10% year on year. [Add what drove it]', ja: '会員数を前年比10%増加。［要因を追加］' } }
          ] },
          { type: 'metric', heading: { en: 'The result', ja: '成果' }, value: 10, prefix: '+', suffix: '%', label: { en: 'more members than the year before', ja: '前年からの会員数の伸び' }, before: { en: 'LAST YEAR', ja: '前年' }, after: { en: 'THIS YEAR', ja: '今年' }, indexLabel: { en: 'MEMBERSHIP, INDEXED (LAST YEAR = 100)', ja: '会員数指数（前年＝100）' } },
          { type: 'outcome', heading: { en: 'What the team said', ja: 'チームの声' },
            text: { en: '[What changed for the club during your year]', ja: '［あなたの1年でクラブがどう変わったか］' },
            quote: { en: '“[A line from a committee member]”', ja: '「［運営メンバーの声］」' },
            cite: { en: '— [NAME, ROLE]', ja: '— ［名前、役職］' } },
          { type: 'text', heading: { en: 'Reflection', ja: '振り返り' }, paras: [
            { muted: true, en: '[What leading a team taught you — and what you\'d do differently]', ja: '［チームを率いて学んだこと、次に変えたいこと］' }
          ] }
        ]
      }
    },

    /* ===== WORKATO ===== */
    {
      id: 'wow-tokyo', chapter: 'workato', code: 'A1', word: 'WOW', category: 'events',
      title: { en: 'WOW Tokyo 2026', ja: 'WOW Tokyo 2026' },
      line: { en: 'Workato\'s flagship enterprise AI conference, in Tokyo — 18–19 Nov 2026. [Add your role and one result]', ja: 'Workatoのエンタープライズ AI カンファレンス、東京開催 — 2026年11月18–19日。［役割と成果を追加］' },
      page: {
        layout: 'event',
        // an AI agent orchestrating apps over a Tokyo skyline — hover an app to send it work, click to fire the agent
        header: { visual: 'agents', badge: { en: 'WORLD OF WORKATO · TOKYO · 18–19 NOV 2026', ja: 'World of Workato · 東京 · 2026年11月18–19日' } },
        ticker: [
          { en: 'AGENTIC AI', ja: 'エージェンティックAI' }, { en: 'WORLD OF WORKATO', ja: 'WORLD OF WORKATO' }, { en: 'TOKYO', ja: '東京' },
          { en: 'AI AGENTS', ja: 'AIエージェント' }, { en: 'ENTERPRISE AUTOMATION', ja: 'エンタープライズ自動化' }, { en: '18–19 NOV 2026', ja: '2026.11.18–19' }
        ],
        title: { en: 'WOW Tokyo 2026', ja: 'WOW Tokyo 2026' },
        hook: { en: 'Two days of enterprise AI in Tokyo — World of Workato, the flagship conference of an AI company, seen from the field marketing team.', ja: '東京でのエンタープライズAIの2日間 — AI企業Workatoの旗艦カンファレンス「World of Workato」を、フィールドマーケティングチームの一員として。' },
        details: [
          { label: { en: 'ROLE', ja: '役割' }, value: { en: 'Field Marketing Intern, Workato', ja: 'Workato フィールドマーケティング・インターン' } },
          { label: { en: 'DATES', ja: '日程' }, value: { en: '18–19 Nov 2026', ja: '2026年11月18–19日' } },
          { label: { en: 'VENUE', ja: '会場' }, value: { en: '[Venue], Tokyo', ja: '［会場］、東京' } },
          { label: { en: 'TOPIC', ja: 'テーマ' }, value: { en: 'Enterprise AI & automation', ja: 'エンタープライズAI・自動化' } }
        ],
        stats: [
          { value: '[000]', label: { en: 'ATTENDEES', ja: '参加者' } },
          { value: '02', label: { en: 'DAYS', ja: '日間' } },
          { value: '[00]', label: { en: 'SESSIONS', ja: 'セッション' } },
          { value: '[00]', label: { en: 'SPEAKERS', ja: '登壇者' } }
        ],
        filmLabel: { en: 'ON FILM — FROM THE EVENT', ja: 'フィルム — イベントの記録' },
        film: [],   // { src: 'images/wow/01.jpg', caption: { en: '…', ja: '…' } }
        filmPlaceholders: ['PHOTO', 'STAGE', 'BOOTH', 'PHOTO', 'TEAM', 'PHOTO'],
        sections: [
          { type: 'text', heading: { en: 'The event', ja: 'イベント' }, paras: [
            { en: 'World of Workato (WOW) is the flagship conference of Workato, an enterprise AI and automation platform. Tokyo is one stop on a global WOW series that also runs in the US, Sydney, London, Singapore and more.', ja: 'World of Workato（WOW）は、エンタープライズAI・自動化プラットフォームを提供するWorkatoの旗艦カンファレンス。東京は、アメリカ、シドニー、ロンドン、シンガポールなどで開催されるWOWシリーズのひとつ。' },
            { en: 'The theme is agentic AI — AI agents that work across a company\'s apps and data to get real work done.', ja: 'テーマはエージェンティックAI — 企業のアプリやデータをまたいで、実際の業務をこなすAIエージェント。' },
            { muted: true, en: '[Your role — what you were responsible for at WOW Tokyo]', ja: '［あなたの役割 — WOW Tokyoで担当したこと］' }
          ] },
          // CHECK FIRST: only keep the lines Kento actually did, and confirm Workato is OK with it being public.
          { type: 'terminal', heading: { en: 'Hands-on with AI', ja: 'AIに実際に触れて' }, title: 'kento@wow-tokyo', lines: [
            { p: '$', text: { en: 'whoami', ja: 'whoami' } },
            { p: '›', text: { en: 'kento · field marketing intern @ workato', ja: 'kento · workato フィールドマーケティング・インターン' } },
            { p: '$', text: { en: 'cat wow-tokyo/theme', ja: 'cat wow-tokyo/theme' } },
            { p: '›', text: { en: 'agentic AI · AI agents · enterprise automation', ja: 'エージェンティックAI · AIエージェント · エンタープライズ自動化' } },
            { p: '$', text: { en: 'history | grep ai', ja: 'history | grep ai' } },
            { p: '›', muted: true, text: { en: '[What you did hands-on with AI — e.g. a platform training, a live demo, building an agent]', ja: '［AIに実際に触れたこと — 例：プラットフォーム研修、ライブデモ、エージェントの構築］' } },
            { p: '›', muted: true, text: { en: '[The tools you used]', ja: '［使ったツール］' } },
            { p: '✓', muted: true, text: { en: '[What you learned about AI from the inside]', ja: '［AI企業の内側から学んだこと］' } }
          ], chipsLabel: { en: 'WHAT WORKATO BUILDS', ja: 'Workatoがつくるもの' }, chips: [
            { en: 'AI agents', ja: 'AIエージェント' }, { en: 'Agentic orchestration', ja: 'エージェンティック・オーケストレーション' }, { en: 'Enterprise MCP', ja: 'Enterprise MCP' }, { en: 'Automation', ja: '自動化' }, { en: 'Integration', ja: 'インテグレーション' }
          ], note: { en: '[Only keep what you actually did — confirm before publishing]', ja: '［実際にやったことだけを残す — 公開前に確認］' } },
          { type: 'days', heading: { en: 'From build-up to show day', ja: '準備から本番まで' }, phases: [
            { tag: { en: 'BEFORE', ja: '準備' }, date: { en: '[WEEKS OUT]', ja: '［本番前］' }, title: { en: 'The build-up', ja: '準備期間' }, items: [
              { time: '—', text: { en: '[Promotion, invites, materials you worked on]', ja: '［告知、招待、準備した資料］' } },
              { time: '—', text: { en: '[Event visuals or content you made]', ja: '［制作したビジュアルやコンテンツ］' } }
            ] },
            { tag: { en: 'DAY 01', ja: '1日目' }, date: { en: '18 NOV', ja: '11月18日' }, title: { en: '[What day one was about]', ja: '［1日目の内容］' }, items: [
              { time: '[00:00]', text: { en: '[A moment you ran or supported]', ja: '［担当・サポートした場面］' } },
              { time: '[00:00]', text: { en: '[Another moment]', ja: '［もうひとつの場面］' } }
            ] },
            { tag: { en: 'DAY 02', ja: '2日目' }, date: { en: '19 NOV', ja: '11月19日' }, title: { en: '[What day two was about]', ja: '［2日目の内容］' }, items: [
              { time: '[00:00]', text: { en: '[A moment you ran or supported]', ja: '［担当・サポートした場面］' } },
              { time: '[00:00]', text: { en: '[Another moment]', ja: '［もうひとつの場面］' } }
            ] },
            { tag: { en: 'AFTER', ja: '終了後' }, date: { en: '[AFTER]', ja: '［終了後］' }, title: { en: 'Follow-up', ja: 'フォローアップ' }, items: [
              { time: '—', text: { en: '[Recap content, follow-ups, results]', ja: '［リキャップ、フォローアップ、成果］' } }
            ] }
          ] },
          { type: 'reel', heading: { en: 'Highlights', ja: 'ハイライト' }, video: '', label: { en: 'HIGHLIGHTS — [ADD VIDEO]', ja: 'ハイライト — ［動画を追加］' } },
          { type: 'outcome', heading: { en: 'Outcome', ja: '成果' },
            text: { en: '[What the event achieved — turnout, leads, what your part made possible]', ja: '［イベントの成果 — 参加者数、リード、あなたの担当で実現できたこと］' },
            muted: { en: '[Only numbers Workato is happy to share publicly]', ja: '［Workatoが公開してよい数字のみ］' },
            quote: { en: '“[A line from your manager or a teammate]”', ja: '「［上司・チームメンバーの声］」' },
            cite: { en: '— [NAME, ROLE]', ja: '— ［名前、役職］' } },
          { type: 'text', heading: { en: 'Reflection', ja: '振り返り' }, paras: [
            { muted: true, en: '[What working on a big AI event taught you — about tech, events and working in a global team]', ja: '［大規模なAIイベントに関わって学んだこと — テクノロジー、イベント、グローバルチームでの働き方］' }
          ] }
        ]
      }
    },
    {
      id: 'workato-marketing', chapter: 'workato', code: 'A2', word: 'MKTG', category: 'content',
      title: { en: 'Field marketing work', ja: 'フィールドマーケティング' },
      line: { en: 'Content, design and campaign work for Workato in Japan — LinkedIn posts, event visuals and more. [Add examples and results]', ja: 'Workato日本向けのコンテンツ、デザイン、キャンペーン — LinkedIn投稿、イベントビジュアルなど。［事例と成果を追加］' },
      page: {
        layout: 'gallery',
        header: { visual: 'compose' },   // a design canvas rebuilding itself as a post, banner, story and email header — click for the next one
        title: { en: 'Field marketing at Workato', ja: 'Workatoでのフィールドマーケティング' },
        hook: { en: 'Content, design and campaigns for an enterprise AI company in Japan — the posts, visuals and materials behind the marketing.', ja: 'エンタープライズAI企業の日本でのマーケティングを支えるコンテンツ、デザイン、キャンペーン — 投稿、ビジュアル、資料づくり。' },
        details: [
          { label: { en: 'ROLE', ja: '役割' }, value: { en: 'Field Marketing Intern, Workato', ja: 'Workato フィールドマーケティング・インターン' } },
          { label: { en: 'PERIOD', ja: '期間' }, value: { en: 'Oct 2026 – Apr 2027', ja: '2026年10月 – 2027年4月' } },
          { label: { en: 'MARKET', ja: '市場' }, value: { en: 'Japan, with a global team', ja: '日本（グローバルチームと協働）' } },
          { label: { en: 'TOOLS', ja: 'ツール' }, value: { en: '[Canva, Figma… — confirm]', ja: '［Canva、Figmaなど — 確認］' } }
        ],
        stats: [
          { value: '[00]', label: { en: 'LINKEDIN POSTS', ja: 'LinkedIn 投稿' } },
          { value: '[00]', label: { en: 'DESIGNS', ja: 'デザイン' } },
          { value: '[00]', label: { en: 'CAMPAIGNS', ja: 'キャンペーン' } },
          { value: 'EN / JP', label: { en: 'WORKING LANGUAGES', ja: '使用言語' } }
        ],
        filmLabel: { en: 'BEHIND THE SCENES', ja: '舞台裏' },
        film: [],
        noFilm: true,   // the work wall replaces the film roll on this page
        sections: [
          { type: 'text', heading: { en: 'The role', ja: '役割' }, paras: [
            { en: 'Field marketing brings a global brand to a local market — the content, visuals and events that help businesses in Japan discover Workato.', ja: 'フィールドマーケティングは、グローバルブランドを現地の市場へ届ける仕事。日本の企業にWorkatoを知ってもらうためのコンテンツ、ビジュアル、イベントを担う。' },
            { muted: true, en: '[What you were responsible for day to day — and who you worked with]', ja: '［日々担当したこと — 一緒に働いた人たち］' }
          ] },
          // CHECK FIRST: only add pieces that are already public, or that Workato says are OK to show.
          { type: 'works', heading: { en: 'The work', ja: '制作物' }, filters: [
            { id: 'all', label: { en: 'ALL', ja: 'すべて' } },
            { id: 'content', label: { en: 'CONTENT', ja: 'コンテンツ' } },
            { id: 'design', label: { en: 'DESIGN', ja: 'デザイン' } },
            { id: 'events', label: { en: 'EVENTS', ja: 'イベント' } }
          ], items: [
            { cat: 'content', format: { en: 'LINKEDIN POST', ja: 'LinkedIn 投稿' }, ratio: '1/1', src: '', caption: { en: '[What this was, and who it was for]', ja: '［内容と対象］' } },
            { cat: 'design', format: { en: 'EVENT VISUAL', ja: 'イベントビジュアル' }, ratio: '16/9', src: '', caption: { en: '[What this was, and who it was for]', ja: '［内容と対象］' } },
            { cat: 'content', format: { en: 'LINKEDIN POST', ja: 'LinkedIn 投稿' }, ratio: '4/5', src: '', caption: { en: '[What this was, and who it was for]', ja: '［内容と対象］' } },
            { cat: 'design', format: { en: 'SOCIAL GRAPHIC', ja: 'SNS グラフィック' }, ratio: '1/1', src: '', caption: { en: '[What this was, and who it was for]', ja: '［内容と対象］' } },
            { cat: 'events', format: { en: 'WOW TOKYO', ja: 'WOW TOKYO' }, ratio: '16/9', src: '', caption: { en: '[What this was, and who it was for]', ja: '［内容と対象］' } },
            { cat: 'design', format: { en: 'BANNER', ja: 'バナー' }, ratio: '3/1', src: '', caption: { en: '[What this was, and who it was for]', ja: '［内容と対象］' } },
            { cat: 'content', format: { en: 'CAMPAIGN COPY', ja: 'キャンペーン文案' }, ratio: '4/5', src: '', caption: { en: '[What this was, and who it was for]', ja: '［内容と対象］' } },
            { cat: 'events', format: { en: 'EVENT MATERIAL', ja: 'イベント資料' }, ratio: '1/1', src: '', caption: { en: '[What this was, and who it was for]', ja: '［内容と対象］' } },
            { cat: 'design', format: { en: 'SLIDE', ja: 'スライド' }, ratio: '16/9', src: '', caption: { en: '[What this was, and who it was for]', ja: '［内容と対象］' } }
          ] },
          { type: 'localise', heading: { en: 'Global → Japan', ja: 'グローバル → 日本' },
            from: { label: { en: 'GLOBAL · EN', ja: 'グローバル · 英語' }, head: { en: '[The original message]', ja: '［元のメッセージ］' }, text: { en: '[How the global team said it]', ja: '［グローバルチームの表現］' }, cta: { en: '[Learn more]', ja: '［詳しくはこちら］' } },
            to: { label: { en: 'JAPAN · JP', ja: '日本 · 日本語' }, head: { en: '[How you adapted it for Japan]', ja: '［日本向けに調整した表現］' }, text: { en: '[What changed — tone, examples, format]', ja: '［変えたこと — トーン、事例、形式］' }, cta: { en: '[詳しくはこちら]', ja: '［詳しくはこちら］' } },
            arrow: { en: 'LOCALISED', ja: 'ローカライズ' },
            note: { en: '[Keep this only if you adapted content for Japan — add a real before/after example]', ja: '［日本向けにコンテンツを調整した場合のみ — 実際のビフォー・アフターを追加］' } },
          { type: 'steps', heading: { en: 'How a piece came together', ja: '制作の流れ' }, items: [
            { title: { en: 'Brief', ja: 'ブリーフ' }, text: { en: '[Where requests came from — events, campaigns, the global team]', ja: '［依頼の出どころ — イベント、キャンペーン、グローバルチーム］' } },
            { title: { en: 'Draft', ja: '草案' }, text: { en: '[Writing the copy]', ja: '［コピーの作成］' } },
            { title: { en: 'Design', ja: 'デザイン' }, text: { en: '[Making the visuals — tools and brand rules]', ja: '［ビジュアル制作 — ツールとブランドルール］' } },
            { title: { en: 'Localise', ja: 'ローカライズ' }, text: { en: '[Adapting it for a Japanese audience]', ja: '［日本の読者に合わせた調整］' } },
            { title: { en: 'Review & publish', ja: '確認・公開' }, text: { en: '[Sign-off and where it went live]', ja: '［承認と公開先］' } }
          ] },
          { type: 'outcome', heading: { en: 'Outcome', ja: '成果' },
            text: { en: '[What your work helped achieve — reach, sign-ups, event turnout]', ja: '［あなたの仕事で実現できたこと — リーチ、登録、イベント集客］' },
            muted: { en: '[Only numbers Workato is happy to share publicly]', ja: '［Workatoが公開してよい数字のみ］' },
            quote: { en: '“[A line from your manager or a teammate]”', ja: '「［上司・チームメンバーの声］」' },
            cite: { en: '— [NAME, ROLE]', ja: '— ［名前、役職］' } },
          { type: 'text', heading: { en: 'Reflection', ja: '振り返り' }, paras: [
            { muted: true, en: '[What marketing for a tech company taught you — and what you\'d do differently]', ja: '［テック企業のマーケティングで学んだこと、次に変えたいこと］' }
          ] }
        ]
      }
    },
    {
      // OPTIONAL — keep this only if Kento did real hands-on AI work (e.g. a platform certification,
      // building an agent, the Agentic AI Hackathon). Otherwise delete this whole block.
      id: 'workato-ai', chapter: 'workato', code: 'A3', word: 'AI', category: 'data',
      title: { en: 'Hands-on with AI', ja: 'AIの実務経験' },
      line: { en: '[Only if real: AI tools and the Workato platform you used hands-on — e.g. a training, a demo, an agent you built]', ja: '［実際にあった場合のみ：実務で使ったAIツールやWorkatoのプラットフォーム — 例：研修、デモ、構築したエージェント］' }
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
      id: 'film-photography', chapter: 'personal', category: 'personal',
      title: { en: 'Photography', ja: '写真' },
      line: { en: 'Through the lens — street, people, places and nights.', ja: 'レンズ越しに — 街、人、風景、夜。' },
      page: {
        // The photography page. The landing page's "Through the lens" strip is the preview;
        // this is the full collection.
        layout: 'photo',
        theme: 'focus',               // header: a camera viewfinder you can focus and shoot
        word: 'PHOTOGRAPHY',
        jp: '写真',
        title: { en: 'Photography', ja: '写真' },
        hook: { en: '[Why you shoot — in one line]', ja: '［写真を撮る理由 — ひとことで］' },
        details: [
          { label: { en: 'MAIN CAMERA', ja: 'メインカメラ' }, value: { en: 'Minolta 303si Super', ja: 'Minolta 303si Super' } },
          { label: { en: 'FILM', ja: 'フィルム' }, value: { en: '[Favourite film stock]', ja: '［好きなフィルム］' } },
          { label: { en: 'SINCE', ja: 'いつから' }, value: { en: '[Year]', ja: '［年］' } }
        ],
        cameraHead: { en: 'The camera', ja: 'カメラ' },
        camera: 'MINOLTA 303si SUPER',
        specs: [
          { label: { en: 'FORMAT', ja: 'フォーマット' }, value: { en: '35mm film', ja: '35mmフィルム' } },
          { label: { en: 'LENS', ja: 'レンズ' }, value: { en: '[Your lens]', ja: '［レンズ］' } },
          { label: { en: 'FAVOURITE FILM', ja: '好きなフィルム' }, value: { en: '[Film stock, ISO]', ja: '［フィルム名・ISO］' } },
          { label: { en: 'WHERE I GOT IT', ja: '入手したきっかけ' }, value: { en: '[A short story]', ja: '［ちょっとしたエピソード］' } }
        ],
        // The gallery inside the camera. Visitors can filter by these categories.
        photoFilters: [
          { id: 'street', en: 'Street', ja: 'ストリート' },
          { id: 'people', en: 'People', ja: '人' },
          { id: 'places', en: 'Places', ja: '風景' },
          { id: 'night', en: 'Night', ja: '夜' }
        ],
        photos: [
          // { src: 'images/photography/01.jpg', category: 'street', caption: { en: 'Shibuya, 2025', ja: '渋谷、2025' } },
        ],
        manifestoHead: { en: 'Why I shoot', ja: 'なぜ撮るのか' },
        manifesto: { en: '[Why you shoot — film or digital, what you look for, and what it taught you about framing a story.]', ja: '［写真を撮る理由 — フィルムでもデジタルでも、何を見ているか、物語の切り取り方について学んだこと。］' },
        featureHead: { en: 'Favourite frame', ja: 'お気に入りの一枚' },
        feature: {
          src: '',   // 'images/photography/favourite.jpg'
          title: { en: '[Where and when]', ja: '［いつ、どこで］' },
          story: { en: '[The story behind your favourite photo]', ja: '［お気に入りの写真の裏話］' }
        },
        closingHead: { en: 'What it brings to my work', ja: '仕事に活きていること' },
        closing: { en: '[How photography shapes the way you see campaigns, content and stories]', ja: '［写真が、キャンペーンやコンテンツ、ストーリーの見方にどう影響しているか］' }
      }
    },
    {
      id: 'personal-music', chapter: 'personal', category: 'personal',
      title: { en: 'Music', ja: '音楽' },
      line: { en: '[A mix, a playlist or a track you made — or delete this]', ja: '［ミックス、プレイリスト、制作した曲など — 不要なら削除］' },
      page: {
        // A personal page: big, playful, made to show your creative side.
        // Delete this whole project if you don't want it.
        layout: 'personal',
        theme: 'vinyl',          // header artwork: vinyl / cloth / poster
        word: 'MUSIC',            // the giant word in the header
        jp: '音楽',                // the vertical Japanese next to it
        title: { en: 'Music', ja: '音楽' },
        hook: { en: '[What you listen to, play or make — and the sound you keep coming back to]', ja: '［聴いている音楽、演奏・制作しているもの、つい戻ってしまうサウンド］' },
        details: [
          { label: { en: 'SINCE', ja: 'いつから' }, value: { en: '[Year]', ja: '［年］' } },
          { label: { en: 'GENRES', ja: 'ジャンル' }, value: { en: '[Techno, house…]', ja: '［テクノ、ハウス…］' } },
          { label: { en: 'WHERE', ja: '場所' }, value: { en: '[Clubs, Spotify, vinyl…]', ja: '［クラブ、Spotify、レコード…］' } }
        ],
        marquee: [{ en: '[Genre]', ja: '［ジャンル］' }, { en: '[Favourite artist]', ja: '［好きなアーティスト］' }, { en: '[A record]', ja: '［レコード］' }, { en: '[A venue]', ja: '［会場］' }],
        manifestoHead: { en: 'Why I love it', ja: '好きな理由' },
        manifesto: { en: '[Why music matters to you — how you got into it, what it feels like, the moment it clicked. Write it like you would say it.]', ja: '［音楽が自分にとって大切な理由 — きっかけ、感じること、ハマった瞬間。話すように書いてください。］' },
        filmLabel: { en: 'ON FILM — NIGHTS, RECORDS, SETS', ja: 'フィルム — 夜、レコード、セット' },
        film: [],   // { src: 'images/vinyl/01.jpg', caption: { en: '…', ja: '…' } }  — 6 photos look best
        favouritesHead: { en: 'On repeat', ja: 'ヘビロテ' },  // the player
        tracks: [   // the "On repeat" player. length like '3:45'. Optional: link (Spotify/YouTube), cover image, audio clip (mp3)
          { title: { en: '[Track]', ja: '［曲名］' }, artist: '[Artist]', length: '[3:45]', link: '', cover: '', audio: '' },
          { title: { en: '[Track]', ja: '［曲名］' }, artist: '[Artist]', length: '[4:12]', link: '', cover: '', audio: '' },
          { title: { en: '[Track]', ja: '［曲名］' }, artist: '[Artist]', length: '[6:30]', link: '', cover: '', audio: '' },
          { title: { en: '[Track]', ja: '［曲名］' }, artist: '[Artist]', length: '[5:05]', link: '', cover: '', audio: '' }
        ],
        closingHead: { en: 'What it brings to my work', ja: '仕事に活きていること' },
        closing: { en: '[How music shapes the way you think about rhythm, mood and audiences — in events and content]', ja: '［音楽が、イベントやコンテンツでのリズム、ムード、オーディエンスの考え方にどう影響しているか］' }
      }
    },
    {
      id: 'personal-fashion', chapter: 'personal', category: 'personal',
      title: { en: 'Fashion', ja: 'ファッション' },
      line: { en: '[Styling, a lookbook, a brand you love and why — or delete this]', ja: '［スタイリング、ルックブック、好きなブランドとその理由など — 不要なら削除］' },
      page: {
        // A personal page: big, playful, made to show your creative side.
        // Delete this whole project if you don't want it.
        layout: 'personal',
        theme: 'halftone',       // header: an abstract printed pattern
        style: 'editorial',     // an elegant magazine-style page
        word: 'FASHION',            // the giant word in the header
        jp: '服',                // the vertical Japanese next to it
        title: { en: 'Fashion', ja: 'ファッション' },
        hook: { en: '[Your style in one line — and the brands or eras that shape it]', ja: '［自分のスタイルをひとことで — 影響を受けたブランドや時代］' },
        details: [
          { label: { en: 'SINCE', ja: 'いつから' }, value: { en: '[Year]', ja: '［年］' } },
          { label: { en: 'STYLE', ja: 'スタイル' }, value: { en: '[Three words]', ja: '［3つの言葉で］' } },
          { label: { en: 'WHERE', ja: '場所' }, value: { en: '[Shops, streets, cities]', ja: '［お店、街、都市］' } }
        ],
        marquee: [{ en: '[Brand]', ja: '［ブランド］' }, { en: '[Designer]', ja: '［デザイナー］' }, { en: '[An era]', ja: '［時代］' }, { en: '[A piece you love]', ja: '［好きな一着］' }],
        manifestoHead: { en: 'Why I love it', ja: '好きな理由' },
        manifesto: { en: '[What fashion means to you — how you dress, where your ideas come from, and what a good outfit says without words.]', ja: '［ファッションとは何か — 服の選び方、アイデアの源、言葉なしで伝わること。］' },
        filmLabel: { en: 'The lookbook', ja: 'ルックブック' },
        film: [],   // { src: 'images/cloth/01.jpg', caption: { en: '…', ja: '…' } }  — 6 photos look best
        favouritesHead: { en: 'Brands I love', ja: '好きなブランド' },
        favourites: [   // add src: 'images/…jpg' to show a photo when someone hovers the line
          { title: { en: '[Brand]', ja: '［ブランド］' }, note: { en: '[One line on why]', ja: '［理由をひとこと］' } },
          { title: { en: '[Brand]', ja: '［ブランド］' }, note: { en: '[One line on why]', ja: '［理由をひとこと］' } },
          { title: { en: '[Brand]', ja: '［ブランド］' }, note: { en: '[One line on why]', ja: '［理由をひとこと］' } }
        ],
        closingHead: { en: 'What it brings to my work', ja: '仕事に活きていること' },
        closing: { en: '[How fashion shapes the way you think about image, identity and brand storytelling]', ja: '［ファッションが、イメージ、アイデンティティ、ブランドストーリーの考え方にどう影響しているか］' }
      }
    },
    {
      id: 'personal-design', chapter: 'personal', category: 'personal',
      title: { en: 'Design', ja: 'デザイン' },
      line: { en: '[Posters, graphics, anything you designed for fun — or delete this]', ja: '［ポスター、グラフィックなど、趣味でデザインしたもの — 不要なら削除］' },
      page: {
        // A personal page: big, playful, made to show your creative side.
        // Delete this whole project if you don't want it.
        layout: 'personal',
        theme: 'poster',          // header artwork: vinyl / cloth / poster
        style: 'art',           // the most experimental page
        word: 'DESIGN',            // the giant word in the header
        jp: '意匠',                // the vertical Japanese next to it
        title: { en: 'Design', ja: 'デザイン' },
        hook: { en: '[Posters, graphics and things you designed just for fun]', ja: '［趣味でデザインしたポスターやグラフィック］' },
        details: [
          { label: { en: 'SINCE', ja: 'いつから' }, value: { en: '[Year]', ja: '［年］' } },
          { label: { en: 'TOOLS', ja: 'ツール' }, value: { en: 'Canva, Figma, [add more]', ja: 'Canva、Figma、［追加］' } },
          { label: { en: 'INSPIRED BY', ja: '影響' }, value: { en: '[Designers, movements]', ja: '［デザイナー、ムーブメント］' } }
        ],
        marquee: [{ en: '[Poster]', ja: '［ポスター］' }, { en: '[Type]', ja: '［タイポグラフィ］' }, { en: '[Colour]', ja: '［色］' }, { en: '[A designer you love]', ja: '［好きなデザイナー］' }],
        manifestoHead: { en: 'Why I love it', ja: '好きな理由' },
        manifesto: { en: '[What you love about design — the first thing you made, what makes a design work, and what you notice that others miss.]', ja: '［デザインの好きなところ — 最初に作ったもの、良いデザインの条件、人が見落とすけど気づくこと。］' },
        filmLabel: { en: 'The wall', ja: 'ウォール' },
        film: [],   // { src: 'images/poster/01.jpg', caption: { en: '…', ja: '…' } }  — 6 photos look best
        favouritesHead: { en: 'Favourite pieces', ja: 'お気に入りの作品' },
        favourites: [   // add src: 'images/…jpg' to show a photo when someone hovers the line
          { title: { en: '[Piece — year]', ja: '［作品 — 年］' }, note: { en: '[One line on why]', ja: '［理由をひとこと］' } },
          { title: { en: '[Piece — year]', ja: '［作品 — 年］' }, note: { en: '[One line on why]', ja: '［理由をひとこと］' } },
          { title: { en: '[Piece — year]', ja: '［作品 — 年］' }, note: { en: '[One line on why]', ja: '［理由をひとこと］' } }
        ],
        closingHead: { en: 'What it brings to my work', ja: '仕事に活きていること' },
        closing: { en: '[How design shapes the way you build campaigns, posts and events]', ja: '［デザインが、キャンペーン、投稿、イベントづくりにどう活きているか］' }
      }
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
      allWork: '← ALL WORK', back: 'BACK', allWorkT: 'All work', hoverPause: 'HOVER TO PAUSE', rollMouse: 'DRAG OR SCROLL · HOVER TO PAUSE', seeRoll: 'SEE THE FULL COLLECTION', rollTouch: 'SWIPE TO BROWSE', now: 'NOW',
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
      allWork: '← 実績一覧', back: '戻る', allWorkT: '実績一覧', hoverPause: 'ホバーで一時停止', rollMouse: 'ドラッグ・スクロールで移動 · ホバーで一時停止', seeRoll: '写真をもっと見る', rollTouch: 'スワイプで移動', now: '現在',
      sideA: 'SIDE A — {n}トラック', theWork: '取り組み', hoverTrack: 'ホバーでプレビュー',
      statusReady: 'ケース →', statusSoon: '準備中', ctaReady: 'ケースを見る →', ctaSoon: '準備中',
      reflection: '振り返り', prevChapter: '← 前のチャプター — {n}', nextChapter: '次のチャプター — {n} →', loopChapter: 'チャプター{n}に戻る →',
      backToChapter: '← チャプターに戻る — {n}', nextInChapter: 'このチャプターの次 — {code} →', soonSuffix: '（準備中）',
      caseKick: 'チャプター {n} · {code} — {cat}', photo: 'PHOTO', caption: '［キャプション］', rec: '● REC [00:00]'
    }
  }
};
