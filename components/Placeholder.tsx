import { Fragment } from 'react';

const pattern = /(\[PLACEHOLDER[^\]]*\])/g;

// Renders data strings, marking any "[PLACEHOLDER…]" segment so unknown facts
// are visibly unfinished instead of passing as real content.
export default function WithPlaceholders({ text }: { text: string }) {
  const parts = text.split(pattern);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('[PLACEHOLDER') ? (
          <span key={i} className="placeholder">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
