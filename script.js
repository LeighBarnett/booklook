var fetchTitle = function(title) {
    $.ajax({
        method: "GET",
        url: 'https://www.googleapis.com/books/v1/volumes?q=intitle:' + title,
        success: function(data) {
            for (var i = 0; i < 9 && i < data.items.length; i++) {
                
                var title = data.items[i].volumeInfo.title;
                var author = data.items[i].volumeInfo.authors;
                var image = data.items[i].volumeInfo.imageLinks ? data.items[i].volumeInfo.imageLinks.smallThumbnail : "https://themoderntranscendentalist.files.wordpress.com/2013/02/no_books.jpg"
                var description = data.items[i].volumeInfo.description;
                addBook(title, author, image, description);
            };
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
};



var fetchISBN = function(isbn) {
    $.ajax({
        method: "GET",
        url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn,
        success: function(data) {
            for (var i = 0; i < 9 && i < data.items.length; i++) {
                var title = data.items[i].volumeInfo.title;
                var author = data.items[i].volumeInfo.authors;
                var image = data.items[i].volumeInfo.imageLinks.smallThumbnail;
                var description = data.items[i].volumeInfo.description;

                addBook(title, author, image, description);
            };
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
};





var fetchAuthors = function(author) {
    $.ajax({
        method: "GET",
        url: 'https://www.googleapis.com/books/v1/volumes?q=inauthor:' + author,
        success: function(data) {
            for (var i = 0; i < 9 && i < data.items.length; i++) {
                var title = data.items[i].volumeInfo.title;
                var author = data.items[i].volumeInfo.authors;
                var image = data.items[i].volumeInfo.imageLinks.smallThumbnail;
                var description = data.items[i].volumeInfo.description;
                addBook(title, author, image, description);
            };
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
};

var addBook = function(title, author, image, description) {

    var newBook = {
        title: title,
        author: author,
        image: image,
        description: description
    }
    var source = $('#book-template').html();
    var template = Handlebars.compile(source);
    var newHTML = template(newBook);
    $('.book-list').append(newHTML);

}


$('#btn-title').on("click", function() {

    var title = $("#title-input").val();
    fetchTitle(title);
})


$('#btn-author').on("click", function() {

    var author = $("#author-input").val();
    fetchAuthors(author);
})


$('#btn-isbn').on("click", function() {
    var isbn = $("#isbn-input").val();
    fetchISBN(isbn);
})

$('.book-list').on("click", ".bookdiv", function() {
    $('.bookdiv').not(this).hide();
    $(this).show();
})
