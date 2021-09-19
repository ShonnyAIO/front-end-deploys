
document.querySelector(".button-container").addEventListener("click", () => {
    let textElement = document.getElementById("filter-jobs").value;
    getJobs().then(jobs => {
        let filteredJobs = filterJobs(jobs, textElement);
        showJobs(filteredJobs);
    });
});

function getJobs() {
    return fetch('./data.json').then(response => response.json()).then(data => {
        return data;
    });
}

function filterJobs(jobs, searchText) {
    if (searchText) {
        let filteredItems = jobs.filter(job => {
            if (job.roleName.toLowerCase().includes(searchText) || job.type.toLowerCase().includes(searchText) || job.company.toLowerCase().includes(searchText) || job.requirements.content.toLowerCase().includes(searchText)) {
                return true;
            } else {
                return false;
            }
        });
        return filteredItems;
    } else {
        return jobs;
    }
}

function showJobs(jobs) {
    let jobsContainer = document.querySelector(".jobs-container");
    let jobsHTML = "";
    let jobsTotalContainer = document.querySelector(".total-2");
    let jobsTotal = "";
    jobsTotal += `Showing ${jobs.length} Jobs`;
    jobsTotalContainer.innerHTML = jobsTotal;
    jobs.forEach(job => {
        jobsHTML += `
        <div class="jobs-title">
            <div class="top">
                <img src="${job.logo}" />
                <span class="material-icons more_horiz">more_horiz</span>
            </div>
            <div class="rolename">
                <span> ${job.roleName} </span>
            </div>
            <div class="description">
                <span>${job.requirements.content}</span>
            </div>
            <div class="buttons">
                <div class="button apply-now">
                    <a href="${job.applicationLink}" target="_blank"> Apply Now </a>
                </div>
                <div class="button">
                <a href="${job.website}" target="_blank"> Message </a>
                </div>
            </div>
        </div>`;
    });
    jobsContainer.innerHTML = jobsHTML;
}


getJobs().then(data => {
    showJobs(data);
});
