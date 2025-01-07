def colorSelection (notifyStatus){
    color = ''
    switch(notifyStatus) {
        case 'SUCCESS':
            color = 'good'
            break
        case 'FAILURE':
            color = 'danger'
            break
        case 'ABORTED':
            color = 'warning'
            break
    }

    return color
}

def slackSendNotification (notification){
    slackSend channel: notification.channel,
        color: colorSelection(notification.notifyStatus),
        message: notification.message
}


return this