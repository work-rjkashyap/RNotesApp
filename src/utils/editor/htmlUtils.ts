export const sanitizeHTML = (html: string): string => {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+="[^"]*"/g, '')
    .replace(/javascript:/g, '');
};

export const extractPlainText = (html: string): string => {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || '';
};

export const generateEditorHTML = (content: string, theme: any): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <style>
          body {
            margin: 0;
            padding: 16px;
            background-color: ${theme.background};
            color: ${theme.text};
            font-family: 'Poppins-Regular';
            font-size: 16px;
            line-height: 1.5;
          }

          img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            margin: 8px 0;
          }

          a {
            color: ${theme.primary};
            text-decoration: none;
          }

          blockquote {
            margin: 16px 0;
            padding: 8px 16px;
            border-left: 4px solid ${theme.primary};
            background-color: ${theme.primary}15;
          }

          code {
            background-color: ${theme.secondary}15;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: monospace;
            font-size: 14px;
          }

          pre {
            background-color: ${theme.secondary}15;
            padding: 16px;
            border-radius: 8px;
            overflow-x: auto;
            margin: 16px 0;
          }

          pre code {
            background-color: transparent;
            padding: 0;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin: 16px 0;
          }

          th, td {
            border: 1px solid ${theme.secondary}30;
            padding: 8px;
          }

          th {
            background-color: ${theme.secondary}15;
          }

          ul, ol {
            padding-left: 24px;
            margin: 16px 0;
          }

          li {
            margin: 8px 0;
          }

          h1, h2, h3, h4, h5, h6 {
            color: ${theme.text};
            margin: 16px 0;
          }

          h1 { font-size: 24px; font-family: 'Poppins-Bold'; }
          h2 { font-size: 20px; font-family: 'Poppins-Bold'; }
          h3 { font-size: 18px; font-family: 'Poppins-SemiBold'; }
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `;
};

export const processEditorContent = (html: string): string => {
  // Remove empty paragraphs
  let processed = html.replace(/<p>\s*<\/p>/g, '');

  // Fix list spacing
  processed = processed.replace(/<\/(ul|ol)>\s*<(ul|ol)>/g, '</$1>\n<$2>');

  // Fix image spacing
  processed = processed.replace(/<img/g, '<img style="display: block;"');

  // Fix blockquote spacing
  processed = processed.replace(
    /<\/blockquote>\s*<blockquote>/g,
    '</blockquote>\n<blockquote>',
  );

  return processed;
};

export const createLinkHTML = (url: string, text: string): string => {
  return `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;
};

export const createCodeBlockHTML = (
  code: string,
  language: string = '',
): string => {
  return `
    <pre><code class="language-${language}">
      ${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
    </code></pre>
  `;
};
