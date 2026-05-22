const modules = [
  {
    title: "What Trading Really Is",
    tag: "Foundation",
    summary: "Trading is structured decision-making under uncertainty. You are not trying to predict every candle; you are building repeatable decisions with controlled downside.",
    points: [
      "Trading is different from investing because the time horizon, invalidation, and decision tools are different.",
      "Beginners usually fail from oversized risk, strategy hopping, chasing, social media dependency, and emotional exits.",
      "Markets move because orders interact. Liquidity often rests near previous highs, lows, range edges, and round numbers.",
      "A professional trader thinks in samples, not single outcomes."
    ],
    practice: [
      "Write why you want to trade and what money must never be used for trading.",
      "Mark obvious liquidity above highs and below lows on five charts.",
      "Find three guru-style claims online and write why each is risky or unrealistic."
    ],
    trap: "Believing a random winning trade proves skill. A single trade proves almost nothing.",
    visual: "liquidity"
  },
  {
    title: "Market Types",
    tag: "Market Selection",
    summary: "Crypto, forex, stocks, futures, and indices all behave differently. The best beginner market is the one you can understand, size properly, and practice consistently.",
    points: [
      "Crypto is accessible and volatile but can be exhausting and risky, especially with leverage.",
      "Forex is liquid in major pairs but punishes beginners who overtrade and overleverage.",
      "Stocks and index ETFs are strong learning vehicles because product information and market structure are clearer.",
      "Futures require deep respect for tick value, margin, and fast losses."
    ],
    practice: [
      "Choose one primary market for the next 90 days.",
      "List its top three risks and top three advantages.",
      "Build a focused watchlist of no more than 10 symbols."
    ],
    trap: "Choosing the most exciting market instead of the most learnable market.",
    visual: "comparison"
  },
  {
    title: "Trading Platform Setup",
    tag: "Tools",
    summary: "Your charting platform should reduce decision fatigue. Clean charts, focused watchlists, alerts, and simple tools are enough at the start.",
    points: [
      "Use candlesticks, volume when reliable, and no more than two indicators while learning.",
      "Start analysis on higher timeframes, then refine on lower timeframes only after context is clear.",
      "Use rectangles for zones, not exact magical lines.",
      "Alerts should notify you when price reaches a planned area, not tempt you into random activity."
    ],
    practice: [
      "Create learning, active, and review watchlists.",
      "Build one clean chart layout and remove unnecessary indicators.",
      "Set five alerts at meaningful levels."
    ],
    trap: "Adding more indicators because uncertainty feels uncomfortable.",
    visual: "platform"
  },
  {
    title: "Candlesticks Masterclass",
    tag: "Price Action",
    summary: "Candles show behavior: momentum, rejection, indecision, and absorption. They matter only when read inside structure and location.",
    points: [
      "A candle contains open, high, low, and close. The body shows open-to-close control; wicks show rejected prices.",
      "Doji candles show indecision, not automatic reversal.",
      "Engulfing candles show short-term control shift when they occur at meaningful levels.",
      "Hammer and shooting star candles require confirmation and logical invalidation."
    ],
    practice: [
      "Find five doji candles at meaningful levels and five in the middle of chop.",
      "Screenshot three engulfing candles that worked and three that failed.",
      "Write the confirmation rule you will require before trading a candle pattern."
    ],
    trap: "Trading candlestick names instead of trading context.",
    visual: "candles"
  },
  {
    title: "Market Structure",
    tag: "Structure",
    summary: "Market structure is the rhythm of swing highs and swing lows. It tells you whether price is trending, ranging, or shifting.",
    points: [
      "Uptrends form higher highs and higher lows. Downtrends form lower highs and lower lows.",
      "Ranges rotate between support and resistance until acceptance outside the range is proven.",
      "Break of structure supports continuation. Change of character warns that behavior may be shifting.",
      "Multi-timeframe structure keeps lower-timeframe entries aligned with bigger context."
    ],
    practice: [
      "Label HH, HL, LH, and LL on 20 charts.",
      "Save five clean uptrends, five downtrends, and five ranges.",
      "Find three change-of-character examples and write what confirmed them."
    ],
    trap: "Forcing a trend label onto a range because you want a trade.",
    visual: "structure"
  },
  {
    title: "Support And Resistance",
    tag: "Levels",
    summary: "Support and resistance are decision areas, not magic lines. They work because traders remember, defend, chase, and exit around visible prices.",
    points: [
      "Draw zones with rectangles to account for volatility, spread, and imperfect reactions.",
      "Psychological round numbers attract attention and order clustering.",
      "Role reversal occurs when broken support becomes resistance or broken resistance becomes support.",
      "Obvious levels can produce real reactions or liquidity traps."
    ],
    practice: [
      "Draw only the three most important zones on 10 charts.",
      "Find five role reversal examples.",
      "Find five fake breaks and mark where stops were likely resting."
    ],
    trap: "Drawing so many levels that every price becomes important.",
    visual: "levels"
  },
  {
    title: "Breakout Retest Strategy",
    tag: "Strategy",
    summary: "A breakout retest waits for price to break a level, return to test it, and prove acceptance before entry. The retest is where patience becomes edge.",
    points: [
      "A real breakout should close beyond the level, not just wick through it.",
      "The retest should hold the broken level as support for longs or resistance for shorts.",
      "Entry needs confirmation, stop loss needs invalidation, and target needs enough space for at least 2R.",
      "Fake breakouts often trap traders who chase before the close or enter without retest."
    ],
    practice: [
      "Backtest 50 breakout retests and log real vs fake breakouts.",
      "Build 20 screenshots of A+ examples and 20 screenshots of avoid examples.",
      "Write your entry, stop, target, and invalidation rules in one page."
    ],
    trap: "Buying the breakout candle because you are afraid the retest will never come.",
    visual: "breakout"
  },
  {
    title: "Risk Management",
    tag: "Capital Protection",
    summary: "Risk management is the business. Strategy gives you opportunity; position sizing and loss limits keep you alive long enough to improve.",
    points: [
      "Dollar risk equals account size multiplied by risk percent.",
      "Position size equals dollar risk divided by stop distance adjusted for point value.",
      "Good stops sit where the idea is wrong, not where your fear wants them.",
      "Expectancy matters more than win rate. A low-win-rate trader can be profitable with strong R:R."
    ],
    practice: [
      "Calculate position size for 20 hypothetical trades.",
      "Write your daily and weekly loss limits.",
      "Backtest results in R values rather than dollars."
    ],
    trap: "Using leverage to make a small account feel large before skill is proven.",
    visual: "risk"
  },
  {
    title: "Trading Psychology",
    tag: "Mindset",
    summary: "Trading exposes fear, greed, FOMO, revenge, boredom, and ego. Discipline is built with rules, environment, size control, and review.",
    points: [
      "Fear causes hesitation, early exits, and stop tightening.",
      "Greed causes oversizing, chasing, and holding after exit signals.",
      "Revenge trading is an emergency state and requires immediate interruption.",
      "Professional mindset means judging process quality before single-trade outcome."
    ],
    practice: [
      "Write your emotional triggers.",
      "Create a revenge trading emergency protocol.",
      "Journal emotion ratings for 10 simulated trades."
    ],
    trap: "Trying to become emotionless instead of building rules that survive emotion.",
    visual: "psychology"
  },
  {
    title: "Building A Trading System",
    tag: "System",
    summary: "A trading system defines what you trade, when you trade, what setup you take, how you enter, how you exit, how you size, and how you review.",
    points: [
      "Rules must be specific enough that another trader can understand the setup.",
      "Backtesting tests rules on historical charts; forward testing checks real-time execution.",
      "Journaling captures screenshots, R result, emotion, and rule-following quality.",
      "Refinement should be based on data, not frustration after a small losing streak."
    ],
    practice: [
      "Write a one-page trading plan.",
      "Backtest 50 trades using the exact plan.",
      "Forward test 20 trades in simulation."
    ],
    trap: "Changing the system after two losses and never collecting useful data.",
    visual: "system"
  },
  {
    title: "Paper Trading Roadmap",
    tag: "Practice",
    summary: "Paper trading is the training field. It helps you learn platform mechanics, strategy rules, journaling, and patience without financial damage.",
    points: [
      "The first 30 days should focus on chart markup, backtesting, and small batches of simulated trades.",
      "The 90-day goal is rule consistency, not impressive simulated profit.",
      "Real money should wait until you have logged enough trades and proven rule-following.",
      "You are not ready if you cannot calculate risk, accept losses, or stop at limits."
    ],
    practice: [
      "Complete 10 chart markups before any simulated trade.",
      "Log 25 backtest trades before forward testing.",
      "Define your requirements before risking real money."
    ],
    trap: "Assuming real money will create discipline that paper trading did not show.",
    visual: "roadmap"
  },
  {
    title: "Advanced Concepts",
    tag: "Context",
    summary: "Liquidity, order blocks, supply and demand, fair value gaps, sessions, and volume can help when they clarify price behavior. They hurt when used as vague magic.",
    points: [
      "Liquidity commonly rests around equal highs, equal lows, prior session levels, and round numbers.",
      "Order blocks and supply/demand zones are useful only with displacement, structure, and invalidation.",
      "Fair value gaps show fast movement and possible imbalance, but not every gap must fill.",
      "Session behavior matters because participation changes through the trading day."
    ],
    practice: [
      "Find five liquidity sweeps.",
      "Mark three supply zones and three demand zones.",
      "Compare breakout volume across stocks, crypto, and forex charts."
    ],
    trap: "Using advanced vocabulary to justify a trade with no clear entry or stop.",
    visual: "advanced"
  },
  {
    title: "Common Beginner Mistakes",
    tag: "Mistakes",
    summary: "Most beginner mistakes are predictable: early entries, no stops, overleverage, gambling behavior, strategy hopping, and copying influencers.",
    points: [
      "Entering before confirmation increases fake signal exposure.",
      "Trading without a stop refuses to define being wrong.",
      "Overleverage turns normal volatility into panic.",
      "Borrowed conviction from influencers prevents independent skill."
    ],
    practice: [
      "Pick your five most likely mistakes and write a prevention rule for each.",
      "Tag mistakes from your last 20 paper trades.",
      "Create a do-not-trade checklist."
    ],
    trap: "Treating predictable mistakes as bad luck instead of process failures.",
    visual: "mistakes"
  },
  {
    title: "Daily Professional Routine",
    tag: "Routine",
    summary: "Routine reduces decision fatigue. Preparation, execution, protection, and review make trading less dependent on mood.",
    points: [
      "Morning preparation includes sleep, emotion, news, levels, watchlist, and max risk.",
      "During trading, use the checklist and avoid trades outside your plan.",
      "End-of-day review should grade rule-following, not just profit.",
      "Weekly review identifies best setup, worst mistake, net R, and the next process focus."
    ],
    practice: [
      "Build a morning routine checklist.",
      "Complete five consecutive trading days with full review.",
      "Create a rule for skipping trading when your mental state is poor."
    ],
    trap: "Calling random screen time research because it feels productive.",
    visual: "routine"
  },
  {
    title: "Trading Journal Template",
    tag: "Journal",
    summary: "A journal turns emotional memory into data. It reveals which setups work, which mistakes cost money, and whether discipline is improving.",
    points: [
      "Track market, direction, setup, entry, stop, target, size, result in R, and screenshots.",
      "Psychology tracking should include emotion before, during, and after the trade.",
      "Weekly analytics should include net R, win rate, average win, average loss, and rule breaks.",
      "Monthly review should change one behavior at a time."
    ],
    practice: [
      "Create a spreadsheet or use the journal tool on this page.",
      "Enter five historical example trades.",
      "Complete one weekly review even if every trade was simulated."
    ],
    trap: "Only journaling the trades you remember emotionally.",
    visual: "journal"
  },
  {
    title: "Realistic Path To Profitability",
    tag: "Expectations",
    summary: "Profitability is a long evidence-building process. Patience, small size, review, and survival matter more than fast income fantasies.",
    points: [
      "The path usually moves from excitement to losses, simplification, journaling, and gradual improvement.",
      "Consistency means stable process, not winning every day.",
      "Small accounts create pressure to grow too fast; skill must come first.",
      "Require at least 100 logged trades, positive expectancy after costs, and controlled drawdowns before claiming consistency."
    ],
    practice: [
      "Write your complete beginner trading plan.",
      "List signs that require you to stop trading for the day.",
      "Define what evidence you need before increasing size."
    ],
    trap: "Expecting trading to solve urgent financial pressure.",
    visual: "path"
  }
];

