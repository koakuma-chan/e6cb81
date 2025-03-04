dev:
    bun run vite dev

fmt:
    dprint fmt

lint:
    bun run oxlint

check:
    bun run tsc --noEmit

test:
    bun vitest run

test-watch:
    bun vitest
