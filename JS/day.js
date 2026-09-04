if (!isAuthenticated()) {

    window.location.href =
        "memories.html";

}


const params =
    new URLSearchParams(
        window.location.search
    );


const id =
    Number(params.get("id"));


const memory =
    memories.find(
        item => item.id === id
    );


const container =
    document.getElementById(
        "day-container"
    );


/* =========================
   إنشاء أسماء الصور تلقائيًا
========================= */

function generateImages(memory) {

    const images = [];


    for (
        let i = memory.startImage;
        i <= memory.endImage;
        i++
    ) {

        let fileName;


        if (i < 10) {

            fileName =
                `0${i}.${memory.extension}`;

        } else {

            fileName =
                `${i}.${memory.extension}`;

        }


        const path =
            `images/${memory.folder}/${fileName}`;


        images.push(
            encodeURI(path)
        );

    }


    return images;

}


/* =========================
   عرض الخروجة
========================= */

if (!memory) {

    container.innerHTML = `

        <div class="memory-card">

            <h1>
                الخروجة مش موجودة 😢
            </h1>

            <p>
                ممكن يكون الرابط غير صحيح.
            </p>

        </div>

    `;

} else {


    const images =
        generateImages(memory);


    container.innerHTML = `

        <h1>
            ${memory.title}
        </h1>


        <div class="date">
            ${memory.date}
        </div>


        <div class="memory-comment">
            ${memory.commentBefore}
        </div>


        <div class="gallery">

            ${images.map(image => `

                <img
                    src="${image}"
                    alt="صورة من الذكريات"
                    onclick="openImage('${image}')"
                >

            `).join("")}

        </div>


        <div class="memory-comment">
            ${memory.commentAfter}
        </div>

    `;

}


/* =========================
   فتح الصورة
========================= */

function openImage(image) {

    window.open(
        image,
        "_blank"
    );

}