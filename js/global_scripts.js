
 // global_scripts.js

// Function to set yesterday's date
function setYesterdayDate() {
    const dateElement = document.querySelector('.current-date');
    if (dateElement) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        dateElement.textContent = yesterday.toLocaleDateString('en-GB', options);
        dateElement.dataset.date = yesterday.toISOString();
        dateElement.dataset.format = 'dd/mm/yyyy';
    }
}

// Function to set the current year in the footer
function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    const year = new Date().getFullYear();
    yearElement.textContent = year;
}

// Function to load the dynamic menu
function loadMenu() {
    const menuContainer = document.getElementById('menu-container');
    const menuHTML = `
        <!-- CCMI Team Section -->
        <div class="menu-section" onclick="toggleMenu('ccmi-team')">
            CCMI Team <span id="ccmi-team-icon" class="icon">+</span>
        </div>
        <div id="ccmi-team" class="sub-menu">
            <a href="#" onclick="showDemoAlert(event)">Sharepoint Site</a>
            <a href="#" onclick="showDemoAlert(event)">Team Drive</a>
            <a href="#" onclick="showDemoAlert(event)">121 Packs</a>
            <a href="#" onclick="showDemoAlert(event)">Videos</a>
            <a href="#" onclick="showDemoAlert(event)">Team Projects</a>
            <a href="#" onclick="showDemoAlert(event)">Webmail</a>
            <a href="#" onclick="showDemoAlert(event)">Open Requests</a>
            <a href="#" onclick="showDemoAlert(event)">Team Planner</a>
        </div>

        <!-- Power BI Section -->
        <div class="menu-section" onclick="toggleMenu('power-bi')">
            Power BI <span id="power-bi-icon" class="icon">+</span>
        </div>
        <div id="power-bi" class="sub-menu">
            <a href="#" onclick="showDemoAlert(event)">Power BI App</a>
            <a href="#" onclick="showDemoAlert(event)">Dataflow Warehouse</a>
            <a href="#" onclick="showDemoAlert(event)">Report Production Warehouse</a>
            <a href="#" onclick="showDemoAlert(event)">Power BI Bridge</a>
            <a href="#" onclick="showDemoAlert(event)">eGain Health Check</a>
            <a href="#" onclick="showDemoAlert(event)">Sharepoint Site</a>
            <a href="#" onclick="showDemoAlert(event)">Power BI Upload Area</a>
            <a href="#" onclick="showDemoAlert(event)">Business Power BI Upload Area</a>
            <a href="#" onclick="showDemoAlert(event)">PBIX Files</a>
        </div>

        <!-- Power Automate Section -->
        <div class="menu-section" onclick="toggleMenu('power-automate')">
            Power Automate <span id="power-automate-icon" class="icon">+</span>
        </div>
        <div id="power-automate" class="sub-menu">
            <a href="#" onclick="showDemoAlert(event)">Automate Solutions</a>
        </div>

        <!-- SharePoint Section -->
        <div class="menu-section" onclick="toggleMenu('sharepoint')">
            SharePoint <span id="sharepoint-icon" class="icon">+</span>
        </div>
        <div id="sharepoint" class="sub-menu">
            <a href="#" onclick="showDemoAlert(event)">Groups</a>
            <a href="#" onclick="showDemoAlert(event)">CCMI SharePoint Lists</a>
            <a href="#" onclick="showDemoAlert(event)">All SharePoint Lists</a>
            <a href="#" onclick="showDemoAlert(event)">Request Logs</a>
            <a href="#" onclick="showDemoAlert(event)">Group Audit List</a>
            <a href="#" onclick="showDemoAlert(event)">GSOP Payment Errors</a>
        </div>

        <!-- Shared Drive Section -->
        <div class="menu-section" onclick="toggleMenu('sharedrive')">
            Shared Drive <span id="sharedrive-icon" class="icon">+</span>
        </div>
        <div id="sharedrive" class="sub-menu">
            <a href="#" onclick="showDemoAlert(event)">All Shared Drive Areas</a>
            <a href="#" onclick="showDemoAlert(event)">Handover Documents</a>
        </div>

        <!-- SAP Section -->
        <div class="menu-section" onclick="toggleMenu('sap')">
            SAP <span id="sap-icon" class="icon">+</span>
        </div>
        <div id="sap" class="sub-menu">
            <a href="#" onclick="showDemoAlert(event)">Business Warehouse</a>
            <a href="#" onclick="showDemoAlert(event)">UI5 Validation</a>
            <a href="#" onclick="showDemoAlert(event)">Unplanned Finalized Data (401)</a>
            <a href="#" onclick="showDemoAlert(event)">CRM Password Vault</a>
        </div>

        <!-- Telephony Section -->
        <div class="menu-section" onclick="toggleMenu('telephony')">
            Telephony <span id="telephony-icon" class="icon">+</span>
        </div>
        <div id="telephony" class="sub-menu">
            <a href="#" onclick="showDemoAlert(event)">eGain</a>
            <a href="#" onclick="showDemoAlert(event)">Verint</a>
            <a href="#" onclick="showDemoAlert(event)">AWS</a>
        </div>

        <!-- Citrix (No submenu, direct link) -->
        <div class="menu-section">
            <a href="#" onclick="showDemoAlert(event)" style="color: #ffffff;">Citrix</a>
        </div>

        <!-- ZohoDesk (No submenu, direct link) -->
        <div class="menu-section">
            <a href="#" onclick="showDemoAlert(event)" style="color: #ffffff;">ZohoDesk</a>
        </div>

        <!-- Other Systems Section -->
        <div class="menu-section" onclick="toggleMenu('other-systems')">
            Other Systems <span id="other-systems-icon" class="icon">+</span>
        </div>
        <div id="other-systems" class="sub-menu">
            <a href="#" onclick="showDemoAlert(event)">Rand and Rave</a>
            <a href="#" onclick="showDemoAlert(event)">AQAD</a>
            <a href="#" onclick="showDemoAlert(event)">Gov Streetworks</a>
        </div>
    </div>

        <!-- Add more menu sections as needed -->
    `;

    menuContainer.innerHTML = menuHTML;
}

// Initialize functions on page load
window.onload = function() {
    setYesterdayDate();
    setCurrentYear();
    loadMenu(); // From menu_scripts.js
};

// Alert function for demo links
function showDemoAlert(event) {
    event.preventDefault();
    alert('This is the demo version built by Naadir in 2024 - links have been disabled');
};

function showApiKeyWarning(event, message) {
    // Prevent the default link behavior
    event.preventDefault();
    
    // Show the confirmation dialog
    if (confirm(message)) {
        // If the user confirms, open the link in a new tab
        window.open(event.currentTarget.href, '_blank');
    }
}
