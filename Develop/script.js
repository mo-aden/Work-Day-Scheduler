const currentDayEl = $('#currentDay');
const containerEl = $('.container-lg');

//Time var for business hours 9AM - 5PM
const hours = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];
const militaryHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];

const now = dayjs();
let scheduledItems = {};

//Display time => Monday, December 13th
currentDayEl.text(now.format('dddd, MMMM DD'));

//Hours 0-24
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

//Call the func
createHourElement();

function loadScheduledData() {
  //get the data from localStorage & if its empty create new empty obj
  scheduledItems = JSON.parse(localStorage.getItem('scheduledItems')) || {};

  $.each(scheduledItems, function (time, text) {
    const hourBlock = $('.time-block')
      .find('.hour')
      .filter(function () {
        return $(this).text() === time;
      });

    const textBlock = hourBlock.siblings('.description').text(text);
    // console.log(textBlock);
  });
}

//Call the fun
loadScheduledData();

$(function () {
  // TODO: Add a listener for click events on the save button. This code should

  $('.saveBtn').on('click', function () {
    const time = $(this).closest('div').find('.hour').text();

    const text = $(this).siblings('.description').val();

    //time as prop and text val
    scheduledItems[time] = text;

    //Store the txt & time in local storage
    localStorage.setItem('scheduledItems', JSON.stringify(scheduledItems));

    // console.log(scheduledItems);
  });
});
