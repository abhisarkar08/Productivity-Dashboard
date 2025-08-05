var todoItems = document.querySelectorAll('.todo')
var fullElem = document.querySelectorAll('.fullElem')
var allElem = document.querySelector('.allElem') // Main grid section

todoItems.forEach(function(elem){
    elem.addEventListener('click', function(){
        // Main grid hide karo
        allElem.style.display = 'none'
        
        // Pehle saare fullElem hide karo
        fullElem.forEach(function(section){
            section.style.display = 'none'
        })
        
        // Selected fullElem show karo
        fullElem[parseInt(elem.id)].style.display = 'block'
    })
})

