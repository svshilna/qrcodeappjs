const maxLength = 1600;

function updateCharacterCount() {
    const serialNumbersTextarea = document.getElementById('serialNumbers');
    const charCount = document.getElementById('charCount');
    const currentLength = serialNumbersTextarea.value.length;

    if (currentLength > maxLength) {
        serialNumbersTextarea.value = serialNumbersTextarea.value.substring(0, maxLength);
    }

    charCount.textContent = `${serialNumbersTextarea.value.length} / ${maxLength} characters`;
}

function generateQRCode() {
    const serialNumbersTextarea = document.getElementById('serialNumbers');
    const errorMessage = document.getElementById('errorMessage');
    const serialNumbers = serialNumbersTextarea.value.trim().split('\n');

    if (serialNumbersTextarea.value.trim() === '') {
        errorMessage.textContent = 'Please enter at least one serial number.';
        return;
    } else {
        errorMessage.textContent = '';
    }

    let combinedSerialNumbers = serialNumbers.join('\n');

    if (combinedSerialNumbers.length > maxLength) {
        errorMessage.textContent = `The combined serial numbers exceed the maximum limit of ${maxLength} characters.`;
        return;
    }

    QRCode.toDataURL(combinedSerialNumbers, { errorCorrectionLevel: 'L', width: 177, height: 177 }, function (err, url) { // 177px = 5cm
        if (err) {
            console.error(err);
            return;
        }
        const qrCodeDiv = document.getElementById('qrCode');
        qrCodeDiv.innerHTML = `<img src="${url}" alt="QR Code">`;

        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = url;
        downloadLink.download = 'qrcode.png';
        downloadLink.style.display = 'inline';
        downloadLink.innerText = 'Download QR Code';
    });
}

document.getElementById('serialNumbers').addEventListener('input', updateCharacterCount);
