// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.



$(function () {

  var hourCal = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  var saveBtnEl = $(".fa-save");
  
  // listener for click events on the save button

  saveBtnEl.on("click", function (event) {
    var btnClicked = $(event.target);

    let scheduleHour = btnClicked.parent().parent().attr("id");
    let scheduleInfo = btnClicked.parent().parent().children().eq(1).val();

    // console.log(scheduleHour + ' ' + scheduleInfo)

    localStorage.setItem(scheduleHour, JSON.stringify(scheduleInfo));
  });

  //
  // apply the past, present, or future class to each time
  // block by comparing the id to the current hour

  hourCal.forEach(function (item) {
    let currentHour = dayjs().hour();
    if (item === currentHour) {
      $(`#hour-${item}`).attr("class", "row time-block present");
    } else if (item > currentHour) {
      $(`#hour-${item}`).attr("class", "row time-block future");
    } else {
      $(`#hour-${item}`).attr("class", "row time-block past");
    }
  });

  // Get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements.

  hourCal.forEach(function (item) {
    let hourSaved = $(`#hour-${item}`);
    let hourLogged = JSON.parse(localStorage.getItem(`hour-${item}`));

    if (!hourLogged) {
      hourSaved.children().eq(1).val("");
    } else {
      hourSaved.children().eq(1).val(`${hourLogged}`);
    }
  });

  // Display the current date in the header of the page.
  $("#currentDay").text(dayjs().format("dddd, MMMM D"));
});
