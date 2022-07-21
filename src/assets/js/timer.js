const body = document.body;
// buttons
let start_btn = document.getElementById('start_timer');
let stop_btn = document.getElementById('stop_timer');
let reset_btn = document.getElementById('reset_timer');
//
let timer_emoji = document.getElementById('timer_emoji');
// timer inputs
let hour = document.getElementById('hour');
let minute = document.getElementById('minute');
let second = document.getElementById('second');
// cursor element
const cursor = document.getElementById('cursor');
// tooltip initialization
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
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
document.addEventListener('mousemove', (e) => {
  cursor.style.top = `${e.pageY}px`;
  cursor.style.left = `${e.pageX}px`;
});
// 
start_btn.addEventListener('click', () => {
  body.style.overflowY = 'hidden';
  appearStopBtn();
  startTimer();
});

function startTimer() {
  const timerIntervalId = setInterval(() => {
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
      validStatus = ['info', 'success', 'error', 'warning', 'info'];
      if (!validStatus.includes(status))
        throw new Error('invalid status for fireAlert function');
      Toast.fire({
        icon: status,
        title: msg,
      });
    }
    //
    function appearStartBtn() {
      start_btn.classList.remove('animate__animated', 'animate__backOutDown');
      body.style.overflowY = 'hidden';
      start_btn.classList.add('animate__animated', 'animate__backInUp');
    }

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

    if (
      hour.value === initialValue &&
      minute.value === initialValue &&
      second.value === initialValue
    ) {
      fireAlert('timer values are empty!', 'error');
      reset();
    }
    if (minute.value > 59 || second.value > 59) {
      fireAlert(
        'The value of minutes and seconds must be between 0 and 59!',
        'error'
      );
      reset();
    }
    if (hour.value > 24) {
      fireAlert('The value of hours must be between 0 and 24', 'error');
      reset();
    }
    second.value--;
    if (second.value < 0) {
      second.value = 59;
      minute.value--;
    }
    if (second.value.length === 1) {
      second.value = `0${second.value}`;
    }
    if (minute.value < 0) {
      minute.value = 59;
      hour.value--;
    }
    if (minute.length === 1) {
      minute.value = `0${minute.value}`;
    }
    if (hour.value.length === 1) {
      hour.value = `0${hour.value}`;
    }
    if (hour.value < 0) {
      minute.value = initialValue;
      second.value = initialValue;
      hour.value = initialValue;
    }
    if (
      hour.value === initialValue &&
      minute.value === initialValue &&
      second.value === initialValue
    ) {
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
}
// animations
timer_emoji.addEventListener('click', function () {
  this.classList.add('animate__animated', 'animate__headShake');
  setTimeout(() => {
    this.classList.remove('animate__animated', 'animate__headShake');
  }, 1100);
});
//
// key interaction
document.addEventListener('keypress', (e) => {
  if (e.code === 'Enter') {
    appearStopBtn();
    startTimer();
  }
});
//
