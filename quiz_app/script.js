// Getting all required
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeOff = quiz_box.querySelector("header .time_text");
const timeLine = quiz_box.querySelector("header .timer_line");
const option_list = document.querySelector(".option_list");

//IF Start Quiz Button Clicked
start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); //show the info box
}

//If Exit Button Clicked
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //hide the info box
}

//If Continue Button Clicked
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //hide the info box
    quiz_box.classList.add("activeQuiz"); //Sohw the quiz
    showQuestions(0);
    getCounter(1);
    startTimer(15);
    startTimerLine(0);
}

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");

restart_quiz.onclick = () => {
    window.location.reload();
}

// If next button clicked
next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        getCounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = "none";
        timeOff.innerText = "Time Left";
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("Questions Completed");
        showResultBox();
    }
}

// Getting questions and options from array
function showQuestions(index) {
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>' + questions[index].number + "." + questions[index].question + '</span>';
    let option_tag = "<div class='option'>" + questions[index].options[0] + "<span> </span></div>" + "<div class='option'><span>" + questions[index].options[1] + "</span></div>" + "<div class='option'><span>" + questions[index].options[2] + "</span></div>" + "<div class='option'><span>" + questions[index].options[3] + "</span></div>";
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onClick", "optionSelected(this)");
    }
}

let tickIcon = "<div class='icon tick'><i class='fas fa-check'></i></div>";
let crossIcon = "<div class='icon cross'><i class='fas fa-times'></i></div>";

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAnsw = answer.textContent;
    let correctAnsw = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if (userAnsw === correctAnsw) {
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    } else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIcon);
        for (let i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correctAnsw) {
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }

    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
}

function getCounter(index) {
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuestCountTag = '<span><p>' + index + '</p> Of <p>' + questions.length + '</p>Questions </span>';
    bottom_ques_counter.innerHTML = totalQuestCountTag;
}

function showResultBox() {
    info_box.classList.remove("activeInfo"); //hide the info box
    quiz_box.classList.remove("activeQuiz"); //Show the quiz
    result_box.classList.add("activeResult"); //show the result of quiz
    const scoreText = result_box.querySelector(".score_text");
    if (userScore >= 3) {
        let scoreTag = "<span>and congratulations! You got<p>" + userScore + "</p> out of <p>" + questions.length + "</p></span>";
        scoreText.innerHTML = scoreTag;
    }
    else if (userScore > 1) {
        let scoreTag = "<span>and nice job! You got <p>" + userScore + "</p> out of <p>" + questions.length + "</p></span>";
        scoreText.innerHTML = scoreTag;
    } else {
        let scoreTag = "<span>and sorry You got <p>" + userScore + "</p> out of <p>" + questions.length + "</p></span>";
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.innerText = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.innerText;
            timeCount.innerText = "0" + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            timeCount.innerText = "00";
            timeOff.innerText = "Time Off";

            let correctAnsw = questions[que_count].answer;
            let allOptions = option_list.children.length;

            for (let i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correctAnsw) {
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
            }

            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.style.display = "block";

        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
        time += 1;
        timeLine.style.width = time + "px";
        if (time > 549) {
            clearInterval(counterLine);
        }
    }
}





