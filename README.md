React Finance Dashboard

--Setup Instructions--
git clone https://github.com/your-username/finance-dashboard.git
cd finance-dashboard
npm install
npm install recharts
npm install framer-motion
npm install @recharts/devtools
npm install jspdf jspdf-autotable


--Tech Stack--

Frontend: React, Recharts, HTML5, CSS3
Charts & Data Viz: Recharts (LineChart, PieChart, BarChart)
State Management: React Context (FinanceContext)
Data Persistence: localStorage
PDF Export: jspdf + jspdf-autotable
Optional: Dark mode, animations via CSS transitions

--Features--

1. Transactions Management
Add, edit, and delete transactions locally (saved in localStorage).
Supports categories:
* Health
* Entertainment
* Education
* Salary, Freelance, Food, Shopping, etc.
Filter transactions by category

2. Charts & Analytics

* Line Chart: Daily totals, income, and expense.
* Pie Chart: Expense breakdown by category.
* Bar Chart: Monthly comparison of income vs expenses.
* Charts dynamically reflect date range selection.

3. Smart Insights

* Monthly totals for income and expenses and previous month comparison.

4. Download Transaction
* Download transactions as PDF with table layout.

5. UI & UX

* Dark Mode toggle.
* Responsive design: Mobile-first, cards for small screens, tables for desktop.
* Smooth animations and transitions.
* Consistent, centralized theme variables in CSS.

6. Technical Features

* React Context API for state management.
* Modular and reusable components: Transactions, Charts, ExportButton.
* Local storage integration for persistent transactions.
* Easy-to-extend architecture for additional analytics or categories.
