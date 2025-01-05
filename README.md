# Communication Tracking Calendar Application

A React-based application for tracking communications with companies, scheduling follow-ups, and managing engagement. This application includes an admin module, a user module, and a reporting module. It utilizes local storage for data persistence.

## Setup Instructions

1.  **Install Node.js and npm:**
    Make sure you have [Node.js](https://nodejs.org/) and npm (or yarn) installed on your system.

2.  **Clone the Repository:**

    ```bash
    git clone https://github.com/saivinay1805/communication-calendar-app.git
    cd communication-calendar-app
    ```

3.  **Install Dependencies:**

    ```bash
    npm install
    ```

4.  **Start the Development Server:**

    ```bash
    npm run dev
    ```

    This will start the application at `http://localhost:5173` (or a similar port).

## Functionality Notes

### Admin Module

*   **Company Management:**
    *   Add new companies with details like name, location, LinkedIn profile, email addresses, phone numbers, comments, and default communication periodicity.
    *   Edit existing company information.
    *   Delete companies.
*   **Communication Method Management:**
    *   Add new communication methods, including a name, description, sequence, and a mandatory flag.
    *   Edit existing communication methods.
    *   Delete communication methods.
    *   Default communication methods are provided.

### User Module

*   **Dashboard:**
    *   Displays a list of companies with their names.
    *   Shows the last five communications for each company.
    *   Displays the next scheduled communication date (based on the company's periodicity and last communication).
    *   Highlights overdue communication with red, due communications in yellow, with a toggle to override them on a per company basis.
    *   Tooltips are displayed on the last five communication texts to display their notes.
    *   A global search bar, to search for companies.
*   **Communication Action:**
    *   Allows users to log new communications for a company, selecting the method, date, and adding notes.
*   **Notifications:**
    *   Displays a list of companies with overdue communications.
    *   Displays a list of companies with communications due today.
    *   Displays a badge notification of the total overdue and due communications.
*   **Calendar View:**
    *   Displays past and upcoming communications on a calendar view.

### Reporting and Analytics Module

*   **Communication Frequency Report:**
    *   Displays a bar chart that shows the frequency of each communication method used.
    *   Provides date filters.
*   **Engagement Effectiveness Dashboard:**
    *   Displays a list of response rates for each of the communication methods (as a placeholder as no real tracking is implemented).
    *   Provides date filters.

### Data Persistence

*   The application uses `localStorage` to persist data between sessions, this means that the data is stored on the browser cache and will persist only until the cache is cleared.

## Known Limitations

*   This application uses local storage for data persistence, so data is not shared across multiple devices or browsers.
*   The engagement effectiveness dashboard is a placeholder, and there are no real metrics collected, response rate is just a placeholder with a percentage of total communication logs.
*  Real-time updates are not implemented.
*  There is no user authentication.
*  Overdue communication trends are not implemented.

## Optional Libraries Used

*   `react`, `react-dom`, `react-router-dom`: Core React libraries.
*   `@reduxjs/toolkit`, `react-redux`: For managing the state of the application. (Not fully implemented, could be used to simplify state management).
*   `tailwindcss`, `postcss`, `autoprefixer`: For styling the UI.
*   `date-fns`: For date manipulation.
*   `recharts`: For creating charts.
*   `@fullcalendar/react`, `@fullcalendar/core`, `@fullcalendar/daygrid`: For displaying the calendar view.
*   `uuid`: For creating unique IDs.
  `react-datepicker`: For selecting dates.

## Live Application

[Your Live Application URL](https://communication-calendar-lg7sw2gb7-saivinay1805s-projects.vercel.app/)
