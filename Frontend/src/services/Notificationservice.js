
const notifications = [];

export const notificationService = {
    addNotification: (message) => {
        notifications.push(message);
        
    },
    
    getNotifications: () => {
        return notifications;
    },

    clearNotifications: () => {
        notifications.length = 0; 
    },
};
