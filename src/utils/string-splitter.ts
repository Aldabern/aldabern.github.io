export function splitTextInHalf(text: string) {
  const midPoint = Math.floor(text.length / 2);
  const firstHalf = text.slice(0, midPoint);
  const secondHalf = text.slice(midPoint);
  return [firstHalf, secondHalf];
}
