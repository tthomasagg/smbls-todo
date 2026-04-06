// Presentation-layer helper — imperative DOM rebuild for the dynamic task list.
// Called via el.call('renderTaskList') so `this` is the TaskList element.

export const renderTaskList = function renderTaskList() {
  const el = this
  const root = el.state.root

  // Build sort config from root state sort controls
  const sortConfig = []
  if (root.primarySort) {
    sortConfig.push({ field: root.primarySort, direction: root.primaryDir || 'ASC' })
  }
  if (root.secondarySort) {
    sortConfig.push({ field: root.secondarySort, direction: root.secondaryDir || 'ASC' })
  }

  const tasks = el.call('listTasks', root.tasks || [], sortConfig)

  // Remove stale wrapper(s) before rebuilding to avoid orphaned nodes
  if (el.TaskItems && typeof el.TaskItems.remove === 'function') {
    el.TaskItems.remove()
  }
  if (el.EmptyMsg && typeof el.EmptyMsg.remove === 'function') {
    el.EmptyMsg.remove()
  }

  if (tasks.length === 0) {
    el.update({
      EmptyMsg: { extends: 'EmptyState' }
    })
    return
  }

  // Build child map — each key uniquely identifies a task so Symbols can diff correctly
  const items = {}
  tasks.forEach(task => {
    // Keys must be valid JS identifiers; strip hyphens from UUID
    const key = 'i' + task.id.replace(/-/g, '')
    const dueDateStr = task.dueDate instanceof Date
      ? task.dueDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
      : String(task.dueDate)

    items[key] = {
      extends: 'TaskCard',
      // Props are flat on the element in v3 — TaskCard reads them via el.parent.*
      taskId: task.id,
      taskTitle: task.title,
      taskDescription: task.description || '',
      taskDueDate: dueDateStr,
      taskStatus: task.status,
    }
  })

  el.update({ TaskItems: { extends: 'Flex', flexDirection: 'column', gap: 'B', ...items } })
}
