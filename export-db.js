const firestoreService = require('firestore-export-import');
const serviceAccount = require('./pasta-framework-firebase-adminsdk-08747-960355abab.json');

// Initiate Firebase App
firestoreService.initializeApp(serviceAccount, 'https://pasta-framework.firebaseio.com');

// var fs = require('fs');
// var stream = fs.createWriteStream("log-dump.js");

// stream.o

// stream.once('open', function (fd) {
//     stream.write("My first row\n");
//     stream.write("My second row\n");

// });

// var obj = {
// table: []
// };

// Start exporting your data
// firestoreService
//     .backup('logs-v2')
//     .then(data => {
//         // obj.table.push(data);
//         // obj = data

//         var json = JSON.stringify(data);

//         var fs = require('fs');
//         fs.writeFile('log-dump-v4.json', json, 'utf8', () => {});
//         // console.log(data);
//     });

var moment = require('moment');

var logs = [{
        "agreementUtility": 6.6,
        "cdate": "2019-02-24T16:17:38.410Z",
        "username": "Bergem",
        "id": "e16c2553",
        "numberOfTurns": 14,
        "opponentType": "Basic-Strategy",
        "endDate": "2019-02-24T16:22:08.690Z",
        "userLastName": "Kolcuoglu",
        "agreement": {
            "offeredTo": "Government Agency",
            "cdate": "2019-02-24T16:22:06.671Z",
            "utility": 6.6,
            "consistOf": "P(GA, HA, true, SMH)",
            "offeredBy": "Hospital Administration"
        },
        "utilityOfUser": 7
    }, {
        "username": "Doga",
        "id": "fd0b73ea",
        "numberOfTurns": 20,
        "opponentType": "Basic-Strategy",
        "endDate": "2019-02-24T16:04:29.912Z",
        "userLastName": "Yilmaz",
        "agreement": {
            "offeredBy": "Hospital Administration",
            "offeredTo": "Government Agency",
            "cdate": "2019-02-24T16:04:27.893Z",
            "utility": 7.8,
            "consistOf": "P(All, HA, not Duty, API)"
        },
        "utilityOfUser": 5,
        "agreementUtility": 7.8,
        "cdate": "2019-02-24T15:59:28.506Z"
    }, {
        "userLastName": "Yilmaz",
        "agreement": {
            "consistOf": "P(GA, HA, true, SPR)",
            "offeredBy": "Hospital Administration",
            "offeredTo": "Government Agency",
            "cdate": "2019-02-24T16:14:54.111Z",
            "utility": 1.8
        },
        "utilityOfUser": 5,
        "agreementUtility": 1.8,
        "cdate": "2019-02-24T16:11:42.873Z",
        "username": "Doga",
        "id": "c1682112",
        "numberOfTurns": 10,
        "opponentType": "Similarity-Based",
        "endDate": "2019-02-24T16:14:56.133Z"
    }, {
        "opponentType": "Similarity-Based",
        "endDate": "2019-02-24T16:36:08.736Z",
        "userLastName": "Kolcuoglu",
        "agreement": {
            "offeredBy": "Government Agency",
            "offeredTo": "Hospital Administration",
            "cdate": "2019-02-24T16:36:06.701Z",
            "utility": 9,
            "consistOf": "P(GA, HA, true, SPI)"
        },
        "utilityOfUser": 6,
        "agreementUtility": 9,
        "cdate": "2019-02-24T16:32:29.442Z",
        "username": "Bergem",
        "id": "820162b5",
        "numberOfTurns": 17
    }, {
        "username": "Yousef",
        "id": "dc92a602",
        "numberOfTurns": 6,
        "opponentType": "Similarity-Based",
        "endDate": "2019-02-24T16:40:37.359Z",
        "userLastName": "Razeghi",
        "agreement": {
            "offeredTo": "Government Agency",
            "cdate": "2019-02-24T16:40:35.321Z",
            "utility": 6.6,
            "consistOf": "P(All, HA, true, SMH)",
            "offeredBy": "Hospital Administration"
        },
        "utilityOfUser": 4,
        "agreementUtility": 6.6,
        "cdate": "2019-02-24T16:38:38.641Z"
    }, {
        "agreementUtility": 2.4,
        "cdate": "2019-02-24T17:08:58.451Z",
        "username": "O",
        "id": "e5a27111",
        "numberOfTurns": 18,
        "opponentType": "Similarity-Based",
        "endDate": "2019-02-24T17:13:39.558Z",
        "userLastName": "G",
        "agreement": {
            "consistOf": "A(GO, HA, consent, AMH)",
            "offeredBy": "Hospital Administration",
            "offeredTo": "Government Agency",
            "cdate": "2019-02-24T17:13:37.528Z",
            "utility": 2.4
        },
        "utilityOfUser": 6
    }, {
        "opponentType": "Basic-Strategy",
        "endDate": "2019-02-24T16:46:25.066Z",
        "userLastName": "Buzcu",
        "agreement": {
            "offeredTo": "Government Agency",
            "cdate": "2019-02-24T16:46:23.042Z",
            "utility": 9.6,
            "consistOf": "P(All, HA, not Duty, API)",
            "offeredBy": "Hospital Administration"
        },
        "utilityOfUser": 2,
        "agreementUtility": 9.6,
        "cdate": "2019-02-24T16:48:12.932Z",
        "username": "Berk",
        "id": "9be27411",
        "numberOfTurns": 20
    }, {
        "userLastName": "Razeghi",
        "agreement": {
            "offeredBy": "Government Agency",
            "offeredTo": "Hospital Administration",
            "cdate": "2019-02-24T16:48:57.526Z",
            "utility": 10.2,
            "consistOf": "P(GA, HA, true, MPR)"
        },
        "utilityOfUser": 5,
        "agreementUtility": 10.2,
        "cdate": "2019-02-24T16:46:21.143Z",
        "username": "Yousef",
        "id": "77f13a68",
        "numberOfTurns": 7,
        "opponentType": "Basic-Strategy",
        "endDate": "2019-02-24T16:48:59.619Z"
    }, {
        "cdate": "2019-02-24T16:48:26.808Z",
        "username": "Berk",
        "id": "16dcb422",
        "numberOfTurns": 11,
        "opponentType": "Similarity-Based",
        "endDate": "2019-02-24T16:51:47.788Z",
        "userLastName": "Buzcu",
        "agreement": {
            "offeredTo": "Hospital Administration",
            "cdate": "2019-02-24T16:51:45.754Z",
            "utility": 5.4,
            "consistOf": "A(GO, HA, involve, APR)",
            "offeredBy": "Government Agency"
        },
        "utilityOfUser": 8,
        "agreementUtility": 5.4
    }, {
        "cdate": "2019-02-24T17:17:09.178Z",
        "username": "O",
        "id": "9704ab54",
        "numberOfTurns": 34,
        "endDate": "2019-02-24T17:22:19.366Z",
        "opponentType": "Basic-Strategy",
        "userLastName": "G",
        "utilityOfUser": 1
    }, {
        "userLastName": "saracalioglu",
        "utilityOfUser": 10,
        "cdate": "2019-02-24T18:09:20.605Z",
        "username": "efe",
        "id": "8b332b24",
        "numberOfTurns": 10,
        "endDate": "2019-02-24T18:14:22.621Z",
        "opponentType": "Basic-Strategy"
    }, {
        "cdate": "2019-02-24T17:47:04.966Z",
        "username": "Emir",
        "id": "7f864a37",
        "numberOfTurns": 20,
        "endDate": "2019-02-24T17:52:07.007Z",
        "opponentType": "Basic-Strategy",
        "userLastName": "Arditi",
        "utilityOfUser": 5
    }, {
        "cdate": "2019-02-24T17:54:06.876Z",
        "username": "Emir",
        "id": "8a265830",
        "numberOfTurns": 24,
        "endDate": "2019-02-24T17:59:08.376Z",
        "opponentType": "Similarity-Based",
        "userLastName": "Arditi",
        "agreement": {
            "offeredTo": "Government Agency",
            "cdate": "2019-02-24T17:59:06.352Z",
            "utility": 0.6,
            "consistOf": "A(GA, HA, true, MPI)",
            "offeredBy": "Hospital Administration"
        },
        "agreementUtility": 0.6
    }, {
        "username": "kerem",
        "id": "0d019e26",
        "numberOfTurns": 26,
        "endDate": "2019-02-24T18:15:48.901Z",
        "opponentType": "Basic-Strategy",
        "userLastName": "durak",
        "utilityOfUser": 6,
        "cdate": "2019-02-24T18:10:46.870Z"
    }, {
        "userLastName": "Molu",
        "agreement": {
            "offeredTo": "Government Agency",
            "cdate": "2019-02-24T18:18:11.159Z",
            "utility": 7.2,
            "consistOf": "P(All, HA, true, SMH)",
            "offeredBy": "Hospital Administration"
        },
        "agreementUtility": 7.2,
        "cdate": "2019-02-24T18:15:53.245Z",
        "username": "Ege ",
        "id": "8c7b9ca5",
        "numberOfTurns": 12,
        "endDate": "2019-02-24T18:18:13.178Z",
        "opponentType": "Basic-Strategy"
    }, {
        "agreementUtility": 1.2,
        "cdate": "2019-02-24T18:19:04.479Z",
        "username": "kerem",
        "id": "6829c447",
        "numberOfTurns": 30,
        "opponentType": "Similarity-Based",
        "endDate": "2019-02-24T18:23:57.311Z",
        "userLastName": "durak",
        "agreement": {
            "offeredBy": "Hospital Administration",
            "offeredTo": "Government Agency",
            "cdate": "2019-02-24T18:23:55.296Z",
            "utility": 1.2,
            "consistOf": "A(GA, HA, true, SPI)"
        },
        "utilityOfUser": 10
    }, {
        "opponentType": "Similarity-Based",
        "endDate": "2019-02-24T18:22:49.717Z",
        "userLastName": "saracalioglu",
        "agreement": {
            "offeredTo": "Hospital Administration",
            "cdate": "2019-02-24T18:22:47.705Z",
            "utility": 4.2,
            "consistOf": "A(GO, HA, security, APR)",
            "offeredBy": "Government Agency"
        },
        "utilityOfUser": 8,
        "agreementUtility": 4.2,
        "cdate": "2019-02-24T18:18:38.101Z",
        "username": "efe",
        "id": "cc0ec657",
        "numberOfTurns": 15
    }, {
        "userLastName": "Molu",
        "agreement": {
            "offeredTo": "Government Agency",
            "cdate": "2019-02-24T18:22:11.906Z",
            "utility": 6.6,
            "consistOf": "P(GO, HA, true, SPI)",
            "offeredBy": "Hospital Administration"
        },
        "agreementUtility": 6.6,
        "cdate": "2019-02-24T18:20:18.970Z",
        "username": "Ege",
        "id": "96f17481",
        "numberOfTurns": 14,
        "endDate": "2019-02-24T18:22:13.927Z",
        "opponentType": "Similarity-Based"
    }, {
        "opponentType": "Similarity-Based",
        "endDate": "2019-02-24T18:46:03.509Z",
        "userLastName": "Doğru",
        "agreement": {
            "offeredBy": "Government Agency",
            "offeredTo": "Hospital Administration",
            "cdate": "2019-02-24T18:46:01.486Z",
            "utility": 1.8,
            "consistOf": "A(GA, HA, true, SPR)"
        },
        "utilityOfUser": 10,
        "agreementUtility": 1.8,
        "cdate": "2019-02-24T18:41:32.101Z",
        "username": "Anıl",
        "id": "b04e58c0",
        "numberOfTurns": 25
    }, {
        "opponentType": "Basic-Strategy",
        "endDate": "2019-02-24T18:56:12.280Z",
        "userLastName": "Doğru",
        "agreement": {
            "offeredTo": "Hospital Administration",
            "cdate": "2019-02-24T18:56:10.255Z",
            "utility": 4.8,
            "consistOf": "A(GO, HA, true, APR)",
            "offeredBy": "Government Agency"
        },
        "utilityOfUser": 7,
        "agreementUtility": 4.8,
        "cdate": "2019-02-24T18:51:35.275Z",
        "username": "Anıl",
        "id": "4b468215",
        "numberOfTurns": 35
    }, {
        "userLastName": "Başıbüyük",
        "cdate": "2019-02-24T20:54:58.988Z",
        "username": "Önay",
        "id": "3e856357",
        "numberOfTurns": 24,
        "opponentType": "Basic-Strategy"
    }, {
        "cdate": "2019-02-24T21:00:12.171Z",
        "username": "önay",
        "id": "55fbf153",
        "numberOfTurns": 28,
        "opponentType": "Basic-Strategy",
        "endDate": "2019-02-24T21:04:37.104Z",
        "userLastName": "Başıbüyük",
        "agreement": {
            "offeredBy": "Hospital Administration",
            "offeredTo": "Government Agency",
            "cdate": "2019-02-24T21:04:35.077Z",
            "utility": 7.2,
            "consistOf": "A(GO, HA, Duty, AMH)"
        },
        "utilityOfUser": 6,
        "agreementUtility": 7.2
    }, {
        "opponentType": "Basic-Strategy",
        "endDate": "2019-02-24T21:58:02.752Z",
        "userLastName": "Süslü",
        "agreement": {
            "offeredBy": "Hospital Administration",
            "offeredTo": "Government Agency",
            "cdate": "2019-02-24T21:58:00.727Z",
            "utility": 6,
            "consistOf": "A(GO, HA, Duty, AMH)"
        },
        "utilityOfUser": 10,
        "agreementUtility": 6,
        "cdate": "2019-02-24T21:53:05.746Z",
        "username": "Çağıl ",
        "id": "62ef24ac",
        "numberOfTurns": 28
    }, {
        "opponentType": "Similarity-Based",
        "endDate": "2019-02-24T22:23:57.633Z",
        "userLastName": "Süslü",
        "agreement": {
            "offeredTo": "Government Agency",
            "cdate": "2019-02-24T22:23:55.609Z",
            "utility": 1.2,
            "consistOf": "A(GA, HA, consent, MPI)",
            "offeredBy": "Hospital Administration"
        },
        "utilityOfUser": 1,
        "agreementUtility": 1.2,
        "cdate": "2019-02-24T22:19:04.185Z",
        "username": "Çağıl",
        "id": "9ed1d991",
        "numberOfTurns": 28
    }, {
        "username": "maryam",
        "id": "9c772943",
        "numberOfTurns": 10,
        "opponentType": "Basic-Strategy",
        "endDate": "2019-02-25T09:10:50.494Z",
        "userLastName": "saleki",
        "agreement": {
            "offeredTo": "Government Agency",
            "cdate": "2019-02-25T09:10:48.468Z",
            "utility": 12,
            "consistOf": "P(All, HA, not Duty, MMH)",
            "offeredBy": "Hospital Administration"
        },
        "utilityOfUser": 7,
        "agreementUtility": 12,
        "cdate": "2019-02-25T09:05:58.606Z"
    }, {
        "username": "asd",
        "id": "1e6bbc4d",
        "numberOfTurns": 10,
        "endDate": "2019-02-25T09:17:00.584Z",
        "opponentType": "Similarity-Based",
        "userLastName": "asd",
        "agreement": {
            "offeredTo": "Government Agency",
            "cdate": "2019-02-25T09:16:58.549Z",
            "utility": 1.8,
            "consistOf": "A(GO, HA, Duty, APR)",
            "offeredBy": "Hospital Administration"
        },
        "agreementUtility": 1.8,
        "cdate": "2019-02-25T09:12:37.764Z"
    }, {
        "userLastName": "saleki",
        "agreement": {
            "consistOf": "P(GA, HA, true, MPI)",
            "offeredBy": "Government Agency",
            "offeredTo": "Hospital Administration",
            "cdate": "2019-02-25T09:17:33.930Z",
            "utility": 12.6
        },
        "utilityOfUser": 9,
        "agreementUtility": 12.6,
        "cdate": "2019-02-25T09:16:01.930Z",
        "username": "maryam",
        "id": "5cb2a150",
        "numberOfTurns": 3,
        "opponentType": "Similarity-Based",
        "endDate": "2019-02-25T09:17:36.008Z"
    }, {
        "bids": [],
        "id": "a4f19c2d",
        "numberOfTurns": 0
    }, {
        "userLastName": "Çakan",
        "agreement": {
            "offeredBy": "Hospital Administration",
            "offeredTo": "Government Agency",
            "cdate": "2019-02-25T09:41:57.829Z",
            "utility": 7.8,
            "consistOf": "P(GO, HA, not Duty, AMH)"
        },
        "utilityOfUser": 8,
        "agreementUtility": 7.8,
        "cdate": "2019-02-25T09:39:20.265Z",
        "username": "Umut",
        "id": "08321276",
        "numberOfTurns": 12,
        "opponentType": "Similarity-Based",
        "endDate": "2019-02-25T09:41:59.861Z"
    }, {
        "agreementUtility": 5.4,
        "cdate": "2019-02-25T09:44:19.339Z",
        "username": "Umut",
        "id": "90396d61",
        "numberOfTurns": 32,
        "opponentType": "Basic-Strategy",
        "endDate": "2019-02-25T09:49:01.998Z",
        "userLastName": "Çakan",
        "agreement": {
            "consistOf": "A(GO, HA, true, AMH)",
            "offeredBy": "Hospital Administration",
            "offeredTo": "Government Agency",
            "cdate": "2019-02-25T09:48:59.972Z",
            "utility": 5.4
        },
        "utilityOfUser": 9
    }, {
        "userLastName": "Gölgedar",
        "agreement": {
            "offeredBy": "Hospital Administration",
            "offeredTo": "Government Agency",
            "cdate": "2019-02-25T10:33:25.133Z",
            "utility": 4.2,
            "consistOf": "A(GA, HA, true, APR)"
        },
        "utilityOfUser": 8,
        "agreementUtility": 4.2,
        "cdate": "2019-02-25T10:41:47.428Z",
        "username": "Onur",
        "id": "932b3889",
        "numberOfTurns": 10,
        "opponentType": "Similarity-Based",
        "endDate": "2019-02-25T10:41:49.248Z"
    }, {
        "cdate": "2019-02-25T10:42:09.892Z",
        "username": "Onur",
        "id": "84656e1d",
        "numberOfTurns": 28,
        "opponentType": "Basic-Strategy",
        "endDate": "2019-02-25T10:47:11.583Z",
        "userLastName": "Gölgedar",
        "agreement": {
            "consistOf": "A(GO, HA, Duty, AMH)",
            "offeredBy": "Hospital Administration",
            "offeredTo": "Government Agency",
            "cdate": "2019-02-25T10:47:09.523Z",
            "utility": 6.6
        },
        "utilityOfUser": 8,
        "agreementUtility": 6.6
    }, {
        "opponentType": "Basic-Strategy",
        "endDate": "2019-02-25T13:38:20.831Z",
        "userLastName": "Sümengen",
        "agreement": {
            "offeredTo": "Government Agency",
            "cdate": "2019-02-25T13:27:52.414Z",
            "utility": 1.2,
            "consistOf": "A(GO, HA, true, SPI)",
            "offeredBy": "Hospital Administration"
        },
        "utilityOfUser": 1,
        "agreementUtility": 1.2,
        "cdate": "2019-02-25T13:33:18.792Z",
        "username": "Emre",
        "id": "38cb688e",
        "numberOfTurns": 34
    }, {
        "agreementUtility": 11.4,
        "cdate": "2019-02-25T16:11:25.643Z",
        "username": "emre",
        "id": "bbeb45eb",
        "numberOfTurns": 4,
        "endDate": "2019-02-25T16:13:11.476Z",
        "opponentType": "Similarity-Based",
        "userLastName": "akkus",
        "agreement": {
            "consistOf": "P(All, HA, not involve, SMH)",
            "offeredBy": "Hospital Administration",
            "offeredTo": "Government Agency",
            "cdate": "2019-02-25T16:13:09.180Z",
            "utility": 11.4
        }
    }, {
        "userLastName": "akkus Revize",
        "agreement": {
            "offeredBy": "Government Agency",
            "offeredTo": "Hospital Administration",
            "cdate": "2019-02-25T16:18:10.883Z",
            "utility": 4.8,
            "consistOf": "A(GO, HA, true, APR)"
        },
        "utilityOfUser": 7,
        "agreementUtility": 4.8,
        "cdate": "2019-02-25T16:14:11.446Z",
        "username": "emre",
        "id": "af02d777",
        "numberOfTurns": 9,
        "opponentType": "Similarity-Based",
        "endDate": "2019-02-25T16:18:12.991Z"
    }, {
        "userLastName": "akkus",
        "utilityOfUser": 2,
        "cdate": "2019-02-25T16:22:37.164Z",
        "username": "emre",
        "id": "69e91763",
        "numberOfTurns": 18,
        "endDate": "2019-02-25T16:27:39.596Z",
        "opponentType": "Basic-Strategy"
    }, {
        "userLastName": "G",
        "utilityOfUser": 4,
        "cdate": "2019-02-25T17:47:42.886Z",
        "username": "O",
        "id": "ac25d6d9",
        "numberOfTurns": 32,
        "endDate": "2019-02-25T17:53:03.551Z",
        "opponentType": "Basic-Strategy"
    }, {
        "userLastName": "G",
        "agreement": {
            "offeredTo": "Government Agency",
            "cdate": "2019-02-25T18:00:12.849Z",
            "utility": 1.2,
            "consistOf": "A(GA, HA, consent, SMH)",
            "offeredBy": "Hospital Administration"
        },
        "agreementUtility": 1.2,
        "cdate": "2019-02-25T17:55:24.876Z",
        "username": "O",
        "id": "275abb5f",
        "numberOfTurns": 30,
        "endDate": "2019-02-25T18:00:14.956Z",
        "opponentType": "Similarity-Based"
    }, {
        "endDate": "2019-02-25T18:58:51.143Z",
        "opponentType": "Basic-Strategy",
        "userLastName": "Arslan",
        "utilityOfUser": 2,
        "cdate": "2019-02-25T18:53:49.053Z",
        "username": "Furkan",
        "id": "743ae78e",
        "numberOfTurns": 24
    }, {
        "userLastName": "Arslan",
        "agreement": {
            "offeredTo": "Hospital Administration",
            "cdate": "2019-02-25T19:12:38.493Z",
            "utility": 3.6,
            "consistOf": "A(GA, HA, true, APR)",
            "offeredBy": "Government Agency"
        },
        "utilityOfUser": 9,
        "agreementUtility": 3.6,
        "cdate": "2019-02-25T19:08:47.259Z",
        "username": "Furkan",
        "id": "746f83be",
        "numberOfTurns": 21,
        "opponentType": "Similarity-Based",
        "endDate": "2019-02-25T19:12:40.526Z"
    },
    {
        "username": "cihan",
        "id": "6f31991e",
        "numberOfTurns": 25,
        "opponentType": "Similarity-Based",
        "endDate": "2019-02-25T20:41:14.602Z",
        "userLastName": "eran",
        "agreement": {
            "offeredTo": "Hospital Administration",
            "cdate": "2019-02-25T20:41:12.551Z",
            "utility": 3.6,
            "consistOf": "A(GA, HA, true, APR)",
            "offeredBy": "Government Agency"
        },
        "utilityOfUser": 8,
        "agreementUtility": 3.6,
        "cdate": "2019-02-25T20:36:41.639Z"
    },
    {
        "userLastName": "eran",
        "cdate": "2019-02-25T20:43:41.175Z",
        "username": "cihan",
        "id": "aefba626",
        "numberOfTurns": 16,
        "opponentType": "Basic-Strategy"
    }
];

logs.forEach(log => {
    if (log.endDate) {
        var endDate = moment(log.endDate);
        var cdate = moment(log.cdate);
        log.duration = endDate.diff(cdate, 'seconds');
    } else{
        log.duration = 300;
    }
    
    // var a = moment('7/11/2010', 'M/D/YYYY');
    // var b = moment('12/12/2010', 'M/D/YYYY');
    // var diffDays = b.diff(a, 'minute');
});

console.log(logs);