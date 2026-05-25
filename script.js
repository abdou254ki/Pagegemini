/*
  عدّل هذا الرقم إلى رقم واتساب الخاص بك.
  اكتب الرقم بصيغة دولية بدون + وبدون مسافات.

  مثال الجزائر:
  213550000000
*/

const WHATSAPP_NUMBER = "213550000000";

/* فتح وإغلاق قائمة الهاتف */
const menu = document.getElementById("menu");
const mobileBtn = document.getElementById("mobileBtn");

if (mobileBtn && menu) {
  mobileBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
}

/* إغلاق القائمة عند الضغط على أي رابط */
document.querySelectorAll(".menu a").forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
  });
});

/* عرض اسم ملف وصل الدفع */
const receiptInput = document.getElementById("receipt");
const filePreview = document.getElementById("filePreview");

if (receiptInput && filePreview) {
  receiptInput.addEventListener("change", () => {
    if (receiptInput.files.length > 0) {
      filePreview.textContent = "تم اختيار الملف: " + receiptInput.files[0].name;
    } else {
      filePreview.textContent = "PNG / JPG / PDF";
    }
  });
}

/* معالجة نموذج الطلب */
const form = document.getElementById("orderForm");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const plan = document.getElementById("plan").value;
    const paymentMethod = document.getElementById("paymentMethod").value;
    const notes = document.getElementById("notes").value.trim();
    const receipt = receiptInput.files[0];

    let valid = true;

    hideErrors();

    if (name.length < 3) {
      showError("nameError");
      valid = false;
    }

    if (!/^[0-9+\s-]{8,20}$/.test(phone)) {
      showError("phoneError");
      valid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError("emailError");
      valid = false;
    }

    if (!plan) {
      showError("planError");
      valid = false;
    }

    if (!paymentMethod) {
      showError("paymentError");
      valid = false;
    }

    if (!receipt) {
      showError("receiptError");
      valid = false;
    }

    if (!valid) return;

    const successMessage = document.getElementById("successMessage");
    if (successMessage) {
      successMessage.style.display = "block";
    }

    const message =
`طلب جديد - Gemini Pro

الاسم: ${name}
رقم الهاتف: ${phone}
الإيميل: ${email}
مدة الاشتراك: ${plan}
طريقة الدفع: ${paymentMethod}
اسم ملف الوصل: ${receipt ? receipt.name : "لم يتم إرفاقه"}
ملاحظات: ${notes || "لا توجد"}

أرجو تأكيد الطلب وتفعيل الخدمة.`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 800);
  });
}

/* إظهار رسالة الخطأ */
function showError(id) {
  const error = document.getElementById(id);

  if (error) {
    error.style.display = "block";
  }
}

/* إخفاء جميع رسائل الخطأ */
function hideErrors() {
  document.querySelectorAll(".error").forEach(error => {
    error.style.display = "none";
  });
}

/* فتح وإغلاق الأسئلة الشائعة */
document.querySelectorAll(".faq-question").forEach(question => {
  question.addEventListener("click", () => {
    const item = question.parentElement;
    item.classList.toggle("active");
  });
});

/* فتح نافذة سياسة الخصوصية أو الشروط */
function openModal(type) {
  const modal = document.getElementById("modal");
  const modalText = document.getElementById("modalText");

  if (!modal || !modalText) return;

  if (type === "privacy") {
    modalText.innerHTML = `
      <h3>سياسة الخصوصية</h3>
      <p>
        نحن نحترم خصوصيتك. يتم جمع المعلومات التي تدخلها في نموذج الطلب مثل الاسم،
        رقم الهاتف، البريد الإلكتروني، وبيانات الدفع فقط لغرض معالجة الطلب والتواصل معك.
      </p>
      <p>
        لا نقوم ببيع أو مشاركة بياناتك مع أي طرف خارجي، ويتم استخدام المعلومات فقط
        لتأكيد الطلب وتقديم الدعم اللازم.
      </p>
      <p>
        عند رفع وصل الدفع، يتم استخدامه فقط للتحقق من عملية الدفع. ننصح بعدم إرسال
        أي معلومات حساسة غير مطلوبة.
      </p>
    `;
  }

  if (type === "terms") {
    modalText.innerHTML = `
      <h3>الشروط والأحكام</h3>
      <p>
        بإرسال الطلب، أنت تؤكد أن البيانات المدخلة صحيحة وأن وصل الدفع المرفق يعود
        إلى عملية الدفع الخاصة بطلبك.
      </p>
      <p>
        يتم تفعيل الخدمة بعد مراجعة الطلب والتحقق من الدفع. مدة المعالجة قد تختلف
        حسب الضغط وتوفر الخدمة.
      </p>
      <p>
        لا يتم اعتبار الطلب مؤكدًا إلا بعد التواصل معك عبر واتساب وتأكيد عملية الدفع.
      </p>
    `;
  }

  modal.classList.add("active");
}

/* إغلاق النافذة */
function closeModal() {
  const modal = document.getElementById("modal");

  if (modal) {
    modal.classList.remove("active");
  }
}

/* إغلاق النافذة عند الضغط خارجها */
window.addEventListener("click", (e) => {
  const modal = document.getElementById("modal");

  if (e.target === modal) {
    closeModal();
  }
});
