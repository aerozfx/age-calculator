import { inputDay, textDay,  inputMonth, textMonth,  inputYear, textYear,  button, months, date} from './constants.js'

const isValidDay = (day) => {
    if (day.value > months[inputMonth.value] || day.value === ""){
        document.getElementById('day-text').classList.toggle('error-text')
        day.classList.toggle('error-input')
        return false
    }
    return true;
}

const isValidMonth = (month) => {
    if (month.value > 12 || month.value === "") {
        document.getElementById('month-text').classList.toggle('error-text')
        month.classList.toggle('error-input')
        return false
    }
    return true
}

const isValidYear = (year) => {
    if (year.value > date.getFullYear() || year.value === "") {
        document.getElementById('year-text').classList.toggle('error-text')
        year.classList.toggle('error-input')
        return false
    }
    return true
}


const setYear = () => {
    if (inputMonth.value < date.getMonth() + 1) {
        textYear.innerHTML = date.getFullYear() - inputYear.value;        
    } else {
        textYear.innerHTML = (date.getFullYear() - inputYear.value) -1 ;
    }
}

const setMonth = () => {
    const monthsLeft = (12 - inputMonth.value)
    const monthsUntilNextYear = (date.getMonth() + 1) + monthsLeft

    if (inputMonth.value > date.getMonth() + 1) { 
        console.log(monthsUntilNextYear, "Este es el resultado")
        textMonth.innerHTML = monthsUntilNextYear;
    } else if (inputMonth.value == date.getMonth() + 1) {
        console.log("holi")
        textMonth.innerHTML = 11
    } else {
        textMonth.innerHTML = (date.getMonth() + 1) - inputMonth.value;
    }
}

const setDay = () => {
    console.log(months[inputMonth.value])
    console.log(inputDay.value)
    console.log(date.getDate())
    console.log(inputMonth.value)
    const daysLeft = (months[inputMonth.value] - inputDay.value) + date.getDate();
    console.log(daysLeft)

    if (inputDay.value > date.getDate()) {
        textDay.innerHTML = +daysLeft;
    } else {
        textDay.innerHTML = date.getDate() - inputDay.value;
    }
}

const isFutureDate = () => {

    const dateToCheck = inputDay.value + "/" + inputMonth.value + "/" + inputYear.value
    const dateNow = date.toLocaleString().slice(0, date.toLocaleString().indexOf(","));
    const dateToday = dateNow.split("/");

    const dateInput = dateToCheck.split("/");
    dateInput.forEach((element, index) => {
        if (dateInput[index][0] === "0") {
            dateInput[index] = element.replace("0", "")
        }
    }) 

    if (dateInput[2] === dateToday[2] && (+dateInput[1] > +dateToday[1])) {
        return true
    } else if ((dateInput[2] === dateToday[2] && +dateInput[1] == +dateToday[1]) && +dateInput[0] > +dateToday[0]) {
        return true
    }

    return false
}

button.addEventListener('click', () => {

    if (isValidDay(inputDay) && isValidMonth(inputMonth) && isValidYear(inputYear)) {
        
        if (!isFutureDate()) {
            setMonth();
            setDay();
            setYear(); 
        } else {
            
            textDay.innerHTML = "--"
            textMonth.innerHTML = "--"
            textYear.innerHTML = "--"
        }

    }
});

