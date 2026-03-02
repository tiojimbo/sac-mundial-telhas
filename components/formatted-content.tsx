interface FormattedContentProps {
  text: string
}

export function FormattedContent({ text }: FormattedContentProps) {
  const blocks = text.split("\n\n")

  return (
    <div className="space-y-4 text-[15px] leading-relaxed text-[var(--preto-texto)]">
      {blocks.map((block, i) => {
        const lines = block.split("\n")

        const isNumberedList = lines.every((l) => /^\d+\.\s/.test(l.trim()))
        if (isNumberedList) {
          return (
            <ol key={i} className="list-decimal list-inside space-y-2 pl-1">
              {lines.map((line, j) => (
                <li key={j}>{line.replace(/^\d+\.\s/, "")}</li>
              ))}
            </ol>
          )
        }

        const isBulletList = lines.every((l) => /^[•\-]\s/.test(l.trim()))
        if (isBulletList) {
          return (
            <ul key={i} className="list-disc list-inside space-y-2 pl-1">
              {lines.map((line, j) => (
                <li key={j}>{line.replace(/^[•\-]\s/, "")}</li>
              ))}
            </ul>
          )
        }

        return <p key={i}>{block}</p>
      })}
    </div>
  )
}
