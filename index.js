function openCards(){
    var todoItems = document.querySelectorAll('.todo')
    var fullElem = document.querySelectorAll('.fullElem')
    var allElem = document.querySelector('.allElem') // Main grid section
    var bac = document.querySelectorAll('.fullElem .back')

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
    bac.forEach(function(back){
        back.addEventListener('click', function(){
            fullElem[back.id].style.display='none'
            allElem.style.display = 'grid'
        })
    })
}
openCards()

const form = document.querySelector('.type');
const input = document.querySelector('.in');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!input.value.trim()) return;
    
    const taskDiv = document.createElement('div');
    taskDiv.className = 'show';
    taskDiv.innerHTML = `<h3>${input.value}</h3><div class="checko"><input type="checkbox"><i class="ri-delete-bin-line bo"></i></div>`;
    
    document.querySelector('.pending .pend').style.display = 'none';
    document.querySelector('.pending').appendChild(taskDiv);
    
    taskDiv.querySelector('input').addEventListener('change', function() {
        taskDiv.className = this.checked ? 'shows' : 'show';
        const target = this.checked ? '.completed' : '.pending';
        document.querySelector(target + ' .pend').style.display = 'none';
        document.querySelector(target).appendChild(taskDiv);
        
        // Check empty
        if (!document.querySelector('.pending .show')) document.querySelector('.pending .pend').style.display = 'block';
        if (!document.querySelector('.completed .shows')) document.querySelector('.completed .pend').style.display = 'block';
    });
    
    taskDiv.querySelector('.bo').addEventListener('click', function() {
        taskDiv.remove();
        if (!document.querySelector('.pending .show')) document.querySelector('.pending .pend').style.display = 'block';
        if (!document.querySelector('.completed .shows')) document.querySelector('.completed .pend').style.display = 'block';
    });
    
    input.value = '';
});



