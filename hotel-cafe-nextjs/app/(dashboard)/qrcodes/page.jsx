import Header from '@/app/components/dashboard/Header';
import QRCodes from '@/app/components/dashboard/QRCodes';

export default function QRCodesPage() {
  return (
    <>
      <Header 
        title="QR Code Management" 
        subtitle="Generate, track, and manage table QR codes" 
      />
      <QRCodes />
    </>
  );
}
