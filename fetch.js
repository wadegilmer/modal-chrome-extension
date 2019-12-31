function setup() {
    initTabsObject()
        .then(results => {
        addToTabGroup(results.tabs);
        })
        .catch(err => console.error(err)); 
}

// Async function to get all tabs in the window and then get each tab content (tag content)
async function initTabsObject() {

    let currentWindowTabs = await getTabs();

    let tabData = await getTabContent(currentWindowTabs);

    return { tabs: tabData }
}


// Function to get the tab tag content
function getTabContent(currentWindowTabs) {

    let tabPromise = currentWindowTabs.map(tab => {
  
      let tagNodes = new Promise((resolve, reject) => {
        chrome.tabs.executeScript(tab.id, {
          code: `document.body.firstChild.firstChild.children[1].textContent;`
        }, resolve);
      });
  
      let tabsArray = new Promise((resolve, reject) => {
        tagNodes.then(nodes => {

            let tabMeta;
            
            if (nodes[0] == null) {
                tabMeta = new Tab(tab.id, tab.title, []);
            }
            else {
                // TRY CATCH
                var tags = nodes[0].split(' ');

                tags.map((t, index) => {
                    tags[index] = t.substring(0, t.length - 1);
                });
                tags.pop();
            
                tabMeta = new Tab(tab.id, tab.title, tags);
            }
            console.log(tabMeta);
            resolve(tabMeta);
        });
      });
      return tabsArray;
    });
    return tabPromise;
}

// Add tabMeta to TabGroup
function addToTabGroup(tabObjects) {
    const tabGroup = new TabGroup();

    let p = Promise.all(tabObjects);
    console.log(`tabs array promise: ${p}`);
    
    p.then(tabs => {
        tabs.forEach(tab => {
            tabGroup.tabMeta.push(tab);
        });
    });
}