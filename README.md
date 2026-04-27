# 钢铁战线

当前版本是一个纯前端试玩站，适合直接部署到 GitHub Pages。

## 项目地址

- GitHub 仓库：`https://github.com/tonyxu-coder/kards-lite`
- 在线访问：`https://tonyxu-coder.github.io/kards-lite`

## 项目结构

- `index.html`
- `app.js`
- `styles.css`
- `manifest.webmanifest`
- `icon.svg`

## 本地运行

```bash
cd kards-lite
python3 -m http.server 8766
```

然后打开 `http://127.0.0.1:8766`。

## GitHub Pages 发布

目标仓库：`tonyxu-coder/kards-lite`

发布后的地址：

```text
https://tonyxu-coder.github.io/kards-lite
```

推荐步骤：

1. 在 GitHub 新建空仓库 `kards-lite`
2. 把这个目录里的文件上传到仓库根目录
3. 打开 GitHub 仓库的 `Settings -> Pages`
4. `Build and deployment` 选择 `Deploy from a branch`
5. Branch 选择 `main`，Folder 选择 `/ (root)`
6. 保存后等几分钟，访问发布地址

## 适合直接发给同学的链接

首页入口：

```text
https://tonyxu-coder.github.io/kards-lite
```

直接进入 AI 对战：

```text
https://tonyxu-coder.github.io/kards-lite/?screen=battle&mode=pve&p1=north_armor_push&p2=red_blitz_rush&autostart=1
```

## 当前版本说明

- 这是纯前端试玩版，不需要后端
- 适合分享试玩，不适合防抄正式发布
- 如果后面要公开长期运营，建议把核心逻辑和数据逐步移到服务端
