type Lead = {
  id: string;
  name: string;
  email: string;
  service?: string | null;
  createdAt: Date;
};

type Props = {
  leads: Lead[];
};

export default function RecentLeadsTable({ leads }: Props) {
  return (
    <div className="card-base overflow-hidden">
      <div className="card-padding border-b border-surface-100">
        <h2 className="text-h6 font-bold text-brand-900">آخر الرسائل</h2>
      </div>
      {leads.length === 0 ? (
        <div className="card-padding text-center">
          <p className="text-body text-surface-500">لا توجد رسائل بعد.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-100">
                <th className="text-start p-4 font-semibold text-surface-500 uppercase tracking-wider text-caption">الاسم</th>
                <th className="text-start p-4 font-semibold text-surface-500 uppercase tracking-wider text-caption">البريد</th>
                <th className="text-start p-4 font-semibold text-surface-500 uppercase tracking-wider text-caption">الخدمة</th>
                <th className="text-start p-4 font-semibold text-surface-500 uppercase tracking-wider text-caption">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-surface-100 hover:bg-surface-50/50 transition-colors">
                  <td className="p-4 text-body font-medium text-brand-900">{lead.name}</td>
                  <td className="p-4 text-body-sm text-surface-600">{lead.email}</td>
                  <td className="p-4 text-body-sm text-surface-600">{lead.service || "-"}</td>
                  <td className="p-4 text-body-sm text-surface-500">
                    {new Date(lead.createdAt).toLocaleDateString("ar")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}