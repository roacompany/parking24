/**
 * Firestore parkingSpecials SEO 데이터 업데이트 스크립트
 *
 * 실행 방법:
 * 1. Firebase 서비스 계정 키 설정 (환경변수 또는 파일)
 * 2. node scripts/update-parking-specials-seo.js
 */

const admin = require('firebase-admin');

// Firebase Admin 초기화 (서비스 계정 필요)
// 옵션 1: 환경변수 GOOGLE_APPLICATION_CREDENTIALS 사용
// 옵션 2: 서비스 계정 키 파일 직접 지정
if (!admin.apps.length) {
  admin.initializeApp({
    // credential: admin.credential.cert(require('./serviceAccountKey.json')),
    // 또는 환경변수 사용 시:
    credential: admin.credential.applicationDefault(),
  });
}

const db = admin.firestore();

// SEO 데이터 정의
const parkingSpecialsSEO = {
  tesla: {
    seoTitle: 'Tesla 전용 주차 - 충전 포함 프리미엄 보관 | PARKING 24',
    seoDescription: 'Tesla 오너 전용 프리미엄 주차. 여행 중 배터리 충전 완료, 100% 실내 보관, 전문 스탭 관리. 소중한 차량을 안심하고 맡기세요.',
    seoKeywords: 'Tesla주차, 테슬라주차, 테슬라충전, 전기차주차, 인천공항Tesla, 공항주차Tesla, 프리미엄주차',
  },
  bmw: {
    seoTitle: 'BMW 전용 주차 - 100% 실내 보관 보장 | PARKING 24',
    seoDescription: 'BMW 오너 전용 프리미엄 주차. 100% 실내 주차장 배정, 전문 스탭의 세심한 관리. 소중한 차량을 안심하고 맡기세요.',
    seoKeywords: 'BMW주차, 비엠더블유주차, 수입차주차, 인천공항BMW, 공항주차BMW, 프리미엄주차, 실내주차',
  },
};

async function updateParkingSpecialsSEO() {
  console.log('🚀 Firestore parkingSpecials SEO 업데이트 시작...\n');

  for (const [docId, seoData] of Object.entries(parkingSpecialsSEO)) {
    try {
      const docRef = db.collection('parkingSpecials').doc(docId);
      const docSnapshot = await docRef.get();

      if (docSnapshot.exists) {
        await docRef.update(seoData);
        console.log(`✅ ${docId}: SEO 데이터 업데이트 완료`);
        console.log(`   Title: ${seoData.seoTitle}`);
        console.log(`   Description: ${seoData.seoDescription.substring(0, 50)}...`);
      } else {
        console.log(`⚠️ ${docId}: 문서가 존재하지 않습니다. 새로 생성합니다.`);
        await docRef.set(seoData, { merge: true });
        console.log(`✅ ${docId}: 문서 생성 완료`);
      }
    } catch (error) {
      console.error(`❌ ${docId}: 업데이트 실패 - ${error.message}`);
    }
    console.log('');
  }

  console.log('🎉 모든 업데이트 완료!');
}

// 스크립트 실행
updateParkingSpecialsSEO()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('스크립트 실행 오류:', error);
    process.exit(1);
  });
