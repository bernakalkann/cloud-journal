import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const exportToPdf = (tasks, diaries) => {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(22);
  doc.setTextColor(59, 130, 246); // blue
  doc.text("Cloud Journal - Daily Report", 20, 20);
  
  // Date
  doc.setFontSize(12);
  doc.setTextColor(107, 114, 128); // gray
  doc.text(`Tarih: ${new Date().toLocaleDateString('tr-TR')}`, 20, 30);
  
  // Tasks Section
  doc.setFontSize(16);
  doc.setTextColor(17, 24, 39); // dark
  doc.text("Daily Tasks", 20, 45);

  const taskRows = tasks.map((t, i) => [i + 1, t.title, t.completed ? 'YES' : 'NO']);
  doc.autoTable({
    startY: 50,
    head: [['#', 'Task', 'Completed']],
    body: taskRows,
    theme: 'striped',
    headStyles: { fillColor: [59, 130, 246] }
  });

  // Diaries Section
  doc.setFontSize(16);
  let currentY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 15 : 60;
  doc.text("Diary Entries", 20, currentY);
  
  const diaryRows = diaries.map(d => [
    new Date(d.date).toLocaleDateString('tr-TR'),
    d.content.length > 80 ? d.content.substring(0, 80) + '...' : d.content
  ]);

  doc.autoTable({
    startY: currentY + 5,
    head: [['Date', 'Entry Snippet']],
    body: diaryRows,
    theme: 'grid',
    headStyles: { fillColor: [17, 24, 39] }
  });

  doc.save('Cloud_Journal_Report.pdf');
};
