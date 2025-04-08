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
    status: string; // ApprovalStatusLabels 값 중
    id: string;
  }[];
}

const ChallengeTable = ({ data }: ChallengeTableProps) => {
  const router = useRouter();

  return (
    <div className="overflow-x-auto relative shadow-md">
      {/*  헤더 */}
      <div className="flex justify-between gap-3 md:gap-0 whitespace-nowrap text-[13px] bg-gray-800 text-white py-2 px-3 rounded-lg">
        <span className="flex-1">No.</span>
        <span className="flex-[1.2]">분야</span>
        <span className="flex-[1.3]">카테고리</span>
        <span className="flex-[3.5]">챌린지 제목</span>
        <span className="flex-[1.2]">모집 인원</span>
        <span className="flex-[1.3]">신청일</span>
        <span className="flex-[1.3]">마감 기한</span>
        <span className="flex-[1.5]">상태</span>
      </div>

      {/* 테이블 */}
      <table className="w-full">
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              onClick={() => router.push(`/main/challenge/${row.id}`)}
              className={`cursor-pointer hover:text-gray-800 hover:bg-indigo-50 transition-colors duration-200
                flex justify-between whitespace-nowrap border-b border-gray-300 text-[13px] px-3 py-4 text-gray-400 ${
                  row.status === ApprovalStatusLabels.DELETED
                    ? 'bg-[#F5f5f5]'
                    : 'bg-white'
                }`}
            >
              <td className="flex-1">{row.no}</td>
              <td className="flex-[1.2]">{row.type}</td>
              <td className="flex-[1.3]">{row.category}</td>
              <td className="flex-[3.5] overflow-hidden text-overflow-ellipsis whitespace-nowrap mr-3">
                <span>{row.title}</span>
              </td>
              <td className="flex-[1.2] pl-2">{row.people}</td>
              <td className="flex-[1.3]">{row.createdAt}</td>
              <td className="flex-[1.3]">{row.deadline}</td>
              <td className="flex-[1.5]">
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
