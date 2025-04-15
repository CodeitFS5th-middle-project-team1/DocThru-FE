'use client';
import React from 'react';

const AnimateLoad: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full flex flex-col justify-center items-center bg-[#E9E8E3] z-[99] animate-[offscreen_0.5s_5.5s_forwards]">
      <div className="w-[270px] h-[270px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="270"
          height="270"
          viewBox="0.032 0 270 270"
        >
          <g>
            {/* 얼굴 */}
            <g className="opacity-0 animate-[popup_0.6s_1s_cubic-bezier(0.95,0.05,0.795,0.035)_forwards]">
              <path
                fill="#58585A"
                d="M135,10c33.389,0,64.778,13.002,88.388,36.612S260,101.611,260,135s-13.003,64.779-36.612,88.388S168.389,260,135,260s-64.778-13.002-88.388-36.612C23.002,199.779,10,168.389,10,135s13.002-64.779,36.612-88.388C70.222,23.002,101.611,10,135,10 M135,0C60.442,0,0,60.441,0,135s60.442,135,135,135s135-60.441,135-135S209.558,0,135,0L135,0z"
              />
            </g>

            {/* 왼쪽 눈 */}
            <g className="opacity-0 animate-[popup_0.5s_0.5s_cubic-bezier(0.95,0.05,0.795,0.035)_forwards]">
              <circle
                fill="none"
                stroke="#58585A"
                strokeWidth="4"
                strokeLinecap="round"
                strokeMiterlimit="10"
                cx="66.063"
                cy="127.51"
                r="18.849"
              />
              <circle
                className="animate-[follow_4.5s_1.6s_forwards]"
                fill="#58585A"
                cx="66.063"
                cy="127.511"
                r="8.949"
              />
            </g>

            {/* 오른쪽 눈 */}
            <g className="opacity-0 animate-[popup_0.5s_0.5s_cubic-bezier(0.95,0.05,0.795,0.035)_forwards]">
              <circle
                fill="none"
                stroke="#58585A"
                strokeWidth="4"
                strokeLinecap="round"
                strokeMiterlimit="10"
                cx="203.936"
                cy="127.51"
                r="18.849"
              />
              <circle
                className="animate-[follow_4.5s_1.6s_forwards]"
                fill="#58585A"
                cx="203.935"
                cy="127.511"
                r="8.949"
              />
            </g>

            {/* 입 */}
            <g className="opacity-0 animate-[popup_0.5s_0.5s_cubic-bezier(0.95,0.05,0.795,0.035)_forwards]">
              <polyline
                className="animate-[patient_4.6s_1s_ease-in_forwards]"
                fill="none"
                stroke="#58585A"
                strokeWidth="4"
                strokeLinecap="round"
                strokeMiterlimit="10"
                points="111.532,232.832 135.032,232.832 158.532,232.832"
              />
              <path
                className="opacity-0 animate-[happy_2s_4.8s_ease-in_forwards]"
                fill="none"
                stroke="#58585A"
                strokeWidth="4"
                strokeLinecap="round"
                strokeMiterlimit="10"
                d="M62.485,168.615c0.951,35.593,33.016,64.198,72.511,64.198c39.503,0,71.566-28.605,72.519-64.198"
              />
            </g>
          </g>
        </svg>
      </div>

      {/* 로딩 바 */}
      <div className="relative mt-16 w-[250px] bg-[#C1C0BC] h-[4px] rounded">
        <div className="absolute top-0 left-0 h-full bg-[#58585A] rounded animate-[load_5s_1s_forwards]" />
      </div>

      {/* 글로벌 keyframes 정의 */}
      <style jsx global>{`
        @keyframes popup {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          80% {
            transform: scale(1.05);
            opacity: 1;
          }
          90% {
            transform: scale(0.95);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes follow {
          0% {
            transform: translate(0, 0);
          }
          15% {
            transform: translate(-4px, 8px);
          }
          95.5% {
            transform: translate(-2px, 10px);
          }
          90% {
            transform: translate(8px, 10px);
          }
          100% {
            transform: translate(0, 0);
          }
        }
        @keyframes patient {
          0% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          81% {
            opacity: 0;
          }
          100% {
            opacity: 0;
          }
        }
        @keyframes happy {
          0% {
            opacity: 1;
          }
          82% {
            opacity: 1;
          }
        }
        @keyframes load {
          0% {
            width: 0;
          }
          100% {
            width: 250px;
          }
        }
        @keyframes offscreen {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-200%);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimateLoad;
