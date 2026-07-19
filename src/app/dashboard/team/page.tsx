"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit2, Users } from "lucide-react";
import toast from "react-hot-toast";
import ImageUpload from "@/components/dashboard/ImageUpload";

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
        setMembers(Array.isArray(data) ? data : []);
      } else {
        setMembers([]);
      }
    } catch {
      toast.error("حدث خطأ في جلب بيانات الفريق");
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
    const loadingToast = toast.loading("جاري الحذف...");
    try {
      const res = await fetch(`/api/team/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMembers((prev) => prev.filter((m) => m.id !== id));
        toast.success("تم حذف العضو بنجاح", { id: loadingToast });
      } else {
        throw new Error("فشل الحذف");
      }
    } catch {
      toast.error("حدث خطأ أثناء الحذف", { id: loadingToast });
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
      name: member.name || "",
      role: member.role || "",
      bio: member.bio || "",
      imageUrl: member.imageUrl || "",
      order: member.order || 0,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.role) {
      toast.error("الاسم والمسمى الوظيفي مطلوبان");
      return;
    }

    const loadingToast = toast.loading("جاري الحفظ...");
    const url = editingId ? `/api/team/${editingId}` : "/api/team";
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success(editingId ? "تم تعديل العضو بنجاح" : "تم إضافة العضو بنجاح", { id: loadingToast });
        setShowModal(false);
        fetchMembers();
      } else {
        throw new Error("فشل الحفظ");
      }
    } catch {
      toast.error("حدث خطأ أثناء الحفظ", { id: loadingToast });
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

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#21214f] mb-2">الفريق</h1>
          <p className="text-gray-500">إدارة أعضاء فريق العمل</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#da8827] text-white px-6 py-3 rounded-xl hover:bg-[#b8701e] transition-all shadow-lg shadow-[#da8827]/30 font-medium"
        >
          <Plus size={20} />
          إضافة عضو جديد
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#da8827]"></div>
        </div>
      ) : members.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
          <Users size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-xl text-gray-500">لا يوجد أعضاء بعد</p>
          <button onClick={openAdd} className="mt-4 text-[#da8827] hover:underline font-medium">أضف العضو الأول</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {members.sort((a, b) => a.order - b.order).map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group relative"
            >
              <div className="p-6 text-center">
                <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-[#21214f] to-[#3a3a7a] flex items-center justify-center mb-4 border-4 border-[#da8827]/20 group-hover:border-[#da8827] transition-colors duration-300 overflow-hidden shadow-md">
                  {member.imageUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        if (e.currentTarget.parentElement) {
                          e.currentTarget.parentElement.innerHTML = `<span class="text-3xl font-bold text-white">${member.name.charAt(0)}</span>`;
                        }
                      }}
                    />
                  ) : (
                    <span className="text-3xl font-bold text-white">
                      {member.name.charAt(0)}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-lg text-[#21214f] line-clamp-1">
                  {member.name}
                </h3>
                <p className="text-sm text-[#da8827] font-medium mt-1 line-clamp-1">
                  {member.role}
                </p>
                {member.bio && (
                  <p className="text-xs text-gray-500 mt-3 line-clamp-2">
                    {member.bio}
                  </p>
                )}
                
                <div className="absolute top-3 right-3 bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full font-medium shadow-sm">
                  ترتيب: {member.order}
                </div>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white to-transparent pt-12 pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center gap-3">
                  <button
                    onClick={() => openEdit(member)}
                    className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    title="تعديل"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    title="حذف"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-[#21214f]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl my-8 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 md:p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-2xl font-bold text-[#21214f]">
                {editingId ? "تعديل بيانات العضو" : "إضافة عضو جديد"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-red-500 transition-colors p-2 bg-white rounded-full shadow-sm">
                <Trash2 size={20} className="hidden" />
                <span className="font-bold text-xl leading-none">&times;</span>
              </button>
            </div>
            
            <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-6 custom-scrollbar">
              
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <ImageUpload 
                  value={form.imageUrl} 
                  onChange={(url) => setForm({ ...form, imageUrl: url })} 
                  label="صورة العضو الشخصية" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الاسم *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#da8827] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">المسمى الوظيفي *</label>
                  <input
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#da8827] outline-none transition-all"
                    placeholder="مثال: المدير التنفيذي"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">نبذة قصيرة</label>
                  <textarea
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#da8827] outline-none transition-all resize-none"
                    rows={3}
                    placeholder="وصف مختصر للخبرات..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الترتيب</label>
                  <input
                    type="number"
                    name="order"
                    value={form.order}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#da8827] outline-none transition-all"
                    min="0"
                  />
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-3xl">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={handleSave}
                className="px-8 py-3 bg-[#da8827] text-white font-medium rounded-xl hover:bg-[#b8701e] transition-all shadow-md shadow-[#da8827]/20"
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