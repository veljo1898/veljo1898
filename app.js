/* ==========================================
   PERSONAL HUB V5 FINAL
   APP.JS
   PART 1
========================================== */

"use strict";

/* ===============================
   LOCAL STORAGE KEYS
=============================== */

const STORAGE = {
    theme: "ph_theme",
    tasks: "ph_tasks",
    notes: "ph_notes",
    expenses: "ph_expenses",
    goals: "ph_goals",
    learning: "ph_learning",
    jobs: "ph_jobs",
    water: "ph_water",
    waterGoal: "ph_water_goal"
};

/* ===============================
   STATE
=============================== */

let tasks = JSON.parse(localStorage.getItem(STORAGE.tasks)) || [];
let expenses = JSON.parse(localStorage.getItem(STORAGE.expenses)) || [];
let goals = JSON.parse(localStorage.getItem(STORAGE.goals)) || [];
let learning = JSON.parse(localStorage.getItem(STORAGE.learning)) || [];
let jobs = JSON.parse(localStorage.getItem(STORAGE.jobs)) || [];

let water =
    Number(localStorage.getItem(STORAGE.water)) || 0;

let waterGoal =
    Number(localStorage.getItem(STORAGE.waterGoal)) || 8;

/* ===============================
   HELPERS
=============================== */

const $ = id => document.getElementById(id);

function save(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}

/* ===============================
   CLOCK
=============================== */

function updateClock(){

    const now = new Date();

    $("clock").textContent =
        now.toLocaleTimeString();

    $("date").textContent =
        now.toLocaleDateString(
            "en-US",
            {
                weekday:"long",
                month:"long",
                day:"numeric",
                year:"numeric"
            }
        );

}

setInterval(updateClock,1000);
updateClock();

/* ===============================
   GREETING
=============================== */

function updateGreeting(){

    const hour = new Date().getHours();

    let greet="Good Evening";

    if(hour<12)
        greet="Good Morning";

    else if(hour<18)
        greet="Good Afternoon";

    $("greeting").textContent =
        greet + " 👋";

}

updateGreeting();

/* ===============================
   PAGE NAVIGATION
=============================== */

const pages =
    document.querySelectorAll(".page");

const navButtons =
    document.querySelectorAll(".nav-btn");

function showPage(pageId){

    pages.forEach(page=>{

        page.classList.remove("active");

    });

    navButtons.forEach(btn=>{

        btn.classList.remove("active");

    });

    $(pageId).classList.add("active");

    document
        .querySelector(
            `.nav-btn[data-page="${pageId}"]`
        )
        ?.classList.add("active");

}

navButtons.forEach(btn=>{

    btn.addEventListener("click",()=>{

        showPage(btn.dataset.page);

    });

});

/* ===============================
   DARK MODE
=============================== */

const theme =
    localStorage.getItem(STORAGE.theme);

if(theme==="dark"){

    document.body.classList.add("dark");

}

$("themeBtn").onclick = toggleTheme;
$("toggleThemeBtn").onclick = toggleTheme;

function toggleTheme(){

    document.body.classList.toggle("dark");

    localStorage.setItem(
        STORAGE.theme,
        document.body.classList.contains("dark")
            ? "dark"
            : "light"
    );

}
/* ==========================================
   PERSONAL HUB V5 FINAL
   APP.JS
   PART 2
========================================== */

/* ===============================
   TASKS
=============================== */

function renderTasks(){

    const list = $("taskList");

    list.innerHTML = "";

    tasks.forEach((task,index)=>{

        const li = document.createElement("li");

        li.innerHTML = `
            <div>
                <strong>${task.title}</strong><br>
                <small>${task.priority} • ${task.date||"No Date"}</small>
            </div>

            <button onclick="deleteTask(${index})">
                ❌
            </button>
        `;

        list.appendChild(li);

    });

    save(STORAGE.tasks,tasks);

    $("taskCount").textContent = tasks.length;

}

$("addTaskBtn").addEventListener("click",()=>{

    const title = $("taskInput").value.trim();

    if(title==="") return;

    tasks.push({

        title:title,

        priority:$("taskPriority").value,

        date:$("taskDate").value

    });

    $("taskInput").value="";
    $("taskDate").value="";

    renderTasks();

});

function deleteTask(index){

    tasks.splice(index,1);

    renderTasks();

}

/* ===============================
   NOTES
=============================== */

$("notesArea").value =
    localStorage.getItem(STORAGE.notes) || "";

$("saveNotesBtn").addEventListener("click",()=>{

    localStorage.setItem(

        STORAGE.notes,

        $("notesArea").value

    );

    alert("Notes saved!");

});

/* ===============================
   GOALS
=============================== */

function renderGoals(){

    const list = $("goalList");

    list.innerHTML="";

    goals.forEach((goal,index)=>{

        const li=document.createElement("li");

        li.innerHTML=`
            ${goal}

            <button onclick="deleteGoal(${index})">

            ❌

            </button>
        `;

        list.appendChild(li);

    });

    save(STORAGE.goals,goals);

    $("goalCount").textContent=goals.length;

    $("goalCountPage").textContent=goals.length;

}

$("addGoalBtn").addEventListener("click",()=>{

    const goal=$("goalInput").value.trim();

    if(goal==="") return;

    goals.push(goal);

    $("goalInput").value="";

    renderGoals();

});

function deleteGoal(index){

    goals.splice(index,1);

    renderGoals();

}

/* ===============================
   DASHBOARD
=============================== */

