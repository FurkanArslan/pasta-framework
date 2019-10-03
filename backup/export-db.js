const firestoreService = require('firestore-export-import');
const serviceAccount = require('./pasta-framework-firebase-adminsdk-08747-960355abab.json');

// Initiate Firebase App
firestoreService.initializeApp(serviceAccount, 'https://pasta-framework.firebaseio.com');

// Start exporting your data
firestoreService.backup('logs-v3').then(data => {
    var data_2 = data['logs-v3']['2']['logs'];

    data_2 = data_2.filter(data_ => data_.username !== 'Furkan' && data_.numberOfTurns > 0);
    data_2 = data_2.map(data_ => {
        return {
            userLastName: data_.userLastName,
            cdate: data_.cdate,
            username: data_.username,
            id: data_.id,
            numberOfTurns: data_.numberOfTurns,
            endDate: data_.endDate,
            opponentType: data_.opponentType,
            agreement: data_.agreement,
            agreementUtility: data_.agreementUtility
        };
    });

    var json = JSON.stringify(data_2);

    // logs.forEach(log => {
    //     if (log.endDate) {
    //         var endDate = moment(log.endDate);
    //         var cdate = moment(log.cdate);
    //         log.duration = endDate.diff(cdate, 'seconds');
    //     } else{
    //         log.duration = 300;
    //     }

    //     // var a = moment('7/11/2010', 'M/D/YYYY');
    //     // var b = moment('12/12/2010', 'M/D/YYYY');
    //     // var diffDays = b.diff(a, 'minute');
    // });

    var fs = require('fs');
    fs.writeFile('./log-dump-v11.json', json, 'utf8', () => {});
    // console.log(data);
});
