
// document.querySelectorAll(".LC20lb").forEach(e=>{
//     e.style.border = "thick solid #0000FF"
// })


let links = []
let pointer = -1

function addElm(elm){
    console.log("addded")
    links.push(elm)

    if(links.length == 1){
        change_pointer(0)
    }
}


function clamp_pointer_into_view(){
    const rect = links[pointer].getBoundingClientRect()


    const margin = 100
    const elm = {top: rect.y, bot: rect.y + rect.height}

    // console.log(elm, window.outerHeight)

    if(elm.top < 0){
        document.documentElement.scrollTop += elm.top - margin 
    } 
    if(elm.bot > window.innerHeight){
        document.documentElement.scrollTop += elm.bot - window.innerHeight + margin
    }
}

function change_pointer(pt){
    if(pt == pointer) return
    if(pt < 0 || pt >= links.length) return

    if(links[pointer] != undefined){
        removeVisualTarget(links[pointer])
    }
    pointer = pt
    addVisualTarget(links[pointer])
    clamp_pointer_into_view()
}
function addVisualTarget(elm){
    elm.classList.add("keyboard_target")
    // elm.style.border = "thick solid #0000FF"
}
function removeVisualTarget(elm){
    elm.classList.remove("keyboard_target")
    
}
function enter_link(){
    const elm = links[pointer]
    if(elm == undefined){return}
    const a = elm.querySelector("a")
    if(a == undefined) {return}

    a.click()
}
function lose_focus(){
    document.body.click()
    document.activeElement.blur()
}
document.addEventListener("load",()=>{
    lose_focus()
})

document.addEventListener("keydown", (evt)=>{
    // console.log(evt)
    if(evt.key === 'Escape'){
        lose_focus
    }

    if( document.activeElement.tagName !== "BODY") {return}

    let yaxis = 0
    if(evt.key === 'w' || evt.key === 'ArrowUp' ){
        yaxis -= 1
    }
    if(evt.key === 's' || evt.key === 'ArrowDown' ){
        yaxis += 1
    }
    change_pointer(pointer + yaxis)

    if(evt.key === 'd' || evt.key === 'ArrowRight' ){
        enter_link()
    }

})


function watch_elm_added(root, id, callback){
    const o = new MutationObserver((records, self) =>{
        for (const record of records) {
            if(record.target.id == id) {
                if(record.addedNodes.length != 0){
                    for( const node of record.addedNodes){
                        if(node.tagName == "DIV"){
                            // console.log(node)
                            callback(node)
                        }
                    }
                }
                
                // console.log(record.target.id, record.type)
            }
        }
    })
    
    o.observe(  root, { childList: true, subtree: true})
    
}

watch_elm_added(document, "tads", (node)=>{
    addElm(node)
})

watch_elm_added(document, "rso", (node)=>{
    addElm(node)
})


function watch_elm_added1(root, regex, callback){
    const o = new MutationObserver((records, self) =>{
        for (const record of records) {
            const match = record.target.id.match(regex)
            console.log(match);
            if(match == undefined) break
            if(match.groups == undefined) break
            if(match.groups[num] < 100) break

            if(record.addedNodes.length != 0){
                for( const node of record.addedNodes){
                    if(node.tagName == "DIV"){
                        // console.log(node)
                        callback(node)
                    }
                }
            }
        }
    })
    
    o.observe(  root, { childList: true, subtree: true})
    
}

watch_elm_added1(document, /"arc-srp_(?<num>\d+)/, (node)=>{
    // addElm(node)
    console.log(node);
    for(let child of node.childNodes){
        if(child.tagName !== "DIV") continue
  
        addElm(child)
    }
})