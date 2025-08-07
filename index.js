function openCards(){
    var todoItems = document.querySelectorAll('.todo')
    var fullElem = document.querySelectorAll('.fullElem')
    var allElem = document.querySelector('.allElem') // Main grid section
    var main = document.querySelector('.main-bar')
    var bac = document.querySelectorAll('.fullElem .back')

    todoItems.forEach(function(elem){
        elem.addEventListener('click', function(){
        // Main grid hide karo
            allElem.style.display = 'none'
            main.style.display = 'none'
        
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
            main.style.display = 'block'
        })
    })
}
openCards()

function Todo(){
    const form = document.querySelector('.type');
    const input = document.querySelector('.in');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!input.value.trim()) return;
    
        const taskDiv = document.createElement('div');
        taskDiv.className = 'show';
        taskDiv.innerHTML = `<h3>${input.value}</h3><div class="checko"><input type="checkbox" id="ok"><i class="ri-delete-bin-line bo"></i></div>`;
    
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
}
Todo()

function day(){
    //18 cards
    var hour = Array.from({length:18}, (_,idx)=> `${6+idx}:00 - ${7+idx}:00`)

    var dayplandata = JSON.parse(localStorage.getItem('dayplandata'))||{}
    var dayplanner = document.querySelector('.day-palnner')


    var sum =' '
    hour.forEach(function(elem, idx){
        var save = dayplandata[idx] || ''
        sum = sum + `<div class="day-time">
                        <p>${elem}</p>
                        <input id=${idx} type="text" placeholder="Plan your next goal here" class="enter" value='${save}'>
                        <input type="checkbox" id="ch">
                    </div>`
    })
    dayplanner.innerHTML = sum


    //localstorage
    var inputday = document.querySelectorAll('.enter')

    inputday.forEach(function(elem){
        elem.addEventListener('input', function(){
            dayplandata[elem.id] = elem.value

            localStorage.setItem('dayplandata',  JSON.stringify(dayplandata))
        })
    })

    //check krne k liye

    var check =document.getElementById("ch")
    check.addEventListener('change', function(){
        var te = document.querySelector(".enter")
        if (check.checked) {
            te.classList.add('strikethrough');
        } else {
            te.classList.remove('strikethrough');
        } 
    })
}
day()

function moti(){
    var quote  = document.querySelector('.p');
    var namea  = document.querySelector('.nam');
    var news   = document.querySelector('.new');

    news.addEventListener('click', async function(){
        let res = await fetch('https://dummyjson.com/quotes/random');
        let data = await res.json();
        quote.innerHTML = data.quote;
        namea.innerHTML = '- ' + data.author;
    });
}
moti()

function time(){
    var work   = document.querySelector('.wo');
    var shobre = document.querySelector('.sb');
    var lonbre = document.querySelector('.lb');
    var one    = document.querySelector('.one');
    var two    = document.querySelector('.two');
    var three  = document.querySelector('.three');
    var coff   = document.querySelector('.coffee');
    var suit   = document.querySelector('.suit');
    var start = document.querySelector('.st');
    var pause = document.querySelector('.pt');
    var reset = document.querySelector('.re');

    let timeinter = null;
    let currentMode = 'work';     
    let ts = 25 * 60;             

    function getModeSeconds() {
        if (currentMode === 'work')  return 25 * 60;
        if (currentMode === 'short') return  5 * 60;
        if (currentMode === 'long')  return 15 * 60;
    }

    function updatetime() {
        let min = Math.floor(ts / 60);
        let sec = ts % 60;
        if (currentMode === 'work')   one.innerHTML   = `${min}:${sec.toString().padStart(2, '0')}`;
        if (currentMode === 'short')  two.innerHTML   = `${min}:${sec.toString().padStart(2, '0')}`;
        if (currentMode === 'long')   three.innerHTML = `${min}:${sec.toString().padStart(2, '0')}`;
    }

    shobre.addEventListener('click', function() {
        one.style.display = "none";
        two.style.display = "block";
        three.style.display = "none";
        coff.style.display = "block";
        suit.style.display = "none";
        clearInterval(timeinter);
        currentMode = 'short';
        ts = getModeSeconds();
        updatetime();
    });

    lonbre.addEventListener('click', function() {
        one.style.display = "none";
        two.style.display = "none";
        three.style.display = "block";
        coff.style.display = "block";
        suit.style.display = "none";
        clearInterval(timeinter);
        currentMode = 'long';
        ts = getModeSeconds();
        updatetime();
    });

    work.addEventListener('click', function() {
        one.style.display = "block";
        two.style.display = "none";
        three.style.display = "none";
        coff.style.display = "none";
        suit.style.display = "block";
        clearInterval(timeinter);
        currentMode = 'work';
        ts = getModeSeconds();
        updatetime();
    });

    function startTime() {
        clearInterval(timeinter);
        timeinter = setInterval(function() {
            if (ts > 0) {
                ts--;
                updatetime();
            } else {
                clearInterval(timeinter); // Stop at 00:00
            }
        }, 1000);
    }
    function pauset() {
        clearInterval(timeinter);
    }
    function resett() {
        clearInterval(timeinter);
        ts = getModeSeconds();
        updatetime();
    }


    start.addEventListener('click', startTime);
    pause.addEventListener('click', pauset);
    reset.addEventListener('click', resett);


    ts = getModeSeconds();
    updatetime();
}
time()

