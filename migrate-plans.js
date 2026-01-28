const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function migrateParkingPlans() {
  try {
    console.log('마이그레이션 시작...');
    
    const plansRef = db.collection('parkingPlans');
    const snapshot = await plansRef.get();
    
    let updated = 0;
    
    for (const doc of snapshot.docs) {
      const data = doc.data();
      
      // specialType 필드가 없는 경우에만 업데이트
      if (!data.hasOwnProperty('specialType')) {
        await plansRef.doc(doc.id).update({
          specialType: null
        });
        console.log(`✓ ${doc.id} 업데이트 완료`);
        updated++;
      }
    }
    
    console.log(`\n✅ 마이그레이션 완료: ${updated}개 이용권 업데이트`);
    process.exit(0);
  } catch (error) {
    console.error('❌ 마이그레이션 실패:', error);
    process.exit(1);
  }
}

migrateParkingPlans();