const quizQuestions = [
  {
    question: "What is the main job of a beginner trader?",
    options: ["Predict every move", "Protect capital while learning", "Trade as often as possible", "Find a no-loss strategy"],
    answer: 1,
    explanation: "The first job is survival. Skill cannot compound if losses remove your ability to keep learning."
  },
  {
    question: "A breakout is higher quality when price...",
    options: ["Only wicks beyond the level", "Closes beyond the level and later holds a retest", "Moves fast after social media hype", "Has no clear invalidation"],
    answer: 1,
    explanation: "A close beyond the level plus a held retest gives stronger evidence of acceptance."
  },
  {
    question: "What does 1R mean?",
    options: ["One random trade", "The amount risked on one trade", "One resistance level", "One reward target only"],
    answer: 1,
    explanation: "R is a unit of risk. If you risk $50, then -1R is -$50 and +2R is +$100."
  },
  {
    question: "Why are exact support lines weaker than zones?",
    options: ["Zones account for normal market noise", "Zones guarantee reversal", "Lines are illegal", "Zones remove the need for stops"],
    answer: 0,
    explanation: "Real markets have spread, volatility, and imperfect reactions. Zones are more realistic."
  },
  {
    question: "A high win rate can still lose money when...",
    options: ["Losses are much larger than wins", "The trader journals", "Risk is fixed", "Targets are larger than stops"],
    answer: 0,
    explanation: "Expectancy depends on both win rate and average win/loss size."
  },
  {
    question: "Which action best protects against revenge trading?",
    options: ["Increase size to recover", "Enter immediately in the opposite direction", "Stop, log the emotion, and respect the daily loss limit", "Remove the stop loss"],
    answer: 2,
    explanation: "Revenge trading is an emergency state. Interrupting behavior is more important than finding another trade."
  },
  {
    question: "What should happen before risking real money?",
    options: ["At least some logged evidence and rule consistency", "A viral trading tip", "One lucky paper trade", "A new indicator"],
    answer: 0,
    explanation: "Real money should wait until your process has evidence."
  },
  {
    question: "Where should a stop loss go?",
    options: ["Where the trade idea is invalid", "Exactly where the loss feels comfortable", "Where everyone on social media puts it", "Nowhere if the setup is strong"],
    answer: 0,
    explanation: "The stop belongs at invalidation. Position size adjusts to the stop, not the other way around."
  }
];

