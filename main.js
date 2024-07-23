let butSave = document.getElementById('bookSubmit');
let rakBukuincomplete = document.getElementById('incompleteBookshelfList');
let rakBukucomplete = document.getElementById('completeBookshelfList');

if (localStorage.getItem('book') == null){
  localStorage.setItem('book', JSON.stringify([]));
}

butSave.addEventListener('click', function(event){
    event.preventDefault();

    let isComplete = document.getElementById('inputBookIsComplete').checked;
    let title = document.getElementById('inputBookTitle').value;
    let author = document.getElementById('inputBookAuthor').value;
    let year = parseInt(document.getElementById("inputBookYear").value);

    if (title === '' || author === '' || isNaN(year)) {
      alert("Judul, penulis, atau tahun buku tidak boleh kosong");
      return;
    }

    let book = {
      id: new Date().getTime(),
      title,
      author,
      year,
      isComplete
      
    };

    let booklist = JSON.parse(localStorage.getItem('book'));
    booklist.unshift(book); // Menambahkan buku baru di awal daftar
    localStorage.setItem('book', JSON.stringify(booklist));

    document.getElementById('inputBookIsComplete').checked = false;
    document.getElementById('inputBookTitle').value = '';
    document.getElementById('inputBookAuthor').value = '';
    document.getElementById('inputBookYear').value = '';
    
    tampilkanBuku();
});

function tampilkanBuku(){
  rakBukuincomplete.innerHTML = '';
  rakBukucomplete.innerHTML = '';
  let booklist = JSON.parse(localStorage.getItem('book'));

  booklist.forEach (function(book, index){
    let bukubaru = 
    `<article class="book_item">
        <h3>${book.title}</h3>
        <p>author: ${book.author}</p>
        <p>year: ${book.year}</p>
          
        <div class="action">
            <button class="green" data-index="${index}">${book.isComplete ? 'Belum selesai di Baca' : 'Selesai dibaca'}</button>
            <button class="red" data-index="${index}">Hapus buku</button>
        </div>
    </article>`;

    if (book.isComplete) {
      rakBukucomplete.innerHTML += bukubaru;
    } else {
      rakBukuincomplete.innerHTML += bukubaru;
    }
  });
  
  hapusBuku();
  pindahBuku();
}

function pindahBuku(){
  let buttonPindah = document.querySelectorAll('.green');

  buttonPindah.forEach(function(button) {
    button.onclick = function() {
      let booklist = JSON.parse(localStorage.getItem('book'));
      let index = button.getAttribute('data-index');
      index = parseInt(index);  // Mengubah string menjadi integer
      
      // Menghapus buku dari daftar
      let [book] = booklist.splice(index, 1);

      // Mengubah status buku
      book.isComplete = !book.isComplete;
      
      // Menambahkan buku ke awal daftar sesuai status barunya
      booklist.unshift(book);
      
      // Memperbarui localStorage
      localStorage.setItem('book', JSON.stringify(booklist));
      
      // Memperbarui tampilan daftar buku
      tampilkanBuku();
    };
  });
}

function hapusBuku(){
  let buttonHapus = document.querySelectorAll('.red');

  buttonHapus.forEach(function(button) {
    button.onclick = function() {
      let booklist = JSON.parse(localStorage.getItem('book'));
      let index = button.getAttribute('data-index');
      index = parseInt(index);
      // Menghapus buku dari daftar
      booklist.splice(index, 1);

      // Memperbarui localStorage
      localStorage.setItem('book', JSON.stringify(booklist));

      // Memperbarui tampilan daftar buku
      tampilkanBuku();
    };
  });
}

window.onload = tampilkanBuku;