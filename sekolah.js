// Ini adalah bagian awal dari kode JavaScript yang akan dijalankan ketika halaman web dimuat
// Kode ini digunakan untuk menangani interaksi pada form pendaftaran ekskul

// Variabel formEkskul menyimpan referensi ke elemen HTML dengan id 'form-ekskul'
// Ini adalah elemen form yang akan kita tangani ketika pengguna mengirim data
const formEkskul = document.getElementById('form-ekskul');

// Variabel listPeserta menyimpan referensi ke elemen HTML dengan id 'list-peserta'
// Ini adalah tempat di mana kita akan menampilkan daftar siswa yang sudah mendaftar
const listPeserta = document.getElementById('list-peserta');

// Variabel errorMsg menyimpan referensi ke elemen HTML dengan id 'error-msg'
// Ini adalah elemen paragraf yang akan menampilkan pesan error jika ada kesalahan
const errorMsg = document.getElementById('error-msg');

// Baris ini menambahkan event listener ke formEkskul
// Event listener mendengarkan event 'submit' yang terjadi ketika form dikirim
// Ketika form dikirim, fungsi anonim (function(event) { ... }) akan dijalankan
formEkskul.addEventListener('submit', function(event) {
    // Di dalam fungsi ini, kita mencegah perilaku default dari event submit
    // Perilaku default adalah mengirim data ke server dan me-reload halaman
    // Dengan preventDefault(), halaman tidak akan reload, sehingga kita bisa menangani data secara manual
    event.preventDefault(); // Mencegah reload

    // Sekarang kita mengambil nilai dari input fields
    // document.getElementById('namaSiswa') mencari elemen dengan id 'namaSiswa'
    // .value mengambil nilai yang diketik pengguna
    // .trim() menghapus spasi di awal dan akhir string
    const nama = document.getElementById('namaSiswa').value.trim();

    // Sama seperti di atas, mengambil nilai NISN dan melakukan trim
    const nisn = document.getElementById('nisn').value.trim();

    // Mengambil nilai dari dropdown select pilihan ekskul
    const ekskul = document.getElementById('pilihanEkskul').value.trim();

    // Validasi NISN: Pastikan NISN terdiri dari 10 digit angka
    if (nisn.length !== 10 || isNaN(nisn)) {
        errorMsg.textContent = 'NISN tidak valid! Harus berjumlah 10 digit angka';
        return;
    }
    // Sekarang kita reset pesan error
    // classList.replace mengganti class 'error-visible' dengan 'error-hidden'
    // Ini menyembunyikan pesan error yang mungkin sedang ditampilkan
    errorMsg.classList.replace('error-hidden', 'error-visible');

    // Kita cari elemen dengan class 'empty-list' yang menunjukkan daftar kosong
    // querySelector mencari elemen pertama yang cocok dengan selector '.empty-list'
    const emptyState = document.querySelector('.empty-list');
    
    // Jika elemen emptyState ada (tidak null), maka kita hapus elemen tersebut
    // Ini dilakukan agar pesan "Belum ada siswa yang mendaftar" hilang ketika ada siswa baru
    if (emptyState) emptyState.remove();
    
    // Sekarang kita buat elemen baru untuk kartu siswa
    // document.createElement('div') membuat elemen div baru
    const cardSiswa = document.createElement('div');

    // Kita tambahkan class 'card-siswa' ke elemen div yang baru dibuat
    // Ini untuk styling menggunakan CSS
    cardSiswa.classList.add('card-siswa');

    // Kita isi konten HTML ke dalam elemen cardSiswa menggunakan innerHTML
    // Template literal (dengan backticks) memungkinkan kita menyisipkan variabel dengan ${}
    // Konten ini akan menampilkan nama, NISN, dan ekskul siswa
    // buat setiap ekstrakurikuler yang dipilih beda warna pinggirannya

    cardSiswa.innerHTML = `
        <h4>${nama}</h4>
        <p><strong>NISN:</strong> ${nisn}</p>
        <p><strong >Ekstrakurikuler:</strong> ${ekskul}</p>
    <Kita tambahkan tombol hapus di dalam kartu siswa untuk memungkinkan pengguna membatalkan pendaftaran>
        <button class="hapus" id="hapus">Batalkan Pendaftaran</button>
    `;
    // Kita bisa menambahkan logika untuk memberikan warna pinggiran yang berbeda berdasarkan ekstrakurikuler yang dipilih
    if (ekskul === 'Pramuka') {
        cardSiswa.style.borderColor = '#8B4513'; // coklat untuk Pramuka
        cardSiswa.classList.add('borderPramuka'); // tambahkan class untuk styling border
    } else if (ekskul === 'Jurnalistik') {
        cardSiswa.style.borderColor = '#fffb01'; // kuning untuk Jurnalistik
        cardSiswa.classList.add('borderJurnalistik'); // tambahkan class untuk styling border
    } else if (ekskul === 'Palang Merah Remaja (PMR)') {
        cardSiswa.style.borderColor = '#ff1100'; // Merah untuk PMR
        cardSiswa.classList.add('borderPMR'); // tambahkan class untuk styling border
    } else if (ekskul === 'Klub Coding & Robotik') {
        cardSiswa.style.borderColor = '#2600ff'; // biru untuk coding
        cardSiswa.classList.add('borderCoding'); // tambahkan class untuk styling border
    }

    // buat konstanta deleteButton yang menyimpan referensi ke tombol hapus di dalam cardSiswa
    //buat logika bahwa jika cardsiswa di remove habis maka muncul empty state lagi

    const deleteButton = cardSiswa.querySelector('.hapus');
    deleteButton.addEventListener('click', function() {
        listPeserta.removeChild(cardSiswa);
        if (listPeserta.children.length === 0) {
            const emptyState = document.createElement('p');
            emptyState.classList.add('empty-list');
            emptyState.textContent = 'Belum ada siswa yang mendaftar';
            listPeserta.appendChild(emptyState);
        }
    });

    // Sekarang kita tambahkan kartu siswa yang baru dibuat ke dalam listPeserta
    // appendChild menambahkan elemen anak baru ke elemen induk
    listPeserta.appendChild(cardSiswa);

    // Terakhir, kita bersihkan formulir
    // formEkskul.reset() mengosongkan semua input fields di dalam form
    formEkskul.reset();
});
