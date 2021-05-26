document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
    // get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
    
    if(!validateForm(siteName, siteUrl)){
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }
    
    // test
    

    if(localStorage.getItem('bookmarks') === null){
        var bookmarks = [];
        bookmarks.push(bookmark);
        // set to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else{
        // get bookmarks from localstorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        // reset back to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    }
    // clear form\
    document.getElementById('myForm').reset();
    // re=fetch bookmarks
    fetchBookmarks();

    // prevent form from submitting
    e.preventDefault();
}

// delete bookmark
function deleteBookmark(url){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    for (var i=0; i< bookmarks.length; i++){
        if(bookmarks[i].url == url){
            bookmarks.splice(i, 1);
        } 
    }
    // reset back to localstorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // re-fetch bookmarks
    fetchBookmarks();  
    
}

// fetch bookmarks
function fetchBookmarks(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    var bookmarksResults = document.getElementById('bookmarksResults');

    bookmarksResults.innerHTML = '';
    for(var i =0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += 
        '<div class="well">'+
        '<h3>'+name +   ' <a class ="btn btn-default" target="_blank" href="'+addhttp(url)+'">Visit</a> ' +
                        ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>' +
        '</h3>'
        '<div>';
    }

}

function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert('Please enter information in the form!!!');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression); 

    if(!siteUrl.match(regex)){
        alert('Please use a valid URL');
        return false;
    }

    return true;
}

function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
  }