🖊️ PenBridge — Turn Your Phone into a Digital Pen

Your Phone. Your Pen. Your Laptop.

PenBridge is a real-time digital whiteboard that allows users with **non-touchscreen laptops** to use their smartphone as a digital writing pad.

The user creates a whiteboard room on their laptop, scans a QR code using their phone, and writes or draws on the phone screen using their finger or stylus. The drawing appears **live on the laptop screen**.

---

🎯 Problem

Many laptops do not have touchscreen functionality.

This makes it difficult for students, teachers, presenters, and developers to:

* Draw diagrams while explaining concepts
* Annotate code
* Write mathematical equations
* Explain data structures visually
* Use a digital pen during presentations

Buying a touchscreen laptop just for this purpose can be expensive.

---

💡 Solution

PenBridge uses a smartphone as a **wireless digital writing pad**.

How it works

text
        📱 PHONE
     Finger / Stylus
           │
           │ Real-time
           │ Connection
           ▼
     🔗 PenBridge Room
           │
           ▼
       💻 LAPTOP
     Digital Canvas


Simple workflow

1. Open PenBridge on your laptop.
2. Create a new whiteboard room.
3. A unique room code and QR code are generated.
4. Scan the QR code using your smartphone.
5. Your phone becomes a digital writing pad.
6. Draw or write on your phone.
7. Your strokes appear on the laptop whiteboard in real time.

---

✨ Features

🖊️ Digital Drawing

* Freehand drawing
* Pen tool
* Highlighter
* Eraser
* Adjustable stroke size
* Multiple colors
* Smooth touch input

📱 Smartphone Writing Pad

The smartphone works as a dedicated writing surface.

Users can write using:

* Finger
* Compatible stylus

The mobile interface is optimized specifically for touch input.

💻 Laptop Whiteboard

The laptop provides a large digital canvas for:

* Writing
* Drawing
* Diagram creation
* Annotations
* Presentations
* Teaching

🔗 QR-Based Connection

A QR code makes connecting the phone and laptop quick and simple.

text
Laptop
   ↓
Create Room
   ↓
Generate QR
   ↓
Scan with Phone
   ↓
Connected ✓


⚡ Real-Time Synchronization

Drawing strokes are synchronized between the phone and laptop using real-time communication.

The laptop does not need to repeatedly refresh the page.

↩️ Undo / Redo

Users can undo and redo drawing operations.

🧹 Eraser

Remove unwanted strokes without clearing the complete canvas.

🎨 Color & Stroke Control

Users can customize:

* Pen color
* Stroke thickness
* Drawing tool

📥 Export

Whiteboard content can be exported for later use.

---

🧠 DSA Learning Use Case

PenBridge can also be used for **Data Structures and Algorithms learning**.

For example, while explaining a linked list:

text

HEAD
 ↓
[10] → [20] → [30] → NULL


A student can draw arrows, labels, and explanations from their phone while viewing the complete visualization on the laptop.

This makes PenBridge useful for:

* Linked Lists
* Stacks
* Queues
* Trees
* Graphs
* Searching
* Sorting
* Pointer visualization

---

🛠️ Technology Stack

Frontend

* React
* TypeScript
* Tailwind CSS
* HTML5 Canvas

Backend / Real-Time

* Node.js
* Express
* Socket.IO

Other Technologies

* QR Code generation
* Pointer Events API
* WebSocket-based communication

---

📂 Project Structure

text
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
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── replit.md
├── tsconfig.base.json
├── tsconfig.json
│
└── README.md


> Note: Some folders such as `.git`, `.agents`, and `.conversation` are development/environment-related files and may not be part of the application's core functionality.

---

🚀 Getting Started

Prerequisites

Make sure you have installed:

* Node.js
* pnpm
* Git

Check your versions:

bash
node --version
pnpm --version
git --version


---

📦 Installation

Clone the repository:

bash
git clone YOUR_GITHUB_REPOSITORY_URL

Move into the project:

bash
cd PenBridge-Whiteboard


Install dependencies:

bash
pnpm install


---

▶️ Running the Project

Start the development server using:

bash
pnpm dev


If the project contains separate frontend and backend applications, start them according to the scripts defined in `package.json`.

---

📱 Testing Phone-to-Laptop Connection

For real-time phone testing:

Step 1

Connect both devices to the same Wi-Fi network.


💻 Laptop ───── Wi-Fi ───── 📱 Phone


Step 2

Start PenBridge on the laptop.

Step 3

Create a whiteboard room.

Step 4

Scan the displayed QR code using your phone.

Step 5

Start drawing on the phone.

Step 6

The drawing should appear on the laptop whiteboard in real time.

---

🔐 Privacy

PenBridge is designed around temporary room-based connections.

The application does not require users to provide personal information for the basic whiteboard functionality.

---

🔮 Future Improvements

Planned improvements include:

[ ] Multiple whiteboard pages
[ ] PDF annotation
[ ] Image upload
[ ] Better stylus support
[ ] Collaborative whiteboards
[ ] Voice commands
[ ] AI-powered diagram recognition
[ ] Convert diagrams into code
[ ] DSA visualization mode
[ ] Code editor integration
[ ] Line-by-line code visualization
[ ] User accounts
[ ] Saved whiteboards
[ ] Cloud synchronization

---

🎓 Educational Applications

PenBridge can be useful for:

* Students
* Teachers
* Online tutors
* Developers
* Technical presentations
* DSA learning
* Mathematics
* Programming explanations
* Diagram-based teaching

---

🌟 Why PenBridge?

PenBridge provides a simple way to add **digital pen functionality to a non-touchscreen laptop** without requiring a touchscreen laptop.

Instead of replacing the laptop, PenBridge uses a device many people already have:

> **Your smartphone.**

---

👩‍💻 Author

Madhura Nitin Mandhare

Information Technology Student

Interested in:

* Software Development
* Data Structures & Algorithms
* AI/ML
* UI/UX
* Educational Technology

---

📄 License

This project is currently developed as an educational and portfolio project.
