const ScormCloud = require('@rusticisoftware/scormcloud-api-v2-client-javascript');

const defaultClient = ScormCloud.ApiClient.instance;

// Configure HTTP basic authorization: APP_NORMAL
const APP_NORMAL = defaultClient.authentications['APP_NORMAL'];
APP_NORMAL.username = '05M5ZHWNW5';
 APP_NORMAL.password = 'ayX0ZLzq0K39xNpeYvEnBfj1btcMQwAp0ihVWQcU';

// APP_NORMAL.username = 'PAscalRossi';
// APP_NORMAL.password = 'Mcf2022!';
    // OR

// Configure OAuth2 access token for authorization: OAUTH
// Note: HTTP basic auth must be configured for the initial call to create an OAuth2 token
const OAUTH = defaultClient.authentications['OAUTH'];
const appManagementApi = new ScormCloud.ApplicationManagementApi();
const courseApi = new ScormCloud.CourseApi();

const expiry = new Date();
expiry.setMinutes(expiry.getMinutes() + 5);

const tokenRequest = {
    permissions: { scopes: ['read:registration', 'write:course'] },
    expiry: expiry
};

console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+APP_NORMAL.username)

// appManagementApi.createToken(tokenRequest, function (error, data) {
//     if (error) {
//         console.error(error.response.text);
//     }
//     console.log("token is: " + data.result);
//     OAUTH.accessToken = data.result;
//     // further calls will use OAuth2 for authentication

    

// });

// courseApi.getCourses({},(err, data) => {
//     console.log(data);
//     return data;
// });

// //const courseId ="InscriptionE-formation-Photoshop37617d9a-5a9d-48af-bfad-efdc24a8b226"
// courseApi.getCourse(courseId,{},(err, data) => {
//     console.log("========================================> courseId: "+courseId);
//     console.log(data);
//     return data;
// });

// courseApi.buildCoursePreviewLaunchLink(courseId,{},(err, data) => {
//     console.log("========================================> coursId to preview show: "+courseId);
//     console.log(data);
//     return data;
// });

//const uploadScormFileService = courseApi.createUploadAndImportCourseJob(courseId, true,  file);

// module.exports = {
//     uploadScormFileService
// }