const flashcards = [
  { front: "Liquidity", back: "Available orders at or near a price. Obvious highs, lows, and round numbers often collect liquidity." },
  { front: "Break of Structure", back: "A meaningful swing point breaks in the direction of trend, supporting continuation." },
  { front: "Change of Character", back: "An early warning that the market rhythm may be shifting." },
  { front: "Risk-to-Reward", back: "The potential reward compared with the planned risk. A 2R target risks 1 to make 2." },
  { front: "Expectancy", back: "Average expected result per trade: win rate times average win minus loss rate times average loss." },
  { front: "Retest", back: "Price returns to a broken level and tests whether it now holds in the new role." },
  { front: "Drawdown", back: "A decline from account or strategy peak. Large drawdowns require much larger gains to recover." },
  { front: "Trading System", back: "A complete rule set for market, setup, entry, stop, target, size, limits, and review." }
];

const checklistItems = [
  { label: "Clear higher-timeframe level", detail: "The breakout level is obvious and not drawn from random chop.", points: 2 },
  { label: "Strong close beyond level", detail: "The candle body accepts beyond support or resistance.", points: 2 },
  { label: "Clean retest", detail: "Price returns to the level without chaotic failed closes.", points: 2 },
  { label: "Confirmation candle", detail: "The retest has a clear bullish or bearish trigger.", points: 2 },
  { label: "Trend alignment", detail: "The setup agrees with higher-timeframe direction or a confirmed shift.", points: 2 },
  { label: "Target space", detail: "There is room to the next level for at least 2R.", points: 2 },
  { label: "Logical stop", detail: "Invalidation is beyond the retest, not inside normal noise.", points: 2 },
  { label: "Calm execution", detail: "The trade is not revenge, FOMO, or a recovery attempt.", points: 2 }
];

