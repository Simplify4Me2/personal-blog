import type { ReactNode } from 'react'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6
type CalloutKind = 'Warning' | 'Tip' | 'Information'

type MarkdownBlock =
  | { type: 'code'; code: string }
  | { type: 'heading'; level: HeadingLevel; text: string }
  | { type: 'rule' }
  | { type: 'callout'; kind: CalloutKind; title: string; body: string }
  | { type: 'quote'; lines: string[] }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'table'; header: string[]; rows: string[][] }
  | { type: 'paragraph'; text: string }

const ORDERED_ITEM = /^\d+\.\s+/
const UNORDERED_ITEM = /^[-*]\s+/
const CALLOUT = /^\*\*(Warning|Tip|Information):\s*(.*?)\*\*$/
const CALLOUT_ICONS: Record<CalloutKind, string> = {
  Warning: 'warning',
  Tip: 'tip',
  Information: 'info',
}

function isBlockStart(line: string) {
  return /^(#{1,6}\s|---\s*$|```|>\s?|[-*]\s+|\d+\.\s+|\|)/.test(line)
}

// Returns the consecutive raw lines from `start` whose trimmed text satisfies `predicate`.
function takeWhile(lines: string[], start: number, predicate: (trimmed: string) => boolean) {
  const taken: string[] = []
  for (const line of lines.slice(start)) {
    if (!predicate(line.trim())) break
    taken.push(line)
  }
  return taken
}

function parseTable(rowLines: string[]): MarkdownBlock {
  const [header = [], ...rows] = rowLines
    .map((row) => row.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim()))
    .filter((cells) => !cells.every((cell) => /^:?-{3,}:?$/.test(cell)))
  return { type: 'table', header, rows }
}

function parseQuote(rawLines: string[]): MarkdownBlock {
  const lines = rawLines.map((line) => line.trim().replace(/^>\s?/, '').trim())
  const [first = '', ...rest] = lines
  const match = CALLOUT.exec(first)
  const kind = match?.[1] as CalloutKind | undefined
  if (kind) {
    return { type: 'callout', kind, title: match?.[2] ?? '', body: rest.join(' ').trim() }
  }
  return { type: 'quote', lines }
}

function parseMarkdown(content: string): MarkdownBlock[] {
  const lines = content.split('\n')
  const blocks: MarkdownBlock[] = []
  let index = 0

  while (index < lines.length) {
    const line = (lines[index] ?? '').trim()

    if (!line) {
      index += 1
      continue
    }

    if (line.startsWith('```')) {
      const codeLines = takeWhile(lines, index + 1, (text) => !text.startsWith('```'))
      blocks.push({ type: 'code', code: codeLines.join('\n') })
      index += codeLines.length + 2
      continue
    }

    const heading = /^(#{1,6})\s+(.*)$/.exec(line)
    if (heading) {
      blocks.push({
        type: 'heading',
        level: (heading[1]?.length ?? 1) as HeadingLevel,
        text: heading[2] ?? '',
      })
      index += 1
      continue
    }

    if (/^---\s*$/.test(line)) {
      blocks.push({ type: 'rule' })
      index += 1
      continue
    }

    if (line.startsWith('>')) {
      const quoteLines = takeWhile(lines, index, (text) => text.startsWith('>'))
      blocks.push(parseQuote(quoteLines))
      index += quoteLines.length
      continue
    }

    const ordered = ORDERED_ITEM.test(line)
    if (ordered || UNORDERED_ITEM.test(line)) {
      const pattern = ordered ? ORDERED_ITEM : UNORDERED_ITEM
      const itemLines = takeWhile(lines, index, (text) => pattern.test(text))
      blocks.push({
        type: 'list',
        ordered,
        items: itemLines.map((item) => item.trim().replace(pattern, '')),
      })
      index += itemLines.length
      continue
    }

    if (line.startsWith('|')) {
      const rowLines = takeWhile(lines, index, (text) => text.startsWith('|'))
      blocks.push(parseTable(rowLines))
      index += rowLines.length
      continue
    }

    const continuation = takeWhile(lines, index + 1, (text) => text !== '' && !isBlockStart(text))
    blocks.push({
      type: 'paragraph',
      text: [line, ...continuation.map((text) => text.trim())].join(' '),
    })
    index += continuation.length + 1
  }

  return blocks
}

function InlineMarkdown({ text }: { text: string }) {
  const tokens = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`|\[[^\]]+\]\([^)]+\))/g)

  return (
    <>
      {tokens.map((token, index) => {
        if (token.startsWith('**') && token.endsWith('**')) {
          return <strong key={index}>{token.slice(2, -2)}</strong>
        }
        if (token.startsWith('*') && token.endsWith('*')) {
          return <em key={index}>{token.slice(1, -1)}</em>
        }
        if (token.startsWith('`') && token.endsWith('`')) {
          return <code key={index}>{token.slice(1, -1)}</code>
        }
        const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token)
        if (linkMatch) {
          return <a href={linkMatch[2]} key={index}>{linkMatch[1]}</a>
        }
        return token
      })}
    </>
  )
}

function renderBlock(block: MarkdownBlock, key: number): ReactNode {
  switch (block.type) {
    case 'code':
      return <pre key={key}><code>{block.code}</code></pre>
    case 'heading': {
      const HeadingTag = `h${block.level}` as const
      return <HeadingTag key={key}><InlineMarkdown text={block.text} /></HeadingTag>
    }
    case 'rule':
      return <hr key={key} />
    case 'callout':
      return (
        <aside className={`callout callout--${block.kind.toLowerCase()}`} key={key}>
          <div className="callout-heading">
            <img src={`/assets/images/icon-${CALLOUT_ICONS[block.kind]}.svg`} alt="" />
            <h3>{block.kind}: {block.title}</h3>
          </div>
          {block.body && <p><InlineMarkdown text={block.body} /></p>}
        </aside>
      )
    case 'quote':
      return (
        <blockquote key={key}>
          {block.lines.map((quote, quoteIndex) => (
            <p key={quoteIndex}><InlineMarkdown text={quote} /></p>
          ))}
        </blockquote>
      )
    case 'list': {
      const ListTag = block.ordered ? 'ol' : 'ul'
      return (
        <ListTag key={key}>
          {block.items.map((item, itemIndex) => (
            <li key={itemIndex}><InlineMarkdown text={item} /></li>
          ))}
        </ListTag>
      )
    }
    case 'table':
      return (
        <div className="table-scroll" key={key}>
          <table>
            <thead>
              <tr>{block.header.map((cell, cellIndex) => <th key={cellIndex}><InlineMarkdown text={cell} /></th>)}</tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => <td key={cellIndex}><InlineMarkdown text={cell} /></td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'paragraph':
      return <p key={key}><InlineMarkdown text={block.text} /></p>
  }
}

export function MarkdownContent({ content }: { content: string }) {
  return <div className="article-content">{parseMarkdown(content).map(renderBlock)}</div>
}
