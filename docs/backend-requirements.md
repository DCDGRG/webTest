# 后端需求文档 — 上海奎星电子科技官网

> 状态：**规划文档**（不含实现）。
> 目的：明确官网后端应提供的能力、API、数据模型与部署要求，作为后续开发与评审依据。

---

## 1. 背景与现状

- 前端为 React + Vite 单页应用，目前**以纯静态站点（nginx on Cloud Run）部署**。
- 仓库内已存在一个 Express + better-sqlite3 后端原型（`backend/`，含鉴权与新闻 API），但**未部署到生产**。因此：
  - `/admin/*` 后台（登录、新闻 CMS、设置）在线上**不可用**（`/api/*` 请求被 SPA fallback 返回 HTML，前端解析报错）。
  - 公开新闻读取静态 `frontend/public/data/news.json`（由 GitHub Actions 定时聚合），**不依赖后端**。
  - 联系表单走 EmailJS 客户端发信，**不落库、无后端记录**。

本档定义“后端应当具备”的目标态，使后台可用、表单线索可留存、新闻可由运营自管。

---

## 2. 目标（Goals）

1. 提供安全的**管理员鉴权**与受保护的后台 API。
2. 提供**新闻/资讯的增删改查（CMS）**，供运营在后台维护，同时对外暴露只读接口。
3. 提供**联系表单线索的接收与存储**（即使前端仍用 EmailJS，也应有一份服务端记录 + 反垃圾）。
4. 可在 **Cloud Run** 稳定运行，数据**持久化**（当前 SQLite 在 Cloud Run 上是临时文件系统，重启即丢）。
5. 与前端解耦：通过 `/api/*` REST 接口交互，CORS/安全头规范。

## 3. 非目标（Non-Goals）

- 不做多租户/多站点。
- 不做复杂工作流/审批。
- 富文本编辑器、媒体库等可作为后续迭代，不在首版强制。

---

## 4. 功能需求

### 4.1 鉴权与账户
- 管理员使用**用户名 + 密码**登录，返回 **JWT**（短时效）。
- 密码使用 **bcrypt** 哈希存储，禁止明文。
- 支持**修改密码**。
- 登录接口需**限流**（防爆破）。
- 首次部署支持通过种子脚本/环境变量创建初始管理员。

### 4.2 新闻 / 资讯（News）
- 公开：分页列出**已发布**新闻、按 `category`（`industry` / `technical`）过滤、获取单篇。
- 后台（需鉴权）：创建、更新、删除；可切换 `is_published`；可设 `published_at`。
- 字段与前端 `NewsItem` 对齐（见 6.2），含可选 `content`（站内全文）与 `url`（外链原文）。
- 兼容现有“静态聚合”：后端可选地**接管聚合任务**（把 `fetch-news` 逻辑移到服务端定时任务并写库），或继续由 GitHub Actions 生成静态 JSON，二选一（见 8）。

### 4.3 联系表单线索（Contact submissions）
- 接收前端提交：姓名、邮箱、电话、公司、行业、体量、时间、材料方向、留言。
- **服务端校验** + **反垃圾**（蜜罐字段 / 速率限制 / 可选 hCaptcha/Turnstile）。
- 存库并可选**邮件通知**销售邮箱（替代或叠加 EmailJS）。
- 后台可列出 / 标记已处理 / 导出。

### 4.4 健康检查
- `GET /api/health` 返回服务与数据库状态，供 Cloud Run/监控探活。

---

## 5. API 接口设计（REST，前缀 `/api`）

> 约定：JSON 请求/响应；鉴权接口需 `Authorization: Bearer <JWT>`；错误统一 `{ "error": "..." }` + 合适状态码。

### 5.1 Auth
| 方法 | 路径 | 鉴权 | 说明 |
|---|---|---|---|
| POST | `/api/auth/login` | 否 | body `{ username, password }` → `{ token, admin: { id, username } }`；登录失败 401；限流 |
| GET | `/api/auth/me` | 是 | 校验 token → `{ admin: { id, username } }` |
| POST | `/api/auth/change-password` | 是 | body `{ currentPassword, newPassword }` → `{ message }` |

### 5.2 News
| 方法 | 路径 | 鉴权 | 说明 |
|---|---|---|---|
| GET | `/api/news` | 否 | query `page, limit(≤50), category, includeUnpublished` → `{ news[], pagination }`；**`includeUnpublished=true` 必须要求鉴权**（公开请求强制只返回已发布） |
| GET | `/api/news/:id` | 否 | 单篇；未发布的对匿名返回 404 |
| POST | `/api/news` | 是 | 创建；校验 `category ∈ {industry, technical}`；`title` 必填 |
| PUT | `/api/news/:id` | 是 | 更新（部分字段） |
| DELETE | `/api/news/:id` | 是 | 删除 → 204 |

