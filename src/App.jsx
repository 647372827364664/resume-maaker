import React, { useState, useRef, useEffect } from 'react';
import { Download, FileText, LayoutTemplate, Loader2 } from 'lucide-react';
import Editor from './components/Editor';
import Preview from './components/Preview';
import html2pdf from 'html2pdf.js';
import { exportToDocx } from './utils/exportDocx';
import './index.css';

function App() {
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('resumeData_ekta_single_page');
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
        location: 'Jaipur, Rajasthan',
        website: 'youtube.com/@imekta',
        summary: 'Passionate Dance Instructor & Yoga Master. Creator of a 1.2 Lakh+ YouTube community. Dedicated to holistic health through movement and mindfulness.',
        profilePicture: '',
      },
      experience: [
        {
          id: 1,
          company: 'YouTube Content Creator',
          role: 'Professional Dancer & Choreographer',
          startDate: '2019',
          endDate: 'Present',
          description: 'Manage a successful YouTube channel (1.2 Lakh+ subs); produce engaging dance covers and tutorials across multiple styles.',
        },
        {
          id: 2,
          company: 'Freelance & Various Institutes',
          role: 'Dance & Yoga Instructor',
          startDate: '2018',
          endDate: 'Present',
          description: 'Provide instruction in diverse dance forms and structured fitness yoga for physical and mental well-being.',
        }
      ],
      education: [
        {
          id: 1,
          school: "Maharani's College, Jaipur",
          degree: 'M.A. (Sociology)',
          startDate: '2022',
          endDate: '2024',
          description: 'Focused on contemporary theories and Indian society.',
        },
        {
          id: 2,
          school: 'Yogapeace Sansthan (YCB)',
          degree: 'Advanced Yoga Therapy (1000 Hrs) & Fitness Coach (250 Hrs)',
          startDate: '2022',
          endDate: '2023',
          description: 'Demonstrating high-level expertise in therapeutic yoga applications.',
        }
      ],
      projects: [
        {
          id: 1,
          name: 'YouTube Dance Channel',
          role: 'Creator & Choreographer',
          startDate: '2019',
          endDate: 'Present',
          link: 'youtube.com/@imekta',
          description: 'Produced 200+ videos, achieving millions of views and strong community engagement.',
        },
        {
          id: 2,
          name: 'Yoga Mahotsav & Workshops',
          role: 'Organiser & Lead Motivator',
          startDate: '2021',
          endDate: 'Present',
          link: '',
          description: 'Led yoga awareness sessions and conducted holistic dance fitness workshops for community centers.',
        }
      ],
      certifications: [
        {
          id: 1,
          title: '1000 Hrs Advanced Yoga Therapy',
          issuer: 'Yogapeace Sansthan',
          date: '2023',
          link: '',
        },
        {
          id: 2,
          title: 'Prashasti Patra (Appreciation)',
          issuer: 'Nagar Nigam, Jaipur',
          date: '2023',
          link: '',
        }
      ],
      languages: ['Hindi', 'English'],
      skills: ['Choreography', 'Yoga Therapy', 'Content Creation', 'Teaching', 'Fitness Coaching']
    };
  });

  const [isCVMode, setIsCVMode] = useState(() => {
    return localStorage.getItem('isCVMode_ekta') === 'true';
  });

  const [selectedTemplate, setSelectedTemplate] = useState(() => {
    return localStorage.getItem('selectedTemplate_ekta') || 'creative';
  });

  useEffect(() => {
    localStorage.setItem('resumeData_ekta_single_page', JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    localStorage.setItem('selectedTemplate_ekta', selectedTemplate);
  }, [selectedTemplate]);

  useEffect(() => {
    localStorage.setItem('isCVMode_ekta', isCVMode);
  }, [isCVMode]);

  const [fontFamily, setFontFamily] = useState(() => {
    return localStorage.getItem('fontFamily_ekta') || 'Inter';
  });

  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('fontSize_ekta') || 'medium';
  });

  useEffect(() => {
    localStorage.setItem('fontFamily_ekta', fontFamily);
  }, [fontFamily]);

  useEffect(() => {
    localStorage.setItem('fontSize_ekta', fontSize);
  }, [fontSize]);

  const [exportLoading, setExportLoading] = useState(false);

  const previewRef = useRef(null);

  const handleExportPdf = async () => {
    if (!previewRef.current) return;
    setExportLoading(true);
    
    const element = previewRef.current;
    
    try {
      // Universal multi-page PDF export using html2pdf
      const opt = {
        margin:       0,
        filename:     isCVMode ? 'AestheticCV.pdf' : 'AestheticResume.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, letterRendering: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
      };
      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error('PDF generation failed:', err);
    }
    setExportLoading(false);
  };

  const handleExportDocx = async () => {
    setExportLoading(true);
    try {
      await exportToDocx(resumeData);
    } catch (err) {
      console.error('DOCX export failed:', err);
    }
    setExportLoading(false);
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
          fontFamily={fontFamily}
          setFontFamily={setFontFamily}
          fontSize={fontSize}
          setFontSize={setFontSize}
        />
      </div>

      <div className="preview-panel">
        <div className="export-actions">
          <button className="btn btn-outline" onClick={handleExportDocx} disabled={exportLoading}>
            {exportLoading ? <Loader2 size={18} className="spin-icon" /> : <FileText size={18} />}
            Export DOCX
          </button>
          <button className="btn btn-primary" onClick={handleExportPdf} disabled={exportLoading}>
            {exportLoading ? <Loader2 size={18} className="spin-icon" /> : <Download size={18} />}
            Export PDF
          </button>
        </div>

        <div className="resume-wrapper" data-template={selectedTemplate} data-cv-mode={isCVMode.toString()}>
          <Preview data={resumeData} selectedTemplate={selectedTemplate} ref={previewRef} isCVMode={isCVMode} fontFamily={fontFamily} fontSize={fontSize} />
        </div>
      </div>

      {/* Export Loading Overlay */}
      {exportLoading && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999,
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            background: 'white', borderRadius: '16px', padding: '2rem 3rem',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
            boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
          }}>
            <Loader2 size={36} className="spin-icon" style={{ color: 'var(--primary)' }} />
            <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>Generating your document...</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default App;
