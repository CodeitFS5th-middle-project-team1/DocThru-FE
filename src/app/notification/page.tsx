import TestNotification from './components/NotificationItem';

export default async function NotificationsPage() {
  return (
    <main className="p-10">
      <h1 className="text-2xl mb-4">Notification 테스트</h1>
      <TestNotification />
    </main>
  );
}
