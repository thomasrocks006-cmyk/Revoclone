import React from 'react';

export default function HighlightText({ text, term }: { text: string; term: string }) {
  if (!term.trim()) return <>{text}</>;
  const re = new RegExp(`(${escapeRegExp(term)})`, 'ig');
  const parts = text.split(re);
  return (
    <>
      {parts.map((p, i) =>
        re.test(p) ? (
          <mark key={i} className="bg-yellow-600/50 px-0.5 rounded text-inherit">{p}</mark>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

