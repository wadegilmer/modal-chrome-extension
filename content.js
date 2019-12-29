//#region Listeners

// Establish a long-lived connection when the extension icon is clicked
chrome.runtime.onConnect.addListener(openModal);

//#endregion


// Function to open modal
function openModal(port) {

    // Throws error in the console if port name is not correct
    // console.assert(port.name == "establish_connection");

    port.onMessage.addListener(request => {

        // If action is openModal
        if (request.action == "openModal") {
            
            let modal = document.querySelector('#modalMenu');
            let body = document.querySelector('body');

            // Listener for the add tag while port is open using event delegation
            document.querySelector('body').addEventListener('keydown', addTag);

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

// Function to create tag
function addTag(e) {
    
    // if the target is on the input of the modal and if enter is pressed
    if (e.target.id == 'addTag' && e.which == 13 || e.keyCode == 13) {

        if (e.target.value != '') {

            // pass the input to the UI
            let chip = UI.addTag(e, e.target.value);

            // clear input field
            e.target.value = '';

            // add the element to the modal
            document.querySelector('.tags').appendChild(chip);
        }
        
        e.preventDefault();
    }
}