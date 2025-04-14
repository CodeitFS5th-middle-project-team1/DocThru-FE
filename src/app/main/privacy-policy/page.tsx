'use client';

import { useRouter } from 'next/navigation';

export default function PrivacyPolicyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 px-6 py-10 md:px-24">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">
        개인정보 처리방침
      </h1>

      <section className="space-y-6 text-sm leading-relaxed">
        <p>
          Docthru는 이용자의 개인정보를 소중하게 생각하며, 수집 및 활용에 있어
          아래와 같은 방침을 따르고 있습니다.
        </p>

        <div>
          <h2 className="text-lg font-semibold text-white">
            1. 수집하는 개인정보 항목
          </h2>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>계정 생성 시 이메일 주소 및 닉네임</li>
            <li>서비스 이용 기록 (페이지 방문, 클릭, 사용 시간 등)</li>
            <li>브라우저 및 기기 정보 (서비스 품질 개선 목적)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">
            2. 개인정보 이용 목적
          </h2>
          <p className="mt-2">
            수집된 개인정보는 다음의 목적을 위해 활용됩니다:
            <br />
            - 서비스 제공 및 운영
            <br />
            - 신규 기능 안내 및 알림
            <br />
            - 사용자 경험 개선
            <br />- 고객 지원 및 피드백 대응
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">
            3. 개인정보 제공 및 공유
          </h2>
          <p className="mt-2">
            Docthru는 이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다.
            다만, 다음의 경우 예외로 합니다:
            <br />
            - 법령에 의한 경우
            <br />
            - 통계 작성, 학술 연구 등을 위한 비식별 처리
            <br />- 서비스 개선을 위한 제휴사에 한정된 공유
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">4. 이용자의 권리</h2>
          <p className="mt-2">
            이용자는 언제든지 자신의 개인정보를 열람, 수정, 삭제 요청할 수
            있습니다. 관련 요청은 privacy@docthru.com 으로 가능합니다.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">
            5. 정책 변경 안내
          </h2>
          <p className="mt-2">
            본 개인정보 처리방침은 법령 및 내부 정책에 따라 변경될 수 있으며,
            변경 시 서비스 내 공지 또는 이메일을 통해 고지합니다.
          </p>
        </div>

        <p className="mt-8 text-gray-400 text-xs italic">
          마지막 업데이트: 2025년 4월
        </p>

        <button
          onClick={() => router.back()}
          className="cursor-pointer mt-6 px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400 transition"
        >
          돌아가기
        </button>
      </section>
    </div>
  );
}
