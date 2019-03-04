export const getDirection = (directionId) => {
  if (directionId === 0) return { x: 0, y: -1 }
  if (directionId === 1) return { x: 1, y: 0 }
  if (directionId === 2) return { x: 0, y: 1 }
  if (directionId === 3) return { x: -1, y: 0 }
  return {}
}
