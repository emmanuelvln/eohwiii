        plusLink = "https://cdn-icons-png.flaticon.com/512/1828/1828819.png";
        checkLink = "https://cdn-icons-png.flaticon.com/512/1828/1828643.png";
        vocab = null;
        selected = [];

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min);
        }

        $(document).ready(function(){
			appendContent();

            if (!navigator.userAgent.match(/Android/i) && !navigator.userAgent.match(/iPhone/i)) {
               document.getElementById("app").style.width = "500px";
            }
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
                            $('#list-container').append("<div class='list-item' onclick='addItem(" + i + ")'><div id='list-icon'><img src='list-icon.png' height='44px'></div><div><p id='item-name'>" + vocab[i].name + "</p><p id='item-counter'>" + vocab[i].content.length + " items</p></div><div class='checker'><img id='status-image" + i + "' class='list-status' src='check-icon.png'></div>");
                        else
                            $('#list-container').append("<div class='list-item' onclick='addItem(" + i + ")'><div id='list-icon'><img src='list-icon.png' height='44px'></div><div><p id='item-name'>" + vocab[i].name + "</p><p id='item-counter'>" + vocab[i].content.length + " items</p></div><div class='checker'><img id='status-image" + i + "' class='list-status' src=''></div>");
            }
            document.getElementById('list-count').innerHTML = "<img src='list-icon-gray.png'><p>studying " + selected.length + " lists</p>";
        }

        function addItem(n) {
            if (selected.includes(n)) {
                index = selected.indexOf(n);
                selected.splice(index, 1);
                document.getElementById("status-image" + n).src = "";
            }
            else {
                selected.push(n);
                document.getElementById("status-image" + n).src = "check-icon.png";
            }
            document.getElementById('list-count').innerHTML = "<img src='list-icon-gray.png'><p>studying " + selected.length + " lists</p>";
        }

        function start() {
            if (selected.length == 0)
                        return;
            localStorage.setItem('selectedLists', JSON.stringify(selected));
			location.href = 'study.html';
        }

