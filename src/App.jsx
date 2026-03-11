import React, { useState, useRef, useEffect } from 'react';
import { Download, FileText, LayoutTemplate, Loader2 } from 'lucide-react';
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
          school: 'Maharani\'s College, University of Rajasthan, Jaipur',
          degree: 'M.A. (Sociology) — Second Division',
          startDate: '2022',
          endDate: '2024',
          description: 'Completed M.A. (Final) in Sociology with 456/900 marks. Papers: Contemporary Sociological Theories, Social Thinkers, Studies on Indian Society, Population Studies, Political Sociology.',
        },
        {
          id: 2,
          school: 'University of Rajasthan, Jaipur (Non-Collegiate)',
          degree: 'B.A. (Bachelor of Arts)',
          startDate: '2019',
          endDate: '2022',
          description: 'Completed Bachelor of Arts degree with 828/1800 marks. Three-year undergraduate programme from the University of Rajasthan.',
        },
        {
          id: 3,
          school: 'Yogapeace Sansthan (YCB Accredited)',
          degree: '1000 Hours Advanced Yoga Therapy Master Course',
          startDate: 'Oct 2022',
          endDate: 'Jan 2023',
          description: 'Successfully completed the comprehensive Advanced Yoga Therapy Master Course, signifying high-level expertise in therapeutic yoga applications.',
        },
        {
          id: 4,
          school: 'Yogapeace Sansthan (YCB Accredited)',
          degree: '250 Hours Fitness Yoga Coach',
          startDate: 'Sept 2022',
          endDate: 'Oct 2022',
          description: 'Accredited Yoga Fitness Coach, dedicated to serving mankind and taking them on the path of Health to Happiness.',
        }
      ],
      projects: [
        {
          id: 1,
          name: 'YouTube Dance Channel — @imekta',
          role: 'Creator & Choreographer',
          startDate: '2019',
          endDate: 'Present',
          link: 'https://youtube.com/@imekta',
          description: 'Built and managed a YouTube channel from scratch to 1.2 Lakh+ subscribers. Produced 200+ dance covers, tutorials, and choreography videos across Bollywood, Semi-Classical, Folk, and Contemporary styles. Achieved millions of views and strong community engagement.',
        },
        {
          id: 2,
          name: 'Yoga Mahotsav 2023 — Yoga Motivator Campaign',
          role: 'Lead Yoga Prerak (Motivator)',
          startDate: 'June 2023',
          endDate: 'June 2023',
          link: '',
          description: 'Led yoga awareness and motivation sessions during the Nagar Nigam Greater Jaipur Yoga Mahotsav 2023. Received Prashasti Patra (Certificate of Appreciation) for outstanding contribution and community impact.',
        },
        {
          id: 3,
          name: 'Holistic Dance & Yoga Workshop Series',
          role: 'Organizer & Instructor',
          startDate: '2021',
          endDate: 'Present',
          link: '',
          description: 'Designed and conducted a blend of dance fitness and therapeutic yoga workshops for community centers and private groups. Integrated multiple dance styles with structured yoga flows for holistic well-being.',
        }
      ],
      certifications: [
        {
          id: 1,
          title: '1000 Hours Advanced Yoga Therapy Master Course',
          issuer: 'Yogapeace Sansthan (YCB Accredited)',
          date: 'Jan 2023',
          link: '',
        },
        {
          id: 2,
          title: '250 Hours Fitness Yoga Coach',
          issuer: 'Yogapeace Sansthan (YCB Accredited)',
          date: 'Oct 2022',
          link: '',
        },
        {
          id: 3,
          title: 'Prashasti Patra — Yoga Mahotsav 2023',
          issuer: 'Nagar Nigam, Greater Jaipur',
          date: 'June 2023',
          link: '',
        },
        {
          id: 4,
          title: 'M.A. Sociology (University of Rajasthan)',
          issuer: 'Maharani\'s College, Jaipur',
          date: '2024',
          link: '',
        },
        {
          id: 5,
          title: 'B.A. (University of Rajasthan)',
          issuer: 'University of Rajasthan, Jaipur',
          date: '2022',
          link: '',
        }
      ],
      languages: ['Hindi', 'English', 'Rajasthani'],
      skills: ['All Dance Styles', 'Choreography', '1000-Hr Yoga Therapy', 'Fitness Yoga Coaching', 'YouTube Content Creation', 'Teaching & Mentoring', 'Sociology', 'Community Engagement']
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
    
    if (isCVMode) {
      // Standard multi-page PDF export using html2pdf
      const opt = {
        margin:       0,
        filename:     'AestheticCV.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, letterRendering: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
      };
      await html2pdf().set(opt).from(element).save();
      setExportLoading(false);
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
                setExportLoading(false);
            }).catch(err => {
                console.error("PDF generation failed:", err);
                setExportLoading(false);
            });
        });
      });
    }
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
