type Props = {
  leads: number;
  portfolio: number;
  whatsapp: number;
};

export default function StatsCards({ leads, portfolio, whatsapp }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="card-base card-padding">
        <p className="text-body-sm text-surface-500 mb-1">إجمالي الرسائل</p>
        <p className="text-h3 font-extrabold text-brand-900">{leads}</p>
      </div>
      <div className="card-base card-padding">
        <p className="text-body-sm text-surface-500 mb-1">الأعمال</p>
        <p className="text-h3 font-extrabold text-brand-900">{portfolio}</p>
      </div>
      <div className="card-base card-padding">
        <p className="text-body-sm text-surface-500 mb-1">نقرات واتساب</p>
        <p className="text-h3 font-extrabold text-brand-900">{whatsapp}</p>
      </div>
    </div>
  );
}