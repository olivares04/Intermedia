function calculateProductivity() {
    const emailResponses = parseFloat(document.getElementById('emailResponses').value);
    const productiveHours = parseFloat(document.getElementById('productiveHours').value);

    if (!isNaN(emailResponses) && !isNaN(productiveHours) && productiveHours > 0) {
        const productivity = emailResponses / productiveHours;
        let message;
        if (productivity >= 2) {
            message = `Congratulations, you are on goal! Your productivity is: ${productivity.toFixed(2)} responses per hour.`;
        } else {
            message = `You are not on goal, we need to keep working! Your productivity is: ${productivity.toFixed(2)} responses per hour.`;
        }
        document.getElementById('result').innerText = message;

        // Create a download button if productive hours are greater than 8.5
        if (productiveHours >= 8.5) {
            createDownloadButton(emailResponses, productiveHours, productivity);
        } else {
            removeDownloadButton();
        }
    } else {
        document.getElementById('result').innerText = 'Please enter valid numbers and ensure productive hours are greater than zero.';
        removeDownloadButton();
    }
}

function createDownloadButton(emailResponses, productiveHours, productivity) {
    let downloadButton = document.getElementById('downloadButton');
    if (!downloadButton) {
        downloadButton = document.createElement('button');
        downloadButton.id = 'downloadButton';
        downloadButton.innerText = 'Download Information';
        downloadButton.onclick = function() {
            downloadData(emailResponses, productiveHours, productivity);
        };
        document.body.appendChild(downloadButton);
    }
}

function removeDownloadButton() {
    const downloadButton = document.getElementById('downloadButton');
    if (downloadButton) {
        document.body.removeChild(downloadButton);
    }
}

function downloadData(emailResponses, productiveHours, productivity) {
    const data = `Email Responses: ${emailResponses}\nProductive Hours: ${productiveHours}\nProductivity: ${productivity.toFixed(2)} responses per hour.`;
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'information.txt';
    a.click();
    URL.revokeObjectURL(url);
}

function clearData() {
    // Clear input fields
    document.getElementById('emailResponses').value = '';
    document.getElementById('productiveHours').value = '';

    // Clear result text
    document.getElementById('result').innerText = '';

    // Remove download button if it exists
    removeDownloadButton();
}