const glossary = [
  ["Bid", "The highest price buyers are currently willing to pay."],
  ["Ask", "The lowest price sellers are currently willing to accept."],
  ["Breakout", "Price moving beyond a defined support, resistance, or structure level."],
  ["Retest", "Price returning to a broken level to test acceptance."],
  ["Support", "An area where buying previously slowed or stopped a decline."],
  ["Resistance", "An area where selling previously slowed or stopped a rally."],
  ["Liquidity", "Available orders. Obvious levels often attract clustered orders."],
  ["Stop Loss", "A planned exit when the trade idea is wrong."],
  ["Position Size", "The amount traded after accounting for account size, stop distance, and risk."],
  ["R", "A unit of risk. 1R equals the planned loss on the trade."],
  ["Expectancy", "The average result expected across many trades."],
  ["Drawdown", "The decline from an account or strategy high."],
  ["FOMO", "Fear of missing out. It often causes chasing."],
  ["Revenge Trading", "Trying to force money back after a loss."],
  ["Role Reversal", "Former support acting as resistance, or former resistance acting as support."],
  ["Slippage", "The difference between expected and actual fill price."]
];

const state = {
  activeModule: 0,
  completed: new Set(JSON.parse(localStorage.getItem("tm_completed") || "[]")),
  quizIndex: Number(localStorage.getItem("tm_quiz_index") || 0),
  quizCorrect: Number(localStorage.getItem("tm_quiz_correct") || 0),
  quizAnswered: Number(localStorage.getItem("tm_quiz_answered") || 0),
  cardIndex: 0,
  cardFlipped: false,
  journal: JSON.parse(localStorage.getItem("tm_journal") || "[]"),
  timer: {
    total: 25 * 60,
    remaining: 25 * 60,
    interval: null,
    running: false
  }
};

const els = {
  lessonList: document.getElementById("lesson-list"),
  lessonSearch: document.getElementById("lesson-search"),
  progressFill: document.getElementById("progress-fill"),
  progressCopy: document.getElementById("progress-copy"),
  activeIndex: document.getElementById("active-index"),
  lessonTag: document.getElementById("lesson-tag"),
  lessonTitle: document.getElementById("lesson-title"),
  lessonSummary: document.getElementById("lesson-summary"),
  lessonImage: document.getElementById("lesson-image"),
  lessonPoints: document.getElementById("lesson-points"),
  lessonPractice: document.getElementById("lesson-practice"),
  lessonTrap: document.getElementById("lesson-trap"),
  markComplete: document.getElementById("mark-complete"),
  resetProgress: document.getElementById("reset-progress"),
  printPlan: document.getElementById("print-plan"),
  quizScore: document.getElementById("quiz-score"),
  quizQuestion: document.getElementById("quiz-question"),
  quizOptions: document.getElementById("quiz-options"),
  quizFeedback: document.getElementById("quiz-feedback"),
  nextQuestion: document.getElementById("next-question"),
  flashcardCount: document.getElementById("flashcard-count"),
  flashcard: document.getElementById("flashcard"),
  flashcardFront: document.getElementById("flashcard-front"),
  flashcardBack: document.getElementById("flashcard-back"),
  flipCard: document.getElementById("flip-card"),
  nextCard: document.getElementById("next-card"),
  timerFace: document.getElementById("timer-face"),
  timerMinutes: document.getElementById("timer-minutes"),
  timerStart: document.getElementById("timer-start"),
  timerPause: document.getElementById("timer-pause"),
  timerReset: document.getElementById("timer-reset"),
  riskForm: document.getElementById("risk-form"),
  riskResults: document.getElementById("risk-results"),
  setupChecklist: document.getElementById("setup-checklist"),
  setupScore: document.getElementById("setup-score"),
  setupGrade: document.getElementById("setup-grade"),
  journalForm: document.getElementById("journal-form"),
  analyticsGrid: document.getElementById("analytics-grid"),
  journalBody: document.getElementById("journal-body"),
  exportJournal: document.getElementById("export-journal"),
  clearJournal: document.getElementById("clear-journal"),
  glossarySearch: document.getElementById("glossary-search"),
  glossaryGrid: document.getElementById("glossary-grid")
};

function saveProgress() {
  localStorage.setItem("tm_completed", JSON.stringify([...state.completed]));
}

function renderLessonList() {
  const query = els.lessonSearch.value.trim().toLowerCase();
  els.lessonList.innerHTML = "";

  modules.forEach((module, index) => {
    const haystack = `${module.title} ${module.tag} ${module.summary}`.toLowerCase();
    if (query && !haystack.includes(query)) {
      return;
    }

    const button = document.createElement("button");
    button.className = [
      "lesson-tab",
      index === state.activeModule ? "is-active" : "",
      state.completed.has(index) ? "is-complete" : ""
    ].filter(Boolean).join(" ");
    button.type = "button";
    button.innerHTML = `
      <span class="lesson-tab__number">${String(index + 1).padStart(2, "0")}</span>
      <span>
        <span class="lesson-tab__title">${module.title}</span>
        <span class="lesson-tab__tag">${module.tag}</span>
      </span>
      <span class="lesson-tab__status">${state.completed.has(index) ? "Done" : ""}</span>
    `;
    button.addEventListener("click", () => {
      state.activeModule = index;
      renderLesson();
      renderLessonList();
    });
    els.lessonList.appendChild(button);
  });
}

function renderLesson() {
  const module = modules[state.activeModule];
  els.activeIndex.textContent = `Module ${state.activeModule + 1}`;
  els.lessonTag.textContent = module.tag;
  els.lessonTitle.textContent = module.title;
  els.lessonSummary.textContent = module.summary;
  els.lessonTrap.textContent = module.trap;
  els.lessonPoints.innerHTML = module.points.map((point) => `<li>${point}</li>`).join("");
  els.lessonPractice.innerHTML = module.practice.map((item) => `<li>${item}</li>`).join("");
  els.lessonImage.innerHTML = chartVisual(module.visual, module.title);
  els.markComplete.textContent = state.completed.has(state.activeModule) ? "Module complete" : "Mark module complete";
  updateProgress();
}

