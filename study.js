vocab = null;
answer = "";
isKorean = false;
hangeul = "";
translation = "";
studiedList = 0;
selected = [];
isMobile = true;

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min);
        }

        $(document).ready(function(){
            selected = JSON.parse(localStorage.getItem('selectedLists'));
            if (selected == null || selected == [])
			    location.href = 'index.html';
            if (!navigator.userAgent.match(/Android/i) && !navigator.userAgent.match(/iPhone/i)) {
                document.getElementById("app").style.width = "500px";
                document.getElementById("back-button").style.left = "calc(100vw / 2 - 250px + 47px)";
                isMobile = false;
            }
			appendContent();

            input = document.querySelector("#input-field");
            input.addEventListener('keyup', (event) => {
                if (event.key == 'Enter' && document.querySelector("#input-field").value != '')
                   openPopUp(false);
                else
                    getInput();
            });
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
            studiedList = selected[getRandomInt(0,selected.length)];
            console.log(studiedList);
            i = getRandomInt(0, vocab[studiedList].content.length);
            translation = vocab[studiedList].content[i].translation
                        .split(';')[0].replace(/\(([^)]+)\)/, '');
            hangeul = vocab[studiedList].content[i].hangeul;

            document.getElementById("list-prompt-text").innerHTML = vocab[studiedList].name;

            if (!isMobile || getRandomInt(0, 2) == 0) {
                element = hangeul;
                answer = translation;
                goal = "meaning";
                isKorean = true;
            }
            else {
                element = translation;
                answer = hangeul;
                goal = "translation";
            }
            console.log(answer);
            simpleStrings = answer.replace(';', '').replace(/\(([^)]+)\)/, '').split(',');
            for (j = 0; j < simpleStrings.length; j++)
                console.log(simpleStrings[j]);
            document.getElementById("indicator")
                        .innerHTML = "Find the " + goal;
            document.getElementById("show-container").innerHTML = "<p>" + element + "</p>";

            document.querySelector("#input-field").value = "";
        }

        function getInput() {
            resp = document.querySelector("#input-field").value;
            if (resp != "" && resp != " " && isCorrectWord(resp)) {
                openPopUp(true);
            }
        }
        function isCorrectWord(word) {
            simpleStrings = answer.replace(';', '').replace(/\(([^)]+)\)/, '').split(',');
            for (i = 0; i < simpleStrings.length; i++)
                if (simpleStrings[i].toLowerCase().replaceAll(' ', '') == word.toLowerCase().replaceAll(' ', ''))
                    return true;
            return false;
        }

        function openPopUp(correct) {
            if (!correct) {
                document.getElementById("popup-button")
                            .style.background
                            = "linear-gradient(to right, #510a32ff, #ee4540ff)";
                document.getElementById("popup-wave")
                            .style.backgroundImage = "url('./imgs/wave-red.svg')";
                document.getElementById("wave-state").innerHTML = "Incorrect";
            }
            else {
                document.getElementById("popup-button")
                            .style.background
                            = "linear-gradient(to right, #049b5bff, #32fca7ff)";
                document.getElementById("popup-wave")
                            .style.backgroundImage = "url('./imgs/wave-green.svg')";
                document.getElementById("wave-state").innerHTML = "Correct";
            }
            document.getElementById("popup-container").style.display = "block";
            document.getElementById("filter").style.display = "block";
            document.getElementById("popup-word-sub").innerHTML = hangeul;
            document.getElementById("popup-mean-sub").innerHTML = translation;
        }

        function clearPopUp() {
            document.getElementById("popup-container").style.display = "none";
            document.getElementById("filter").style.display = "none";
            setupData();
        }

        function goHome() {
			location.href = 'index.html';
        }

function playSound() {
    if (!isKorean) {
        lang = 'en-UK';
        word = translation;
    }
    else {
        lang = 'ko';
        word = hangeul;
    }
    const url= `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${word}`;
    audio = new Audio(url);
    audio.play();
}
