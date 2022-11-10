const currentDayEl = $('#currentDay');
const containerEl = $('.container-lg');
// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

const hours = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];

const militaryHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
//Update the var to the main container
// timeRow.text('4PM');
// hourRow.append(timeRow);
// hourRow.append(descRow);
// hourRow.append(saveBtn);

const now = dayjs();
let scheduledItems = {};

currentDayEl.text(now.format('dddd, MMMM DD'));

//Monday, December 13th
const hourNow = now.format('H');

//func that creates new el / conatiner
function createHourElement() {
  for (let i = 0; i < hours.length; i++) {
    //VAR to create new el
    const hourRow = $('<div>');
    const timeRow = $('<div>');
    const descRow = $('<textarea>');
    const saveBtn = $('<button>');

    hourRow.addClass('row time-block');
    hourRow.attr('id', hours[i]);
    timeRow.addClass('col-2 col-md-1 hour text-center py-3 ');
    descRow.addClass('col-8 col-md-10 description');
    descRow.attr('row', '3');
    saveBtn.addClass('btn saveBtn col-2 col-md-1');
    saveBtn.attr('aria-lable', 'save');
    saveBtn.html(' <i class="fas fa-save" aria-hidden="true"></i>');

    timeRow.text(hours[i]);

    // const hourNum = Number.parseFloat(hours[i]);

    if (hourNow == militaryHours[i]) {
      hourRow.addClass('present');
    } else if (hourNow < militaryHours[i]) {
      hourRow.addClass('future');
    } else if (hourNow > militaryHours[i]) {
      hourRow.addClass('past');
    }

    hourRow.append(timeRow);
    hourRow.append(descRow);
    hourRow.append(saveBtn);

    //append main div to the container
    containerEl.append(hourRow);
  }
}

createHourElement();

function loadScheduledData() {
  scheduledItems = JSON.parse(localStorage.getItem('scheduledItems')) || {};

  // console.log(scheduledItems);

  $.each(scheduledItems, function (time, text) {
    // console.log(time, text);

    const hourBlock = $('.time-block')
      .find('.hour')
      .filter(function () {
        return $(this).text() === time;
      });

    const textBlock = hourBlock.siblings('.description').text(text);
    // console.log(textBlock);
  });
}

loadScheduledData();

$(function () {
  // TODO: Add a listener for click events on the save button. This code should

  $('.saveBtn').on('click', function () {
    const time = $(this).closest('div').find('.hour').text();

    const text = $(this).siblings('.description').val();

    //time as prop and text val
    scheduledItems[time] = text;

    localStorage.setItem('scheduledItems', JSON.stringify(scheduledItems));

    // console.log(scheduledItems);
  });

  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
