// Listener for the extension icon click
chrome.browserAction.onClicked.addListener(establishPort);

// Function to establish connection
function establishPort(tab) {

    // Pass the action to the correct tab
    let port = chrome.tabs.connect(tab.id, {name: "establish_connection"});
    
    // pass on a object to confirm action
    port.postMessage({action: "openModal"});

    // Listen for a response
    port.onMessage.addListener(request => {
        
        if (request.tags.length != 0) {
            console.log(request.tags);
            console.log(JSON.parse(request.tags));
            console.log(`background_script: ${port.sender}`);
        }

    });

    
}