"use client";
export default function ContactPage() {
  return (
    <section className="section">
      <div className="container">

        <div className="section-header">
          <h2 className="section-title">اتصل بنا</h2>
          <p className="section-desc">نحن هنا لمساعدتك</p>
        </div>

        <div className="contact-grid">

          {/* INFO */}
          <div>

            <div className="contact-info-card">
              <div className="contact-info-icon">📍</div>
              <div>
                <h4>الموقع</h4>
                <p>تعز - اليمن</p>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon">📧</div>
              <div>
                <h4>البريد</h4>
                <p>tamammedia9@gmail.com</p>
              </div>
            </div>

          </div>

          {/* FORM */}
          <form className="contact-form">

            <div className="form-group">
              <label>الاسم</label>
              <input type="text" />
            </div>

            <div className="form-group">
              <label>الهاتف</label>
              <input type="tel" />
            </div>

            <div className="form-group">
              <label>الرسالة</label>
              <textarea></textarea>
            </div>

            <button className="btn btn-primary" style={{ width: "100%" }}>
              إرسال
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}