function updateProgress() {
  const complete = state.completed.size;
  const percent = (complete / modules.length) * 100;
  els.progressFill.style.width = `${percent}%`;
  els.progressCopy.textContent = `${complete} of ${modules.length} modules complete`;
}

function chartVisual(type, title) {
  const baseGrid = `
    <line class="chart-grid-line" x1="40" y1="40" x2="40" y2="270"></line>
    <line class="chart-grid-line" x1="40" y1="270" x2="760" y2="270"></line>
    <line class="chart-grid-line" x1="40" y1="95" x2="760" y2="95"></line>
    <line class="chart-grid-line" x1="40" y1="150" x2="760" y2="150"></line>
    <line class="chart-grid-line" x1="40" y1="215" x2="760" y2="215"></line>
  `;

  const visuals = {
    liquidity: `
      <path class="chart-path chart-path--green" d="M60 230 C120 150 170 205 220 125 S330 75 390 130 S510 210 590 95 S690 80 735 120"></path>
      <line class="chart-level" x1="95" y1="88" x2="735" y2="88"></line>
      <line class="chart-level" x1="85" y1="232" x2="710" y2="232"></line>
      <text class="chart-label" x="110" y="78">Buy stops above obvious highs</text>
      <text class="chart-label" x="110" y="255">Sell stops below obvious lows</text>
    `,
    comparison: `
      <rect x="90" y="210" width="90" height="55" fill="#43d37d"></rect>
      <rect x="230" y="165" width="90" height="100" fill="#61d4d8"></rect>
      <rect x="370" y="120" width="90" height="145" fill="#f4bd50"></rect>
      <rect x="510" y="70" width="90" height="195" fill="#ff6b6b"></rect>
      <text class="chart-label" x="92" y="195">Stocks</text>
      <text class="chart-label" x="232" y="150">Forex</text>
      <text class="chart-label" x="372" y="105">Crypto</text>
      <text class="chart-label" x="512" y="55">Futures</text>
      <text class="chart-note" x="92" y="290">Volatility and product risk must shape position size</text>
    `,
    platform: `
      <rect x="70" y="55" width="650" height="210" fill="#12191b" stroke="#34444b"></rect>
      <rect x="85" y="75" width="110" height="170" fill="#1a2125" stroke="#34444b"></rect>
      <rect x="215" y="75" width="365" height="170" fill="#0d1214" stroke="#34444b"></rect>
      <rect x="600" y="75" width="100" height="170" fill="#1a2125" stroke="#34444b"></rect>
      <path class="chart-path chart-path--green" d="M235 210 L280 175 L320 190 L365 135 L420 155 L470 105 L545 120"></path>
      <text class="chart-label" x="92" y="98">Watchlist</text>
      <text class="chart-label" x="235" y="98">Chart</text>
      <text class="chart-label" x="615" y="98">Alerts</text>
    `,
    candles: candleVisual(),
    structure: `
      <path class="chart-path chart-path--green" d="M70 235 L150 150 L225 205 L310 120 L390 170 L480 82 L560 135 L675 62"></path>
      <text class="chart-label" x="140" y="140">HH</text>
      <text class="chart-label" x="215" y="222">HL</text>
      <text class="chart-label" x="300" y="110">HH</text>
      <text class="chart-label" x="382" y="188">HL</text>
      <text class="chart-label" x="470" y="72">HH</text>
      <text class="chart-label" x="552" y="153">HL</text>
    `,
    levels: `
      <path class="chart-path" d="M65 215 C125 120 190 205 245 135 S365 96 425 145 S535 220 600 135 S690 95 735 145"></path>
      <rect x="65" y="92" width="670" height="32" fill="rgba(244,189,80,0.14)" stroke="#f4bd50"></rect>
      <rect x="65" y="212" width="670" height="32" fill="rgba(67,211,125,0.12)" stroke="#43d37d"></rect>
      <text class="chart-label" x="80" y="85">Resistance zone</text>
      <text class="chart-label" x="80" y="262">Support zone</text>
    `,
    breakout: `
      <path class="chart-path chart-path--green" d="M55 220 L120 185 L190 205 L260 175 L335 190 L410 132 L485 82 L555 125 L635 92 L735 60"></path>
      <line class="chart-level" x1="70" y1="135" x2="735" y2="135"></line>
      <text class="chart-label" x="85" y="123">Breakout level</text>
      <text class="chart-label" x="482" y="150">Retest holds</text>
      <text class="chart-label" x="632" y="82">Continuation</text>
    `,
    risk: `
      <path class="chart-path chart-path--green" d="M85 220 L180 190 L260 160 L340 130 L420 98"></path>
      <line class="chart-level" x1="90" y1="220" x2="460" y2="220"></line>
      <line class="chart-level" x1="90" y1="98" x2="460" y2="98"></line>
      <line class="chart-level" x1="90" y1="260" x2="460" y2="260"></line>
      <text class="chart-label" x="475" y="103">Target: +2R</text>
      <text class="chart-label" x="475" y="225">Entry</text>
      <text class="chart-label" x="475" y="265">Stop: -1R</text>
    `,
    psychology: `
      <path class="chart-path chart-path--red" d="M80 220 C170 90 240 260 330 120 S500 235 590 110 S690 170 730 82"></path>
      <line class="chart-level" x1="90" y1="170" x2="730" y2="170"></line>
      <text class="chart-label" x="105" y="160">Rules hold the middle when emotions swing</text>
    `,
    system: `
      <rect x="90" y="70" width="130" height="65" fill="#142018" stroke="#43d37d"></rect>
      <rect x="335" y="70" width="130" height="65" fill="#142026" stroke="#61d4d8"></rect>
      <rect x="580" y="70" width="130" height="65" fill="#1b1a12" stroke="#f4bd50"></rect>
      <rect x="210" y="195" width="160" height="65" fill="#12191b" stroke="#34444b"></rect>
      <rect x="450" y="195" width="160" height="65" fill="#12191b" stroke="#34444b"></rect>
      <path d="M220 102 L335 102 M465 102 L580 102 M400 135 L300 195 M400 135 L530 195" stroke="#9fb0b7" stroke-width="2" fill="none"></path>
      <text class="chart-label" x="120" y="108">Rules</text>
      <text class="chart-label" x="365" y="108">Testing</text>
      <text class="chart-label" x="610" y="108">Review</text>
      <text class="chart-label" x="245" y="235">Journal</text>
      <text class="chart-label" x="480" y="235">Refine</text>
    `,
    roadmap: `
      <path d="M90 190 L250 120 L410 170 L570 95 L710 130" stroke="#61d4d8" stroke-width="4" fill="none"></path>
      <circle cx="90" cy="190" r="12" fill="#43d37d"></circle>
      <circle cx="250" cy="120" r="12" fill="#61d4d8"></circle>
      <circle cx="410" cy="170" r="12" fill="#f4bd50"></circle>
      <circle cx="570" cy="95" r="12" fill="#43d37d"></circle>
      <circle cx="710" cy="130" r="12" fill="#61d4d8"></circle>
      <text class="chart-label" x="72" y="220">30d</text>
      <text class="chart-label" x="230" y="102">Backtest</text>
      <text class="chart-label" x="386" y="200">Paper</text>
      <text class="chart-label" x="548" y="77">Review</text>
      <text class="chart-label" x="685" y="160">Ready?</text>
    `,
    advanced: `
      <path class="chart-path" d="M70 225 L150 180 L230 195 L310 105 L390 145 L475 88 L555 150 L650 90 L735 118"></path>
      <rect x="300" y="118" width="105" height="54" fill="rgba(244,189,80,0.15)" stroke="#f4bd50"></rect>
      <rect x="540" y="112" width="120" height="58" fill="rgba(97,212,216,0.12)" stroke="#61d4d8"></rect>
      <text class="chart-label" x="308" y="110">Supply</text>
      <text class="chart-label" x="548" y="104">FVG</text>
    `,
    mistakes: `
      <path class="chart-path chart-path--red" d="M70 230 L160 155 L245 190 L330 108 L420 150 L500 110 L590 150 L700 60"></path>
      <line class="chart-level" x1="95" y1="145" x2="710" y2="145"></line>
      <text class="chart-label" x="105" y="132">Chasing area</text>
      <text class="chart-label" x="475" y="180">Late entry creates poor R:R</text>
    `,
    routine: `
      <circle cx="170" cy="150" r="58" fill="#142018" stroke="#43d37d"></circle>
      <circle cx="395" cy="150" r="58" fill="#142026" stroke="#61d4d8"></circle>
      <circle cx="620" cy="150" r="58" fill="#1b1a12" stroke="#f4bd50"></circle>
      <path d="M228 150 L337 150 M453 150 L562 150" stroke="#9fb0b7" stroke-width="2"></path>
      <text class="chart-label" x="132" y="155">Prepare</text>
      <text class="chart-label" x="360" y="155">Execute</text>
      <text class="chart-label" x="590" y="155">Review</text>
    `,
    journal: `
      <rect x="85" y="60" width="630" height="210" fill="#111719" stroke="#34444b"></rect>
      <line x1="85" y1="110" x2="715" y2="110" stroke="#34444b"></line>
      <line x1="85" y1="160" x2="715" y2="160" stroke="#34444b"></line>
      <line x1="85" y1="210" x2="715" y2="210" stroke="#34444b"></line>
      <line x1="250" y1="60" x2="250" y2="270" stroke="#34444b"></line>
      <line x1="420" y1="60" x2="420" y2="270" stroke="#34444b"></line>
      <line x1="585" y1="60" x2="585" y2="270" stroke="#34444b"></line>
      <text class="chart-label" x="105" y="92">Setup</text>
      <text class="chart-label" x="275" y="92">Risk</text>
      <text class="chart-label" x="445" y="92">R result</text>
      <text class="chart-label" x="610" y="92">Emotion</text>
    `,
    path: `
      <path class="chart-path chart-path--green" d="M80 240 C160 245 190 215 230 210 S310 215 350 180 S440 155 485 150 S575 120 630 100 S700 82 735 70"></path>
      <path d="M80 210 C170 110 250 250 330 155 S500 230 590 118 S690 130 735 105" stroke="rgba(255,107,107,0.45)" stroke-width="2" fill="none" stroke-dasharray="7 7"></path>
      <text class="chart-label" x="92" y="265">Small controlled improvement</text>
      <text class="chart-note" x="92" y="90">Fast fantasy curve is unstable</text>
    `
  };

  const selected = visuals[type] || visuals.structure;
  return `
    <svg viewBox="0 0 800 310" role="img" aria-label="${title} chart concept">
      ${baseGrid}
      ${selected}
    </svg>
  `;
}

