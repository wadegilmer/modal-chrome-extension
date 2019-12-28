// Establish a long-lived connection when the extension icon is clicked
chrome.runtime.onConnect.addListener(openModal);

// Function to open modal
function openModal(port){
    // Throws error in the console if port name is not correct
    console.assert(port.name == "establish_connection");

    port.onMessage.addListener(request => {
        // request.action == "openModal" ? console.log('connection established') : console.log('no connection');
        
        // If action is openModal
        if (request.action == "openModal") {
            // modal
        }


    });
}