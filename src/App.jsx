import React, { useState, useRef, useEffect } from 'react';
import { Download, FileText, LayoutTemplate } from 'lucide-react';
import Editor from './components/Editor';
import Preview from './components/Preview';
import html2pdf from 'html2pdf.js';
import { exportToDocx } from './utils/exportDocx';
import { downloadBlob } from './utils/downloadBlob';
import './index.css';

function App() {
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('resumeData_ekta_final');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure new arrays exist for backward compatibility
        return {
          ...parsed,
          projects: parsed.projects || [],
          certifications: parsed.certifications || [],
          languages: parsed.languages || []
        };
      } catch (e) {
        console.error("Error parsing saved resumeData:", e);
      }
    }
    return {
      personalInfo: {
        fullName: 'Ekta Gangwani',
        title: 'Dance Instructor & Yoga Master',
        email: 'im.ekta.gangwani@gmail.com',
        phone: '7413004607',
        location: 'B-97 Ramngariya, Near SKIT College, Jagatpura, Jaipur',
        website: 'youtube.com/@imekta (1.2 Lakh+ Subs)',
        summary: 'Versatile and passionate Dance Instructor and Yoga Master with extensive experience in various dance forms and structural yoga therapies. Proud creator of a thriving YouTube community with over 1.2 Lakh subscribers for dance content. Certified in advanced yoga therapies (1000 Hrs) and fitness coaching (250 Hrs), dedicated to promoting holistic health and happiness through movement and mindfulness. Known as an all-rounder in all types of dance and recognized for exemplary contribution to Yoga.',
        profilePicture: '',
      },
      experience: [
        {
          id: 1,
          company: 'YouTube Content Creator',
          role: 'Professional Dancer & Choreographer',
          startDate: '2019',
          endDate: 'Present',
          description: 'Manages a highly successful YouTube channel with over 1.2 Lakh (120,000+) subscribers. Creates engaging dance covers, tutorials, and choreography videos spanning multiple dance styles. Recognized as an all-rounder with expertise in all types of dance.',
        },
        {
          id: 2,
          company: 'Freelance & Various Institutes',
          role: 'Dance & Yoga Instructor',
          startDate: '2018',
          endDate: 'Present',
          description: 'Provides comprehensive instruction in diverse dance forms and yoga disciplines. Focuses on holistic development, combining rhythmic movement with structured fitness yoga to enhance physical and mental well-being.',
        }
      ],
      education: [
        {
          id: 1,
          school: 'Yogapeace Sansthan (YCB Accredited)',
          degree: '1000 Hours Advanced Yoga Therapy Master Course',
          startDate: 'Oct 2022',
          endDate: 'Jan 2023',
          description: 'Successfully completed the comprehensive Advanced Yoga Therapy Master Course, signifying high-level expertise in therapeutic yoga applications.',
        },
        {
          id: 2,
          school: 'Yogapeace Sansthan (YCB Accredited)',
          degree: '250 Hours Fitness Yoga Coach',
          startDate: 'Sept 2022',
          endDate: 'Oct 2022',
          description: 'Accredited Yoga Fitness Coach, dedicated to serving mankind and taking them on the path of Health to Happiness.',
        },
        {
          id: 3,
          school: 'Nagar Nigam, Greater Jaipur',
          degree: 'Yoga Mahotsav 2023 Prashasti Patra',
          startDate: 'June 2023',
          endDate: 'June 2023',
          description: 'Awarded a certificate of appreciation (Prashasti Patra) for outstanding contribution as a Yoga Motivator (Yog Prerak) during Yoga Mahotsav 2023.',
        }
      ],
      projects: [],
      certifications: [],
      languages: [],
      skills: ['All Dance Styles', 'Choreography', '1000-Hr Yoga Therapy', 'Fitness Yoga Coaching', 'YouTube Content Creation', 'Teaching & Mentoring']
    };
  });

  const [isCVMode, setIsCVMode] = useState(() => {
    return localStorage.getItem('isCVMode_ekta') === 'true';
  });

  const [selectedTemplate, setSelectedTemplate] = useState(() => {
    return localStorage.getItem('selectedTemplate_ekta') || 'creative';
  });

  useEffect(() => {
    localStorage.setItem('resumeData_ekta_final', JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    localStorage.setItem('selectedTemplate_ekta', selectedTemplate);
  }, [selectedTemplate]);

  useEffect(() => {
    localStorage.setItem('isCVMode_ekta', isCVMode);
  }, [isCVMode]);

  const previewRef = useRef(null);

  const handleExportPdf = () => {
    if (!previewRef.current) return;
    
    const element = previewRef.current;
    
    if (isCVMode) {
      // Standard multi-page PDF export using html2pdf
      const opt = {
        margin:       10,
        filename:     'AestheticCV.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, letterRendering: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      html2pdf().set(opt).from(element).save();
    } else {
      // Temporarily remove print-scaling limits by configuring html2pdf
      // Use html2canvas directly to capture the image, then add it to jsPDF manually
      // This provides the most control over scaling everything onto exactly 1 page
      import('html2canvas').then(({ default: html2canvas }) => {
        import('jspdf').then(({ default: jsPDF }) => {
            html2canvas(element, {
                scale: 2,
                useCORS: true,
                letterRendering: true,
                windowWidth: element.scrollWidth,
                height: element.scrollHeight
            }).then((canvas) => {
                const imgData = canvas.toDataURL('image/jpeg', 0.98);
                
                // A4 dimensions in mm
                const pdf = new jsPDF('p', 'mm', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                
                // Calculate image dimensions to fit perfectly on A4
                const imgProps = pdf.getImageProperties(imgData);
                const imgRatio = imgProps.height / imgProps.width;
                
                const renderWidth = pdfWidth;
                const renderHeight = pdfWidth * imgRatio;
                
                // If the height is too tall for 1 page, we just shrink it to fit!
                let finalWidth = renderWidth;
                let finalHeight = renderHeight;
                
                if (renderHeight > pdfHeight) {
                    // It's too tall, scale down based on height to force 1 page
                    finalHeight = pdfHeight;
                    finalWidth = pdfHeight / imgRatio;
                }
                
                // Center it horizontally if it got shrunk
                const xOffset = (pdfWidth - finalWidth) / 2;
                
                pdf.addImage(imgData, 'JPEG', xOffset, 0, finalWidth, finalHeight);
                
                // Save as blob
                const pdfBlob = pdf.output('blob');
                downloadBlob(pdfBlob, 'AestheticResume.pdf');
            }).catch(err => {
                console.error("PDF generation failed:", err);
            });
        });
      });
    }
  };

  const handleExportDocx = async () => {
    await exportToDocx(resumeData);
  };

  return (
    <div className="app-container">
      <div className="editor-panel">
        <div className="editor-header">
          <LayoutTemplate size={32} style={{ color: 'var(--primary)' }} />
          <span>AestheticResume</span>
        </div>

        <Editor 
          resumeData={resumeData} 
          setResumeData={setResumeData} 
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          isCVMode={isCVMode}
          setIsCVMode={setIsCVMode}
        />
      </div>

      <div className="preview-panel">
        <div className="export-actions">
          <button className="btn btn-outline" onClick={handleExportDocx}>
            <FileText size={18} />
            Export DOCX
          </button>
          <button className="btn btn-primary" onClick={handleExportPdf}>
            <Download size={18} />
            Export PDF
          </button>
        </div>

        <div className="resume-wrapper" data-template={selectedTemplate}>
          <Preview data={resumeData} selectedTemplate={selectedTemplate} ref={previewRef} isCVMode={isCVMode} />
        </div>
      </div>
    </div>
  )
}

export default App;
