const listeners = [];
let state = {
  counter: -11
};

const ACTIONS = {
  INIT: 'INIT',
  INC: 'INC',
  DEC: 'DEC',
}

subscribe(updateView);

updateView(); //c Passing initial value

// Listen to click events
document.querySelector('#inc').onclick =
  () => dispatch(ACTIONS.INC);
document.querySelector('#dec').onclick =
  () => dispatch(ACTIONS.DEC);

// Function to update view (this might be React or Angular in a real app)
function updateView() {
  document.querySelector('#counter').innerText = state.counter;
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


// reducer is supposed to be supplied by the user of Redux
//c REDUCER PROVIDES THE NEW STATE
//c DEPENDING ON THE CURRENT STATE AND
//c THE TAKEN ACTION
function reducer(state, action) {
  switch (action) {
    case ACTIONS.INC:
      return {
        ...state, 
        counter: state.counter + 1 
      };
    case ACTIONS.DEC:
      return {
        ...state, 
        counter: state.counter - 1 
      };
    case ACTIONS.INIT:
    default:
      return state;
  }
}
