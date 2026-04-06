// Domain layer — pure read + sort, no side effects

/**
 * Returns active (non-deleted) tasks, sorted by the given config.
 *
 * @param {Task[]} tasks       - Full tasks array from root state
 * @param {Array}  sortConfig  - [{ field: string, direction: 'ASC'|'DESC' }, ...]
 *                               Supports multi-column sort (applied in order).
 * @returns {Task[]}
 */
export const listTasks = function listTasks(tasks, sortConfig) {
  // Exclude soft-deleted tasks
  const active = (tasks || []).filter(t => t.deletedAt === null || t.deletedAt === undefined)

  if (!sortConfig || sortConfig.length === 0) return active

  return [...active].sort((a, b) => {
    for (const { field, direction } of sortConfig) {
      const aVal = a[field]
      const bVal = b[field]

      // Nulls always go last regardless of direction
      if (aVal == null && bVal == null) continue
      if (aVal == null) return 1
      if (bVal == null) return -1

      let cmp = 0

      if (aVal instanceof Date && bVal instanceof Date) {
        cmp = aVal.getTime() - bVal.getTime()
      } else if (typeof aVal === 'string' && typeof bVal === 'string') {
        cmp = aVal.localeCompare(bVal)
      } else {
        cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
      }

      if (cmp !== 0) return direction === 'ASC' ? cmp : -cmp
    }
    return 0
  })
}
