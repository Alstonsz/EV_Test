# EV 充电测试报告系统 (EV Charging Test Report System)

## 1. 身份认证与安全 (Authentication & Security)
### 1.1 Active Directory (AD/LDAP) 域控接入
- LDAP 服务器配置 (URL, Base DN)
- 服务账号绑定与查询
### 1.2 Windows SSO 单点登录
- Kerberos / NTLM 凭据验证
- 域账号无缝登录
### 1.3 权限与用户管理
- 域账号自动映射本地用户
- 角色权限控制 (RBAC：测试员、审核员、管理员)
- 登录日志与审计

## 2. 核心业务模块 (Core Business Modules)
### 2.1 进行中测试 (Ongoing Tests)
- 项目信息录入 (样品、公司、规格)
- 测试状态监控 (运行、暂停、完成)
- 实时数据采集与记录
### 2.2 已完成测试 (Completed Tests)
- 历史测试记录查询与追溯
- 测试结果审核 (PASS/FAIL/NT)
- 详情查看
### 2.3 TRF 报告生成 (TRF Generation)
- 标准模板匹配 (IEC 61851, GB/T 18487等)
- 测试数据自动映射与填充
- 一键导出 (PDF / Word 格式)
### 2.4 原始测试数据 (Raw Data)
- 数据多维度检索与过滤
- 原始数据 CSV 批量导出
- 数据完整性校验
### 2.5 测试设备选择 (Equipment Selection)
- 设备台账管理 (示波器、功率分析仪、电子负载等)
- 设备状态监控 (空闲、使用中、维护/校准)
- 校准周期预警管理
### 2.6 测试流程配置 (Test Flow Config)
- 模块化架构 (按标准 Clause 拆分)
- 标准测试流程库 (内置不可改)
- 个人自定义流程 (可视化的模块组合与排序)

## 3. 系统配置与管理 (System Configuration)
### 3.1 域控接入配置 (AD Config)
- 连接参数设置与连通性测试
### 3.2 数据库配置 (Database Config)
- 外部数据库连接 (MySQL/PostgreSQL)
- 测试数据与设备运行时长自动同步
### 3.3 标准与条款管理 (Standards Management)
- 各国/地区测试标准维护
- 具体测试条款与要求编辑
### 3.4 模板管理 (Template Management)
- TDS (测试数据表) 模板上传
- TRF (测试报告格式) 模板上传与版本控制
### 3.5 统计与日志 (Stats & Logs)
- 设备使用次数与累计时长统计
- 系统操作与同步状态监控

## 4. 部署与系统架构 (Deployment Architecture)
### 4.1 客户端 (Client)
- 纯 Web 浏览器访问 (跨平台)
- 响应式 UI (React + Tailwind)
### 4.2 服务端 (Server)
- Linux 服务器部署
- Node.js 后端服务 (处理 AD 认证、文件生成)
### 4.3 数据层 (Data Layer)
- 本地 SQLite / JSON (轻量级存储)
- 远程关系型数据库 (核心数据同步)
