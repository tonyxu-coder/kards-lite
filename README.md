# 钢铁战线

一个用原生 `HTML + CSS + JavaScript` 制作的浏览器战术卡牌小游戏。  
当前版本主打“打开网页就能直接开打”，支持新手训练、五阵营卡组选择、AI 对战、双人本地对战、资料库查看和自定义卡牌投稿。

## 项目地址

- GitHub 仓库：`https://github.com/tonyxu-coder/kards-lite`
- 在线试玩：`https://tonyxu-coder.github.io/kards-lite`

## 这个项目现在已经做了什么

当前版本已经不是只有一个战斗页面，而是一个完整的前端试玩站，包含下面这些内容：

- 首页：展示游戏入口、当前进度、分享链接和新手主线任务
- 新手训练：讲解卡牌类型、关键词、基本回合流程，并提供推荐练习局
- 正式对战：支持五个阵营卡组选择
- AI 对战：支持 `普通 / 困难 / 老兵` 三档难度
- 双人对战：可在一台电脑上本地轮流操作
- 资料库页面：展示五阵营蓝图、公共关键词、当前卡牌资料
- 自定义卡牌系统：支持玩家投稿，也支持管理员模式造卡
- GitHub Pages 部署：静态站点可直接分享给同学试玩

## 当前版本核心内容

### 1. 五个阵营

当前可选阵营和主打法如下：

- 德国：装甲推进，核心风格是“协作”
- 美国：空地联动，核心风格是“团结”
- 日本：快攻爆发，核心风格是“玉碎”
- 中国：游击拉扯，核心风格是“游击”
- 苏联：厚前排反推，核心风格是“坚守”

### 2. 五套正式卡组

当前内置卡组：

- `germany_armor_push`：装甲推进
- `america_air_control`：空地联动
- `japan_banzai_charge`：决死突击
- `china_guerrilla_screen`：敌后游击
- `soviet_iron_front`：钢铁防线

### 3. 四种基础地形

战场按地形分区，当前包含：

- 丛林：更适合配合同排友军减伤
- 城市：前线攻击更强
- 雪地：前线更耐打
- 高地：后排火力更强

### 4. 三类卡牌

- 单位牌：上场占位，有攻击和生命
- 战术牌：打出后立刻生效
- 支援牌：留在场上提供持续效果

### 5. 新手成长系统

项目里已经做了一个简单的新手解锁链，不是一开始就把所有东西全塞给玩家：

- 完成训练后解锁德国入门卡组
- 赢第一场后解锁日本卡组
- 完成 3 场对战后解锁苏联卡组
- 用 2 个不同阵营赢过后解锁美国卡组
- 击败 AI 3 次后解锁中国卡组

同时还会记录：

- 总对战场数
- 总胜场
- AI 胜场
- 常用卡组
- 各阵营胜场
- 补给券和卡包数量

## 怎么玩

如果你是第一次打开，建议顺序是：

1. 先进入训练页
2. 看懂单位、战术、支援三种卡牌的区别
3. 体验一局推荐训练战
4. 进入正式对战页面选卡组
5. 先打 `AI 对战`
6. 熟悉后再试双人对战或不同阵营

一局对战里最重要的几个点：

- 先看费用，确认当前能量够不够
- 单位需要部署到前线或后线
- 前线被打空后，敌人就能更容易威胁基地
- 支援牌不是一次性效果，会持续提供帮助
- 不同阵营不只是换皮，节奏完全不同

## 页面入口说明

项目当前主要有 5 个页面状态：

- `home`：首页
- `training`：训练页
- `decks`：正式对战选卡组
- `intel`：资料库
- `battle`：战斗页面

这些页面都可以通过 URL 参数直接进入。

## 一键分享和 URL 参数

这个项目支持把当前配置直接变成链接，发给别人后对方打开就能进入指定页面甚至直接开局。

### 常用分享链接

首页：

```text
https://tonyxu-coder.github.io/kards-lite
```

直接进入训练页：

```text
https://tonyxu-coder.github.io/kards-lite/?screen=training
```

直接进入资料库：

```text
https://tonyxu-coder.github.io/kards-lite/?screen=intel
```

直接进入 AI 对战并自动开局：

```text
https://tonyxu-coder.github.io/kards-lite/?screen=battle&mode=pve&difficulty=normal&p1=germany_armor_push&p2=japan_banzai_charge&autostart=1
```

### 支持的 URL 参数