function updateDashboard(){

    $("taskCount").textContent = tasks.length;

    $("goalCount").textContent = goals.length;

}

renderTasks();

renderGoals();

updateDashboard();
/* ==========================================
   PERSONAL HUB V5 FINAL
   APP.JS
   PART 3
========================================== */

/* ===============================
   EXPENSE TRACKER
=============================== */

function renderExpenses(){

    const list = $("expenseList");

    list.innerHTML = "";

    let total = 0;

    expenses.forEach((expense,index)=>{

        total += Number(expense.amount);

        const li = document.createElement("li");

        li.innerHTML = `
            <div>
                <strong>${expense.name}</strong><br>
                ₱${Number(expense.amount).toFixed(2)}
            </div>

            <button onclick="deleteExpense(${index})">
                ❌
            </button>
        `;

        list.appendChild(li);

    });

    save(STORAGE.expenses, expenses);

    $("expenseTotalPage").textContent = "₱" + total.toFixed(2);

    if($("expenseTotal")){
        $("expenseTotal").textContent = "₱" + total.toFixed(2);
    }

}

$("addExpenseBtn").addEventListener("click",()=>{

    const name = $("expenseName").value.trim();

    const amount = Number($("expenseAmount").value);

    if(name === "" || amount <= 0) return;

    expenses.push({
        name,
        amount
    });

    $("expenseName").value="";
    $("expenseAmount").value="";

    renderExpenses();

});

function deleteExpense(index){

    expenses.splice(index,1);

    renderExpenses();

}

/* ===============================
   WATER TRACKER
=============================== */

function updateWater(){

    $("waterGoal").value = waterGoal;

    $("waterTracker").textContent =
        `${water} / ${waterGoal} Glasses`;

    $("waterProgress").max = waterGoal;
    $("waterProgress").value = water;

    if($("waterCount")){
        $("waterCount").textContent =
            `${water}/${waterGoal}`;
    }

    localStorage.setItem(STORAGE.water, water);
    localStorage.setItem(STORAGE.waterGoal, waterGoal);

}

$("waterGoal").addEventListener("change",()=>{

    waterGoal = Number($("waterGoal").value);

    if(waterGoal < 1){
        waterGoal = 1;
    }

    updateWater();

});

$("drinkWaterBtn").addEventListener("click",()=>{

    if(water < waterGoal){

        water++;

        updateWater();

    }

});

$("removeWaterBtn").addEventListener("click",()=>{

    if(water > 0){

        water--;

        updateWater();

    }

});

$("resetWaterBtn").addEventListener("click",()=>{

    water = 0;

    updateWater();

});

/* ===============================
   LEARNING TRACKER
=============================== */

function renderLearning(){

    const list = $("learningList");

    list.innerHTML = "";

    learning.forEach((item,index)=>{

        const li = document.createElement("li");

        li.innerHTML = `
            ${item}
            <button onclick="deleteLearning(${index})">
                ❌
            </button>
        `;

        list.appendChild(li);

    });

    save(STORAGE.learning, learning);

}

$("addLearningBtn").addEventListener("click",()=>{

    const text = $("learningInput").value.trim();

    if(text === "") return;

    learning.push(text);

    $("learningInput").value="";

    renderLearning();

});

function deleteLearning(index){

    learning.splice(index,1);

    renderLearning();

}

/* ===============================
   JOB TRACKER
=============================== */

function renderJobs(){

    const list = $("jobList");

    list.innerHTML="";

    jobs.forEach((job,index)=>{

        const li=document.createElement("li");

        li.innerHTML=`
            <div>

                <strong>${job.company}</strong><br>

                ${job.position}<br>

                ${job.status}<br>

                <small>${job.date}</small>

            </div>

            <button onclick="deleteJob(${index})">

                ❌

            </button>
        `;

        list.appendChild(li);

    });

    save(STORAGE.jobs, jobs);

}

$("addJobBtn").addEventListener("click",()=>{

    const company = $("companyInput").value.trim();
    const position = $("positionInput").value.trim();

    if(company==="" || position==="") return;

    jobs.push({

        company,
        position,
        status:$("statusInput").value,
        date:$("applyDate").value

    });

    $("companyInput").value="";
    $("positionInput").value="";
    $("applyDate").value="";

    renderJobs();

});

function deleteJob(index){

    jobs.splice(index,1);

    renderJobs();

}

/* ===============================
   BACKUP
=============================== */

$("backupBtn").addEventListener("click",()=>{

    const data = {

        tasks,
        goals,
        expenses,
        learning,
        jobs,
        notes:$("notesArea").value,
        water,
        waterGoal

    };

    const blob = new Blob(
        [JSON.stringify(data,null,2)],
        {type:"application/json"}
    );

    const a = document.createElement("a");

    a.href = URL.createObjectURL(blob);

    a.download = "PersonalHubBackup.json";

    a.click();

});

/* ===============================
   RESTORE
=============================== */

$("restoreBtn").addEventListener("click",()=>{

    alert("Restore feature will be added in the next update.");

});

/* ===============================
   CAREER BUTTONS
=============================== */

$("portfolioBtn").addEventListener("click",()=>{

    window.open(
        "https://jovelmadiarepique.github.io/",
        "_blank"
    );

});

$("resumeBtn").addEventListener("click",()=>{

    alert("Place your resume PDF inside your project and connect this button.");

});

/* ===============================
   INITIALIZE
=============================== */

renderTasks();
renderGoals();
renderExpenses();
renderLearning();
renderJobs();
updateWater();
updateDashboard();

console.log("✅ Personal Hub V5 Final Loaded");
