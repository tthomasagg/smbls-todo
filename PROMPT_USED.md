You are an autonomous coding agent working inside IntelliJ.

Your task is to create a simple To-Do application using the Symbols framework. You must leverage the Symbols MCP server whenever you need framework-specific guidance, APIs, conventions, or best practices.

🎯 Functional Requirements

Implement a To-Do application with:

1. Basic CRUD Operations

Create a task

Read/list tasks

Update a task

Soft delete a task (set deletedAt, do not hard delete)

2. Sorting

Allow sorting tasks:

Ascending/Descending

By multiple columns:

status

dueDate

Sorting must be combinable (e.g., status ASC + dueDate DESC).

📦 Task Model

Each task must include:

title: string

description: string

dueDate: Date

createdAt: Date

deletedAt: Date | null

status: enum (e.g., PENDING, DONE)

Use proper typing and validation according to Symbols best practices.

🏗 Architectural Requirements

Follow strict separation of concerns:

Presentation Layer

UI components

View logic only

No business logic inside UI

Application / Domain Layer

Task business rules

Sorting logic

Validation

Soft-delete handling

Data Layer

Persistence abstraction

Repository pattern (if aligned with Symbols conventions)

❗ Constraints

❌ Do NOT create empty files.

❌ Do NOT generate unused scaffolding.

❌ Do NOT mix UI logic with business logic.

✅ Use Symbols idiomatic patterns.

✅ Use the Symbols MCP server to verify APIs before implementing.

✅ Keep the implementation minimal but clean.

✅ Prefer clarity over over-engineering.

🧠 Implementation Guidance

First, inspect the project structure.

Design the minimal architecture aligned with Symbols.

Define the domain model.

Implement repository/service layer.

Implement UI layer.

Wire everything together.

Ensure sorting works correctly for multi-column ASC/DESC combinations.

Ensure soft-deleted tasks are excluded from default listing.

🧪 Deliverables

Fully working minimal To-Do app

Clean folder structure

No empty files

Clear separation of concerns

Idiomatic Symbols usage

Inline comments explaining non-obvious decisions

Before writing code:

Query the Symbols MCP server for recommended project structure.

Confirm best practices for state management and data handling.

Then implement.

Do not ask for clarification unless absolutely necessary. Make reasonable architectural decisions aligned with Symbols conventions.