/**
 * 作者：杨楠
 * 建立时间：2026-11-02
 * 使用模型：GLM-5.3-Flash
 * 功能：通用选项卡（Tab）组件 —— 可被任意页面复用
 *
 * 用法约定：
 *   1. 选项卡容器加 class "yn_tabs"（页面可有多个，互不影响）；
 *   2. 容器内每个标签按钮加 class "yn_tab-btn"，并用 data-yn-tab 属性
 *      指向对应面板的 id；
 *   3. 每个内容面板加 class "yn_tab-panel"（选中面板额外加 yn_show）；
 *   4. 页面加载后本脚本自动初始化所有 .yn_tabs 容器，无需手写调用代码。
 */
(function () {
  "use strict";

  /* 杨楠 | 2026-11-02 | GLM-5.3-Flash
   * 函数名：yn_initTabs
   * 简介：把一个容器初始化为选项卡组。为容器内每个 .yn_tab-btn 绑定
   *       click 事件监听；点击时先清除所有按钮与面板的选中状态，
   *       再设置当前按钮与对应面板的选中状态（核心教学要求）。
   */
  function yn_initTabs(yn_group) {
    var yn_btns = yn_group.querySelectorAll(".yn_tab-btn");

    yn_btns.forEach(function (yn_btn) {
      yn_btn.addEventListener("click", function () {
        /* 第一步：清除所有选项卡的选中状态 */
        yn_btns.forEach(function (yn_b) {
          yn_b.classList.remove("yn_active");
        });
        yn_group.querySelectorAll(".yn_tab-panel").forEach(function (yn_p) {
          yn_p.classList.remove("yn_show");
        });

        /* 第二步：设置当前元素的选中状态 */
        yn_btn.classList.add("yn_active");
        var yn_panel = document.getElementById(yn_btn.getAttribute("data-yn-tab"));
        if (yn_panel) {
          yn_panel.classList.add("yn_show");
        }
      });
    });
  }

  /* 杨楠 | 2026-11-02 | GLM-5.3-Flash
   * 函数名：yn_autoInit
   * 简介：遍历页面中所有 class 为 yn_tabs 的容器，逐个调用 yn_initTabs，
   *       实现组件的自动复用——新增一个选项卡组无需改动本文件。
   */
  function yn_autoInit() {
    document.querySelectorAll(".yn_tabs").forEach(yn_initTabs);
  }

  /* 按文档加载状态决定初始化时机，保证脚本放在 body 末尾或 head 中均可运行 */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", yn_autoInit);
  } else {
    yn_autoInit();
  }
})();
