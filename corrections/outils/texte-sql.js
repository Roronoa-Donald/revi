'use strict';

function sqlTextContent(node) {
  if (node.nodeName === '#text') return node.value || '';
  if (node.tagName === 'br') return '\n';
  if (['script', 'style'].includes(node.tagName)) return '';
  return (node.childNodes || []).map(sqlTextContent).join('');
}

module.exports = { sqlTextContent };
