const appMode = 'prod';
export const Settings = {
    appMode : 'dev',
    endPoint : 'https://api.pipedrive.com/v1/',
    getAuthorizationToken : function(){
        return "8796d529836e0376ff92f69bf6d49a40a96185a4";
    },
    validateField : function(requiredKeys, obj){
        return new Promise((resolve, reject) => {
            const res = requiredKeys.filter((item) => {
                return !obj.hasOwnProperty(item);
            });
            if (res.length > 0){
                resolve();
            } else {
                reject(res);
            }
        });
    }
};