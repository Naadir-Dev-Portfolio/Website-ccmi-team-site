// Search documents functions

function searchDocument() {
    const ccmiIdInput = document.getElementById('ccmi-id-input').value.trim().toUpperCase();
    const fileNameDisplay = document.getElementById('file-name-display');

    // Find the document(s) that match the input CCMI ID
    const matchedDocs = documents.filter(doc => doc.id === ccmiIdInput);

    if (matchedDocs.length > 0) {
        // If multiple documents with the same ID, display options
        if (matchedDocs.length > 1) {
            // Create a select dropdown to choose between documents
            let optionsHtml = '<label for="doc-select">Multiple documents found. Please select one:</label><select id="doc-select">';
            matchedDocs.forEach((doc, index) => {
                optionsHtml += `<option value="${index}">${doc.fileName}</option>`;
            });
            optionsHtml += '</select><button onclick="openSelectedDocument()">Open Document</button>';
            fileNameDisplay.innerHTML = optionsHtml;
        } else {
            // Only one document found
            const doc = matchedDocs[0];
            fileNameDisplay.innerHTML = `<p>Document found: <strong>${doc.fileName}</strong></p><a href="${doc.url}" target="_blank" class="open-document-button">Open Document</a>`;
        }
    } else {
        // No document found
        fileNameDisplay.innerHTML = `<p style="color: red;">No document found for ID: ${ccmiIdInput}</p>`;
    }
}

function openSelectedDocument() {
    const docSelect = document.getElementById('doc-select');
    const selectedIndex = docSelect.value;
    const ccmiIdInput = document.getElementById('ccmi-id-input').value.trim().toUpperCase();
    const matchedDocs = documents.filter(doc => doc.id === ccmiIdInput);
    const selectedDoc = matchedDocs[selectedIndex];
    const fileNameDisplay = document.getElementById('file-name-display');

    fileNameDisplay.innerHTML = `<p>Document selected: <strong>${selectedDoc.fileName}</strong></p><a href="${selectedDoc.url}" target="_blank" class="open-document-button">Open Document</a>`;
}

// Optional: Handle Enter key press
document.getElementById('ccmi-id-input').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        searchDocument();
    }
});