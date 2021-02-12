chrome.tabs.onUpdated.addListener((tab_id, change, tab)=>{
     let tab_html = document.getElementById(`${tab.id}`)
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

chrome.tabs.onRemoved.addListener((tab_id, { isWindowClosing, windowId: window_id })=>{
    let html_window = document.getElementById(`${window_id}`);
    let tab_html = document.getElementById(`${tab_id}`);
    if (isWindowClosing){
        html_window.remove();
    } else {
        tab_html.remove();
    }
})

chrome.tabs.onAttached.addListener((tab_id, {newPosition, newWindowId})=>{
    let html_window = document.getElementById(`${newWindowId}`);
    let tab_html = document.getElementById(`${tab_id}`);

    if (newPosition + 2 === html_window.children.length ){
        html_window.appendChild(tab_html)
    }
    html_window.insertBefore(tab_html, html_window.children[newPosition === 0 ? 1 : newPosition + 1]);
})

chrome.tabs.onMoved.addListener((tab_id, {fromIndex, toIndex, windowId: window_id})=>{
    let html_window = document.getElementById(`${window_id}`);
    let tab_html = document.getElementById(`${tab_id}`);


    if (toIndex + 2 === html_window.children.length){
        return html_window.appendChild(tab_html)
    }
    html_window.insertBefore(tab_html, html_window.children[toIndex === 0 ? 1 : toIndex + 1]);
})


// ==============================================================================
//                                 Window Events
// ==============================================================================


chrome.windows.onCreated.addListener((window)=>{
    create_empty_window(window)
})

chrome.windows.onRemoved.addListener((window_id)=>{
    let html_window = document.getElementById(`${window_id}`);
    if (html_window) html_window.remove();
})

chrome.windows.onFocusChanged.addListener((window_id)=>{
    if (window_id === -1) return;
    let prev_active_window      = root.getAttribute("active-window");
    let prev_active_html_window = document.getElementById(`${prev_active_window}`);
    let html_window             = document.getElementById(`${window_id}`);

    if (prev_active_html_window) {
        prev_active_html_window.children[0].classList   = "window-title"
        html_window.children[0].classList               = "window-title window-active"
    }
    root.setAttribute("active-window", `${window_id}`)
})