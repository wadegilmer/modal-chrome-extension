// Establish a long-lived connection when the extension icon is clicked
chrome.runtime.onConnect.addListener(openModal);

// Function to open modal
function openModal(port){

    // Throws error in the console if port name is not correct
    console.assert(port.name == "establish_connection");

    port.onMessage.addListener(request => {

        // If action is openModal
        if (request.action == "openModal") {
            
            var body = document.querySelector('body');
            let modal = document.querySelector('#modalMenu');

            if (!modal) {
                // on click, insert modal menu into the view
                body.insertBefore(UI.modalMenu(), body.firstChild);
            }
            else {
                // on click, if modal already exists, toggle display to none
                modal.classList.toggle('toggleMenu');
            }

        }


    });
}