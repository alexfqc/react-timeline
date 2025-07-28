## 🛠️ Technology Decisions

To ensure a modern and efficient development experience, I made the following
key decisions:

- **Vite + React 19 + TypeScript**  
  I chose Vite over Create React App (react-scripts) due to its faster build
  times, better DX (developer experience), and native support for modern
  tooling.

- **Tailwind CSS**  
  For styling, I opted for Tailwind CSS instead of traditional CSS modules.
  Tailwind allowed me to iterate on the layout quickly while maintaining a clean
  and consistent visual hierarchy.

- **ESLint + Prettier**  
  I set up ESLint and Prettier to enforce consistent code formatting and catch
  potential bugs early. This also helped keep the codebase clean and easier to
  read, especially during refactors.

- **Lefthook for Git Hooks**  
  I configured Lefthook to run ESLint, TypeScript, and Prettier checks before
  every commit. This ensures that no code can be committed unless it passes
  linting, type checking, and formatting rules, helping maintain code quality
  across the project.

---

## ✨ Design Improvement Decision: Interactive Modal for Mobile-Friendly Editing

Instead of implementing features like zooming or inline editing, which are more
effective on desktop, I decided to create an **interactive modal** that allows
users to view and edit event details (name, start date, and end date) with
better accessibility and UX across all devices, especially **mobile**.

This approach provides:

- 📱 A responsive and touch-friendly interface
- 📝 Full editability of event fields with validation
- 🧠 A more intuitive experience for both desktop and mobile users
- ♿️ Better support for accessibility and screen readers through ARIA roles and
  keyboard focus

While features like drag-and-drop or zoom are useful, this solution offers a
**cleaner, more accessible, and consistent way** to manage event data across all
screen sizes.

---

## 🚀 How to Run the Project

To get the application running locally, follow these steps:

Please use Node.js version 22.11.0 for best compatibility.

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

   or

   ```bash
   npm start
   ```

3. Open your browser and go to:

   ```
   http://localhost:5173/
   ```

---

## ⏱️ Time spent

I spent approximately **4 hours** completing this assignment.

---

## ✅ What I like about my implementation

- I enjoyed using **Tailwind CSS** and **CSS Grid** to build a responsive and
  clean timeline layout.
- The `calculateLanes` logic efficiently positions overlapping events on
  separate rows (lanes) to prevent visual collisions.
- I added an accessible and mobile-friendly **event modal** to display and edit
  event information.
- I used **React.memo** to optimize rendering and **useCallback** to avoid
  unnecessary recalculations.
- Another thing I liked was setting up and enforcing strong development
  standards using **ESLint**, **Prettier**, and **TypeScript**. These tools
  helped me maintain code quality, avoid common pitfalls, and ensure a clean and
  consistent codebase throughout the project.

---

## 🔁 What I would change if I were going to do it again

- Use Zustand for global state management to simplify updates to events across
  components.
- Consider accessibility improvements with better keyboard navigation and screen
  reader support throughout the app.
- Polish the animations and transitions to make the UI feel even more fluid and
  modern.

---

## 🔁 What I would improve if I had more time

- Add a calendar-style layout and structured the timeline to span across each
  full month.  
  The start and end date range is now fixed based on the earliest start date and
  the latest end date from the fixed timelineItems array.

---

## 🎨 Design decisions

- For the **timeline layout**, I took inspiration from **Gantt charts**, where
  overlapping events are stacked in different lanes.
- For the **event interaction and modal design**, I was inspired by the **Google
  Calendar** interface—clicking an event opens a modal where details can be
  viewed and edited.

---

## 🧪 How I would test this

- I would use **React Testing Library** to ensure the timeline renders correctly
  and events are visually positioned based on their start and end dates.
- I would test the **edit flow**:
  - One test that updates only the **event name** (without changing its lane).
  - Another test that changes the **event dates** and verifies the lanes are
    recalculated appropriately.
- I would also write accessibility tests to check for proper `aria-*` roles and
  keyboard navigation.
