function create_windows(window_list){
    // set the root objects html to nothing
    root.innerHTML = ''

    // loop through the window_list
    window_list.map(window => create_window(window));
    return 
}

function create_window(window){
    // create the root window element and the window title
    let html_window          = document.createElement('div');
    let html_window_title    = document.createElement('div');

    // append the window title to the html window
    html_window.appendChild(html_window_title)

    // set the classes, text and id
    html_window.classList           = "window"
    html_window_title.classList     = window.focused ? "window-title window-active" : "window-title"
    html_window_title.textContent   = `Window #${window.id}`
    html_window.id                  =  window.id

    // add the click listener for opening the window
    html_window_title.addEventListener("click", ()=>{
        open_window(window.id)
    })

    // loop through the window's tabs
    window.tabs.map(tab => create_tab(tab, html_window));


    // append the window root to the root
    root.appendChild(html_window)
    return
}

function fill_tab_data(tab, tab_div){
    // determine if a favicon exists or provide one, if the window is audible ignore the favicon in favor of a gif signaling audio playback
    let favicon = tab.favIconUrl ? tab.favIconUrl : "https://icons-for-free.com/iconfiles/png/512/document+files+page+paper+sheet+text+icon-1320168143312091615.png"
    let src     = tab.audible ? "https://media.giphy.com/media/MeDFeqDC4EMFiKEEMn/giphy.gif" : favicon

    // create the elements that make up a "tab"
    let img     = document.createElement("img");
    let span    = document.createElement("span");
    
    // set classes for the elements
    img.classList       = "window-favcion";
    span.classList      = "window-title-text";
    tab_div.classList   = tab.active ? "window-tab tab-active" : "window-tab";



    // set the src for the favicon, set the title text for the tab and set the div id
    img.src             = src;
    span.textContent    = tab.title;
    tab_div.id          = `${tab.windowId}:${tab.id}`;


    // add a listener for normal click and run a function based on the state of the window 
    tab_div.addEventListener("click", (event)=>{
        event.preventDefault();
        chrome.windows.getCurrent({}, (current_window)=>{
            if (current_window.id === tab.windowId){
                open_tab(tab.id, tab.windowId)
            } else {
                open_tab_window(tab.id, tab.windowId)
            }

        })
    });

    // listener for aux clicks specifically middle mouse to close a tab
    tab_div.addEventListener("auxclick", (event)=>{
        event.preventDefault();
        if (event.button === 1){
            remove_tab(tab.id)
        }
    });


    // append the favicon and text to the tab_div
    tab_div.appendChild(img);
    tab_div.appendChild(span);

    return
}

function create_tab(tab, html_window){

    // create the elements that make up a "tab"
    let tab_div = document.createElement("div")

    // fill in the tab data for the "tab"
    fill_tab_data(tab, tab_div);

    // set the active-tab Attribute to the current tab id if it is active
    if (tab.active) html_window.setAttribute("active-tab", tab.id);

    // append the tab_div to the html_window
    html_window.appendChild(tab_div)
    return
}

function update_tab(tab, tab_div_original){

    // create the elements that make up a "tab"
    let tab_div          = tab_div_original.cloneNode(false)
    
    // fill in the tab data for the "tab"
    fill_tab_data(tab, tab_div);

    if (tab.active) {
        let window_html         = document.getElementById(`${tab.windowId}`);
        let prev_active_id      = window_html.getAttribute("active-tab");
        let prev_active         = document.getElementById(`${tab.windowId}:${prev_active_id}`);
        prev_active.classList   = "window-tab";
        window_html.setAttribute("active-tab", tab.id);
    }


    tab_div_original.parentNode.replaceChild(tab_div, tab_div_original)
    return
}
