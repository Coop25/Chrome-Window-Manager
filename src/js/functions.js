function open_window(window_id){
        chrome.windows.update(parseInt(window_id), { focused: true }, callback)
}

function open_tab(tab_id){
    chrome.tabs.update(parseInt(tab_id), { active: true }, callback)
}


function remove_tab(tab_id){
    chrome.tabs.remove(parseInt(tab_id), callback)
}

function open_tab_window(tab_id, window_id){
    chrome.windows.update(parseInt(window_id), { focused: true }, () =>{
        chrome.tabs.update(parseInt(tab_id), { active: true }, callback)
    })
}

function move_tab_window(tab_id, index, window_id){
    chrome.tabs.move(tab_id, {index, windowId: window_id}, callback)
}

function get_all(cb){
    chrome.windows.getAll({ populate : true }, (window_list)=>{
        cb(window_list)
    })
}

function create_new_tab(window_id) {
    chrome.tabs.create({ windowId : window_id }, callback)
}

function refresh_all(data){
    if(data) console.log(data)
    get_all((data)=>{
        console.log(data)
        create_windows(data)
    })
}

function callback(data){
    // pretty much all of the chrome functions need a callback so this is here just in case
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