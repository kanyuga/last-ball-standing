currentSpot = false;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getSpot(row, col) {
    console.log(row, col);
    return $("#game-area .item[data-row=" + row + "][data-col=" + col + "]");
}

function init(rows, cols) {
    currentSpot = null;
    var $gamearea = $('#game-area');
    $gamearea.html("");
    for (i = 1; i <= rows; i++) {
        for (j = 1; j <= cols; j++) {
            $gamearea.append("<div class='item filled' data-row=" + i + " data-col=" + j + "></div>");
        }
        $gamearea.append("<br/>");
    }
    getSpot(getRandomInt(1, rows + 1), getRandomInt(1, cols + 1)).removeClass("filled");
    
    $(".item").on("click", function() {
        if ($(this).hasClass("filled")) {
            if (!currentSpot) {
                currentSpot = $(this);
                $(this).addClass("selected");      
            } else {
                currentSpot.removeClass("selected");
                currentSpot = null;
            }
        } else {
            if (currentSpot) {
                var rowdiff = $(this).data("row") - currentSpot.data("row");
                var coldiff = $(this).data("col") - currentSpot.data("col");
                //console.log(rowdiff, coldiff);
                if ((Math.abs(coldiff) == 0 || Math.abs(coldiff) == 2) && (Math.abs(rowdiff) == 0 || Math.abs(rowdiff) == 2) && (Math.abs(coldiff) == 2 || Math.abs(rowdiff) == 2)) {
                    var col = ($(this).data("col") + currentSpot.data("col")) / 2;
                    var row = ($(this).data("row") + currentSpot.data("row")) / 2;
                    var $over = getSpot(row, col);
                    if ($over.hasClass("filled")) {
                        $over.removeClass("filled");
                        currentSpot.removeClass("selected filled");
                        currentSpot = null;
                        $(this).addClass("filled");
                        if ($("#game-area .item.filled").length == 1) {
                            alert("You win!!");
                        }
                    }
                }
            }           
        }
    });
}

$(function(){
    init(4, 4);
    $('#reset-form').on("submit", function(event) {
        init(parseInt($("#rows").val()), parseInt($("#cols").val()));
        event.preventDefault();
    });
});
