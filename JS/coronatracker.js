//function to add commas between numbers
function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

//function to update all the cases in India to the card
function updateIndiaCard() {
    let totalCasesInIndia = document.getElementById('totalCasesInIndia');
    let totalcases2 = document.getElementById('totalcases2');
    let totaldeaths2 = document.getElementById('totaldeaths2');
    let totalrecovered2 = document.getElementById('totalrecovered2');
    let url = 'https://data.covid19india.org/data.json';
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
        let obj = JSON.parse(this.responseText);
        totalCasesInIndia.innerHTML = numberWithCommas(obj.statewise[0].active);
        totalcases2.innerHTML = `<p class="totalcases">${numberWithCommas(obj.statewise[0].confirmed)}</p>`
        totaldeaths2.innerHTML = `<p class="totaldeaths">${numberWithCommas(obj.statewise[0].deaths)}</p>`
        totalrecovered2.innerHTML = `<p class="totalrecovered">${numberWithCommas(obj.statewise[0].recovered)}</p>`
    }
    xhr.send();
}

//function to fill all the cases in state in the table
function fillTable() {
    let tableBody = document.getElementById('tableBody');
    let url = 'https://data.covid19india.org/data.json';
    let str = "";
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
        let obj = JSON.parse(this.responseText);
        for (let i = 1; i < obj.statewise.length; i++) {
            str += `<tr>
                        <td class="bgcyan">${obj.statewise[i].state}</td>
                        <td class="bgorange">${numberWithCommas(obj.statewise[i].confirmed)}</td>
                        <td class="bgyellow">${numberWithCommas(obj.statewise[i].active)}</td>
                        <td class="bgred">${numberWithCommas(obj.statewise[i].deaths)}</td>
                        <td class="bggreen">${numberWithCommas(obj.statewise[i].recovered)}</td>
                    </tr>
            `
        }
        tableBody.innerHTML = str;
    }
    xhr.send();
}

//function to update all the cases in specific state to the card
function StateWiseDetail() {
    let caw1 = document.getElementById('caw1');
    let totalCasesInState = document.getElementById('totalCasesInState');
    let totalcases1 = document.getElementById('totalcases1');
    let totaldeaths1 = document.getElementById('totaldeaths1');
    let totalrecovered1 = document.getElementById('totalrecovered1');
    let url = 'https://data.covid19india.org/data.json';
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
        let obj = JSON.parse(this.responseText);
        caw1.innerHTML = `Cases Across ${obj.statewise[34].state}`
        totalCasesInState.innerHTML = numberWithCommas(obj.statewise[34].active);
        totalcases1.innerHTML = `<p class="totalcases">${numberWithCommas(obj.statewise[34].confirmed)}</p>`
        totaldeaths1.innerHTML = `<p class="totaldeaths">${numberWithCommas(obj.statewise[34].deaths)}</p>`
        totalrecovered1.innerHTML = `<p class="totalrecovered">${numberWithCommas(obj.statewise[34].recovered)}</p>`
    }
    xhr.send();
}

