// ==============================================================================
//                               Window Functions
// ==============================================================================

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
    let html_window_new_tab  = document.createElement('div');
    
    html_window_new_tab.innerHTML = "&#10133;"
    html_window_new_tab.classList.add("new-tab-button")

    html_window_new_tab.addEventListener("click", ()=>{
        create_new_tab(window.id) 
    })

    // append the window title to the html window
    html_window.prepend(html_window_new_tab)
    html_window.prepend(html_window_title)

    


    // set the classes, text and id
    html_window.classList           = "window"
    html_window_title.classList     = window.focused ? "window-title window-active" : "window-title"
    html_window_title.textContent   = `Window #${window.id}`
    html_window.id                  =  window.id
    html_window.setAttribute("is-hidden", "false")
    html_window.setAttribute("needs-to-hide", "false")


    // add the click listener for opening the window
    html_window_title.addEventListener("click", ()=>{
        // open_window(window.id)
        if (html_window.getAttribute("is-hidden") === "true"){
            show_window(html_window)
        } else {
            hide_window(html_window)
        }
    })

    html_window.addEventListener('dragover', e => {
        e.preventDefault()

        if (html_window.getAttribute("is-hidden") === "true") {
            html_window.setAttribute("needs-to-hide", "true")
            show_window(html_window)
        }

        const afterElement = getDragAfterElement(html_window, e.clientY)
        const draggable = document.querySelector('.dragging')
        if (afterElement == null) {
            html_window.appendChild(draggable)
        } else {
            html_window.insertBefore(draggable, afterElement)
        }
    })

    // loop through the window's tabs
    if(window.tabs?.length > 0) window.tabs.map(tab => create_tab(tab, html_window));


    // append the window root to the root
    root.appendChild(html_window)
    return
}

function getDragAfterElement(window_html, y) {
    const draggableElements = [...window_html.querySelectorAll('.draggable:not(.dragging)')]

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}

function show_window(html_window){
    html_window.setAttribute("is-hidden", "false")
        Array.from(html_window.children).forEach(el=>{
        if(el.classList.contains("hidden") && el.classList.contains("window-tab")) el.classList.remove("hidden")
    })
}

function hide_window(html_window){
    html_window.setAttribute("is-hidden", "true")
    Array.from(html_window.children).forEach(el=>{
        if(!el.classList.contains("hidden") && el.classList.contains("window-tab")) el.classList.add("hidden")
    })
}



// ==============================================================================
//                               Tab Functions
// ==============================================================================


function create_tab(tab, html_window){

    // create the elements that make up a "tab"
    let tab_div = document.createElement("div")

    // fill in the tab data for the "tab"
    fill_tab_data(tab, tab_div);

    
    if (html_window.getAttribute("is-hidden") === "true"){
        tab_div.classList.add('hidden')
    }

    // append the tab_div to the html_window
    html_window.appendChild(tab_div)
    return
}

function update_tab(tab, tab_div_original){

    // create the elements that make up a "tab"
    let tab_div          = tab_div_original.cloneNode(false)

    if (tab.active) {
        let window_html         = document.getElementById(`${tab.windowId}`);
        tab_active_switch(window_html)
    }

    // fill in the tab data for the "tab"
    fill_tab_data(tab, tab_div);

    if (tab_div_original.parentNode.getAttribute("is-hidden") === "true"){
        tab_div.classList.add('hidden')
    }

    tab_div_original.parentNode.replaceChild(tab_div, tab_div_original)
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
    tab_div.classList   = tab.active ? "window-tab draggable tab-active" : "window-tab draggable";
    tab_div.setAttribute("draggable","true")



    // set the src for the favicon, set the title text for the tab and set the div id
    img.src             = src;
    span.textContent    = tab.title;
    tab_div.id          = `${tab.id}`;


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

    tab_div.addEventListener('dragstart', () => {
        tab_div.classList.add('dragging')
    })

    tab_div.addEventListener('dragend', () => {
        tab_div.classList.remove('dragging')
        let index = [...tab_div.parentNode.children].indexOf(tab_div) - 2
        let window_id = parseInt(tab_div.parentNode.id);
        let window_html = tab_div.parentNode
        move_tab_window(tab.id, index, window_id);
        if (window_html.getAttribute("needs-to-hide") === "true") {
            window_html.setAttribute("needs-to-hide", "false")
            hide_window(window_html)
        }
    })


    // append the favicon and text to the tab_div
    tab_div.appendChild(img);
    tab_div.appendChild(span);

    return
}