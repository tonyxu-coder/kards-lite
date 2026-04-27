const DECKS = {
  germany_armor_push: {
    id: 'germany_armor_push',
    name: '装甲推进',
    faction: 'germany',
    factionName: '德国',
    difficulty: '中等',
    tags: ['协作', '装甲', '中后期推进'],
    description: '用协作步兵和装甲营稳住战线，再以重型火力完成突破。'
  },
  america_air_control: {
    id: 'america_air_control',
    name: '空地联动',
    faction: 'america',
    factionName: '美国',
    difficulty: '中等',
    tags: ['团结', '标记', '空袭控制'],
    description: '先侦察标记，再用远程与轰炸单位清掉关键目标。'
  },
  japan_banzai_charge: {
    id: 'japan_banzai_charge',
    name: '决死突击',
    faction: 'japan',
    factionName: '日本',
    difficulty: '简单',
    tags: ['玉碎', '突击', '快攻爆发'],
    description: '抢前期节奏，用低费单位和突击命令持续压血。'
  },
  china_guerrilla_screen: {
    id: 'china_guerrilla_screen',
    name: '敌后游击',
    faction: 'china',
    factionName: '中国',
    difficulty: '中等',
    tags: ['游击', '牵制', '拉扯反打'],
    description: '靠灵活小单位和回撤战术反复骚扰，拖垮敌方前线。'
  },
  soviet_iron_front: {
    id: 'soviet_iron_front',
    name: '钢铁防线',
    faction: 'soviet',
    factionName: '苏联',
    difficulty: '中等',
    tags: ['坚守', '守卫', '重装反压'],
    description: '前线硬吃伤害，靠坚守和重坦在中后期把战线推回去。'
  }
};

const FACTION_BLUEPRINTS = [
  {
    id: 'germany',
    name: '德国',
    title: '协同装甲群',
    theme: '高组织度推进，靠协作与装甲撕开防线。',
    keyword: '协作',
    keywordText: '当一个带有协作的单位发起攻击时，若其所在战线或相邻战线中存在其他友军单位，则触发协作效果。',
    sample: { name: '第503重装甲营', cost: 6, stats: '5/7', type: '单位', text: '装甲 + 协作' }
  },
  {
    id: 'america',
    name: '美国',
    title: '联合战斗群',
    theme: '越成体系越强，依靠团结与支援滚起资源优势。',
    keyword: '团结',
    keywordText: '当玩家控制两个或以上友军单位时，带有团结的卡牌获得额外效果。',
    sample: { name: '第761坦克营', cost: 5, stats: '4/6', type: '单位', text: '装甲 + 团结' }
  },
  {
    id: 'japan',
    name: '日本',
    title: '决死突击群',
    theme: '高风险高收益，用玉碎和突击换取终结战机。',
    keyword: '玉碎',
    keywordText: '当一个带有玉碎的单位被消灭时，立即结算其玉碎效果。',
    sample: { name: '独立第1挺进营', cost: 4, stats: '4/3', type: '单位', text: '玉碎 + 突击' }
  },
  {
    id: 'china',
    name: '中国',
    title: '敌后游击网',
    theme: '灵活穿插、反复牵制，以游击和警戒拖垮对手。',
    keyword: '游击',
    keywordText: '当一个带有游击的单位完成攻击后，若其满足卡牌描述条件，则可以返回后排，或进入难以被直接锁定的状态直到下回合。',
    sample: { name: '独立第28守备营', cost: 5, stats: '3/6', type: '单位', text: '警戒 + 游击' }
  },
  {
    id: 'soviet',
    name: '苏联',
    title: '钢铁防线',
    theme: '硬顶战线，凭坚守和重装反压回去。',
    keyword: '坚守',
    keywordText: '当一个带有坚守的单位处于己方防线区域，或正在执行防御时，获得额外防御收益。',
    sample: { name: '近卫第12重坦克营', cost: 6, stats: '4/7', type: '单位', text: '装甲 + 坚守' }
  }
];

const COMMON_KEYWORDS = [
  { name: '突击', text: '带有突击的单位在登场回合即可发起攻击。' },
  { name: '警戒', text: '当敌方单位进入与该单位相邻的战线时，带有警戒的单位可以立即进行一次反击。' },
  { name: '装甲', text: '带有装甲的单位每回合第一次受到伤害时，该伤害减少1。' },
  { name: '支援', text: '当一个带有支援的单位处于后排时，可按照卡牌描述为前线友军提供加成。' }
];

const SITE_CARD_SEEDS = {
  '德国': [
    { name: '第12摩托化步兵营', type: '单位', rarity: '普通', keywords: ['协作'], cost: 2, stats: '2/2', effect: '攻击时，若同战线或相邻战线有友军，本次攻击力+1。' },
    { name: '第18侦察营', type: '单位', rarity: '普通', keywords: ['协作'], cost: 1, stats: '1/2', effect: '进场时查看敌方前线一个单位；若有友军相邻，本回合可先手攻击。' },
    { name: '第44工兵营', type: '单位', rarity: '普通', keywords: ['支援'], cost: 2, stats: '1/3', effect: '在后排时，使你的一张前线单位本回合防御+1。' },
    { name: '第39装甲掷弹兵营', type: '单位', rarity: '精锐', keywords: ['协作'], cost: 3, stats: '3/3', effect: '攻击时若触发协作，对目标再造成1点伤害。' },
    { name: '前线燃料补给', type: '支援', rarity: '精锐', keywords: ['支援'], cost: 2, stats: '-', effect: '本回合你下一张装甲单位费用-1，并获得突击。' },
    { name: '第15装甲营', type: '单位', rarity: '精锐', keywords: ['装甲'], cost: 4, stats: '3/5', effect: '每回合首次受到伤害时，伤害-1。' },
    { name: '装甲突进命令', type: '战术', rarity: '王牌', keywords: ['协作'], cost: 3, stats: '-', effect: '选择一个友军单位，若其相邻有友军，则立即发动一次攻击。' },
    { name: '重炮协同校射', type: '支援', rarity: '王牌', keywords: ['支援'], cost: 4, stats: '-', effect: '对一个敌军造成2点伤害；若你控制支援单位，则再造成1点伤害。' },
    { name: '第503重装甲营', type: '单位', rarity: '王牌', keywords: ['装甲', '协作'], cost: 6, stats: '5/7', effect: '装甲；协作触发时，本回合攻击力与生命值各+1。' },
    { name: '闪击突破', type: '战术', rarity: '传奇', keywords: ['协作', '突击'], cost: 5, stats: '-', effect: '使至多两个友军单位本回合获得突击；若它们相邻，则各再+1攻击。' }
  ],
  '美国': [
    { name: '第16步兵营', type: '单位', rarity: '普通', keywords: ['团结'], cost: 2, stats: '2/3', effect: '当你控制至少2个友军单位时，攻击力+1。' },
    { name: '第12补给营', type: '单位', rarity: '普通', keywords: ['支援'], cost: 2, stats: '1/3', effect: '进场时回复1点资源，或抽1张牌。' },
    { name: '第18机枪营', type: '单位', rarity: '普通', keywords: ['警戒'], cost: 2, stats: '2/3', effect: '敌方单位进入相邻战线时，对其造成1点反击伤害。' },
    { name: '第4战斗工兵营', type: '单位', rarity: '精锐', keywords: ['团结'], cost: 3, stats: '2/4', effect: '当团结触发时，获得+1防御直到回合结束。' },
    { name: '战地维修站', type: '支援', rarity: '精锐', keywords: ['支援'], cost: 2, stats: '-', effect: '选择一个友军装甲单位，恢复2点生命。' },
    { name: '第66装甲营', type: '单位', rarity: '精锐', keywords: ['装甲'], cost: 4, stats: '3/5', effect: '每回合首次受到伤害时，伤害-1。' },
    { name: '空地协同打击', type: '战术', rarity: '王牌', keywords: ['团结'], cost: 4, stats: '-', effect: '若你控制至少2个友军单位，对一个敌军造成3点伤害。' },
    { name: '航空侦察联络', type: '支援', rarity: '王牌', keywords: ['支援', '团结'], cost: 3, stats: '-', effect: '抽1张牌；若触发团结，再使一个友军本回合攻击+1。' },
    { name: '第761坦克营', type: '单位', rarity: '王牌', keywords: ['装甲', '团结'], cost: 5, stats: '4/6', effect: '装甲；团结触发时可额外推进一格或攻击+1。' },
    { name: '全面补给', type: '战术', rarity: '传奇', keywords: ['团结', '支援'], cost: 5, stats: '-', effect: '抽2张牌并回复1点资源；若控制至少2个友军，再使一个单位恢复全部生命。' }
  ],
  '日本': [
    { name: '第11步兵营', type: '单位', rarity: '普通', keywords: ['玉碎'], cost: 2, stats: '2/2', effect: '被消灭时，对攻击它的单位造成1点伤害。' },
    { name: '第6山炮营', type: '单位', rarity: '普通', keywords: ['支援'], cost: 2, stats: '1/2', effect: '在后排时，使一个友军单位攻击+1。' },
    { name: '第14工兵营', type: '单位', rarity: '普通', keywords: ['支援'], cost: 2, stats: '1/3', effect: '进场时使一个友军单位获得+1防御。' },
    { name: '第3战车营', type: '单位', rarity: '精锐', keywords: ['装甲'], cost: 4, stats: '3/4', effect: '每回合首次受到伤害时，伤害-1。' },
    { name: '前沿补给据点', type: '支援', rarity: '精锐', keywords: ['支援'], cost: 2, stats: '-', effect: '使一个友军单位本回合费用降低1，或恢复1点生命。' },
    { name: '第1挺进营', type: '单位', rarity: '精锐', keywords: ['突击'], cost: 3, stats: '3/2', effect: '登场回合即可攻击。' },
    { name: '白刃突击', type: '战术', rarity: '王牌', keywords: ['突击'], cost: 3, stats: '-', effect: '使一个步兵单位本回合攻击+2并获得突击。' },
    { name: '战地军旗', type: '支援', rarity: '王牌', keywords: ['玉碎'], cost: 3, stats: '-', effect: '本回合你的友军单位被消灭时，对敌方总部造成1点伤害。' },
    { name: '独立第1挺进营', type: '单位', rarity: '王牌', keywords: ['玉碎', '突击'], cost: 4, stats: '4/3', effect: '突击；被消灭时，对敌方前线一个单位造成2点伤害。' },
    { name: '玉碎命令', type: '战术', rarity: '传奇', keywords: ['玉碎'], cost: 5, stats: '-', effect: '本回合你的所有友军获得“被消灭时，对敌方总部造成1点伤害”。' }
  ],
  '中国': [
    { name: '第7步兵营', type: '单位', rarity: '普通', keywords: ['游击'], cost: 2, stats: '2/2', effect: '攻击后，若未被反击，可返回后排。' },
    { name: '第3守备营', type: '单位', rarity: '普通', keywords: ['警戒'], cost: 2, stats: '1/4', effect: '敌方进入相邻战线时，立即对其造成1点伤害。' },
    { name: '第11游击营', type: '单位', rarity: '普通', keywords: ['游击'], cost: 2, stats: '1/2', effect: '攻击敌方后，可改为撤回后排并抽1张牌。' },
    { name: '第5山地营', type: '单位', rarity: '精锐', keywords: ['警戒'], cost: 3, stats: '2/4', effect: '在山地/防线位置时攻击与防御各+1。' },
    { name: '后方运输线', type: '支援', rarity: '精锐', keywords: ['支援'], cost: 2, stats: '-', effect: '为一个友军恢复1点生命，并使其下回合费用-1。' },
    { name: '独立第2突击营', type: '单位', rarity: '精锐', keywords: ['游击'], cost: 3, stats: '3/2', effect: '攻击后可移动到相邻空战线；若移动成功，本回合不受反击。' },
    { name: '阵地警戒', type: '战术', rarity: '王牌', keywords: ['警戒'], cost: 3, stats: '-', effect: '本回合你的所有守备类单位获得警戒，且首次反击伤害+1。' },
    { name: '民兵协同', type: '支援', rarity: '王牌', keywords: ['支援', '游击'], cost: 3, stats: '-', effect: '召唤一个1/1民兵单位；若你控制带游击的单位，再召唤一个。' },
    { name: '独立第28守备营', type: '单位', rarity: '王牌', keywords: ['警戒', '游击'], cost: 5, stats: '3/6', effect: '警戒；若本回合受到攻击后存活，下回合攻击+2。' },
    { name: '绝地反击', type: '战术', rarity: '传奇', keywords: ['游击'], cost: 4, stats: '-', effect: '选择一个带游击的单位立即攻击；攻击后返回后排并再次造成1点伤害。' }
  ],
  '苏联': [
    { name: '第14步兵营', type: '单位', rarity: '普通', keywords: ['坚守'], cost: 2, stats: '1/4', effect: '在己方防线时，所受伤害-1。' },
    { name: '第6工兵营', type: '单位', rarity: '普通', keywords: ['支援'], cost: 2, stats: '1/3', effect: '在后排时，使一个前线友军防御+1。' },
    { name: '第7自行火炮营', type: '单位', rarity: '普通', keywords: ['支援'], cost: 3, stats: '2/3', effect: '在后排时，回合开始对敌方前线随机单位造成1点伤害。' },
    { name: '独立第5坦克营', type: '单位', rarity: '精锐', keywords: ['装甲'], cost: 4, stats: '3/5', effect: '每回合首次受到伤害时，伤害-1。' },
    { name: '后备兵员补充', type: '支援', rarity: '精锐', keywords: ['支援'], cost: 2, stats: '-', effect: '恢复一个友军2点生命；若其带坚守，再额外+1防御。' },
    { name: '近卫第2步兵营', type: '单位', rarity: '精锐', keywords: ['坚守'], cost: 3, stats: '2/5', effect: '在防御后若仍存活，获得+1攻击。' },
    { name: '冬季反攻', type: '战术', rarity: '王牌', keywords: ['坚守'], cost: 4, stats: '-', effect: '若你本回合承受过攻击，使一个友军单位立即反击并获得+2攻击。' },
    { name: '政委督战', type: '支援', rarity: '王牌', keywords: ['坚守', '支援'], cost: 3, stats: '-', effect: '在后排时，你的带坚守单位攻击与防御各+1。' },
    { name: '近卫第12重坦克营', type: '单位', rarity: '王牌', keywords: ['装甲', '坚守'], cost: 6, stats: '4/7', effect: '装甲；处于己方防线时攻击+1，且无法被首次攻击击退。' },
    { name: '全线动员', type: '战术', rarity: '传奇', keywords: ['坚守'], cost: 5, stats: '-', effect: '本回合你的所有友军获得+1防御；己方防线中的单位再获得+1攻击。' }
  ]
};

const BOARD_COLUMNS_PER_TERRAIN = 2;

const TERRAIN_LINES = [
  {
    id: 'jungle',
    name: '丛林',
    shortName: '丛林',
    keyword: '野战',
    attackBonusFrontline: 0,
    attackBonusBackline: 0,
    damageReduction: 0,
    pairDamageReduction: 1,
    frontlineOnlyDamageReduction: 0,
    description: '野战：同地形同排另一格有友军时，所受伤害 -1。'
  },
  {
    id: 'city',
    name: '城市',
    shortName: '城市',
    keyword: '巷战',
    attackBonusFrontline: 1,
    attackBonusBackline: 0,
    damageReduction: 0,
    pairDamageReduction: 0,
    frontlineOnlyDamageReduction: 0,
    description: '巷战：前线单位攻击敌军时 +1 攻。'
  },
  {
    id: 'snow',
    name: '雪地',
    shortName: '雪地',
    keyword: '雪战',
    attackBonusFrontline: 0,
    attackBonusBackline: 0,
    damageReduction: 0,
    pairDamageReduction: 0,
    frontlineOnlyDamageReduction: 1,
    description: '雪战：前线单位所受伤害 -1，更适合坚守推进。'
  },
  {
    id: 'highland',
    name: '高地',
    shortName: '高地',
    keyword: '山地',
    attackBonusFrontline: 0,
    attackBonusBackline: 1,
    damageReduction: 0,
    pairDamageReduction: 0,
    frontlineOnlyDamageReduction: 0,
    description: '山地：后方单位攻击 +1，利于炮兵与支援火力。'
  }
];

const BOARD_SLOT_COUNT = TERRAIN_LINES.length * BOARD_COLUMNS_PER_TERRAIN;

const INTEL_ADMIN_PASSWORD = 'sbbyq517825';
const INTEL_STORAGE_KEYS = {
  customCards: 'kards-lite.custom-cards',
  adminUnlocked: 'kards-lite.admin-unlocked',
  playerSubmissions: 'kards-lite.player-submissions',
  taskChecks: 'kards-lite.task-checks'
};

let SITE_CARD_LIBRARY = buildSiteCardLibrary();


function getAdminReferenceUnits() {
  return Object.entries(SITE_CARD_SEEDS).map(([faction, cards]) => ({
    faction,
    units: cards.filter((item) => item.type === '单位').slice(0, 5)
  }));
}

function getAdminFactionUnitPrompts() {
  return [
    { faction: '德国', text: '给德国设计一张 3 费协作单位，适合装甲推进开局，效果尽量稳定可执行' },
    { faction: '美国', text: '给美国设计一张 3 费团结单位，偏支援联动，效果尽量稳定可执行' },
    { faction: '日本', text: '给日本设计一张 2 费快攻单位，带突击或玉碎，效果尽量稳定可执行' },
    { faction: '中国', text: '给中国设计一张 3 费游击单位，适合拉扯反打，效果尽量稳定可执行' },
    { faction: '苏联', text: '给苏联设计一张 4 费坚守单位，适合守线，效果尽量稳定可执行' }
  ];
}

function getFactionDesignPrinciples() {
  return [
    { faction: '德国', focus: '协作推进', tips: ['优先做能和相邻友军联动的单位', '身材可以扎实，但别同时给太多爆发', '更适合中盘站线后扩大优势'] },
    { faction: '美国', focus: '团结运营', tips: ['围绕团结、支援、抽牌或定点解场设计', '单卡别太莽，强调成体系后变强', '适合让单位承担侦察、补给、联动辅助'] },
    { faction: '日本', focus: '快攻换血', tips: ['优先低费、突击、玉碎这类高压单位', '可以脆，但要换得到节奏或伤害', '效果要鼓励抢前线和尽快压基地'] },
    { faction: '中国', focus: '游击拉扯', tips: ['多做撤回后排、警戒、反打类单位', '单体数值别过猛，强在位置和节奏', '鼓励反复换线、拖慢对面推进'] },
    { faction: '苏联', focus: '坚守反压', tips: ['优先守线、回血、受击收益、重装单位', '生命和防守收益可以更突出', '设计目标是先稳住，再把战线推回去'] }
  ];
}

function getCardBalanceWarnings(card) {
  const warnings = [];
  if (!card) return warnings;
  const keywords = Array.isArray(card.keywords) ? card.keywords : [];
  const effect = String(card.effect || '');
  const templateHits = getTemplateHitLabels(detectCustomCardTemplate(effect));
  if (card.type === '单位') {
    const stats = parseCustomStats(card.stats);
    const statTotal = stats.attack + stats.health;
    if (card.cost <= 2 && statTotal >= 6) warnings.push('低费单位身材偏高，前期可能会压得太狠。');
    if (card.cost >= 5 && statTotal <= 5) warnings.push('高费单位身材偏低，可能会显得不值费用。');
    if (keywords.length >= 3) warnings.push('关键词有点多，建议保留 1 到 2 个核心标签。');
    if (effect && !templateHits.length) warnings.push('效果没有命中稳定模板，实战执行可能不稳定。');
    if ((keywords.includes('突击') || keywords.includes('玉碎')) && statTotal >= 7) warnings.push('快攻/爆发关键词叠高身材，可能会超模。');
    if (keywords.includes('装甲') && stats.health >= 6 && card.cost <= 4) warnings.push('低费高血再带装甲，守线强度可能过头。');
  } else {
    if (!templateHits.length && effect) warnings.push('这张非单位牌没有命中稳定模板，建议收敛到当前可执行描述。');
  }
  if ((card.name || '').length <= 2) warnings.push('卡名偏短，建议像番号或代号，辨识度会更高。');
  return warnings;
}

function getCardDesignScores(card) {
  if (!card) return null;
  const warnings = getCardBalanceWarnings(card);
  const templateHits = getTemplateHitLabels(detectCustomCardTemplate(card.effect));
  const keywords = Array.isArray(card.keywords) ? card.keywords : [];
  let stability = 55;
  let strength = 60;
  let clarity = 60;

  stability += Math.min(25, templateHits.length * 12);
  stability -= warnings.some((item) => item.includes('执行可能不稳定')) ? 25 : 0;
  stability -= warnings.some((item) => item.includes('关键词有点多')) ? 8 : 0;

  strength += warnings.some((item) => item.includes('超模') || item.includes('压得太狠') || item.includes('强度可能过头')) ? 18 : 0;
  strength -= warnings.some((item) => item.includes('不值费用')) ? 15 : 0;
  strength += card.type === '单位' && keywords.includes('装甲') ? 6 : 0;
  strength += card.type === '单位' && (keywords.includes('突击') || keywords.includes('玉碎')) ? 6 : 0;

  clarity += Math.min(20, templateHits.length * 10);
  clarity -= warnings.some((item) => item.includes('卡名偏短')) ? 10 : 0;
  clarity -= warnings.some((item) => item.includes('关键词有点多')) ? 10 : 0;
  clarity -= String(card.effect || '').length > 38 ? 8 : 0;

  const clamp = (value) => Math.max(1, Math.min(99, Math.round(value)));
  return {
    stability: clamp(stability),
    strength: clamp(strength),
    clarity: clamp(clarity)
  };
}

function getFactionDesignTasks() {
  return [
    { faction: '德国', title: '补前期协作单位', items: ['先补 2 张 2~3 费协作前线单位', '至少 1 张能帮装甲中盘接力'] },
    { faction: '美国', title: '补联动支援单位', items: ['做 1 张低费团结侦察单位', '再做 1 张中费补给/治疗单位'] },
    { faction: '日本', title: '补抢节奏单位', items: ['先补 2 张 1~3 费快攻单位', '至少 1 张带突击或玉碎'] },
    { faction: '中国', title: '补拉扯反打单位', items: ['做 1 张能撤回后排的单位', '再做 1 张警戒或守线反打单位'] },
    { faction: '苏联', title: '补中期守线单位', items: ['先补 1 张 3~4 费坚守单位', '再补 1 张能治疗或吃伤害收益的重装单位'] }
  ];
}