function candleVisual() {
  const candles = [
    [120, 120, 210, 85, "#43d37d"],
    [210, 150, 230, 105, "#ff6b6b"],
    [300, 95, 230, 75, "#43d37d"],
    [390, 125, 220, 100, "#ff6b6b"],
    [480, 82, 205, 62, "#43d37d"],
    [570, 105, 235, 85, "#ff6b6b"]
  ];

  return candles.map(([x, y1, y2, bodyY, color], index) => {
    const bodyHeight = Math.max(18, Math.abs(y2 - y1) * 0.32);
    return `
      <line x1="${x}" y1="${bodyY - 28}" x2="${x}" y2="${y2}" stroke="${color}" stroke-width="4"></line>
      <rect x="${x - 18}" y="${bodyY}" width="36" height="${bodyHeight}" fill="${color}"></rect>
      <text class="chart-note" x="${x - 28}" y="270">${["Doji", "Bear", "Engulf", "Shoot", "Hammer", "Fail"][index]}</text>
    `;
  }).join("");
}

function renderQuiz() {
  const question = quizQuestions[state.quizIndex % quizQuestions.length];
  els.quizScore.textContent = `${state.quizCorrect} / ${state.quizAnswered}`;
  els.quizQuestion.textContent = question.question;
  els.quizFeedback.textContent = "";
  els.quizOptions.innerHTML = "";

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", () => answerQuiz(index));
    els.quizOptions.appendChild(button);
  });
}

