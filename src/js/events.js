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
    on_moved_attached(tab_id, newWindowId, newPosition)
})


chrome.tabs.onMoved.addListener((tab_id, {toIndex, windowId})=>{
    on_moved_attached(tab_id, windowId, toIndex)
})



chrome.tabs.onActivated.addListener(({tabId: tab_id, windowId: window_id})=>{
    let window_html         = document.getElementById(`${window_id}`);
    let tab_div             = document.getElementById(`${tab_id}`);

    tab_active_switch(window_html)
    tab_div.classList.add("tab-active");


    [].forEach.call(document.getElementsByClassName("window-active"), (el)=>{
        el.classList.remove("window-active")
    })
    window_html.children[0].classList.add("window-active");

})


// ==============================================================================
//                                 Window Events
// ==============================================================================


chrome.windows.onCreated.addListener((window)=>{
    create_window(window)
})

chrome.windows.onRemoved.addListener((window_id)=>{
    let html_window = document.getElementById(`${window_id}`);
    if (html_window) html_window.remove();
})

chrome.windows.onFocusChanged.addListener((window_id)=>{
    if (window_id === -1) return;
    [].forEach.call(document.getElementsByClassName("window-active"), (el)=>{
        el.classList.remove("window-active")
    })
    document.getElementById(window_id).children[0].classList.add("window-active");
})


// ==============================================================================
//                               Event Functions
// ==============================================================================

function tab_active_switch(window_html){
    [].forEach.call(window_html.getElementsByClassName("tab-active"), (el)=>{
        el.classList.remove("tab-active")
    })
}


function on_moved_attached(tab_id, window_id, index){
    let html_window = document.getElementById(`${window_id}`);
    let tab_html = document.getElementById(`${tab_id}`);

    if (html_window.getAttribute("is-hidden") === "true" && !tab_html.classList.contains("hidden")){
        tab_html.classList.add("hidden")
    } else if (tab_html.classList.contains("hidden")) {
        tab_html.classList.remove("hidden")
    }


    if (index + 2 === html_window.children.length){
        return html_window.appendChild(tab_html)
    }
    html_window.insertBefore(tab_html, html_window.children[index === 0 ? 2 : index + 2]);
}