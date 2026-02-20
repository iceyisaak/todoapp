# TodoApp

###### ver: ReactTS + RTK Query + Pocketbase

This app lets you:

1. Create tasks
2. Read tasks
3. Update tasks
4. Delete tasks

Different versions avaialble with respective branch names:

- master: Latest version
- tanstack-query: Implementation of Tanstack Query (React Query) with JSON Server
- jotai: Implementation of Jotai as the state manager
- zustand: Implementation of Zustand as the state manager
- context-api: original version using react context API

## Features

- Simple form input
- Simple list that display entered tasks
- Data stored in `SQLite` via PocketBase
- A button to delete all tasks
- A button to edit task
- A button to delete each task
- A button to toggle task as completed

## How to run project

- In the console: run command
  ```
  npm run dev
  ```

## Sources, Technologies, and Dependencies

### Sources

[Favicon](https://www.reshot.com/free-svg-icons/item/check-list-3EU5R962XC/)

### Technologies

- ReactJS
- SCSS
- TypeScript
- RTK Query
- PocketBase
- React Icons

### Dependencies

```json
    "dependencies": {
      "@reduxjs/toolkit": "^2.11.2",
      "pocketbase": "^0.26.8",
      "react": "^19.2.4",
      "react-dom": "^19.2.4",
      "react-icons": "^5.5.0",
      "react-redux": "^9.2.0",
      "uuidv7": "^1.1.0"
    },
```

### DevDependencies

```json
  "devDependencies": {
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@types/uuid": "^11.0.0",
    "@typescript-eslint/eslint-plugin": "^8.56.0",
    "@typescript-eslint/parser": "^8.56.0",
    "@vitejs/plugin-react": "^5.1.4",
    "concurrently": "^9.2.1",
    "eslint": "^9.39.2",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.5.0",
    "sass": "^1.97.3",
    "typescript": "^5.9.3",
    "vite": "^7.3.1"
  }
```

## Setup PocketBase

1. Setup the Pocketbase superuser credential
   `./backend/pocketbase superuser create your@email.com yourpassword`

2. Create the `.env`

```
VITE_POCKETBASE_URL=http://127.0.0.1:8090
```

3. `npm install -D concurrently`
4. Update the `package.json`:

   ```json
   "scripts": {
    "dev": "concurrently \"vite\" \"./backend/pocketbase serve --dir ./backend/pb_data\""
   }
   ```

5. `npm run dev` to start the development server.
6. Navigate to `http://127.0.0.1:8090/_/` in your browser.
7. PocketBase Collection Setup:
   - In your PocketBase admin UI (http://127.0.0.1:8090/_/), create a collection called tasks with these fields:
   - taskTitle - type: text
   - isCompleted - type: Bool
   - Set collection access rules to allow all operations (or configure auth as needed for your use case).
8. The app should now work

---