function answerQuiz(index) {
  const question = quizQuestions[state.quizIndex % quizQuestions.length];
  const buttons = [...els.quizOptions.querySelectorAll("button")];
  buttons.forEach((button) => {
    button.disabled = true;
  });

  buttons[question.answer].classList.add("is-correct");
  if (index !== question.answer) {
    buttons[index].classList.add("is-wrong");
  }

  state.quizAnswered += 1;
  if (index === question.answer) {
    state.quizCorrect += 1;
    els.quizFeedback.textContent = `Correct. ${question.explanation}`;
  } else {
    els.quizFeedback.textContent = `Not quite. ${question.explanation}`;
  }

  localStorage.setItem("tm_quiz_correct", state.quizCorrect);
  localStorage.setItem("tm_quiz_answered", state.quizAnswered);
  els.quizScore.textContent = `${state.quizCorrect} / ${state.quizAnswered}`;
}

function nextQuiz() {
  state.quizIndex = (state.quizIndex + 1) % quizQuestions.length;
  localStorage.setItem("tm_quiz_index", state.quizIndex);
  renderQuiz();
}

function renderFlashcard() {
  const card = flashcards[state.cardIndex];
  els.flashcardCount.textContent = `${state.cardIndex + 1} / ${flashcards.length}`;
  els.flashcardFront.textContent = card.front;
  els.flashcardBack.textContent = state.cardFlipped ? card.back : "Tap Flip to reveal the answer.";
}

function flipFlashcard() {
  state.cardFlipped = !state.cardFlipped;
  renderFlashcard();
}

function nextFlashcard() {
  state.cardIndex = (state.cardIndex + 1) % flashcards.length;
  state.cardFlipped = false;
  renderFlashcard();
}

function updateRiskCalculator() {
  const account = numberValue("account-size");
  const riskPct = numberValue("risk-percent");
  const entry = numberValue("entry-price");
  const stop = numberValue("stop-price");
  const target = numberValue("target-price");
  const pointValue = Math.max(numberValue("point-value"), 0.0001);
  const stopDistance = Math.abs(entry - stop);
  const targetDistance = Math.abs(target - entry);
  const dollarRisk = account * (riskPct / 100);
  const positionSize = stopDistance > 0 ? dollarRisk / (stopDistance * pointValue) : 0;
  const rewardRisk = stopDistance > 0 ? targetDistance / stopDistance : 0;
  const potentialReward = targetDistance * positionSize * pointValue;

  els.riskResults.innerHTML = `
    <div><span>Dollar risk</span><strong>${formatCurrency(dollarRisk)}</strong></div>
    <div><span>Position size</span><strong>${formatNumber(positionSize)} units</strong></div>
    <div><span>Reward to risk</span><strong>${formatNumber(rewardRisk)}R</strong></div>
    <div><span>Potential reward</span><strong>${formatCurrency(potentialReward)}</strong></div>
  `;
}

function numberValue(id) {
  return Number(document.getElementById(id).value || 0);
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number.isFinite(value) ? value : 0);
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(Number.isFinite(value) ? value : 0);
}

function renderChecklist() {
  els.setupChecklist.innerHTML = checklistItems.map((item, index) => `
    <label class="check-item">
      <input type="checkbox" data-check-index="${index}">
      <span>
        <strong>${item.label}</strong>
        <span>${item.detail}</span>
      </span>
      <em>+${item.points}</em>
    </label>
  `).join("");
}

function updateChecklistScore() {
  const checked = [...els.setupChecklist.querySelectorAll("input:checked")];
  const score = checked.reduce((total, item) => {
    const index = Number(item.dataset.checkIndex);
    return total + checklistItems[index].points;
  }, 0);

  els.setupScore.textContent = `${score} / 16`;
  if (score >= 14) {
    els.setupGrade.textContent = "A-grade candidate. Still size small and follow the plan.";
  } else if (score >= 10) {
    els.setupGrade.textContent = "Needs caution. Paper trade or wait for cleaner evidence.";
  } else {
    els.setupGrade.textContent = "No trade until evidence appears.";
  }
}

function saveJournal() {
  localStorage.setItem("tm_journal", JSON.stringify(state.journal));
}

