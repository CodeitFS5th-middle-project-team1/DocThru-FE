export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] text-gray-400 py-6 px-4 md:px-20 border-t border-gray-700">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
        {/* 왼쪽 */}
        <div className="flex items-center space-x-2">
          <span className="text-yellow-400 font-mono text-xl ">{'</>'}</span>
          <span>© 2025 Docthru.</span>
          <span className="italic">All bugs reserved.</span>
          {/* 둘중에 하나  <span className="italic">Through the docs, to the dev.</span> */}
        </div>

        {/* 오른쪽 링크 */}
        <div className="flex flex-col items-end space-y-1 text-xs text-gray-500">
          <div className="flex space-x-4 text-sm text-gray-400">
            <a
              href="https://github.com/CodeitFS5th-middle-project-team1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              GitHub
            </a>
            <a
              href="/main/privacy-policy"
              className="hover:text-white transition"
            >
              Privacy
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&to=service@docthru.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              Contact
            </a>
          </div>
          <span className="hidden md:inline font-mono text-xs text-gray-5s00">
            Built by 김승우 · 최은비 · 이동혁 · 김조순 · 김희성 · 윤민호
          </span>
        </div>
      </div>
    </footer>
  );
}
