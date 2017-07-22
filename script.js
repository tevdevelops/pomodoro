$(document).ready(function() {
  //variables
  var setSession = 25;
  var setBreak = 5;
  var interval = null;
  var pause = false;

  //functions
  function stop() {
    clearInterval(interval);
    pause = false;
    interval = null;
    display_time(setSession*60);
    $('#clock-text').text("Session");
  }

  function reset() {
    clearInterval(interval);
    pause = false;
    interval = null;
    setSession = 25;
    setBreak = 5;
    document.getElementById('session-num').innerHTML = setSession;
    document.getElementById('break-num').innerHTML = setBreak;
    display_time(setSession*60);
  }

  function display_time(num) {
    function display_min(num){
      if (Math.floor(num/60) === 0) {
        return "00";
      } else if (Math.floor(num/60 < 10)) {
        return "0" + Math.floor(num/60);
      } else {
        return Math.floor(num/60);
      }
    }
    function display_sec(num) {
      if (num % 60 === 0) {
        return "00";
      } else if (num % 60 < 10) {
        return "0" + num % 60;
      } else {
        return num % 60;
      }
    }
    $('#test-clock').text(display_min(num) + ":" + display_sec(num));
  }

  function count_down(time) {
    time_sec = time * 60;
    display_time(time_sec);
    interval = setInterval(function(){
      time_sec -= 1;
      display_time(time_sec);
      if (time_sec === 0) {
        clearInterval(interval);
        interval = null;
        if ($('#clock-text').text() === 'Session') {
          $('#clock-text').text('Break');
          display_time(setBreak*60);
          count_down(setBreak);
        } else {
          $('#clock-text').text('Session');
          display_time(setSession*60);
          count_down(setSession);
        }
      }
    }, 1000);
  }

  //events
  $('#session-down').click(function () {
    if (interval === null) {
      if (setSession > 1) {
        pause = false;
        setSession -= 1;
        document.getElementById('session-num').innerHTML = setSession;
        display_time(setSession*60);
      }
    }

  });
  $('#session-up').click(function () {
    if (interval === null) {
      if (setSession < 99) {
        pause = false;
        setSession += 1;
        document.getElementById('session-num').innerHTML = setSession;
        display_time(setSession*60);
      }
    }
  });
  $('#break-down').click(function () {
    if (interval === null) {
      if (setBreak > 1) {
        pause = false;
        setBreak -= 1;
        document.getElementById('break-num').innerHTML = setBreak;
      }
    }
  });
  $('#break-up').click(function () {
    if (interval === null) {
      if (setBreak < 99) {
        pause = false;
        setBreak += 1;
        document.getElementById('break-num').innerHTML = setBreak;
      }
    }
  });
  $('.fa-refresh').click(reset);

  $('.fa-play').click(function(){
    if (pause === true && interval === null) {
      count_down(temp);
      pause = false;
    }
    else if (interval === null) {
      count_down(setSession);
      pause = false;
    }
  });
  $('.fa-stop').click(stop);
  $('.fa-pause').click(function() {
    clearInterval(interval);
    interval = null;
    pause = true;
    temp = time_sec / 60
    console.log(temp);
  });



});
