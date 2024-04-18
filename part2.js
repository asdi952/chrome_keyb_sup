
document.addEventListener("keydown", (evt)=>{
    // console.log(evt)
    if(evt.key === 'Escape'){
        document.body.click()
        document.activeElement.blur()
    }

    if( document.activeElement.tagName !== "BODY") {return}

   
    if(evt.key === 'a' || evt.key === 'Arrowleft' ){
        history.back()
    }

})