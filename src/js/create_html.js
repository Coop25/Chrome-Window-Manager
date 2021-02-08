function create_windows(window_list){
    // set the root objects html to nothing
    root.innerHTML = ''

    // loop through the window_list
    window_list.map(window => {
        // create the root window element and the window title
        let html_window          = document.createElement('div');
        let html_window_title    = document.createElement('div');

        // append the window title to the html window
        html_window.appendChild(html_window_title)

        // set the classes and text
        html_window.classList           = "window"
        html_window_title.classList     = window.focused ? "window-title window-active" : "window-title"
        html_window_title.textContent   = `Window #${window.id}` 

        // add the click listener for opening the window
        html_window_title.addEventListener("click", ()=>{
            open_window(window.id)
        })

        // loop through the window's tabs
        window.tabs.map(tab => create_tab(tab, window, html_window));


        // append the window root to the root
        root.appendChild(html_window)
        return
    });
    return 
}

function create_tab(tab, window, html_window){
    // determine if a favicon exists or provide one, if the window is audible ignore the favicon in favor of a gif signaling audio playback
    let favicon = tab.favIconUrl ? tab.favIconUrl : "https://icons-for-free.com/iconfiles/png/512/document+files+page+paper+sheet+text+icon-1320168143312091615.png"
    let src     = tab.audible ? "https://media.giphy.com/media/MeDFeqDC4EMFiKEEMn/giphy.gif" : favicon

    // create the elements that make up a "tab"
    let tab_div = document.createElement("div")
    let img     = document.createElement("img")
    let span    = document.createElement("span")

    // set classes for the elements
    img.classList       = "window-favcion"
    span.classList      = "window-title-text"
    tab_div.classList = tab.active ? "window-tab tab-active" : "window-tab"

    // set the src for the favicon and the title text for the tab
    img.src             = src
    span.textContent    = tab.title

    // add a listener for normal click and run a function based on the state of the window 
    tab_div.addEventListener("click", (event)=>{
        event.preventDefault();
        if (window.focused){
            open_tab(tab.id, window.id)
        } else {
            open_tab_window(tab.id, window.id)
        }
    })

    // listener for aux clicks specifically middle mouse to close a tab
    tab_div.addEventListener("auxclick", (event)=>{
        event.preventDefault();
        if (event.button === 1){
            remove_tab(tab.id)
        }
    })

    // append the favicon and text to the tab_div
    tab_div.appendChild(img)
    tab_div.appendChild(span)

    // append the tab_div to the html_window
    html_window.appendChild(tab_div)
    return
}