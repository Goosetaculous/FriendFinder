/**
 * Created by goosetaculous on 7/13/17.
 */

var arr = [{
    "name":"Rock",
    "photo":"http://cdn-maf3.heartyhosting.com/sites/muscleandfitness.com/files/media/dwayne-johnson-rock-scream.jpg",
    "scores":[
        5,
        1,
        4,
        4,
        5,
        1,
        2,
        5,
        4,
        1
    ]
}]

function computeDifference(dbScore,userScore){
    let sum = 0
    for(var i =0 ; i < dbScore.length; i++){
        sum = sum + Math.abs(dbScore[i]- userScore[i])
    }
    return sum
}


function traverseUsers(userScore){
    var compatible =""
    if(arr.length > 0){
        let diff=1000
        arr.forEach((db)=>{
            if(diff > computeDifference(db.scores,userScore)){
                diff =  computeDifference(db.scores,userScore)
                compatible = db
            }
        })
    }
    return compatible
}

module.exports = (app)=>{
    app.get('/api/friends',(req,res)=>{
        res.json(arr)
    })
    app.post('/api/friends',(req,res)=>{
        var newScore = req.body.scores.map((x)=>{
            return parseInt(x)
        })
        let obj={
            name: req.body.name,
            photo: req.body.photo,
            scores : newScore
        }
        let userComp = traverseUsers(obj.scores)

        res.send(userComp)
        arr.push(obj)
    })
}