document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;

    // --- LÓGICA DE TRANSIÇÃO DE PÁGINA ---
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const destinationUrl = this.href;
            if (destinationUrl === window.location.href) {
                event.preventDefault();
                return;
            }
            event.preventDefault();
            body.classList.add('is-leaving');
            setTimeout(() => {
                window.location.href = destinationUrl;
            }, 400); // Deve corresponder à duração da animação
        });
    });

    // --- LÓGICA DO POP-UP DE CONTATO ---
    const contactBtn = document.getElementById('contact-btn');
    const contactPopup = document.getElementById('contact-popup');
    if (contactBtn && contactPopup) {
        contactBtn.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            contactPopup.classList.toggle('open');
        });
    }
    function closeContactPopup() {
        if (contactPopup && contactPopup.classList.contains('open')) {
            contactPopup.classList.remove('open');
        }
    }

    // --- LÓGICA DO MODAL DA GALERIA ---
    const photoModal = document.getElementById("myModal");
    const galleryItems = document.querySelectorAll(".gallery-item");
    if (photoModal && galleryItems.length > 0) {
        const modalImg = document.getElementById("img01");
        const photoModalCloseBtn = photoModal.querySelector(".close-button");

        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                photoModal.style.display = "flex";
                modalImg.src = item.querySelector('img').src;
                body.classList.add('modal-open');
            });
        });
        function closePhotoModal() {
            if (photoModal.style.display !== "none") {
                photoModal.style.display = "none";
                body.classList.remove('modal-open');
            }
        }
        if (photoModalCloseBtn) { photoModalCloseBtn.addEventListener('click', closePhotoModal); }
        photoModal.addEventListener('click', (event) => { if (event.target === photoModal) { closePhotoModal(); } });
        document.addEventListener('keydown', (event) => { if (event.key === "Escape") { closePhotoModal(); } });
    }

    // --- EVENTOS GLOBAIS ---
    window.addEventListener('click', (event) => {
        if (contactPopup && contactBtn && !contactPopup.contains(event.target) && !contactBtn.contains(event.target)) {
            closeContactPopup();
        }
    });
    document.addEventListener('keydown', (event) => { if (event.key === "Escape") { closeContactPopup(); } });
});