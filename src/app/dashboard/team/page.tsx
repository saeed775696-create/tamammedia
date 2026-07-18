"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit2, Users } from "lucide-react";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio?: string;
  imageUrl?: string;
  order: number;
};

const emptyForm = {
  name: "",
  role: "",
  bio: "",
  imageUrl: "",
  order: 0,
};

export default function TeamDashboard() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/team");
      if (res.ok) {
        const data = await res.json();
        // تأكد أن البيانات مصفوفة
        setMembers(Array.isArray(data) ? data : []);
      } else {
        setMembers([]);
      }
    } catch (err) {
      console.error(err);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا العضو؟")) return;
    try {
      const res = await fetch(`/api/team/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMembers((prev) => prev.filter((m) => m.id !== id));
      } else {
        alert("فشل في حذف العضو");
      }
    } catch (err) {
      alert("تعذر الاتصال بالخادم");
    }
  };

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (member: TeamMember) => {
    setEditingId(member.id);
    setForm({
      name: member.name,
      role: member.role,
      bio: member.bio || "",
      imageUrl: member.imageUrl || "",
      order: member.order,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.role) return alert("الاسم والدور مطلوبان");

    const url = editingId ? `/api/team/${editingId}` : "/api/team";
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setShowModal(false);
        fetchMembers(); // إعادة تحميل القائمة
      } else {
        alert("فشل في حفظ العضو");
      }
    } catch (err) {
      alert("تعذر الاتصال بالخادم");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "order" ? Number(value) : value,
    }));
  };

  // --- واجهة المستخدم ---
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">الفريق</h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#da8827] text-white px-5 py-3 rounded-xl hover:bg-[#c07520] transition shadow-lg shadow-[#da8827]/20"
        >
          <Plus size={18} />
          إضافة عضو
        </button>
      </div>

      {loading ? (
        <p className="text-center py-12 text-gray-400">جار التحميل...</p>
      ) : !Array.isArray(members) || members.length === 0 ? (
        <div className="text-center py-12">
          <Users size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-400">لا يوجد أعضاء بعد. أضف أول عضو!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition"
            >
              <div className="p-6 text-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#21214f] to-[#3a3a7a] flex items-center justify-center mb-4 border-4 border-[#da8827] shadow-lg">
                  {member.imageUrl ? (
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement!.innerHTML =
                          member.name.charAt(0);
                      }}
                    />
                  ) : (
                    <span className="text-2xl font-bold text-[#da8827]">
                      {member.name.charAt(0)}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-lg text-gray-800">
                  {member.name}
                </h3>
                <p className="text-sm text-[#da8827] font-medium mt-1">
                  {member.role}
                </p>
                {member.bio && (
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                    {member.bio}
                  </p>
                )}
                <div className="flex justify-center gap-2 mt-4">
                  <button
                    onClick={() => openEdit(member)}
                    className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                  >
                    <Edit2 size={14} /> تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="flex items-center gap-1 text-sm text-red-500 hover:underline"
                  >
                    <Trash2 size={14} /> حذف
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* المودال المنبثق */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-6">
              {editingId ? "تعديل العضو" : "إضافة عضو جديد"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">الاسم *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">المسمى الوظيفي *</label>
                <input
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-2"
                  placeholder="مثال: المدير التنفيذي"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">نبذة</label>
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-2"
                  rows={3}
                  placeholder="خبرة قصيرة..."
                />
              </div>
              <div>
                <label className="block text-sm mb-1">رابط الصورة</label>
                <input
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-2"
                  placeholder="/imgs/teampics/saeed.png"
                />
                {form.imageUrl && (
                  <img
                    src={form.imageUrl}
                    alt="معاينة"
                    className="mt-2 h-16 w-16 object-cover rounded-full border-2 border-[#da8827]"
                  />
                )}
              </div>
              <div>
                <label className="block text-sm mb-1">الترتيب</label>
                <input
                  type="number"
                  name="order"
                  value={form.order}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-2"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6 border-t pt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
              >
                إلغاء
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-[#da8827] text-white rounded-xl hover:bg-[#c07520]"
              >
                {editingId ? "حفظ التعديلات" : "إضافة العضو"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}