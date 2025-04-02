import '@shared/globals.css';

export default function ChallengeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col pt-7 pb-28 gap-4">{children}</section>
  );
}
