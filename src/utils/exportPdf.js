import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const exportToPdf = async (element) => {
    if (!element) return;

    try {
        const canvas = await html2canvas(element, {
            scale: 2, // higher resolution
            useCORS: true,
            logging: false,
        });

        const imgData = canvas.toDataURL('image/png');
        // A4 dimensions in mm: 210 x 297
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        // The width is 210, we calculate height to maintain aspect ratio
        const pdfWidth = 210;
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        // Prevent height from cutting awkwardly if possible, but for A4 we will render it fully.
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('AestheticResume.pdf');
    } catch (error) {
        console.error('Error generating PDF', error);
    }
};
