document.addEventListener('DOMContentLoaded', function(){
    
    const tramNumber = prompt('Номер вагона', 3037);
    const ticketAmount = prompt('Количество', 1);

    const serialNumbers = [
        '326334130',
        '59239517',
        '885511114',
        '24894122',
        '532584790',
        '291048655'
    ];

    const activeSeries = document.querySelector('.active .transport__series span');

    activeSeries.innerHTML = serialNumbers[
        Math.floor( Math.random() * serialNumbers.length )
    ];
    
    function startTimer(tramNumber, amount) {

        const timing = document.querySelector(".transport__timing");

        let currentTime = new Date();

        let date = currentTime.getDate();
            month = currentTime.getMonth() + 1;
            year = currentTime.getFullYear()
                                .toString();


        date = date.toString().length < 2 ? "0" + date : date;
        month = month.toString().length < 2 ? "0" + month : month;

        const dateHTML = document.querySelector('.active .transport__date .transport__ticket-value');
        const inactiveDateHTML = document.querySelector('.inactive .transport__date .transport__ticket-value');

        const inactiveDateObj = currentTime;
        inactiveDateObj.setDate(inactiveDateObj.getDate() - 2);

        const inactiveDate = inactiveDateObj
                                    .getDate()
                                    .toString().length < 2 
                                    ? '0' + inactiveDateObj.getDate() 
                                    : inactiveDateObj.getDate();

        dateHTML.innerHTML = date + '.' + month + '.' + year;
        inactiveDateHTML.innerHTML = inactiveDate + '.' + month + '.' + year;


        let currentTimePlusHour = new Date();
    
        currentTimePlusHour.setHours(currentTime.getHours() + 1);

        let h = currentTime.getHours(),
            m = currentTime.getMinutes();
            s = currentTime.getSeconds();

        h = h.toString().length < 2 ? "0" + h : h;
        m = m.toString().length < 2 ? "0" + m : m;
        s = s.toString().length < 2 ? "0" + s : s;

        const time = document.querySelector('.active .transport__time .transport__ticket-value');
        
        time.innerHTML = h + ":" + m + ":" + s;
    
        countDownTime = currentTimePlusHour.getTime();

        document.querySelector('.tram-number').innerHTML = tramNumber;
        document.querySelector('.active .amount').innerHTML = ticketAmount;
        document.querySelector('.active .price').innerHTML = (ticketAmount * 8).toFixed(1);
    
        // Update the count down every 1 second
        const countInterval = setInterval(function() {
    
        // Get today's date and time
            var now = new Date().getTime();
                
            // Find the distance between now and the count down date
            var distance = countDownTime - now;
                
            // Time calculations for days, hours, minutes and seconds
            let hours = Math.floor( (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) ),
                minutes = Math.floor( (distance % (1000 * 60 * 60)) / (1000 * 60) ),
                seconds = Math.floor( (distance % (1000 * 60)) / 1000 );
    
            if (seconds.toString().length < 2) {
                seconds = "0" + seconds;
            }
                
            // Output the result
            timing.innerHTML = "0" + hours + ":" + minutes + ":" + seconds;
                
            // If the count down is over 
            if ( distance < 0 ) {
                clearInterval( countInterval );
            }
    
        }, 1000);

    }

    if ( tramNumber && ticketAmount ) {
        startTimer( tramNumber, ticketAmount );
    }

  

});