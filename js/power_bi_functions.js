// Power BI Functions

function toggleReport(reportId) {
    const reportContent = document.getElementById(reportId);
    const expandButton = reportContent.previousElementSibling;

    if (reportContent.style.display === 'none') {
        reportContent.style.display = 'block';
        expandButton.textContent = 'Hide ' + expandButton.textContent.substring(5);
        expandButton.setAttribute('aria-expanded', 'true');
    } else {
        reportContent.style.display = 'none';
        expandButton.textContent = 'Show ' + expandButton.textContent.substring(5);
        expandButton.setAttribute('aria-expanded', 'false');
    }
}

let zoomed = {};

function toggleZoom(event) {
    const button = event.currentTarget;
    const reportId = button.getAttribute('data-report-id');
    const reportContent = document.getElementById(reportId);
    const iframeWrapper = reportContent.querySelector('.iframe-wrapper');
    const iframe = iframeWrapper.querySelector('iframe');
    let panOverlay = iframeWrapper.querySelector('.pan-overlay');

    if (zoomed[reportId]) {
        // Zoom out
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        zoomed[reportId] = false;

        // Remove overlay
        if (panOverlay) {
            panOverlay.remove();
        }

        // Remove panning cursor
        iframeWrapper.style.cursor = 'default';

    } else {
        // Zoom in
        zoomed[reportId] = true;

        // Set iframe dimensions larger than the wrapper
        iframe.style.width = '150%';
        iframe.style.height = '1200px'; // Adjust based on zoom level

        // Create overlay if it doesn't exist
        if (!panOverlay) {
            panOverlay = document.createElement('div');
            panOverlay.classList.add('pan-overlay');
            iframeWrapper.appendChild(panOverlay);

            initPan(panOverlay, iframeWrapper);
        }

        // Enable panning cursor
        iframeWrapper.style.cursor = 'grab';
    }
}

function initPan(panOverlay, iframeWrapper) {
    let isPanning = false;
    let startX, startY, scrollLeft, scrollTop;

    panOverlay.addEventListener('mousedown', (e) => {
        isPanning = true;
        startX = e.pageX - iframeWrapper.offsetLeft;
        startY = e.pageY - iframeWrapper.offsetTop;
        scrollLeft = iframeWrapper.scrollLeft;
        scrollTop = iframeWrapper.scrollTop;
        panOverlay.style.cursor = 'grabbing';
        e.preventDefault();
    });

    panOverlay.addEventListener('mouseleave', () => {
        isPanning = false;
        panOverlay.style.cursor = 'grab';
    });

    panOverlay.addEventListener('mouseup', () => {
        isPanning = false;
        panOverlay.style.cursor = 'grab';
    });

    panOverlay.addEventListener('mousemove', (e) => {
        if (!isPanning) return;
        e.preventDefault();
        const x = e.pageX - iframeWrapper.offsetLeft;
        const y = e.pageY - iframeWrapper.offsetTop;
        const walkX = x - startX;
        const walkY = y - startY;
        iframeWrapper.scrollLeft = scrollLeft - walkX;
        iframeWrapper.scrollTop = scrollTop - walkY;
    });
}

function refreshReport(event) {
    const button = event.currentTarget;
    const iframeId = button.getAttribute('data-iframe-id');
    const iframe = document.getElementById(iframeId);
    if (iframe) {
        iframe.src = iframe.src; // Reloads the iframe
    }
}

function toggleFullScreen(event) {
    const button = event.currentTarget;
    const iframeId = button.getAttribute('data-iframe-id');
    const iframe = document.getElementById(iframeId);
    if (!iframe) return;

    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        iframe.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    }
}

function toggleReport(event) {
    const button = event.currentTarget;
    const reportId = button.getAttribute('data-report-id');
    const reportName = button.getAttribute('data-report-name');
    const reportContent = document.getElementById(reportId);

    if (reportContent.style.display === 'none' || reportContent.style.display === '') {
        reportContent.style.display = 'block';
        button.textContent = 'Hide ' + reportName;
        button.setAttribute('aria-expanded', 'true');
    } else {
        reportContent.style.display = 'none';
        button.textContent = 'Show ' + reportName;
        button.setAttribute('aria-expanded', 'false');
    }
}

