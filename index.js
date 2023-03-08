vocab = null;
selected = [];
opened = null;

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
            $('#list-container').append("<div class='list-item-container'><div id='list-item" + i + "' class='list-item'><div class='chevron' onclick='openItem(" + i + ")'><img id='chevron" + i + "' class='chevron-icon' src='imgs/chevron-right.png' height='20px' weight='20xp'></div><div id='list-icon' onclick='addItem(" + i + ")'><img src='imgs/list-icon.png' height='40px'></div><div onclick='addItem(" + i + ")'><p id='item-name'>" + vocab[i].name + "</p><p id='item-counter'>" + vocab[i].content.length + " items</p></div><div class='checker' onclick='addItem(" + i + ")'><img id='status-image" + i + "' class='list-status' src='imgs/check-icon.png'></div></div><div id='hidden-list-item" + i + "' class='hidden-list-item'></div>");
        else
            $('#list-container').append("<div class='list-item-container'><div id='list_item" + i  + "' class='list-item'><div class='chevron' onclick='openItem(" + i + ")'><img id='chevron" + i + "' class='chevron-icon' src='imgs/chevron-right.png' height='20px' weight='20px'></div><div id='list-icon' onclick='addItem(" + i + ")'><img src='imgs/list-icon.png' height='40px'></div><div onclick='addItem(" + i + ")'><p id='item-name'>" + vocab[i].name + "</p><p id='item-counter'>" + vocab[i].content.length + " items</p></div><div class='checker' onclick='addItem(" + i + ")'><img id='status-image" + i + "' class='list-status' src=''></div></div><div id='hidden-list-item" + i + "' class='hidden-list-item'></div>");
        for (j = 0; j < vocab[i].content.length; j++)
        {
            document.getElementById('hidden-list-item' + i).innerHTML += "<div class='hidden-items'><div id='hidden-bubble-left' class='hidden-bubbles'>" + vocab[i].content[j].hangeul + "</div><div id='hidden-bubble-right' class='hidden-bubbles'>" + vocab[i].content[j].translation.replace(/\(([^)]+)\)/, '') + "</div></div>";
        }
    }
    document.getElementById('list-count').innerHTML = "<img src='imgs/list-icon-gray.png'><p>studying " + selected.length + " lists</p>";
    s = 0;
    for (i = 0; i < selected.length; i++)
        s += vocab[selected[i]].content.length;
    document.getElementById('item-count').innerHTML = "<img src='imgs/item-icon.png'><p>studying " + s + " items</p>";
}

function openItem(n) {
    if (n == opened)
    {
        document.getElementById("hidden-list-item" + n).style.display = "none";
        document.getElementById("chevron" + n).src = "imgs/chevron-right.png";
        opened = null;
    }
    else if (opened != null)
    {
        document.getElementById("hidden-list-item" + opened).style.display = "none";
        document.getElementById("hidden-list-item" + n).style.display = "flex";
        document.getElementById("chevron" + n).src = "imgs/chevron-down.png";
        opened = n;
    }
    else
    {
        document.getElementById("hidden-list-item" + n).style.display = "flex";
        document.getElementById("chevron" + n).src = "imgs/chevron-down.png";
        opened = n;
    }
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

