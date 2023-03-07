const form = document.querySelector('.form');
const submitBtn = document.querySelector('button');





function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  for(let i = 0; form[2].value; i += 1){
    const promise = new Promise((resolve, reject) => {
      if (shouldResolve) {
        resolve()
      } else {
        reject()
      }
    });
  }
  
}
