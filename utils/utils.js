// utility function to convert javascript date to "YYYY-MM-DD" format
exports.getCurrentDate = function() {
    var dt = new Date();
    var month = dt.getMonth() + 1;
    if (month.length = 1) {
        month = '0' + month;
    }
    var year = dt.getFullYear();
    var date = dt.getDate();
    return year + '-' + month + '-' + date;
}
