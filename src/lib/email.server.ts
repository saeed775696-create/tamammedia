import nodemailer from "nodemailer";

function getTransportConfig() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT || 587);

  if (!host || !user || !pass || !Number.isInteger(port)) {
    throw new Error("SMTP is not configured");
  }

  return {
    host,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: { user, pass },
    from: process.env.SMTP_FROM || user,
  };
}

export async function sendAdminPasswordResetCode({ to, code }: { to: string; code: string }) {
  const config = getTransportConfig();
  const transport = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth,
    disableFileAccess: true,
    disableUrlAccess: true,
  });

  await transport.sendMail({
    from: config.from,
    to,
    subject: "رمز استعادة كلمة مرور لوحة التحكم",
    text: `رمز استعادة كلمة المرور هو: ${code}\nينتهي الرمز خلال 10 دقائق. إذا لم تطلب هذا الرمز، تجاهل هذه الرسالة.`,
    html: `
      <div dir="rtl" style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:32px;color:#21214f">
        <h1 style="margin:0 0 16px">استعادة كلمة المرور</h1>
        <p style="line-height:1.8">استخدم الرمز التالي لاستعادة كلمة مرور مدير لوحة التحكم:</p>
        <p style="margin:24px 0;padding:18px;background:#f7f7fb;border-radius:12px;font-size:28px;font-weight:800;letter-spacing:8px;text-align:center" dir="ltr">${code}</p>
        <p style="line-height:1.8;color:#5f6475">ينتهي الرمز خلال 10 دقائق ويمكن استخدامه مرة واحدة فقط. إذا لم تطلبه، تجاهل الرسالة ولا تشاركه مع أي شخص.</p>
      </div>
    `,
  });
}

export async function sendAccountEmailChangeCode({ to, code }: { to: string; code: string }) {
  const config = getTransportConfig();
  const transport = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth,
    disableFileAccess: true,
    disableUrlAccess: true,
  });

  await transport.sendMail({
    from: config.from,
    to,
    subject: "رمز تأكيد بريد لوحة التحكم",
    text: `رمز تأكيد البريد الإلكتروني الجديد هو: ${code}\nينتهي الرمز خلال 10 دقائق. إذا لم تطلب تغيير البريد، تجاهل هذه الرسالة.`,
    html: `
      <div dir="rtl" style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:32px;color:#21214f">
        <h1 style="margin:0 0 16px">تأكيد البريد الإلكتروني</h1>
        <p style="line-height:1.8">استخدم الرمز التالي لتأكيد البريد الإلكتروني الجديد للوصول إلى لوحة التحكم:</p>
        <p style="margin:24px 0;padding:18px;background:#f7f7fb;border-radius:12px;font-size:28px;font-weight:800;letter-spacing:8px;text-align:center" dir="ltr">${code}</p>
        <p style="line-height:1.8;color:#5f6475">ينتهي الرمز خلال 10 دقائق ويمكن استخدامه مرة واحدة فقط. إذا لم تطلب التغيير، تجاهل هذه الرسالة.</p>
      </div>
    `,
  });
}

export async function sendAccountEmailChangedNotice({ to, newEmail }: { to: string; newEmail: string }) {
  const config = getTransportConfig();
  const transport = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth,
    disableFileAccess: true,
    disableUrlAccess: true,
  });

  await transport.sendMail({
    from: config.from,
    to,
    subject: "تم تغيير بريد حساب لوحة التحكم",
    text: `تم تغيير بريد حساب لوحة التحكم إلى: ${newEmail}\nإذا لم تكن أنت من طلب ذلك، تواصل مع مسؤول الموقع فورًا.`,
    html: `
      <div dir="rtl" style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:32px;color:#21214f">
        <h1 style="margin:0 0 16px">تنبيه أمني</h1>
        <p style="line-height:1.8">تم تغيير بريد حساب لوحة التحكم إلى:</p>
        <p style="font-weight:800" dir="ltr">${newEmail}</p>
        <p style="line-height:1.8;color:#5f6475">إذا لم تكن أنت من طلب هذا التغيير، تواصل مع مسؤول الموقع فورًا.</p>
      </div>
    `,
  });
}
