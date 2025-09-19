// Supabase setup
const SUPABASE_URL = "https://YOUR_PROJECT.supabase.co";
const SUPABASE_KEY = "YOUR_ANON_KEY";
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Form handling
const form = document.getElementById("shipmentForm");
const responseMsg = document.getElementById("responseMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const shipmentData = Object.fromEntries(formData.entries());

  // Generate random tracking number
  shipmentData.tracking_number = "AOL" + Math.floor(Math.random() * 1000000);

  const { data, error } = await supabase
    .from("shipments")
    .insert([shipmentData]);

  if (error) {
    responseMsg.textContent = "❌ Error: " + error.message;
    responseMsg.className = "text-red-600 text-center mt-6";
  } else {
    responseMsg.textContent = `✅ Shipment submitted! Tracking Number: ${shipmentData.tracking_number}`;
    responseMsg.className = "text-green-600 text-center mt-6";
    form.reset();
  }
});
