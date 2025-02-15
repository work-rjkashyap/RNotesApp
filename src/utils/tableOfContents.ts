export const generateTableOfContents = (
  content: ContentBlock[],
): ContentBlock[] => {
  const headings = content.filter(
    block => block.type === 'heading',
  ) as (ContentBlock & {level: number})[];

  return headings.map(heading => ({
    id: Date.now().toString(),
    type: 'link',
    content: heading.content,
    styles: {},
    url: `#${heading.content.toLowerCase().replace(/\s+/g, '-')}`,
  }));
};
