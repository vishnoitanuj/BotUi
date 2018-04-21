/**
 * Created by TANUJ on 27-07-2017.
 */

var botui = new BotUI('tanuj-bot');
var uemail,uname;

botui.message
    .add({
        delay: 500,
        content: 'Hey there',
}).then(function () {
    return botui.message.add({
        delay: 1000,
        content: 'May i know your PNR number?'
    });
}).then(function (res) {
    pnr = res.value;
    return botui.action.text({
        action: {
            placeholder: '{{  }}'
        }
    });
})
    .then(function (res) {
    botui.message.add({
        delay: 700,
        loading: true,
        content: res.value+' sounds to be cool buddy!! !(thumps-up)'
    });
}).then(function () {
    botui.message.add({
        delay: 1500,
        content: 'Would you like to share your mail with me?'
    })

}).then(function () {
    return botui.action.button({
        delay: 1500,
        addMessage: false,
        action: [
            {
                text: 'Yes',
                value: 'Yes'
            },
            {
                text: 'No',
                value: 'No'
            }
        ]
    });
}).then(function (res) {
    if(res.value=='Yes') {
        botui.message.human({
            delay: 300,
            content: res.value
        });
        askEmail();
    }
        else{
            botui.message.human({
                delay: 300,
                content: res.value,
            });
            end();
        }
    });


var askEmail = function(){
    return botui.action.text({
        action: {
            sub_type : 'email',
            placeholder: 'abc@example.com'
        }
    })
        .then(function (res) {
            uemail = res.value;
        botui.message.add({
            delay:500,
            content: 'Thanks for the information',
        });
    }).then(function () {
        botui.message.add({
            loading: true,
            delay: 1000,
            content: 'How many approx message you receive per week?',
        });
    }).then(function () {
        return botui.action.button({
            action: [
                {
                    text: 'Less than 10',
                    value: 'one'
                },
                {
                    text: 'Less than 50',
                    value: 'two'
                },
                {
                    text: 'Less than 200',
                    value: 'two'
                },
                {
                    text: 'more than 200',
                    value: 'two'
                }
            ]
        });
    }).then(function(res) {
        if(res.value=='one'){
            one();
        }
        else {
            two();
        }
    });
}

var one = function() {
    botui.message.add({
        loading: true,
        delay: 1200,
        content: 'That\'s a nice thing!!\n Well don\'t worry I\'ll not add things to it !(smile-o)'
    }).then(function () {
        botui.message.add({
            loading: true,
            delay: 600,
            content: '!(thumbs-up)'
        })
    })
    end();
}

var two = function() {
    botui.message.add({
        delay: 1500,
        type: 'embed',
        content: 'https://giphy.com/embed/FcTdv3xQKhCIE'
    })
        .then(function () {
            botui.message.add({
                loading: true,
                delay: 1700,
                content: 'That\'s a little too much!! !(frown-0)'
            });
        }).then(function () {
        botui.message.add({
            loading: true,
            delay: 2000,
            content: 'Well it can be considerably removed by avoiding not required emails.\n Would you like just one small email from me regrading exempting irritating emails everyday?'
        });
    }).then(function () {
        return botui.action.button({
            action: [
                {
                    text: 'Yes',
                    value: 'yes',
                },
                {
                    text: 'No',
                    value: 'no',
                }
            ]
        });
    }).then(function (res) {
        if(res.value=='yes')
            sendEmail();
        else
            noEmail();
    });
}

var sendEmail = function () {
   return botui.message.add({
        loading: true,
        delay: 500,
        content: 'Thanks for trusting me !(smile-0).\n Hoping to not let you down.'
    }).then(function (res) {
        botui.message.add({
            loading: true,
            delay: 500,
            content: 'You will receive an email soon at '+ uemail
        })
    });
    end();
}

var noEmail = function () {
    botui.message.add({
        loading: true,
        delay: 800,
        type: 'embed',
        content: 'https://giphy.com/embed/9Y5BbDSkSTiY8',
    }).then(function () {
        botui.message.add({
            loading: true,
            delay: 500,
            content: 'I am still working on how to build my trust in you!! !(frown-0)',
        });
    });
    end();
}


var end = function () {
    botui.message.add({
        delay: 2000,
        loading: true,
        content: 'That was nice talking to you buddy!! !(smile-0)'
    }).then(function(res){
        botui.message.add({
            delay: 4000,
            loading: true,
            content: 'Bye....Hope to see you again!!'
        });
    })
        .then(function () {
        return botui.message.add({
            delay:2500,
            type: 'embed',
            content: 'https://giphy.com/embed/3orieStB8OH7lanfGg'
        });
    });
}
