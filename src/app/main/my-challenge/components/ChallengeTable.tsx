import { Chip } from '@/shared/components/chip/chip';
import { ApprovalStatusLabels } from '@/types';
import { useRouter } from 'next/navigation';

interface ChallengeTableProps {
  data: {
    no: number;
    type: string;
    category: string;
    title: string;
    people: number;
    createdAt: string;
    deadline: string;
    status: string;
    id: string;
  }[];
}
export const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A';

  // 날짜 형식 변경
  const cleaned = dateString.trim().replace(/\s+/g, '').replace(/\.$/, '');
  return cleaned.replace(/\./g, '/');
};
const ChallengeTable = ({ data }: ChallengeTableProps) => {
  const router = useRouter();

  return (
    <div className="overflow-x-auto relative shadow-md">
      {/*  헤더 */}
      <div className="whitespace-nowrap grid grid-cols-[0.8fr_1.3fr_1.7fr_0fr_3.6fr_0.2fr_1fr_0fr_1.3fr_1.3fr_1.5fr] gap-1 text-[13px] bg-custom-gray-800 text-white py-2 px-3 rounded-lg min-w-[640px]">
        <span>No.</span>
        <span>분야</span>
        <span>카테고리</span>
        <span></span>
        <span>챌린지 제목</span>
        <span></span>
        <span>모집 인원</span>
        <span></span>
        <span className="text-center">신청일</span>
        <span className="text-center">마감 기한</span>
        <span className="pl-4">상태</span>
      </div>

      {/* 테이블 */}
      <table className="w-full min-w-[640px]">
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              onClick={() => {
                console.log('row.id on click:', row.id);
                router.push(`/main/challenge/${row.id}`);
              }}
              className={`grid grid-cols-[0.8fr_1.3fr_1.7fr_0fr_3.5fr_0.2fr_1fr_0.2fr_1.3fr_1.3fr_1.5fr] gap-1 text-[13px] px-3 py-4 border-b border-gray-300 text-gray-400 cursor-pointer hover:text-gray-800 hover:bg-indigo-50 transition-colors duration-200 ${
                row.status === ApprovalStatusLabels.DELETED
                  ? 'bg-[#F5f5f5]'
                  : 'bg-white'
              }`}
            >
              <td>{row.no}</td>
              <td>{row.type}</td>
              <td>{row.category}</td>
              <td></td>
              <td className="truncate">{row.title}</td>
              <td></td>
              <td className="text-center">{row.people}</td>
              <td></td>
              <td className="text-center whitespace-pre-line">
                {formatDate(row.createdAt)}
              </td>
              <td className="text-center whitespace-pre-line">
                {formatDate(row.deadline)}
              </td>
              <td>
                <Chip label={row.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChallengeTable;
