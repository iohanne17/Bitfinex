/**
 * settings.js
 * Internal settings and configurations for various aspects of the mobile app project
 */

const namespace = "_bitfinex_";

const devSettings = {
    namespace,
    API:"https://api-pub.bitfinex.com/v2/conf", 
};

const prodSettings = {
    ...devSettings,
};

const settings = process.env.NODE_ENV === "production" ? prodSettings : devSettings;
export default settings;