- `screen`：页面入口，可选 `home`、`training`、`decks`、`intel`、`battle`
- `mode`：对战模式，可选 `pvp`、`pve`
- `difficulty`：AI 难度，可选 `normal`、`hard`、`veteran`
- `p1`：玩家 1 卡组 id
- `p2`：玩家 2 或 AI 卡组 id
- `autostart=1`：如果参数合法，打开链接后直接开始战斗

### 可用卡组 id

- `germany_armor_push`
- `america_air_control`
- `japan_banzai_charge`
- `china_guerrilla_screen`
- `soviet_iron_front`

## 本地运行

这个项目不需要后端，也不依赖打包器。最简单的启动方式：

```bash
cd kards-lite
python3 -m http.server 8766
```

然后打开：

```text
http://127.0.0.1:8766
```

如果你是双击运行，也可以试试仓库里的：

```text
start_local.command
```

## 项目结构

当前仓库结构比较简单：

- `index.html`：页面入口
- `app.js`：主要游戏逻辑、页面渲染、规则、AI、训练、资料库功能
- `styles.css`：整体界面样式
- `manifest.webmanifest`：PWA 基础配置
- `icon.svg`：站点图标
- `README.md`：项目说明
- `AGENTS.md`：开发规则文档
- `start_local.command`：本地快速启动脚本

## 代码里现在有哪些重要模块

如果你以后继续开发，建议先从这些部分理解：

- 卡组定义：`DECKS`
- 阵营蓝图：`FACTION_BLUEPRINTS`
- 公共关键词：`COMMON_KEYWORDS`
- 阵营资料库卡牌种子：`SITE_CARD_SEEDS`
- 地形规则：`TERRAIN_LINES`
- 新手任务：`STARTER_MISSIONS`
- 通用任务：`GAME_MISSIONS`
- 快速对局模板：`QUICK_MATCHES`
- AI 难度：`AI_DIFFICULTIES`
- URL 状态同步：`applyUrlState()`、`buildShareUrl()`

简单理解就是：

- 如果你想加卡组，看 `DECKS`
- 如果你想加阵营资料页，看 `FACTION_BLUEPRINTS` 和 `SITE_CARD_SEEDS`
- 如果你想改训练或奖励，看 `STARTER_MISSIONS`
- 如果你想改分享链接和页面跳转，看 URL 相关函数
- 如果你想改真正的玩法，就继续往战斗逻辑和渲染逻辑里看

## 本地存档说明

这个项目会使用浏览器 `localStorage` 保存数据。当前主要会存这些内容：

- 对战进度和新手解锁：`kards-lite.progression`
- 自定义管理员卡牌：`kards-lite.custom-cards`
- 玩家投稿卡牌：`kards-lite.player-submissions`
- 资料库管理员解锁状态：`kards-lite.admin-unlocked`
- 任务勾选状态：`kards-lite.task-checks`

这意味着：

- 换浏览器可能看不到原来的本地进度
- 清空浏览器缓存后，本地存档可能消失
- GitHub Pages 版也能记录本地进度，但只存在你自己的浏览器里

## GitHub Pages 部署

这个项目已经部署到 GitHub Pages。

- 仓库：`tonyxu-coder/kards-lite`
- 地址：`https://tonyxu-coder.github.io/kards-lite`

如果以后要继续重新部署，最常见的方式是：

1. 把文件提交到 GitHub 仓库的 `main` 分支
2. 打开仓库 `Settings -> Pages`
3. `Build and deployment` 选择 `Deploy from a branch`
4. Branch 选择 `main`
5. Folder 选择 `/ (root)`
6. 保存后等待几分钟

## 适合继续开发的方向

如果你后面继续做，这些方向都很适合逐步推进：

- 增加更多卡牌和阵营代表卡
- 把战斗日志做得更清楚
- 增加更完整的规则说明页
- 继续优化 AI 判断
- 增加更多训练关卡
- 增加卡包和收集系统
- 增加音效、动画和命中反馈
- 优化手机端排版

## 当前项目定位

这仍然是一个非常适合继续迭代的“纯前端试玩版”：

- 优点是部署简单、分享方便、改起来快
- 缺点是核心逻辑都在前端，不适合做防破解或正式商业化运营

如果以后只是做作品展示、同学试玩、继续练习做游戏，这种结构非常合适。  
如果以后要做长期公开运营，再考虑后端、账号系统和更完整的数据结构也不迟。
