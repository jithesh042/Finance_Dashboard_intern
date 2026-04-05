import { useFinance } from "../context/FinanceContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


export default function ExportButton() {
  const { transactions } = useFinance();

  const handleExportPDF = () => {
    if (!transactions || transactions.length === 0) {
      alert("No transactions to export");
      return;
    }

    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text("Transaction Report", 14, 15);

    // Table Columns
    const tableColumn = ["Date", "Category", "Amount", "Type"];

    // Table Rows
    const tableRows = transactions.map((tx) => [
      tx.date,
      tx.category,
      `Rs.${tx.amount}`,
      tx.type,
    ]);

    // Create Table
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    // Save PDF
    const date = new Date().toISOString().split("T")[0];
    doc.save(`transactions-${date}.pdf`);
  };

  return (
    <button onClick={handleExportPDF}>
      Download PDF
    </button>
  );
}