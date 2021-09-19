
document.querySelector(".button-container").addEventListener("click", () => {
    let textElement = document.getElementById("filter-jobs").value;
});

function getJobs(){
    fetch('./data.json').then(response => response.json()).then(data => {
        console.log(data);
    });
}


getJobs();
