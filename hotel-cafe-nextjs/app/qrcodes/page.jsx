import Header from '@/app/components/Header';
import QRCodes from '@/app/components/QRCodes';

export default function QRCodesPage() {
  return (
    <>
      <Header title="QR Codes" subtitle="Generate and manage QR codes for tables" />
      <QRCodes />
    </>
  );
}
