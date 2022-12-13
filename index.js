vocab = null;
selected = [];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

$(document).ready(function() {
    appendContent();
});

var appendContent=function(){
    fetch('https://raw.githubusercontent.com/emmanuelvln/eohwiii/main/vocablist.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            vocab = data;
            setupData();
        })
        .catch(function (err) {
            console.log('error: ' + err);
        });
};

function setupData() {
    for (i = 0; i < vocab.length; i++) {
        selected = JSON.parse(localStorage.getItem('selectedLists'));
        if (selected == null)
            selected = [];
        if (selected != [] && selected.includes(i))
            $('#list-container').append("<div class='list-item' onclick='addItem(" + i + ")'><div id='list-icon'><img src='imgs/list-icon.png' height='44px'></div><div><p id='item-name'>" + vocab[i].name + "</p><p id='item-counter'>" + vocab[i].content.length + " items</p></div><div class='checker'><img id='status-image" + i + "' class='list-status' src='imgs/check-icon.png'></div>");
        else
            $('#list-container').append("<div class='list-item' onclick='addItem(" + i + ")'><div id='list-icon'><img src='imgs/list-icon.png' height='44px'></div><div><p id='item-name'>" + vocab[i].name + "</p><p id='item-counter'>" + vocab[i].content.length + " items</p></div><div class='checker'><img id='status-image" + i + "' class='list-status' src=''></div>");
    }
    document.getElementById('list-count').innerHTML = "<img src='imgs/list-icon-gray.png'><p>studying " + selected.length + " lists</p>";
    s = 0;
    for (i = 0; i < selected.length; i++)
        s += vocab[selected[i]].content.length;
    document.getElementById('item-count').innerHTML = "<img src='imgs/item-icon.png'><p>studying " + s + " items</p>";
}

function addItem(n) {
    if (selected.includes(n)) {
        index = selected.indexOf(n);
        selected.splice(index, 1);
        document.getElementById("status-image" + n).src = "";
    }
    else {
        selected.push(n);
        document.getElementById("status-image" + n).src = "imgs/check-icon.png";
    }
    document.getElementById('list-count').innerHTML = "<img src='imgs/list-icon-gray.png'><p>studying " + selected.length + " lists</p>";
    s = 0;
    for (i = 0; i < selected.length; i++)
        s += vocab[selected[i]].content.length;
    document.getElementById('item-count').innerHTML = "<img src='imgs/item-icon.png'><p>studying " + s + " items</p>";
}

function start() {
    if (selected.length == 0)
        return;
    localStorage.setItem('selectedLists', JSON.stringify(selected));
    location.href = 'study.html';
}

