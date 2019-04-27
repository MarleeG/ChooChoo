const log = console.log;

var allTrains = [];
$('#form_warning').hide();

// let cat = 'gg';
// let how_many = 4;

// log(parseInt(cat));
// log(parseInt(how_many));

// When DOM elements are loaded then...
document.addEventListener("DOMContentLoaded", event => {
  const app = firebase.app();
  const db = firebase.firestore();

  // Get access to posts collection - begin
  //   const mypost = db.collection('posts').doc('firstpost');

  //   mypost.get()
  //     .then(doc => {
  //       if (!doc.exists) {
  //         console.log('No such document!');
  //       } else {
  //         console.log('Document data:', doc.data());
  //       }
  //     })
  //     .catch(err => {
  //       console.log('Error getting document', err);
  //     });
  // Get access to posts collection - end



  const trains = db.collection('trains');
  trains.get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        // log('doc: ', doc.data());
        // log(doc.id)
        // console.log(doc.id, '=>', doc.data());
        allTrains.push({ data: doc.data(), auto_id: doc.id });
        // log(`snapshot...`);
      });

      if (allTrains.length !== 0) {
        allTrains.forEach(doc => {
          // log('doc::', doc);
          let { name, destination, frequency, next_arrival, minutes_away } = doc.data;
          addTrain(name, destination, frequency, next_arrival, minutes_away, doc.auto_id);

          // log(`name: ${name}
          //     destination: ${destination}
          //     frequency: ${frequency}
          //     next arrival: ${next_arrival}
          //     minutes away: ${minutes_away}
          //     id: ${doc.auto_id}`);
          //   log(`-------------`);
        });
      }
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });

});

function addTrain(name, destination, frequency, next_arrival, minutes_away, id) {
  // table row w. id attr
  let tr = $(`<tr id=${id}>`);

  // table heading
  let th = $(`<th scope="row">`);

  // table data
  let td = $(`<td>`);

  // append table row to tbody tag 
  $(`tbody`).append(tr);

  // find the specific table row and append a table heading and table data
  $(`tr#${id}`).append(th.text(name));
  $(`tr#${id}`).append($(td).text(destination));
  $(`tr#${id}`).append($('<td>').text(frequency));
  $(`tr#${id}`).append($('<td>').text(next_arrival));
  $(`tr#${id}`).append($('<td>').text(minutes_away));
}


function randomNumberGenerator(max) {
  let ran_num = Math.floor(Math.random() * max);
  return ran_num;
}

// AM PM Generator
function morningAfternoonGenerator() {
  let array_time = [0, 1];
  let ran_num = Math.floor(Math.random() * 2);
  let time_of_day = '';

  if (array_time[ran_num] === 0) {
    time_of_day = 'AM';
  } else {
    time_of_day = 'PM';
  }

  return time_of_day;
}


// add train button
$('#add_train_btn').click(event => {
  log(`add button clicked...`);

  let train_name = $('#train_name_input').val().trim();
  let destination_name = $('#destination_input').val().trim();
  let frequency_input = $('#frequency_input').val().trim();
  let hour = randomNumberGenerator(25);
  let minute = randomNumberGenerator(60);

  // if hour is less than ten add a 0 in front of it
  if (hour < 10) {
    hour = `0${hour}`;
  } ``

  // if minute is less than ten add a 0 in front of it
  if (minute < 10) {
    minute = `0${minute}`;
  }

  // Next arrival hh:mm am || pm
  let next_arrival = `${hour}:${minute} ${morningAfternoonGenerator()}`;

  // Generate a minutes away
  let minutes_away = randomNumberGenerator(7000) ? randomNumberGenerator(7000) : randomNumberGenerator(7000) + 1;


  log('f-input: ', frequency_input)

  if (train_name && destination_name && frequency_input) {
    // log('not empty. good name');
    // log(train_name);
    // log(destination_name);
    // log('next-arrival: ', next_arrival);
    // log('f-input: ', frequency_input);

    // change frequency value to number
    let frequency_to_num = parseInt(frequency_input);

    // if frequency_to_num is a number then...
    if (isNaN(frequency_to_num)) {
      log(typeof frequency_to_num);
      alert(`not a number`);

      $('#form_warning').text(`Please enter a valid number for the frequency.`);

      $('#form_warning').show();

    } else if (frequency_to_num >= 0) {
      log(typeof frequency_to_num);
      alert(`a number`);

      // Empty the input values
      $('#train_name_input').val('');
      $('#destination_input').val('');
      $('#frequency_input').val('');
    }

  } else {
    log(`try entering new values for fields..`);
  }


})

// Google Login
// function googleLogin() {
//   const provider = new firebase.auth.GoogleAuthProvider();

//   firebase.auth().signInWithPopup(provider)
//     .then(result => {
//       const user = result.user;
//       log(user);

//       $('#user').text(`Hello ${user.displayName}`);
//     })
//     .catch(log());
// }

// $('#google_login').click(() => {
//   googleLogin();
// });
// Google login