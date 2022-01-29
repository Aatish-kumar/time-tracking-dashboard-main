const title = document.querySelectorAll('.title');
const time = document.querySelectorAll('div p:nth-of-type(1) span');
const time_before = document.querySelectorAll('div p:nth-of-type(2) span');
const buttons = document.querySelectorAll('.btn');
let current_num = 1

function data() {
    fetch('./data.json')
        .then(response => response.json())
        .then(data => update_data(data))
        .catch(e => console.log(e))


    function update_data(data) {
        for(let i=0; i < data.length; i++) {
            title[i].innerHTML = data[i].title

            if (current_num == 1) {
                time[i].textContent= data[i].timeframes.daily.current;
                time_before[i].textContent = data[i].timeframes.daily.previous;
            }else if (current_num == 2) {
                time[i].textContent= data[i].timeframes.weekly.current;
                time_before[i].textContent = data[i].timeframes.weekly.previous;
            }else if(current_num == 3) {
                time[i].textContent = data[i].timeframes.monthly.current;
                time_before[i].textContent = data[i].timeframes.monthly.previous;
            }
        }
    }
}


function delete_class() {
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('current')
    }
}

function change_period() {

    current_num = Number(this.dataset.id);
    delete_class();
    this.classList.add('active');

    data();
}

data();


buttons.forEach(btn => {btn.addEventListener('click', change_period)});
