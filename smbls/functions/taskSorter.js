// smbls/functions/taskSorter.js
// Business logic - handles sorting with multiple columns
export default function taskSorter() {
    const el = this
    const state = el.state || {}
    return {
        // Sort tasks by multiple criteria
        sort: (tasks, sortConfig) => {
            if (!sortConfig || sortConfig.length === 0) {
                return tasks
            }

            return [...tasks].sort((a, b) => {
                // Apply each sort criterion in order
                for (const config of sortConfig) {
                    const { field, direction } = config
                    const aVal = a[field]
                    const bVal = b[field]

                    // Handle null/undefined
                    if (aVal == null && bVal == null) continue
                    if (aVal == null) return direction === 'ASC' ? 1 : -1
                    if (bVal == null) return direction === 'ASC' ? -1 : 1

                    // Compare values
                    let comparison = 0

                    if (aVal instanceof Date && bVal instanceof Date) {
                        comparison = aVal.getTime() - bVal.getTime()
                    } else if (typeof aVal === 'string' && typeof bVal === 'string') {
                        comparison = aVal.localeCompare(bVal)
                    } else {
                        comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
                    }

                    // Apply direction
                    if (comparison !== 0) {
                        return direction === 'ASC' ? comparison : -comparison
                    }
                }

                return 0
            })
        }
    }
}