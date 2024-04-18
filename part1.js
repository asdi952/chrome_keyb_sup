console.log("extension")

// document.querySelectorAll(".LC20lb").forEach(e=>{
//     e.style.border = "thick solid #0000FF"
// })


let links = []
let pointer = -1

function addElm(elm){
    console.log("node added")
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
        console.log("bot");
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

document.addEventListener("keydown", (evt)=>{
    // console.log(evt)
    if(evt.key === 'Escape'){
        document.body.click()
        document.activeElement.blur()
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

const root_selector = "#rso"
const elm_selector = ["MjjYud", "g"]

const o = new MutationObserver(mutationList =>{
    for (const mutation of mutationList) {
        if (mutation.type === "childList") {
            mutation.addedNodes.forEach(node=>{
                if(node == undefined) {return}
                if(node.classList == undefined) {return}
                
                if(node.classList.contains(elm_selector[1])){
                    if(node.parentNode.classList.contains(elm_selector[0])){
                        addElm(node.parentNode)
                    }
                }
            })
        }
    }
})
o.observe( document, { childList: true, subtree: true})
