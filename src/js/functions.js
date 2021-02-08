function open_window(window_id){
        chrome.windows.update(
            parseInt(window_id), 
            { focused: true }, 
            refresh_all)
}

function open_tab(tab_id){
    chrome.tabs.update(
        parseInt(tab_id), 
        { active: true }, 
        refresh_all)
}

function open_tab_window(tab_id, window_id){
    chrome.windows.update(parseInt(window_id), { focused: true }, () =>{
        chrome.tabs.update(parseInt(tab_id), { active: true }, refresh_all)
    })
}

function get_all(cb){
    chrome.windows.getAll({ populate : true }, (window_list)=>{
        cb(window_list)
    })
}

function refresh_all(data){
    console.log(data)
    setInt();
}