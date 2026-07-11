const fs = require('fs');
const html = fs.readFileSync('d:/T2L-site/app/DocEngine.html', 'utf8');
const start = html.lastIndexOf('<section class="pad-t"><div class="wrap"><div class="cta-band');
const end = html.indexOf('</section>', start) + 10;
console.log("HTML:");
console.log(html.substring(start, end));

const postcss = require('postcss');
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/i);
if (styleMatch) {
  const css = styleMatch[1];
  const targetClasses = ['.cta-band', '.nglow', '.btn-gold', '.btn-ghost', '.btn-row'];
  const root = postcss.parse(css);
  const extracted = [];
  root.walk(node => {
    if (node.type === 'rule' && node.parent.type !== 'atrule') {
      if (targetClasses.some(c => node.selector.includes(c))) {
        extracted.push(node.toString());
      }
    } else if (node.type === 'atrule' && node.name === 'media') {
      let hasTarget = false;
      const matchedRules = [];
      node.walkRules(rule => {
        if (targetClasses.some(c => rule.selector.includes(c))) {
          hasTarget = true;
          matchedRules.push(rule.toString());
        }
      });
      if (hasTarget) {
        extracted.push('@media ' + node.params + ' {\n' + matchedRules.join('\n') + '\n}');
      }
    }
  });
  console.log("CSS:");
  console.log(extracted.join('\n\n'));
}
