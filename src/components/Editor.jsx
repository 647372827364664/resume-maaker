import React from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, Image as ImageIcon } from 'lucide-react';

const Editor = ({ resumeData, setResumeData, selectedTemplate, setSelectedTemplate, isCVMode, setIsCVMode }) => {
    const handlePersonalInfoChange = (e) => {
        const { name, value } = e.target;
        setResumeData((prev) => ({
            ...prev,
            personalInfo: {
                ...prev.personalInfo,
                [name]: value,
            },
        }));
    };

    const handleArrayChange = (section, index, e) => {
        const { name, value } = e.target;
        const newArray = [...resumeData[section]];
        newArray[index] = { ...newArray[index], [name]: value };
        setResumeData((prev) => ({ ...prev, [section]: newArray }));
    };

    const addItem = (section, emptyItem) => {
        setResumeData((prev) => ({
            ...prev,
            [section]: [...prev[section], emptyItem],
        }));
    };

    const removeItem = (section, index) => {
        const newArray = [...resumeData[section]];
        newArray.splice(index, 1);
        setResumeData((prev) => ({ ...prev, [section]: newArray }));
    };

    const moveItem = (section, index, direction) => {
        const newArray = [...resumeData[section]];
        if (direction === 'up' && index > 0) {
            [newArray[index - 1], newArray[index]] = [newArray[index], newArray[index - 1]];
            setResumeData((prev) => ({ ...prev, [section]: newArray }));
        } else if (direction === 'down' && index < newArray.length - 1) {
            [newArray[index], newArray[index + 1]] = [newArray[index + 1], newArray[index]];
            setResumeData((prev) => ({ ...prev, [section]: newArray }));
        }
    };

    const handleSkillsChange = (e) => {
        const values = e.target.value.split(',').map((s) => s.trim());
        setResumeData((prev) => ({ ...prev, skills: values }));
    };

    const handleLanguagesChange = (e) => {
        const values = e.target.value.split(',').map((s) => s.trimStart());
        setResumeData((prev) => ({ ...prev, languages: values }));
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Document Type Selection */}
            <div className="section-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--primary-light, #fdf2f8)', borderColor: 'var(--primary)' }}>
                <div>
                    <h2 className="section-title" style={{ margin: 0 }}>Document Type</h2>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: 'var(--secondaryText)' }}>
                        {isCVMode ? 'Comprehensive Multi-Page CV' : 'Concise 1-Page Resume'}
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', background: '#fff', padding: '4px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <button 
                        onClick={() => setIsCVMode(false)}
                        style={{ 
                            padding: '0.5rem 1rem', 
                            border: 'none', 
                            background: !isCVMode ? 'var(--primary)' : 'transparent',
                            color: !isCVMode ? '#fff' : 'var(--text)',
                            borderRadius: '6px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        Resume
                    </button>
                    <button 
                        onClick={() => setIsCVMode(true)}
                        style={{ 
                            padding: '0.5rem 1rem', 
                            border: 'none', 
                            background: isCVMode ? 'var(--primary)' : 'transparent',
                            color: isCVMode ? '#fff' : 'var(--text)',
                            borderRadius: '6px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        CV Form
                    </button>
                </div>
            </div>

            {/* Template Selection */}
            <div className="section-card">
                <h2 className="section-title">Resume Template</h2>
                <div className="form-group">
                    <label>Choose a design</label>
                    <select 
                        className="form-control" 
                        value={selectedTemplate} 
                        onChange={(e) => setSelectedTemplate(e.target.value)}
                        style={{ cursor: 'pointer', appearance: 'auto' }}
                    >
                        <option value="creative">Creative Performer</option>
                        <option value="modern">Modern</option>
                        <option value="minimal">Minimalist</option>
                        <option value="professional">Professional</option>
                    </select>
                </div>
            </div>
            {/* Personal Info */}
            <div className="section-card">
                <h2 className="section-title">Personal Information</h2>
                <div className="form-group">
                    <label>Full Name</label>
                    <input className="form-control" name="fullName" value={resumeData.personalInfo.fullName} onChange={handlePersonalInfoChange} />
                </div>
                <div className="form-group">
                    <label>Title / Role</label>
                    <input className="form-control" name="title" value={resumeData.personalInfo.title} onChange={handlePersonalInfoChange} />
                </div>
                <div className="form-group">
                    <label>Profile Picture URL (Optional)</label>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <ImageIcon size={20} style={{ color: 'var(--text-muted)' }} />
                        <input className="form-control" style={{ flex: 1 }} name="profilePicture" value={resumeData.personalInfo.profilePicture || ''} onChange={handlePersonalInfoChange} placeholder="https://example.com/photo.jpg" />
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label>Email</label>
                        <input className="form-control" name="email" value={resumeData.personalInfo.email} onChange={handlePersonalInfoChange} />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label>Phone</label>
                        <input className="form-control" name="phone" value={resumeData.personalInfo.phone} onChange={handlePersonalInfoChange} />
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label>Location</label>
                        <input className="form-control" name="location" value={resumeData.personalInfo.location} onChange={handlePersonalInfoChange} />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label>Website / Link</label>
                        <input className="form-control" name="website" value={resumeData.personalInfo.website} onChange={handlePersonalInfoChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label>Summary</label>
                    <textarea className="form-control" name="summary" rows="4" value={resumeData.personalInfo.summary} onChange={handlePersonalInfoChange}></textarea>
                </div>
            </div>

            {/* Experience */}
            <div>
                <h2 className="section-title">Experience</h2>
                {resumeData.experience.map((exp, index) => (
                    <div key={exp.id || index} className="section-card">
                        <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
                            {index > 0 && (
                                <button className="icon-btn" onClick={() => moveItem('experience', index, 'up')} title="Move Up">
                                    <ArrowUp size={16} />
                                </button>
                            )}
                            {index < resumeData.experience.length - 1 && (
                                <button className="icon-btn" onClick={() => moveItem('experience', index, 'down')} title="Move Down">
                                    <ArrowDown size={16} />
                                </button>
                            )}
                            <button className="icon-btn danger" onClick={() => removeItem('experience', index)} title="Remove">
                                <Trash2 size={16} />
                            </button>
                        </div>
                        <div className="form-group">
                            <label>Company / Organization</label>
                            <input className="form-control" name="company" value={exp.company} onChange={(e) => handleArrayChange('experience', index, e)} />
                        </div>
                        <div className="form-group">
                            <label>Role</label>
                            <input className="form-control" name="role" value={exp.role} onChange={(e) => handleArrayChange('experience', index, e)} />
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label>Start Date</label>
                                <input className="form-control" name="startDate" value={exp.startDate} onChange={(e) => handleArrayChange('experience', index, e)} />
                            </div>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label>End Date</label>
                                <input className="form-control" name="endDate" value={exp.endDate} onChange={(e) => handleArrayChange('experience', index, e)} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea className="form-control" name="description" rows="3" value={exp.description} onChange={(e) => handleArrayChange('experience', index, e)}></textarea>
                        </div>
                    </div>
                ))}
                <button
                    className="add-btn"
                    onClick={() => addItem('experience', { id: Date.now(), company: '', role: '', startDate: '', endDate: '', description: '' })}
                >
                    <Plus size={18} /> Add Experience
                </button>
            </div>

            {/* Education */}
            <div>
                <h2 className="section-title">Education</h2>
                {resumeData.education.map((edu, index) => (
                    <div key={edu.id || index} className="section-card">
                        <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
                            {index > 0 && (
                                <button className="icon-btn" onClick={() => moveItem('education', index, 'up')} title="Move Up">
                                    <ArrowUp size={16} />
                                </button>
                            )}
                            {index < resumeData.education.length - 1 && (
                                <button className="icon-btn" onClick={() => moveItem('education', index, 'down')} title="Move Down">
                                    <ArrowDown size={16} />
                                </button>
                            )}
                            <button className="icon-btn danger" onClick={() => removeItem('education', index)} title="Remove">
                                <Trash2 size={16} />
                            </button>
                        </div>
                        <div className="form-group">
                            <label>School / University</label>
                            <input className="form-control" name="school" value={edu.school} onChange={(e) => handleArrayChange('education', index, e)} />
                        </div>
                        <div className="form-group">
                            <label>Degree / Program</label>
                            <input className="form-control" name="degree" value={edu.degree} onChange={(e) => handleArrayChange('education', index, e)} />
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label>Start Date</label>
                                <input className="form-control" name="startDate" value={edu.startDate} onChange={(e) => handleArrayChange('education', index, e)} />
                            </div>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label>End Date</label>
                                <input className="form-control" name="endDate" value={edu.endDate} onChange={(e) => handleArrayChange('education', index, e)} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Description (Optional)</label>
                            <textarea className="form-control" name="description" rows="2" value={edu.description} onChange={(e) => handleArrayChange('education', index, e)}></textarea>
                        </div>
                    </div>
                ))}
                <button
                    className="add-btn"
                    onClick={() => addItem('education', { id: Date.now(), school: '', degree: '', startDate: '', endDate: '', description: '' })}
                >
                    <Plus size={18} /> Add Education
                </button>
            </div>

            {/* Skills */}
            <div className="section-card">
                <h2 className="section-title">Skills</h2>
                <div className="form-group">
                    <label>Comma-separated skills</label>
                    <input
                        className="form-control"
                        value={resumeData.skills.join(', ')}
                        onChange={handleSkillsChange}
                        placeholder="e.g. JavaScript, React, Design"
                    />
                </div>
            </div>

            {/* Projects */}
            {isCVMode && (
                <div>
                    <h2 className="section-title">Projects</h2>
                    {(resumeData.projects || []).map((proj, index) => (
                        <div key={proj.id || index} className="section-card">
                            <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
                                {index > 0 && (
                                    <button className="icon-btn" onClick={() => moveItem('projects', index, 'up')} title="Move Up">
                                        <ArrowUp size={16} />
                                    </button>
                                )}
                                {index < resumeData.projects.length - 1 && (
                                    <button className="icon-btn" onClick={() => moveItem('projects', index, 'down')} title="Move Down">
                                        <ArrowDown size={16} />
                                    </button>
                                )}
                                <button className="icon-btn danger" onClick={() => removeItem('projects', index)} title="Remove">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            <div className="form-group">
                                <label>Project Name</label>
                                <input className="form-control" name="name" value={proj.name} onChange={(e) => handleArrayChange('projects', index, e)} />
                            </div>
                            <div className="form-group">
                                <label>Role / Subtitle</label>
                                <input className="form-control" name="role" value={proj.role} onChange={(e) => handleArrayChange('projects', index, e)} />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div className="form-group" style={{ flex: 1 }}>
                                    <label>Start Date</label>
                                    <input className="form-control" name="startDate" value={proj.startDate} onChange={(e) => handleArrayChange('projects', index, e)} />
                                </div>
                                <div className="form-group" style={{ flex: 1 }}>
                                    <label>End Date</label>
                                    <input className="form-control" name="endDate" value={proj.endDate} onChange={(e) => handleArrayChange('projects', index, e)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Link / URL (Optional)</label>
                                <input className="form-control" name="link" value={proj.link} onChange={(e) => handleArrayChange('projects', index, e)} />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea className="form-control" name="description" rows="3" value={proj.description} onChange={(e) => handleArrayChange('projects', index, e)}></textarea>
                            </div>
                        </div>
                    ))}
                    <button
                        className="add-btn"
                        onClick={() => addItem('projects', { id: Date.now(), name: '', role: '', startDate: '', endDate: '', link: '', description: '' })}
                    >
                        <Plus size={18} /> Add Project
                    </button>
                </div>
            )}

            {/* Certifications */}
            {isCVMode && (
                <div>
                    <h2 className="section-title">Certifications (CV)</h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--secondaryText)', marginTop: '-1rem', marginBottom: '1rem' }}>
                        Note: For best layout, ensure standard Resume certifications are in the Education section for non-CV modes.
                    </p>
                    {(resumeData.certifications || []).map((cert, index) => (
                        <div key={cert.id || index} className="section-card">
                            <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
                                {index > 0 && (
                                    <button className="icon-btn" onClick={() => moveItem('certifications', index, 'up')} title="Move Up">
                                        <ArrowUp size={16} />
                                    </button>
                                )}
                                {index < resumeData.certifications.length - 1 && (
                                    <button className="icon-btn" onClick={() => moveItem('certifications', index, 'down')} title="Move Down">
                                        <ArrowDown size={16} />
                                    </button>
                                )}
                                <button className="icon-btn danger" onClick={() => removeItem('certifications', index)} title="Remove">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            <div className="form-group">
                                <label>Certification Title</label>
                                <input className="form-control" name="title" value={cert.title} onChange={(e) => handleArrayChange('certifications', index, e)} />
                            </div>
                            <div className="form-group">
                                <label>Issuer / Organization</label>
                                <input className="form-control" name="issuer" value={cert.issuer} onChange={(e) => handleArrayChange('certifications', index, e)} />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div className="form-group" style={{ flex: 1 }}>
                                    <label>Date / Year</label>
                                    <input className="form-control" name="date" value={cert.date} onChange={(e) => handleArrayChange('certifications', index, e)} />
                                </div>
                                <div className="form-group" style={{ flex: 1 }}>
                                    <label>Credential ID / URL (Optional)</label>
                                    <input className="form-control" name="link" value={cert.link} onChange={(e) => handleArrayChange('certifications', index, e)} />
                                </div>
                            </div>
                        </div>
                    ))}
                    <button
                        className="add-btn"
                        onClick={() => addItem('certifications', { id: Date.now(), title: '', issuer: '', date: '', link: '' })}
                    >
                        <Plus size={18} /> Add Certification
                    </button>
                </div>
            )}

            {/* Languages */}
            {isCVMode && (
                <div className="section-card">
                    <h2 className="section-title">Languages</h2>
                    <div className="form-group">
                        <label>Comma-separated languages</label>
                        <input
                            className="form-control"
                            value={(resumeData.languages || []).join(',')}
                            onChange={handleLanguagesChange}
                            placeholder="e.g. English, Spanish, French"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Editor;
