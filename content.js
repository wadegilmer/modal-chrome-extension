//#region Listeners

// Establish a long-lived connection when the extension icon is clicked
chrome.runtime.onConnect.addListener(openModal);

//#endregion

//#region Function to open modal
function openModal(port) {

    // Throws error in the console if port name is not correct
    // console.assert(port.name == "establish_connection");

    port.onMessage.addListener((request, sender, sendResponse) => {

        // If action is openModal
        if (request.action == "openModal") {
            
            let modal = document.querySelector('#modalMenu');

            if (!modal) {

                // Insert modal menu into the view
                UI.modalMenu();

                // Initialize listener for the add tag using event delegation
                document.querySelector('body').addEventListener('keydown', UI.addTag);

                // Initialize listener for toggling the highlights on/off
                document.querySelector('#hlBtn').addEventListener('click', switchHighlight);

                // Initialize listener for when the submit button is pressed
                document.querySelector('#tagBtn').addEventListener('click', () => port.postMessage({action: "fetchAll"}));

            }
            else {
                // If modal already exists, toggle the class to display none
                modal.classList.toggle('toggleMenu');
            }
        }
    });
}
//#endregion

// Function to switch highlight on/off
function switchHighlight(e) {

    // Toggle the button style
    e.target.classList.toggle('toggleHighlight');

    if (e.target.classList.contains('toggleHighlight')) { 
        // Change to button and the selection style
        UI.turnHighlightOn(e.target);

        // Initialize listener to wrap selected text in a span
        document.body.addEventListener('click', UI.addHighlight);
    } 
    else { 
        // Change to button and the selection style
        UI.turnHighlightOff(e.target); 

        // Turn off listener to wrap selected text
        document.body.removeEventListener('click', UI.addHighlight)

    }
}
