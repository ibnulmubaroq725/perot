// Ambil semua produk dan modal
const productCards = document.querySelectorAll(".product-card");
const modals = document.querySelectorAll(".modal");
const closeBtns = document.querySelectorAll(".close-btn");

// Event: buka modal
productCards.forEach(card => {
  card.addEventListener("click", () => {
    const modalId = card.getAttribute("data-modal");
    document.getElementById(modalId).style.display = "flex";
  });
});

// Event: tutup modal
closeBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.parentElement.parentElement.style.display = "none";
    // reset preview tiap tutup modal
    const preview = btn.parentElement.querySelector(".varian-preview");
    if (preview) preview.remove();
  });
});

// Tutup modal saat klik di luar konten
window.addEventListener("click", (e) => {
  modals.forEach(modal => {
    if (e.target === modal) {
      modal.style.display = "none";
      const preview = modal.querySelector(".varian-preview");
      if (preview) preview.remove();
    }
  });
});

// ========================
// Event klik varian di modal1 untuk buka 3D view
// ========================
const varianImages = document.querySelectorAll("#modal1 .varian-container img");

varianImages.forEach(img => {
  img.addEventListener("click", () => {
    const modal3d = document.getElementById("modal3d");
    const previewImg = modal3d.querySelector(".varian-3d-preview");
    previewImg.src = img.src;  // Set gambar yang diklik ke preview 3D
    modal3d.style.display = "flex";  // Buka modal 3D
  });
});

// ========================
// Spesifikasi tiap produk (untuk modal1 jika diperlukan nanti)
// ========================
const spesifikasi = {
  modal1: { // Produk 1
    "LF Dead Race": {
      kecepatan: "80 km/h",
      daya: "250W",
      berat: "1.2 kg",
      fitur: "Robot balap cepat dengan sensor presisi."
    },
    "THE BATTLE SUMO ROBOT": {
      kecepatan: "60 km/h",
      daya: "300W",
      berat: "1.5 kg",
      fitur: "Robot sumo dengan tenaga dorong kuat."
    }
    // FIRE FIGHTER ANALOG dan VOLTRA WATCH dihapus
  },
  modal2: { // Produk 2
    "LF Dead Race": {
      kecepatan: "90 km/h",
      daya: "280W",
      berat: "1.1 kg",
      fitur: "Versi custom untuk kecepatan tinggi."
    },
    "THE BATTLE SUMO ROBOT": {
      kecepatan: "65 km/h",
      daya: "350W",
      berat: "1.6 kg",
      fitur: "Versi custom untuk turnamen sumo robot."
    }
  }
};

// ========================
// Tombol kontak (modal3)
// ========================
document.getElementById("whatsapp-btn").addEventListener("click", function() {
  window.open("https://wa.me/6281234567890?text=Halo%20saya%20ingin%20bertanya", "_blank");
});
document.getElementById("instagram-btn").addEventListener("click", function() {
  window.open("https://instagram.com/usernameAnda", "_blank");
});
document.getElementById("email-btn").addEventListener("click", function() {
  window.location.href = "mailto:emailanda@example.com?subject=Konsultasi%20Produk&body=Halo,%20saya%20ingin%20mengetahui%20lebih%20lanjut%20tentang%20produk%20Anda.";
});


// ========================
// FITUR TAMBAHAN: 3D VIEWER BERBASIS DRAG GAMBAR (VERSI FIX TANPA PUTAR OTOMATIS)
// ========================
const images3D = document.querySelectorAll("#modal1 .varian-container img");

images3D.forEach(img => {
  let isDragging = false;
  let startX = 0;
  let frame = 0;

  // Daftar gambar 3D (simulasi rotasi)
  const views = {
    "LF DEAD RACE.jpg": [
      "lf1.jpg", "lf2.jpg", "lf3.jpg", "lf4.jpg",
      "lf5.jpg", "lf6.jpg", "lf7.jpg", "lf8.jpg"
    ],
    "THE BATTLE SUMO ROBOT.jpg": [
      "sumo1.jpg", "sumo2.jpg", "sumo3.jpg", "sumo4.jpg",
      "sumo5.jpg", "sumo6.jpg", "sumo7.jpg", "sumo8.jpg"
    ]
  };

  const file = img.getAttribute("src").split("/").pop();
  const viewList = views[file] || [file];

  img.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    img.style.cursor = "grabbing";

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  });

  function onMouseMove(e) {
    if (!isDragging) return;
    const diff = e.clientX - startX;

    // ubah gambar hanya jika drag cukup jauh (>=30px)
    if (Math.abs(diff) > 30) {
      startX = e.clientX;
      frame = (frame + (diff > 0 ? 1 : -1) + viewList.length) % viewList.length;
      img.src = viewList[frame];
    }
  }

  function onMouseUp() {
    isDragging = false;
    img.style.cursor = "grab";
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  }

  img.style.cursor = "grab";
});
