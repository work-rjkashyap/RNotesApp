import {ContentBlock, TextStyle} from '../types';

const getStyleString = (styles: TextStyle): string => {
  const styleMap: Record<string, string> = {
    bold: styles.bold ? 'font-weight: bold;' : '',
    italic: styles.italic ? 'font-style: italic;' : '',
    underline: styles.underline ? 'text-decoration: underline;' : '',
    fontSize: styles.fontSize ? `font-size: ${styles.fontSize}px;` : '',
    color: styles.color ? `color: ${styles.color};` : '',
    alignment: styles.alignment ? `text-align: ${styles.alignment};` : '',
  };

  return Object.values(styleMap).filter(Boolean).join(' ');
};

export const exportToHTML = (content: ContentBlock[]): string => {
  const blocks = content.map(block => {
    switch (block.type) {
      case 'text':
        return `<p style="${getStyleString(block.styles)}">${
          block.content
        }</p>`;
      case 'heading':
        return `<h${block.level} style="${getStyleString(block.styles)}">${
          block.content
        }</h${block.level}>`;
      case 'image':
        return `<img src="${block.content}" alt="" style="max-width: 100%; height: auto;" />`;
      case 'code':
        return `<pre><code class="language-${block.language}">${block.content}</code></pre>`;
      case 'table':
        if (!block.tableData) return '';
        const rows = block.tableData
          .map(
            row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`,
          )
          .join('');
        return `<table border="1">${rows}</table>`;
      case 'link':
        return `<a href="${block.url}" style="${getStyleString(
          block.styles,
        )}">${block.content}</a>`;
      case 'checklist':
        return `<div style="display: flex; align-items: center;">
          <input type="checkbox" ${block.checked ? 'checked' : ''} disabled />
          <span style="${getStyleString(block.styles)}">${block.content}</span>
        </div>`;
      default:
        return '';
    }
  });

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    code { background: #f5f5f5; padding: 0.2em 0.4em; border-radius: 3px; }
    table { border-collapse: collapse; width: 100%; }
    td { padding: 8px; border: 1px solid #ddd; }
  </style>
</head>
<body>
  ${blocks.join('\n')}
</body>
</html>`;
};

export const exportToMarkdown = (content: ContentBlock[]): string => {
  return content
    .map(block => {
      switch (block.type) {
        case 'text':
          let text = block.content;
          if (block.styles.bold) text = `**${text}**`;
          if (block.styles.italic) text = `*${text}*`;
          return text;

        case 'heading':
          return `${'#'.repeat(block.level || 1)} ${block.content}`;

        case 'image':
          return `![](${block.content})`;

        case 'code':
          return `\`\`\`${block.language || ''}\n${block.content}\n\`\`\``;

        case 'table':
          if (!block.tableData) return '';
          const header = block.tableData[0].map(() => '---').join(' | ');
          return (
            block.tableData.map(row => row.join(' | ')).join('\n') +
            '\n' +
            header
          );

        case 'link':
          return `[${block.content}](${block.url})`;

        case 'checklist':
          return `- [${block.checked ? 'x' : ' '}] ${block.content}`;

        default:
          return '';
      }
    })
    .join('\n\n');
};
