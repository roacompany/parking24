const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// 최고 관리자 권한 부여
exports.setAdminRole = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', '로그인이 필요합니다');
  }

  if (!context.auth.token.admin) {
    throw new functions.https.HttpsError('permission-denied', '권한이 없습니다');
  }

  try {
    const email = data.email;
    const user = await admin.auth().getUserByEmail(email);
    
    await admin.auth().setCustomUserClaims(user.uid, {
      admin: true,
      manager: false
    });
    
    return { 
      success: true,
      message: '최고 관리자 권한이 부여되었습니다' 
    };
  } catch (error) {
    throw new functions.https.HttpsError('internal', error.message);
  }
});

// 주차장 관리자 권한 부여
exports.setManagerRole = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', '로그인이 필요합니다');
  }

  if (!context.auth.token.admin) {
    throw new functions.https.HttpsError('permission-denied', '권한이 없습니다');
  }

  try {
    const email = data.email;
    const user = await admin.auth().getUserByEmail(email);
    
    await admin.auth().setCustomUserClaims(user.uid, {
      admin: false,
      manager: true
    });
    
    return { 
      success: true,
      message: '주차장 관리자 권한이 부여되었습니다' 
    };
  } catch (error) {
    throw new functions.https.HttpsError('internal', error.message);
  }
});

// 권한 제거
exports.removeRole = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', '로그인이 필요합니다');
  }

  if (!context.auth.token.admin) {
    throw new functions.https.HttpsError('permission-denied', '권한이 없습니다');
  }

  try {
    const email = data.email;
    const user = await admin.auth().getUserByEmail(email);
    
    await admin.auth().setCustomUserClaims(user.uid, {
      admin: false,
      manager: false
    });
    
    return { 
      success: true,
      message: '권한이 제거되었습니다' 
    };
  } catch (error) {
    throw new functions.https.HttpsError('internal', error.message);
  }
});