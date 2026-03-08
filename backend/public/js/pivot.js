async function loadPivots() {
    const userId = localStorage.getItem("userId"); // ID do usuário logado

    const pivots = await request(`/pivots?userId=${userId}`); // filtra pelo usuário

    const list = document.getElementById("pivotList");
    list.innerHTML = "";

    pivots.forEach(p => {
        const li = document.createElement("li");
        li.innerText = `${p.description} - (id: ${p.uuid})`;
        list.appendChild(li);
    });
}

async function createPivot() {
    const description = document.getElementById("description").value;
    const flowRate = document.getElementById("flowRate").value;
    const minApplicationDepth = document.getElementById("minApplicationDepth").value;
    const userId = localStorage.getItem("userId"); // adiciona o usuário no body

    await request("/pivots", "POST", {
        description,
        flowRate,
        minApplicationDepth,
        userId
    });

    loadPivots();
}