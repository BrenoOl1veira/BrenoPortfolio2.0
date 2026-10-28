/**
 * Desenha um icone em pixel a partir das linhas de constants/pixelIcons.
 * A cor vem de currentColor, entao o icone acompanha o texto no hover.
 */
const PixelIcon = ({ rows, className = "h-[27px] w-[27px]" }) => (
  <svg
    viewBox={`0 0 ${rows[0].length} ${rows.length}`}
    aria-hidden="true"
    className={`block shrink-0 fill-current ${className}`}
    shapeRendering="crispEdges"
  >
    {rows.flatMap((row, y) =>
      [...row].map((cell, x) =>
        cell === "X" ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} /> : null
      )
    )}
  </svg>
);

export default PixelIcon;
