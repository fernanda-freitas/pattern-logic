/**
 * Generates a weave drawdown matrix from two index sequences.
 *
 * seq1 → threading (horizontal axis): each value is a shaft index
 * seq2 → treadling (vertical axis): each value is a treadle index
 *
 * Returns pure data — no rendering, no dependencies.
 */
export function generatePattern(seq1, seq2, options = {}) {
  const nShafts = options.nShafts ?? 4
  const nTreadles = options.nTreadles ?? 4

  const tieup = options.tieup ?? Array.from({ length: nShafts }, (_, i) =>
    Array.from({ length: nTreadles }, (_, j) => i === j)
  )

  const width = seq1.length
  const height = seq2.length

  const threading = seq1.map(shaft =>
    Array.from({ length: nShafts }, (_, s) => s === shaft)
  )

  const treadling = seq2.map(treadle =>
    Array.from({ length: nTreadles }, (_, t) => t === treadle)
  )

  const matrix = Array.from({ length: height }, (_, row) =>
    Array.from({ length: width }, (_, thread) => {
      for (let shaft = 0; shaft < nShafts; shaft++) {
        if (!threading[thread][shaft]) continue
        for (let treadle = 0; treadle < nTreadles; treadle++) {
          if (treadling[row][treadle] && tieup[shaft][treadle]) return true
        }
      }
      return false
    })
  )

  return { matrix, width, height, nShafts, nTreadles, tieup }
}
