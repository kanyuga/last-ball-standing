
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function Game(gamearea, rows, cols) {
    this.currentSpot = null;
    this.gameArea = $(gamearea);
    this.itemClass = "item";
    this.selectedClass = "selected";
    this.filledClass = "filled";
    this.rows = rows;
    this.cols = cols;
    
    this.init = function() {
        var self = this;
        self.currentSpot = null;
        self.gameArea.html("");
        for (i = 1; i <= self.rows; i++) {
            for (j = 1; j <= self.cols; j++) {
                self.gameArea.append("<div class='" + self.itemClass + " " + self.filledClass + "' data-row=" + i + " data-col=" + j + "></div>");
            }
            self.gameArea.append("<br/>");
        }
        self.getSpot(getRandomInt(1, rows + 1), getRandomInt(1, cols + 1)).removeClass(self.filledClass);
        $("." + self.itemClass, self.gameArea).on("click", function() {
            if ($(this).hasClass(self.filledClass)) {
                if (!self.currentSpot) {
                    self.currentSpot = $(this).addClass(self.selectedClass);
                } else {
                    self.currentSpot.removeClass(self.selectedClass);
                    self.currentSpot = null;
                }
            } else {
                if (self.currentSpot) {
                    //console.log("here");
                    var rowDiff = Math.abs($(this).data("row") - self.currentSpot.data("row")),
                        colDiff = Math.abs($(this).data("col") - self.currentSpot.data("col"));
                    if ((colDiff === 0 || colDiff === 2) && (rowDiff === 0 || rowDiff === 2) && (colDiff === 2 || rowDiff === 2)) {
                        var over = self.getSpot(($(this).data("row") + self.currentSpot.data("row")) / 2, 
                                                ($(this).data("col") + self.currentSpot.data("col")) / 2);
                        if (over.hasClass(self.filledClass)) {
                            over.removeClass(self.filledClass);
                            self.currentSpot.removeClass(self.selectedClass + " " + self.filledClass);
                            self.currentSpot = null;
                            $(this).addClass(self.filledClass);
                            if ($("." + self.itemClass + "." + self.filledClass, self.gameArea).length === 1) {
                                alert("You win!!");
                            }
                        }
                    }
                }
            }
        });
    };
    
    this.getSpot = function(row, col) {
        return $("." + this.itemClass + "[data-row=" + row + "][data-col=" + col + "]", this.gameArea);
    };
    
    this.reset = function(rows, cols) {
        console.log(this.rows, this.cols);
        this.rows = rows;
        this.cols = cols;
        console.log(this.rows, this.cols);
        this.init();
    };
}


$(function() {
    game = new Game("#game-area", 4, 4);
    game.init();
    $('#reset-form').on("submit", function(event) {
        game.reset(parseInt($("#rows").val()), parseInt($("#cols").val()));
        event.preventDefault();
    });
});
