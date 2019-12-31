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

                // Initialize listener for the add tag while port is open using event delegation
                document.querySelector('body').addEventListener('keydown', UI.addTag);

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

//#region TODO: ADD FUNCTION TO UI INSTEAD / Function to create tag to the UI 
// function addTag(e) {

//     // if the target is on the input of the modal and if enter is pressed
//     if (e.target.id == 'addTag' && e.which == 13 || e.keyCode == 13) {

//         if (e.target.value != '') {

//             // pass the input to the UI
//             UI.addTag(e, e.target.value);

//             // clear input field
//             e.target.value = '';
//         }

//         e.preventDefault();
//     }
// }
//#endregion

