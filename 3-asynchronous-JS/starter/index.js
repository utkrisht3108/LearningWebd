const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');
const superagent = require('superagent');

//we want is basically a read file function that returns a promise
//and it only recieves a file name! no callback
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('No file found');
      resolve(data);
    });
  });
};
// this promise constructor takes a executor function which will get called when promise is created

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('No file write');
      resolve('success');
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([res1pro, res2pro, res3pro]);
    const img = all.map((el) => el.body.message);
    console.log(img);
    // console.log(res.body.message);
    await writeFilePro('dog-img.txt', img.join('\n'));
    console.log('dog aagaya');
  } catch (err) {
    console.log(err.message);
    throw err;
  }
  return 'doggie';
};

(async () => {
  try {
    console.log('1');
    const x = await getDogPic();
    console.log(x);
    console.log('3');
  } catch (err) {
    console.log('ERROR');
  }
})();

// console.log('1');
// getDogPic()
//   .then((x) => {
//     console.log(x);
//     console.log('3');
//   })
//   .catch((err) => {
//     console.log('ERROR');
//   });
// console.log('2');

// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFilePro('dog-img.txt', res.body.message);
//   })
//   .then(() => {
//     console.log('dog aagaya');
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
