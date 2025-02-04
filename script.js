document.getElementById('upload-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const semester = document.getElementById('semester').value;
    const file = document.getElementById('file').files[0];

    if (!file) {
        alert("Pilih file terlebih dahulu.");
        return;
    }

    const formData = new FormData();
    formData.append('semester', semester);
    formData.append('file', file);

    // Mengirim data ke server atau API
    fetch('/api/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert("File berhasil diunggah!");
        loadFiles(); // Memuat ulang daftar file
    })
    .catch(error => {
        alert("Terjadi kesalahan: " + error);
    });
});

function loadFiles() {
    fetch('/files')
    .then(response => response.json())
    .then(data => {
        const fileList = document.getElementById('file-list');
        fileList.innerHTML = ''; // Kosongkan dulu
        data.files.forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.innerHTML = `<a href="/files/${file.filename}" target="_blank">${file.name}</a>`;
            fileList.appendChild(fileItem);
        });
    });
}

loadFiles(); // Memuat file saat halaman pertama kali dibuka
