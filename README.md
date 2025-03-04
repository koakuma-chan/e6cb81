# Running locally

1. Start the mock API server
```bash
git clone https://github.com/mosaic-avantos/frontendchallengeserver
cd frontendchallengeserver
bun i
bun index.js
```

2. Start the client
```bash
git clone https://github.com/koakuma-chan/e6cb81
cd e6cb81
bun i
bun run vite dev
```

3. Go to `http://localhost:5173/1/actions/blueprints/1/graph`.

# Extending with new data sources

Global data sources can be configured in the `src/globalData.json` file.

Other types of data sources can be implemented by making changes to [these few lines of code](https://github.com/koakuma-chan/e6cb81/blob/8bfb63d31c9dcf8b44e20fc3c2ff954e739f2a5b/src/components/ActionBlueprintFlowPrefillDataElementSelectionDialog.tsx#L52).

# Demo

<div align="center">
  <img alt="Demo" src="https://github.com/user-attachments/assets/de02f1a3-8beb-4ce8-8881-c160a06c1521" />
</div>
