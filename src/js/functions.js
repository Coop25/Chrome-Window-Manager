function open_window(window_id){
    talk_back({ 
        method      : "top_window",
        window_id   : parseInt(window_id)
    }, (data)=>refresh_all(data))
}

function open_tab(tab_id){
    talk_back({ 
        method   : "top_tab",
        tab_id   : parseInt(tab_id)
    }, (data)=>refresh_all(data))
}

function open_tab_window(tab_id, window_id){
    talk_back({ 
        method      : "top_window",
        window_id   : parseInt(window_id),
        tab_id      : parseInt(tab_id)
    }, (data)=>refresh_all(data))
}

function refresh_all(data){
    console.log(data)
    setInt();
}