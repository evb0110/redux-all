const listeners = [];
let state = {
  counter: 3
};


subscribe(updateView);

updateView(); //c Passing initial value

// Listen to click events
document.querySelector('#inc').onclick =
  () => dispatch('INC');
document.querySelector('#dec').onclick =
  () => dispatch('DEC');

// Function to update view (this might be React or Angular in a real app)
function updateView() {
  document.querySelector('#counter').innerText = state.counter;
}

// reducer is supposed to be supplied by the user of Redux
function reducer(state, action) {
  switch (action) {
    case 'INC':
      return Object.assign({}, state, { counter: state.counter + 1 });
    case 'DEC':
      return Object.assign({}, state, { counter: state.counter - 1 });
    case 'INIT':
    default:
      return state;
  }
}

function dispatch(action) {
  const newState = reducer(state, action);

  if (newState !== state) {
    state = newState;

    listeners.forEach(listener => listener());
  }
}

function subscribe(callback) {
  listeners.push(callback);
}