function weatime(){
    var city = "Delhi, India";


    var data = null
    var h2 = document.querySelector('.wea h2')
    var h5 = document.querySelector('.wea h5')
    var temph2 = document.querySelector('.temp h2')
    var temph4 = document.querySelector('.temp h4')
    var wind = document.querySelector('.wind')
    var humi = document.querySelector('.humi')
    var heat = document.querySelector('.heat')
    async function weather() {
        var res = await fetch(`http://api.weatherapi.com/v1//current.json?key=${WEATHER_API_KEY}&q=${city}`)
        data = await res.json()
        console.log(data.current);
        temph2.innerHTML = `${data.current.temp_c}°C`
        temph4.innerHTML = `${data.current.condition.text}`
        wind.innerHTML = `Wind: ${data.current.wind_kph}Km/hr`
        humi.innerHTML = `Humnidity: ${data.current.humidity}%`
        heat.innerHTML = `HeatIndex: ${data.current.heatindex_c}%`
    }
    weather()

    var date = null
    function timedate(){
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const totalDaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        date = new Date()
        var dayOfWeek = totalDaysOfWeek[date.getDay()]
        var hours = date.getHours()
        var minutes = date.getMinutes().toString().padStart(2, '0')
        var sec = date.getSeconds().toString().padStart(2, '0')
        var datea = date.getDate()
        var month = monthNames[date.getMonth()]
        var year = date.getFullYear()

        h5.innerHTML = `${datea} ${month} ${year}`
            
        if(hours>12){
            h2.innerHTML = `${dayOfWeek}, ${hours-12}:${minutes}:${sec}PM`
        }
        else{
            h2.innerHTML = `${dayOfWeek}, ${hours}:${minutes}:${sec}AM`
        }
    }
    timedate()
    setInterval(timedate, 1000)
}
weatime()

function dark(){
    var theme = document.querySelector('.theme');
    var isThemeActive = false;

    theme.addEventListener('click', () => {
    isThemeActive = !isThemeActive;  // Toggle flag on each click
    console.log('Theme toggled:', isThemeActive);

    if (isThemeActive) {
        var root = document.documentElement;
        root.style.setProperty('--pri','#FFFBDE')
        root.style.setProperty('--ggray','70, 130, 169')
        // Root ke --black ki value le kar --sec me daal do
        var blackValue = getComputedStyle(root).getPropertyValue('--black').trim();
        root.style.setProperty('--sec', blackValue);

        // .allElem element select karo
        var allElem = document.querySelector('.allElem');
        var mainb = document.querySelector('.mainb');
        var box = document.querySelector('.boxx')
        var theme = document.querySelector('.theme')
        var newaa = document.querySelector('.new')
        var quote = document.querySelector('.quote')

        // .allElem me apni original --sec ki value set karo (jo chahiye waisi)
        var originalSecValue = '#ffff';
        var origin = '#FFFBDE';
        allElem.style.setProperty('--sec', originalSecValue);
        mainb.style.setProperty('--sec', originalSecValue);
        box.style.setProperty('--sec', originalSecValue);
        newaa.style.setProperty('--sec', originalSecValue);
        theme.style.setProperty('--sec', origin);
        quote.style.setProperty('--sec', origin);
        box.style.boxShadow = `0 4px 10px var(--black)`;
        document.querySelectorAll('.back').forEach(backBtn => {
            backBtn.style.setProperty('--sec', originalSecValue);
        });
    } else {
        var root = document.documentElement;
        root.style.removeProperty('--pri');
        root.style.removeProperty('--ggray');
        root.style.removeProperty('--sec');
        
        var allElem = document.querySelector('.allElem');
        var mainb = document.querySelector('.mainb');
        var box = document.querySelector('.boxx');
        var theme = document.querySelector('.theme');
        var newaa = document.querySelector('.new');
        var quote = document.querySelector('.quote');

        allElem.style.removeProperty('--sec');
        mainb.style.removeProperty('--sec');
        box.style.removeProperty('--sec');
        newaa.style.removeProperty('--sec');
        theme.style.removeProperty('--sec');
        quote.style.removeProperty('--sec');
        box.style.boxShadow = ''; // remove inline boxShadow, use CSS ka default

        document.querySelectorAll('.back').forEach(backBtn => {
            backBtn.style.removeProperty('--sec');
        });
    }
    });
}
dark()


