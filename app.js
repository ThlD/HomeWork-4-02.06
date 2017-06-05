function asyncMapP(arr, fun) {
  return Promise.all(arr.map((val, i, arr) => fun(val, i, arr)));
}

function asyncMapC(arr, fun) {
  let promise = Promise.resolve();
  let newArr = [];
  arr.forEach((val, i, arr) => {
    promise = promise
      .then(() => fun(val, i, arr))
      .then(result => newArr.push(result));
  })
  return promise.then(() => newArr)
}

let arr = [1, 2, 3, 7, 'Vasya', 66, 454, 2];

let promiseFunc1 = (val, i, arr) => {
  return new Promise(resolve => {
    setTimeout(() => {
      // console.log(arr);
      val += 2 * i;
      resolve(val);
    }, 1000);
  });
};

let promiseFunc2 = (val, i, arr) => {
  return new Promise(resolve => {
    setTimeout(() => {
      val += 3 * i;
      resolve(val);
    }, 500);
  });
};

asyncMapP(arr, promiseFunc1)
  .then(result => console.log(result)); //параллельное выполнение, time = 1000ms

asyncMapC(arr, promiseFunc2)
  .then(result => console.log(result)); //последовательное выполнение, time = arr.length * 500ms
