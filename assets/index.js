// Variables
var m = moment();
var startDay = moment();
var now = (m.format('LT'));
var calendarEL = $('#calendar');
var currentTimeEl = $('.current-time');

//Constantly updates clock on the page
currentTimeEl.text(moment().format('LLL'));
setInterval(updateClock,1000);

// Creates the time blocks
function createTimeBlocks() {
    for (var i = 0; i < 9; i ++) {
    //Create new row
    var newRow = $(`<div class="row"></div>`);
    //Data-time starting at 9
    newRow.attr('data-time', `${i+9}`);
    // New col with p tag to display time
    var newHour = $(`<div class="col border border-secondary mb-3">
    <div class="hour m-0 p-0">
    <p class ="m-0 pt-4 pb-4 ">${moment('09:00', 'h:mm').add(i,'hours').format('LT')}</p>
    </div></div>`);
    // New col with input and button
    var newInput = $(`<div class="col-9 mb-3 p-0">
    <input class="save ml-1 mr-1 border border-secondary" type="text" id="input${i}"></input>
    <button id="button${i}" class="largebutton border border-secondary">
    <i class="far fa-save fa-lg"></i></button></div`);
    //Appending to page
    calendarEL.append(newRow);
    newRow.append(newHour, newInput);
    //If data-time > current time, set color to green
    if ((newRow.attr('data-time')) >  moment().hour()) {
        newHour.addClass('active');
    //if data-time = current time, set color to blue
    } if ((newRow.attr('data-time')) == moment().hour()) {
        newHour.addClass('current-block');
    //if local storage has something saved for an input, set the text in the input to what is in local storage
    } if (localStorage.getItem(`input${i}`)) {
        $(`#input${i}`).val(localStorage.getItem(`input${i}`));
        $(`#button${i}`).addClass('active');
    }
    }
}
// Sets time to current time when called
function updateClock() {
    currentTimeEl.text(moment().format('LLL'));
}
//when a button is clicked
calendarEL.on('click', 'button', function(){
    //get the value of the sibling input
    var sibling = $(this).siblings('.save');
    var inputVal = sibling.val();
    //get id of sibling input
    var inputId = sibling.attr('id');
    //if inout val is not empty, and button doensnt have class of active
    if (inputVal !== '' & !$(this).hasClass('active')) {
        //set the input val with inout id to local storage, and add class active
        localStorage.setItem(inputId, inputVal);
        $(this).addClass('active');
        //if button is active remove class of active, and remove local storage item
    } else if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        sibling.val('');
        localStorage.removeItem(inputId);
    }

});

createTimeBlocks();