function loadTaskChecks() {
  if (typeof window === 'undefined' || !window.localStorage) return {};
  try {
    const raw = window.localStorage.getItem(INTEL_STORAGE_KEYS.taskChecks);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function saveTaskChecks(checks) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  window.localStorage.setItem(INTEL_STORAGE_KEYS.taskChecks, JSON.stringify(checks));
}

function getDraftActionAdvice(scores, warnings = []) {
  if (!scores) return '先生成或带入一张草稿，我再给你动作建议。';
  if (warnings.some((item) => item.includes('超模') || item.includes('压得太狠') || item.includes('强度可能过头'))) {
    return '先降强度，再测试。优先减身材、减关键词，或把爆发效果收一点。';
  }
  if (scores.stability < 55) {
    return '先收敛成稳定模板，再测试。现在这张更像概念稿。';
  }
  if (scores.clarity < 60) {
    return '先简化描述和关键词，再给同学试玩。';
  }
  if (scores.stability >= 75 && scores.clarity >= 70 && scores.strength <= 78) {
    return '可以先入库测试，观察实战手感和同学反馈。';
  }
  return '可以小范围测试，但建议先微调费用或身材。';
}

function buildVariantDraftFromReference(faction, name) {
  const group = getAdminReferenceUnits().find((item) => item.faction === faction);
  const unit = group?.units.find((item) => item.name === name);
  if (!unit) return null;
  const stats = parseCustomStats(unit.stats);
  const variantEffectMap = {
    '德国': '进场时，若相邻战线已有友军，抽1张牌。',
    '美国': '进场时，治疗一个友军2点生命。',
    '日本': '被消灭时，抽1张牌。',
    '中国': '进场时，召唤一个 1/1 士兵单位。',
    '苏联': '回合结束时，为一个受伤友军回复1点生命。'
  };
  return {
    faction,
    type: '单位',
    rarity: unit.rarity,
    cost: Math.min(10, unit.cost + 1),
    name: `新编${unit.name}`,
    stats: `${Math.max(1, stats.attack)} / ${Math.max(1, stats.health + (faction === '苏联' ? 1 : 0))}`,
    keywords: [...unit.keywords],
    effect: variantEffectMap[faction] || unit.effect
  };
}

function buildSiteCardLibrary() {
  const variants = ['先遣', '主力', '加强', '预备'];
  const costShift = [0, 0, 1, -1];
  const statShift = ['', ' +协同', ' +压制', ' +机动'];
  const result = [];

  Object.entries(SITE_CARD_SEEDS).forEach(([faction, seeds]) => {
    variants.forEach((variant, variantIndex) => {
      seeds.forEach((seed, seedIndex) => {
        const isUnit = seed.type === '单位';
        const nextCost = Math.max(1, seed.cost + costShift[variantIndex]);
        result.push({
          faction,
          name: variantIndex === 0 ? seed.name : `${variant}${seed.name}`,
          type: seed.type,
          rarity: seed.rarity,
          keywords: [...seed.keywords],
          cost: nextCost,
          stats: isUnit ? seed.stats : '-',
          effect: variantIndex === 0 ? seed.effect : `${seed.effect}${statShift[variantIndex]}`,
          group: seedIndex,
          batch: '第一批',
          badge: '⛑'
        });
      });
    });
  });

  return result;
}

function loadCustomSiteCards() {
  if (typeof window === 'undefined' || !window.localStorage) return [];
  try {
    const raw = window.localStorage.getItem(INTEL_STORAGE_KEYS.customCards);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCustomSiteCards(cards) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  window.localStorage.setItem(INTEL_STORAGE_KEYS.customCards, JSON.stringify(cards));
}

function loadPlayerSubmissions() {
  if (typeof window === 'undefined' || !window.localStorage) return [];
  try {
    const raw = window.localStorage.getItem(INTEL_STORAGE_KEYS.playerSubmissions);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function savePlayerSubmissions(items) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  window.localStorage.setItem(INTEL_STORAGE_KEYS.playerSubmissions, JSON.stringify(items));
}

function reviewPlayerCardSubmission(card) {
  const issues = [];
  const templateHits = getTemplateHitLabels(detectCustomCardTemplate(card.effect));

  if (!card.name || card.name.length < 2) issues.push('卡名太短，至少像个正式番号或代号。');
  if (card.cost < 0 || card.cost > 10) issues.push('费用不合理，建议控制在 0 到 10 之间。');
  if (card.type === '单位' && !/(\d+)\s*\/\s*(\d+)/.test(card.stats || '')) issues.push('单位卡需要明确填写攻击/生命，例如 3/4。');
  if (!templateHits.length) issues.push('效果没有命中当前稳定模板，建议改成抽牌、治疗、召唤、伤害、死亡触发这类可执行描述。');
  if ((card.effect || '').length < 6) issues.push('效果描述太短，管理员没法判断这张卡到底做什么。');

  return {
    approved: issues.length === 0,
    issues,
    templateHits,
    reply: issues.length === 0
      ? `审核通过：${card.name} 可以入库。命中模板：${templateHits.join('、') || '基础模板'}。`
      : `审核未通过：${issues.join('；')}`
  };
}

function getCustomCardId(cardInfo, index) {
  const slug = String(cardInfo.name || `custom-${index}`)
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 32);
  return `custom_${index}_${slug || 'card'}`;
}

function getCustomFactionKey(name) {
  return {
    '德国': 'germany',
    '美国': 'america',
    '日本': 'japan',
    '中国': 'china',
    '苏联': 'soviet'
  }[name] || 'germany';
}

function getCustomCardType(type) {
  return {
    '单位': 'unit',
    '战术': 'command',
    '支援': 'support'
  }[type] || 'unit';
}

function parseCustomStats(statsText) {
  const match = String(statsText || '').match(/(\d+)\s*\/\s*(\d+)/);
  return match ? { attack: Number(match[1]), health: Number(match[2]) } : { attack: 0, health: 0 };
}

function mapKeywordToEngine(keyword) {
  return {
    '突击': 'charge',
    '守卫': 'guard',
    '远程': 'ranged',
    '装甲': 'armor1',
    '协作': 'coordination'
  }[keyword] || null;
}

function detectCustomCardTemplate(text) {
  const normalized = String(text || '');
  return {
    drawOnPlay: /进场.*抽1张牌|抽1张牌/.test(normalized),
    healOnPlay: /进场.*回复2点生命|进场.*回复3点生命|进场.*治疗/.test(normalized),
    summonOnPlay: /进场.*召唤一个 1\/1|进场.*召唤两个 1\/1/.test(normalized),
    endTurnHeal: /回合结束时，为一个受伤友军回复1点生命/.test(normalized),
    endTurnFrontlineBuff: /回合结束时，令你的一个前线单位获得\+1攻击/.test(normalized),
    deathDraw: /被消灭时，抽1张牌/.test(normalized),
    deathSummon: /被消灭时，召唤一个 1\/1 士兵单位到前线空位/.test(normalized),
    commandDamage2: /造成2点伤害/.test(normalized),
    commandDamage3: /造成3点伤害/.test(normalized),
    commandDamageAll: /对所有敌方前线单位各造成2点伤害/.test(normalized),
    commandDoubleStrike: /分别对两个敌方单位造成2点伤害/.test(normalized),
    destroyDamaged: /消灭一个受伤敌方单位/.test(normalized),
    markAndDamage: /标记一个敌方单位，然后对其造成2点伤害/.test(normalized),
    buffFrontlineAttack: /令你的前线单位获得\+1攻击/.test(normalized),
    buffFrontlineHealth: /令你的前线单位获得\+1生命|前线单位获得\+1生命/.test(normalized),
    supportDraw: /回合开始时，抽1张牌/.test(normalized),
    supportHeal: /回合开始时，为一个友军回复1点生命/.test(normalized),
    supportFrontlineBuff: /回合开始时，令你的一个前线单位获得\+1生命/.test(normalized),
    supportSummon: /每回合首次打出单位后，召唤一个 1\/1 士兵单位/.test(normalized)
  };
}

function getTemplateHitLabels(templateMap) {
  const labels = [];
  if (templateMap.drawOnPlay) labels.push('进场抽1');
  if (templateMap.healOnPlay) labels.push('进场治疗');
  if (templateMap.summonOnPlay) labels.push('进场召唤1/1');
  if (templateMap.endTurnHeal) labels.push('回合结束治疗');
  if (templateMap.endTurnFrontlineBuff) labels.push('回合结束前线增益');
  if (templateMap.deathDraw) labels.push('被消灭时抽1');
  if (templateMap.deathSummon) labels.push('死亡产兵');
  if (templateMap.commandDamage2) labels.push('单体2伤害');
  if (templateMap.commandDamage3) labels.push('单体3伤害');
  if (templateMap.commandDamageAll) labels.push('前线群体轰炸');
  if (templateMap.commandDoubleStrike) labels.push('双目标战术');
  if (templateMap.destroyDamaged) labels.push('消灭受伤单位');
  if (templateMap.markAndDamage) labels.push('标记后打2');
  if (templateMap.buffFrontlineAttack) labels.push('前线全体+1攻击');
  if (templateMap.buffFrontlineHealth) labels.push('前线单位+1生命');
  if (templateMap.supportDraw) labels.push('回合开始抽牌');
  if (templateMap.supportHeal) labels.push('回合开始治疗');
  if (templateMap.supportFrontlineBuff) labels.push('回合开始前线加血');
  if (templateMap.supportSummon) labels.push('持续产1/1增援');
  return labels;
}

function createCustomTokenUnit(cardId, ownerId, slotIndex, game) {
  return {
    instanceId: `u${game.turn}-${state.nextUnitId++}`,
    cardId,
    ownerId,
    name: '增援士兵',
    lane: 'front',
    slotIndex,
    baseAttack: 1,
    baseHealth: 1,
    currentHealth: 1,
    keywords: [],
    tags: ['custom', 'token'],
    canAttack: false,
    hasAttacked: false,
    justPlayed: true,
    tempAttackBonus: 0,
    tempDamageReduction: 0,
    marked: false,
    customEffect: '管理员召唤衍生物',
    customTemplate: null
  };
}

function buildCustomCardLibrary() {
  const result = {};
  loadCustomSiteCards().forEach((cardInfo, index) => {
    const id = getCustomCardId(cardInfo, index);
    const type = getCustomCardType(cardInfo.type);
    const stats = parseCustomStats(cardInfo.stats);
    const keywords = Array.isArray(cardInfo.keywords) ? cardInfo.keywords : [];
    const mappedKeywords = keywords.map(mapKeywordToEngine).filter(Boolean);
    const effectText = String(cardInfo.effect || '').trim() || '管理员设计卡';

    result[id] = card(id, cardInfo.name, getCustomFactionKey(cardInfo.faction), type, Number(cardInfo.cost) || 0, effectText, {
      attack: type === 'unit' ? stats.attack : null,
      health: type === 'unit' ? stats.health : null,
      keywords: mappedKeywords,
      tags: ['custom'],
      targetType: type === 'command' ? 'enemy-unit' : 'none',
      custom: true,
      customFactionName: cardInfo.faction,
      customKeywords: keywords,
      customEffect: effectText,
      customTemplate: detectCustomCardTemplate(effectText)
    });
  });
  return result;
}

function refreshSiteCardLibrary() {
  SITE_CARD_LIBRARY = [...buildSiteCardLibrary(), ...loadCustomSiteCards()];
}

const CARD_LIBRARY = {
  north_001: card('north_001', '第311装甲掷弹兵营', 'germany', 'unit', 3, '协作', { attack: 2, health: 3, keywords: ['coordination'], tags: ['infantry'] }),
  north_002: card('north_002', '第9机枪营', 'germany', 'unit', 3, '守卫', { attack: 1, health: 4, keywords: ['guard'], tags: ['infantry'] }),
  north_003: card('north_003', 'sdkfz 234装甲侦察营', 'germany', 'unit', 3, '突击；若部署在城市线，本回合额外+1攻击。', { attack: 3, health: 2, keywords: ['charge'], tags: ['vehicle'] }),
  north_004: card('north_004', '第3战地医护营', 'germany', 'unit', 3, '回合结束时，为一个受伤友军回复1点生命。', { attack: 1, health: 3, tags: ['medic', 'infantry'] }),
  north_005: card('north_005', 'leFH 18榴弹炮营', 'germany', 'unit', 4, '远程', { attack: 3, health: 3, keywords: ['ranged'], tags: ['artillery'] }),
  north_006: card('north_006', '第15装甲营', 'germany', 'unit', 5, '装甲1', { attack: 4, health: 5, keywords: ['armor1'], tags: ['tank', 'vehicle'] }),
  north_101: card('north_101', '炮火覆盖', 'germany', 'command', 2, '对一个敌方单位造成2点伤害；若目标在城市线，改为3点。', { targetType: 'enemy-unit' }),
  north_102: card('north_102', '战地抢修', 'germany', 'command', 2, '一个友军回复2点生命；若是载具，则回复3点。', { targetType: 'friendly-unit' }),
  north_103: card('north_103', '定点清除', 'germany', 'command', 4, '消灭一个生命值不高于4的敌方单位。', { targetType: 'enemy-unit' }),
  north_201: card('north_201', '前线补给站', 'germany', 'support', 3, '回合开始时，若前线至少有2个单位，则获得1点额外能量。'),

  west_001: card('west_001', '第8侦察营', 'america', 'unit', 2, '进场时，标记一个敌军单位。', { attack: 1, health: 2, tags: ['infantry'] }),
  west_002: card('west_002', '前线观测营', 'america', 'unit', 2, '你的指令对被标记单位造成的伤害+1。', { attack: 1, health: 3, tags: ['infantry'] }),
  west_003: card('west_003', 'P-40战斗机中队', 'america', 'unit', 4, '远程；可以攻击后方单位。', { attack: 3, health: 2, keywords: ['ranged'], tags: ['aircraft', 'vehicle'] }),
  west_004: card('west_004', '俯冲轰炸机中队', 'america', 'unit', 5, '进场时，对一个被标记单位造成2点伤害。', { attack: 4, health: 3, tags: ['aircraft', 'vehicle'] }),
  west_005: card('west_005', 'B-25轰炸机编队', 'america', 'unit', 7, '进场时，对所有被标记敌军各造成2点伤害。', { attack: 5, health: 5, tags: ['aircraft', 'vehicle'] }),
  west_006: card('west_006', '野战炮兵第6营', 'america', 'unit', 4, '远程；若位于高地后方，攻击额外+2。', { attack: 3, health: 3, keywords: ['ranged'], tags: ['artillery'] }),
  west_101: card('west_101', '低空侦察', 'america', 'command', 1, '标记一个敌方单位，然后抽1张牌。', { targetType: 'enemy-unit' }),
  west_102: card('west_102', '定点轰炸', 'america', 'command', 2, '对一个敌方单位造成2点伤害；若目标被标记，则改为4点。', { targetType: 'enemy-unit' }),
  west_103: card('west_103', '联合作战', 'america', 'command', 4, '标记至多两个敌方单位，然后抽1张牌。', { targetType: 'enemy-units' }),
  west_201: card('west_201', '空地协调站', 'america', 'support', 3, '你每回合第一次标记敌军单位时，抽1张牌。'),

  red_001: card('red_001', '第11步兵营', 'japan', 'unit', 1, '进场时，本回合不能攻击基地。', { attack: 1, health: 1, tags: ['infantry'] }),
  red_002: card('red_002', '第5突击营', 'japan', 'unit', 2, '若你本回合已先进行过一次攻击，则获得+1攻击。', { attack: 2, health: 2, tags: ['infantry'] }),
  red_003: card('red_003', '第3战车营', 'japan', 'unit', 2, '突击', { attack: 2, health: 1, keywords: ['charge'], tags: ['tank', 'vehicle'] }),
  red_004: card('red_004', '第22工兵营', 'japan', 'unit', 3, '攻击守卫单位时，本次战斗中+1攻击。', { attack: 3, health: 2, tags: ['engineer', 'infantry'] }),
  red_005: card('red_005', '第7野炮营', 'japan', 'unit', 3, '无效果', { attack: 3, health: 3, tags: ['artillery', 'vehicle'] }),
  red_006: card('red_006', '独立第1挺进营', 'japan', 'unit', 4, '若你本回合打出过指令牌，则获得突击。', { attack: 4, health: 2, tags: ['infantry'] }),
  red_101: card('red_101', '白刃突击', 'japan', 'command', 1, '一个友军本回合+1攻击；若其在前线，再额外+1。', { targetType: 'friendly-unit' }),
  red_102: card('red_102', '燃烧弹齐射', 'japan', 'command', 2, '对一个单位造成2点伤害；若目标有守卫，则改为3点。', { targetType: 'enemy-unit' }),
  red_103: card('red_103', '全速冲锋', 'japan', 'command', 3, '最多2个友方前线单位本回合+1攻击。', { targetType: 'friendly-frontline' }),
  red_201: card('red_201', '前进集结地', 'japan', 'support', 2, '你每回合打出的第一个2费以下单位费用-1。'),

  china_001: card('china_001', '第7步兵营', 'china', 'unit', 2, '游击：攻击后若存活则转入后排。', { attack: 2, health: 2, tags: ['infantry', 'guerrilla'] }),
  china_002: card('china_002', '第3守备营', 'china', 'unit', 2, '警戒', { attack: 1, health: 4, keywords: ['guard'], tags: ['infantry'] }),
  china_003: card('china_003', '第11游击营', 'china', 'unit', 2, '突击；攻击后若存活则转入后排。', { attack: 2, health: 1, keywords: ['charge'], tags: ['infantry', 'guerrilla'] }),
  china_004: card('china_004', '第5山地营', 'china', 'unit', 3, '若位于丛林线，攻击+1且额外获得1点减伤。', { attack: 2, health: 4, tags: ['infantry'] }),
  china_005: card('china_005', '第2迫击炮营', 'china', 'unit', 4, '远程', { attack: 3, health: 3, keywords: ['ranged'], tags: ['artillery'] }),
  china_006: card('china_006', '独立第2突击营', 'china', 'unit', 4, '进场时抽1张牌。', { attack: 3, health: 3, tags: ['infantry', 'guerrilla'] }),
  china_101: card('china_101', '绝地反击', 'china', 'command', 1, '一个友军本回合+1攻击；若它带游击，再抽1张牌。', { targetType: 'friendly-unit' }),
  china_102: card('china_102', '伏击火网', 'china', 'command', 2, '对一个敌方单位造成2点伤害；若它被标记或已受伤，则改为3点。', { targetType: 'enemy-unit' }),
  china_103: card('china_103', '民兵协同', 'china', 'command', 3, '至多两个友方前线单位本回合+1攻击并回复1点生命。', { targetType: 'friendly-frontline' }),
  china_201: card('china_201', '后方运输线', 'china', 'support', 2, '你的第一个游击单位获得+1生命并更容易持续骚扰。'),

  soviet_001: card('soviet_001', '第14步兵营', 'soviet', 'unit', 2, '坚守', { attack: 1, health: 4, keywords: ['guard'], tags: ['infantry'] }),
  soviet_002: card('soviet_002', '第6工兵营', 'soviet', 'unit', 2, '若位于雪地线，自己更耐打。', { attack: 1, health: 3, tags: ['engineer', 'infantry'] }),
  soviet_003: card('soviet_003', '第7卫生营', 'soviet', 'unit', 3, '回合结束时，为一个受伤友军回复1点生命。', { attack: 1, health: 3, tags: ['medic', 'infantry'] }),
  soviet_004: card('soviet_004', '独立第5坦克营', 'soviet', 'unit', 4, '装甲1', { attack: 3, health: 5, keywords: ['armor1'], tags: ['tank', 'vehicle'] }),
  soviet_005: card('soviet_005', '第7自行火炮营', 'soviet', 'unit', 4, '远程', { attack: 3, health: 3, keywords: ['ranged'], tags: ['artillery', 'vehicle'] }),
  soviet_006: card('soviet_006', '近卫第12重坦克营', 'soviet', 'unit', 6, '装甲1 + 守卫', { attack: 4, health: 7, keywords: ['armor1', 'guard'], tags: ['tank', 'vehicle'] }),
  soviet_101: card('soviet_101', '冬季反攻', 'soviet', 'command', 2, '一个友军本回合+1攻击并回复1点生命。', { targetType: 'friendly-unit' }),
  soviet_102: card('soviet_102', '喀秋莎齐射', 'soviet', 'command', 3, '对一个敌方单位造成3点伤害。', { targetType: 'enemy-unit' }),
  soviet_103: card('soviet_103', '全线动员', 'soviet', 'command', 3, '至多两个友方前线单位本回合+1攻击并获得临时防护。', { targetType: 'friendly-frontline' }),
  soviet_201: card('soviet_201', '战地政委', 'soviet', 'support', 3, '每回合开始时，为一个前线友军回复1点生命。')
};

const DECK_ENTRIES = {
  germany_armor_push: [
    ['north_001', 3], ['north_002', 2], ['north_003', 2], ['north_004', 2], ['north_005', 2], ['north_006', 2],
    ['north_101', 3], ['north_102', 2], ['north_103', 1], ['north_201', 1]
  ],
  america_air_control: [
    ['west_001', 3], ['west_002', 2], ['west_003', 2], ['west_004', 2], ['west_005', 1], ['west_006', 2],
    ['west_101', 3], ['west_102', 3], ['west_103', 1], ['west_201', 1]
  ],
  japan_banzai_charge: [
    ['red_001', 3], ['red_002', 3], ['red_003', 2], ['red_004', 2], ['red_005', 2], ['red_006', 2],
    ['red_101', 2], ['red_102', 2], ['red_103', 1], ['red_201', 1]
  ],
  china_guerrilla_screen: [
    ['china_001', 3], ['china_002', 2], ['china_003', 2], ['china_004', 2], ['china_005', 2], ['china_006', 2],
    ['china_101', 2], ['china_102', 2], ['china_103', 1], ['china_201', 1]
  ],
  soviet_iron_front: [
    ['soviet_001', 3], ['soviet_002', 2], ['soviet_003', 2], ['soviet_004', 2], ['soviet_005', 2], ['soviet_006', 2],
    ['soviet_101', 2], ['soviet_102', 2], ['soviet_103', 1], ['soviet_201', 1]
  ]
};

const app = document.getElementById('app');
const modalRoot = document.getElementById('modal-root');

const ui = {
  screen: 'home',
  p1DeckId: null,
  p2DeckId: null,
  gameMode: 'pvp',
  aiDifficulty: 'normal',
  intelAdminUnlocked: false,
  intelAdminMessage: '',
  intelAdminReply: '我是资料库管理员。你可以先问我平衡、风格、阵营定位这些问题；输入密码后我再开放设计模式。',
  intelDraftCard: null,
  intelDraftTemplateHits: [],
  intelDraftWarnings: [],
  intelDraftScores: null,
  selectedCardId: null,
  selectedUnitId: null,
  actionMode: null,
  message: '轮到你行动',
  turnSwitchVisible: false,
  targetHint: '',
  rewardModal: null
};

const state = {
  game: null,
  nextUnitId: 1,
  aiEnabled: false,
  aiPlayerId: 'p2',
  aiTimer: null,
  aiDifficulty: 'normal',
  lastUrl: '',
  renderQueued: false,
  screenCache: new Map(),
  lastRenderSignature: ''
};

const PROGRESSION_STORAGE_KEY = 'kards-lite.progression';
const GAME_MISSIONS = [
  { id: 'win_once', label: '拿下一场胜利', description: '赢下任意一场对战。' },
  { id: 'ai_hunter', label: '击败 AI', description: '在 AI 对战中获胜 3 次。' },
  { id: 'deck_commander', label: '多阵营指挥官', description: '用不同阵营赢下 3 场。' }
];
const STARTER_DECK_IDS = ['germany_armor_push', 'japan_banzai_charge', 'soviet_iron_front', 'america_air_control', 'china_guerrilla_screen'];
const STARTER_MISSIONS = [
  {
    id: 'finish_training',
    label: '完成新手训练',
    description: '打完教学局，或在训练页确认自己已经学完基础操作。',
    target: 1,
    getProgress: (progression) => (progression.tutorialCompleted ? 1 : 0),
    reward: { deckId: 'germany_armor_push', supplyTickets: 2, packs: 1 },
    rewardLabel: '解锁德国新手赠送卡组 + 补给券 x2 + 基础卡包 x1'
  },
  {
    id: 'first_win',
    label: '拿下第一场胜利',
    description: '赢下任意一场对战，先体验一次真正的胜利反馈。',
    target: 1,
    getProgress: (progression) => Math.min(1, progression.totalWins),
    reward: { deckId: 'japan_banzai_charge', supplyTickets: 2 },
    rewardLabel: '解锁日本新手赠送卡组 + 补给券 x2'
  },
  {
    id: 'battle_rookie',
    label: '完成 3 场对战',
    description: '别只打一把，先把手感打热。',
    target: 3,
    getProgress: (progression) => Math.min(3, progression.totalGames),
    reward: { deckId: 'soviet_iron_front', supplyTickets: 2, packs: 1 },
    rewardLabel: '解锁苏联新手赠送卡组 + 补给券 x2 + 基础卡包 x1'
  },
  {
    id: 'two_factions',
    label: '用 2 个阵营赢过',
    description: '换阵营试试，别让新手期只会一套打法。',
    target: 2,
    getProgress: (progression) => Math.min(2, Object.values(progression.winsByFaction || {}).filter((count) => count > 0).length),
    reward: { deckId: 'america_air_control', supplyTickets: 3 },
    rewardLabel: '解锁美国新手赠送卡组 + 补给券 x3'
  },
  {
    id: 'ai_hunter_plus',
    label: '击败 AI 3 次',
    description: '把基础操作打熟后，再去学更细的节奏和换线。',
    target: 3,
    getProgress: (progression) => Math.min(3, progression.pveWins),
    reward: { deckId: 'china_guerrilla_screen', supplyTickets: 3, packs: 1 },
    rewardLabel: '解锁中国新手赠送卡组 + 补给券 x3 + 基础卡包 x1'
  }
];

const BASIC_PACK_COST = 2;
const PACK_CARD_LIBRARY = {
  pack_germany_recon: {
    id: 'pack_germany_recon',
    faction: '德国',
    type: '单位',
    rarity: '补给增援',
    cost: 2,
    name: '第21侦察先遣营',
    stats: '2 / 2',
    keywords: ['协作'],
    effect: '进场时，若相邻战线已有友军，抽1张牌。',
    batch: '基础卡包',
    badge: '🎁'
  },
  pack_america_supply: {
    id: 'pack_america_supply',
    faction: '美国',
    type: '单位',
    rarity: '补给增援',
    cost: 3,
    name: '第22补给联络营',
    stats: '2 / 4',
    keywords: ['支援'],
    effect: '进场时，治疗一个友军2点生命。',
    batch: '基础卡包',
    badge: '🎁'
  },
  pack_japan_raider: {
    id: 'pack_japan_raider',
    faction: '日本',
    type: '单位',
    rarity: '补给增援',
    cost: 2,
    name: '第9突击先遣队',
    stats: '3 / 2',
    keywords: ['突击'],
    effect: '被消灭时，抽1张牌。',
    batch: '基础卡包',
    badge: '🎁'
  },
  pack_china_militia: {
    id: 'pack_china_militia',
    faction: '中国',
    type: '单位',
    rarity: '补给增援',
    cost: 3,
    name: '独立第6民兵营',
    stats: '2 / 3',
    keywords: ['游击'],
    effect: '进场时，召唤一个 1/1 士兵单位。',
    batch: '基础卡包',
    badge: '🎁'
  },
  pack_soviet_reserve: {
    id: 'pack_soviet_reserve',
    faction: '苏联',
    type: '单位',
    rarity: '补给增援',
    cost: 3,
    name: '近卫后备营',
    stats: '2 / 5',
    keywords: ['坚守'],
    effect: '回合结束时，为一个受伤友军回复1点生命。',
    batch: '基础卡包',
    badge: '🎁'
  }
};
const PACK_CARD_IDS = Object.keys(PACK_CARD_LIBRARY);

const DEFAULT_SHARE_SETUP = {
  mode: 'pve',
  p1DeckId: 'germany_armor_push',
  p2DeckId: 'japan_banzai_charge'
};

function createDefaultProgression() {
  return {
    totalGames: 0,
    totalWins: 0,
    pveWins: 0,
    pvpGames: 0,
    favoriteDeckId: null,
    deckUsage: {},
    winsByFaction: {},
    lastResult: null,
    tutorialCompleted: false,
    unlockedDecks: [],
    starterRewardsClaimed: {},
    supplyTickets: 0,
    packs: 0
  };
}

function normalizeProgression(progression, rawExists = false) {
  const next = { ...createDefaultProgression(), ...progression };
  if (!Array.isArray(next.unlockedDecks)) {
    // Preserve access for old saves that predate the starter progression system.
    next.unlockedDecks = rawExists ? [...STARTER_DECK_IDS] : [];
  }
  next.unlockedDecks = [...new Set(next.unlockedDecks.filter((deckId) => DECKS[deckId]))];
  if (!next.starterRewardsClaimed || typeof next.starterRewardsClaimed !== 'object') next.starterRewardsClaimed = {};
  next.supplyTickets = Number(next.supplyTickets) || 0;
  next.packs = Number(next.packs) || 0;
  next.tutorialCompleted = Boolean(next.tutorialCompleted);
  return next;
}

function loadProgression() {
  if (typeof window === 'undefined' || !window.localStorage) return createDefaultProgression();
  try {
    const raw = window.localStorage.getItem(PROGRESSION_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return normalizeProgression(parsed, Boolean(raw));
  } catch {
    return createDefaultProgression();
  }
}

function saveProgression(progression) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  window.localStorage.setItem(PROGRESSION_STORAGE_KEY, JSON.stringify(progression));
}

function getMissionProgress(progression) {
  const factionWins = Object.values(progression.winsByFaction || {}).filter((count) => count > 0).length;
  return {
    win_once: Math.min(1, progression.totalWins),
    ai_hunter: Math.min(3, progression.pveWins),
    deck_commander: Math.min(3, factionWins)
  };
}

function getUnlockedDecks(progression) {
  return progression.unlockedDecks.filter((deckId) => DECKS[deckId]);
}

function getStarterMissionState(progression) {
  return STARTER_MISSIONS.map((mission) => {
    const current = Math.min(mission.target, mission.getProgress(progression));
    const claimed = Boolean(progression.starterRewardsClaimed?.[mission.id]);
    return {
      ...mission,
      current,
      done: current >= mission.target,
      claimed,
      claimable: current >= mission.target && !claimed
    };
  });
}

function getStarterMissionForDeck(deckId) {
  return STARTER_MISSIONS.find((mission) => mission.reward.deckId === deckId) || null;
}

function getStarterProgressSummary(starterMissions) {
  const completedCount = starterMissions.filter((mission) => mission.claimed).length;
  const activeMission = starterMissions.find((mission) => !mission.claimed) || null;
  const totalSteps = starterMissions.length;
  const progressPercent = totalSteps ? Math.round((completedCount / totalSteps) * 100) : 0;
  return { completedCount, activeMission, totalSteps, progressPercent };
}

function renderStarterMissionCard(mission, options = {}) {
  const compact = options.compact ? ' compact' : '';
  const emphasized = options.emphasized ? ' emphasized' : '';
  const nextStepCopy = mission.claimed
    ? '这一阶段奖励已入库。'
    : mission.claimable
      ? '条件已满足，现在就能领奖。'
      : `还差 ${Math.max(0, mission.target - mission.current)} 步即可解锁。`;
  return `
    <article class="mission-item starter-stage ${mission.done ? 'done' : ''}${compact}${emphasized}">
      <div>
        <div class="mission-stage-top">
          <span class="state-chip">阶段 ${STARTER_MISSIONS.findIndex((item) => item.id === mission.id) + 1}</span>
          <strong>${mission.label}</strong>
        </div>
        <p>${mission.description}</p>
        <div class="mission-progress-bar"><span style="width:${(mission.current / mission.target) * 100}%"></span></div>
        <p class="mission-reward-text">奖励：${mission.rewardLabel}</p>
        <p class="mission-next-copy">${nextStepCopy}</p>
      </div>
      <div class="starter-mission-side">
        <span class="mission-progress-number">${mission.current}/${mission.target}</span>
        ${mission.claimable ? `<button class="btn btn-accent" data-action="claim-starter-reward" data-mission-id="${mission.id}">领取奖励</button>` : `<span class="state-chip">${mission.claimed ? '已领取' : mission.done ? '待领取' : '进行中'}</span>`}
      </div>
    </article>
  `;
}

function grantStarterMissionReward(progression, missionId) {
  const mission = STARTER_MISSIONS.find((item) => item.id === missionId);
  if (!mission) return { progression, rewardText: '' };
  const next = normalizeProgression(progression);
  if (next.starterRewardsClaimed[missionId]) return { progression: next, rewardText: '' };
  next.starterRewardsClaimed[missionId] = true;
  if (mission.reward.deckId && !next.unlockedDecks.includes(mission.reward.deckId)) next.unlockedDecks.push(mission.reward.deckId);
  next.supplyTickets += mission.reward.supplyTickets || 0;
  next.packs += mission.reward.packs || 0;
  return { progression: next, rewardText: mission.rewardLabel };
}

function getProgressionSummary() {
  const progression = loadProgression();
  const missionProgress = getMissionProgress(progression);
  const starterMissions = getStarterMissionState(progression);
  const favoriteDeckId = Object.entries(progression.deckUsage || {}).sort((a, b) => b[1] - a[1])[0]?.[0] || progression.favoriteDeckId;
  return {
    progression,
    missionProgress,
    starterMissions,
    unlockedDecks: getUnlockedDecks(progression),
    favoriteDeck: favoriteDeckId ? getDeckById(favoriteDeckId) : null,
    winRate: progression.totalGames ? Math.round((progression.totalWins / progression.totalGames) * 100) : 0
  };
}

function recordGameResult(game) {
  if (!game || game.resultRecorded || !game.winnerId) return;
  const progression = loadProgression();
  progression.totalGames += 1;
  if (game.tutorial?.enabled) progression.tutorialCompleted = true;
  progression.deckUsage[game.players.p1.deckId] = (progression.deckUsage[game.players.p1.deckId] || 0) + 1;
  progression.favoriteDeckId = Object.entries(progression.deckUsage).sort((a, b) => b[1] - a[1])[0]?.[0] || game.players.p1.deckId;
  if (ui.gameMode === 'pvp') progression.pvpGames += 1;

  if (game.winnerId === 'p1') {
    progression.totalWins += 1;
    if (ui.gameMode === 'pve') progression.pveWins += 1;
    const faction = game.players.p1.deck.faction;
    progression.winsByFaction[faction] = (progression.winsByFaction[faction] || 0) + 1;
  }

  progression.lastResult = {
    winnerId: game.winnerId,
    reason: game.winnerReason,
    mode: ui.gameMode,
    deckId: game.players.p1.deckId,
    enemyDeckId: game.players.p2.deckId,
    turn: game.turn
  };

  game.resultRecorded = true;
  saveProgression(progression);
}

const QUICK_MATCHES = [
  {
    id: 'starter',
    label: '新手开局',
    description: '德国装甲推进 vs 日本决死突击，最适合第一次上手。',
    mode: 'pve',
    p1DeckId: 'germany_armor_push',
    p2DeckId: 'japan_banzai_charge'
  },
  {
    id: 'airstrike',
    label: '空袭压制局',
    description: '美国空地联动 vs 苏联钢铁防线，偏控制与中后期运营。',
    mode: 'pve',
    p1DeckId: 'america_air_control',
    p2DeckId: 'soviet_iron_front'
  },
  {
    id: 'guerrilla',
    label: '敌后穿插局',
    description: '中国敌后游击 vs 日本决死突击，节奏快，适合反复重开。',
    mode: 'pve',
    p1DeckId: 'china_guerrilla_screen',
    p2DeckId: 'japan_banzai_charge'
  },
  {
    id: 'ironwall',
    label: '钢铁推进局',
    description: '苏联钢铁防线 vs 德国装甲推进，适合体验重装与前线拉扯。',
    mode: 'pve',
    p1DeckId: 'soviet_iron_front',
    p2DeckId: 'germany_armor_push'
  },
  {
    id: 'mirror',
    label: '双人线下对打',
    description: '中国敌后游击 vs 德国装甲推进，适合同桌直接开打。',
    mode: 'pvp',
    p1DeckId: 'china_guerrilla_screen',
    p2DeckId: 'germany_armor_push'
  }
];

const DECK_TACTICS = {
  germany: {
    opening: '前两回合先把步兵和装甲侦察营铺上去，给后续协作留位置。',
    midgame: '装甲营上场后，用协作和炮火命令打掉对面守卫，抢前线。',
    closer: '前线站住两格以上时，尽快压基地，不要把火力浪费在后排。'
  },
  america: {
    opening: '先标记关键目标，再出侦察和支援，别急着一股脑下大牌。',
    midgame: '中盘靠定点轰炸和联合作战解掉高价值单位，慢慢换资源。',
    closer: '对面前线薄了就让飞机连打，把标记单位优先清掉。'
  },
  japan: {
    opening: '先手尽量连续出低费单位，能抢血就抢血。',
    midgame: '靠突击和前线集结地持续施压，不给对面舒服运营。',
    closer: '一旦看见斩杀线，直接开总攻，别拖到后期。'
  },
  china: {
    opening: '优先上游击和守备单位，把对面节奏拖慢。',
    midgame: '利用撤回后排和伏击火网做换血，尽量让对面一直亏。',
    closer: '保持至少一条安全战线，把游击单位反复打出去收尾。'
  },
  soviet: {
    opening: '先把前线站稳，别急着交换高血量单位。',
    midgame: '用重坦和治疗慢慢顶住，再靠反攻指令把战线推回去。',
    closer: '当你前线开始比对面厚时，顺势压基地，不要只顾解场。'
  }
};

const BATTLE_TIPS = [
  '看不懂局面时，先把能量花在站场单位上，再考虑指令。',
  '前线为空的一方，最怕被直接打基地，所以守线比贪伤害更重要。',
  '支援牌虽然不立刻打伤害，但通常能让你后面两三个回合都更舒服。',
  '对面有守卫时别乱点后排，先拆守卫才能打开战线。',
  '如果你手里有解场指令，尽量留给对面高价值单位，不要见怪就交。'
];

const AI_DIFFICULTIES = {
  normal: { id: 'normal', name: '普通', note: '会做基础判断，适合第一次试玩。', bonusTier: 0 },
  hard: { id: 'hard', name: '困难', note: '更会守线、换血和利用指令。', bonusTier: 1 },
  veteran: { id: 'veteran', name: '老兵', note: '更会抓斩杀线，也更少送交换。', bonusTier: 2 }
};

const AI_FACTION_PROFILES = {
  germany: { deployFrontlineBias: 2, commandBias: 1, guardBias: 1, faceBias: 1, supportBias: 0, preserveBias: 1 },
  america: { deployFrontlineBias: -1, commandBias: 4, guardBias: 1, faceBias: 0, supportBias: 2, preserveBias: 2 },
  japan: { deployFrontlineBias: 3, commandBias: 0, guardBias: -1, faceBias: 4, supportBias: -1, preserveBias: -1 },
  china: { deployFrontlineBias: 0, commandBias: 2, guardBias: 2, faceBias: 0, supportBias: 1, preserveBias: 3 },
  soviet: { deployFrontlineBias: 3, commandBias: 1, guardBias: 4, faceBias: -1, supportBias: 0, preserveBias: 3 }
};

initializeIntelAdminState();
applyUrlState();
refreshSiteCardLibrary();
render();

function card(id, name, faction, type, cost, effectText, extras = {}) {
  return { id, name, faction, type, cost, effectText, attack: null, health: null, keywords: [], tags: [], targetType: 'none', ...extras };
}

function initializeIntelAdminState() {
  if (typeof window === 'undefined' || !window.localStorage) return;
  ui.intelAdminUnlocked = window.localStorage.getItem(INTEL_STORAGE_KEYS.adminUnlocked) === '1';
}

function isValidDeckId(deckId) {
  return Boolean(deckId && DECKS[deckId]);
}

function applyUrlState() {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  const screen = params.get('screen');
  const mode = params.get('mode');
  const p1DeckId = params.get('p1');
  const p2DeckId = params.get('p2');
  const difficulty = params.get('difficulty');
  const autostart = params.get('autostart') === '1';

  if (screen && ['home', 'training', 'decks', 'intel', 'battle'].includes(screen)) ui.screen = screen;
  if (mode && ['pvp', 'pve'].includes(mode)) ui.gameMode = mode;
  if (difficulty && AI_DIFFICULTIES[difficulty]) ui.aiDifficulty = difficulty;
  if (isValidDeckId(p1DeckId)) ui.p1DeckId = p1DeckId;
  if (isValidDeckId(p2DeckId)) ui.p2DeckId = p2DeckId;

  if (autostart) {
    ui.gameMode = mode === 'pvp' ? 'pvp' : DEFAULT_SHARE_SETUP.mode;
    ui.p1DeckId = isValidDeckId(p1DeckId) ? p1DeckId : DEFAULT_SHARE_SETUP.p1DeckId;
    ui.p2DeckId = isValidDeckId(p2DeckId) ? p2DeckId : DEFAULT_SHARE_SETUP.p2DeckId;
    state.game = createGame(ui.p1DeckId, ui.p2DeckId);
    ui.screen = 'battle';
  }
}

function buildShareUrl(options = {}) {
  if (typeof window === 'undefined') return '';

  const params = new URLSearchParams();
  const mode = options.mode || ui.gameMode || DEFAULT_SHARE_SETUP.mode;
  const p1DeckId = options.p1DeckId || ui.p1DeckId || DEFAULT_SHARE_SETUP.p1DeckId;
  const p2DeckId = options.p2DeckId || ui.p2DeckId || DEFAULT_SHARE_SETUP.p2DeckId;
  const screen = options.screen || (options.autostart ? 'battle' : ui.screen);

  params.set('screen', screen);
  params.set('mode', mode);
  if (mode === 'pve') params.set('difficulty', options.aiDifficulty || ui.aiDifficulty || 'normal');
  if (isValidDeckId(p1DeckId)) params.set('p1', p1DeckId);
  if (isValidDeckId(p2DeckId)) params.set('p2', p2DeckId);
  if (options.autostart) params.set('autostart', '1');

  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

function syncUrlState() {
  if (typeof window === 'undefined' || !window.history?.replaceState) return;
  const autostart = ui.screen === 'battle';
  const nextUrl = buildShareUrl({ autostart, screen: ui.screen });
  if (!nextUrl || nextUrl === state.lastUrl) return;
  state.lastUrl = nextUrl;
  window.history.replaceState({}, '', nextUrl);
}

function copyQuickStartLink(config = {}) {
  const shareUrl = buildShareUrl({
    mode: config.mode || ui.gameMode || DEFAULT_SHARE_SETUP.mode,
    p1DeckId: config.p1DeckId || ui.p1DeckId || DEFAULT_SHARE_SETUP.p1DeckId,
    p2DeckId: config.p2DeckId || ui.p2DeckId || DEFAULT_SHARE_SETUP.p2DeckId,
    screen: 'battle',
    autostart: true
  });

  const onSuccess = () => {
    ui.message = '试玩链接已复制，发给同学即可直接进入 AI 对战。';
    render();
  };

  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(shareUrl).then(onSuccess).catch(() => {
      window.prompt('复制这个试玩链接', shareUrl);
    });
    return;
  }

  window.prompt('复制这个试玩链接', shareUrl);
}

function getDeckById(deckId) {
  return DECKS[deckId];
}

function getCardById(cardId) {
  return CARD_LIBRARY[cardId] || buildCustomCardLibrary()[cardId];
}

function getCustomCardsForDeck(deckId) {
  const deck = getDeckById(deckId);
  const customCards = loadCustomSiteCards().filter((cardInfo) => getCustomFactionKey(cardInfo.faction) === deck.faction);
  return customCards.map((cardInfo, index) => getCustomCardId(cardInfo, index));
}

function expandDeck(deckId) {
  const entries = DECK_ENTRIES[deckId];
  const result = [];
  for (const [cardId, count] of entries) {
    for (let i = 0; i < count; i += 1) result.push(cardId);
  }

  // Admin-designed cards become faction reinforcements so they are immediately playable.
  getCustomCardsForDeck(deckId).forEach((cardId) => result.push(cardId));
  return result;
}

function createPlayer(id, deckId, name, hasBonusEnergy) {
  return {
    id,
    name,
    deckId,
    deck: getDeckById(deckId),
    baseHealth: 20,
    maxEnergy: 0,
    currentEnergy: 0,
    drawPile: shuffle(expandDeck(deckId)),
    hand: [],
    discardPile: [],
    frontline: Array.from({ length: BOARD_SLOT_COUNT }, () => null),
    backline: Array.from({ length: BOARD_SLOT_COUNT }, () => null),
    supports: [],
    hasBonusEnergy,
    usedBonusEnergy: false,
    bonusEnergyThisTurn: 0,
    commandPlayedThisTurn: false,
    hasAttackedThisTurn: false,
    markDrawUsed: false,
    factionPowerUsed: false,
    commandDiscount: 0
  };
}

function getTerrainIndexBySlot(slotIndex) {
  return Math.max(0, Math.floor(slotIndex / BOARD_COLUMNS_PER_TERRAIN));
}

function getTerrainSlotIndexes(slotIndex) {
  const terrainIndex = getTerrainIndexBySlot(slotIndex);
  const start = terrainIndex * BOARD_COLUMNS_PER_TERRAIN;
  return Array.from({ length: BOARD_COLUMNS_PER_TERRAIN }, (_, offset) => start + offset);
}

function getTerrainBySlot(slotIndex) {
  return TERRAIN_LINES[getTerrainIndexBySlot(slotIndex)] || TERRAIN_LINES[0];
}

function getTerrainByUnit(unit) {
  return unit ? getTerrainBySlot(unit.slotIndex) : null;
}

function isUnitOnTerrain(unit, terrainId) {
  return getTerrainByUnit(unit)?.id === terrainId;
}

function getLaneNameByUnit(unit) {
  return unit?.lane === 'front' ? 'frontline' : 'backline';
}

function getUnitsInTerrain(player, laneName, slotIndex) {
  return getTerrainSlotIndexes(slotIndex)
    .map((index) => player[laneName][index])
    .filter(Boolean);
}

function hasTerrainWingman(game, unit) {
  if (!game || !unit) return false;
  const owner = game.players[unit.ownerId];
  if (!owner) return false;
  return getUnitsInTerrain(owner, getLaneNameByUnit(unit), unit.slotIndex).some((candidate) => candidate.instanceId !== unit.instanceId);
}

function getTerrainAttackBonus(unit) {
  const terrain = getTerrainByUnit(unit);
  if (!terrain || !unit) return 0;
  if (unit.lane === 'front') return terrain.attackBonusFrontline || 0;
  if (unit.lane === 'back') return terrain.attackBonusBackline || 0;
  return 0;
}

function getTerrainDamageReduction(unit, game) {
  const terrain = getTerrainByUnit(unit);
  if (!terrain || !unit) return 0;
  let reduction = terrain.damageReduction || 0;
  if (terrain.frontlineOnlyDamageReduction && unit.lane === 'front') reduction += terrain.frontlineOnlyDamageReduction;
  if (terrain.pairDamageReduction && hasTerrainWingman(game, unit)) reduction += terrain.pairDamageReduction;
  return reduction;
}

function getTerrainRuleHint(terrain, laneName) {
  if (terrain.id === 'city' && laneName === 'frontline') return `${terrain.shortName}·${terrain.keyword} 前线+1攻`;
  if (terrain.id === 'highland' && laneName === 'backline') return `${terrain.shortName}·${terrain.keyword} 后方+1攻`;
  if (terrain.id === 'snow' && laneName === 'frontline') return `${terrain.shortName}·${terrain.keyword} 前线-1伤`;
  if (terrain.id === 'jungle') return `${terrain.shortName}·${terrain.keyword} 结对-1伤`;
  return `${terrain.shortName}·${terrain.keyword}`;
}

function getTerrainHintText(slotIndex, laneName) {
  return getTerrainRuleHint(getTerrainBySlot(slotIndex), laneName);
}

function getTerrainPreferenceScore(card, laneName, slotIndex, ownerFaction) {
  const terrainId = getTerrainBySlot(slotIndex).id;
  let score = 0;
  const frontline = laneName === 'frontline';
  const backline = laneName === 'backline';

  if (terrainId === 'city') {
    if (frontline && (hasTag(card, 'tank') || hasTag(card, 'vehicle') || card.keywords.includes('charge'))) score += 5;
    if (card.id === 'north_003' || card.id === 'north_101') score += 4;
  }
  if (terrainId === 'jungle') {
    if (hasTag(card, 'guerrilla')) score += 5;
    if (hasTag(card, 'infantry') || hasTag(card, 'engineer')) score += 2;
    if (card.id === 'china_004') score += 4;
  }
  if (terrainId === 'highland') {
    if (backline && (card.keywords.includes('ranged') || hasTag(card, 'artillery'))) score += 6;
    if (card.id === 'west_006') score += 5;
  }
  if (terrainId === 'snow') {
    if (frontline && (card.keywords.includes('guard') || hasTag(card, 'tank') || hasTag(card, 'engineer'))) score += 7;
    if (card.id === 'soviet_002' || card.id === 'soviet_101' || card.id === 'soviet_006') score += 4;
  }

  if (ownerFaction === 'china' && terrainId === 'jungle') score += 1;
  if (ownerFaction === 'soviet' && terrainId === 'snow') score += 2;

  return score;
}

function createGame(p1DeckId, p2DeckId) {
  state.nextUnitId = 1;
  state.aiEnabled = ui.gameMode === 'pve';
  state.aiPlayerId = 'p2';
  state.aiDifficulty = ui.aiDifficulty;
  if (state.aiTimer) {
    clearTimeout(state.aiTimer);
    state.aiTimer = null;
  }

  const isTrainingMatch = p1DeckId === 'germany_armor_push' && p2DeckId === 'japan_banzai_charge' && ui.screen === 'training';
  const tutorialObjectives = [
    { id: 'deploy', label: '部署 1 个单位' },
    { id: 'attack', label: '完成 1 次攻击' },
    { id: 'end_turn', label: '结束 1 个回合' }
  ];
  const game = {
    turn: 1,
    phase: 'main',
    activePlayerId: 'p1',
    winnerId: null,
    winnerReason: null,
    logs: [],
    tutorial: isTrainingMatch ? {
      enabled: true,
      queue: [
        '先做第一步：看手牌费用，优先把能下的单位部署到前线。',
        '守住前线很重要。敌方前线没清空之前，不能直接打基地。',
        '如果看到解场指令，先留给高威胁目标，不要随便交。'
      ],
      seen: {},
      feedback: '',
      feedbackTone: 'info',
      objectives: tutorialObjectives.map((item) => ({ ...item, done: false }))
    } : null,
    aiMemory: {
      playerAggro: 0,
      playerCommandTurns: 0,
      playerFrontlineTurns: 0,
      playerBaseDamage: 0,
      lastPlayerTurnSeen: 0
    },
    players: {
      p1: createPlayer('p1', p1DeckId, '玩家1', false),
      p2: createPlayer('p2', p2DeckId, state.aiEnabled ? '斯木的1939' : '玩家2', true)
    },
    terrainLines: TERRAIN_LINES.map((item) => ({ ...item }))
  };

  drawCards(game, 'p1', 4);
  drawCards(game, 'p2', 4);
  drawCards(game, 'p2', 1);

  game.players.p1.maxEnergy = 1;
  game.players.p1.currentEnergy = 1;

  addLog(game, `对局开始：${game.players.p1.deck.name} 对阵 ${game.players.p2.deck.name}`);
  addLog(game, `四地形双列战线已生效：丛林·野战、城市·巷战、雪地·雪战、高地·山地。每条地形各有两个槽位，可分路突破基地。`);
  addLog(game, '玩家1先手');
  if (game.tutorial?.enabled) {
    ui.message = '教学提示：先部署一个能下的前线单位';
    ui.targetHint = game.tutorial.queue[0];
  }
  return game;
}

function shuffle(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function drawCards(game, playerId, count) {
  const player = game.players[playerId];
  for (let i = 0; i < count; i += 1) {
    if (!player.drawPile.length) {
      finishGame(game, getOpponentId(playerId), '牌库耗尽');
      return;
    }
    player.hand.push(player.drawPile.shift());
  }
}

function addLog(game, text, type = 'system') {
  game.logs.push({ id: `${Date.now()}-${Math.random()}`, text, type });
}

function setTutorialFeedback(game, text, tone = 'info') {
  if (!game?.tutorial?.enabled) return;
  game.tutorial.feedback = text;
  game.tutorial.feedbackTone = tone;
}

function markTutorialObjective(game, objectiveId) {
  if (!game?.tutorial?.enabled) return false;
  const objective = game.tutorial.objectives?.find((item) => item.id === objectiveId);
  if (!objective || objective.done) return false;
  objective.done = true;
  const labels = {
    deploy: '已学会部署单位',
    attack: '已学会发起攻击',
    end_turn: '已学会结束回合'
  };
  setTutorialFeedback(game, labels[objectiveId] || '已完成教学步骤', 'success');
  return true;
}

function syncTutorialCompletion(game) {
  if (!game?.tutorial?.enabled) return;
  if (game.tutorial.seen.tutorial_complete) return;
  if (game.tutorial.objectives?.length && game.tutorial.objectives.every((item) => item.done)) {
    updateTutorialHint(game, 'tutorial_complete');
  }
}

function updateTutorialHint(game, trigger) {
  if (!game?.tutorial?.enabled) return;
  const tutorial = game.tutorial;
  if (trigger === 'unit_played' && !tutorial.seen.unit_played) {
    tutorial.seen.unit_played = true;
    markTutorialObjective(game, 'deploy');
    ui.message = '教学提示：很好，已经完成部署';
    ui.targetHint = '下一步注意守线。如果你前线空了，对面就能直接打基地。';
    syncTutorialCompletion(game);
    return;
  }
  if (trigger === 'first_attack' && !tutorial.seen.first_attack) {
    tutorial.seen.first_attack = true;
    markTutorialObjective(game, 'attack');
    ui.message = '教学提示：你已经完成第一次攻击';
    ui.targetHint = '看一下交换结果，再决定是继续铺场还是留指令解场。';
    syncTutorialCompletion(game);
    return;
  }
  if (trigger === 'enemy_frontline_blocked' && !tutorial.seen.enemy_frontline_blocked) {
    tutorial.seen.enemy_frontline_blocked = true;
    ui.message = '教学提示：敌方前线还在，先别急着点基地';
    ui.targetHint = '先清敌方前线，打开战线后才能直接压基地。';
    return;
  }
  if (trigger === 'end_turn' && !tutorial.seen.end_turn) {
    tutorial.seen.end_turn = true;
    markTutorialObjective(game, 'end_turn');
    ui.message = '教学提示：回合结束后会补能量并抽牌';
    ui.targetHint = '看清楚对面的落子，再想自己下一回合要抢前线还是解场。';
    syncTutorialCompletion(game);
    return;
  }
  if (trigger === 'tutorial_complete' && !tutorial.seen.tutorial_complete) {
    tutorial.seen.tutorial_complete = true;
    setTutorialFeedback(game, '新手训练核心步骤已全部完成', 'success');
    ui.message = '教学提示：这局新手训练的核心步骤你已经都走完了';
    ui.targetHint = '接下来就按你的理解继续打完这局，或者回训练页换一把推荐战局。';
  }
}

function finishGame(game, winnerId, reason) {
  if (game.winnerId) return;
  syncTutorialCompletion(game);
  game.winnerId = winnerId;
  game.winnerReason = reason;
  addLog(game, `${game.players[winnerId].name} 获胜：${reason}`);
  recordGameResult(game);
}

function getActivePlayer(game) {
  return game.players[game.activePlayerId];
}

function getOpponentId(playerId) {
  return playerId === 'p1' ? 'p2' : 'p1';
}

function getOpponentPlayer(game) {
  return game.players[getOpponentId(game.activePlayerId)];
}

function isAiTurn() {
  return Boolean(state.aiEnabled && state.game && !state.game.winnerId && state.game.activePlayerId === state.aiPlayerId);
}

function scheduleAiTurn(delay = 700) {
  if (!isAiTurn()) return;
  if (state.aiTimer) clearTimeout(state.aiTimer);
  state.aiTimer = setTimeout(() => {
    state.aiTimer = null;
    runAiTurn();
  }, delay);
}

function findUnit(game, instanceId) {
  for (const player of Object.values(game.players)) {
    for (const laneName of ['frontline', 'backline']) {
      for (let i = 0; i < player[laneName].length; i += 1) {
        const unit = player[laneName][i];
        if (unit && unit.instanceId === instanceId) {
          return { unit, player, laneName, index: i };
        }
      }
    }
  }
  return null;
}

function countUnits(player, laneName) {
  return player[laneName].filter(Boolean).length;
}

function countOpenTerrainLanes(player) {
  return TERRAIN_LINES.filter((_, terrainIndex) => {
    const start = terrainIndex * BOARD_COLUMNS_PER_TERRAIN;
    return player.frontline.slice(start, start + BOARD_COLUMNS_PER_TERRAIN).every((slot) => !slot);
  }).length;
}

function hasKeyword(unit, keyword) {
  return unit.keywords.includes(keyword);
}

function hasTag(unit, tag) {
  return unit.tags.includes(tag);
}

function isArmorUnit(unit) {
  return hasTag(unit, 'tank') || hasTag(unit, 'vehicle');
}

function createUnitInstance(card, ownerId, lane, slotIndex, game) {
  return {
    instanceId: `u${game.turn}-${state.nextUnitId++}`,
    cardId: card.id,
    ownerId,
    name: card.name,
    lane,
    slotIndex,
    baseAttack: card.attack,
    baseHealth: card.health,
    currentHealth: card.health,
    keywords: [...(card.keywords || [])],
    tags: [...(card.tags || [])],
    canAttack: card.keywords.includes('charge'),
    hasAttacked: false,
    justPlayed: true,
    tempAttackBonus: 0,
    tempDamageReduction: 0,
    marked: false,
    customEffect: card.customEffect || '',
    customTemplate: card.customTemplate || null
  };
}

function getUnitAttack(unit, game) {
  let value = unit.baseAttack + (unit.tempAttackBonus || 0);
  const owner = game.players[unit.ownerId];
  value += getTerrainAttackBonus(unit);
  if (unit.cardId === 'red_002' && owner.hasAttackedThisTurn) value += 1;
  if (unit.cardId === 'north_003' && isUnitOnTerrain(unit, 'city')) value += 1;
  if (unit.cardId === 'west_006' && unit.lane === 'back' && isUnitOnTerrain(unit, 'highland')) value += 2;
  if (unit.cardId === 'china_004' && isUnitOnTerrain(unit, 'jungle')) value += 1;
  return value;
}

function applyDamage(unit, amount, game) {
  let damage = amount;
  if (hasKeyword(unit, 'armor1')) damage = Math.max(0, damage - 1);
  damage = Math.max(0, damage - getTerrainDamageReduction(unit, game));
  if (unit.cardId === 'china_004' && isUnitOnTerrain(unit, 'jungle')) damage = Math.max(0, damage - 1);
  if (unit.cardId === 'soviet_002' && isUnitOnTerrain(unit, 'snow')) damage = Math.max(0, damage - 1);
  if (unit.tempDamageReduction) damage = Math.max(0, damage - unit.tempDamageReduction);
  unit.currentHealth -= damage;
  return damage;
}

function getProjectedDamage(game, attacker, defender) {
  if (!game || !attacker || !defender) return 0;
  let damage = getUnitAttack(attacker, game);
  if (attacker.cardId === 'red_004' && hasKeyword(defender, 'guard')) damage += 1;
  if (hasKeyword(defender, 'armor1')) damage = Math.max(0, damage - 1);
  damage = Math.max(0, damage - getTerrainDamageReduction(defender, game));
  if (defender.cardId === 'china_004' && isUnitOnTerrain(defender, 'jungle')) damage = Math.max(0, damage - 1);
  if (defender.cardId === 'soviet_002' && isUnitOnTerrain(defender, 'snow')) damage = Math.max(0, damage - 1);
  if (defender.tempDamageReduction) damage = Math.max(0, damage - defender.tempDamageReduction);
  return damage;
}

function healUnit(game, instanceId, amount) {
  const found = findUnit(game, instanceId);
  if (!found) return;
  found.unit.currentHealth = Math.min(found.unit.baseHealth, found.unit.currentHealth + amount);
  addLog(game, `${found.unit.name} 回复了 ${amount} 点生命`, 'heal');
}

function dealDamageToUnit(game, instanceId, amount) {
  const found = findUnit(game, instanceId);
  if (!found) return;
  const owner = game.players[found.unit.ownerId];
  const bonus = owner.id === 'p1' || owner.id === 'p2' ? 0 : 0;
  const actual = applyDamage(found.unit, amount + bonus, game);
  addLog(game, `${found.unit.name} 受到 ${actual} 点伤害`, 'damage');
}

function cleanupDeadUnits(game) {
  for (const player of Object.values(game.players)) {
    for (const laneName of ['frontline', 'backline']) {
      for (let i = 0; i < player[laneName].length; i += 1) {
        const unit = player[laneName][i];
        if (unit && unit.currentHealth <= 0) {
          player.discardPile.push(unit.cardId);
          addLog(game, `${unit.name} 被消灭`, 'destroy');
          if (unit.customTemplate?.deathDraw) {
            drawCards(game, unit.ownerId, 1);
            addLog(game, `${unit.name} 的遗留情报触发，${game.players[unit.ownerId].name} 抽了1张牌`);
          }
          if (unit.customTemplate?.deathSummon) {
            const owner = game.players[unit.ownerId];
            const openSlot = owner.frontline.findIndex((slot) => !slot);
            if (openSlot !== -1) {
              owner.frontline[openSlot] = createCustomTokenUnit(`${unit.cardId}_token`, unit.ownerId, openSlot, game);
              addLog(game, `${unit.name} 倒下后留下了增援士兵`);
            }
          }
          player[laneName][i] = null;
        }
      }
    }
  }
}

function getAiUnitValue(game, unit) {
  return getUnitAttack(unit, game) * 2 + unit.currentHealth + (hasKeyword(unit, 'guard') ? 2 : 0) + (unit.marked ? 1 : 0);
}

function getAiProfile(game, playerId) {
  const faction = game.players[playerId]?.deck?.faction;
  return AI_FACTION_PROFILES[faction] || AI_FACTION_PROFILES.germany;
}

function getAiAdaptation(game, playerId) {
  const memory = game.aiMemory || {};
  const enemy = game.players[getOpponentId(playerId)];
  return {
    antiAggro: memory.playerAggro >= 2 ? 3 : 0,
    antiCommand: memory.playerCommandTurns >= 2 ? 2 : 0,
    baseDefense: memory.playerBaseDamage >= 5 || enemy.baseHealth <= 12 ? 3 : 0,
    antiFrontline: memory.playerFrontlineTurns >= 2 ? 2 : 0
  };
}

function getAiGrowthTier(game) {
  let tier = 1;
  if (game.turn >= 4) tier = 2;
  if (game.turn >= 7) tier = 3;

  const difficulty = AI_DIFFICULTIES[state.aiDifficulty] || AI_DIFFICULTIES.normal;
  return Math.min(3, tier + difficulty.bonusTier);
}

function getAiFacePressure(game, attackerOwnerId) {
  const enemy = game.players[getOpponentId(attackerOwnerId)];
  const profile = getAiProfile(game, attackerOwnerId);
  const adaptation = getAiAdaptation(game, attackerOwnerId);
  return Math.max(0, 12 - enemy.baseHealth) + profile.faceBias - adaptation.baseDefense;
}

function chooseAiDeploySlot(game, ai, card, tier) {
  const frontlineOpen = ai.frontline.map((slot, index) => (!slot ? index : -1)).filter((index) => index !== -1);
  const backlineOpen = ai.backline.map((slot, index) => (!slot ? index : -1)).filter((index) => index !== -1);
  if (!frontlineOpen.length && !backlineOpen.length) return null;

  const enemy = game.players[getOpponentId(ai.id)];
  const profile = getAiProfile(game, ai.id);
  const adaptation = getAiAdaptation(game, ai.id);
  const needFrontline = countUnits(ai, 'frontline') < countUnits(enemy, 'frontline') || adaptation.baseDefense > 0;
  const aggressiveUnit = hasTag(card, 'tank') || hasTag(card, 'vehicle') || card.keywords.includes('charge');
  const supportUnit = card.keywords.includes('ranged') || hasTag(card, 'artillery') || hasTag(card, 'medic');
  const frontlineBias = profile.deployFrontlineBias + adaptation.antiAggro + adaptation.antiFrontline;

  const candidates = [];
  frontlineOpen.forEach((slotIndex) => {
    let score = 10 + getTerrainPreferenceScore(card, 'frontline', slotIndex, ai.deck.faction);
    if (needFrontline) score += 5;
    if (aggressiveUnit) score += 4;
    if (frontlineBias >= 3) score += 3;
    if (getUnitsInTerrain(ai, 'frontline', slotIndex).length) score += 2;
    candidates.push({ laneName: 'frontline', slotIndex, score });
  });
  backlineOpen.forEach((slotIndex) => {
    let score = 8 + getTerrainPreferenceScore(card, 'backline', slotIndex, ai.deck.faction);
    if (supportUnit) score += 5;
    if (frontlineBias <= 1) score += 2;
    if (getUnitsInTerrain(ai, 'backline', slotIndex).length) score += 2;
    candidates.push({ laneName: 'backline', slotIndex, score });
  });

  if (tier >= 2) {
    candidates.forEach((item) => {
      if (item.laneName === 'frontline' && (needFrontline || aggressiveUnit || frontlineBias >= 3)) item.score += 3;
      if (item.laneName === 'backline' && supportUnit && frontlineBias <= 2) item.score += 3;
    });
  }

  return candidates.sort((a, b) => b.score - a.score)[0] || null;
}

function scoreAiCardPlay(game, ai, card, tier) {
  const enemy = game.players[getOpponentId(ai.id)];
  const profile = getAiProfile(game, ai.id);
  const adaptation = getAiAdaptation(game, ai.id);
  const tutorialSoftener = game.tutorial?.enabled && game.turn <= 2 ? 1 : 0;
  const cost = getPlayableCost(game, ai, card);
  let score = cost * 2;

  if (card.type === 'support') score += 9 + (tier >= 2 ? 2 : 0) + profile.supportBias - tutorialSoftener;

  if (card.type === 'unit') {
    score += (card.attack || 0) * 2 + (card.health || 0);
    if (hasTag(card, 'tank') || hasTag(card, 'vehicle')) score += 3;
    if (card.keywords.includes('charge')) score += 3 + getAiFacePressure(game, ai.id) - tutorialSoftener * 2;
    if (card.keywords.includes('guard')) score += (countUnits(ai, 'frontline') <= countUnits(enemy, 'frontline') ? 5 : 2) + profile.guardBias + adaptation.antiAggro;
    if (card.keywords.includes('ranged') || hasTag(card, 'artillery')) score += tier >= 2 ? 4 : 2;
    if (countUnits(ai, 'frontline') === 0 && !card.keywords.includes('ranged')) score += 4 + adaptation.baseDefense + tutorialSoftener * 2;
  }

  if (card.type === 'command') {
    const plan = getAiCommandTargets(game, ai.id, card, tier);
    score += plan.score + profile.commandBias + adaptation.antiCommand - tutorialSoftener * 3;
    if (!plan.targetIds.length && card.targetType !== 'none') score -= 100;
  }

  return score;
}

function chooseAiAttackTarget(game, unit, enemy, tier = 1) {
  const profile = getAiProfile(game, unit.ownerId);
  const adaptation = getAiAdaptation(game, unit.ownerId);
  const tutorialSoftener = game.tutorial?.enabled && game.turn <= 2;
  const legalTargets = getAttackableEnemyUnits(game, unit);
  if (!legalTargets.length) return null;

  return legalTargets
    .slice()
    .sort((a, b) => {
      const aProjected = getProjectedDamage(game, unit, a);
      const bProjected = getProjectedDamage(game, unit, b);
      const aKill = aProjected >= a.currentHealth ? 1 : 0;
      const bKill = bProjected >= b.currentHealth ? 1 : 0;
      if (aKill !== bKill) return bKill - aKill;

      if (tier >= 2 || tutorialSoftener) {
        const tradeCaution = profile.preserveBias + adaptation.baseDefense + (tutorialSoftener ? 3 : 0);
        const aTrade = aProjected >= a.currentHealth && getProjectedDamage(game, a, unit) >= unit.currentHealth ? 1 : 0;
        const bTrade = bProjected >= b.currentHealth && getProjectedDamage(game, b, unit) >= unit.currentHealth ? 1 : 0;
        if (aTrade !== bTrade && tradeCaution > 0) return aTrade - bTrade;
      }

      const aGuard = hasKeyword(a, 'guard') ? 1 : 0;
      const bGuard = hasKeyword(b, 'guard') ? 1 : 0;
      if (aGuard !== bGuard) return bGuard - aGuard;

      const aScore = getAiUnitValue(game, a) + (hasKeyword(a, 'guard') ? profile.guardBias + adaptation.antiAggro : 0);
      const bScore = getAiUnitValue(game, b) + (hasKeyword(b, 'guard') ? profile.guardBias + adaptation.antiAggro : 0);
      if (aScore !== bScore) return bScore - aScore;
      return a.currentHealth - b.currentHealth;
    })[0];
}

function runAiTurn() {
  const game = state.game;
  if (!isAiTurn()) return;

  const ai = getActivePlayer(game);
  const enemy = game.players[getOpponentId(ai.id)];
  const profile = getAiProfile(game, ai.id);
  const adaptation = getAiAdaptation(game, ai.id);
  const tier = getAiGrowthTier(game);
  const tutorialSoftener = game.tutorial?.enabled && game.turn <= 2;

  if (!ai.factionPowerUsed && (tier >= 2 || countUnits(ai, 'frontline') > 0) && !tutorialSoftener) {
    useFactionPower();
  }

  let played = true;
  while (played && !game.winnerId) {
    played = false;
    const affordable = ai.hand
      .map((cardId) => getCardById(cardId))
      .filter((card) => ai.currentEnergy >= getPlayableCost(game, ai, card))
      .sort((a, b) => scoreAiCardPlay(game, ai, b, tier) - scoreAiCardPlay(game, ai, a, tier));

    for (const card of affordable) {
      if (card.type === 'support') {
        playCard(card.id);
        played = true;
        break;
      }

      if (card.type === 'unit') {
        const choice = chooseAiDeploySlot(game, ai, card, tier);
        if (choice) {
          playCard(card.id, choice.laneName, choice.slotIndex);
          played = true;
          break;
        }
      }

      if (card.type === 'command') {
        const plan = getAiCommandTargets(game, ai.id, card, tier);
        if (plan.targetIds.length || card.targetType === 'none') {
          playCard(card.id, null, null, plan.targetIds);
          played = true;
          break;
        }
      }
    }
  }

  const aiUnits = getAllUnits(game, ai.id)
    .filter((unit) => unit.canAttack && !unit.hasAttacked)
    .sort((a, b) => getUnitAttack(b, game) - getUnitAttack(a, game));

  aiUnits.forEach((unit) => {
    if (game.winnerId) return;

    if (canAttackBase(game, unit) && getUnitAttack(unit, game) >= enemy.baseHealth) {
      attackBase(unit.instanceId);
      return;
    }

    const target = chooseAiAttackTarget(game, unit, enemy, tier);
    if (target) {
      const lethalPush = canAttackBase(game, unit) && tier >= 3 && enemy.baseHealth <= getUnitAttack(unit, game) + 2 + profile.faceBias;
      const preferFace = !tutorialSoftener && canAttackBase(game, unit) && getAiFacePressure(game, ai.id) + profile.faceBias >= 5 && adaptation.baseDefense === 0;
      if (!lethalPush && !preferFace) {
        attackUnit(unit.instanceId, target.instanceId);
        return;
      }
    }

    if (canAttackBase(game, unit)) attackBase(unit.instanceId);
  });

  if (!game.winnerId && isAiTurn()) endTurn();
}

function getAiCommandTargets(game, playerId, card, tier = 1) {
  const enemyUnits = getAllUnits(game, getOpponentId(playerId));
  const friendlyUnits = getAllUnits(game, playerId);
  if (card.targetType === 'enemy-unit') {
    const target = enemyUnits
      .slice()
      .sort((a, b) => {
        const aKill = card.id === 'north_103' ? (a.currentHealth <= 4 ? 1 : 0) : (card.id === 'west_102' ? ((a.marked ? 4 : 2) >= a.currentHealth ? 1 : 0) : 0);
        const bKill = card.id === 'north_103' ? (b.currentHealth <= 4 ? 1 : 0) : (card.id === 'west_102' ? ((b.marked ? 4 : 2) >= b.currentHealth ? 1 : 0) : 0);
        if (aKill !== bKill) return bKill - aKill;
        const aGuard = hasKeyword(a, 'guard') ? 1 : 0;
        const bGuard = hasKeyword(b, 'guard') ? 1 : 0;
        if (aGuard !== bGuard) return bGuard - aGuard;
        const aScore = getAiUnitValue(game, a) + (a.marked && tier >= 2 ? 3 : 0);
        const bScore = getAiUnitValue(game, b) + (b.marked && tier >= 2 ? 3 : 0);
        if (aScore !== bScore) return bScore - aScore;
        return a.currentHealth - b.currentHealth;
      })[0];
    const score = target ? getAiUnitValue(game, target) + (hasKeyword(target, 'guard') ? 4 : 0) : -50;
    return { targetIds: target ? [target.instanceId] : [], score };
  }
  if (card.targetType === 'enemy-units') {
    const targets = enemyUnits
      .slice()
      .sort((a, b) => getAiUnitValue(game, b) - getAiUnitValue(game, a))
      .slice(0, 2)
      .map((unit) => unit.instanceId);
    return { targetIds: targets, score: targets.length ? 10 + targets.length * 4 : -50 };
  }
  if (card.targetType === 'friendly-unit') {
    const damagedFirst = friendlyUnits
      .slice()
      .sort((a, b) => {
        const aMissing = a.baseHealth - a.currentHealth;
        const bMissing = b.baseHealth - b.currentHealth;
        if (aMissing !== bMissing) return bMissing - aMissing;
        return getAiUnitValue(game, b) - getAiUnitValue(game, a);
      })[0];
    const score = damagedFirst ? (damagedFirst.baseHealth - damagedFirst.currentHealth) * 3 + getAiUnitValue(game, damagedFirst) : -50;
    return { targetIds: damagedFirst ? [damagedFirst.instanceId] : [], score };
  }
  if (card.targetType === 'friendly-frontline') {
    const targets = game.players[playerId].frontline
      .filter(Boolean)
      .sort((a, b) => getAiUnitValue(game, b) - getAiUnitValue(game, a))
      .slice(0, 2)
      .map((unit) => unit.instanceId);
    return { targetIds: targets, score: targets.length ? 8 + targets.length * 3 : -50 };
  }
  return { targetIds: [], score: card.targetType === 'none' ? 4 : -50 };
}

function rememberPlayerTurnPattern(game) {
  const memory = game.aiMemory;
  if (!memory || memory.lastPlayerTurnSeen === game.turn) return;

  const player = game.players.p1;
  if (player.hasAttackedThisTurn) memory.playerAggro += 1;
  if (player.commandPlayedThisTurn) memory.playerCommandTurns += 1;
  if (countUnits(player, 'frontline') >= 2) memory.playerFrontlineTurns += 1;
  memory.lastPlayerTurnSeen = game.turn;
}

function startGame() {
  if (!ui.p1DeckId || !ui.p2DeckId) return;
  state.game = createGame(ui.p1DeckId, ui.p2DeckId);
  ui.screen = 'battle';
  ui.selectedCardId = null;
  ui.selectedUnitId = null;
  ui.actionMode = null;
  ui.message = '轮到你行动';
  ui.turnSwitchVisible = false;
  render();
}

function launchQuickMatch(matchId) {
  const match = QUICK_MATCHES.find((item) => item.id === matchId);
  if (!match) return;

  ui.gameMode = match.mode;
  ui.p1DeckId = match.p1DeckId;
  ui.p2DeckId = match.p2DeckId;
  startGame();
}

function playSupport(game, player, card) {
  player.supports.push(card.id);
  addLog(game, `${player.name} 建立了支援：${card.name}`);
}

function buffUnit(unit, attack = 0, health = 0) {
  unit.baseAttack += attack;
  unit.baseHealth += health;
  unit.currentHealth += health;
}

function triggerCoordination(game, playerId, unit) {
  if (!hasKeyword(unit, 'coordination')) return;

  const armorUnits = getAllUnits(game, playerId).filter((candidate) => candidate.instanceId !== unit.instanceId && isArmorUnit(candidate));
  if (!armorUnits.length) return;

  const target = armorUnits.sort((a, b) => getUnitAttack(b, game) - getUnitAttack(a, game))[0];
  buffUnit(unit, 1, 1);
  buffUnit(target, 1, 1);
  addLog(game, `${unit.name} 触发协作，自己与 ${target.name} 获得 +1/+1`);
}

function markUnit(game, instanceId) {
  const found = findUnit(game, instanceId);
  if (!found) return;
  found.unit.marked = true;
  addLog(game, `${found.unit.name} 被标记`);

  const owner = game.players[getActivePlayer(game).id];
  if (owner.supports.includes('west_201') && !owner.markDrawUsed) {
    owner.markDrawUsed = true;
    drawCards(game, owner.id, 1);
    addLog(game, `${owner.name} 通过空地协调站抽了1张牌`);
  }
}

function resolveCustomCommand(game, playerId, card, targetIds) {
  const player = game.players[playerId];
  const enemyId = getOpponentId(playerId);
  const text = `${card.effectText || ''} ${card.customEffect || ''}`;
  const targetId = targetIds[0];
  const template = card.customTemplate || {};

  if (template.commandDoubleStrike) {
    targetIds.slice(0, 2).forEach((id) => {
      const found = findUnit(game, id);
      if (!found) return;
      dealDamageToUnit(game, found.unit.instanceId, 2);
    });
    cleanupDeadUnits(game);
    addLog(game, `${player.name} 发动了 ${card.name}，连续打击了两个目标`);
    return;
  }

  if (targetId && template.destroyDamaged) {
    const found = findUnit(game, targetId);
    if (found && found.unit.currentHealth < found.unit.baseHealth) {
      found.unit.currentHealth = 0;
      addLog(game, `${found.unit.name} 被 ${card.name} 消灭`);
      cleanupDeadUnits(game);
      return;
    }
  }

  if (targetId && /恢复|治疗|回复/.test(text)) {
    healUnit(game, targetId, /3/.test(text) ? 3 : 2);
    return;
  }

  if (targetId && template.markAndDamage) {
    markUnit(game, targetId);
    dealDamageToUnit(game, targetId, 2);
    cleanupDeadUnits(game);
    return;
  }

  if (targetId) {
    const damage = template.commandDamage3 ? 3 : template.commandDamage2 ? 2 : /4/.test(text) ? 4 : /3/.test(text) ? 3 : 2;
    dealDamageToUnit(game, targetId, damage);
    cleanupDeadUnits(game);
    return;
  }

  if (template.commandDamageAll) {
    game.players[enemyId].frontline.filter(Boolean).forEach((unit) => {
      dealDamageToUnit(game, unit.instanceId, 2);
    });
    cleanupDeadUnits(game);
    addLog(game, `${player.name} 发动了 ${card.name}，压制了敌方前线`);
    return;
  }

  if (template.buffFrontlineAttack || template.buffFrontlineHealth) {
    player.frontline.filter(Boolean).forEach((unit) => {
      if (template.buffFrontlineAttack) unit.tempAttackBonus += 1;
      if (template.buffFrontlineHealth) {
        unit.baseHealth += 1;
        unit.currentHealth += 1;
      }
    });
    addLog(game, `${player.name} 发动了 ${card.name}，强化了己方前线`);
    return;
  }

  if (template.summonOnPlay) {
    const openSlots = player.frontline.map((slot, index) => (!slot ? index : -1)).filter((index) => index !== -1);
    openSlots.slice(0, 2).forEach((index) => {
      player.frontline[index] = createCustomTokenUnit(`${card.id}_token`, player.id, index, game);
    });
    addLog(game, `${player.name} 发动了 ${card.name} 并召唤了增援士兵`);
    return;
  }

  const enemyFrontline = game.players[enemyId].frontline.filter(Boolean);
  if (enemyFrontline[0]) {
    dealDamageToUnit(game, enemyFrontline[0].instanceId, 2);
    cleanupDeadUnits(game);
    addLog(game, `${player.name} 发动了自定义战术 ${card.name}`);
    return;
  }

  if (template.drawOnPlay || /抽/.test(text)) {
    drawCards(game, playerId, 1);
    addLog(game, `${player.name} 发动了 ${card.name} 并抽了1张牌`);
  }
}

function resolveCommand(game, playerId, card, targetIds) {
  const player = game.players[playerId];
  player.commandPlayedThisTurn = true;

  if (card.custom) {
    resolveCustomCommand(game, playerId, card, targetIds);
    return;
  }

  switch (card.id) {
    case 'north_102': {
      const found = findUnit(game, targetIds[0]);
      if (!found) break;
      const amount = hasTag(found.unit, 'vehicle') || hasTag(found.unit, 'tank') ? 3 : 2;
      healUnit(game, found.unit.instanceId, amount);
      break;
    }
    case 'north_101': {
      const found = findUnit(game, targetIds[0]);
      if (!found) break;
      const amount = isUnitOnTerrain(found.unit, 'city') ? 3 : 2;
      dealDamageToUnit(game, found.unit.instanceId, amount);
      break;
    }
    case 'north_103': {
      const found = findUnit(game, targetIds[0]);
      if (found && found.unit.currentHealth <= 4) {
        found.unit.currentHealth = 0;
        addLog(game, `${found.unit.name} 被定点清除`);
      }
      break;
    }
    case 'red_101':
    case 'china_101':
    case 'soviet_101': {
      const found = findUnit(game, targetIds[0]);
      if (!found) break;
      found.unit.tempAttackBonus += found.unit.lane === 'front' ? 2 : 1;
      if (card.id === 'soviet_101') {
        healUnit(game, found.unit.instanceId, 1);
        if (isUnitOnTerrain(found.unit, 'snow')) found.unit.tempDamageReduction += 1;
      }
      if (card.id === 'china_101' && (hasTag(found.unit, 'guerrilla') || isUnitOnTerrain(found.unit, 'jungle'))) {
        drawCards(game, player.id, 1);
        addLog(game, `${player.name} 通过绝地反击抽了1张牌`);
      }
      addLog(game, `${found.unit.name} 本回合攻击力提升`);
      break;
    }
    case 'red_102':
    case 'china_102':
    case 'soviet_102': {
      const found = findUnit(game, targetIds[0]);
      if (!found) break;
      let amount = 2;
      if (card.id === 'red_102' && hasKeyword(found.unit, 'guard')) amount = 3;
      if (card.id === 'china_102' && (found.unit.marked || found.unit.currentHealth < found.unit.baseHealth)) amount = 3;
      if (card.id === 'soviet_102') amount = 3;
      dealDamageToUnit(game, found.unit.instanceId, amount);
      break;
    }
    case 'red_103':
    case 'china_103':
    case 'soviet_103': {
      targetIds.slice(0, 2).forEach((id) => {
        const found = findUnit(game, id);
        if (!found) return;
        found.unit.tempAttackBonus += 1;
        if (card.id === 'china_103' || card.id === 'soviet_103') healUnit(game, found.unit.instanceId, 1);
        if (card.id === 'soviet_103') found.unit.tempDamageReduction += 1;
      });
      addLog(game, `${player.name} 发动了 ${card.name}`);
      break;
    }
    case 'west_101':
      markUnit(game, targetIds[0]);
      drawCards(game, player.id, 1);
      addLog(game, `${player.name} 通过低空侦察抽了1张牌`);
      break;
    case 'west_102': {
      const found = findUnit(game, targetIds[0]);
      if (!found) break;
      dealDamageToUnit(game, found.unit.instanceId, found.unit.marked ? 4 : 2);
      break;
    }
    case 'west_103':
      targetIds.slice(0, 2).forEach((id) => markUnit(game, id));
      drawCards(game, player.id, 1);
      addLog(game, `${player.name} 发动联合作战并抽1张牌`);
      break;
    default:
      break;
  }

  cleanupDeadUnits(game);
}

function getPlayableCost(game, player, card) {
  if (!card) return 99;
  let cost = card.cost;
  if (player.supports.includes('red_201') && !player.lowCostDiscountUsed && card.type === 'unit' && card.cost <= 2) {
    cost -= 1;
  }
  if (card.type === 'command' && player.commandDiscount) {
    cost -= player.commandDiscount;
  }
  return Math.max(0, cost);
}

function handleCardClick(cardId) {
  const game = state.game;
  if (!game || game.winnerId || isAiTurn()) return;
  const player = getActivePlayer(game);
  const card = getCardById(cardId);
  if (!card) return;
  const cost = getPlayableCost(game, player, card);

  if (player.currentEnergy < cost) {
    ui.message = '能量不足，无法打出这张牌';
    ui.targetHint = '先看看能量，再决定是补单位还是结束回合。';
    render();
    return;
  }

  ui.selectedUnitId = null;
  ui.selectedCardId = cardId;
  ui.actionMode = card.type === 'support' ? 'support' : 'play';
  ui.targetHint = '';

  if (card.type === 'support') {
    playCard(cardId);
    return;
  }

  if (card.type === 'unit') {
    ui.message = '请选择部署位置';
    ui.targetHint = '高亮空位都可以下单位；优先把前线站住。';
  } else if (card.targetType === 'friendly-unit' || card.targetType === 'friendly-frontline') {
    ui.message = '请选择一个友方目标';
    ui.targetHint = '绿色思路：优先点己方受伤或前线关键单位。';
  } else if (card.targetType === 'enemy-units' || card.customTemplate?.commandDoubleStrike) {
    ui.message = '请选择第 1 个目标';
    ui.targetHint = '这是双目标战术：连续点两个敌方单位，再次点击手牌确认。';
  } else {
    ui.message = '请选择一个目标';
    ui.targetHint = '红框里的目标都能选，卡面下方会显示预计效果。';
  }
  render();
}

function playCard(cardId, laneName, slotIndex, targetIds = []) {
  const game = state.game;
  const player = getActivePlayer(game);
  const card = getCardById(cardId);
  const handIndex = player.hand.indexOf(cardId);
  if (handIndex === -1) return;
  const cost = getPlayableCost(game, player, card);
  if (player.currentEnergy < cost) return;

  player.currentEnergy -= cost;
  player.hand.splice(handIndex, 1);

  if (card.type === 'command' && player.commandDiscount) {
    player.commandDiscount = 0;
  }

  if (player.supports.includes('red_201') && !player.lowCostDiscountUsed && card.type === 'unit' && card.cost <= 2) {
    player.lowCostDiscountUsed = true;
  }

  if (card.type === 'unit') {
    const unit = createUnitInstance(card, player.id, laneName === 'frontline' ? 'front' : 'back', slotIndex, game);
    const template = card.customTemplate || {};
    if (player.id === 'p1') updateTutorialHint(game, 'unit_played');
    if (card.id === 'red_006' && player.commandPlayedThisTurn) unit.canAttack = true;
    if (card.id === 'china_006') drawCards(game, player.id, 1);
    if (card.id === 'china_003' && player.supports.includes('china_201')) unit.baseHealth += 1;
    if (card.id === 'china_003' && player.supports.includes('china_201')) unit.currentHealth += 1;
    if (card.custom && template.drawOnPlay) drawCards(game, player.id, 1);
    if (card.custom && template.healOnPlay) {
      const injured = getAllUnits(game, player.id).find((candidate) => candidate.currentHealth < candidate.baseHealth);
      if (injured) healUnit(game, injured.instanceId, /3点/.test(card.customEffect || '') ? 3 : 2);
    }
    if (card.custom && /守卫/.test(card.customEffect || '') && !unit.keywords.includes('guard')) unit.keywords.push('guard');
    player[laneName][slotIndex] = unit;
    addLog(game, `${player.name} 部署了 ${card.name}`);
    triggerCoordination(game, player.id, unit);

    if (card.custom && template.summonOnPlay) {
      const openSlots = player.frontline.map((slot, index) => (!slot ? index : -1)).filter((index) => index !== -1 && index !== slotIndex);
      const summonCount = /两个 1\/1/.test(card.customEffect || '') ? 2 : 1;
      openSlots.slice(0, summonCount).forEach((index) => {
        player.frontline[index] = createCustomTokenUnit(`${card.id}_token`, player.id, index, game);
      });
    }

    if (card.id === 'west_001') {
      ui.selectedCardId = null;
      ui.actionMode = 'west_mark_on_deploy';
      ui.message = '请选择一个敌方单位进行标记';
      ui.pendingDeployUnitId = unit.instanceId;
      render();
      return;
    }

    if (card.id === 'west_004') {
      ui.selectedCardId = null;
      ui.actionMode = 'west_bomber_on_deploy';
      ui.pendingDeployUnitId = unit.instanceId;
      ui.message = '请选择一个被标记的敌方单位';
      render();
      return;
    }

    if (card.id === 'west_005') {
      for (const enemy of getAllUnits(game, getOpponentId(player.id)).filter((u) => u.marked)) {
        dealDamageToUnit(game, enemy.instanceId, 2);
      }
      cleanupDeadUnits(game);
    }
  } else if (card.type === 'command') {
    resolveCommand(game, player.id, card, targetIds);
    player.discardPile.push(card.id);
  } else {
    playSupport(game, player, card);
    player.discardPile.push(card.id);
  }

  checkWinner(game);
  clearSelection();
  ui.message = '轮到你行动';
  render();
}

function clearSelection() {
  ui.selectedCardId = null;
  ui.selectedUnitId = null;
  ui.actionMode = null;
  ui.pendingDeployUnitId = null;
  ui.tempTargets = [];
  ui.targetHint = '';
}

function getAllUnits(game, playerId) {
  const player = game.players[playerId];
  return [...player.frontline, ...player.backline].filter(Boolean);
}

function retreatUnitToBackline(game, unit) {
  if (unit.lane === 'back') return false;
  const owner = game.players[unit.ownerId];
  const targetSlot = getTerrainSlotIndexes(unit.slotIndex).find((index) => !owner.backline[index]) ?? owner.backline.findIndex((slot) => !slot);
  if (targetSlot === -1) return false;
  owner.frontline[unit.slotIndex] = null;
  owner.backline[targetSlot] = unit;
  unit.lane = 'back';
  unit.slotIndex = targetSlot;
  addLog(game, `${unit.name} 转入${getTerrainBySlot(targetSlot).name}后排继续游击`);
  return true;
}

function shiftUnitToAdjacentFrontline(game, unit) {
  if (unit.lane !== 'front') return false;
  const owner = game.players[unit.ownerId];
  const candidateIndexes = [
    ...getTerrainSlotIndexes(unit.slotIndex).filter((index) => index !== unit.slotIndex && !owner.frontline[index]),
    unit.slotIndex - 1,
    unit.slotIndex + 1
  ].filter((index, position, array) => index >= 0 && index < owner.frontline.length && !owner.frontline[index] && array.indexOf(index) === position);
  if (!candidateIndexes.length) return false;
  const nextIndex = candidateIndexes[0];
  owner.frontline[unit.slotIndex] = null;
  owner.frontline[nextIndex] = unit;
  unit.slotIndex = nextIndex;
  addLog(game, `${unit.name} 沿着${getTerrainBySlot(nextIndex).name}战线转移到了第 ${nextIndex + 1} 格`);
  return true;
}

function getAttackableEnemyUnits(game, attacker) {
  const enemy = game.players[getOpponentId(attacker.ownerId)];
  const sameTerrainFrontline = getUnitsInTerrain(enemy, 'frontline', attacker.slotIndex);
  const guards = sameTerrainFrontline.filter((slot) => slot && hasKeyword(slot, 'guard'));
  if (guards.length) return guards;
  if (sameTerrainFrontline.length) return sameTerrainFrontline;
  if (hasKeyword(attacker, 'ranged')) return getUnitsInTerrain(enemy, 'backline', attacker.slotIndex);
  return [];
}

function canAttackBase(game, attacker) {
  const enemy = game.players[getOpponentId(attacker.ownerId)];
  if (game.turn === 1) return false;
  if (attacker.lane !== 'front') return false;
  return getUnitsInTerrain(enemy, 'frontline', attacker.slotIndex).length === 0;
}

function validateAttackTarget(game, attacker, defender) {
  const enemy = game.players[defender.ownerId];
  const attackerTerrain = getTerrainByUnit(attacker);
  const defenderTerrain = getTerrainByUnit(defender);
  if (!attackerTerrain || !defenderTerrain || attackerTerrain.id !== defenderTerrain.id) {
    return '只能攻击同地形战线内的目标';
  }

  const sameTerrainFrontline = getUnitsInTerrain(enemy, 'frontline', attacker.slotIndex);
  const guards = sameTerrainFrontline.filter((slot) => slot && hasKeyword(slot, 'guard'));
  if (defender.lane === 'front' && guards.length && !guards.some((unit) => unit.instanceId === defender.instanceId)) {
    return '该地形仍有守卫单位，必须优先攻击它';
  }

  if (attacker.lane === 'back' && !hasKeyword(attacker, 'ranged')) {
    return '后方单位不能发起普通攻击';
  }

  if (defender.lane === 'back') {
    if (!hasKeyword(attacker, 'ranged')) return '只有远程单位才能压制敌方后排';
    if (sameTerrainFrontline.length) return '必须先打穿该地形前线，才能打后排';
  }

  return null;
}

function attackUnit(attackerId, defenderId) {
  const game = state.game;
  const foundAttacker = findUnit(game, attackerId);
  const foundDefender = findUnit(game, defenderId);
  if (!foundAttacker || !foundDefender) return;

  const attacker = foundAttacker.unit;
  const defender = foundDefender.unit;

  if (attacker.ownerId !== game.activePlayerId) {
    ui.message = '只能操作当前行动方单位';
    render();
    return;
  }
  if (attacker.hasAttacked || !attacker.canAttack) {
    ui.message = '该单位当前不能攻击';
    render();
    return;
  }

  const invalidReason = validateAttackTarget(game, attacker, defender);
  if (invalidReason) {
    ui.message = invalidReason;
    render();
    return;
  }

  let attackValue = getUnitAttack(attacker, game);
  if (attacker.cardId === 'red_004' && hasKeyword(defender, 'guard')) attackValue += 1;
  const defenseValue = getUnitAttack(defender, game);

  const dealt = applyDamage(defender, attackValue, game);
  const returned = applyDamage(attacker, defenseValue, game);

  addLog(game, `${attacker.name} 攻击了 ${defender.name}`);
  addLog(game, `${defender.name} 受到 ${dealt} 点伤害`, 'damage');
  addLog(game, `${attacker.name} 受到 ${returned} 点伤害`, 'damage');
  if (attacker.ownerId === 'p1') updateTutorialHint(game, 'first_attack');

  attacker.hasAttacked = true;
  attacker.canAttack = false;
  attacker.justPlayed = false;
  game.players[attacker.ownerId].hasAttackedThisTurn = true;

  cleanupDeadUnits(game);
  if ((attacker.cardId === 'china_001' || attacker.cardId === 'china_003') && attacker.currentHealth > 0) {
    if (!shiftUnitToAdjacentFrontline(game, attacker)) retreatUnitToBackline(game, attacker);
  }
  checkWinner(game);
  clearSelection();
  ui.message = '请选择下一步操作';
  render();
}

function attackBase(attackerId) {
  const game = state.game;
  const foundAttacker = findUnit(game, attackerId);
  if (!foundAttacker) return;
  const attacker = foundAttacker.unit;
  if (!canAttackBase(game, attacker)) {
    ui.message = '该地形前线仍有敌军，不能攻击基地';
    updateTutorialHint(game, 'enemy_frontline_blocked');
    render();
    return;
  }

  const enemy = game.players[getOpponentId(attacker.ownerId)];
  const damage = getUnitAttack(attacker, game);
  enemy.baseHealth -= damage;
  if (attacker.ownerId === 'p1' && game.aiMemory) game.aiMemory.playerBaseDamage += damage;
  attacker.hasAttacked = true;
  attacker.canAttack = false;
  game.players[attacker.ownerId].hasAttackedThisTurn = true;

  addLog(game, `${attacker.name} 沿着${getTerrainByUnit(attacker)?.name || '突破口'}对敌方基地造成 ${damage} 点伤害`, 'damage');
  checkWinner(game);
  clearSelection();
  ui.message = '请选择下一步操作';
  render();
}

function checkWinner(game) {
  if (game.players.p1.baseHealth <= 0) finishGame(game, 'p2', '敌方基地被摧毁');
  if (game.players.p2.baseHealth <= 0) finishGame(game, 'p1', '敌方基地被摧毁');
}

function handleBoardSlotClick(ownerId, laneName, slotIndex) {
  const game = state.game;
  if (!game || game.winnerId || isAiTurn()) return;
  const activePlayer = getActivePlayer(game);
  const targetPlayer = game.players[ownerId];
  const slot = targetPlayer[laneName][slotIndex];

  if (ui.actionMode === 'play' && ui.selectedCardId) {
    const card = getCardById(ui.selectedCardId);
    if (card.type === 'unit') {
      if (ownerId !== activePlayer.id) {
        ui.message = '只能部署到己方区域';
        ui.targetHint = '单位牌只能下在自己这边的高亮空位。';
      } else if (slot) {
        ui.message = '该位置已被占用';
        ui.targetHint = '换一个高亮空位部署。';
      } else {
        playCard(ui.selectedCardId, laneName, slotIndex);
        return;
      }
      render();
      return;
    }

    if (card.type === 'command') {
      if (!slot) {
        ui.message = '请选择一个有效目标';
        ui.targetHint = '空位不能吃指令，点高亮单位。';
        render();
        return;
      }
      if (!isValidCommandTarget(card, activePlayer.id, ownerId, laneName, slot, game)) {
        ui.message = '这个目标不合法';
        ui.targetHint = '看一下提示，是敌方指令还是友方强化。';
        render();
        return;
      }

      if (card.id === 'red_103' || card.id === 'china_103' || card.id === 'soviet_103') {
        handleMultiSelectFriendlyFrontline(slot.instanceId);
        return;
      }

      if (card.id === 'west_103' || card.customTemplate?.commandDoubleStrike) {
        handleMultiSelectEnemy(slot.instanceId);
        return;
      }

      playCard(ui.selectedCardId, null, null, [slot.instanceId]);
      return;
    }
  }

  if (ui.actionMode === 'west_mark_on_deploy') {
    if (slot && ownerId !== activePlayer.id) {
      markUnit(game, slot.instanceId);
      clearSelection();
      ui.message = '轮到你行动';
      render();
      return;
    }
  }

  if (ui.actionMode === 'west_bomber_on_deploy') {
    if (slot && ownerId !== activePlayer.id && slot.marked) {
      dealDamageToUnit(game, slot.instanceId, 2);
      cleanupDeadUnits(game);
      clearSelection();
      ui.message = '轮到你行动';
      render();
      return;
    }
  }

  if (slot && ownerId === activePlayer.id) {
    if (slot.hasAttacked || !slot.canAttack) {
      ui.message = slot.justPlayed ? '该单位刚刚部署，且没有突击' : '该单位本回合已行动';
      ui.targetHint = slot.justPlayed ? '等下回合，或者先换别的单位行动。' : '换一个还能攻击的单位。';
      render();
      return;
    }
    ui.selectedUnitId = slot.instanceId;
    ui.selectedCardId = null;
    ui.actionMode = 'attack';
    ui.message = '请选择攻击目标';
    ui.targetHint = `已选中 ${slot.name}：只能攻击同地形目标；若该地形前线被打穿，也可以点基地。`;
    render();
    return;
  }

  if (slot && ownerId !== activePlayer.id && ui.actionMode === 'attack' && ui.selectedUnitId) {
    attackUnit(ui.selectedUnitId, slot.instanceId);
  }
}

function handleBaseClick(ownerId) {
  const game = state.game;
  if (!game || game.winnerId || isAiTurn()) return;
  if (ownerId === game.activePlayerId) return;
  if (ui.actionMode === 'attack' && ui.selectedUnitId) {
    attackBase(ui.selectedUnitId);
    return;
  }
  ui.message = '只有在攻击模式下才能点基地';
  ui.targetHint = '先点一个可攻击的己方前线单位，并打穿它所在的对应地形前线。';
  render();
}

function handleMultiSelectFriendlyFrontline(unitId) {
  if (!ui.tempTargets) ui.tempTargets = [];
  if (!ui.tempTargets.includes(unitId)) ui.tempTargets.push(unitId);
  ui.message = `已选择 ${ui.tempTargets.length}/2 个前线单位，再选一个或再次点击手牌确认`;
  ui.targetHint = '这类战术需要两个目标；选满两个后，再点一次手牌就会释放。';
  render();
}

function handleMultiSelectEnemy(unitId) {
  if (!ui.tempTargets) ui.tempTargets = [];
  if (!ui.tempTargets.includes(unitId)) ui.tempTargets.push(unitId);
  ui.message = `已选择 ${ui.tempTargets.length}/2 个敌方单位，再选一个或再次点击手牌确认`;
  ui.targetHint = '双目标战术已记录一个目标；继续点第二个，或再次点手牌确认施放。';
  render();
}

function isValidCommandTarget(card, activePlayerId, ownerId, laneName, slot, game) {
  if (card.targetType === 'enemy-unit' || card.targetType === 'enemy-units') return ownerId !== activePlayerId;
  if (card.targetType === 'friendly-unit') return ownerId === activePlayerId;
  if (card.targetType === 'friendly-frontline') return ownerId === activePlayerId && laneName === 'frontline';
  return true;
}

function endTurn() {
  const game = state.game;
  if (!game || game.winnerId) return;

  const current = getActivePlayer(game);
  if (current.id === 'p1' && state.aiEnabled) rememberPlayerTurnPattern(game);
  resolveEndOfTurnEffects(game, current.id);
  applyFrontlinePressure(game, current.id);
  if (game.winnerId) {
    clearSelection();
    ui.message = '战斗结束';
    render();
    return;
  }
  clearTemporaryEffects(game, 'p1');
  clearTemporaryEffects(game, 'p2');

  const nextId = getOpponentId(current.id);
  game.activePlayerId = nextId;
  if (nextId === 'p1') game.turn += 1;

  const next = game.players[nextId];
  next.maxEnergy = Math.min(10, next.maxEnergy + 1);
  next.currentEnergy = next.maxEnergy;
  next.commandPlayedThisTurn = false;
  next.hasAttackedThisTurn = false;
  next.markDrawUsed = false;
  next.lowCostDiscountUsed = false;
  next.factionPowerUsed = false;
  next.commandDiscount = 0;
  refreshUnits(game, nextId);
  resolveStartOfTurnEffects(game, nextId);
  drawCards(game, nextId, 1);
  checkWinner(game);

  clearSelection();

  if (state.aiEnabled && nextId === state.aiPlayerId) {
    updateTutorialHint(game, 'end_turn');
    ui.message = 'AI 正在部署部队...';
    ui.turnSwitchVisible = false;
    render();
    scheduleAiTurn();
    return;
  }

  ui.message = '请把设备交给对方后点击继续';
  ui.turnSwitchVisible = true;
  render();
}

function resolveEndOfTurnEffects(game, playerId) {
  const player = game.players[playerId];
  const medics = getAllUnits(game, playerId).filter((unit) => unit.cardId === 'north_004' || unit.cardId === 'soviet_003');
  for (const medic of medics) {
    const injured = getAllUnits(game, playerId).find((unit) => unit.currentHealth < unit.baseHealth);
    if (injured) healUnit(game, injured.instanceId, 1);
  }

  getAllUnits(game, playerId)
    .filter((unit) => unit.customTemplate?.endTurnHeal || unit.customTemplate?.endTurnFrontlineBuff)
    .forEach((unit) => {
      if (unit.customTemplate?.endTurnHeal) {
        const injured = getAllUnits(game, playerId).find((candidate) => candidate.currentHealth < candidate.baseHealth);
        if (injured) healUnit(game, injured.instanceId, 1);
      }
      if (unit.customTemplate?.endTurnFrontlineBuff) {
        const frontline = player.frontline.filter(Boolean)[0];
        if (frontline) {
          frontline.tempAttackBonus += 1;
          addLog(game, `${unit.name} 在回合结束时强化了 ${frontline.name}`);
        }
      }
    });
}

function clearTemporaryEffects(game, playerId) {
  for (const unit of getAllUnits(game, playerId)) {
    unit.tempAttackBonus = 0;
    unit.tempDamageReduction = 0;
    unit.marked = false;
  }
  game.players[playerId].commandDiscount = 0;
}

function refreshUnits(game, playerId) {
  for (const unit of getAllUnits(game, playerId)) {
    unit.hasAttacked = false;
    unit.canAttack = true;
    unit.justPlayed = false;
  }
}

function resolveStartOfTurnEffects(game, playerId) {
  const player = game.players[playerId];
  if (player.supports.includes('north_201') && countUnits(player, 'frontline') >= 2) {
    player.currentEnergy += 1;
    addLog(game, `${player.name} 从前线补给站获得了1点额外能量`);
  }
  if (player.supports.includes('soviet_201') && countUnits(player, 'frontline') >= 1) {
    const frontline = player.frontline.filter(Boolean).sort((a, b) => a.currentHealth - b.currentHealth)[0];
    if (frontline) {
      frontline.currentHealth = Math.min(frontline.baseHealth, frontline.currentHealth + 1);
      addLog(game, `${player.name} 的战地政委为 ${frontline.name} 回复了1点生命`);
    }
  }

  player.supports
    .map((cardId) => getCardById(cardId))
    .filter((card) => card?.custom && card.customTemplate)
    .forEach((card) => {
      const template = card.customTemplate;
      if (template.supportDraw) {
        drawCards(game, playerId, 1);
        addLog(game, `${player.name} 通过 ${card.name} 抽了1张牌`);
      }
      if (template.supportHeal) {
        const injured = getAllUnits(game, playerId).find((unit) => unit.currentHealth < unit.baseHealth);
        if (injured) healUnit(game, injured.instanceId, 1);
      }
      if (template.supportFrontlineBuff) {
        const frontline = player.frontline.filter(Boolean)[0];
        if (frontline) {
          frontline.baseHealth += 1;
          frontline.currentHealth += 1;
          addLog(game, `${card.name} 强化了 ${frontline.name} 的前线防护`);
        }
      }
      if (template.supportSummon) {
        const openSlot = player.frontline.findIndex((slot) => !slot);
        if (openSlot !== -1) {
          player.frontline[openSlot] = createCustomTokenUnit(`${card.id}_token`, player.id, openSlot, game);
          addLog(game, `${player.name} 通过 ${card.name} 获得了增援士兵`);
        }
      }
    });
}

function applyFrontlinePressure(game, playerId) {
  const player = game.players[playerId];
  const enemy = game.players[getOpponentId(playerId)];
  const ownFrontline = countUnits(player, 'frontline');
  const enemyFrontline = countUnits(enemy, 'frontline');

  if (ownFrontline < 2 || ownFrontline <= enemyFrontline) return;

  enemy.baseHealth -= 1;
  addLog(game, `${player.name} 取得前线压制，对敌方基地造成 1 点伤害`, 'damage');
  checkWinner(game);
}

function useFactionPower() {
  const game = state.game;
  if (!game || game.winnerId || (isAiTurn() && game.activePlayerId !== state.aiPlayerId)) return;

  const player = getActivePlayer(game);
  if (player.factionPowerUsed) return;

  if (player.deck.faction === 'germany') {
    const units = getAllUnits(game, player.id);
    const target = units.find((unit) => hasTag(unit, 'vehicle') || hasTag(unit, 'tank')) || units[0];
    if (!target) {
      ui.message = '场上没有可执行突进的单位';
      render();
      return;
    }
    target.tempAttackBonus += 1;
    target.tempDamageReduction += 1;
    if (!target.hasAttacked) target.canAttack = true;
    addLog(game, `${player.name} 发动闪击指挥，强化了 ${target.name}`);
    ui.message = `${target.name} 获得 +1 攻击，并在本回合更难被击穿`;
  } else if (player.deck.faction === 'japan') {
    const frontlineUnits = player.frontline.filter(Boolean);
    if (!frontlineUnits.length) {
      ui.message = '前线没有单位，无法发动总攻';
      render();
      return;
    }
    frontlineUnits.forEach((unit) => {
      unit.tempAttackBonus += 1;
      if (!unit.hasAttacked) unit.canAttack = true;
    });
    addLog(game, `${player.name} 发动玉碎冲锋，前线火力提升`);
    ui.message = '你的前线单位本回合攻击力 +1';
  } else if (player.deck.faction === 'america') {
    drawCards(game, player.id, 1);
    if (game.winnerId) {
      render();
      return;
    }
    player.commandDiscount = 1;
    addLog(game, `${player.name} 发动战场补给，抽 1 张牌且下一张指令牌费用 -1`);
    ui.message = '已抽 1 张牌，你本回合下一张指令牌费用 -1';
  } else if (player.deck.faction === 'china') {
    const unit = getAllUnits(game, player.id).find((item) => hasTag(item, 'guerrilla')) || getAllUnits(game, player.id)[0];
    if (!unit) {
      ui.message = '场上没有可以执行穿插的单位';
      render();
      return;
    }
    unit.tempAttackBonus += 1;
    if (!unit.hasAttacked) unit.canAttack = true;
    retreatUnitToBackline(game, unit);
    addLog(game, `${player.name} 发动敌后穿插，重整了 ${unit.name}`);
    ui.message = `${unit.name} 完成换位并获得 +1 攻击`;
  } else if (player.deck.faction === 'soviet') {
    const frontlineUnits = player.frontline.filter(Boolean);
    if (!frontlineUnits.length) {
      ui.message = '前线没有单位，无法发动钢铁防线';
      render();
      return;
    }
    frontlineUnits.forEach((unit) => {
      unit.tempDamageReduction += 1;
      healUnit(game, unit.instanceId, 1);
    });
    addLog(game, `${player.name} 发动钢铁防线，前线单位更难被击穿`);
    ui.message = '你的前线单位本回合获得 1 点额外防护并回复 1 点生命';
  }

  player.factionPowerUsed = true;
  render();
}

function useBonusEnergy() {
  const game = state.game;
  if (!game || isAiTurn()) return;
  const player = getActivePlayer(game);
  if (!player.hasBonusEnergy || player.usedBonusEnergy) return;
  player.currentEnergy += 1;
  player.usedBonusEnergy = true;
  addLog(game, `${player.name} 使用了战术补给`);
  ui.message = '获得1点额外能量';
  render();
}

function getScreenRenderSignature() {
  const shared = [ui.screen, ui.gameMode, ui.p1DeckId || '', ui.p2DeckId || '', ui.aiDifficulty || 'normal'].join('|');
  if (ui.screen === 'home') {
    const summary = getProgressionSummary();
    const lastTurn = summary.progression.lastResult?.turn || 0;
    const starterClaimable = summary.starterMissions.filter((mission) => mission.claimable).length;
    return `${shared}|${summary.progression.totalGames}|${summary.progression.totalWins}|${summary.progression.pveWins}|${summary.progression.supplyTickets}|${summary.progression.packs}|${summary.progression.unlockedDecks.join(',')}|${starterClaimable}|${summary.winRate}|${summary.favoriteDeck?.id || ''}|${lastTurn}`;
  }
  if (ui.screen === 'training') {
    const summary = getProgressionSummary();
    return `${shared}|${ui.trainingFocus || ''}|${summary.progression.tutorialCompleted ? 1 : 0}|${summary.progression.unlockedDecks.join(',')}|${summary.progression.supplyTickets}|${summary.progression.packs}`;
  }
  if (ui.screen === 'decks') {
    const summary = getProgressionSummary();
    return `${shared}|${ui.gameMode}|${ui.aiDifficulty}|${summary.progression.unlockedDecks.join(',')}|${summary.progression.supplyTickets}|${summary.progression.packs}|${Object.keys(summary.progression.starterRewardsClaimed || {}).length}`;
  }
  if (ui.screen === 'intel') {
    const customCount = loadCustomSiteCards().length;
    const submissionCount = loadPlayerSubmissions().length;
    return `${shared}|${ui.intelAdminUnlocked ? 1 : 0}|${ui.intelDraftCard?.name || ''}|${ui.intelDraftWarnings?.length || 0}|${ui.intelDraftScores ? `${ui.intelDraftScores.stability}-${ui.intelDraftScores.strength}-${ui.intelDraftScores.clarity}` : ''}|${customCount}|${submissionCount}`;
  }
  if (ui.screen === 'battle' && state.game) {
    return `${shared}|${state.game.turn}|${state.game.activePlayerId}|${state.game.winnerId || ''}|${state.game.logs.length}|${ui.message}|${ui.targetHint}|${ui.selectedCardId || ''}|${ui.selectedUnitId || ''}|${ui.actionMode || ''}`;
  }
  return shared;
}

function getScreenMarkup() {
  const signature = getScreenRenderSignature();
  if (ui.screen !== 'battle') {
    const cached = state.screenCache.get(signature);
    if (cached) return { signature, markup: cached };
  }

  let markup = '';
  if (ui.screen === 'home') markup = renderHome();
  else if (ui.screen === 'training') markup = renderTrainingScreen();
  else if (ui.screen === 'decks') markup = renderDeckSelect();
  else if (ui.screen === 'intel') markup = renderIntelScreen();
  else markup = renderBattle();

  if (ui.screen !== 'battle') {
    if (state.screenCache.size > 18) state.screenCache.clear();
    state.screenCache.set(signature, markup);
  }
  return { signature, markup };
}

function performRender() {
  state.renderQueued = false;
  syncUrlState();

  const { signature, markup } = getScreenMarkup();
  if (signature === state.lastRenderSignature && app.innerHTML === markup && ui.screen !== 'battle' && !ui.rewardModal) {
    modalRoot.innerHTML = '';
    return;
  }

  state.lastRenderSignature = signature;
  app.innerHTML = markup;
  modalRoot.innerHTML = '';
  if (ui.screen === 'battle' || ui.rewardModal) renderModal();
}

function render() {
  if (state.renderQueued) return;
  state.renderQueued = true;
  requestAnimationFrame(() => performRender());
}

function renderHome() {
  const quickStartUrl = buildShareUrl({
    mode: 'pve',
    p1DeckId: ui.p1DeckId || DEFAULT_SHARE_SETUP.p1DeckId,
    p2DeckId: ui.p2DeckId || DEFAULT_SHARE_SETUP.p2DeckId,
    screen: 'battle',
    autostart: true
  });
  const summary = getProgressionSummary();
  const missionSummary = GAME_MISSIONS.map((mission) => {
    const current = summary.missionProgress[mission.id] || 0;
    const target = mission.id === 'win_once' ? 1 : 3;
    return `${mission.label} ${current}/${target}`;
  }).join(' · ');
  const starterSummary = summary.starterMissions.map((mission) => renderStarterMissionCard(mission, { compact: true })).join('');
  const claimableCount = summary.starterMissions.filter((mission) => mission.claimable).length;
  const starterProgress = getStarterProgressSummary(summary.starterMissions);

  return `
    <section class="hero hero-shell">
      <div class="hero-card panel">
        <div class="hero-main">
          <p class="eyebrow">steel front command</p>
          <h1>钢铁战线</h1>
          <p class="subtitle">二战战术卡牌战场</p>
          <div class="hero-copy">选择卡组，部署部队，争夺前线。在钢铁与火力的交锋中，率先摧毁敌方基地。</div>
          <div class="hero-actions">
            <button class="btn btn-primary" data-action="go-training">开始新手训练</button>
            <button class="btn btn-secondary" data-action="go-decks">进入正式对战</button>
            <button class="btn btn-secondary" data-action="go-intel">阵营与词条</button>
          </div>
          <div class="feature-list hero-points">
            <span class="feature-tag">浏览器直接开打</span>
            <span class="feature-tag">支持 AI 对战</span>
            <span class="feature-tag">五阵营正式可选</span>
          </div>
          <div class="hero-inline-status panel">
            <div>
              <div class="section-label">当前进度</div>
              <strong>${summary.progression.totalGames ? `已进行 ${summary.progression.totalGames} 场战斗` : '先训练一把再开打'}</strong>
              <p>${summary.progression.lastResult ? `上一局第 ${summary.progression.lastResult.turn} 回合结束；当前任务：${missionSummary}` : `新手建议：先去训练页，再从训练页继续练推荐战局。`}</p>
            </div>
            <div class="progression-stats compact">
              <span class="state-chip">胜率 ${summary.winRate}%</span>
              <span class="state-chip">AI 胜场 ${summary.progression.pveWins}</span>
              <span class="state-chip">常用卡组 ${summary.favoriteDeck ? summary.favoriteDeck.name : '待定'}</span>
            </div>
          </div>
          <div class="starter-panel panel">
            <div class="starter-panel-head">
              <div>
                <div class="section-label">新手作战计划</div>
                <strong>${claimableCount ? `有 ${claimableCount} 个奖励待领取` : starterProgress.activeMission ? `当前推进到第 ${starterProgress.completedCount + 1} 阶段` : '新手作战计划已全部打通'}</strong>
                <p>先送德国完整入门卡组，再用任务逐步解锁日本、苏联、美国、中国赠送卡组。</p>
              </div>
              <div class="progression-stats compact">
                <span class="state-chip">阶段 ${starterProgress.completedCount}/${starterProgress.totalSteps}</span>
                <span class="state-chip">已解锁卡组 ${summary.unlockedDecks.length}/5</span>
                <span class="state-chip">补给券 ${summary.progression.supplyTickets}</span>
                <span class="state-chip">卡包 ${summary.progression.packs}</span>
              </div>
            </div>
            <div class="starter-stage-strip panel">
              <div>
                <div class="section-label">当前主线</div>
                <strong>${starterProgress.activeMission ? starterProgress.activeMission.label : '全部阶段已完成'}</strong>
                <p>${starterProgress.activeMission ? starterProgress.activeMission.description : '五套新手卡组和全部补给奖励都已经拿到。'}</p>
              </div>
              <div class="starter-stage-meter">
                <span>${starterProgress.progressPercent}%</span>
                <div class="starter-stage-meter-bar"><i style="width:${starterProgress.progressPercent}%"></i></div>
              </div>
            </div>
            <div class="mission-list compact">${starterSummary}</div>
          </div>
        </div>
        <aside class="hero-side hero-side-compact">
          <div class="share-strip panel">
            <div>
              <div class="section-label">一键分享</div>
              <strong>复制后可直接发同学开打</strong>
            </div>
            <div class="share-url">${quickStartUrl}</div>
            <button class="btn btn-accent" data-action="copy-share">复制试玩链接</button>
          </div>
          <div class="hero-side-block panel compact-note">
            <div class="section-label">推荐入口</div>
            <strong>新手先训练，熟了再正式对战</strong>
            <p>训练页已经包含规则、教学战和推荐战局；首页只保留最核心入口。</p>
          </div>
        </aside>
      </div>
    </section>
  `;
}

function getRecommendedStarterDeckId() {
  return 'germany_armor_push';
}

function renderDeckCard(deckId, selectedFor, recommendedId = null, options = {}) {
  const deck = getDeckById(deckId);
  const selected = selectedFor === deckId;
  const recommended = recommendedId === deckId;
  const locked = Boolean(options.locked);
  const unlockHint = options.unlockHint || '';
  return `
    <button class="deck-card panel ${deck.faction} ${selected ? 'selected' : ''} ${recommended ? 'recommended' : ''} ${locked ? 'locked' : ''}" data-deck-id="${deckId}" ${locked ? 'data-locked="1"' : ''}>
      <div class="deck-meta">${deck.factionName}</div>
      <h3>${deck.name}</h3>
      <p class="deck-desc">${deck.description}</p>
      <div class="deck-tags">${deck.tags.map((tag) => `<span class="deck-tag">${tag}</span>`).join('')}</div>
      ${unlockHint ? `<p class="deck-lock-copy">${unlockHint}</p>` : ''}
      <div class="deck-footer">
        <span class="deck-meta">难度：${deck.difficulty}</span>
        <span class="state-chip">${locked ? '新手任务解锁' : selected ? '已选择' : recommended ? '新手推荐' : '点击选择'}</span>
      </div>
    </button>
  `;
}

function renderTrainingScreen() {
  const summary = getProgressionSummary();
  const trainingRewardMission = summary.starterMissions.find((mission) => mission.id === 'finish_training');
  const keywordCards = [
    { title: '突击', text: '单位进场当回合就能攻击，适合抢节奏。', sample: '第3战车营 / 独立第1挺进营' },
    { title: '守卫', text: '敌军必须优先打它，适合扛线。', sample: '第9机枪营 / 第14步兵营' },
    { title: '远程', text: '后排也能开火，适合解场和压制。', sample: 'leFH 18榴弹炮营 / P-40战斗机中队' },
    { title: '协作 / 团结 / 玉碎 / 游击 / 坚守', text: '这是五个阵营的专属风格。训练通过后，再去正式对战里按阵营体验。', sample: '德国 / 美国 / 日本 / 中国 / 苏联' }
  ];

  const trainingSteps = [
    '先看卡牌左上角费用，确认当前能量够不够。',
    '单位牌要先部署到前线或后线。',
    '前线清空后，前线单位才能攻击基地。',
    '指令牌一般是解场、回血、增伤或过牌。',
    '支援牌会留在场上，持续提供效果。'
  ];
  const starterMatch = QUICK_MATCHES.find((item) => item.id === 'starter');
  const practiceMatches = QUICK_MATCHES.filter((item) => item.id !== 'starter');
  const practiceHighlight = ui.trainingFocus === 'practice';
  const starterProgress = getStarterProgressSummary(summary.starterMissions);

  return `
    <section class="screen training-layout">
      <header class="page-header panel training-hero">
        <p class="eyebrow">bootcamp</p>
        <h2 class="page-title">新手训练</h2>
        <p>先把词条、卡牌类型和基本操作弄懂。通过训练后，再进入正式对战界面自选卡组开打。</p>
        <div class="deck-actions" style="margin-top:18px;">
          <button class="btn btn-primary" data-action="complete-training">我学完了，进入正式对战</button>
          <button class="btn btn-secondary" data-action="go-intel">查看更多阵营词条</button>
        </div>
        <div class="starter-training-strip panel">
          <div>
            <div class="section-label">训练完成奖励</div>
            <strong>德国新手赠送卡组 + 补给券 x2 + 基础卡包 x1</strong>
            <p>${trainingRewardMission?.claimed ? '这份训练奖励已经领过了，去正式对战里继续解锁后续阵营。' : trainingRewardMission?.claimable ? '你已经达成条件了，现在就能领取第一套赠送卡组。' : '完成训练后就能领取第一套完整入门卡组。'}</p>
          </div>
          <div class="progression-stats compact">
            <span class="state-chip">新手阶段 ${starterProgress.completedCount}/${starterProgress.totalSteps}</span>
            <span class="state-chip">当前补给券 ${summary.progression.supplyTickets}</span>
            <span class="state-chip">当前卡包 ${summary.progression.packs}</span>
          </div>
        </div>
        ${trainingRewardMission ? `<div class="mission-list compact training-mission-highlight">${renderStarterMissionCard(trainingRewardMission, { compact: true, emphasized: true })}</div>` : ''}
      </header>

      <section class="panel training-panel">
        <div class="section-label">第一部分：先认识卡牌</div>
        <div class="training-card-grid">
          <article class="training-card panel">
            <strong>单位牌</strong>
            <p>会进入战场，占前线或后线，有攻击和生命值。</p>
          </article>
          <article class="training-card panel">
            <strong>指令牌</strong>
            <p>打出后立刻生效，常见用途是打伤害、回血、强化单位或抽牌。</p>
          </article>
          <article class="training-card panel">
            <strong>支援牌</strong>
            <p>会留在场上，给整局提供持续效果，比如减费、补给、治疗或标记联动。</p>
          </article>
        </div>
      </section>

      <section class="panel training-panel">
        <div class="section-label">第二部分：新手必须会的词条</div>
        <div class="training-keyword-grid">
          ${keywordCards.map((item) => `
            <article class="keyword-item panel training-keyword-item">
              <strong>${item.title}</strong>
              <p>${item.text}</p>
              <span class="deck-meta">例卡：${item.sample}</span>
            </article>
          `).join('')}
        </div>
      </section>

      <section class="panel training-panel">
        <div class="section-label">第三部分：一局怎么打</div>
        <div class="training-step-list">
          ${trainingSteps.map((step, index) => `
            <div class="training-step">
              <span class="state-chip">${index + 1}</span>
              <p>${step}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <section class="panel training-panel training-panel-emphasis training-starter-panel">
        <div>
          <div class="section-label">第四部分：打一把新手对战</div>
          <strong>${starterMatch.label}</strong>
          <p>${starterMatch.description} 这局会把最基础的部署、守线、攻击基地流程都过一遍，适合学完立刻练手。</p>
        </div>
        <div class="quick-match-grid training-quick-match-grid">
          <button class="quick-match-card panel" data-action="training-starter-match" data-match-id="${starterMatch.id}">
            <span class="state-chip">AI 对战</span>
            <strong>${starterMatch.label}</strong>
            <p>${starterMatch.description}</p>
          </button>
        </div>
        <div class="deck-actions">
          <button class="btn btn-primary" data-action="training-starter-match" data-match-id="${starterMatch.id}">开始这局新手对战</button>
          <button class="btn btn-secondary" data-action="complete-training">跳过训练，进入正式对战</button>
        </div>
      </section>

      <section class="panel training-panel training-panel-emphasis ${practiceHighlight ? 'training-focus-section' : ''}" ${practiceHighlight ? 'data-training-focus="practice"' : ''}>
        <div>
          <div class="section-label">第五部分：继续练几把推荐战局</div>
          <strong>学完基础后，直接在这里换不同节奏练手</strong>
          <p>快攻、控制、拉扯、线下双人都放在这里，不再占主页空间。</p>
        </div>
        <div class="quick-match-grid training-practice-grid">
          ${practiceMatches.map((match) => `
            <button class="quick-match-card panel" data-action="training-practice-match" data-match-id="${match.id}">
              <span class="state-chip">${match.mode === 'pve' ? 'AI 对战' : '双人对战'}</span>
              <strong>${match.label}</strong>
              <p>${match.description}</p>
            </button>
          `).join('')}
        </div>
      </section>

      <section class="panel training-panel training-exam">
        <div>
          <div class="section-label">训练完成</div>
          <strong>如果你已经知道费用、词条、部署、攻击和支援的区别，就可以进正式界面了。</strong>
          <p>正式界面支持五阵营自选卡组，也支持 AI 对战和双人对战。</p>
        </div>
        <div class="deck-actions">
          <button class="btn btn-primary" data-action="complete-training">进入正式对战</button>
          <button class="btn btn-secondary" data-action="back-home">返回首页</button>
        </div>
      </section>
    </section>
  `;
}

function renderDeckSelect() {
  const summary = getProgressionSummary();
  const recommendedStarterDeckId = summary.unlockedDecks.includes(getRecommendedStarterDeckId()) ? getRecommendedStarterDeckId() : (summary.unlockedDecks[0] || getRecommendedStarterDeckId());
  const recommendedStarterDeck = getDeckById(recommendedStarterDeckId);
  const unlockedDeckSet = new Set(summary.unlockedDecks);
  const claimableStarterRewards = summary.starterMissions.filter((mission) => mission.claimable).length;
  const starterProgress = getStarterProgressSummary(summary.starterMissions);
  return `
    <section class="screen">
      <header class="page-header panel">
        <p class="eyebrow">deck select</p>
        <h2 class="page-title">正式对战 · 自选卡组</h2>
        <p>这个界面默认给已经完成训练的玩家使用。现在可以直接从五个阵营里自选卡组开局。</p>
        <div class="difficulty-strip starter-deck-strip">
          <div>
            <div class="section-label">新手首选卡组</div>
            <strong>${recommendedStarterDeck.name}</strong>
            <div class="deck-meta">${recommendedStarterDeck.description}</div>
          </div>
          <div class="deck-actions">
            <button class="btn btn-accent" data-action="pick-starter-deck">玩家1用这套开局</button>
          </div>
        </div>
        <div class="starter-resource-strip panel">
          <div>
            <div class="section-label">指挥部补给</div>
            <strong>${starterProgress.activeMission ? `下一步：${starterProgress.activeMission.label}` : '新手奖励链已全部完成'}</strong>
            <p>${summary.unlockedDecks.length ? '补给券后续可用于买卡包；当前版本先支持任务发放、库存显示和卡组逐步解锁。' : '你还没有领取第一套赠送卡组，先回首页把训练奖励领掉，再回来选卡组开打。'}</p>
          </div>
          <div class="progression-stats compact">
            <span class="state-chip">阶段 ${starterProgress.completedCount}/${starterProgress.totalSteps}</span>
            <span class="state-chip">已解锁 ${summary.unlockedDecks.length}/5</span>
            <span class="state-chip">待领取 ${claimableStarterRewards}</span>
            <span class="state-chip">补给券 ${summary.progression.supplyTickets}</span>
            <span class="state-chip">卡包 ${summary.progression.packs}</span>
          </div>
        </div>
        ${(summary.starterMissions.some((mission) => mission.claimable) || starterProgress.activeMission) ? `<div class="mission-list compact deck-mission-list">${summary.starterMissions.filter((mission) => mission.claimable || (!mission.claimed && mission.id === starterProgress.activeMission?.id)).map((mission) => renderStarterMissionCard(mission, { compact: true, emphasized: mission.claimable })).join('')}</div>` : ''}
        <div class="share-strip share-strip-compact">
          <div>
            <div class="section-label">分享当前配置</div>
            <strong>复制后，同学可以直接打开这一局 AI 试玩</strong>
          </div>
          <button class="btn btn-accent" data-action="copy-share">复制链接</button>
        </div>
        <div class="mode-switch">
          <button class="btn ${ui.gameMode === 'pvp' ? 'btn-primary' : 'btn-secondary'}" data-action="mode-pvp">双人对战</button>
          <button class="btn ${ui.gameMode === 'pve' ? 'btn-primary' : 'btn-secondary'}" data-action="mode-pve">AI 对战</button>
        </div>
        ${ui.gameMode === 'pve' ? `
          <div class="difficulty-strip">
            <div>
              <div class="section-label">AI 难度</div>
              <strong>${AI_DIFFICULTIES[ui.aiDifficulty].name}</strong>
              <div class="deck-meta">${AI_DIFFICULTIES[ui.aiDifficulty].note}</div>
            </div>
            <div class="difficulty-buttons">
              ${Object.values(AI_DIFFICULTIES).map((item) => `
                <button class="btn ${ui.aiDifficulty === item.id ? 'btn-accent' : 'btn-secondary'}" data-action="set-ai-difficulty" data-ai-difficulty="${item.id}">${item.name}</button>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </header>

      <div class="deck-sections">
        <section class="deck-section panel" data-player="p1">
          <div class="deck-section-header">
            <div>
              <div class="section-label">玩家1选择卡组</div>
              <strong>${ui.p1DeckId ? getDeckById(ui.p1DeckId).name : '尚未选择'}</strong>
            </div>
          </div>
          <div class="deck-grid">
            ${Object.keys(DECKS).map((deckId) => {
              const mission = getStarterMissionForDeck(deckId);
              const locked = !unlockedDeckSet.has(deckId);
              const unlockHint = locked && mission ? `完成任务：${mission.label}` : '';
              return renderDeckCard(deckId, ui.p1DeckId, recommendedStarterDeckId, { locked, unlockHint });
            }).join('')}
          </div>
        </section>

        <section class="deck-section panel" data-player="p2">
          <div class="deck-section-header">
            <div>
              <div class="section-label">${ui.gameMode === 'pve' ? 'AI 选择卡组' : '玩家2选择卡组'}</div>
              <strong>${ui.p2DeckId ? getDeckById(ui.p2DeckId).name : '尚未选择'}</strong>
            </div>
          </div>
          <div class="deck-grid">
            ${Object.keys(DECKS).map((deckId) => renderDeckCard(deckId, ui.p2DeckId)).join('')}
          </div>
        </section>
      </div>

      <div class="deck-actions" style="margin-top: 18px; justify-content: flex-end;">
        <button class="btn btn-secondary" data-action="back-home">返回首页</button>
        <button class="btn btn-secondary" data-action="go-intel">查看五阵营设定</button>
        <button class="btn btn-primary" data-action="start-game" ${!ui.p1DeckId || !ui.p2DeckId ? 'disabled' : ''}>开始对战</button>
      </div>
    </section>
  `;
}

function renderFactionPreviewCard(faction) {
  return `
    <article class="faction-preview panel ${faction.id}">
      <div class="faction-preview-top">
        <div>
          <div class="section-label">${faction.name}</div>
          <h3>${faction.title}</h3>
        </div>
        <span class="state-chip">专属词条：${faction.keyword}</span>
      </div>
      <p class="faction-theme">${faction.theme}</p>
      <div class="keyword-block">
        <strong>${faction.keyword}</strong>
        <p>${faction.keywordText}</p>
      </div>
      <div class="sample-unit">
        <div class="sample-unit-head">
          <strong>${faction.sample.name}</strong>
          <span>${faction.sample.cost}费 ${faction.sample.stats}</span>
        </div>
        <div class="deck-meta">${faction.sample.type}</div>
        <p>${faction.sample.text}</p>
      </div>
    </article>
  `;
}

function getFactionClassByName(name) {
  return {
    '德国': 'germany',
    '美国': 'america',
    '日本': 'japan',
    '中国': 'china',
    '苏联': 'soviet'
  }[name] || '';
}

function buildDraftCardFromPrompt(message) {
  const text = message.trim();
  const lowerSignals = {
    draw: /抽|过牌|摸牌/.test(text),
    heal: /治疗|回复|恢复|奶/.test(text),
    destroy: /消灭|斩杀|处决/.test(text),
    summon: /召唤|铺场|铺兵|叫出/.test(text),
    defense: /守线|守卫|防线|站线|保护/.test(text),
    aggro: /抢脸|快攻|冲脸|压血/.test(text),
    mark: /标记/.test(text),
    airstrike: /空袭|轰炸|炮击/.test(text),
    armor: /装甲|坦克/.test(text),
    coordination: /协作|联动/.test(text),
    groupDamage: /群体|全体|所有敌方前线/.test(text),
    frontlineBuff: /前线增益|前线强化|前线单位\+1|前线单位获得\+1/.test(text),
    deathrattle: /亡语|阵亡时|被消灭时/.test(text),
    deathSummon: /死亡产兵|阵亡产兵|死后召唤/.test(text),
    doubleStrike: /双目标|两个目标|连续打击两次|打两个/.test(text),
    endTurn: /回合结束时/.test(text),
    stable: /稳定|模板|可执行|靠谱/.test(text)
  };

  const faction = text.includes('日本') ? '日本'
    : text.includes('美国') ? '美国'
    : text.includes('中国') ? '中国'
    : text.includes('苏联') ? '苏联'
    : '德国';

  const wantsSupport = text.includes('支援');
  const wantsCommand = text.includes('战术') || text.includes('指令');
  const type = wantsSupport ? '支援'
    : wantsCommand || lowerSignals.destroy || lowerSignals.draw || lowerSignals.heal || lowerSignals.airstrike || lowerSignals.groupDamage ? '战术'
    : '单位';

  const costMatch = text.match(/(\d+)\s*费/);
  let cost = costMatch ? Number(costMatch[1]) : (text.includes('低费') ? 2 : text.includes('高费') ? 5 : 3);
  if (lowerSignals.destroy || lowerSignals.summon || lowerSignals.groupDamage || lowerSignals.doubleStrike) cost = Math.max(cost, 4);
  if (lowerSignals.draw || lowerSignals.heal) cost = Math.max(2, cost);
  if (lowerSignals.deathrattle || lowerSignals.deathSummon || lowerSignals.endTurn) cost = Math.max(3, cost);
  const rarity = text.includes('传奇') ? '传奇' : text.includes('王牌') ? '王牌' : text.includes('精锐') ? '精锐' : '普通';

  const keywords = [];
  if (lowerSignals.aggro) keywords.push('突击');
  if (lowerSignals.defense) keywords.push('守卫');
  if (lowerSignals.airstrike) keywords.push('远程');
  if (lowerSignals.armor) keywords.push('装甲');
  if (lowerSignals.coordination) keywords.push('协作');
  if (lowerSignals.mark) keywords.push('标记');
  if (lowerSignals.summon) keywords.push('铺场');
  if (!keywords.length) {
    if (faction === '日本') keywords.push('突击');
    else if (faction === '苏联') keywords.push('守卫');
    else if (faction === '美国') keywords.push('远程');
    else if (faction === '中国') keywords.push('协作');
    else keywords.push('装甲');
  }

  const typeName = type === '单位' ? '营' : type === '战术' ? '作战方案' : '补给站';
  const prefix = faction === '日本' ? '独立第' : faction === '美国' ? '第' : faction === '中国' ? '新编第' : faction === '苏联' ? '近卫第' : '第';
  const name = text.includes('名称') ? text.replace(/^.*名称[:：]?/, '').trim() : `${prefix}${Math.max(1, cost * 3)}${typeName}`;

  const templatePreferred = lowerSignals.stable || !/复杂|随机|复制|偷取|复活|变形/.test(text);
  const attack = Math.max(1, cost + (keywords.includes('突击') ? 1 : 0) - (keywords.includes('守卫') ? 1 : 0));
  const health = Math.max(1, cost + (keywords.includes('守卫') ? 2 : 0) + (keywords.includes('装甲') ? 1 : 0) - (keywords.includes('突击') ? 1 : 0));
  const stats = type === '单位' ? `${attack}/${health}` : '-';

  let effect = `管理员根据需求生成：${text}`;
  if (type === '单位') {
    if (templatePreferred && lowerSignals.summon) effect = '进场时，再召唤一个 1/1 士兵单位到相邻空位。';
    else if (templatePreferred && lowerSignals.endTurn && lowerSignals.frontlineBuff) effect = '回合结束时，令你的一个前线单位获得+1攻击。';
    else if (templatePreferred && lowerSignals.endTurn && lowerSignals.heal) effect = '回合结束时，为一个受伤友军回复1点生命。';
    else if (templatePreferred && lowerSignals.deathSummon) effect = '被消灭时，召唤一个 1/1 士兵单位到前线空位。';
    else if (templatePreferred && lowerSignals.deathrattle && lowerSignals.draw) effect = '被消灭时，抽1张牌。';
    else if (templatePreferred && lowerSignals.aggro) effect = '突击；进场后本回合可以立刻发动攻击。';
    else if (templatePreferred && lowerSignals.defense) effect = '守卫；优先保护己方基地与后排单位。';
    else if (templatePreferred && lowerSignals.draw) effect = '进场时，抽1张牌。';
    else if (templatePreferred && lowerSignals.heal) effect = '进场时，为一个友军回复2点生命。';
    else if (templatePreferred && lowerSignals.coordination) effect = '协作；若相邻或同线有友军，则本回合攻击力+1。';
    else if (templatePreferred && lowerSignals.armor) effect = '装甲；每回合首次受到伤害时，伤害-1。';
    else if (templatePreferred && lowerSignals.airstrike) effect = '远程；可以安全处理关键目标。';
    else effect = '进场时，本回合获得+1攻击。';
  } else if (type === '战术') {
    if (templatePreferred && lowerSignals.doubleStrike) effect = '分别对两个敌方单位造成2点伤害。';
    else if (templatePreferred && lowerSignals.groupDamage) effect = '对所有敌方前线单位各造成2点伤害。';
    else if (templatePreferred && lowerSignals.frontlineBuff) effect = '令你的前线单位获得+1攻击。';
    else if (templatePreferred && lowerSignals.destroy) effect = '消灭一个受伤敌方单位。';
    else if (templatePreferred && lowerSignals.heal) effect = '令一个友军回复3点生命。';
    else if (templatePreferred && lowerSignals.draw && lowerSignals.airstrike) effect = '抽1张牌，然后对一个敌方单位造成2点伤害。';
    else if (templatePreferred && lowerSignals.draw) effect = '抽1张牌，然后对一个敌方单位造成2点伤害。';
    else if (templatePreferred && lowerSignals.mark) effect = '标记一个敌方单位，然后对其造成2点伤害。';
    else if (templatePreferred && lowerSignals.airstrike) effect = '对一个敌方单位造成3点伤害。';
    else if (templatePreferred && lowerSignals.summon) effect = '召唤两个 1/1 士兵单位到己方前线空位。';
    else effect = '对一个敌方单位造成3点伤害。';
  } else {
    if (templatePreferred && lowerSignals.draw) effect = '回合开始时，抽1张牌。';
    else if (templatePreferred && lowerSignals.heal) effect = '回合开始时，为一个友军回复1点生命。';
    else if (templatePreferred && lowerSignals.frontlineBuff) effect = '回合开始时，令你的一个前线单位获得+1生命。';
    else if (templatePreferred && lowerSignals.summon) effect = '每回合首次打出单位后，召唤一个 1/1 士兵单位。';
    else effect = text.includes('资源') || text.includes('补给') ? '回合开始时，抽1张牌。' : '回合开始时，令你的一个前线单位获得+1生命。';
  }

  return { faction, type, rarity, cost, name, stats, keywords: [...new Set(keywords)], effect, batch: '管理员设计', badge: '🛠' };
}

function getAdminReply(message) {
  const text = message.trim();
  if (!text) return '先说说你想改哪一类卡：快攻、控制、防守、支援，还是某个具体阵营。';
  if (text === INTEL_ADMIN_PASSWORD) return '密码正确，设计模式已解锁。现在你可以直接填写卡牌并加入资料库。';
  if (ui.intelAdminUnlocked && /给|设计|做一张|来一张|生成/.test(text)) {
    return '我已经按你的描述生成了一张更细的卡牌草稿，像抽牌、治疗、消灭、铺场、守线这些意图我都会优先识别。你直接改表单就行。';
  }
  if (text.includes('日本') || text.includes('快攻')) return '如果你要做快攻卡，优先给日本设计低费、突击、抢脸后有代价的单位，会更像这个阵营。';
  if (text.includes('美国') || text.includes('标记') || text.includes('空袭')) return '美国更适合做标记、抽牌、定点轰炸和支援联动，不要硬做成纯冲脸。';
  if (text.includes('德国') || text.includes('装甲') || text.includes('协作')) return '德国卡适合围绕装甲推进和协作收益，最好让相邻单位或前线站位有额外价值。';
  if (text.includes('中国') || text.includes('游击') || text.includes('拉扯')) return '中国卡更适合做回撤、伏击、拖节奏和保值交换，别把它做成正面硬顶。';
  if (text.includes('苏联') || text.includes('守卫') || text.includes('防线')) return '苏联卡建议偏守卫、回血、厚前排和反推，重点是先站住再压回去。';
  return '可以。我现在还在访客模式，只能给建议。你如果要我直接往资料库造卡，就输入密码进入设计模式。';
}

function renderKeywordItem(item) {
  return `
    <article class="keyword-item panel">
      <strong>${item.name}</strong>
      <p>${item.text}</p>
    </article>
  `;
}

function renderIntelCardItem(cardInfo) {
  return `
    <article class="intel-card-item ${getFactionClassByName(cardInfo.faction)}">
      <div class="intel-card-head">
        <span class="state-chip">${cardInfo.rarity}</span>
        <span class="state-chip">${cardInfo.type}</span>
      </div>
      <h3>${cardInfo.name}</h3>
      <div class="deck-meta">${cardInfo.cost}费 · ${cardInfo.stats}</div>
      <div class="card-keywords">${cardInfo.keywords.map((keyword) => `<span class="keyword-pill">${keyword}</span>`).join('')}</div>
      <p class="intel-card-effect">${cardInfo.effect}</p>
      <div class="intel-card-batch-mark" title="${cardInfo.batch}">${cardInfo.badge}</div>
    </article>
  `;
}

function renderPlayerSubmissionItem(item, index) {
  return `
    <article class="panel intel-submission-item">
      <div class="intel-card-head">
        <span class="state-chip">玩家投稿</span>
        <span class="state-chip">${item.status === 'approved' ? '已通过' : '待修改'}</span>
      </div>
      <h3>${item.name}</h3>
      <div class="deck-meta">${item.faction} · ${item.type} · ${item.cost}费 · ${item.stats}</div>
      <p class="intel-card-effect">${item.effect}</p>
      <p class="intel-card-effect">管理员意见：${item.reviewReply || '待审核'}</p>
      <div class="intel-admin-actions">
        <button class="btn btn-secondary" type="button" data-action="player-submission-review" data-submission-index="${index}">重新审核</button>
      </div>
    </article>
  `;
}

function renderAdminPanel() {
  const stableTemplateGroups = [
    {
      title: '进攻类',
      items: ['单体2/3伤害', '消灭受伤单位', '标记后打2', '前线群体轰炸']
    },
    {
      title: '站场类',
      items: ['进场治疗', '进场召唤1/1', '回合结束治疗', '被消灭时抽1']
    },
    {
      title: '运营类',
      items: ['进场抽1', '回合开始抽牌', '前线全体+1攻击', '持续产1/1增援']
    }
  ];
  const samplePromptGroups = [
    {
      title: '战术',
      items: [
        { text: '给美国做一张稳定一点的群体前线轰炸战术', auto: true },
        { text: '给德国做一张前线全体+1攻击的战术', auto: true }
      ]
    },
    {
      title: '单位',
      items: [
        { text: '给苏联做一张回合结束时治疗友军的守线单位', auto: true },
        { text: '给中国做一张被消灭时抽1张牌的单位', auto: true }
      ]
    }
  ];
  const referenceGroups = getAdminReferenceUnits();
  const factionUnitPrompts = getAdminFactionUnitPrompts();
  const designPrinciples = getFactionDesignPrinciples();
  const taskChecks = loadTaskChecks();
  const designTasks = getFactionDesignTasks().map((task, taskIndex) => ({
    ...task,
    itemStates: task.items.map((_, itemIndex) => Boolean(taskChecks[`${task.faction}-${taskIndex}-${itemIndex}`]))
  }));
  const actionAdvice = getDraftActionAdvice(ui.intelDraftScores, ui.intelDraftWarnings);

  return `
    <section class="panel intel-admin-panel">
      <div class="intel-admin-head">
        <div>
          <div class="section-label">管理员终端</div>
          <strong>前往与管理员对话</strong>
          <p>${ui.intelAdminUnlocked ? '设计模式已开启，现在可以直接把新卡加入资料库。' : '当前为访客模式：可以提建议、问问题，但不能直接造卡。'}</p>
        </div>
        <span class="state-chip">${ui.intelAdminUnlocked ? '设计模式' : '访客模式'}</span>
      </div>
      <div class="intel-admin-guide panel">
        <div>
          <div class="section-label">稳定模板</div>
          <strong>想稳就尽量按这些效果描述</strong>
        </div>
        <div class="intel-template-groups">
          ${stableTemplateGroups.map((group) => `
            <section class="intel-template-group">
              <div class="section-label">${group.title}</div>
              <div class="feature-list intel-template-list">${group.items.map((item) => `<span class="state-chip">${item}</span>`).join('')}</div>
            </section>
          `).join('')}
        </div>
        <div class="intel-template-note">管理员现在会优先把一句话需求收敛到这些可稳定执行的模板。</div>
        <section class="intel-reference-library">
          <div>
            <div class="section-label">阵营单位参考库</div>
            <strong>每个阵营先看 5 张单位牌，再决定怎么做新卡</strong>
          </div>
          <div class="intel-reference-groups">
            ${referenceGroups.map((group) => `
              <section class="intel-reference-group panel">
                <div class="section-label">${group.faction}</div>
                <div class="intel-reference-unit-list">
                  ${group.units.map((unit) => `
                    <article class="intel-reference-unit">
                      <div class="intel-reference-unit-head">
                        <strong>${unit.name}</strong>
                        <span>${unit.cost}费 ${unit.stats}</span>
                      </div>
                      <div class="feature-list">${unit.keywords.map((keyword) => `<span class="state-chip">${keyword}</span>`).join('')}</div>
                      <p>${unit.effect}</p>
                      <div class="intel-reference-actions">
                        <button class="btn btn-secondary intel-reference-apply" type="button" data-action="load-reference-unit" data-reference-faction="${group.faction}" data-reference-name="${unit.name}">带入表单继续改</button>
                        <button class="btn btn-accent intel-reference-apply" type="button" data-action="generate-reference-variant" data-reference-faction="${group.faction}" data-reference-name="${unit.name}">生成同风格新卡</button>
                      </div>
                    </article>
                  `).join('')}
                </div>
              </section>
            `).join('')}
          </div>
        </section>
        <section class="intel-principles-library">
          <div>
            <div class="section-label">阵营设计原则</div>
            <strong>先懂这个阵营为什么强，再去设计那一张卡</strong>
          </div>
          <div class="intel-principle-grid">
            ${designPrinciples.map((item) => `
              <section class="intel-principle-card panel">
                <div class="section-label">${item.faction}</div>
                <strong>${item.focus}</strong>
                <div class="intel-principle-list">
                  ${item.tips.map((tip) => `<p>${tip}</p>`).join('')}
                </div>
              </section>
            `).join('')}
          </div>
        </section>
        <section class="intel-task-library">
          <div>
            <div class="section-label">阵营补卡任务</div>
            <strong>别空想，按任务把每个阵营的空位补起来</strong>
          </div>
          <div class="intel-task-grid">
            ${designTasks.map((item) => `
              <section class="intel-task-card panel">
                <div class="section-label">${item.faction}</div>
                <strong>${item.title}</strong>
                <div class="intel-task-list">
                  ${item.items.map((task, itemIndex) => {
                    const checked = item.itemStates[itemIndex];
                    return `<label class="intel-task-check ${checked ? 'done' : ''}"><input type="checkbox" data-action="toggle-task-check" data-task-key="${item.faction}-${taskIndex}-${itemIndex}" ${checked ? 'checked' : ''}><span>${task}</span></label>`;
                  }).join('')}
                </div>
              </section>
            `).join('')}
          </div>
        </section>
        <div class="intel-sample-group-list">
          ${samplePromptGroups.map((group) => `
            <section class="intel-sample-group">
              <div class="section-label">${group.title}示例</div>
              <div class="intel-sample-prompts">
                ${group.items.map((item) => `<button class="intel-sample-prompt" type="button" data-role="intel-sample-prompt" data-prompt="${item.text}" data-auto-generate="${item.auto ? '1' : '0'}">${item.text}<span>一键生成草稿</span></button>`).join('')}
              </div>
            </section>
          `).join('')}
        </div>
        <section class="intel-faction-designer">
          <div>
            <div class="section-label">阵营示范设计</div>
            <strong>让管理员先各做 1 张单位牌，直接看成品和模板命中</strong>
          </div>
          <div class="intel-faction-designer-grid">
            ${factionUnitPrompts.map((item) => `<button class="intel-sample-prompt intel-faction-designer-card" type="button" data-role="intel-sample-prompt" data-prompt="${item.text}" data-auto-generate="1">为${item.faction}设计 1 张示范单位牌<span>${item.text}</span></button>`).join('')}
          </div>
        </section>
      </div>
      <div class="intel-admin-chat panel">
        <div class="intel-admin-bubble user-bubble">${ui.intelAdminMessage || '在这里输入你的需求，或者直接输入密码解锁。'}</div>
        <div class="intel-admin-bubble admin-bubble">${ui.intelAdminReply}</div>
      </div>
      <div class="intel-admin-input-row">
        <input class="intel-admin-input" data-role="intel-admin-input" type="text" placeholder="比如：给日本设计一张2费快攻单位，或者输入密码" value="">
        <button class="btn btn-accent" data-action="intel-admin-send">发送</button>
      </div>
      ${ui.intelAdminUnlocked ? `
        <form class="intel-card-form panel" data-role="intel-card-form">
          ${ui.intelDraftTemplateHits?.length ? `
            <div class="intel-draft-template-hits">
              <div class="section-label">本次命中模板</div>
              <div class="feature-list">${ui.intelDraftTemplateHits.map((item) => `<span class="state-chip">${item}</span>`).join('')}</div>
            </div>
          ` : ''}
          ${ui.intelDraftScores ? `
            <div class="intel-score-panel">
              <div class="section-label">设计评分</div>
              <div class="intel-score-grid">
                <div class="intel-score-card"><strong>${ui.intelDraftScores.stability}</strong><span>稳定性</span></div>
                <div class="intel-score-card"><strong>${ui.intelDraftScores.strength}</strong><span>强度</span></div>
                <div class="intel-score-card"><strong>${ui.intelDraftScores.clarity}</strong><span>易懂度</span></div>
              </div>
              <div class="intel-action-advice">
                <div class="section-label">建议动作</div>
                <p>${actionAdvice}</p>
              </div>
            </div>
          ` : ''}
          ${ui.intelDraftWarnings?.length ? `
            <div class="intel-balance-warnings">
              <div class="section-label">平衡提醒</div>
              <div class="intel-warning-list">${ui.intelDraftWarnings.map((item) => `<p>${item}</p>`).join('')}</div>
            </div>
          ` : ''}
          <div class="intel-card-form-grid">
            <label><span>阵营</span><select name="faction"><option ${ui.intelDraftCard?.faction === '德国' ? 'selected' : ''}>德国</option><option ${ui.intelDraftCard?.faction === '美国' ? 'selected' : ''}>美国</option><option ${ui.intelDraftCard?.faction === '日本' ? 'selected' : ''}>日本</option><option ${ui.intelDraftCard?.faction === '中国' ? 'selected' : ''}>中国</option><option ${ui.intelDraftCard?.faction === '苏联' ? 'selected' : ''}>苏联</option></select></label>
            <label><span>类型</span><select name="type"><option ${ui.intelDraftCard?.type === '单位' ? 'selected' : ''}>单位</option><option ${ui.intelDraftCard?.type === '战术' ? 'selected' : ''}>战术</option><option ${ui.intelDraftCard?.type === '支援' ? 'selected' : ''}>支援</option></select></label>
            <label><span>稀有度</span><select name="rarity"><option ${ui.intelDraftCard?.rarity === '普通' ? 'selected' : ''}>普通</option><option ${ui.intelDraftCard?.rarity === '精锐' ? 'selected' : ''}>精锐</option><option ${ui.intelDraftCard?.rarity === '王牌' ? 'selected' : ''}>王牌</option><option ${ui.intelDraftCard?.rarity === '传奇' ? 'selected' : ''}>传奇</option></select></label>
            <label><span>费用</span><input name="cost" type="number" min="0" max="10" value="${ui.intelDraftCard?.cost ?? 3}"></label>
            <label><span>名称</span><input name="name" type="text" placeholder="例如：第17突击营" value="${ui.intelDraftCard?.name || ''}"></label>
            <label><span>属性</span><input name="stats" type="text" placeholder="单位写 3/2；战术/支援写 -" value="${ui.intelDraftCard?.stats || ''}"></label>
            <label class="intel-card-form-wide"><span>关键词</span><input name="keywords" type="text" placeholder="用中文逗号分隔，例如：突击，玉碎" value="${ui.intelDraftCard?.keywords?.join('，') || ''}"></label>
            <label class="intel-card-form-wide"><span>效果</span><textarea name="effect" rows="3" placeholder="写清楚这张卡做什么">${ui.intelDraftCard?.effect || ''}</textarea></label>
          </div>
          <div class="intel-admin-actions">
            <button class="btn btn-secondary" type="button" data-action="intel-admin-generate">一句话生成草稿</button>
            <button class="btn btn-primary" type="submit">加入资料库</button>
          </div>
        </form>
      ` : ''}
    </section>
  `;
}

function renderIntelScreen() {
  refreshSiteCardLibrary();
  const customCards = SITE_CARD_LIBRARY.filter((cardInfo) => cardInfo.batch === '管理员设计');
  const playerSubmissions = loadPlayerSubmissions();

  return `
    <section class="screen intel-layout">
      <header class="page-header panel">
        <p class="eyebrow">worldbook</p>
        <h2 class="page-title">钢铁战线资料库</h2>
        <p>五个阵营、九个词条、营级番号卡牌骨架，已经正式接进网站展示层。</p>
      </header>

      <section class="panel intel-summary">
        <div>
          <div class="section-label">当前状态</div>
          <strong>阵营设定、词条规则、代表卡已入站</strong>
          <p>五个阵营现在都已经能直接进入对战，资料库和试玩层终于不再分家。</p>
        </div>
        <div class="feature-list intel-tags">
          <span class="feature-tag">5 个阵营</span>
          <span class="feature-tag">5 专属 + 4 公共词条</span>
          <span class="feature-tag">营级番号命名</span>
          <span class="feature-tag">代表卡预览</span>
          <span class="feature-tag">管理员新增 ${customCards.length} 张</span>
        </div>
      </section>

      ${renderAdminPanel()}

      <section class="panel intel-batch-panel">
        <div class="intel-batch-head">
          <div>
            <div class="section-label">玩家投稿区</div>
            <strong>玩家也可以造卡，但必须先过管理员审核</strong>
          </div>
          <span class="batch-badge-large">📝</span>
        </div>
        <p class="intel-card-effect">投稿没过不会直接入库；管理员会给出修改意见，通过后才会变成正式管理员卡。</p>
        <form class="intel-card-form" data-role="player-card-form">
          <div class="intel-card-form-grid">
            <label><span>阵营</span><select name="faction"><option>德国</option><option>美国</option><option>日本</option><option>中国</option><option>苏联</option></select></label>
            <label><span>类型</span><select name="type"><option>单位</option><option>战术</option><option>支援</option></select></label>
            <label><span>费用</span><input name="cost" type="number" min="0" max="10" value="3"></label>
            <label><span>名称</span><input name="name" type="text" placeholder="例如：第7突击营"></label>
            <label><span>属性</span><input name="stats" type="text" placeholder="单位写 3/4；战术/支援写 -" value="-"></label>
            <label class="intel-card-form-wide"><span>关键词</span><input name="keywords" type="text" placeholder="用中文逗号分隔"></label>
            <label class="intel-card-form-wide"><span>效果</span><textarea name="effect" rows="3" placeholder="写清楚卡牌效果，越像稳定模板越容易通过"></textarea></label>
          </div>
          <div class="intel-admin-actions">
            <button class="btn btn-primary" type="submit">提交给管理员审核</button>
          </div>
        </form>
        ${playerSubmissions.length ? `
          <div class="intel-sample-group-list">
            ${playerSubmissions.map((item, index) => renderPlayerSubmissionItem(item, index)).join('')}
          </div>
        ` : '<p class="intel-card-effect">还没有玩家投稿，先交一张试试。</p>'}
      </section>

      <section>
        <div class="section-label" style="margin-bottom:10px;">五阵营蓝图</div>
        <div class="faction-preview-grid">
          ${FACTION_BLUEPRINTS.map((faction) => renderFactionPreviewCard(faction)).join('')}
        </div>
      </section>

      <section>
        <div class="section-label" style="margin-bottom:10px;">公共词条</div>
        <div class="keyword-grid">
          ${COMMON_KEYWORDS.map((item) => renderKeywordItem(item)).join('')}
        </div>
      </section>

      <section class="panel intel-cards-panel">
        <div class="section-label">资料库 · 当前卡牌</div>
        <div class="feature-list intel-tags">
          <span class="feature-tag">⛑ 第一批卡牌</span>
          <span class="feature-tag">🛠 管理员设计卡</span>
          ${FACTION_BLUEPRINTS.map((faction) => `<span class="feature-tag">${faction.name} ${SITE_CARD_LIBRARY.filter((cardInfo) => cardInfo.faction === faction.name).length} 张</span>`).join('')}
        </div>
        <section class="panel intel-batch-panel">
          <div class="intel-batch-head">
            <div>
              <div class="section-label">批次归档</div>
              <strong>资料库总览</strong>
            </div>
            <span class="batch-badge-large">🗂</span>
          </div>
          <p class="intel-card-effect">原始卡牌继续保留第一批档案；管理员新增卡会标记为“管理员设计”，方便你后面慢慢筛、慢慢改。</p>
        </section>
        ${FACTION_BLUEPRINTS.map((faction) => `
          <section class="intel-faction-section">
            <div class="intel-faction-title">${faction.name} · 资料库</div>
            <div class="intel-card-grid">
              ${SITE_CARD_LIBRARY.filter((cardInfo) => cardInfo.faction === faction.name).map((cardInfo) => renderIntelCardItem(cardInfo)).join('')}
            </div>
          </section>
        `).join('')}
      </section>

      <div class="deck-actions" style="margin-top: 18px; justify-content: flex-end;">
        <button class="btn btn-secondary" data-action="back-home">返回首页</button>
        <button class="btn btn-primary" data-action="go-decks">进入五阵营对战</button>
      </div>
    </section>
  `;
}

function renderBattle() {
  const game = state.game;
  const active = getActivePlayer(game);
  const opponent = getOpponentPlayer(game);
  return `
    <section class="screen battle-layout">
      <header class="battle-topbar panel">
        <div>
          <p class="eyebrow">steel front</p>
          <strong>战术推演台</strong>
        </div>
        <div class="base-meta">
          <span>回合 ${game.turn}</span>
          <span>阶段：${game.phase}</span>
          <span>行动方：${active.name}</span>
        </div>
        <div class="deck-actions">
          <button class="btn btn-secondary" data-action="back-home-from-battle">返回首页</button>
        </div>
      </header>

      <section class="base-grid">
        ${renderBasePanel(opponent, false)}
        ${renderBasePanel(active, true)}
      </section>

      ${renderBoardRow('敌方后方', opponent.backline, opponent.id, 'backline')}
      ${renderBoardRow('敌方前线', opponent.frontline, opponent.id, 'frontline')}
      ${renderCenterPanel(game, active)}
      ${renderBoardRow('我方前线', active.frontline, active.id, 'frontline')}
      ${renderBoardRow('我方后方', active.backline, active.id, 'backline')}
      ${renderHandPanel(active)}
      ${renderActionBar(active)}
    </section>
  `;
}

function renderBasePanel(player, isActive) {
  const reinforcementCount = player.drawPile.filter((cardId) => String(cardId).startsWith('custom_')).length;
  const game = state.game;
  const pressure = game ? countUnits(player, 'frontline') : 0;
  const openLanes = game ? countOpenTerrainLanes(player) : 0;
  const pressureText = pressure === 0 ? '前线空虚' : pressure <= 2 ? '前线薄弱' : '前线稳住';
  return `
    <article class="base-panel panel ${pressure === 0 ? 'base-panel-exposed' : ''}">
      <div class="base-panel-header">
        <div>
          <div class="label">${isActive ? '当前行动方' : '对手'}</div>
          <strong>${player.name}</strong>
          <div class="deck-meta">${player.deck.name}</div>
        </div>
        <div class="base-value">${player.baseHealth}</div>
      </div>
      <div class="base-meta">
        <span>基地血量</span>
        <span>能量 ${player.currentEnergy}/${player.maxEnergy}</span>
        <span>手牌 ${player.hand.length}</span>
        <span>牌库 ${player.drawPile.length}</span>
        <span>增援卡 ${reinforcementCount}</span>
      </div>
      <div class="base-pressure-row">
        <span class="state-chip ${pressure === 0 ? 'danger-chip' : ''}">${pressureText}</span>
        <span class="base-pressure-text">前线单位 ${pressure} / ${BOARD_SLOT_COUNT}</span>
        <span class="base-pressure-text">突破口 ${openLanes} / ${TERRAIN_LINES.length}</span>
      </div>
      ${!isActive ? `<div style="margin-top:12px"><button class="btn btn-secondary" data-base-target="${player.id}">攻击基地</button></div>` : ''}
    </article>
  `;
}

function renderBoardRow(title, units, ownerId, laneName) {
  return `
    <section class="board-row panel">
      <div class="row-header">
        <div class="row-title">${title}</div>
        <div class="terrain-legend-inline">${TERRAIN_LINES.map((terrain) => `<span class="terrain-legend-chip terrain-${terrain.id}">${terrain.shortName} · ${terrain.keyword}</span>`).join('')}</div>
      </div>
      <div class="board-terrain-grid">
        ${TERRAIN_LINES.map((terrain, terrainIndex) => renderTerrainCluster(terrain, terrainIndex, units, ownerId, laneName)).join('')}
      </div>
    </section>
  `;
}

function renderTerrainCluster(terrain, terrainIndex, units, ownerId, laneName) {
  const slotIndexes = getTerrainSlotIndexes(terrainIndex * BOARD_COLUMNS_PER_TERRAIN);
  return `
    <article class="terrain-cluster terrain-${terrain.id}">
      <div class="terrain-cluster-header">
        <div>
          <strong>${terrain.shortName}</strong>
          <span>${terrain.keyword}</span>
        </div>
        <small>${laneName === 'frontline' ? getTerrainRuleHint(terrain, 'frontline') : getTerrainRuleHint(terrain, 'backline')}</small>
      </div>
      <div class="terrain-cluster-slots">
        ${slotIndexes.map((slotIndex) => renderBoardSlot(units[slotIndex], ownerId, laneName, slotIndex)).join('')}
      </div>
    </article>
  `;
}

function getPreviewDamage(unit, ownerId) {
  const game = state.game;
  if (!game || !unit) return '';

  if (ui.actionMode === 'attack' && ui.selectedUnitId && ownerId !== game.activePlayerId) {
    const attacker = findUnit(game, ui.selectedUnitId)?.unit;
    if (!attacker) return '';
    const invalidReason = validateAttackTarget(game, attacker, unit);
    if (invalidReason) return invalidReason;
    return `预计造成 ${getProjectedDamage(game, attacker, unit)} 点伤害`;
  }

  if (ui.actionMode === 'play' && ui.selectedCardId) {
    const card = getCardById(ui.selectedCardId);
    if (!card || card.type !== 'command') return '';
    if (card.targetType !== 'enemy-unit' && card.targetType !== 'enemy-units' && card.targetType !== 'friendly-unit' && card.targetType !== 'friendly-frontline') return '';
    if (!isValidCommandTarget(card, game.activePlayerId, ownerId, ownerId === game.activePlayerId ? 'frontline' : 'frontline', unit, game)) return '这个目标不合法';
    if (card.id === 'north_101') return isUnitOnTerrain(unit, 'city') ? '会受到 3 点伤害' : '会受到 2 点伤害';
    if (card.customTemplate?.commandDoubleStrike) return '将作为双目标之一受到 2 点伤害';
    if (card.customTemplate?.markAndDamage) return '会被标记并受到 2 点伤害';
    if (card.customTemplate?.destroyDamaged) return unit.currentHealth < unit.baseHealth ? '会被直接消灭' : '必须先让它受伤';
    if (card.customTemplate?.commandDamageAll) return '会吃到前线群体伤害';
    if (card.customTemplate?.commandDamage3) return '会受到 3 点伤害';
    if (card.customTemplate?.commandDamage2 || /造成2点伤害/.test(card.effectText || '')) return '会受到 2 点伤害';
    if (/恢复|治疗|回复/.test(card.effectText || '')) return '会获得治疗';
  }

  return '';
}

function renderBoardSlot(unit, ownerId, laneName, slotIndex) {
  const classes = ['board-slot'];
  const terrain = getTerrainBySlot(slotIndex);
  classes.push(`terrain-${terrain.id}`);
  const tutorialSpotlight = getTutorialSpotlight();
  if (!unit && isDeployable(ownerId, laneName)) classes.push('deployable');
  if (unit && isHighlightedTarget(unit, ownerId, laneName)) classes.push('highlighted');
  if (unit && ui.selectedUnitId === unit.instanceId) classes.push('selected');
  if (tutorialSpotlight === 'deploy' && !unit && isDeployable(ownerId, laneName)) classes.push('tutorial-slot-target');
  if (tutorialSpotlight === 'attack' && unit) {
    if (ownerId === state.game?.activePlayerId && unit.canAttack && !unit.hasAttacked) classes.push('tutorial-slot-target');
    if (ui.actionMode === 'attack' && ui.selectedUnitId && ownerId !== state.game?.activePlayerId) classes.push('tutorial-slot-target');
  }
  const preview = unit ? getPreviewDamage(unit, ownerId) : '';

  const terrainHint = getTerrainHintText(slotIndex, laneName);

  return `
    <button class="${classes.join(' ')}" data-slot-owner="${ownerId}" data-slot-lane="${laneName}" data-slot-index="${slotIndex}">
      <div class="terrain-badge terrain-${terrain.id}">第 ${slotIndex + 1} 格</div>
      ${unit ? renderCardMini(unit, preview) : `<div class="slot-empty"><div>${isDeployable(ownerId, laneName) ? '可部署' : '空位'}</div><small>${terrain.description}</small></div>`}
      <div class="slot-terrain-note">${terrainHint}</div>
    </button>
  `;
}

function renderCardMini(unit, previewText = '') {
  const game = state.game;
  const attack = getUnitAttack(unit, game);
  const terrain = getTerrainByUnit(unit);
  const terrainTag = terrain ? `<span class="keyword-pill terrain-pill terrain-${terrain.id}">${terrain.shortName}·${terrain.keyword}</span>` : '';
  const keywords = unit.keywords.map((item) => `<span class="keyword-pill">${keywordLabel(item)}</span>`).join('');
  const customTag = unit.customEffect ? '<span class="keyword-pill">管理员卡</span>' : '';
  const stateText = unit.hasAttacked ? '已行动' : unit.canAttack ? '可攻击' : '待命';
  const stateClass = unit.hasAttacked ? 'spent' : unit.canAttack ? 'ready' : 'waiting';
  return `
    <div class="card-mini ${unit.marked ? 'marked' : ''}">
      <div>
        <div class="card-mini-name">${unit.name}</div>
        <div class="card-mini-pills">${terrainTag}${customTag}${keywords}</div>
      </div>
      <div>
        <div class="card-mini-stats"><span>${attack}攻</span><span>${unit.currentHealth}血</span></div>
        <div class="card-mini-state ${stateClass}">${stateText}</div>
        ${previewText ? `<div class="card-mini-preview">${previewText}</div>` : ''}
      </div>
    </div>
  `;
}

function getBattleSnapshot(game, active) {
  const enemy = getOpponentPlayer(game);
  const friendlyReady = getAllUnits(game, active.id).filter((unit) => unit.canAttack && !unit.hasAttacked).length;
  const enemyReady = getAllUnits(game, enemy.id).filter((unit) => unit.canAttack && !unit.hasAttacked).length;
  const basePressure = `${countOpenTerrainLanes(enemy)} 条地形突破口`;
  return [
    { label: '我方前线', value: countUnits(active, 'frontline') },
    { label: '敌方前线', value: countUnits(enemy, 'frontline') },
    { label: '可行动单位', value: friendlyReady },
    { label: '敌方可行动', value: enemyReady },
    { label: '基地路线', value: basePressure }
  ];
}

function getRecentBattleMoments(game) {
  const iconMap = {
    damage: '火力',
    heal: '治疗',
    destroy: '击破',
    system: '态势'
  };
  return game.logs.slice(-4).reverse().map((log) => ({
    ...log,
    badge: iconMap[log.type] || '记录'
  }));
}

function getFactionPowerMeta(player) {
  if (player.deck.faction === 'germany') {
    return {
      name: '闪击指挥',
      description: '强化 1 个己方单位：+1 攻击，并获得临时防护。优先强化载具。'
    };
  }
  if (player.deck.faction === 'japan') {
    return {
      name: '玉碎冲锋',
      description: '所有己方前线单位本回合攻击力 +1，并准备继续压血。'
    };
  }
  if (player.deck.faction === 'america') {
    return {
      name: '战场补给',
      description: '抽 1 张牌，你本回合下一张指令牌费用 -1。'
    };
  }
  if (player.deck.faction === 'china') {
    return {
      name: '敌后穿插',
      description: '让 1 个游击单位完成换位并获得 +1 攻击，方便持续骚扰。'
    };
  }
  return {
    name: '钢铁防线',
    description: '所有己方前线单位回复 1 点生命，并获得临时防护。'
  };
}

function renderCenterPanel(game, active) {
  const power = getFactionPowerMeta(active);
  const frontlineDelta = countUnits(active, 'frontline') - countUnits(getOpponentPlayer(game), 'frontline');
  const tactic = DECK_TACTICS[active.deck.faction];
  const phaseTip = game.turn <= 3 ? tactic.opening : game.turn <= 6 ? tactic.midgame : tactic.closer;
  const generalTip = BATTLE_TIPS[(game.turn - 1) % BATTLE_TIPS.length];
  const summary = getProgressionSummary();
  const tutorialHint = game.tutorial?.enabled ? ui.targetHint : '';
  const tutorialProgress = game.tutorial?.enabled ? game.tutorial.objectives || [] : [];
  const activeTutorialObjective = tutorialProgress.find((item) => !item.done) || tutorialProgress[0] || null;
  const battleSnapshot = getBattleSnapshot(game, active);
  const recentMoments = getRecentBattleMoments(game);
  return `
    <section class="center-panel">
      <article class="panel" style="padding:14px;">
        <div class="label">当前态势</div>
        <div class="turn-status">
          <div>回合：${game.turn}</div>
          <div>阶段：${game.phase}</div>
          <div>行动方：${active.name}</div>
          <div class="power-card">
            <strong>${power.name}</strong>
            <div>${power.description}</div>
            <div class="power-hint">前线差值：${frontlineDelta >= 0 ? '+' : ''}${frontlineDelta}；若你回合结束时前线更多且至少有 2 个单位，会触发 1 点前线压制伤害。</div>
          </div>
          <div class="power-card tactical-brief">
            <strong>${game.tutorial?.enabled ? '教学提示' : '本回合建议'}</strong>
            <div>${game.tutorial?.enabled ? tutorialHint || phaseTip : phaseTip}</div>
            <div class="power-hint">${game.tutorial?.enabled ? '这局是训练战，提示会跟着你的操作变化。' : `小提示：${generalTip}`}</div>
          </div>
          <div class="battle-snapshot-grid">
            ${battleSnapshot.map((item) => `<div class="battle-snapshot-card"><span>${item.label}</span><strong>${item.value}</strong></div>`).join('')}
          </div>
          <div style="margin-top:10px;color:var(--text-muted);">${ui.message}</div>
          ${game.tutorial?.enabled && game.tutorial.feedback ? `<div class="tutorial-feedback-banner ${game.tutorial.feedbackTone || 'info'}">${game.tutorial.feedback}</div>` : ''}
          ${game.tutorial?.enabled ? `
            <div class="tutorial-focus-card ${activeTutorialObjective?.done ? 'done' : ''}">
              <div class="section-label">当前教学目标</div>
              <strong>${activeTutorialObjective ? activeTutorialObjective.label : '核心步骤已完成'}</strong>
              <p>${activeTutorialObjective ? '先把这一小步做完，下面的目标会自动接上。' : '这局的核心训练目标都完成了，可以继续打完或换别的练习局。'}</p>
            </div>
            <div class="tutorial-objective-strip">
              ${tutorialProgress.map((item) => `<span class="state-chip tutorial-chip ${item.done ? 'done' : item.id === activeTutorialObjective?.id ? 'active' : ''}">${item.done ? '已完成' : item.id === activeTutorialObjective?.id ? '当前目标' : '待完成'} · ${item.label}</span>`).join('')}
            </div>
          ` : ''}
          <div class="battle-mission-strip">
            ${GAME_MISSIONS.map((mission) => {
              const current = summary.missionProgress[mission.id] || 0;
              const target = mission.id === 'win_once' ? 1 : 3;
              return `<span class="state-chip">${mission.label} ${current}/${target}</span>`;
            }).join('')}
          </div>
        </div>
      </article>
      <article class="panel battle-feed-panel" style="padding:14px;">
        <div class="label">最近战况</div>
        <div class="battle-feed-list">
          ${recentMoments.map((log) => `<div class="battle-feed-item ${log.type}"><span class="battle-feed-badge">${log.badge}</span><div class="battle-feed-text">${log.text}</div></div>`).join('')}
        </div>
        <div class="label" style="margin-top:14px;">完整日志</div>
        <div class="log-list">
          ${game.logs.slice(-8).map((log) => `<div class="log-entry ${log.type}">${log.text}</div>`).join('')}
        </div>
      </article>
    </section>
  `;
}

function getActiveTutorialObjective(game = state.game) {
  if (!game?.tutorial?.enabled) return null;
  return game.tutorial.objectives?.find((item) => !item.done) || null;
}

function getTutorialSpotlight(game = state.game) {
  const objective = getActiveTutorialObjective(game);
  if (!objective) return null;
  return {
    deploy: 'deploy',
    attack: 'attack',
    end_turn: 'end_turn'
  }[objective.id] || null;
}

function renderHandPanel(player) {
  const spotlight = getTutorialSpotlight();
  return `
    <section class="hand-panel panel ${spotlight === 'deploy' ? 'tutorial-spotlight-panel' : ''}">
      <div class="section-label">我方手牌</div>
      <div class="hand-cards">
        ${player.hand.map((cardId) => renderCardView(cardId, player, spotlight)).join('')}
      </div>
    </section>
  `;
}

function renderCardView(cardId, player, spotlight = getTutorialSpotlight()) {
  const card = getCardById(cardId);
  const selected = ui.selectedCardId === cardId;
  const cost = getPlayableCost(state.game, player, card);
  const disabled = player.currentEnergy < cost;
  const tutorialPlayable = spotlight === 'deploy' && card.type === 'unit' && !disabled;
  return `
    <button class="card-view ${card.faction} ${selected ? 'selected' : ''} ${disabled ? 'disabled' : ''} ${tutorialPlayable ? 'tutorial-card-target' : ''}" data-card-id="${cardId}">
      <div class="card-top">
        <div class="card-cost">${cost}</div>
        <div class="card-type">${card.type}</div>
      </div>
      <div class="card-name">${card.name}</div>
      <div class="card-faction">${getDeckById(player.deckId).factionName}</div>
      <div class="card-keywords">${(card.keywords || []).map((item) => `<span class="keyword-pill">${keywordLabel(item)}</span>`).join('')}</div>
      <div class="card-text">${card.effectText}</div>
      ${card.type === 'unit' ? `<div class="card-stats"><span>${card.attack}攻</span><span>${card.health}血</span></div>` : ''}
    </button>
  `;
}

function getTurnGuideText(active) {
  const tutorialSpotlight = getTutorialSpotlight();
  if (tutorialSpotlight === 'deploy' && !ui.selectedCardId) return '先点一张能下的单位牌，手牌区里发亮的牌就是当前推荐操作。';
  if (tutorialSpotlight === 'attack' && !ui.actionMode) return '接下来试一次攻击。先点一个己方可攻击单位，再点敌方单位。';
  if (tutorialSpotlight === 'end_turn') return '这一回合的关键动作已经体验过了，现在点右下角“结束回合”。';
  if (ui.actionMode === 'attack' && ui.selectedUnitId) return '已进入攻击模式：点敌方单位查看预计伤害，或点基地直接进攻。';
  if (ui.actionMode === 'play' && ui.selectedCardId) {
    const card = getCardById(ui.selectedCardId);
    if (!card) return '请选择下一步操作';
    if (card.type === 'unit') return '已选择单位牌：发亮的空位都可以部署。';
    if (card.targetType === 'enemy-units' || card.customTemplate?.commandDoubleStrike) return `已选择 ${ui.tempTargets?.length || 0}/2 个目标，再点一个目标或再次点击手牌确认。`;
    if (card.targetType === 'enemy-unit') return '已选择指令牌：点敌方单位，红框里会显示效果预估。';
    if (card.targetType === 'friendly-unit' || card.targetType === 'friendly-frontline') return '已选择支援/强化牌：点己方合法目标执行。';
  }
  return `这套卡组的核心打法：${DECK_TACTICS[active.deck.faction].opening}`;
}

function renderActionBar(active) {
  const power = getFactionPowerMeta(active);
  const locked = isAiTurn();
  const tactic = DECK_TACTICS[active.deck.faction];
  const tutorialSpotlight = getTutorialSpotlight();
  return `
    <section class="action-bar panel ${tutorialSpotlight === 'end_turn' ? 'tutorial-spotlight-panel' : ''}">
      <div class="action-text">
        <strong>${ui.message || '轮到你行动'}</strong>
        <div class="action-subtext">${ui.targetHint || getTurnGuideText(active) || tactic.opening}</div>
      </div>
      <div class="action-buttons">
        <button class="btn btn-secondary" data-action="cancel-selection" ${locked ? 'disabled' : ''}>取消选择</button>
        <button class="btn btn-accent" data-action="faction-power" ${active.factionPowerUsed || locked ? 'disabled' : ''}>${power.name}</button>
        ${active.hasBonusEnergy && !active.usedBonusEnergy ? `<button class="btn btn-accent" data-action="bonus-energy" ${locked ? 'disabled' : ''}>战术补给</button>` : ''}
        <button class="btn btn-primary ${tutorialSpotlight === 'end_turn' ? 'tutorial-button-target' : ''}" data-action="end-turn" ${locked ? 'disabled' : ''}>结束回合</button>
      </div>
    </section>
  `;
}

function renderModal() {
  if (ui.rewardModal) {
    const reward = ui.rewardModal;
    modalRoot.innerHTML = `
      <div class="modal-overlay reward-overlay">
        <div class="modal-card panel reward-modal">
          <p class="eyebrow">奖励到账</p>
          <h2>${reward.title}</h2>
          <p>${reward.description}</p>
          <div class="reward-highlight panel">
            <div>
              <div class="section-label">本次获得</div>
              <strong>${reward.rewardLabel}</strong>
              <p>${reward.deckName ? `新解锁卡组：${reward.deckName}` : '补给已加入库存。'}</p>
            </div>
            <div class="progression-stats compact">
              <span class="state-chip">已解锁 ${reward.unlockedDecks}/5</span>
              <span class="state-chip">补给券 ${reward.supplyTickets}</span>
              <span class="state-chip">卡包 ${reward.packs}</span>
            </div>
          </div>
          <div class="modal-actions">
            <button class="btn btn-secondary" data-action="close-reward-modal">稍后再看</button>
            <button class="btn btn-primary" data-action="reward-go-decks">去正式对战试试</button>
          </div>
        </div>
      </div>
    `;
    bindModalEvents();
    return;
  }

  const game = state.game;
  if (!game) return;

  if (game.winnerId) {
    const winner = game.players[game.winnerId];
    const summary = getProgressionSummary();
    const tutorialComplete = game.tutorial?.enabled;
    const tutorialObjectives = game.tutorial?.objectives || [];
    modalRoot.innerHTML = tutorialComplete ? `
      <div class="modal-overlay">
        <div class="modal-card panel tutorial-end-modal">
          <p class="eyebrow">训练完成</p>
          <h2>${winner.id === 'p1' ? '这一把你已经上手了' : '这把结束了，但训练目标你已经走过了'}</h2>
          <p>${game.winnerReason}。你刚刚已经实际完成了新手最核心的几个动作。</p>
          <div class="tutorial-end-summary">
            ${tutorialObjectives.map((item) => `<span class="state-chip tutorial-chip done">已学会 · ${item.label}</span>`).join('')}
          </div>
          <div class="tutorial-end-next panel">
            <div class="section-label">接下来去哪</div>
            <strong>现在最适合先去领取新手奖励</strong>
            <p>训练完成后，首页的新手作战计划里会解锁第一份奖励：德国赠送卡组、补给券和基础卡包。领完再去正式对战更顺。</p>
          </div>
          <div class="modal-actions tutorial-end-actions">
            <button class="btn btn-accent" data-action="back-training">回训练页继续练</button>
            <button class="btn btn-primary" data-action="back-decks">进入正式对战</button>
            <button class="btn btn-secondary" data-action="rematch">再打一把教学局</button>
          </div>
        </div>
      </div>
    ` : `
      <div class="modal-overlay">
        <div class="modal-card panel">
          <p class="eyebrow">战斗结束</p>
          <h2>${winner.id === 'p1' ? '玩家1获胜' : '玩家2获胜'}</h2>
          <p>${game.winnerReason}</p>
          <div class="result-summary">
            <span class="state-chip">总场次 ${summary.progression.totalGames}</span>
            <span class="state-chip">总胜场 ${summary.progression.totalWins}</span>
            <span class="state-chip">胜率 ${summary.winRate}%</span>
            <span class="state-chip">本局结束回合 ${game.turn}</span>
          </div>
          <div class="mission-list compact">
            ${GAME_MISSIONS.map((mission) => {
              const current = summary.missionProgress[mission.id] || 0;
              const target = mission.id === 'win_once' ? 1 : 3;
              const done = current >= target;
              return `<article class="mission-item ${done ? 'done' : ''}"><div><strong>${mission.label}</strong><p>${mission.description}</p></div><span>${current}/${target}</span></article>`;
            }).join('')}
          </div>
          <div class="modal-actions">
            <button class="btn btn-accent" data-action="rematch">再来一局</button>
            <button class="btn btn-secondary" data-action="back-decks">返回选卡组</button>
          </div>
        </div>
      </div>
    `;
    bindModalEvents();
    return;
  }

  if (ui.turnSwitchVisible) {
    const active = getActivePlayer(game);
    modalRoot.innerHTML = `
      <div class="modal-overlay">
        <div class="modal-card panel">
          <p class="eyebrow">回合切换</p>
          <h2>轮到 ${active.name}</h2>
          <p>请把设备交给对方后点击继续。</p>
          <div class="modal-actions">
            <button class="btn btn-accent" data-action="close-turn-switch">继续</button>
          </div>
        </div>
      </div>
    `;
    bindModalEvents();
  }
}

function keywordLabel(keyword) {
  return {
    guard: '守卫',
    charge: '突击',
    ranged: '远程',
    armor1: '装甲1',
    coordination: '协作'
  }[keyword] || keyword;
}

function isDeployable(ownerId, laneName) {
  if (ui.actionMode !== 'play' || !ui.selectedCardId) return false;
  const game = state.game;
  const active = getActivePlayer(game);
  const card = getCardById(ui.selectedCardId);
  return card.type === 'unit' && ownerId === active.id;
}

function isHighlightedTarget(unit, ownerId) {
  if (!state.game) return false;
  if (ui.actionMode === 'attack' && ui.selectedUnitId && ownerId !== state.game.activePlayerId) {
    const attacker = findUnit(state.game, ui.selectedUnitId)?.unit;
    return attacker ? !validateAttackTarget(state.game, attacker, unit) : false;
  }
  if (ui.actionMode === 'play' && ui.selectedCardId) {
    const card = getCardById(ui.selectedCardId);
    if (card.type === 'command') {
      if (card.targetType === 'enemy-unit' || card.targetType === 'enemy-units') return ownerId !== state.game.activePlayerId;
      if (card.targetType === 'friendly-unit' || card.targetType === 'friendly-frontline') return ownerId === state.game.activePlayerId;
    }
  }
  if (ui.actionMode === 'west_mark_on_deploy' || ui.actionMode === 'west_bomber_on_deploy') {
    return ownerId !== state.game.activePlayerId;
  }
  return false;
}

function bindHomeEvents() {
}

function bindTrainingEvents() {
}

function submitIntelAdminMessage() {
  const input = app.querySelector('[data-role="intel-admin-input"]');
  if (!input) return;
  const message = input.value.trim();
  if (!message) return;

  ui.intelAdminMessage = message;
  if (message === INTEL_ADMIN_PASSWORD) {
    ui.intelAdminUnlocked = true;
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(INTEL_STORAGE_KEYS.adminUnlocked, '1');
    }
  }
  if (ui.intelAdminUnlocked && /给|设计|做一张|来一张|生成/.test(message)) {
    ui.intelDraftCard = buildDraftCardFromPrompt(message);
  }
  ui.intelAdminReply = getAdminReply(message);
  render();
}

function loadReferenceUnitIntoDraft(faction, name) {
  const group = getAdminReferenceUnits().find((item) => item.faction === faction);
  const unit = group?.units.find((item) => item.name === name);
  if (!unit) return;
  ui.intelDraftCard = {
    faction,
    type: '单位',
    rarity: unit.rarity,
    cost: unit.cost,
    name: `${unit.name}改`,
    stats: unit.stats,
    keywords: [...unit.keywords],
    effect: unit.effect
  };
  ui.intelAdminMessage = `参考学习：${faction} ${unit.name}`;
  ui.intelAdminReply = `我已经把 ${unit.name} 带进表单了。现在你可以在原思路上继续改成自己的版本。`;
  ui.intelDraftTemplateHits = getTemplateHitLabels(detectCustomCardTemplate(unit.effect));
  ui.intelDraftWarnings = getCardBalanceWarnings(ui.intelDraftCard);
  ui.intelDraftScores = getCardDesignScores(ui.intelDraftCard);
  render();
}

function generateReferenceVariantDraft(faction, name) {
  const draft = buildVariantDraftFromReference(faction, name);
  if (!draft) return;
  ui.intelDraftCard = draft;
  ui.intelAdminMessage = `同风格变体：${faction} ${name}`;
  ui.intelAdminReply = `我已经基于 ${name} 变体出一张同风格新卡。你可以继续微调费用、身材和效果。`;
  ui.intelDraftTemplateHits = getTemplateHitLabels(detectCustomCardTemplate(draft.effect));
  ui.intelDraftWarnings = getCardBalanceWarnings(draft);
  ui.intelDraftScores = getCardDesignScores(draft);
  render();
}

function submitIntelCardDesign(form) {
  const formData = new FormData(form);
  const card = {
    faction: String(formData.get('faction') || '德国'),
    type: String(formData.get('type') || '单位'),
    rarity: String(formData.get('rarity') || '普通'),
    cost: Number(formData.get('cost') || 0),
    name: String(formData.get('name') || '').trim(),
    stats: String(formData.get('stats') || '-').trim() || '-',
    keywords: String(formData.get('keywords') || '').split(/[，,]/).map((item) => item.trim()).filter(Boolean),
    effect: String(formData.get('effect') || '').trim(),
    batch: '管理员设计',
    badge: '🛠'
  };

  if (!card.name || !card.effect) {
    ui.intelAdminReply = '卡名和效果不能为空，不然资料库里的卡会看起来像半成品。';
    render();
    return;
  }

  const customCards = loadCustomSiteCards();
  customCards.unshift(card);
  saveCustomSiteCards(customCards);
  refreshSiteCardLibrary();
  ui.intelAdminReply = `已加入资料库：${card.name}。你可以继续补更多卡。`;
  ui.intelAdminMessage = `请把这张卡加入资料库：${card.name}`;
  ui.intelDraftTemplateHits = getTemplateHitLabels(detectCustomCardTemplate(card.effect));
  ui.intelDraftWarnings = getCardBalanceWarnings(card);
  ui.intelDraftScores = getCardDesignScores(card);
  form.reset();
  render();
}

function submitPlayerCard(form) {
  const formData = new FormData(form);
  const card = {
    faction: String(formData.get('faction') || '德国'),
    type: String(formData.get('type') || '单位'),
    rarity: '普通',
    cost: Number(formData.get('cost') || 0),
    name: String(formData.get('name') || '').trim(),
    stats: String(formData.get('stats') || '-').trim() || '-',
    keywords: String(formData.get('keywords') || '').split(/[，,]/).map((item) => item.trim()).filter(Boolean),
    effect: String(formData.get('effect') || '').trim(),
    batch: '玩家投稿',
    badge: '📝'
  };

  const review = reviewPlayerCardSubmission(card);
  const submissions = loadPlayerSubmissions();
  submissions.unshift({ ...card, status: review.approved ? 'approved' : 'needs_changes', reviewReply: review.reply, templateHits: review.templateHits });
  savePlayerSubmissions(submissions);

  if (review.approved) {
    const customCards = loadCustomSiteCards();
    customCards.unshift({ ...card, batch: '管理员设计', badge: '🛠' });
    saveCustomSiteCards(customCards);
    refreshSiteCardLibrary();
  }

  ui.intelAdminMessage = `玩家投稿：${card.name}`;
  ui.intelAdminReply = review.reply;
  ui.intelDraftTemplateHits = review.templateHits;
  form.reset();
  render();
}

function bindIntelEvents() {
  app.querySelector('[data-action="back-home"]').addEventListener('click', () => {
    ui.screen = 'home';
    render();
  });

  app.querySelector('[data-action="go-decks"]').addEventListener('click', () => {
    ui.screen = 'decks';
    render();
  });

  const sendBtn = app.querySelector('[data-action="intel-admin-send"]');
  const input = app.querySelector('[data-role="intel-admin-input"]');
  const generateDraftFromMessage = (message, reply = '草稿已经生成好了，我把表单预填上了。你确认一下，不对就改。') => {
    if (!message) {
      ui.intelAdminReply = '先输入一句需求，比如：给日本做一张2费快攻单位。';
      render();
      return;
    }
    const draft = buildDraftCardFromPrompt(message);
    ui.intelAdminMessage = message;
    ui.intelDraftCard = draft;
    ui.intelDraftTemplateHits = getTemplateHitLabels(detectCustomCardTemplate(draft.effect));
    ui.intelDraftWarnings = getCardBalanceWarnings(draft);
    ui.intelDraftScores = getCardDesignScores(draft);
    ui.intelAdminReply = reply;
    render();
  };

  if (sendBtn && input) {
    sendBtn.addEventListener('click', submitIntelAdminMessage);
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        submitIntelAdminMessage();
      }
    });
  }

  const samplePromptButtons = Array.from(app.querySelectorAll('[data-role="intel-sample-prompt"]'));
  samplePromptButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (!input) return;
      const message = button.dataset.prompt || '';
      input.value = message;
      input.focus();
      if (button.dataset.autoGenerate === '1' && ui.intelAdminUnlocked) {
        generateDraftFromMessage(message, '我已经按这个模板示例直接生成了一张草稿，你可以直接改。');
      }
    });
  });

  app.querySelectorAll('[data-action="load-reference-unit"]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!ui.intelAdminUnlocked) {
        ui.intelAdminReply = '先输入密码进入设计模式，我再把参考牌带进表单给你改。';
        render();
        return;
      }
      loadReferenceUnitIntoDraft(button.dataset.referenceFaction || '德国', button.dataset.referenceName || '');
    });
  });

  app.querySelectorAll('[data-action="generate-reference-variant"]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!ui.intelAdminUnlocked) {
        ui.intelAdminReply = '先输入密码进入设计模式，我再帮你基于参考牌生成同风格新卡。';
        render();
        return;
      }
      generateReferenceVariantDraft(button.dataset.referenceFaction || '德国', button.dataset.referenceName || '');
    });
  });

  app.querySelectorAll('[data-action="toggle-task-check"]').forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const checks = loadTaskChecks();
      checks[checkbox.dataset.taskKey] = checkbox.checked;
      saveTaskChecks(checks);
      render();
    });
  });

  const form = app.querySelector('[data-role="intel-card-form"]');
  const generateBtn = app.querySelector('[data-action="intel-admin-generate"]');
  if (generateBtn && input) {
    generateBtn.addEventListener('click', () => {
      generateDraftFromMessage(input.value.trim());
    });
  }

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      submitIntelCardDesign(form);
    });
  }

  const playerForm = app.querySelector('[data-role="player-card-form"]');
  if (playerForm) {
    playerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      submitPlayerCard(playerForm);
    });
  }

  app.querySelectorAll('[data-action="player-submission-review"]').forEach((button) => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.submissionIndex);
      const submissions = loadPlayerSubmissions();
      const item = submissions[index];
      if (!item) return;
      const review = reviewPlayerCardSubmission(item);
      submissions[index] = { ...item, status: review.approved ? 'approved' : 'needs_changes', reviewReply: review.reply, templateHits: review.templateHits };
      savePlayerSubmissions(submissions);
      if (review.approved && !loadCustomSiteCards().some((card) => card.name === item.name && card.effect === item.effect)) {
        const customCards = loadCustomSiteCards();
        customCards.unshift({ ...item, batch: '管理员设计', badge: '🛠' });
        saveCustomSiteCards(customCards);
        refreshSiteCardLibrary();
      }
      ui.intelAdminReply = review.reply;
      ui.intelDraftTemplateHits = review.templateHits;
      render();
    });
  });
}

function handleIntelSamplePrompt(button) {
  const input = app.querySelector('[data-role="intel-admin-input"]');
  if (!input) return;
  const message = button.dataset.prompt || '';
  input.value = message;
  input.focus();
  if (button.dataset.autoGenerate === '1' && ui.intelAdminUnlocked) {
    const draft = buildDraftCardFromPrompt(message);
    ui.intelAdminMessage = message;
    ui.intelDraftCard = draft;
    ui.intelDraftTemplateHits = getTemplateHitLabels(detectCustomCardTemplate(draft.effect));
    ui.intelDraftWarnings = getCardBalanceWarnings(draft);
    ui.intelDraftScores = getCardDesignScores(draft);
    ui.intelAdminReply = '我已经按这个模板示例直接生成了一张草稿，你可以直接改。';
    render();
  }
}

function handleDelegatedAction(action, target) {
  if (action === 'go-training') {
    ui.screen = 'training';
    render();
    return;
  }
  if (action === 'go-decks' || action === 'complete-training') {
    if (action === 'complete-training') {
      const progression = loadProgression();
      if (!progression.tutorialCompleted) {
        progression.tutorialCompleted = true;
        saveProgression(progression);
      }
    }
    ui.screen = 'decks';
    render();
    return;
  }
  if (action === 'go-intel') {
    ui.screen = 'intel';
    render();
    return;
  }
  if (action === 'back-home') {
    ui.screen = 'home';
    render();
    return;
  }
  if (action === 'copy-share') {
    copyQuickStartLink();
    return;
  }
  if (action === 'training-starter-match' || action === 'training-practice-match') {
    launchQuickMatch(target.dataset.matchId || 'starter');
    return;
  }
  if (action === 'pick-starter-deck') {
    const summary = getProgressionSummary();
    ui.p1DeckId = summary.unlockedDecks.includes(getRecommendedStarterDeckId()) ? getRecommendedStarterDeckId() : (summary.unlockedDecks[0] || null);
    render();
    return;
  }
  if (action === 'claim-starter-reward') {
    const missionId = target.dataset.missionId;
    const mission = STARTER_MISSIONS.find((item) => item.id === missionId);
    const { progression, rewardText } = grantStarterMissionReward(loadProgression(), missionId);
    saveProgression(progression);
    if (!ui.p1DeckId && progression.unlockedDecks.length) ui.p1DeckId = progression.unlockedDecks[0];
    ui.message = rewardText ? `已领取：${rewardText}` : '奖励已领取';
    if (mission && rewardText) {
      const deck = mission.reward.deckId ? getDeckById(mission.reward.deckId) : null;
      ui.rewardModal = {
        title: `${mission.label} 完成`,
        description: '这一阶段的新手奖励已经入库，下一步可以继续推进后续解锁。',
        rewardLabel: rewardText,
        deckName: deck?.name || '',
        unlockedDecks: progression.unlockedDecks.length,
        supplyTickets: progression.supplyTickets,
        packs: progression.packs
      };
    }
    render();
    return;
  }
  if (action === 'mode-pvp') {
    ui.gameMode = 'pvp';
    render();
    return;
  }
  if (action === 'mode-pve') {
    ui.gameMode = 'pve';
    if (!ui.p2DeckId) ui.p2DeckId = Object.keys(DECKS)[1];
    render();
    return;
  }
  if (action === 'set-ai-difficulty') {
    ui.aiDifficulty = target.dataset.aiDifficulty;
    render();
    return;
  }
  if (action === 'start-game') {
    startGame();
    return;
  }
  if (action === 'cancel-selection') {
    clearSelection();
    ui.tempTargets = [];
    ui.message = '轮到你行动';
    render();
    return;
  }
  if (action === 'end-turn') {
    endTurn();
    return;
  }
  if (action === 'faction-power') {
    useFactionPower();
    return;
  }
  if (action === 'bonus-energy') {
    useBonusEnergy();
    return;
  }
  if (action === 'back-home-from-battle') {
    state.game = null;
    clearSelection();
    ui.turnSwitchVisible = false;
    ui.rewardModal = null;
    ui.screen = 'home';
    ui.message = '轮到你行动';
    render();
    return;
  }
  if (action === 'rematch') {
    startGame();
    return;
  }
  if (action === 'back-training') {
    state.game = null;
    ui.rewardModal = null;
    ui.screen = 'training';
    ui.trainingFocus = 'practice';
    clearSelection();
    ui.turnSwitchVisible = false;
    render();
    requestAnimationFrame(() => {
      app.querySelector('[data-training-focus="practice"]')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return;
  }
  if (action === 'back-decks') {
    state.game = null;
    ui.rewardModal = null;
    ui.screen = 'decks';
    clearSelection();
    ui.turnSwitchVisible = false;
    render();
    return;
  }
  if (action === 'close-turn-switch') {
    ui.turnSwitchVisible = false;
    ui.message = '轮到你行动';
    render();
    return;
  }
  if (action === 'close-reward-modal') {
    ui.rewardModal = null;
    render();
    return;
  }
  if (action === 'reward-go-decks') {
    ui.rewardModal = null;
    ui.screen = 'decks';
    render();
    return;
  }
  if (action === 'intel-admin-send') {
    submitIntelAdminMessage();
    return;
  }
  if (action === 'intel-admin-generate') {
    const input = app.querySelector('[data-role="intel-admin-input"]');
    if (!input) return;
    const message = input.value.trim();
    if (!message) {
      ui.intelAdminReply = '先输入一句需求，比如：给日本做一张2费快攻单位。';
      render();
      return;
    }
    const draft = buildDraftCardFromPrompt(message);
    ui.intelAdminMessage = message;
    ui.intelDraftCard = draft;
    ui.intelDraftTemplateHits = getTemplateHitLabels(detectCustomCardTemplate(draft.effect));
    ui.intelDraftWarnings = getCardBalanceWarnings(draft);
    ui.intelDraftScores = getCardDesignScores(draft);
    ui.intelAdminReply = '草稿已经生成好了，我把表单预填上了。你确认一下，不对就改。';
    render();
    return;
  }
  if (action === 'load-reference-unit') {
    if (!ui.intelAdminUnlocked) {
      ui.intelAdminReply = '先输入密码进入设计模式，我再把参考牌带进表单给你改。';
      render();
      return;
    }
    loadReferenceUnitIntoDraft(target.dataset.referenceFaction || '德国', target.dataset.referenceName || '');
    return;
  }
  if (action === 'generate-reference-variant') {
    if (!ui.intelAdminUnlocked) {
      ui.intelAdminReply = '先输入密码进入设计模式，我再帮你基于参考牌生成同风格新卡。';
      render();
      return;
    }
    generateReferenceVariantDraft(target.dataset.referenceFaction || '德国', target.dataset.referenceName || '');
    return;
  }
  if (action === 'player-submission-review') {
    const index = Number(target.dataset.submissionIndex);
    const submissions = loadPlayerSubmissions();
    const item = submissions[index];
    if (!item) return;
    const review = reviewPlayerCardSubmission(item);
    submissions[index] = { ...item, status: review.approved ? 'approved' : 'needs_changes', reviewReply: review.reply, templateHits: review.templateHits };
    savePlayerSubmissions(submissions);
    if (review.approved && !loadCustomSiteCards().some((card) => card.name === item.name && card.effect === item.effect)) {
      const customCards = loadCustomSiteCards();
      customCards.unshift({ ...item, batch: '管理员设计', badge: '🛠' });
      saveCustomSiteCards(customCards);
      refreshSiteCardLibrary();
    }
    ui.intelAdminReply = review.reply;
    ui.intelDraftTemplateHits = review.templateHits;
    render();
    return;
  }
  if (action === 'toggle-task-check') {
    const checks = loadTaskChecks();
    checks[target.dataset.taskKey] = target.checked;
    saveTaskChecks(checks);
    render();
  }
}

function bindDelegatedEvents() {
  if (state.delegatedEventsBound) return;
  state.delegatedEventsBound = true;

  document.addEventListener('click', (event) => {
    const actionTarget = event.target.closest('[data-action]');
    if (actionTarget && (app.contains(actionTarget) || modalRoot.contains(actionTarget))) {
      handleDelegatedAction(actionTarget.dataset.action, actionTarget);
      return;
    }

    const samplePrompt = event.target.closest('[data-role="intel-sample-prompt"]');
    if (samplePrompt && app.contains(samplePrompt)) {
      handleIntelSamplePrompt(samplePrompt);
      return;
    }

    const deckCard = event.target.closest('.deck-card[data-deck-id]');
    if (deckCard && app.contains(deckCard)) {
      const section = deckCard.closest('.deck-section');
      if (!section) return;
      if (section.dataset.player === 'p1' && deckCard.dataset.locked === '1') {
        ui.message = '这套卡组要先完成对应的新手任务后才能领取。';
        render();
        return;
      }
      if (section.dataset.player === 'p1') ui.p1DeckId = deckCard.dataset.deckId;
      else ui.p2DeckId = deckCard.dataset.deckId;
      render();
      return;
    }

    const cardEl = event.target.closest('[data-card-id]');
    if (cardEl && app.contains(cardEl)) {
      const cardId = cardEl.dataset.cardId;
      if ((ui.actionMode === 'play' || ui.actionMode === 'support') && ui.selectedCardId === cardId) {
        const card = getCardById(cardId);
        if ((card.id === 'red_103' || card.id === 'china_103' || card.id === 'soviet_103' || card.id === 'west_103') && ui.tempTargets?.length) {
          playCard(cardId, null, null, ui.tempTargets);
          ui.tempTargets = [];
          return;
        }
        if (card.customTemplate?.commandDoubleStrike && ui.tempTargets?.length) {
          playCard(cardId, null, null, ui.tempTargets);
          ui.tempTargets = [];
          return;
        }
      }
      ui.tempTargets = [];
      handleCardClick(cardId);
      return;
    }

    const slotEl = event.target.closest('[data-slot-owner]');
    if (slotEl && app.contains(slotEl)) {
      handleBoardSlotClick(slotEl.dataset.slotOwner, slotEl.dataset.slotLane, Number(slotEl.dataset.slotIndex));
      return;
    }

    const baseEl = event.target.closest('[data-base-target]');
    if (baseEl && app.contains(baseEl)) {
      handleBaseClick(baseEl.dataset.baseTarget);
    }
  });

  document.addEventListener('change', (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.matches('[data-action="toggle-task-check"]')) {
      handleDelegatedAction('toggle-task-check', target);
    }
  });

  document.addEventListener('submit', (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || !app.contains(form)) return;
    if (form.matches('[data-role="intel-card-form"]')) {
      event.preventDefault();
      submitIntelCardDesign(form);
      return;
    }
    if (form.matches('[data-role="player-card-form"]')) {
      event.preventDefault();
      submitPlayerCard(form);
    }
  });

  document.addEventListener('keydown', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || !app.contains(target)) return;
    if (event.key === 'Enter' && target.matches('[data-role="intel-admin-input"]')) {
      event.preventDefault();
      submitIntelAdminMessage();
    }
  });
}

bindDelegatedEvents();

function bindDeckEvents() {
}

function bindBattleEvents() {
}

function bindModalEvents() {
}
