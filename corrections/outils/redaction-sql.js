'use strict';

function redactSql(value) {
  return value.replace(/(\bIDENTIFIED\s+BY\s*)(?:'(?:''|[^'])*'|"(?:""|[^"])*"|[^;,\s\]]+)/gi, '$1<valeur-masquee>');
}

module.exports = { redactSql };
