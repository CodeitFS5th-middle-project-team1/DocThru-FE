import '@shared/globals.css';

export default function ChallengeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex gap-4 flex-col pt-6 pb-28">{children}</section>
  );
}
