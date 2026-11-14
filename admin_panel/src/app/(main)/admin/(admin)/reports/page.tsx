import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminReportsPage() {
  return (
    <Card>
      <CardHeader><CardTitle>Raporlar</CardTitle></CardHeader>
      <CardContent>
        Bu kurulumda raporlama API’si henüz bağlı değil. Kullanım ve istek kayıtlarını
        Denetim Kayıtları ekranından, genel sayıları kontrol panelinden inceleyebilirsiniz.
      </CardContent>
    </Card>
  );
}
