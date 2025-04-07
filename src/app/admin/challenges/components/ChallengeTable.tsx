import { Chip } from '@/shared/components/chip/chip';

const ChallengeTable = ({ data }) => {
  return (
    <div className="overflow-x-auto relative shadow-md ">
      <div className="flex justify-between gap-3 md:gap-0 whitespace-nowrap text-[15px] bg-gray-800 text-white py-2 px-3 rounded-lg">
        <span className="flex-1">No.</span>
        <span className="flex-[1.2]">분야</span>
        <span className="flex-[1.3] ">카테고리</span>
        <span className="flex-5">챌린지 제목</span>
        <span className="flex-[1.2]">모집 인원</span>
        <span className="flex-[1.3]">신청일</span>
        <span className="flex-[1.3]">마감 기한</span>
        <span className="flex-[1.5]">상태</span>
      </div>

      <table className="w-full">
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="flex justify-between whitespace-nowrap bg-white border-b border-gray-400  text-sm px-3 py-4 text-gray-400"
            >
              <td className="flex-1">{row.no}</td>
              <td className="flex-[1.2]">{row.type}</td>
              <td className="flex-[1.3] ">{row.category}</td>
              <td className="flex-5 overflow-hidden text-overflow-ellipsis whitespace-nowrap mr-3">
                {row.title}
              </td>
              <td className="flex-[1.2] pl-2">{row.people}</td>
              <td className="flex-[1.3]">{row.createdAt}</td>
              <td className="flex-[1.3]">{row.deadline}</td>
              <td className="flex-[1.5] ">
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
