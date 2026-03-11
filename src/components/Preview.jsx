import React, { forwardRef } from 'react';

const Preview = forwardRef(({ data, selectedTemplate, isCVMode }, ref) => {
    const { personalInfo, experience, education, skills, projects, certifications, languages } = data;

    // Define colors and fonts based on selected template
    const getThemeStyles = () => {
        switch (selectedTemplate) {
            case 'minimal':
                return {
                    bg: '#ffffff',
                    border: '1px solid #e2e8f0', // Clean thin border
                    text: '#000000',
                    primary: '#d53f8c', // Pink accent
                    secondaryText: '#666666',
                    fontDisplay: "'Inter', sans-serif",
                    fontHeading: "'Outfit', sans-serif",
                    fontBody: "'Inter', sans-serif",
                    headerAlign: 'center',
                    accentVisible: false,
                };
            case 'professional':
                return {
                    bg: '#fcfcfc',
                    bgImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(44,62,80,0.02) 10px, rgba(44,62,80,0.02) 20px)',
                    border: 'double 8px #2c3e50', // Classic double border
                    text: '#333333',
                    primary: '#2c3e50',
                    secondaryText: '#555555',
                    fontHeading: "'Times New Roman', serif",
                    fontBody: "'Georgia', serif",
                    headerAlign: 'left',
                    accentVisible: true,
                    accentColor: '#2c3e50',
                    borderGradient: true,
                    bulletColor: '#2c3e50'
                };
            case 'creative':
                return {
                    bg: '#fffaf0', // Floral white / warm
                    bgImage: 'linear-gradient(135deg, #fffaf0 0%, #fdf2f8 50%, #f0fdf4 100%)',
                    border: 'none',
                    text: '#334155',
                    primary: '#be185d', // Deep pink / Rose
                    secondaryText: '#64748b',
                    fontDisplay: "'Playfair Display', serif",
                    fontHeading: "'Cormorant Garamond', serif",
                    fontBody: "'Montserrat', sans-serif",
                    headerAlign: 'center',
                    accentVisible: true,
                    accentColor: '#be185d',
                    creativeAccents: true,
                    bulletColor: 'rgba(190, 24, 93, 0.15)'
                };
            case 'modern':
            default:
                return {
                    bg: '#ffffff',
                    bgImage: 'radial-gradient(circle at 100% 0%, #fdf2f8 0%, transparent 25%), radial-gradient(circle at 0% 100%, #eff6ff 0%, transparent 25%)',
                    border: '8px solid #fdf2f8',
                    text: '#1e293b',
                    primary: '#d53f8c', // Vibrant Rose Pink
                    secondaryText: '#64748b',
                    fontDisplay: "'Dancing Script', cursive", // Elegant font for name
                    fontHeading: "'Outfit', sans-serif",
                    fontBody: "'Inter', sans-serif",
                    headerAlign: 'left',
                    accentVisible: true,
                    accentColor: '#d53f8c',
                    decorativeLeaves: true,
                    watermarkUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                    bulletColor: '#fbc2eb'
                };
        }
    };

    const theme = getThemeStyles();

    const FONT_IMPORTS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
    `;

    if (selectedTemplate === 'creative') {
        return (
            <div
                ref={ref}
                style={{
                    width: 'var(--a4-width)',
                    minHeight: 'var(--a4-height)',
                    background: theme.bgImage || theme.bg,
                    border: theme.border || 'none',
                    fontFamily: theme.fontBody,
                    color: theme.text,
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: isCVMode ? 'visible' : 'hidden',
                    height: isCVMode ? 'auto' : undefined
                }}
            >
                <style>{FONT_IMPORTS}</style>
                {/* Flowing background shapes */}
                <svg width="400" height="400" viewBox="0 0 100 100" style={{ position: 'absolute', top: '-100px', left: '-100px', opacity: 0.05, zIndex: 0, fill: theme.primary, animation: 'spin 60s linear infinite' }}>
                    <path d="M50 0 C70 0 90 20 90 40 C90 60 70 80 50 100 C30 80 10 60 10 40 C10 20 30 0 50 0 Z"></path>
                    <path d="M50 100 C70 100 90 80 90 60 C90 40 70 20 50 0 C30 20 10 40 10 60 C10 80 30 100 50 100 Z" style={{ opacity: 0.5 }}></path>
                </svg>
                <svg width="300" height="300" viewBox="0 0 100 100" style={{ position: 'absolute', bottom: '-50px', right: '-50px', opacity: 0.05, zIndex: 0, fill: '#16a34a', transform: 'rotate(45deg)' }}>
                     <path d="M50 0 C70 0 90 20 90 40 C90 60 70 80 50 100 C30 80 10 60 10 40 C10 20 30 0 50 0 Z"></path>
                </svg>

                {/* Header section */}
                <div style={{ textAlign: 'center', padding: '2.5rem 2.5rem 1rem 2.5rem', zIndex: 1, position: 'relative' }}>
                    {personalInfo.profilePicture && (
                        <img 
                            src={personalInfo.profilePicture} 
                            alt="Profile" 
                            style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${theme.primary}`, padding: '3px', marginBottom: '0.75rem', boxShadow: '0 8px 24px rgba(190, 24, 93, 0.15)' }}
                        />
                    )}
                    <h1 style={{ fontFamily: theme.fontDisplay, fontSize: '3.2rem', fontWeight: 700, color: theme.primary, letterSpacing: '1.5px', textTransform: 'uppercase', margin: 0, lineHeight: 1.1 }}>
                        {personalInfo.fullName}
                    </h1>
                    <h2 style={{ fontFamily: theme.fontBody, fontSize: '0.95rem', fontWeight: 600, letterSpacing: '4px', textTransform: 'uppercase', color: theme.secondaryText, marginTop: '0.75rem', marginBottom: '1rem' }}>
                        {personalInfo.title}
                    </h2>
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', fontSize: '0.85rem', fontFamily: theme.fontBody, color: theme.text, fontWeight: 500 }}>
                        {personalInfo.phone && <span>{personalInfo.phone}</span>}
                        {(personalInfo.phone && personalInfo.email) && <span style={{ color: theme.primary }}>|</span>}
                        {personalInfo.email && <span>{personalInfo.email}</span>}
                        {((personalInfo.phone || personalInfo.email) && personalInfo.location) && <span style={{ color: theme.primary }}>|</span>}
                        {personalInfo.location && <span>{personalInfo.location}</span>}
                    </div>
                    {personalInfo.website && (
                        <div style={{ marginTop: '0.4rem', fontSize: '0.9rem', fontWeight: 600, color: theme.primary }}>
                            {personalInfo.website}
                        </div>
                    )}
                </div>

                {/* Main Content */}
                <div style={{ padding: '0 3rem 1.5rem 3rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', zIndex: 1, position: 'relative' }}>
                    {/* Summary */}
                    {personalInfo.summary && (
                        <div style={{ textAlign: 'center', borderTop: `1px solid ${theme.primary}40`, borderBottom: `1px solid ${theme.primary}40`, padding: '1rem 0', position: 'relative' }}>
                            <span style={{ position: 'absolute', top: '-18px', left: '50%', transform: 'translateX(-50%)', background: theme.bgImage.includes('gradient') ? '#fffaf0' : theme.bg, padding: '0 10px', color: theme.primary, fontSize: '1.5rem', fontFamily: theme.fontDisplay }}>❦</span>
                            <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, fontStyle: 'italic', fontFamily: theme.fontDisplay, color: theme.text, fontWeight: 500 }}>
                                "{personalInfo.summary}"
                            </p>
                        </div>
                    )}

                    {/* Columns for Exp / Edu */}
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        {/* Experience */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <h3 style={{ fontFamily: theme.fontHeading, fontSize: '1.6rem', color: theme.primary, borderBottom: `2px solid ${theme.primary}`, paddingBottom: '0.2rem', margin: 0, display: 'inline-block' }}>Experience</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {experience.map((exp, idx) => (
                                    <div key={exp.id || idx}>
                                        <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.05rem', fontWeight: 700, color: theme.text, fontFamily: theme.fontBody }}>
                                            {exp.role || 'Role'}
                                        </h4>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', alignItems: 'center' }}>
                                            <span style={{ fontWeight: 600, color: theme.primary, fontSize: '0.9rem' }}>{exp.company || 'Company'}</span>
                                            <span style={{ fontSize: '0.8rem', color: theme.text, fontWeight: 500, background: theme.bulletColor, padding: '0.2rem 0.6rem', borderRadius: '12px' }}>
                                                {exp.startDate} - {exp.endDate}
                                            </span>
                                        </div>
                                        {exp.description && (
                                            <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: 1.5, color: theme.secondaryText, whiteSpace: 'pre-wrap' }}>
                                                {exp.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Education */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <h3 style={{ fontFamily: theme.fontHeading, fontSize: '1.6rem', color: theme.primary, borderBottom: `2px solid ${theme.primary}`, paddingBottom: '0.2rem', margin: 0, display: 'inline-block' }}>Education</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {education.map((edu, idx) => (
                                    <div key={edu.id || idx}>
                                        <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.05rem', fontWeight: 700, color: theme.text, fontFamily: theme.fontBody }}>
                                            {edu.degree || 'Degree'}
                                        </h4>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', alignItems: 'center' }}>
                                            <span style={{ fontWeight: 600, color: theme.primary, fontSize: '0.9rem' }}>{edu.school || 'School'}</span>
                                            <span style={{ fontSize: '0.8rem', color: theme.text, fontWeight: 500, background: theme.bulletColor, padding: '0.2rem 0.6rem', borderRadius: '12px' }}>
                                                {edu.startDate} - {edu.endDate}
                                            </span>
                                        </div>
                                        {edu.description && (
                                            <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: 1.5, color: theme.secondaryText, whiteSpace: 'pre-wrap' }}>
                                                {edu.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Skills */}
                    {skills && skills.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '0.25rem' }}>
                            <div style={{ textAlign: 'center' }}>
                                <h3 style={{ fontFamily: theme.fontHeading, fontSize: '1.5rem', color: theme.primary, borderBottom: `2px solid ${theme.primary}`, paddingBottom: '0.2rem', margin: '0 auto', display: 'inline-block' }}>Expertise</h3>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.6rem' }}>
                                {skills.map((skill, idx) => (
                                    skill.trim() && (
                                        <span key={idx} style={{
                                            background: '#ffffff',
                                            color: theme.primary,
                                            border: `1px solid ${theme.primary}40`,
                                            padding: '0.3rem 0.8rem',
                                            borderRadius: '20px',
                                            fontSize: '0.85rem',
                                            fontWeight: 600,
                                            boxShadow: '0 2px 8px rgba(190, 24, 93, 0.05)'
                                        }}>
                                            {skill.trim()}
                                        </span>
                                    )
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Projects Integration */}
                    {projects && projects.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                            <h3 style={{ fontFamily: theme.fontHeading, fontSize: '1.6rem', color: theme.primary, borderBottom: `2px solid ${theme.primary}`, paddingBottom: '0.2rem', margin: 0, display: 'inline-block', alignSelf: 'flex-start' }}>Select Projects</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {projects.map((proj, idx) => (
                                    <div key={proj.id || idx}>
                                        <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.05rem', fontWeight: 700, color: theme.text, fontFamily: theme.fontBody }}>
                                            {proj.name || 'Project'}
                                        </h4>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', alignItems: 'center' }}>
                                            <span style={{ fontWeight: 600, color: theme.primary, fontSize: '0.9rem' }}>{proj.role}</span>
                                            <span style={{ fontSize: '0.8rem', color: theme.text, fontWeight: 500, background: theme.bulletColor, padding: '0.2rem 0.6rem', borderRadius: '12px' }}>
                                                {proj.startDate} - {proj.endDate}
                                            </span>
                                        </div>
                                        {proj.description && (
                                            <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: 1.5, color: theme.secondaryText, whiteSpace: 'pre-wrap' }}>
                                                {proj.description}
                                            </p>
                                        )}
                                        {proj.link && (
                                            <a href={proj.link} target="_blank" rel="noopener noreferrer" style={{ color: theme.primary, fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none', display: 'inline-block', marginTop: '0.2rem' }}>
                                                View Project ↗
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Certifications Integration */}
                    {certifications && certifications.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                            <h3 style={{ fontFamily: theme.fontHeading, fontSize: '1.6rem', color: theme.primary, borderBottom: `2px solid ${theme.primary}`, paddingBottom: '0.2rem', margin: 0, display: 'inline-block', alignSelf: 'flex-start' }}>Certifications</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {certifications.map((cert, idx) => (
                                    <div key={cert.id || idx}>
                                        <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.05rem', fontWeight: 700, color: theme.text, fontFamily: theme.fontBody }}>
                                            {cert.title || 'Certification Title'}
                                        </h4>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', alignItems: 'center' }}>
                                            <span style={{ fontWeight: 600, color: theme.primary, fontSize: '0.9rem' }}>{cert.issuer}</span>
                                            <span style={{ fontSize: '0.8rem', color: theme.text, fontWeight: 500, background: theme.bulletColor, padding: '0.2rem 0.6rem', borderRadius: '12px' }}>
                                                {cert.date}
                                            </span>
                                        </div>
                                        {cert.link && (
                                            <a href={cert.link} target="_blank" rel="noopener noreferrer" style={{ color: theme.primary, fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none', display: 'inline-block', marginTop: '0.2rem' }}>
                                                View Credential ↗
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Languages Integration */}
                    {languages && languages.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '1rem' }}>
                            <div style={{ textAlign: 'center' }}>
                                <h3 style={{ fontFamily: theme.fontHeading, fontSize: '1.5rem', color: theme.primary, borderBottom: `2px solid ${theme.primary}`, paddingBottom: '0.2rem', margin: '0 auto', display: 'inline-block' }}>Languages</h3>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.6rem' }}>
                                {languages.map((lang, idx) => (
                                    lang.trim() && (
                                        <span key={idx} style={{
                                            color: theme.text,
                                            fontSize: '0.9rem',
                                            fontWeight: 600,
                                        }}>
                                            {lang.trim()}{idx < languages.length - 1 ? ' •' : ''}
                                        </span>
                                    )
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    if (selectedTemplate === 'modern') {
        return (
            <div
                ref={ref}
                style={{
                    width: 'var(--a4-width)',
                    minHeight: 'var(--a4-height)',
                    background: theme.bgImage || theme.bg,
                    border: theme.border || 'none',
                    fontFamily: theme.fontBody,
                    color: theme.text,
                    boxSizing: 'border-box',
                    display: 'flex',
                    position: 'relative',
                    overflow: isCVMode ? 'visible' : 'hidden',
                    height: isCVMode ? 'auto' : undefined
                }}
            >
                {/* Decorative SVG */}
                {theme.decorativeLeaves && (
                    <svg width="250" height="250" viewBox="0 0 100 100" style={{ position: 'absolute', top: '-40px', right: '-40px', opacity: 0.08, zIndex: 0, fill: theme.primary, transform: 'rotate(45deg)' }}>
                        <path d="M50 0 C70 0 90 20 90 40 C90 60 70 80 50 100 C30 80 10 60 10 40 C10 20 30 0 50 0 Z"></path>
                        <path d="M50 100 C70 100 90 80 90 60 C90 40 70 20 50 0 C30 20 10 40 10 60 C10 80 30 100 50 100 Z" style={{ opacity: 0.5 }}></path>
                    </svg>
                )}

                {/* Left Sidebar (Dark Pink) */}
                <div style={{
                    width: '35%',
                    backgroundColor: theme.primary,
                    color: '#ffffff',
                    padding: '3rem 2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2.5rem',
                    zIndex: 1,
                    boxShadow: '4px 0 24px rgba(0,0,0,0.1)'
                }}>
                    {/* Profile Picture */}
                    {personalInfo.profilePicture && (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img 
                                src={personalInfo.profilePicture} 
                                alt="Profile" 
                                style={{
                                    width: '160px',
                                    height: '160px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    border: `6px solid rgba(255,255,255,0.2)`,
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
                                }}
                            />
                        </div>
                    )}

                    {/* Contact Info */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: theme.fontHeading, textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '0.5rem' }}>Contact</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem' }}>
                            {personalInfo.email && <span>{personalInfo.email}</span>}
                            {personalInfo.phone && <span>{personalInfo.phone}</span>}
                            {personalInfo.location && <span>{personalInfo.location}</span>}
                            {personalInfo.website && <span>{personalInfo.website}</span>}
                        </div>
                    </div>

                    {/* Skills */}
                    {skills && skills.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: theme.fontHeading, textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '0.5rem' }}>Expertise</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {skills.map((skill, idx) => (
                                    skill.trim() && (
                                        <div key={idx} style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)', fontSize: '0.95rem' }}>
                                            • {skill.trim()}
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Languages (Sidebar) */}
                    {languages && languages.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: theme.fontHeading, textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '0.5rem' }}>Languages</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {languages.map((lang, idx) => (
                                    lang.trim() && (
                                        <div key={idx} style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)', fontSize: '0.95rem' }}>
                                            • {lang.trim()}
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Main Content */}
                <div style={{
                    width: '65%',
                    padding: '3.5rem 3rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2.5rem',
                    zIndex: 1
                }}>
                    {/* Header */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <h1 style={{
                            fontSize: '4.5rem',
                            fontWeight: 700,
                            margin: 0,
                            lineHeight: 1,
                            fontFamily: theme.fontDisplay,
                            color: theme.primary
                        }}>
                            {personalInfo.fullName || 'Your Name'}
                        </h1>
                        <h2 style={{
                            fontSize: '1.5rem',
                            fontWeight: 500,
                            margin: 0,
                            letterSpacing: '3px',
                            textTransform: 'uppercase',
                            color: theme.secondaryText,
                            fontFamily: theme.fontHeading
                        }}>
                            {personalInfo.title || 'Professional Title'}
                        </h2>
                    </div>

                    {/* Summary */}
                    {personalInfo.summary && (
                        <div>
                            <p style={{
                                fontSize: '1.05rem',
                                lineHeight: 1.7,
                                color: theme.text,
                                margin: 0
                            }}>
                                {personalInfo.summary}
                            </p>
                        </div>
                    )}

                    {/* Experience */}
                    {experience && experience.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: theme.primary }} />
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', margin: 0, color: theme.primary, fontFamily: theme.fontHeading }}>Experience</h3>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', position: 'relative' }}>
                                {/* Timeline Line */}
                                <div style={{ position: 'absolute', left: '5px', top: '10px', bottom: '0', width: '2px', background: 'rgba(213, 63, 140, 0.2)' }} />
                                
                                {experience.map((exp, idx) => (
                                    <div key={exp.id || idx} style={{ position: 'relative', paddingLeft: '1.5rem' }}>
                                        <div style={{ position: 'absolute', left: '1px', top: '6px', width: '10px', height: '10px', borderRadius: '50%', background: theme.primary, border: '2px solid white' }} />
                                        <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.15rem', fontWeight: 600, color: theme.text, fontFamily: theme.fontHeading }}>
                                            {exp.role || 'Role'}
                                        </h4>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span style={{ fontWeight: 500, color: theme.secondaryText }}>{exp.company || 'Company'}</span>
                                            <span style={{ fontSize: '0.9rem', color: theme.primary, fontWeight: 600, background: theme.bulletColor, padding: '0.2rem 0.6rem', borderRadius: '12px' }}>
                                                {exp.startDate} - {exp.endDate}
                                            </span>
                                        </div>
                                        {exp.description && (
                                            <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: theme.secondaryText, whiteSpace: 'pre-wrap' }}>
                                                {exp.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Education */}
                    {education && education.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: theme.primary }} />
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', margin: 0, color: theme.primary, fontFamily: theme.fontHeading }}>Education</h3>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', position: 'relative' }}>
                                {/* Timeline Line */}
                                <div style={{ position: 'absolute', left: '5px', top: '10px', bottom: '0', width: '2px', background: 'rgba(213, 63, 140, 0.2)' }} />
                                
                                {education.map((edu, idx) => (
                                    <div key={edu.id || idx} style={{ position: 'relative', paddingLeft: '1.5rem' }}>
                                        <div style={{ position: 'absolute', left: '1px', top: '6px', width: '10px', height: '10px', borderRadius: '50%', background: theme.primary, border: '2px solid white' }} />
                                        <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.15rem', fontWeight: 600, color: theme.text, fontFamily: theme.fontHeading }}>
                                            {edu.degree || 'Degree'}
                                        </h4>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span style={{ fontWeight: 500, color: theme.secondaryText }}>{edu.school || 'School'}</span>
                                            <span style={{ fontSize: '0.9rem', color: theme.primary, fontWeight: 600, background: theme.bulletColor, padding: '0.2rem 0.6rem', borderRadius: '12px' }}>
                                                {edu.startDate} - {edu.endDate}
                                            </span>
                                        </div>
                                        {edu.description && (
                                            <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: theme.secondaryText, whiteSpace: 'pre-wrap' }}>
                                                {edu.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Projects */}
                    {projects && projects.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: theme.primary }} />
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', margin: 0, color: theme.primary, fontFamily: theme.fontHeading }}>Projects</h3>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', position: 'relative' }}>
                                <div style={{ position: 'absolute', left: '5px', top: '10px', bottom: '0', width: '2px', background: 'rgba(213, 63, 140, 0.2)' }} />
                                
                                {projects.map((proj, idx) => (
                                    <div key={proj.id || idx} style={{ position: 'relative', paddingLeft: '1.5rem' }}>
                                        <div style={{ position: 'absolute', left: '1px', top: '6px', width: '10px', height: '10px', borderRadius: '50%', background: theme.primary, border: '2px solid white' }} />
                                        <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.15rem', fontWeight: 600, color: theme.text, fontFamily: theme.fontHeading }}>
                                            {proj.name || 'Project Name'}
                                        </h4>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span style={{ fontWeight: 500, color: theme.secondaryText }}>{proj.role}</span>
                                            <span style={{ fontSize: '0.9rem', color: theme.primary, fontWeight: 600, background: theme.bulletColor, padding: '0.2rem 0.6rem', borderRadius: '12px' }}>
                                                {proj.startDate} - {proj.endDate}
                                            </span>
                                        </div>
                                        {proj.description && (
                                            <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: theme.secondaryText, whiteSpace: 'pre-wrap' }}>
                                                {proj.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Certifications */}
                    {certifications && certifications.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: theme.primary }} />
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', margin: 0, color: theme.primary, fontFamily: theme.fontHeading }}>Certifications</h3>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', position: 'relative' }}>
                                <div style={{ position: 'absolute', left: '5px', top: '10px', bottom: '0', width: '2px', background: 'rgba(213, 63, 140, 0.2)' }} />
                                
                                {certifications.map((cert, idx) => (
                                    <div key={cert.id || idx} style={{ position: 'relative', paddingLeft: '1.5rem' }}>
                                        <div style={{ position: 'absolute', left: '1px', top: '6px', width: '10px', height: '10px', borderRadius: '50%', background: theme.primary, border: '2px solid white' }} />
                                        <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.15rem', fontWeight: 600, color: theme.text, fontFamily: theme.fontHeading }}>
                                            {cert.title || 'Certification Title'}
                                        </h4>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span style={{ fontWeight: 500, color: theme.secondaryText }}>{cert.issuer}</span>
                                            <span style={{ fontSize: '0.9rem', color: theme.primary, fontWeight: 600, background: theme.bulletColor, padding: '0.2rem 0.6rem', borderRadius: '12px' }}>
                                                {cert.date}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Default return for Minimal and Professional templates
    return (
        <div
            ref={ref}
            style={{
                width: 'var(--a4-width)',
                minHeight: 'var(--a4-height)',
                padding: selectedTemplate === 'minimal' ? '4rem' : '3rem',
                background: theme.bgImage || theme.bg,
                border: theme.border || 'none',
                fontFamily: theme.fontBody,
                color: theme.text,
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                gap: selectedTemplate === 'minimal' ? '2.5rem' : '2rem',
                position: 'relative',
                overflow: isCVMode ? 'visible' : 'hidden',
                height: isCVMode ? 'auto' : undefined
            }}
        >
            {/* Decorative SVG for Modern template */}
            {theme.decorativeLeaves && (
                <svg width="250" height="250" viewBox="0 0 100 100" style={{ position: 'absolute', top: '-40px', right: '-40px', opacity: 0.08, zIndex: 0, fill: theme.primary, transform: 'rotate(45deg)' }}>
                    <path d="M50 0 C70 0 90 20 90 40 C90 60 70 80 50 100 C30 80 10 60 10 40 C10 20 30 0 50 0 Z"></path>
                    <path d="M50 100 C70 100 90 80 90 60 C90 40 70 20 50 0 C30 20 10 40 10 60 C10 80 30 100 50 100 Z" style={{ opacity: 0.5 }}></path>
                </svg>
            )}

            {/* Elegant Background Watermark for Modern */}
            {theme.watermarkUrl && (
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    right: '-10%',
                    width: '60%',
                    height: '60%',
                    backgroundImage: `url(${theme.watermarkUrl})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    opacity: 0.04,
                    zIndex: 0,
                    filter: 'grayscale(100%)',
                    pointerEvents: 'none'
                }} />
            )}

            {/* Top Border Gradient for Professional */}
            {theme.borderGradient && (
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, height: '8px',
                    background: 'linear-gradient(90deg, #2c3e50, #b0c4de, #2c3e50)',
                    zIndex: 2
                }} />
            )}

            {/* Content wrapper to ensure z-index over decorations */}
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: selectedTemplate === 'minimal' ? '2.5rem' : '2rem', height: '100%' }}>
                {/* Header section */}
            <div style={{
                borderBottom: theme.accentVisible ? `3px solid ${theme.accentColor}` : '1px solid #eaeaea',
                paddingBottom: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: selectedTemplate === 'minimal' ? 'center' : 'flex-start',
                justifyContent: 'space-between',
                gap: '1.5rem',
                textAlign: theme.headerAlign
            }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: selectedTemplate === 'minimal' ? 'center' : 'flex-start' }}>
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: 700,
                        margin: 0,
                        fontFamily: theme.fontHeading,
                        color: selectedTemplate === 'minimal' ? '#000' : theme.primary,
                        textTransform: selectedTemplate === 'minimal' ? 'uppercase' : 'none',
                        letterSpacing: selectedTemplate === 'minimal' ? '2px' : 'normal'
                    }}>
                        {personalInfo.fullName || 'Your Name'}
                    </h1>
                    <h2 style={{
                        fontSize: '1.25rem',
                        fontWeight: 500,
                        margin: 0,
                        color: theme.primary,
                        fontFamily: theme.fontHeading
                    }}>
                        {personalInfo.title || 'Professional Title'}
                    </h2>
                    
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: selectedTemplate === 'minimal' ? 'center' : 'flex-start',
                        gap: '1rem',
                        marginTop: '0.5rem',
                        fontSize: '0.9rem',
                        color: theme.secondaryText
                    }}>
                        {personalInfo.email && <span>{personalInfo.email}</span>}
                        {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                        {personalInfo.location && <span>• {personalInfo.location}</span>}
                        {personalInfo.website && <span>• {personalInfo.website}</span>}
                    </div>
                </div>
            </div>

            {/* Summary */}
            {personalInfo.summary && (
                <div>
                    {selectedTemplate !== 'minimal' && (
                        <h3 style={{
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            margin: '0 0 0.5rem 0',
                            color: theme.primary,
                            fontFamily: theme.fontHeading
                        }}>Summary</h3>
                    )}
                    <p style={{
                        fontSize: '1rem',
                        lineHeight: 1.6,
                        color: theme.text,
                        margin: 0,
                        textAlign: selectedTemplate === 'minimal' ? 'center' : 'left',
                        fontStyle: selectedTemplate === 'professional' ? 'italic' : 'normal'
                    }}>
                        {personalInfo.summary}
                    </p>
                </div>
            )}

            {/* Experience */}
            {experience && experience.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: `1px solid ${selectedTemplate === 'minimal' ? '#000' : '#e2e8f0'}`, paddingBottom: '0.5rem' }}>
                        <h3 style={{
                            fontSize: '1.25rem',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            margin: 0,
                            color: selectedTemplate === 'minimal' ? '#000' : '#0f172a',
                            fontFamily: theme.fontHeading
                        }}>Experience</h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {experience.map((exp, idx) => (
                            <div key={exp.id || idx}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                                    <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: theme.text, fontFamily: theme.fontHeading }}>
                                        {exp.role || 'Role'} <span style={{ fontWeight: selectedTemplate === 'minimal' ? 300 : 400, color: theme.secondaryText }}>{selectedTemplate === 'minimal' ? '|' : 'at'} {exp.company || 'Company'}</span>
                                    </h4>
                                    <span style={{ fontSize: '0.9rem', color: theme.primary, fontWeight: 500 }}>
                                        {exp.startDate} - {exp.endDate}
                                    </span>
                                </div>
                                {exp.description && (
                                    <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: theme.secondaryText, whiteSpace: 'pre-wrap' }}>
                                        {exp.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Education */}
            {education && education.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: `1px solid ${selectedTemplate === 'minimal' ? '#000' : '#e2e8f0'}`, paddingBottom: '0.5rem' }}>
                        <h3 style={{
                            fontSize: '1.25rem',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            margin: 0,
                            color: selectedTemplate === 'minimal' ? '#000' : '#0f172a',
                            fontFamily: theme.fontHeading
                        }}>Education</h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {education.map((edu, idx) => (
                            <div key={edu.id || idx}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                                    <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: theme.text, fontFamily: theme.fontHeading }}>
                                        {edu.degree || 'Degree'} <span style={{ fontWeight: selectedTemplate === 'minimal' ? 300 : 400, color: theme.secondaryText }}>{selectedTemplate === 'minimal' ? '|' : 'at'} {edu.school || 'School'}</span>
                                    </h4>
                                    <span style={{ fontSize: '0.9rem', color: theme.primary, fontWeight: 500 }}>
                                        {edu.startDate} - {edu.endDate}
                                    </span>
                                </div>
                                {edu.description && (
                                    <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: theme.secondaryText, whiteSpace: 'pre-wrap' }}>
                                        {edu.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Skills */}
            {skills && skills.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: `1px solid ${selectedTemplate === 'minimal' ? '#000' : '#e2e8f0'}`, paddingBottom: '0.5rem' }}>
                        <h3 style={{
                            fontSize: '1.25rem',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            margin: 0,
                            color: selectedTemplate === 'minimal' ? '#000' : '#0f172a',
                            fontFamily: theme.fontHeading
                        }}>Skills</h3>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: selectedTemplate === 'minimal' ? 'center' : 'flex-start' }}>
                        {skills.map((skill, idx) => (
                            skill.trim() && (
                                <span key={idx} style={{
                                    background: selectedTemplate === 'minimal' ? 'transparent' : '#f1f5f9',
                                    color: selectedTemplate === 'minimal' ? '#000' : '#334155',
                                    border: selectedTemplate === 'minimal' ? '1px solid #000' : 'none',
                                    padding: '0.4rem 0.8rem',
                                    borderRadius: selectedTemplate === 'minimal' ? '0' : '4px',
                                    fontSize: '0.9rem',
                                    fontWeight: 600
                                }}>
                                    {skill.trim()}
                                </span>
                            )
                        ))}
                    </div>
                </div>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: `1px solid ${selectedTemplate === 'minimal' ? '#000' : '#e2e8f0'}`, paddingBottom: '0.5rem' }}>
                        <h3 style={{
                            fontSize: '1.25rem',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            margin: 0,
                            color: selectedTemplate === 'minimal' ? '#000' : '#0f172a',
                            fontFamily: theme.fontHeading
                        }}>Projects</h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {projects.map((proj, idx) => (
                            <div key={proj.id || idx}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                                    <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: theme.text, fontFamily: theme.fontHeading }}>
                                        {proj.name || 'Project Name'} <span style={{ fontWeight: selectedTemplate === 'minimal' ? 300 : 400, color: theme.secondaryText }}>{proj.role ? `${selectedTemplate === 'minimal' ? '|' : '-'} ${proj.role}` : ''}</span>
                                    </h4>
                                    <span style={{ fontSize: '0.9rem', color: theme.primary, fontWeight: 500 }}>
                                        {proj.startDate} - {proj.endDate}
                                    </span>
                                </div>
                                {proj.description && (
                                    <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: theme.secondaryText, whiteSpace: 'pre-wrap' }}>
                                        {proj.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: `1px solid ${selectedTemplate === 'minimal' ? '#000' : '#e2e8f0'}`, paddingBottom: '0.5rem' }}>
                        <h3 style={{
                            fontSize: '1.25rem',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            margin: 0,
                            color: selectedTemplate === 'minimal' ? '#000' : '#0f172a',
                            fontFamily: theme.fontHeading
                        }}>Certifications</h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {certifications.map((cert, idx) => (
                            <div key={cert.id || idx}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                                    <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: theme.text, fontFamily: theme.fontHeading }}>
                                        {cert.title || 'Certification Title'} <span style={{ fontWeight: selectedTemplate === 'minimal' ? 300 : 400, color: theme.secondaryText }}>{selectedTemplate === 'minimal' ? '|' : 'from'} {cert.issuer}</span>
                                    </h4>
                                    <span style={{ fontSize: '0.9rem', color: theme.primary, fontWeight: 500 }}>
                                        {cert.date}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Languages */}
            {languages && languages.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: `1px solid ${selectedTemplate === 'minimal' ? '#000' : '#e2e8f0'}`, paddingBottom: '0.5rem' }}>
                        <h3 style={{
                            fontSize: '1.25rem',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            margin: 0,
                            color: selectedTemplate === 'minimal' ? '#000' : '#0f172a',
                            fontFamily: theme.fontHeading
                        }}>Languages</h3>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: selectedTemplate === 'minimal' ? 'center' : 'flex-start' }}>
                        {languages.map((lang, idx) => (
                            lang.trim() && (
                                <span key={idx} style={{
                                    background: selectedTemplate === 'minimal' ? 'transparent' : '#f1f5f9',
                                    color: selectedTemplate === 'minimal' ? '#000' : '#334155',
                                    border: selectedTemplate === 'minimal' ? '1px solid #000' : 'none',
                                    padding: '0.4rem 0.8rem',
                                    borderRadius: selectedTemplate === 'minimal' ? '0' : '4px',
                                    fontSize: '0.9rem',
                                    fontWeight: 600
                                }}>
                                    {lang.trim()}
                                </span>
                            )
                        ))}
                    </div>
                </div>
            )}
            </div>
        </div>
    );
});

export default Preview;
