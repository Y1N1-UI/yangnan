/*
 * 作者：杨楠
 * 建立时间：2026-11-12
 * 使用模型：GLM-5.3-Flash
 * 功能：poems 数据服务器 —— 提供 /api/poems 诗词接口与 /api/authors 作者接口，
 *       并托管项目根目录静态页面，端口 3004
 * 启动方式：在 db 目录下执行 node server.js（依赖已安装的 express）
 */

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3004;

/*
 * 函数名：yn_readDb
 * 简介：同步读取同目录下的 db.json 并 JSON.parse 成对象，供两个接口共用
 */
function yn_readDb() {
  const raw = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8');
  return JSON.parse(raw);
}

/*
 * 函数名：（GET /api/poems 路由处理）
 * 简介：返回 db.json 里的 poems 数组（每条含 pic / title / content / author）
 */
app.get('/api/poems', (req, res) => {
  // 允许跨域：页面用 file:// 直接打开时也能请求本接口
  res.set('Access-Control-Allow-Origin', '*');
  res.json(yn_readDb().poems);
});

/*
 * 函数名：（GET /api/authors 路由处理）
 * 简介：第二个接口，返回 db.json 里的 authors 数组（作者名、朝代、作品）
 */
app.get('/api/authors', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.json(yn_readDb().authors);
});

/*
 * 函数名：（express.static 中间件挂载）
 * 简介：把项目根目录（db 的上一级）作为静态资源目录托管，
 *       浏览器可通过 http://localhost:3004/poems-wall-yn.html 直接访问页面
 */
app.use(express.static(path.join(__dirname, '..')));

/*
 * 函数名：（服务器启动监听）
 * 简介：在 3004 端口启动 HTTP 服务，启动成功后向控制台打印两个接口地址
 */
app.listen(PORT, () => {
  console.log(`数据服务器已启动：http://localhost:${PORT}/api/poems`);
  console.log(`作者接口已就绪：http://localhost:${PORT}/api/authors`);
});
