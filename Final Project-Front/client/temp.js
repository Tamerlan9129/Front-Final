var notification;
var container = document.querySelector('#notification-container');
var visible = false;
var queue = [];

function createNotification() {
    notification = document.createElement('div');
    var btn = document.createElement('button');
    var title = document.createElement('div');
    var msg = document.createElement('div');
    btn.className = 'notification-close';
    title.className = 'notification-title';
    msg.className = 'notification-message';
    btn.addEventListener('click', hideNotification, false);
    notification.addEventListener('animationend', hideNotification, false);
    notification.addEventListener('webkitAnimationEnd', hideNotification, false);
    notification.appendChild(btn);
    notification.appendChild(title);
    notification.appendChild(msg);
}

function updateNotification(type, title, message) {
    notification.className = 'notification notification-' + type;
    notification.querySelector('.notification-title').innerHTML = title;
    notification.querySelector('.notification-message').innerHTML = message;
}

function showNotification(type, title, message) {
    if (visible) {
        queue.push([type, title, message]);
        return;
    }
    if (!notification) {
        createNotification();
    }
    updateNotification(type, title, message);
    container.appendChild(notification);
    visible = true;
}

function hideNotification() {
    if (visible) {
        visible = false;
        container.removeChild(notification);
        if (queue.length) {
            showNotification.apply(null, queue.shift());
        }
    } 
}

document.querySelector('#success-btn').addEventListener('click', showNotification.bind(null, 'success', 'Success!', 'Your request was completed successfully.'), false);
document.querySelector('#error-btn').addEventListener('click', showNotification.bind(null, 'error', 'Error!', 'Your request did not complete successfully.'), false);
document.querySelector('#info-btn').addEventListener('click', showNotification.bind(null, 'info', 'Information', 'Don\'t forget to checkout the new features'), false);
document.querySelector('#warning-btn').addEventListener('click', showNotification.bind(null, 'warning', 'Warning!', 'Your battery is running low.'), false);