$(document).ready(function() {
    $('#searchForm').submit(function(event) {
        event.preventDefault();
        var content = $('#searchField').val();
        if (content === "") {
            alert("search field is empty")
        } else {
            searchWiki(content);
        }
    });


    $("#searchField").autocomplete({
        source: function(request, response) {
            $.ajax({
                url: "https://en.wikipedia.org/w/api.php?action=opensearch&limit=5&namespace=0&format=json&search=&callback=?",
                data: {
                    search: request.term
                },
                dataType: "jsonp",
                success: function(data) {
                    response(data[1]);
                }
            });
        }
    });
})

function searchWiki(what) {
    $.ajax({
        url: "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=" + what + "&callback=",
        type: "get",
        dataType: "jsonp",
        success: function(data) {
            result(data.query.search);
        }
    })
}

function result(data) {
    var htm = '';

    data.forEach(function(val) {
        htm += '<div id="links"> <h4> <a href="https://en.wikipedia.org/wiki/' + val.title + '" target="newwindow">' + val.title + '</a></h4>' + val.snippet + '<br><hr></div>';

    });
    $('.result').append(htm).fadeIn(1500);

}
