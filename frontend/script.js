const API_URL = "http://localhost:8080/api/tasks";

let allTasks = [];
let currentEditId = null;


function formatAMPM(date) {
    const d = new Date(date);
    let hrs = d.getHours();
    let mins = d.getMinutes();
    const ampm = hrs >= 12 ? 'PM' : 'AM';
    hrs = hrs % 12 || 12;
    mins = mins < 10 ? "0" + mins : mins;
    return `${hrs}:${mins} ${ampm}`;
}

function formatDate(d) {
    return new Date(d).toLocaleDateString("en-US", {
        month: "short", day: "2-digit", year: "numeric"
    });
}

async function fetchTasks() {
    const res = await fetch(API_URL);
    allTasks = await res.json();
    renderTasks();
}

function renderTasks() {
    const upcoming = document.getElementById("upcomingList");
    const completed = document.getElementById("completedList");

    upcoming.innerHTML = "";
    completed.innerHTML = "";

    if (allTasks.filter(t => !t.completed).length === 0) {
        upcoming.innerHTML = `<p class="empty-msg">No upcoming tasks 🎉</p>`;
    }

    if (allTasks.filter(t => t.completed).length === 0) {
        completed.innerHTML = `<p class="empty-msg">No completed tasks yet 😄</p>`;
    }

    allTasks.forEach(t => {
        const li = document.createElement("li");
        li.className = "task-item";

        const scheduled = t.scheduledDateTime ?
        `${formatDate(t.scheduledDateTime)} • ${formatAMPM(t.scheduledDateTime)}`: "---";

        li.innerHTML = `
            <div class="task-left">
                <div class="task-title">${t.title}</div>

                <div class="desc-box">
                    ${t.description || "No description added"}
                </div>

                <div class="time-box">
                    <span><b>Created:</b> ${t.createdDate || "---"}</span><br>
                    <span><b>Scheduled:</b> ${scheduled}</span>
                </div>
            </div>

            <div class="action-buttons">
                ${!t.completed ? `
                    <button class="btn-green" onclick="toggleTask(${t.id})">✔</button>
                ` : ""}

                <button class="btn-edit" onclick="openEditModal(${t.id}, \`${t.description || ""}\`)">✎</button>
                <button class="btn-red" onclick="deleteTask(${t.id})">✖</button>
            </div>
        `;

        if (t.completed) completed.appendChild(li);
        else upcoming.appendChild(li);
    });
}


async function addTask() {
    const title = document.getElementById("taskInput").value;
    const desc = document.getElementById("descInput").value;
    const date = document.getElementById("dateInput").value;
    const time = document.getElementById("timeInput").value;

    if (!title) return;

    let scheduled = null;
    if (date && time) scheduled = `${date}T${time}:00`;

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title,
            description: desc,
            scheduledDateTime: scheduled
        })
    });

    document.getElementById("taskInput").value = "";
    document.getElementById("descInput").value = "";
    document.getElementById("dateInput").value = "";
    document.getElementById("timeInput").value = "";

    fetchTasks();
}


async function toggleTask(id) {
    await fetch(`${API_URL}/${id}`, { method: "PUT" });
    fetchTasks();
}

async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTasks();
}


function openEditModal(id, oldDesc) {
    currentEditId = id;
    document.getElementById("editDescInput").value = oldDesc;
    document.getElementById("editModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("editModal").style.display = "none";
}

async function saveDescription() {
    const newDesc = document.getElementById("editDescInput").value;

    await fetch(`${API_URL}/updateDescription/${currentEditId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            description: newDesc
        })
    });

    closeModal();
    fetchTasks();
}

fetchTasks();
