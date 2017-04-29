var pool = require("../db/connection");



exports.getvote = function(userId,videoId,dt) {
  console.log("inside getvote",userId,videoId,dt);
    return query(
            "SELECT * FROM users_votes WHERE user_id=$1 and video_id=$2 and to_char(date,'YYYY-MM-DD')=$3",
          [userId,videoId,dt]
        ).then(function(list) {
            return list;
        })
        .catch(function(err) {
            console.log("Error getting  data", err);
        });
}

exports.insertVote = function(userId, videoId, dt) {
  console.log("input parameters indertVote :: ::",userId,videoId,dt);
    return query(
           "INSERT INTO users_votes(user_id,video_id,date) VALUES($1,$2,$3) RETURNING *",
           [userId,videoId,dt]
        ).then(function(list) {
            console.log("return user votes inserted data", list);
            return list;
        })
        .catch(function(err) {
            console.log("Error inserting data", err);
        });
}

function query(sqlString, data) {
    return new Promise(function(resolve, reject) {
        pool.connect(function(err, client, done) {
            try {
                if (err) {
                    return reject(err);
                }

                client.query(sqlString, data, function(err, result) {
                    if (err) {
                        return reject(err);
                    }

                    resolve(result.rows);
                });
            } finally {
                done();
            }
        });
    });
}
