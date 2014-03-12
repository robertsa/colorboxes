// Add a delegated mouseenter event handler to the box container for all
// boxes that changes the background color of the selected box.
function addHoverEffect() {
  $("#boxContainer").on("mouseenter", ".boxColumn .box", function() {
    $(this).css("background-color", genRandomColor());
  });
}

// Append to the box container a new box column of 5 boxes.
function addBoxes() {
  var $boxColumn = $("<div class='boxColumn'></div>");
  var $rbb = $("#removeBoxesButton");
  for (var i = 0; i < 5; i++) {
    $boxColumn.append("<div class='box'></div>");
  }
  $("#boxContainer").append($boxColumn);
  if ( $rbb.attr("disabled") === "disabled" ) {
    $rbb.attr("disabled", false);
  }
}

// Remove the last box column.
function removeBoxes() {
  if ( $(".boxColumn").length > 1 ) {
    $(".boxColumn:last").remove();
    if ( $(".boxColumn").length === 1 ) {
      $("#removeBoxesButton").attr("disabled", true);
    }
  }
}

// Add an initial set of 5 box columns.
function addInitialBoxes() {
  for (var i = 0; i < 5; i++) {
    addBoxes();
  }
}

// Generate a random hex color code.
function genRandomColor() {
  var alpha = ["a", "b", "c", "d", "e", "f"];
  var color = "";
  while (color.length < 6) {
    if (Math.floor(Math.random() * 2)) {
      color += Math.floor(Math.random() * 10);
    } else {
      color += alpha[Math.floor(Math.random() * 6)];
    }
  }
  $("#lastColor span:last").text("#" + color);
  return "#" + color;
}

// Repeatedly change the background color of all boxes.
function enableCrazyColorMode() {
  var intervalID = setInterval(function() {
    $(".box").each(function() {
      $(this).css("background-color", genRandomColor());
    });
  }, 150);
  $("#boxContainer").data("intervalID", intervalID);
  $("#enableCCMButton").attr("disabled", true);
  $("#disableCCMButton").attr("disabled", false);
}

function disableCrazyColorMode() {
  clearInterval($("#boxContainer").data("intervalID"));
  $("#enableCCMButton").attr("disabled", false);
  $("#disableCCMButton").attr("disabled", true);
}

addHoverEffect();
addInitialBoxes();

$("#addBoxesButton").on("click", function() { addBoxes(); });
$("#removeBoxesButton").on("click", function() { removeBoxes(); });
$("#enableCCMButton").on("click", function() { enableCrazyColorMode(); });
$("#disableCCMButton").on("click", function() { disableCrazyColorMode(); });