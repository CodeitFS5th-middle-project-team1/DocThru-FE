import '@shared/globals.css';

export default function ChallengeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex gap-4 flex-col px-4 md:px-6 xl:px-[28.875rem] pt-20 pb-28">
      {children}
    </section>
  );
}
