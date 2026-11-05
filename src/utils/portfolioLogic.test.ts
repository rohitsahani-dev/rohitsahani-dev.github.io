import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PERSONAL_IDENTITY,
  SKILL_GROUPS,
  WORKFLOW_STAGES,
  PORTFOLIO_PROJECTS,
  cycleIndex,
  formatProjectCounter,
  filterProjectsByCategory,
  formatScrambleText,
  validateContactForm,
  computeTourState,
  resolveCursorDescriptor,
  lerpPoint,
  STUDIO_TECH_ITEMS,
  filterStudioTechItems,
  HOW_I_WORK_STEPS,
  QUICK_SCOPE_PRESETS,
  computeScrollProgressPercent,
  generateEmailQrMatrix,
} from './portfolioLogic';

test('PERSONAL_IDENTITY and SKILL_GROUPS match Rohit Sahani requirements', () => {
  assert.equal(PERSONAL_IDENTITY.name, 'ROHIT SAHANI');
  assert.equal(PERSONAL_IDENTITY.location, 'Biratnagar, Nepal');
  assert.equal(PERSONAL_IDENTITY.githubUrl, 'https://github.com/rohitsahani-dev');
  assert.equal(
    PERSONAL_IDENTITY.linkedinUrl,
    'https://www.linkedin.com/in/rohit-sahani-3804833b6'
  );
  assert.equal(PERSONAL_IDENTITY.portraits.suitEditorial, '/assets/rohit/rohit-portrait-suit.jpg');
  assert.equal(SKILL_GROUPS.length, 3);
  assert.deepEqual(SKILL_GROUPS[0].skills, ['Python', 'JavaScript', 'HTML', 'CSS', 'SQL']);
  assert.deepEqual(SKILL_GROUPS[1].skills, [
    'AI Application Development',
    'LLM Integration',
    'Prompt Engineering',
    'API Integration',
  ]);
  assert.deepEqual(SKILL_GROUPS[2].skills, ['Git', 'GitHub', 'VS Code', 'Google AI Studio']);
});

test('WORKFLOW_STAGES and PORTFOLIO_PROJECTS contain all required items', () => {
  assert.deepEqual(
    WORKFLOW_STAGES.map((s) => s.fullLabel),
    ['01 — EXPERIMENT', '02 — BUILD', '03 — TEST', '04 — IMPROVE']
  );
  assert.deepEqual(
    PORTFOLIO_PROJECTS.map((p) => p.name),
    [
      'SENTRA AI',
      'SS INTERIORS & WALLPAPERS',
      'SCAMSHIELD AI',
      'MARGINIQ',
      'HIMALAYAN KITCHEN',
      'MYCROFT AI',
      'WEATHER APPLICATION',
    ]
  );
  assert.equal(PORTFOLIO_PROJECTS[0].liveUrl, 'https://sentra-personal-ai.vercel.app/');
  assert.equal(PORTFOLIO_PROJECTS[0].screenshotUrl, '/assets/aistudio/image_cdc421ed.png');
  assert.equal(PORTFOLIO_PROJECTS[1].liveUrl, 'https://ss-interiors-wall-papers.vercel.app/');
  assert.equal(PORTFOLIO_PROJECTS[1].screenshotUrl, '/assets/aistudio/image_3c0ce623.png');
});

test('cycleIndex and formatProjectCounter wrap and format properly', () => {
  assert.equal(cycleIndex(0, 7, -1), 6);
  assert.equal(cycleIndex(6, 7, 1), 0);
  assert.equal(formatProjectCounter(0, 7), 'PROJECT 01/07');
  assert.equal(formatProjectCounter(6, 7), 'PROJECT 07/07');
});

test('filterProjectsByCategory filters by category and search query', () => {
  const aiOnly = filterProjectsByCategory(PORTFOLIO_PROJECTS, 'AI & LLM');
  assert.equal(aiOnly.length, 3);
  assert.equal(aiOnly[0].name, 'SENTRA AI');
  assert.equal(aiOnly[1].name, 'SCAMSHIELD AI');
  assert.equal(aiOnly[2].name, 'MYCROFT AI');

  const sqlSearch = filterProjectsByCategory(PORTFOLIO_PROJECTS, 'ALL', 'SQL');
  assert.equal(sqlSearch.length, 1);
  assert.equal(sqlSearch[0].name, 'MARGINIQ');
});

