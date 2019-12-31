class Tab {
    constructor(id, title, tags) {
        this.id = id;
        this.title = title;
        this.tags = tags;
    }
}

class TabGroup {
    constructor() {
      this.tabMeta = [];
    }
}

// Async / Await
async function fetchTabData(action) {

    if (action == 'fetchAll') {
        console.log('Start');
        
        // await get all tabs
        let tabs = await fetchTabs();
        
        // await inside a map returns a promise
        let promises = await tabs.map(async tab => {
            // fetch the tags
            let tags = await fetchTags(tab.id)

            // create new tab instance
            let tabMeta = await new Tab(tab.id, tab.title, tags);
            
            return tabMeta
        });
        // handle all promises
        const results = await Promise.all(promises)

        // Push to a new tabGroup instance
        let tabGroup = new TabGroup();
        tabGroup.tabMeta.push(results)

        console.log(tabGroup);
        
        console.log('End');
    }
}

function fetchTabs() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({
            currentWindow: true
          }, tabs => resolve(tabs.filter(t => t.url != chrome.runtime.getURL('_generated_background_page.html'))));

          // TODO reject chrome://
    });
}

function fetchTags(tabId) {
    return new Promise((resolve, reject) => {
            chrome.tabs.executeScript(
                tabId, {
                code: `document.body.firstChild.firstChild.children[1].textContent;`}, 
                (results) => { 
                    try {
                        let arr = results[0].split(/\p{Sm}/gu);
                        arr.pop();
                        resolve(arr);
                    }
                    catch(TypeError) {
                        resolve(new Array());
                    }
                }
            );
    });
}





// Listener for the extension icon click
chrome.browserAction.onClicked.addListener(establishPort);

// Function to establish connection
function establishPort(tab) {

    // Pass the action to the correct tab
    let port = chrome.tabs.connect(tab.id, {name: "establish_connection"});
    
    // pass on a object to confirm action
    port.postMessage({action: "openModal"});

    // Listen for a response
    port.onMessage.addListener((request, sender, sendResponse) => fetchTabData(request.action));    
}