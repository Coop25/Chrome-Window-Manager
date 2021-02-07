chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("Background Page!!")
    console.log(request)
    browser_functions[request.method](request).then((result)=>{
        console.log(result)
        sendResponse(result)
    })
    
    return true
});


let browser_functions = {
    getAll: ()=> new Promise((resolve, reject)=>{
        chrome.windows.getAll({populate : true}, (window_list)=>{
            console.log(window_list)
            // let list = window_list.map(window=> window.tabs);
            resolve(window_list)
        })
    }),
    surface: (request)=> new Promise(async (resolve, reject)=>{
        await browser_functions.top_window(request);
        await browser_functions.top_tab(request);
        resolve(true)
    }),
    top_window: ({ window_id })=> new Promise((resolve, reject)=>{
        chrome.windows.update(window_id, {focused: true}, (window)=>resolve(window))
    }),
    top_tab: ({ tab_id })=> new Promise((resolve, reject)=>{
        chrome.tabs.update(tab_id, {active: true}, (tab)=> resolve(tab))
    }),
}

