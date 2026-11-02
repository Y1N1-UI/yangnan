/**
 * 作者：杨楠
 * 建立时间：2026-11-02
 * 使用模型：GLM-5.3-Flash
 * 功能：新闻排行榜（tab-rank-yn.html）的选项卡脚本 —— 外部引用，
 *       实现点击排行 / 评论排行两组面板的切换
 *
 * 用法约定：
 *   1. 页面中每个排行榜组件容器加 class "yn_rank-widget"（可多个）；
 *   2. 容器内选项卡按钮加 class "yn_rank-tab"，用 data-yn-tab 指向面板 id；
 *   3. 内容面板加 class "yn_rank-panel"（选中面板额外加 yn_show）；
 *   4. 页面加载后自动初始化所有容器，无需手写调用代码。
 */
(function () {
  "use strict";

  /* 杨楠 | 2026-11-02 | GLM-5.3-Flash
   * 函数名：yn_initRankTabs
   * 简介：把一个排行榜容器初始化为选项卡组。为容器内每个 .yn_rank-tab
   *       绑定 click 事件监听；点击时先清除所有选项卡与面板的选中
   *       状态（yn_active / yn_show），再设置当前元素与对应面板。
   */
  function yn_initRankTabs(yn_widget) {
    var yn_tabs = yn_widget.querySelectorAll(".yn_rank-tab");

    yn_tabs.forEach(function (yn_btn) {
      yn_btn.addEventListener("click", function () {
        /* 第一步：清除所有选项卡的选中状态 */
        yn_tabs.forEach(function (yn_b) { yn_b.classList.remove("yn_active"); });
        yn_widget.querySelectorAll(".yn_rank-panel").forEach(function (yn_p) {
          yn_p.classList.remove("yn_show");
        });

        /* 第二步：设置当前元素的选中状态 */
        yn_btn.classList.add("yn_active");
        var yn_panel = document.getElementById(yn_btn.getAttribute("data-yn-tab"));
        if (yn_panel) { yn_panel.classList.add("yn_show"); }
      });
    });
  }

  /* 杨楠 | 2026-11-02 | GLM-5.3-Flash
   * 函数名：yn_autoInit
   * 简介：遍历页面中所有 class 为 yn_rank-widget 的容器，逐个调用
   *       yn_initRankTabs，实现组件自动复用。
   */
  function yn_autoInit() {
    document.querySelectorAll(".yn_rank-widget").forEach(yn_initRankTabs);
  }

  /* 按文档加载状态决定初始化时机，脚本放在 body 末尾或 head 中均可运行 */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", yn_autoInit);
  } else {
    yn_autoInit();
  }
})();
