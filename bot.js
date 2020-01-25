console.log("Bot is running!!!");

var Twit = require('twit');
var config = require('./config');
var fs = require('fs');

var T = new Twit(config);

// Tweet an image
var filename = 'testimage.jpg';
var params = {
    encoding: 'base64'
}

var b64 = fs.readFileSync(filename, params);

T.post('media/upload', { media_data: b64 }, uploaded);

function uploaded(err, data, response) {
    let mediaId = data.media_id_string;
    let tweet = {
        status: 'Posting an image #Nodejs',
        media_ids: [mediaId]
    };
    T.post('statuses/update', tweet, tweeted);
    function tweeted(err, data, response) {
        if(err) {
            console.log("Something went wrong!!", err);
        } else {
            console.log("It worked, hurray!!");
        }
    }
}



// // Favorite and Like
// var favoriteAndRetweet = function() {
//     //These are the parameters that I pass into the GET method
//     const params = {
//         q: "#100DaysOfCode, #javascript, #CodeNewbie",
//         count: 2,
//         result_type: "recent",
//         lang: "en"
//     }

//     //Getting all the tweets
//     T.get('search/tweets', params, (err, data, response) => {
//         if(err) {
//             return console.log(err);
//         }

//         //Array of Ids that will be favorited/retweeted
//         const tweetsId = data.statuses.map(tweet => ({id: tweet.id_str}));
        
//         //For each id, it will create a favorite/retweet
//         tweetsId.map(tweetId => {
//             //Favorite all the tweets
//             T.post('favorites/create', tweetId, (err, response) => {
//                 if(err) {
//                     console.log(err);
//                 }

//                 var username = response.user.screen_name;
//                 var favoritedTweetId = response.id_str;
//                 console.log(`Favorited: https://twitter.com/${username}/status/${favoritedTweetId}`);
//             });

//             //Retweet all the tweets
//             T.post('statuses/retweet/:id', tweetId, (err, response) => {
//                 if(err) {
//                     console.log(err);
//                 }

//                 var username = response.user.screen_name;
//                 var favoritedTweetId = response.id_str;
//                 console.log(`Retweeted: https://twitter.com/${username}/status/${favoritedTweetId}`);
//             });
//         });
//     });
// }

// favoriteAndRetweet();

// //Setting up a user stream
// var stream = T.stream('statuses/filter', { track: '@botcode1' });

// function tweetIt(txt) {
//     var tweet = {
//         status: txt
//     }

//     var tweeted = function(err, data, response) {
//         if(err) {
//             console.log("Something went wrong!!", err);
//         } else {
//             console.log("It worked, hurray!!");
//         }
//     }

//     T.post('statuses/update', tweet, tweeted);
// }

// function followed(eventMsg) {
//     console.log("Follow event!!");
//     var name = eventMsg.source.name;
//     var screenName = eventMsg.source.screen_name;
//     tweetIt('@' + screenName + ' hows your life going?');
// }

// // Anytime someone follows me
// stream.on('follow', followed);




// //Method for GET
// var params = { 
//     q: 'javascript', 
//     count: 2,
//     include_entities: true
// }

// function gotData(err, data, response) {
//     var tweets = data.statuses;
//     for(let i=0; i<tweets.length; i++) {
//         console.log("Tweet-"+ i+1 + ": " + tweets[i].text);
//     }
// }

// T.get('search/tweets', params, gotData);




// //Method for POST
// function tweetIt() {
//     var r = Math.floor(Math.random()*100);
//     var tweet = { 
//         status: '#BotCode #Post_' + r 
//     }

//     var tweeted = function(err, data, response) {
//         if(err) {
//             console.log("Something went wrong!!", err);
//         } else {
//             console.log("It worked, hurray!!");
//         }
//     }

//     T.post('statuses/update', tweet, tweeted);
// }

// tweetIt();
// setInterval(tweetIt, 1000*60);