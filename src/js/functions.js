function open_window(window_id){
        chrome.windows.update(parseInt(window_id), { focused: true }, refresh_all)
}

function open_tab(tab_id){
    chrome.tabs.update(parseInt(tab_id), { active: true }, refresh_all)
}


function remove_tab(tab_id){
    chrome.tabs.remove(parseInt(tab_id), refresh_all)
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

function get_all(cb){
    chrome.windows.getAll({ populate : true }, (window_list)=>{
        cb(window_list)
    })
}

function refresh_all(data){
    if(data) console.log(data)
    setInt();
}



//=================================================================================
//                                ERROR: handling
//=================================================================================
// yes I know this is probably not the correct way to do this but its almost 11PM ill fix it later :)
// TODO: actually fix this

let expected_errors = [
    "Uncaught Error: Extension context invalidated.",
    "Uncaught TypeError: Cannot read property 'update' of undefined"
]

window.addEventListener('error', function (evt) {
    if (expected_errors.includes(evt.message)){
        evt.preventDefault();
        location.reload();
    }
});