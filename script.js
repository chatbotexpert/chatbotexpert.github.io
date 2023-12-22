function loadPDF() {
    var pdfInput = document.getElementById('pdfInput');

    if (pdfInput.files.length > 0) {
        var pdfFile = pdfInput.files[0];

        var reader = new FileReader();
        reader.onload = function (event) {
            pdfjsLib.getDocument({ data: event.target.result }).promise.then(function (pdfDoc) {
                pdfDoc.getPage(1).then(function (page) {
                    var canvas = document.createElement('canvas');
                    var context = canvas.getContext('2d');
                    var viewport = page.getViewport({ scale: 1.5 });

                    canvas.width = viewport.width;
                    canvas.height = viewport.height;

                    var pdfContainer = document.getElementById('pdfContainer');
                    pdfContainer.innerHTML = '';
                    pdfContainer.appendChild(canvas);

                    page.render({ canvasContext: context, viewport: viewport });
                });
            });
        };

        reader.readAsDataURL(pdfFile);
    } else {
        alert('Please select a PDF file.');
    }
}
