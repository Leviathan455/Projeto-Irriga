async function loadIrrigations() {
    const userId = localStorage.getItem("userId"); // ID do usuário logado

    const irrigations = await request(`/irrigations?userId=${userId}`); // filtra pelo usuário

    const list = document.getElementById("irrigationList");
    list.innerHTML = "";

    irrigations.forEach(i => {
        const li = document.createElement("li");
        li.innerText = `Pivot: ${i.pivotId} | Amount: ${i.applicationAmount}`;

        const btn = document.createElement("button");
        btn.innerText = "Delete";
        btn.onclick = () => deleteIrrigation(i.id);

        li.appendChild(btn);
        list.appendChild(li);
    });
}

async function createIrrigation() {
    const pivotId = document.getElementById("pivotId").value;
    const applicationAmount = document.getElementById("applicationAmount").value;
    const irrigationDate = document.getElementById("irrigationDate").value;
    const userId = localStorage.getItem("userId"); // adiciona o usuário no body

    await request("/irrigations", "POST", {
        pivotId,
        applicationAmount,
        irrigationDate,
        userId
    });

    loadIrrigations();
}

async function deleteIrrigation(id) {
    await request(`/irrigations/${id}`, "DELETE");
    loadIrrigations();
}