//function to search the cases in specific states
function Search() {
    let inp = document.getElementById('inp').value;
    var ctx = document.getElementById('myChart').getContext('2d');
    let caw1 = document.getElementById('caw1');
    let totalCasesInState = document.getElementById('totalCasesInState');
    let totalcases1 = document.getElementById('totalcases1');
    let totaldeaths1 = document.getElementById('totaldeaths1');
    let totalrecovered1 = document.getElementById('totalrecovered1');
    let url = 'https://data.covid19india.org/data.json';
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
        let obj = JSON.parse(this.responseText);
        for (let i = 0; i < obj.statewise.length; i++) {
            if (obj.statewise[i].state.includes(inp)) {
                caw1.innerHTML = `Cases Across ${obj.statewise[i].state}`
                totalCasesInState.innerHTML = numberWithCommas(obj.statewise[i].active);
                totalcases1.innerHTML = `<p class="totalcases">${numberWithCommas(obj.statewise[i].confirmed)}</p>`
                totaldeaths1.innerHTML = `<p class="totaldeaths">${numberWithCommas(obj.statewise[i].deaths)}</p>`
                totalrecovered1.innerHTML = `<p class="totalrecovered">${numberWithCommas(obj.statewise[i].recovered)}</p>`
                var myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Active', 'Deaths', 'Recovered'],
                        datasets: [{
                            label: `Corona Cases ${obj.statewise[i].state}`,
                            data: [obj.statewise[i].active, obj.statewise[i].deaths, obj.statewise[i].recovered],
                            backgroundColor: [
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(75, 192, 192, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 206, 86, 1)',
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
                myChart.render();
            }
        }
    }
    xhr.send();
}

//chart
// function makeChart() {
//     let url = 'https://data.covid19india.org/data.json';
//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', url, true);
//     xhr.onload = function() {
//         let obj = JSON.parse(this.responseText);
//         var ctx = document.getElementById('myChart').getContext('2d');
//         var myChart = new Chart(ctx, {
//             type: 'bar',
//             data: {
//                 labels: ['Active', 'Deaths', 'Recovered'],
//                 datasets: [{
//                     label: `Corona Cases India`,
//                     data: [obj.statewise[0].active, obj.statewise[0].deaths, obj.statewise[0].recovered],
//                     backgroundColor: [
//                         'rgba(255, 206, 86, 0.2)',
//                         'rgba(255, 99, 132, 0.2)',
//                         'rgba(75, 192, 192, 0.2)'
//                     ],
//                     borderColor: [
//                         'rgba(255, 206, 86, 1)',
//                         'rgba(255, 99, 132, 1)',
//                         'rgba(54, 162, 235, 1)'
//                     ],
//                     borderWidth: 1
//                 }]
//             },
//             options: {
//                 scales: {
//                     y: {
//                         beginAtZero: true
//                     }
//                 }
//             }
//         });
//     }
//     xhr.send();
// }


//Typing Effect
document.addEventListener('DOMContentLoaded', function(event) {
    // array with texts to type in typewriter
    var dataText = ["Let us fight together with this pandemic!", "Maintain Social Distancing!", "Wear Mask!", "Use Senitizer Properly!", "Stay Safe Stay Healthy!"];

    // type one text in the typwriter
    // keeps calling itself until the text is finished
    function typeWriter(text, i, fnCallback) {
        // check if text isn't finished yet
        if (i < (text.length)) {
            // add next character to h1
            document.querySelector(".typewriter-text").innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';

            // wait for a while and call this function again for next character
            setTimeout(function() {
                typeWriter(text, i + 1, fnCallback)
            }, 100);
        }
        // text finished, call callback if there is a callback function
        else if (typeof fnCallback == 'function') {
            // call callback after timeout
            setTimeout(fnCallback, 700);
        }
    }
    // start a typewriter animation for a text in the dataText array
    function StartTextAnimation(i) {
        if (typeof dataText[i] == 'undefined') {
            setTimeout(function() {
                StartTextAnimation(0);
            }, 1000);
        }
        // check if dataText[i] exists
        if (i < dataText[i].length) {
            // text exists! start typewriter animation
            typeWriter(dataText[i], 0, function() {
                // after callback (and whole text has been animated), start next text
                StartTextAnimation(i + 1);
            });
        }
    }
    // start the text animation
    StartTextAnimation(0);
});

let hemberger = document.querySelector('.hamberger');
let closeBtn = document.querySelector('#close-btn');
let movNav = document.querySelector('.mob-nav');
let responsive = document.getElementById('responsive');
let preventImage = document.getElementById('preventImage');
hemberger.addEventListener('click',(e)=>{
    movNav.classList.add('open');
    responsive.style.display = "none";
    preventImage.style.display = "none";
})

closeBtn.addEventListener('click', ()=>{
    movNav.classList.remove('open');
    responsive.style.display = "block";
    preventImage.style.display = "block";
})

let btn = document.getElementById('btn');
btn.addEventListener('click', Search);
updateIndiaCard();
StateWiseDetail();
fillTable();