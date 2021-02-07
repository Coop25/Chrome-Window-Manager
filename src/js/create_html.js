function create_windows(window_list){
    let windows = window_list.map(window => {
        let tab_html = window.tabs.map(tab => create_tab(tab, window.id, window.focused));
        return `
        <div class="window">
            <div class="${window.focused ? "window-title window-active" : "window-title"}" onclick="open_window(${window.id})">
                Window #${window.id}
            </div>
            ${tab_html.join('\n')}
        </div>
        `
    });
    return windows.join('\n')
}

function create_tab(tab, window_id, isFocused){
    let favicon = tab.favIconUrl ? tab.favIconUrl : "https://icons-for-free.com/iconfiles/png/512/document+files+page+paper+sheet+text+icon-1320168143312091615.png"
    let classes = tab.active ? "window-tab tab-active" : "window-tab"
    return `
    <div class="${classes}" onclick="${isFocused ? "open_tab" : "open_tab_window"}(${tab.id}, ${window_id})">
        <img class="window-favcion" src="${tab.audible ? "https://media.giphy.com/media/MeDFeqDC4EMFiKEEMn/giphy.gif" : favicon}">
        <span class="window-title-text">${tab.title}</span>
    </div>
    `
}