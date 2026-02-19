import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import API from "../../services/api";

function Scanner() {
  const scannerRef = useRef(null);
  const html5QrRef = useRef(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const startScanner = async () => {
      // wait for DOM to render first
      await new Promise((res) => setTimeout(res, 300));

      if (!isMounted) return;

      try {
        html5QrRef.current = new Html5Qrcode("reader");

        await html5QrRef.current.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 250 },
          async (decodedText) => {
            try {
              const token = localStorage.getItem("token");

              const res = await API.post(
                "/events/scan",
                { ticketId: decodedText },
                { headers: { Authorization: `Bearer ${token}` } }
              );

              setMessage(res.data.message);
            } catch {
              setMessage("Invalid Ticket ❌");
            }
          }
        );
      } catch (err) {
        console.log("Scanner start error:", err);
      }
    };

    startScanner();

    // ⭐ SAFE CLEANUP
    return () => {
      isMounted = false;

      if (html5QrRef.current) {
        html5QrRef.current
          .stop()
          .then(() => html5QrRef.current.clear())
          .catch(() => {});
      }
    };
  }, []);

  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold mb-8">QR Ticket Scanner 📷</h1>

      <div className="max-w-md mx-auto bg-slate-800 p-6 rounded-3xl shadow-xl">
        <div
          id="reader"
          ref={scannerRef}
          className="rounded-xl overflow-hidden"
        />

        {message && (
          <div className="mt-6 text-xl bg-slate-900 p-4 rounded-xl">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Scanner;
