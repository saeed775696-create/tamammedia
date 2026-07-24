type Props = {
  leads: number;
  portfolio: number;
  whatsapp: number;
};

export default function StatsCards({ leads, portfolio, whatsapp }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white p-4 rounded shadow">
        <p className="text-gray-500">إجمالي الرسائل</p>
        <p className="text-3xl font-bold">{leads}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-gray-500">الأعمال</p>
        <p className="text-3xl font-bold">{portfolio}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-gray-500">نقرات واتساب</p>
        <p className="text-3xl font-bold">{whatsapp}</p>
      </div>
    </div>
  );
}