export const downloadBlob = async (blob, filename) => {
    try {
        if (window.showSaveFilePicker) {
            const handle = await window.showSaveFilePicker({
                suggestedName: filename,
                types: [{
                    description: filename.endsWith('.pdf') ? 'PDF Document' : 'Word Document',
                    accept: {
                        [blob.type]: [filename.endsWith('.pdf') ? '.pdf' : '.docx'],
                    },
                }],
            });
            const writable = await handle.createWritable();
            await writable.write(blob);
            await writable.close();
            return; // Success!
        }
    } catch (err) {
        if (err.name === 'AbortError') {
            return; // User cancelled the save dialog, DO NOT fallback.
        }
        console.error("SaveFilePicker failed, falling back:", err);
    }

    // Fallback for older browsers or if showSaveFilePicker threw a non-abort error
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    
    // Generous delay before revoking to prevent browser abortion resulting in UUID files
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 2000);
};
