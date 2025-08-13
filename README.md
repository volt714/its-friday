This project now includes a Monday-style dashboard backed by MySQL via Prisma.

## Getting Started

Setup and run the development server:

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

Environment

Add a `.env` file with:

```
DATABASE_URL="mysql://root:123456@localhost:3306/portal_db"
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Architecture & Flow

The app uses the Next.js App Router with server components, Prisma for data access, and MySQL for persistence. UI interactions use lightweight form actions that call server actions to mutate data and then `revalidatePath` to refresh views.

```mermaid
graph TD
  A[User (Browser)] --> B[Next.js App Router (/)]
  B --> C[Server Component: Home<br/>src/app/page.tsx]
  C --> D[Prisma Client<br/>src/lib/prisma.ts]
  D --> E[(MySQL)]

  C --> F[UI Composition]
  F --> F1[TopNav]
  F --> F2[Sidebar]
  F --> F3[ProjectHeader]
  F --> F4[ActionBar]
  F --> F5[GroupsBoard]
  F5 --> G1[GroupCard]
  G1 --> G2[TaskRow]
  G2 --> G3[OwnerField]
  C --> H[ChatWidget (client)]

  subgraph Server Actions<br/>src/app/actions.ts
    S1[createGroup]
    S2[createTask]
    S3[updateTask]
    S4[deleteTask]
    S5[deleteGroup]
    S6[createUser / deleteUser]
  end

  G2 -. form submit .-> S3
  G2 -. delete .-> S4
  G3 -. assign owner .-> S3
  G1 -. add task .-> S2
  F5 -. add group .-> S1
  S1 --> E
  S2 --> E
  S3 --> E
  S4 --> E
  S5 --> E
  S6 --> E
```

### Database schema

```mermaid
erDiagram
  Group ||--o{ Task : contains
  User ||--o{ Task : assigned

  Group {
    int id PK
    string name
    int order
    datetime createdAt
    datetime updatedAt
  }
  Task {
    int id PK
    string title
    string owner nullable  // legacy text owner
    int ownerId nullable FK // -> User.id
    enum status
    datetime dueDate nullable
    string dropdown nullable
    int groupId FK // -> Group.id
    datetime createdAt
    datetime updatedAt
  }
  User {
    int id PK
    string name
    string email nullable unique
    string avatar nullable
    datetime createdAt
    datetime updatedAt
  }
```

### Typical interaction: update a task

```mermaid
sequenceDiagram
  actor U as User
  participant TR as TaskRow (client)
  participant SA as Server Actions
  participant DB as Prisma/MySQL
  U->>TR: Edit title/status/due date
  TR->>SA: updateTask(id, fields)
  SA->>DB: prisma.task.update(...)
  DB-->>SA: OK
  SA-->>TR: revalidatePath("/")
  note over TR: Board re-renders with fresh data
```

## Code Overview (key files)

- **`prisma/schema.prisma`**: Models `Group`, `Task`, `User` and `Status` enum. `Task.ownerId` relates to `User`. `Task.groupId` cascades on delete.
- **`src/lib/prisma.ts`**: Exposes a singleton `PrismaClient` with query/error/warn logging; avoids connection exhaustion in dev.
- **`src/app/actions.ts`**: Server actions used by UI forms.
  - **groups**: `createGroup`, `deleteGroup`
  - **tasks**: `createTask`, `updateTask`, `deleteTask` (normalizes dates, safe optional fields)
  - **users**: `createUser`, `deleteUser` (graceful fallback to raw SQL if the `User` model is missing)
- **`src/app/page.tsx`**: Server component. Fetches groups (and tasks) and users, then composes the dashboard UI (`TopNav`, `Sidebar`, `ProjectHeader`, `ActionBar`, `GroupsBoard`, `ChatWidget`).
- **`src/app/layout.tsx`**: Global layout, fonts, and base styles.
- **`src/app/components/groups/GroupsBoard.tsx`**: Renders a list of groups with tasks and an `AddNewGroupCard`.
- **`src/app/components/groups/TaskRow.tsx`**: Client component; inline editing via form `action` handlers calling server actions. Handles delete confirmation.
- **`src/app/components/groups/OwnerField.tsx`**: Owner selection; updates `owner`/`ownerId` via server action.
- **`src/app/components/ActionBar.tsx`**: Toolbar with common board actions (UI only in this demo).
- **`src/app/components/Sidebar.tsx`**: Collapsible/pinnable navigation; persists state in `localStorage` and supports a mobile drawer.
- **`src/app/components/chat/ChatWidget.tsx`**: Floating client-side chat demo; toggles a panel, responsive on small screens.
- **`src/app/users/page.tsx`**: User management page; lists users and provides add/delete via server actions with `revalidatePath("/users")`.
- **`src/app/components/utils.ts`**: Styling helpers for status/due date/dropdown tones and class utilities used by `TaskRow` and others.

## Notes on data flow and revalidation

- **Mutations** use server actions that finish by calling `revalidatePath` so the affected route fetches fresh data on the next render.
- **Dates** from form inputs are normalized to `Date` before persisting.
- **User fallbacks**: User actions fall back to raw SQL if the Prisma `User` model/client isn’t available yet (e.g., before running migrations).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
