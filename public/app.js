const log = console.log;

// When DOM elements are loaded then...

var allTrains = [];
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
  // Add a new document in collection "cities" with ID 'LA'

  trains.get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        // log('doc: ', doc.data());
        // console.log(doc.id, '=>', doc.data());
        allTrains.push(doc.data());
        log(`snapshot...`);

      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });


    

    log(`allTrains:: `, allTrains);

    allTrains.forEach(doc => {
      log(doc)
      log(`forEACH`);

      let { name, destination, frequency, next_arrival, minutes_away, id } = doc;

      log(`name: ${name}
          destination: ${destination}
          frequency: ${frequency}
          next arrival: ${next_arrival}
          minutes away: ${minutes_away}
          id: ${id}`);
        log(`-------------`);


      addTrain(name, destination, frequency, next_arrival, minutes_away, id);
    }); 


});

function addTrain(name, destination, frequency, next_arrival, minutes_away, id) {
  log(`name: ${name}
  destination: ${destination}
  frequency: ${frequency}
  next arrival: ${next_arrival}
  minutes away: ${minutes_away}
  id: ${id}`);
  log(`-------------`);



  let tr = $('<tr>');
  let th = $(`<th scope="row">`);
  let td = $(`<td>`);

  // add class of name to tags within the tbody for each individual train
  tr.addClass(name);
  tr.attr('id', id);
  // th.addClass(name);
  // td.addClass(name);

  $(`tbody`).append(tr);

  // find the row with the class name, then add the name as the heading
  $(`tr#${id}`).append(th.text(name));
  // $(`tr#${id}`).append($('<td>').text(destination));
  // $(`tr#${id}`).append($('<td>').text(frequency));
  // $(`tr#${id}`).append($('<td>').text(next_arrival));
  // $(`tr#${id}`).append($('<td>').text(minutes_away));








}






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


// Pre-set train data
var trains_data = [
  {
    name: 'Trenton Express',
    destination: 'Trenton',
    frequency: 25,
    next_arrival: '05:35 PM',
    minutes_away: 10
  },
  {
    name: 'Oregon Trail',
    destination: 'Salem, Oregon',
    frequency: 3600,
    next_arrival: '01:39 PM',
    minutes_away: 1154,
  },
  {
    name: 'Midnight Carriage',
    destination: 'Philadelphia',
    frequency: 15,
    next_arrival: '05:35 PM',
    minutes_away: 10
  },
  {
    name: 'Sing Sing Caravan',
    destination: 'Atlanta',
    frequency: 45,
    next_arrival: '05:53 PM',
    minutes_away: 28
  },
  {
    name: 'Boston Bus',
    destination: 'Boston',
    frequency: 65,
    next_arrival: '05:50 PM',
    minutes_away: 25
  },
  {
    name: 'California Caravan',
    destination: 'San Francisco',
    frequency: 6000,
    next_arrival: '01:25 PM',
    minutes_away: 4740
  },
  {
    name: `Analben's Train`,
    destination: 'Florida',
    frequency: 25,
    next_arrival: '05:28 PM',
    minutes_away: 3
  },
];