if (!isAuthenticated()) {

    window.location.href =
        "memories.html";

}


const container =
    document.getElementById(
        "memories-container"
    );


memories.forEach(memory => {

    const card =
        document.createElement("div");


    card.className =
        "memory-card";


    card.innerHTML = `

        <div class="memory-date">
            ${memory.date}
        </div>

        <h2>
            ${memory.title}
        </h2>

        <button
            class="main-button"
            onclick="openMemory(${memory.id})"
        >
            مشاهدة اليوم ❤️
        </button>

    `;


    container.appendChild(card);

});


function openMemory(id) {

    window.location.href =
        `day.html?id=${id}`;

}