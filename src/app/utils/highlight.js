import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

export const highlightCode = (str, lang) => {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, str).value;
    } catch (__) {}
  }

  try {
    return hljs.highlightAuto(str).value;
  } catch (__) {}

  return '';
};
