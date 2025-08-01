// Attach clicks to desktop icons
document.querySelectorAll(".icon").forEach(icon => {
    icon.addEventListener("click", () => {
        const folder = icon.dataset.folder;
        const win = document.getElementById(`window-${folder}`);
        if (win) {
            win.classList.remove("hidden");
        }
    });
});

// Attach clicks to close buttons
document.querySelectorAll(".close-window").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.closest(".window").classList.add("hidden");
    });
});
