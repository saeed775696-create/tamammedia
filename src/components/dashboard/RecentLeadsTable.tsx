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
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-3">آخر الرسائل</h2>
      {leads.length === 0 ? (
        <p className="text-gray-400">لا توجد رسائل بعد.</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">الاسم</th>
              <th className="text-left p-2">البريد</th>
              <th className="text-left p-2">الخدمة</th>
              <th className="text-left p-2">التاريخ</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b">
                <td className="p-2">{lead.name}</td>
                <td className="p-2">{lead.email}</td>
                <td className="p-2">{lead.service || "-"}</td>
                <td className="p-2">
                  {new Date(lead.createdAt).toLocaleDateString("ar")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}