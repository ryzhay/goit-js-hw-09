import Notiflix from 'notiflix';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise ((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3;
  setTimeout(() => {
  if (shouldResolve) {
    resolve({ position, delay });
  } else {
    reject({ position, delay });
  }
}, delay);
});
}

form.addEventListener('submit', onSubmit);

function onSubmit (event) {
event.preventDefault();

const delay = Number(event.target.elements.delay.value);
const step = Number(event.target.elements.step.value);
const amount = Number(event.target.elements.amount.value);
let position = 0;

for (let i = 1; i <= amount; i += 1) {
position = i;

createPromise(position, delay)
  .then(({ position, delay }) => {
    Notiflix.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  delay += step;
}
};

