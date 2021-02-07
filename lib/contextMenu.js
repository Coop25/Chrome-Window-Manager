chrome.contextMenus.create({
    id: "open-tab",
    title: "Open Window Manager",
    contexts:["selection"]  // ContextType
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "open-tab") {
        chrome.tabs.create({
            url: '/index.html',
            active: true,
        });
    }
});