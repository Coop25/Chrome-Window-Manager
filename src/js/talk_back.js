function talk_back(data, cb){
    chrome.runtime.sendMessage(data, cb);  
}

// {
//     method: "getAll"
//   }