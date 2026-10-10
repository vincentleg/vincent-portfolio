// Slots beyond the six established projects are visual space for future work.
// Adding a real project consumes the next slot without changing the catalogue.
export const outerOrbits = [
  { x: 78, y: 70, count: 3, phase: 9, seconds: 310 },
  { x: 102, y: 92, count: 4, phase: 21, seconds: 370 },
  { x: 126, y: 116, count: 4, phase: 4, seconds: 430 },
  { x: 153, y: 142, count: 4, phase: 16, seconds: 510 },
];
const colors = ['#83b6e6', '#8cd5dc', '#ac9ed4', '#c0cad9', '#c5b68b'];
export const futurePlanetSlots = outerOrbits.flatMap((orbit, ring) =>
  Array.from({ length: orbit.count }, (_, index) => ({
    id: `future-${ring}-${index}`, ring, x: orbit.x, y: orbit.y,
    phase: orbit.phase + index * 100 / orbit.count,
    seconds: orbit.seconds, color: colors[(ring + index) % colors.length],
    size: 16 + (ring * 3 + index * 5) % 9,
  }))
);
export function projectOrbit(index: number) {
  if (index < 6) return { phase: 6 + index * 100 / 6, seconds: 233 };
  return futurePlanetSlots[index - 6] ?? {
    x: 178 + Math.floor((index - 21) / 6) * 25,
    y: 166 + Math.floor((index - 21) / 6) * 25,
    phase: 8 + (index - 21) % 6 * 100 / 6, seconds: 570,
  };
}
