import { Document, Packer, Paragraph, TextRun, HeadingLevel, BorderStyle } from 'docx';
import { downloadBlob } from './downloadBlob';

export const exportToDocx = async (data) => {
    const { personalInfo, experience, education, skills, projects, certifications, languages } = data;

    const children = [];

    // Header: Name
    children.push(
        new Paragraph({
            text: personalInfo.fullName || 'Your Name',
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 100 },
        })
    );

    // Header: Title
    if (personalInfo.title) {
        children.push(
            new Paragraph({
                text: personalInfo.title,
                heading: HeadingLevel.HEADING_3,
                spacing: { after: 200 },
            })
        );
    }

    // Contact Info
    const contactParts = [
        personalInfo.email,
        personalInfo.phone,
        personalInfo.location,
        personalInfo.website
    ].filter(Boolean).join(' | ');

    if (contactParts) {
        children.push(
            new Paragraph({
                children: [new TextRun({ text: contactParts, color: '64748b' })],
                spacing: { after: 300 },
            })
        );
    }

    // Summary
    if (personalInfo.summary) {
        children.push(
            new Paragraph({
                children: [new TextRun({ text: personalInfo.summary })],
                spacing: { after: 400 },
            })
        );
    }

    // Experience
    if (experience && experience.length > 0) {
        children.push(
            new Paragraph({
                text: 'EXPERIENCE',
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 400, after: 200 },
                border: { bottom: { color: 'e2e8f0', space: 1, style: BorderStyle.SINGLE, size: 6 } }
            })
        );

        experience.forEach(exp => {
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: exp.role || 'Role', bold: true, size: 24 }),
                        new TextRun({ text: ` at ${exp.company || 'Company'}`, size: 24, color: '64748b' }),
                    ],
                    spacing: { before: 200 },
                })
            );
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: `${exp.startDate} - ${exp.endDate}`, italics: true, color: '8b5cf6', size: 20 }),
                    ],
                    spacing: { after: 100 },
                })
            );
            if (exp.description) {
                children.push(
                    new Paragraph({
                        children: [new TextRun({ text: exp.description })],
                        spacing: { after: 200 },
                    })
                );
            }
        });
    }

    // Education
    if (education && education.length > 0) {
        children.push(
            new Paragraph({
                text: 'EDUCATION',
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 400, after: 200 },
                border: { bottom: { color: 'e2e8f0', space: 1, style: BorderStyle.SINGLE, size: 6 } }
            })
        );

        education.forEach(edu => {
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: edu.degree || 'Degree', bold: true, size: 24 }),
                        new TextRun({ text: ` at ${edu.school || 'School'}`, size: 24, color: '64748b' }),
                    ],
                    spacing: { before: 200 },
                })
            );
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: `${edu.startDate} - ${edu.endDate}`, italics: true, color: '8b5cf6', size: 20 }),
                    ],
                    spacing: { after: 100 },
                })
            );
            if (edu.description) {
                children.push(
                    new Paragraph({
                        children: [new TextRun({ text: edu.description })],
                        spacing: { after: 200 },
                    })
                );
            }
        });
    }

    // Projects
    if (projects && projects.length > 0) {
        children.push(
            new Paragraph({
                text: 'PROJECTS',
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 400, after: 200 },
                border: { bottom: { color: 'e2e8f0', space: 1, style: BorderStyle.SINGLE, size: 6 } }
            })
        );

        projects.forEach(proj => {
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: proj.name || 'Project Name', bold: true, size: 24 }),
                        new TextRun({ text: ` ${proj.role ? `- ${proj.role}` : ''}`, size: 24, color: '64748b' }),
                    ],
                    spacing: { before: 200 },
                })
            );
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: `${proj.startDate} - ${proj.endDate}`, italics: true, color: '8b5cf6', size: 20 }),
                    ],
                    spacing: { after: 100 },
                })
            );
            if (proj.description) {
                children.push(
                    new Paragraph({
                        children: [new TextRun({ text: proj.description })],
                        spacing: { after: 200 },
                    })
                );
            }
        });
    }

    // Certifications
    if (certifications && certifications.length > 0) {
        children.push(
            new Paragraph({
                text: 'CERTIFICATIONS',
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 400, after: 200 },
                border: { bottom: { color: 'e2e8f0', space: 1, style: BorderStyle.SINGLE, size: 6 } }
            })
        );

        certifications.forEach(cert => {
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: cert.title || 'Certification Title', bold: true, size: 24 }),
                        new TextRun({ text: ` ${cert.issuer ? `from ${cert.issuer}` : ''}`, size: 24, color: '64748b' }),
                    ],
                    spacing: { before: 200 },
                })
            );
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: `${cert.date}`, italics: true, color: '8b5cf6', size: 20 }),
                    ],
                    spacing: { after: 200 },
                })
            );
        });
    }

    // Skills
    if (skills && skills.length > 0) {
        const validSkills = skills.filter(s => s.trim());
        if (validSkills.length > 0) {
            children.push(
                new Paragraph({
                    text: 'SKILLS',
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 400, after: 200 },
                    border: { bottom: { color: 'e2e8f0', space: 1, style: BorderStyle.SINGLE, size: 6 } }
                })
            );
            children.push(
                new Paragraph({
                    children: [new TextRun({ text: validSkills.join(' • ') })],
                    spacing: { after: 200 },
                })
            );
        }
    }

    // Languages
    if (languages && languages.length > 0) {
        const validLanguages = languages.filter(s => s.trim());
        if (validLanguages.length > 0) {
            children.push(
                new Paragraph({
                    text: 'LANGUAGES',
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 400, after: 200 },
                    border: { bottom: { color: 'e2e8f0', space: 1, style: BorderStyle.SINGLE, size: 6 } }
                })
            );
            children.push(
                new Paragraph({
                    children: [new TextRun({ text: validLanguages.join(' • ') })],
                    spacing: { after: 200 },
                })
            );
        }
    }

    const doc = new Document({
        sections: [{
            properties: {},
            children: children,
        }],
    });

    try {
        const blob = await Packer.toBlob(doc);
        await downloadBlob(blob, 'AestheticResume.docx');
    } catch (err) {
        console.error("Failed to generate DOCX:", err);
    }
};