test('formatScrambleText and validateContactForm behave deterministically', () => {
  const states = ['B1R 4T', 'N3P 4L', 'BIRATNAGAR'];
  assert.equal(formatScrambleText(0.1, 'BIRATNAGAR', states), 'B1R 4T');
  assert.equal(formatScrambleText(0.96, 'BIRATNAGAR', states), 'BIRATNAGAR');

  const invalid = validateContactForm({
    name: 'R',
    email: 'invalid-email',
    subject: 'Hi',
    message: 'Short',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.subject);
  assert.ok(invalid.errors.message);

  const valid = validateContactForm({
    name: 'Rohit Tester',
    email: 'tester@example.com',
    subject: 'AI Project Inquiry',
    message: 'Let us collaborate on an LLM integration workflow.',
  });
  assert.equal(valid.valid, true);
});

test('computeTourState progresses monotonically through all 4 portfolio sections', () => {
  const waypoints = {
    hero: 0,
    about: 700,
    projects: 1500,
    projectsGrid: 2300,
    contact: 3100,
  };
  const start = computeTourState(0, waypoints);
  assert.equal(start.scrollY, 0);
  assert.equal(start.stageId, 'hero');

  const midAbout = computeTourState(0.35, waypoints);
  assert.equal(midAbout.stageId, 'about');
  assert.ok(midAbout.scrollY >= 700);
  assert.ok(midAbout.workflowIndex >= 1);

  const midProjects = computeTourState(0.65, waypoints);
  assert.equal(midProjects.stageId, 'projects');
  assert.ok(midProjects.scrollY > 1500);

  const end = computeTourState(1, waypoints);
  assert.equal(end.scrollY, 3100);
  assert.equal(end.stageId, 'contact');
  assert.equal(end.percent, 100);
});

test('resolveCursorDescriptor and lerpPoint compute accurate cursor states', () => {
  const def = resolveCursorDescriptor({ tagName: 'DIV' });
  assert.equal(def.variant, 'default');
  assert.equal(def.ringSize, 36);

  const btn = resolveCursorDescriptor({ tagName: 'BUTTON' });
  assert.equal(btn.variant, 'action');
  assert.equal(btn.ringSize, 52);

  const vercelLink = resolveCursorDescriptor({
    tagName: 'A',
    href: 'https://sentra-personal-ai.vercel.app/',
  });
  assert.equal(vercelLink.variant, 'external');
  assert.equal(vercelLink.label, 'LIVE ↗');

  const inspectCard = resolveCursorDescriptor({ dataCursor: 'INSPECT' });
  assert.equal(inspectCard.variant, 'project');
  assert.equal(inspectCard.label, 'INSPECT ↗');

  const nextPos = lerpPoint({ x: 0, y: 0 }, { x: 100, y: 200 }, 0.25);
  assert.equal(nextPos.x, 25);
  assert.equal(nextPos.y, 50);
});

test('STUDIO_TECH_ITEMS, HOW_I_WORK_STEPS, QUICK_SCOPE_PRESETS, and computeScrollProgressPercent behave accurately', () => {
  assert.equal(STUDIO_TECH_ITEMS.length, 10);
  assert.equal(filterStudioTechItems('ALL').length, 10);
  assert.equal(filterStudioTechItems('CORE').length, 7);
  assert.equal(filterStudioTechItems('EXPLORING').length, 3);
  assert.equal(HOW_I_WORK_STEPS.length, 4);
  assert.equal(QUICK_SCOPE_PRESETS.length, 4);
  assert.equal(computeScrollProgressPercent(0, 2000), 0);
  assert.equal(computeScrollProgressPercent(1000, 2000), 50);
  assert.equal(computeScrollProgressPercent(2500, 2000), 100);
});

test('generateEmailQrMatrix creates a real ISO QR matrix for rohit.sahani.dev@gmail.com', () => {
  const qr = generateEmailQrMatrix();
  assert.equal(qr.payload, 'mailto:rohit.sahani.dev@gmail.com');
  assert.ok(qr.size >= 29);
  assert.equal(qr.cells.length, qr.size);
  assert.equal(qr.cells[0].length, qr.size);
  // Top-left 7x7 finder pattern outer corners are always true
  assert.equal(qr.cells[0][0], true);
  assert.equal(qr.cells[0][6], true);
  assert.equal(qr.cells[6][0], true);
  assert.equal(qr.cells[3][3], true);
});




