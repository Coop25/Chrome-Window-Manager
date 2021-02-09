chrome.tabs.onUpdated.addListener((tab_id, change, tab)=>{
    console.log(change)
     let tab_html = document.getElementById(`${tab.windowId}:${tab.id}`)
    if ((change.status === "complete" || change.audible === false || change.audible || change.title) && tab_html){
        update_tab(tab, tab_html)
    }
});


chrome.tabs.onCreated.addListener((tab)=>{
    let html_window = document.getElementById(`${tab.windowId}`);
    if (!html_window){
        chrome.windows.get(tab.windowId, {}, (window)=> create_window(window) )
    } else {
        create_tab(tab, html_window)
    }
})

chrome.tabs.onRemoved.addListener((tab_id, { isWindowClosing, windowId })=>{
    let html_window = document.getElementById(`${windowId}`);
    let tab_html = document.getElementById(`${windowId}:${tab_id}`);
    if (isWindowClosing){
        html_window.remove();
    } else {
        tab_html.remove();
    }
})