'use strict';
import Swal from 'sweetalert2';
import party from "party-js";


const $ = document;
const body = $.body,
  header = $.getElementById('main_heading');
// buttons
let start_btn = $.getElementById('start_timer'),
  stop_btn = $.getElementById('stop_timer'),
  reset_btn = $.getElementById('reset_timer');
//
let timer_emoji = $.getElementById('timer_emoji');
// timer inputs
let hour = $.getElementById('hour'),
  minute = $.getElementById('minute'),
  second = $.getElementById('second');
// cursor element
const cursor = $.getElementById('cursor');
// timer audio
const timerAudio = $.getElementById('timer_audio');
// tooltip initialization
const tooltipTriggerList = $.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);
//
const initialValue = '00';

function appearStopBtn() {
  stop_btn.classList.remove('animate__animated', 'animate__fadeOut');
  stop_btn.style.visibility = 'visible';
  start_btn.classList.add('animate__animated', 'animate__backOutDown');
}
// custom cursor
$.addEventListener('mousemove', (event) => {
  cursor.style.top = `${event.pageY}px`;
  cursor.style.left = `${event.pageX}px`;
});
//
start_btn.addEventListener('click', () => {
  body.style.overflowY = 'hidden';
  appearStopBtn();
  startTimer();
});
function startTimer() {
  function reset() {
    minute.value = initialValue;
    second.value = initialValue;
    hour.value = initialValue;
    stopTimer();
    stop_btn.style.visibility = 'hidden';
    appearStartBtn();
    body.style.overflowY = 'auto';
  }
  function stopTimer() {
    clearInterval(timerIntervalId);
  }
  function appearStartBtn() {
    start_btn.classList.remove('animate__animated', 'animate__backOutDown');
    body.style.overflowY = 'hidden';
    start_btn.classList.add('animate__animated', 'animate__backInUp');
  }
  // toast initialization
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  //
  // show alert msg
  function fireAlert(msg, status) {
    let validStatus = ['info', 'success', 'error', 'warning', 'info'];
    if (!validStatus.includes(status))
      throw new Error('invalid status for fireAlert function');
    Toast.fire({
      icon: status,
      title: msg,
    });
  }
  //
  const timerIntervalId = setInterval(() => {
    body.style.overflowY = 'hidden';
    second.value--;
    if (second.value < 0) {
      second.value = 59;
      minute.value--;
    }
    second.value = second.value.padStart(2, '0');
    if (minute.value < 0) {
      minute.value = 59;
      hour.value--;
    }
    minute.value = minute.value.padStart(2, '0');
    hour.value = hour.value.padStart(2, '0');

    if (hour.value < 0) {
      minute.value = initialValue;
      second.value = initialValue;
      hour.value = initialValue;
    }
    if (
      second.value >= 0 &&
      second.value < 4 &&
      minute.value === initialValue &&
      hour.value === initialValue
    ) {
      second.style.color = '#bd1033';
      timerAudio.play();
    }
    if (
      hour.value === initialValue &&
      minute.value === initialValue &&
      second.value === initialValue
    ) {
      fireAlert('time is up 🎉😁', 'success');
      party.confetti(header);
      second.style.color = '#f5f5f5';
      reset();
    }
    stop_btn.addEventListener('click', () => {
      stopTimer();
      setTimeout(() => {
        stop_btn.classList.add('animate__animated', 'animate__fadeOut');
        stop_btn.style.visibility = 'hidden';
      }, 100);
      appearStartBtn();
    });
    reset_btn.addEventListener('click', () => {
      reset();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key == 'Escape') {
        reset();
      }
    });
  }, 1000);
  if (
    hour.value === initialValue &&
    minute.value === initialValue &&
    second.value === initialValue
  ) {
    fireAlert('timer values are empty! 🤔', 'error');
    reset();
  }
  if (minute.value > 59 || second.value > 59) {
    reset();
    fireAlert(
      'The value of minutes and seconds must be between 0 and 59!',
      'error'
    );
  }
  if (hour.value > 24) {
    fireAlert('The value of hours must be between 0 and 24', 'error');
    reset();
  }
}
//timer emoji animations
timer_emoji.addEventListener('click', function () {
  this.classList.add('animate__animated', 'animate__headShake');
  setTimeout(() => {
    this.classList.remove('animate__animated', 'animate__headShake');
  }, 1100);
});
//
//enter key interaction
$.addEventListener('keypress', (event) => {
  if (event.code === 'Enter') {
    appearStopBtn();
    startTimer();
  }
});
//
