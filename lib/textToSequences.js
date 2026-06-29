/**
 * Converts a text string into two index sequences for generatePattern.
 *
 * seq1 (threading): one entry per non-whitespace character → charCode % nShafts
 * seq2 (treadling): one entry per word → sum(charCodes) % nTreadles
 */
export function textToSequences(text, { nShafts = 4, nTreadles = 4 } = {}) {
  const seq1 = [...text.replace(/\s+/g, '')]
    .map(c => c.codePointAt(0) % nShafts)

  const seq2 = text.split(/\s+/).filter(Boolean)
    .map(word => {
      const sum = [...word].reduce((acc, c) => acc + c.codePointAt(0), 0)
      return sum % nTreadles
    })

  return { seq1, seq2 }
}
