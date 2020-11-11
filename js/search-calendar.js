const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

calendarInit();

function calendarInit()
{
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  
  fillMonthsAndDays(year,month);
}

function fillMonthsAndDays(year,month)
{
  let nextMonthYear = year;
  let nextMonth = month + 1;
  if ( nextMonth == 12 )
  {
    nextMonth = 0;
  }

  let leftMonthList = document.getElementById("calendar-month-list-left");
  let rightMonthList = document.getElementById("calendar-month-list-right");
  fillMonth(leftMonthList,year,month);
  fillMonth(rightMonthList,nextMonthYear,nextMonth);
 
  let leftMonthDaysParent = document.getElementById("calendar-month-days-left");
  let leftMonthBeginDate = new Date(year, month, 1);
  let rightMonthDaysParent = document.getElementById("calendar-month-days-right");
  let rightMonthBeginDate = new Date(leftMonthBeginDate);
  rightMonthBeginDate = addMonths(rightMonthBeginDate, 1);
  fillDays(leftMonthDaysParent,leftMonthBeginDate);
  fillDays(rightMonthDaysParent,rightMonthBeginDate);
}

function fillMonth(monthListElement,year,month)
{
  while (monthListElement.firstChild) {
    monthListElement.removeChild(monthListElement.lastChild);
  }
  
  var optionFirst = document.createElement('option');
  optionFirst.value = month;
  optionFirst.text = months[month] + ' ' + year;
  optionFirst.setAttribute('selected',null);
  optionFirst.setAttribute('disabled',null);
  optionFirst.setAttribute('hidden',null);
  monthListElement.appendChild(optionFirst);
  
  var optgroup = document.createElement('optgroup');
  optgroup.label = year;
  monthListElement.appendChild(optgroup);
  
  for ( i = month; i <= 11; ++i)
  {
    var option = document.createElement('option');
    option.value = i;
    option.text = months[i];
    optgroup.appendChild(option);
  }

  let nextYear = year + 1;

  var optgroup = document.createElement('optgroup');
  optgroup.label = nextYear;
  monthListElement.appendChild(optgroup);

  for ( i = 0; i <= month; ++i)
  {
    var option = document.createElement('option');
    option.value = i;
    option.text = months[i];
    optgroup.appendChild(option);
  }
}

function fillDays(monthDaysParentElement,monthBeginDate)
{
  let skipLeftDays = monthBeginDate.getDay() - 1;
  if ( skipLeftDays == -1 )
  {
    skipLeftDays = 6;
  }
  let inMonth = daysInMonth(monthBeginDate);
  
  let days = monthDaysParentElement.querySelectorAll(".calendar-day");

  for ( i = 0; i < days.length; ++i)
  {
    if ( i < skipLeftDays)
    {
      days[i].firstChild.innerHTML = "";
    }
    else if ( i < skipLeftDays + inMonth)
    {
      days[i].firstChild.innerHTML = i - skipLeftDays + 1;
    }
    else
    {
      days[i].firstChild.innerHTML = "";
    }
  }
}

 function daysInMonth (date) {
  var d = new Date(date.getFullYear(), date.getMonth()+1, 0);
  return d.getDate();
}

function addMonths(date, months) {
  var currentMonth = date.getMonth() + date.getFullYear() * 12;
  date.setMonth(date.getMonth() + months);
  var diff = date.getMonth() + date.getFullYear() * 12 - currentMonth;

  if (diff != months) {
      date.setDate(0);
  } 
  return date;
}