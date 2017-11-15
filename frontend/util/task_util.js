
export const getLastPriority = (status, tasks) => {
  let priority = 1
  tasks.forEach(task => {
    if (task.status === status) priority += 1
  })
  return priority;
}