### 5.3 Contact
| 方法 | 路径 | 鉴权 | 说明 |
|---|---|---|---|
| POST | `/api/contact` | 否 | 提交线索；服务端校验 + 反垃圾；成功 201 `{ id }` |
| GET | `/api/contact` | 是 | 后台分页列出线索 |
| PATCH | `/api/contact/:id` | 是 | 标记状态（new/handled/spam） |

### 5.4 Health
| 方法 | 路径 | 鉴权 | 说明 |
|---|---|---|---|
| GET | `/api/health` | 否 | `{ status, db, timestamp }` |

---

## 6. 数据模型

### 6.1 Admin
| 字段 | 类型 | 说明 |
|---|---|---|
| id | int (PK) | |
| username | string (unique) | |
| password_hash | string | bcrypt |
| created_at | datetime | |

### 6.2 NewsItem
| 字段 | 类型 | 说明 |
|---|---|---|
| id | string (PK, uuid) | |
| title | string | 必填 |
| summary | string \| null | 摘要 |
| content | text \| null | 站内全文（有则站内详情页，无则外链 `url`） |
| url | string \| null | 原文外链 |
| published_at | datetime | 排序用 |
| source_name | string | 来源 |
| category | enum(`industry`,`technical`) | |
| image_url | string \| null | |
| is_published | bool | 默认 true |
| created_at | datetime | |

> 与前端 `frontend/src/types/News.ts` 字段保持一致；布尔在 SQLite 以 0/1 存、API 出参转 `boolean`。

### 6.3 ContactSubmission
| 字段 | 类型 | 说明 |
|---|---|---|
| id | string (PK, uuid) | |
| name | string | |
| email | string | |
| phone | string \| null | |
| company | string \| null | |
| industry / volume / timeline | string \| null | |
| materials | string (JSON/CSV) | 多选材料 |
| message | text | |
| status | enum(`new`,`handled`,`spam`) | 默认 new |
| created_at | datetime | |
| ip / user_agent | string \| null | 风控用 |

---

## 7. 安全要求

- JWT：短时效 + 服务端密钥经环境变量注入（**不得硬编码**）；前端 token 存储建议评估 `httpOnly` Cookie 方案以降低 XSS 风险（当前原型用 `localStorage`）。
- 密码 bcrypt（cost ≥ 10）。
- **限流**：登录、`/api/contact` 必加。
- **CORS**：仅放行生产域名。
- **安全头**：开启 `helmet`，**生产启用 CSP**（当前原型 `contentSecurityPolicy: false`，上线前需修正）。
- 输入校验与参数化查询（防 SQL 注入；better-sqlite3 用预编译语句）。
- 反垃圾：蜜罐字段 + 速率限制 + 可选验证码。

---

## 8. 部署与基础设施

- 运行环境：**Cloud Run**（容器）。
- **持久化（关键）**：Cloud Run 文件系统是临时的，**SQLite 文件重启即丢**。需二选一：
  1. 迁移到托管数据库（**Cloud SQL / Postgres** 等）；或
  2. 将 SQLite 挂载到**持久卷**（如 GCS FUSE / Filestore），并接受其并发与一致性限制。
  推荐方案 1（生产可靠）。
- 部署形态二选一：
  - **A. 全栈单服务**：Node 服务同时提供 `/api/*` 与静态前端（仓库已有 `Dockerfile` 是该形态）。
  - **B. 前后端分离**：保持现有 `Dockerfile.frontend`（nginx 静态）+ 独立后端服务，前端 `/api` 反代到后端。
- 环境变量：`JWT_SECRET`、`DATABASE_URL/PATH`、`CORS_ORIGIN`、初始管理员、（如启用）`EMAILJS_*` 或 SMTP、验证码密钥。
- 健康检查、结构化日志、错误上报。

### 新闻聚合的归属
- 现状：GitHub Actions 定时跑 `frontend/scripts/fetch-news.mjs` → 生成静态 `news.json`。
- 若后端上线，可将聚合改为**后端定时任务写库**，前端改读 `/api/news`；或维持静态方案、后端仅管“自有原创文章”。需明确单一数据源，避免两套并存。

---

## 9. 验收标准（首版）

- [ ] 管理员可登录后台并维护新闻（增删改、发布/下架），公开页实时反映。
- [ ] 公开新闻接口对匿名用户**不泄露未发布内容**。
- [ ] 联系表单提交可落库 + 通知 + 反垃圾生效。
- [ ] 数据在服务重启后**不丢失**。
- [ ] 生产启用 CSP、CORS 限定域名、登录限流。
- [ ] `GET /api/health` 探活通过。
