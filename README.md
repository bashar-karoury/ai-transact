# AI Transact

AI Transact is an intelligent expense and income tracking system designed to help users manage their finances effectively. With advanced AI-powered features and an intuitive interface, AI Transact simplifies financial management by providing insights, tracking budgets, and enabling seamless transaction entry.

## Features
- **Budget Management**: Set budgets and receive notifications when you exceed them.
- **Data Visualization**: Intuitive charts display income and expenses broken down by day, week, or month.
- **AI-Powered Categorization**: Automatically categorize transactions for better insights.
- **Voice Input**: Add new transactions using voice commands for a hands-free experience.

## Team Members
- **Mohamed Abdalla**: Back-End Software Engineer 
- **Bashar Sirelkhatim**: Software Enginner
- **Minnatalla Sabrii**: Front-End Developer

## Project Architecture

### Front End
- **Next.js**: Fast, server-rendered React framework.
- **React**: For dynamic and interactive UI components.
- **Chart.js & react-chartjs-2**: Customizable charts to visualize financial data.

### Back End
- **Node.js**: Manages server-side logic and API endpoints.
- **Mongoose**: Integrates with MongoDB for efficient database operations.

### AI Features
- **@google/generative-ai**: Powers automatic transaction categorization and Transaction Deduction from Transcript
- **AssemblyAI**: Handles voice recording and transcription for transaction entry.

## Development Report
- **MVP Features**:
  - Comprehensive user authentication and secure account management.
  - Interactive dashboard with financial summaries and visual analytics.
  - Detailed transaction management with automatic categorization.
  - Budget creation and monitoring with progress tracking.
  - Voice command integration for transaction entry.
  - Smart notifications for budget alerts.

## Next Steps
- Expand AI features to include predictive analytics for forecasting expenses and income.
- Develop a mobile application for enhanced accessibility.
- Allow users to create custom categories and tailor notification preferences.
- Gather user feedback post-launch to identify areas for improvement and prioritize updates.
  
## How to Run the Code
To run AI Transact locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd ai-transact
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the application:
   ```bash
   npm run start
   ```
5. Open your browser and navigate to `http://localhost:3000` to access the application.
