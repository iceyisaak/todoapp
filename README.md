# TodoApp
###### ver: ReactTS + Tanstack Query + Jotai
###### 20231110

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
- Data stored in `JSON Server`
- A button to delete all tasks
- A button to edit task
- A button to delete each task
- A button to toggle task as completed


## How to run project
- In the console: run command
  ```
  npm run front-and-back
  ```



## Sources, Technologies, and Dependencies

### Sources
[Favicon](https://www.reshot.com/free-svg-icons/item/check-list-3EU5R962XC/)


### Technologies
- ReactJS
- SCSS
- TypeScript
- Jotai: Frontend State Management
- Tanstack Query: Backend Data Interaction
- JSON Server
- React Icons


### Dependencies
```json
 "dependencies": {
    "@tanstack/query-core": "^5.7.2",
    "@tanstack/react-query": "^5.7.2",
    "axios": "^1.6.0",
    "jotai": "^2.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-icons": "^4.10.1",
    "uuid": "^9.0.0"
  },
```

### DevDependencies
```json
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@types/uuid": "^9.0.2",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "@vitejs/plugin-react": "^4.0.3",
    "concurrently": "^8.2.2",
    "eslint": "^8.45.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    "sass": "^1.65.1",
    "typescript": "^5.0.2",
    "vite": "^4.4.5"
  }
```

## 