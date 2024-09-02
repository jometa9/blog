import "../admin.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <p>
        Joaquin Metayer admin
      </p>
      {children}
    </>
  );
}
