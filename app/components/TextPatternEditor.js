'use client'

import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { textToSequences } from '../../lib/textToSequences'
import { generatePattern } from '../../lib/generatePattern'
import PatternCanvas from './PatternCanvas'

const INITIAL_TEXT = 'Esta página, por exemplo,\nnão nasceu para ser lida.\nNasceu para ser pálida,\num mero plágio da Ilíada,\nalguma coisa que cala,\nfolha que volta pro galho,\nmuito depois de caída.\nNasceu para ser praia,\nquem sabe Andrômeda, Antártida,\nHimalaia, sílaba sentida,\nnasceu para ser última\na que não nasceu ainda.\nPalavras trazidas de longe\npelas águas do Nilo,\num dia, esta página, papiro,\nvai ter que ser traduzida,\npara o símbolo, para o sânscrito,\npara todos os dialetos da Índia,\nvai ter que dizer bom-dia\nao que só se diz ao pé do ouvido,\nvai ter que ser a brusca pedra\nonde alguém deixou cair o vidro.\nNão é assim que é a vida?'

export default function TextPatternEditor() {
  const [text, setText] = useState(INITIAL_TEXT)
  const scrollRef = useRef(null)
  const [fades, setFades] = useState({ top: false, bottom: false, left: false, right: false })

  const pattern = useMemo(() => {
    const { seq1, seq2 } = textToSequences(text)
    if (seq1.length === 0 || seq2.length === 0) return null
    return generatePattern(seq1, seq2)
  }, [text])

  const updateFades = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setFades({
      top: el.scrollTop > 0,
      bottom: el.scrollTop + el.clientHeight < el.scrollHeight - 1,
      left: el.scrollLeft > 0,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 1,
    })
  }, [])

  useEffect(() => {
    requestAnimationFrame(updateFades)
  }, [pattern, updateFades])

  return (
    <div className='flex gap-20 p-20 h-screen overflow-hidden'>
      <div className='flex flex-col gap-y-10 min-w-280'>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          className='flex-1 border border-border rounded-4 shrink-0 p-10 outline-none'
        />
        {pattern && (
          <span className='text-secondary'>
            {pattern.width} fios · {pattern.height} passadas
          </span>
        )}
      </div>

      <div className='relative flex-1 min-w-0'>
        <div
          ref={scrollRef}
          onScroll={updateFades}
          className='overflow-auto flex items-start h-full'
        >
          <PatternCanvas matrix={pattern?.matrix} />
        </div>

        {fades.top    && <div className='pointer-events-none absolute inset-x-0 top-0 h-[2rem] bg-gradient-to-t from-transparent to-[var(--background)]/50' />}
        {fades.bottom && <div className='pointer-events-none absolute inset-x-0 bottom-0 h-[2rem] bg-gradient-to-b from-transparent to-[var(--background)]/50' />}
        {fades.left   && <div className='pointer-events-none absolute inset-y-0 left-0 w-[2rem] bg-gradient-to-l from-transparent to-[var(--background)]/50' />}
        {fades.right  && <div className='pointer-events-none absolute inset-y-0 right-0 w-[2rem] bg-gradient-to-r from-transparent to-[var(--background)]/50' />}
      </div>
    </div>
  )
}
