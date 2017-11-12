export const getCol = (status) => {
  const cols = {
    'open': 0,
    'ready': 1,
    'in progress': 2,
    'done': 3,
  }

  return cols[status];
}
