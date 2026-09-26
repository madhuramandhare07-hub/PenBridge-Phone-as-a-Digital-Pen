# PenBridge — Phone as a Digital Pen

**PenBridge turns a smartphone into a wireless digital writing pad for a non-touchscreen laptop, allowing users to write, draw, and annotate on a laptop whiteboard in real time.**

---

## ✨ Overview

PenBridge is a real-time digital whiteboard designed especially for laptops that do not have touchscreen functionality.

Instead of requiring a touchscreen laptop or a separate drawing tablet, PenBridge allows users to connect their smartphone to a laptop using a temporary room and use the phone's touchscreen as a digital writing surface.

### Basic workflow

```text
┌─────────────────┐
│   💻 LAPTOP     │
│                 │
│  Create Room    │
│       ↓         │
│    QR Code      │
└────────┬────────┘
         │
         │ Scan QR
         ↓
┌─────────────────┐
│   📱 PHONE      │
│                 │
│  ✍️ Write/Draw  │
└────────┬────────┘
         │
         │ Real-time
         │ synchronization
         ↓
┌─────────────────┐
│   💻 LAPTOP     │
│                 │
│  Live Canvas    │
└─────────────────┘
```

---

# 🚀 Features

### 🖊️ Real-Time Drawing

Draw on the smartphone and see the strokes appear on the laptop whiteboard in real time.

### 📱 Mobile Writing Pad

The smartphone acts as the writing surface.

Users can write using:

* Finger
* Compatible stylus

### 💻 Laptop Whiteboard

The laptop provides a large canvas for:

* Handwritten notes
* Diagrams
* Annotations
* Teaching
* Presentations
* Programming explanations

### 🔗 QR-Based Connection

Create a room on the laptop and scan the generated QR code using the phone to connect quickly.

### 🎨 Drawing Tools

* Pen
* Eraser
* Highlighter
* Color selection
* Stroke thickness
* Undo
* Redo
* Clear canvas

### ⚡ Real-Time Communication

PenBridge uses real-time communication so that drawing events can be synchronized between connected devices.

### 📥 Export

Whiteboard content can be saved/exported for later use.

---

# 🧠 DSA Learning Use Case

PenBridge can also be used as an interactive tool for learning Data Structures and Algorithms.

For example, while explaining a linked list:

```text
HEAD
 ↓
[10] → [20] → [30] → NULL
```

A learner can use the smartphone to draw arrows, labels, and annotations while viewing the complete visualization on the laptop.

Potential DSA applications include:

* Linked Lists
* Stacks
* Queues
* Trees
* Graphs
* Searching
* Sorting
* Pointer visualization

---

# 🛠️ Stack

### Workspace

* pnpm workspaces
* Node.js 24
* TypeScript 5.9

### Backend

* Express 5
* PostgreSQL
* Drizzle ORM

### Validation

* Zod
* drizzle-zod

### API

* OpenAPI
* Orval API code generation

### Build

* esbuild

### Frontend / UI

* TypeScript
* React-based workspace packages
* Tailwind CSS
* HTML5 Canvas

### Real-Time Communication

* WebSocket / Socket.IO-based real-time communication

---

# 📂 Project Structure

```text
PenBridge-Whiteboard/
│
├── .agents/
├── .conversation/
├── .git/
├── artifacts/
├── lib/
├── scripts/
│
├── .gitignore
├── .npmrc
├── .replit
├── .replitignore
│
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
│
├── replit.md
├── tsconfig.base.json
├── tsconfig.json
│
└── README.md
```

> `.git`, `.agents`, and `.conversation` contain development/environment-related information and are not the main application source code.

---

# ▶️ Run & Operate

Install dependencies:

```bash
pnpm install
```

### Run API server

```bash
pnpm --filter @workspace/api-server run dev
```

The API server runs on:

```text
http://localhost:5000
```

### Typecheck

Run type checking across the workspace:

```bash
pnpm run typecheck
```

### Build

Build all packages:

