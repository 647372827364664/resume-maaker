import fs from 'fs';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, BorderStyle } from 'docx';

async function testDocx() {
    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                new Paragraph({
                    text: 'EXPERIENCE',
                    heading: HeadingLevel.HEADING_2,
                    border: { bottom: { color: 'e2e8f0', space: 1, style: BorderStyle.SINGLE, size: 6 } }
                })
            ],
        }],
    });

    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync('test.docx', buffer);
    console.log('Done');
}

testDocx().catch(console.error);
