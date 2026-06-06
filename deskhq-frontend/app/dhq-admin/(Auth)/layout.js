export default function DHQAuthLayout({ children }) {
  return (
    <div className="dhq-admin-login min-h-screen flex flex-col items-center justify-center bg-[url('/assets/dhq-admin/auth/bg.webp')] bg-center bg-cover bg-no-repeat">
      <div className="max-w-113 min-w-113 p-10 rounded-4xl shadow-[0px_0px_4px_0px_#00000040] bg-white/30 border-white border">{children}</div>
    </div>
  );
}

