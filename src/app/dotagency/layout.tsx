import './dotagency.css'

export const metadata = {
  title: 'dotAgency',
  icons: {
    icon: '/dotagency-favicon.ico',
  },
};

export default function DotAgencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div>
        {children}
      </div>
  );
}