```bash
pnpm run build
```

### Regenerate API code

If the OpenAPI specification changes:

```bash
pnpm --filter @workspace/api-spec run codegen
```

### Database

For development database schema changes:

```bash
pnpm --filter @workspace/db run push
```

---

# 🔐 Environment Variables

The application requires a PostgreSQL connection string.

```env
DATABASE_URL=your_postgresql_connection_string
```

Do not commit real database credentials or secret environment variables to GitHub.

---

# 🏗️ Architecture

PenBridge follows a workspace-based architecture.

```text
Frontend
   │
   │ API requests
   ↓
Express API
   │
   ├── OpenAPI
   │
   ├── Zod validation
   │
   ↓
Database Layer
   │
   ↓
PostgreSQL
```

The real-time whiteboard functionality allows drawing events to be synchronized between the mobile writing interface and the laptop canvas.

---

# 🧩 Architecture Decisions

### 1. Smartphone as the writing device

Non-touchscreen laptops cannot directly receive physical pen input. PenBridge therefore uses the smartphone touchscreen as the input surface.

### 2. Temporary room-based connection

Users can connect devices through a temporary room instead of requiring an account for basic whiteboard usage.

### 3. QR-based pairing

QR codes reduce the friction of manually entering connection information on the phone.

### 4. Real-time synchronization

Drawing operations are synchronized as events rather than repeatedly sending complete screenshots of the canvas.

### 5. Responsive interfaces

The laptop and smartphone have different interfaces because the laptop acts as the display while the phone acts as the writing surface.

---

# 📱 User Flow

### Laptop

```text
Open PenBridge
      ↓
Create Whiteboard
      ↓
Room Created
      ↓
QR Code Displayed
      ↓
Phone Connected
      ↓
Open Whiteboard
```

### Phone

```text
Scan QR
   ↓
Join Room
   ↓
Connection Established
   ↓
Writing Pad
   ↓
✍️ Draw
   ↓
Live on Laptop
```

---

# 🧪 Testing

For testing phone-to-laptop functionality:

1. Connect the laptop and smartphone to the same Wi-Fi network.
2. Start the PenBridge application.
3. Create a whiteboard room.
4. Scan the QR code using the smartphone.
5. Confirm that the phone is connected.
6. Draw on the phone.
7. Verify that the drawing appears on the laptop in real time.

---

# 🔮 Future Improvements

The following features can be added in future versions:

* [ ] Multiple whiteboard pages
* [ ] PDF annotation
* [ ] Image upload
* [ ] Better stylus support
* [ ] Collaborative whiteboards
* [ ] Voice commands
* [ ] AI diagram recognition
* [ ] Diagram-to-code conversion
* [ ] DSA visualization mode
* [ ] Code editor integration
* [ ] Line-by-line code visualization
* [ ] Saved whiteboards
* [ ] User accounts
* [ ] Cloud synchronization
* [ ] AI-powered learning assistant

---

# 🎓 Educational Applications

PenBridge can be useful for:

* Students
* Teachers
* Online tutors
* Programming learners
* DSA learners
* Technical presenters
* Developers
* Mathematics learning
* Diagram-based teaching

---

# 📌 Project Status

**Status:** Active Development 🚧

PenBridge is currently being developed as an educational and portfolio project.

The core goal is to make digital handwriting accessible on laptops without touchscreen hardware.

---

# 👩‍💻 Author

**Madhura Nitin Mandhare**

Information Technology Student

Interests:

* Software Development
* Data Structures & Algorithms
* Artificial Intelligence / Machine Learning
* UI/UX
* Educational Technology

---

# 📄 License

This project is currently developed as an educational and portfolio project.

License details can be added when the project is published under a specific open-source license.

---

## 📚 Pointers

For workspace-specific development information, refer to:

* `pnpm-workspace.yaml`
* `package.json`
* `tsconfig.json`
* `replit.md`

The API specification and database schema should be treated as the source of truth for their respective areas.