function addJournalTrade(event) {
  event.preventDefault();
  const data = new FormData(els.journalForm);
  state.journal.unshift({
    date: new Date().toLocaleDateString(),
    market: String(data.get("market") || "").trim(),
    direction: String(data.get("direction") || ""),
    setup: String(data.get("setup") || "").trim(),
    result: Number(data.get("result") || 0),
    emotion: String(data.get("emotion") || ""),
    notes: String(data.get("notes") || "").trim()
  });
  saveJournal();
  els.journalForm.reset();
  renderJournal();
}

function renderJournal() {
  renderAnalytics();
  if (!state.journal.length) {
    els.journalBody.innerHTML = `<tr><td colspan="7">No trades logged yet.</td></tr>`;
    return;
  }

  els.journalBody.innerHTML = state.journal.map((trade, index) => `
    <tr>
      <td>${trade.date}</td>
      <td>${escapeHtml(trade.market)}</td>
      <td>${trade.direction}</td>
      <td>${escapeHtml(trade.setup)}</td>
      <td>${formatNumber(trade.result)}</td>
      <td>${trade.emotion}</td>
      <td><button class="delete-trade" type="button" data-delete="${index}">Delete</button></td>
    </tr>
  `).join("");
}

function renderAnalytics() {
  const trades = state.journal;
  const total = trades.length;
  const netR = trades.reduce((sum, trade) => sum + trade.result, 0);
  const wins = trades.filter((trade) => trade.result > 0);
  const losses = trades.filter((trade) => trade.result < 0);
  const winRate = total ? (wins.length / total) * 100 : 0;
  const avgWin = wins.length ? wins.reduce((sum, trade) => sum + trade.result, 0) / wins.length : 0;
  const avgLoss = losses.length ? losses.reduce((sum, trade) => sum + trade.result, 0) / losses.length : 0;

  els.analyticsGrid.innerHTML = `
    <div><span>Total trades</span><strong>${total}</strong></div>
    <div><span>Net R</span><strong>${formatNumber(netR)}R</strong></div>
    <div><span>Win rate</span><strong>${formatNumber(winRate)}%</strong></div>
    <div><span>Avg win/loss</span><strong>${formatNumber(avgWin)} / ${formatNumber(avgLoss)}R</strong></div>
  `;
}

function deleteTrade(index) {
  state.journal.splice(index, 1);
  saveJournal();
  renderJournal();
}

function exportJournal() {
  const rows = [
    ["Date", "Market", "Direction", "Setup", "Result R", "Emotion", "Notes"],
    ...state.journal.map((trade) => [
      trade.date,
      trade.market,
      trade.direction,
      trade.setup,
      trade.result,
      trade.emotion,
      trade.notes
    ])
  ];
  const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "trading-journal.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function clearJournal() {
  state.journal = [];
  saveJournal();
  renderJournal();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderGlossary() {
  const query = els.glossarySearch.value.trim().toLowerCase();
  const filtered = glossary.filter(([term, definition]) => {
    return `${term} ${definition}`.toLowerCase().includes(query);
  });

  els.glossaryGrid.innerHTML = filtered.map(([term, definition]) => `
    <article class="glossary-term">
      <strong>${term}</strong>
      <p>${definition}</p>
    </article>
  `).join("");
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function setTimerFromInput() {
  const minutes = Math.min(Math.max(Number(els.timerMinutes.value || 25), 5), 90);
  state.timer.total = minutes * 60;
  state.timer.remaining = state.timer.total;
  els.timerFace.textContent = formatTime(state.timer.remaining);
}

function startTimer() {
  if (state.timer.running) {
    return;
  }
  state.timer.running = true;
  state.timer.interval = window.setInterval(() => {
    state.timer.remaining -= 1;
    if (state.timer.remaining <= 0) {
      state.timer.remaining = 0;
      pauseTimer();
    }
    els.timerFace.textContent = formatTime(state.timer.remaining);
  }, 1000);
}

function pauseTimer() {
  state.timer.running = false;
  window.clearInterval(state.timer.interval);
}

function resetTimer() {
  pauseTimer();
  setTimerFromInput();
}

function bindEvents() {
  els.lessonSearch.addEventListener("input", renderLessonList);
  els.markComplete.addEventListener("click", () => {
    state.completed.add(state.activeModule);
    saveProgress();
    renderLesson();
    renderLessonList();
  });
  els.resetProgress.addEventListener("click", () => {
    state.completed.clear();
    saveProgress();
    renderLesson();
    renderLessonList();
  });
  els.printPlan.addEventListener("click", () => window.print());
  els.nextQuestion.addEventListener("click", nextQuiz);
  els.flipCard.addEventListener("click", flipFlashcard);
  els.flashcard.addEventListener("click", flipFlashcard);
  els.nextCard.addEventListener("click", nextFlashcard);
  els.timerMinutes.addEventListener("input", resetTimer);
  els.timerStart.addEventListener("click", startTimer);
  els.timerPause.addEventListener("click", pauseTimer);
  els.timerReset.addEventListener("click", resetTimer);
  els.riskForm.addEventListener("input", updateRiskCalculator);
  els.setupChecklist.addEventListener("change", updateChecklistScore);
  els.journalForm.addEventListener("submit", addJournalTrade);
  els.journalBody.addEventListener("click", (event) => {
    const button = event.target.closest("[data-delete]");
    if (!button) {
      return;
    }
    deleteTrade(Number(button.dataset.delete));
  });
  els.exportJournal.addEventListener("click", exportJournal);
  els.clearJournal.addEventListener("click", clearJournal);
  els.glossarySearch.addEventListener("input", renderGlossary);
}

function init() {
  bindEvents();
  renderLesson();
  renderLessonList();
  renderQuiz();
  renderFlashcard();
  updateRiskCalculator();
  renderChecklist();
  updateChecklistScore();
  renderJournal();
  renderGlossary();
  setTimerFromInput();
}

init();
