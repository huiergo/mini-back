import React from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import Markdown from 'markdown-it';

// MD to HTML
export const mdParser = new Markdown({
  html: true,
  highlight(str, lang) {
    return hljs.highlightAuto(str).value;
  },
});

/**
 * MD组件
 * @param {String} children - md格式字符串
 */
export const MarkWidget = ({ children, style }) => {
  return (
    <div
      style={style}
      className="mark-widget"
      dangerouslySetInnerHTML={{ __html: mdParser.render(children || '') }}
    />
  );
};
export default MarkWidget;
