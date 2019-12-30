//#region Listeners

// Establish a long-lived connection when the extension icon is clicked
chrome.runtime.onConnect.addListener(openModal);

//#endregion

//#region Function to open modal
function openModal(port) {

    // Throws error in the console if port name is not correct
    // console.assert(port.name == "establish_connection");
    console.log(`content_script: ${port.sender.Tab}`);

    port.onMessage.addListener(request => {

        // If action is openModal
        if (request.action == "openModal") {
            
            let modal = document.querySelector('#modalMenu');
            let body = document.querySelector('body');

            if (!modal) {

                // on click, insert modal menu into the view
                body.insertBefore(UI.modalMenu(), body.firstChild);

                // Listener for the add tag while port is open using event delegation
                document.querySelector('body').addEventListener('keydown', addTag);

                // Listener for when the submit button is pressed and to send the tags to background script
                document.querySelector('body').addEventListener('click', (e) => {

                    if (e.target.id == 'tagBtn') {

                        let tags = [];
                
                        // retrieve the tag elements
                        let el = document.querySelectorAll('.chip');
                
                        if (el.length != 0) {

                            el.forEach((node) => {
                
                                // get the text content of the tag
                                let tag = node.textContent;
                
                                // get rid of the trailing x
                                tag = tag.substring(0, tag.length - 1);
                
                                // push tag to the array
                                tags.push(tag)
                                
                            });

                        // send the tags array
                        port.postMessage({tags: JSON.stringify(tags)});

                        // close modal
                        UI.closeMenu();

                        // disconnect port
                        port.disconnect();
                        }
                    }
                });
            }
            else {
                // on click, if modal already exists, toggle display to none
                modal.classList.toggle('toggleMenu');
            }
        }
    });
}
//#endregion

//#region Function to create tag to the UI
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
//#endregion

//#region DEFUNCT Function to retrieve tags from the UI
function getTags(e) {

    if (e.target.id == 'tagBtn') {

        let tags = [];

        // retrieve the tag elements
        let el = document.querySelectorAll('.chip');

        if (el.length != 0) {
            el.forEach((node) => {

                // get the text content of the tag
                let tag = node.textContent;

                // get rid of the trailing x
                tag = tag.substring(0, tag.length - 1);

                // push tag to the array
                tags.push(tag)
                
            });
        }
        // return tags array
        return tags;
    }
}
//#endregion