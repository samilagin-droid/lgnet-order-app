import { useMemo, useState } from "react";
import {
  Menu,
  CheckCircle2,
  Smartphone,
  Wifi,
  Send,
  Mail,
  FileText,
  Upload,
  ShieldCheck,
  Globe,
  User,
  CalendarDays,
  Building2,
} from "lucide-react";

export default function LGnetPreisplanApp() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [porting, setPorting] = useState("yes");
  const [portingType, setPortingType] = useState("end_of_contract");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [idFileName, setIdFileName] = useState("");

  const [formData, setFormData] = useState({
    salutation: "",
    birthDate: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    zip: "",
    city: "",
    idType: "",
    country: "",
    documentNumber: "",
    currentNumber: "",
    currentProvider: "",
    desiredDate: "",
    remarks: "",
  });

  const plans = useMemo(
    () => [
      {
        id: "mobile-s",
        name: "LGnet Mobile S",
        price: "CHF 29.95",
        tone: "from-lime-600 to-green-700",
        badge: "Der smarte Einstieg",
        data: ["Unlimitiert in der Schweiz", "1 GB EU / Zone 1"],
        calls: ["Unlimitiert in der Schweiz"],
        note: "Ideal für Alltag & Basis-Nutzung",
      },
      {
        id: "mobile-m",
        name: "LGnet Mobile M",
        price: "CHF 39.95",
        tone: "from-blue-600 to-indigo-700",
        badge: "Mehr Freiheit. Mehr Europa.",
        data: ["Unlimitiert in der Schweiz", "10 GB EU / Zone 1+2"],
        calls: ["Unlimitiert in der Schweiz", "1'000 Min. CH → EU / Zone 1"],
        note: "Perfekt für Vieltelefonierer & Europa-Reisende",
      },
      {
        id: "mobile-l",
        name: "LGnet Mobile L",
        price: "CHF 49.95",
        tone: "from-violet-600 to-purple-700",
        badge: "Für Vielnutzer & Reisende",
        data: ["Unlimitiert in der Schweiz", "30 GB EU / Zone 1+2", "3 GB pro Jahr Zone 3"],
        calls: ["Unlimitiert in der Schweiz", "Unlimitiert CH → EU / Zone 1", "200 Min. CH → Zone 2"],
        note: "Stark für Business & internationale Nutzung",
      },
      {
        id: "mobile-xl",
        name: "LGnet Mobile XL",
        price: "CHF 59.95",
        tone: "from-rose-600 to-red-700",
        badge: "Maximale Freiheit weltweit",
        data: ["Unlimitiert in der Schweiz", "50 GB EU / Zone 1+2", "5 GB pro Jahr Zone 3"],
        calls: ["Unlimitiert in der Schweiz", "Unlimitiert CH → EU / Zone 1", "300 Min. CH → Zone 2"],
        note: "Premiumlösung für höchste Ansprüche",
      },
    ],
    []
  );

  const selectedPlan = plans.find((p) => p.id === selectedPlanId) || null;

  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const validationErrors = useMemo(() => {
    const errors = [];
    if (!selectedPlanId) errors.push("Preisplan fehlt");
    if (!formData.salutation) errors.push("Anrede fehlt");
    if (!formData.firstName) errors.push("Vorname fehlt");
    if (!formData.lastName) errors.push("Nachname fehlt");
    if (!formData.email) errors.push("E-Mail fehlt");
    if (!formData.phone) errors.push("Telefon fehlt");
    if (!formData.street) errors.push("Strasse fehlt");
    if (!formData.zip) errors.push("PLZ fehlt");
    if (!formData.city) errors.push("Ort fehlt");
    if (!formData.birthDate) errors.push("Geburtsdatum fehlt");
    if (!formData.idType) errors.push("ID-Typ fehlt");
    if (!formData.country) errors.push("Herkunftsland fehlt");
    if (!formData.documentNumber) errors.push("Dokumentnummer fehlt");
    if (porting === "yes" && !formData.currentNumber) errors.push("Bestehende Nummer fehlt");
    if (porting === "yes" && !formData.currentProvider) errors.push("Aktueller Anbieter fehlt");
    if (porting === "yes" && portingType === "desired_date" && !formData.desiredDate) {
      errors.push("Wunschdatum fehlt");
    }
    return errors;
  }, [formData, porting, portingType, selectedPlanId]);

  const isValid = validationErrors.length === 0;

  const applicantName = `${formData.firstName} ${formData.lastName}`.trim() || "Kunde";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    setSending(true);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    setSending(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 lg:px-10">
        <div className="rounded-[28px] border border-white/10 bg-zinc-950 shadow-2xl overflow-hidden">
          <div className="border-b border-white/10 bg-black/80 px-5 py-4 md:px-8">
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 hover:bg-zinc-800 transition"
              >
                <div className="rounded-2xl bg-black px-3 py-2 border border-white/10">
                  <img
                    src="/mnt/data/LGNET-DARKBG@4x.png"
                    alt="LGnet Logo"
                    className="h-12 md:h-16 w-auto object-contain"
                  />
                </div>
                <Menu className="h-6 w-6 text-zinc-300 group-hover:text-white" />
              </button>

              <div className="hidden md:block text-right">
                <div className="text-sm text-zinc-400">Web-Formular Version 3.0</div>
                <div className="text-lg font-medium">Preisplan auswählen • Antrag erfassen • PDF senden</div>
              </div>
            </div>

            {menuOpen && (
              <div className="mt-4 grid gap-3 md:grid-cols-4">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className="rounded-2xl border border-white/10 bg-zinc-900 p-4 text-left hover:border-white/30 hover:bg-zinc-800 transition"
                  >
                    <div className="text-sm text-zinc-400">Mobile-Abo</div>
                    <div className="mt-1 text-lg font-semibold">{plan.name}</div>
                    <div className="mt-2 text-zinc-300">{plan.price} / Monat</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="bg-zinc-50 text-zinc-900 p-5 md:p-8">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Die Mobile-Abos von LGnet</h1>
                  <p className="mt-3 text-lg md:text-2xl text-zinc-700 font-medium">
                    Stark. Transparent. Lebenslang fair.
                  </p>
                </div>
                <div className="rounded-2xl border border-zinc-200 px-4 py-3 text-right min-w-[220px] bg-white">
                  <img
                    src="/mnt/data/LGNET-DARKBG@4x.png"
                    alt="LGnet Logo"
                    className="h-14 w-auto ml-auto object-contain"
                  />
                </div>
              </div>
              </div>

              <div className="mt-8 grid gap-5 xl:grid-cols-2 2xl:grid-cols-4">
                {plans.map((plan) => {
                  const active = selectedPlan?.id === plan.id;
                  return (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedPlanId(plan.id)}
                      className={`rounded-[24px] border bg-white shadow-sm text-left overflow-hidden transition hover:shadow-lg ${
                        active ? "ring-2 ring-black border-black" : "border-zinc-200"
                      }`}
                    >
                      <div className={`bg-gradient-to-r ${plan.tone} px-5 py-4 text-white`}>
                        <div className="text-3xl font-bold">{plan.name.replace("LGnet ", "")}</div>
                      </div>

                      <div className="p-5">
                        <div className="text-2xl font-bold leading-tight min-h-[64px]">{plan.badge}</div>

                        <div className="mt-5 rounded-2xl bg-zinc-50 p-4">
                          <div className="font-semibold text-lg">Daten</div>
                          <ul className="mt-2 space-y-1 text-zinc-700">
                            {plan.data.map((item) => (
                              <li key={item}>– {item}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-4 rounded-2xl bg-zinc-50 p-4">
                          <div className="font-semibold text-lg">Telefonie</div>
                          <ul className="mt-2 space-y-1 text-zinc-700">
                            {plan.calls.map((item) => (
                              <li key={item}>– {item}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-6 flex items-end justify-between gap-3">
                          <div>
                            <div className="text-4xl font-bold">{plan.price}</div>
                            <div className="text-zinc-500">/ Monat – Lifetime-Preis</div>
                          </div>
                          <div className="rounded-full bg-zinc-900 px-3 py-2 text-sm text-white">
                            Auswählen
                          </div>
                        </div>

                        <div className="mt-5 flex items-start gap-2 text-green-700 font-medium">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                          <span>{plan.note}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3 text-base">
                <div className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-5 w-5 text-green-600" />Keine versteckten Kosten</div>
                <div className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-5 w-5 text-green-600" />Keine Preiserhöhungen nach 12 Monaten</div>
                <div className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-5 w-5 text-green-600" />Persönlicher Support</div>
              </div>

              <div className="mt-8 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
                <div className="mb-4 overflow-hidden rounded-2xl border border-zinc-200">
                  <img
                    src="/mnt/data/Image 25. Feb. 2026, 16_46_52.png"
                    alt="LGnet Mobile Abos"
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-zinc-100 p-3"><FileText className="h-5 w-5" /></div>
                  <div>
                    <div className="font-semibold text-lg">Live-Ablauf Version 3.0</div>
                    <div className="text-zinc-600">Einfacher Web-Flow für LGnet</div>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-3">
                  <div className="rounded-2xl bg-zinc-50 p-4 border border-zinc-200">
                    <div className="font-semibold">1. Preisplan wählen</div>
                    <div className="mt-1 text-sm text-zinc-600">Kunde wählt LGnet Mobile S, M, L oder XL.</div>
                  </div>
                  <div className="rounded-2xl bg-zinc-50 p-4 border border-zinc-200">
                    <div className="font-semibold">2. Daten erfassen</div>
                    <div className="mt-1 text-sm text-zinc-600">Personalien, ID, Portierung und Anbieter werden erfasst.</div>
                  </div>
                  <div className="rounded-2xl bg-zinc-50 p-4 border border-zinc-200">
                    <div className="font-semibold">3. PDF versenden</div>
                    <div className="mt-1 text-sm text-zinc-600">PDF-Kopie an Kunde und an s.agin@lgnet.ch.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-950 p-5 md:p-8 border-t lg:border-t-0 lg:border-l border-white/10">
              <div className="sticky top-4">
                <div className="flex items-center gap-3 mb-5">
                  <div className="rounded-2xl bg-white/5 p-3"><Smartphone className="h-6 w-6" /></div>
                  <div>
                    <h2 className="text-2xl font-bold">Online-Formular</h2>
                    <p className="text-zinc-400">Web-Version 3.0 mit Live-Logik als nächster Schritt</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-white/5 p-5 space-y-4">
                  <div>
                    <label className="text-sm text-zinc-400">Gewählter Preisplan</label>
                    <select
                      value={selectedPlanId}
                      onChange={(e) => setSelectedPlanId(e.target.value)}
                      className="mt-1 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none"
                    >
                      <option value="">Bitte Preisplan wählen</option>
                      {plans.map((plan) => (
                        <option key={plan.id} value={plan.id}>
                          {plan.name} – {plan.price}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="flex items-center gap-2 text-sm text-zinc-400"><User className="h-4 w-4" /> Kunde</div>
                      <div className="mt-2 text-lg font-semibold">{applicantName}</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="flex items-center gap-2 text-sm text-zinc-400"><FileText className="h-4 w-4" /> Gewähltes Abo</div>
                      <div className="mt-2 text-lg font-semibold">{selectedPlan?.name || "Noch nicht gewählt"}</div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm text-zinc-400">Anrede</label>
                      <select value={formData.salutation} onChange={(e) => updateField("salutation", e.target.value)} className="mt-1 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white">
                        <option value="">Bitte wählen</option>
                        <option>Herr</option>
                        <option>Frau</option>
                        <option>Firma</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-zinc-400">Geburtsdatum</label>
                      <div className="relative mt-1">
                        <CalendarDays className="absolute left-4 top-3.5 h-4 w-4 text-zinc-500" />
                        <input value={formData.birthDate} onChange={(e) => updateField("birthDate", e.target.value)} type="date" className="w-full rounded-2xl border border-white/10 bg-black/30 pl-11 pr-4 py-3 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm text-zinc-400">Vorname</label>
                      <input value={formData.firstName} onChange={(e) => updateField("firstName", e.target.value)} className="mt-1 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white" placeholder="Vorname" />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-400">Nachname</label>
                      <input value={formData.lastName} onChange={(e) => updateField("lastName", e.target.value)} className="mt-1 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white" placeholder="Nachname" />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm text-zinc-400">E-Mail des Kunden</label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-4 top-3.5 h-4 w-4 text-zinc-500" />
                        <input value={formData.email} onChange={(e) => updateField("email", e.target.value)} type="email" className="w-full rounded-2xl border border-white/10 bg-black/30 pl-11 pr-4 py-3 text-white" placeholder="kunde@email.ch" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-zinc-400">Telefon</label>
                      <input value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} className="mt-1 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white" placeholder="Telefonnummer" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-zinc-400">Strasse / Nr.</label>
                    <div className="relative mt-1">
                      <Building2 className="absolute left-4 top-3.5 h-4 w-4 text-zinc-500" />
                      <input value={formData.street} onChange={(e) => updateField("street", e.target.value)} className="w-full rounded-2xl border border-white/10 bg-black/30 pl-11 pr-4 py-3 text-white" placeholder="Strasse und Hausnummer" />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <label className="text-sm text-zinc-400">PLZ</label>
                      <input value={formData.zip} onChange={(e) => updateField("zip", e.target.value)} className="mt-1 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white" placeholder="PLZ" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm text-zinc-400">Ort</label>
                      <input value={formData.city} onChange={(e) => updateField("city", e.target.value)} className="mt-1 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white" placeholder="Ort" />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm text-zinc-400">ID-Typ</label>
                      <select value={formData.idType} onChange={(e) => updateField("idType", e.target.value)} className="mt-1 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white">
                        <option value="">Bitte wählen</option>
                        <option>ID / Identitätskarte</option>
                        <option>Pass</option>
                        <option>Ausländerausweis</option>
                        <option>Führerausweis</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-zinc-400">Herkunftsland</label>
                      <div className="relative mt-1">
                        <Globe className="absolute left-4 top-3.5 h-4 w-4 text-zinc-500" />
                        <select value={formData.country} onChange={(e) => updateField("country", e.target.value)} className="w-full rounded-2xl border border-white/10 bg-black/30 pl-11 pr-4 py-3 text-white">
                          <option value="">Bitte wählen</option>
                          <option>Schweiz</option>
                          <option>Deutschland</option>
                          <option>Österreich</option>
                          <option>Türkei</option>
                          <option>Italien</option>
                          <option>Frankreich</option>
                          <option>Anderes Land</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-zinc-400">Dokumentnummer</label>
                    <input value={formData.documentNumber} onChange={(e) => updateField("documentNumber", e.target.value)} className="mt-1 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white" placeholder="ID- / Passnummer" />
                  </div>

                  <div>
                    <label className="text-sm text-zinc-400">Ausweis-Upload</label>
                    <label className="mt-1 flex cursor-pointer items-center justify-between rounded-2xl border border-dashed border-white/20 bg-black/20 px-4 py-4 text-zinc-300 hover:border-white/40">
                      <span className="flex items-center gap-2"><Upload className="h-4 w-4" /> Datei auswählen</span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => setIdFileName(e.target.files?.[0]?.name || "")}
                      />
                      <span className="text-xs text-zinc-500">{idFileName || "ID / Pass / Ausweis"}</span>
                    </label>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="flex items-center gap-2 text-lg font-semibold"><Wifi className="h-5 w-5" /> Rufnummernportierung</div>

                    <div className="mt-4">
                      <label className="text-sm text-zinc-400">Möchte der Kunde seine Nummer behalten?</label>
                      <select
                        value={porting}
                        onChange={(e) => setPorting(e.target.value)}
                        className="mt-1 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white"
                      >
                        <option value="yes">Ja</option>
                        <option value="no">Nein</option>
                      </select>
                    </div>

                    {porting === "yes" && (
                      <div className="mt-4 space-y-4">
                        <div>
                          <label className="text-sm text-zinc-400">Bestehende Nummer</label>
                          <input value={formData.currentNumber} onChange={(e) => updateField("currentNumber", e.target.value)} className="mt-1 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white" placeholder="z. B. 078 123 45 67" />
                        </div>

                        <div>
                          <label className="text-sm text-zinc-400">Aktueller Anbieter</label>
                          <select value={formData.currentProvider} onChange={(e) => updateField("currentProvider", e.target.value)} className="mt-1 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white">
                            <option value="">Bitte wählen</option>
                            <option>Swisscom</option>
                            <option>Sunrise</option>
                            <option>Salt</option>
                            <option>Wingo</option>
                            <option>Yallo</option>
                            <option>Lebara</option>
                            <option>Quickline</option>
                            <option>Anderer Anbieter</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-sm text-zinc-400">Portierungstermin</label>
                          <select
                            value={portingType}
                            onChange={(e) => setPortingType(e.target.value)}
                            className="mt-1 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white"
                          >
                            <option value="end_of_contract">Auf Ende des Vertrags</option>
                            <option value="desired_date">Auf Wunschdatum</option>
                          </select>
                        </div>

                        {portingType === "desired_date" && (
                          <div>
                            <label className="text-sm text-zinc-400">Wunschdatum</label>
                            <input value={formData.desiredDate} onChange={(e) => updateField("desiredDate", e.target.value)} type="date" className="mt-1 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-zinc-400">Bemerkungen</label>
                    <textarea
                      value={formData.remarks}
                      onChange={(e) => updateField("remarks", e.target.value)}
                      rows={4}
                      className="mt-1 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white"
                      placeholder="Zusätzliche Angaben, Bemerkungen oder interne Hinweise"
                    />
                  </div>

                  {!isValid && (
                    <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-50">
                      <div className="font-semibold">Noch unvollständig</div>
                      <div className="mt-1">Bitte ergänzen:</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {validationErrors.slice(0, 8).map((err) => (
                          <span key={err} className="rounded-full bg-black/30 px-3 py-1 text-xs">{err}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-100">
                    <div className="flex items-center gap-2 font-semibold"><ShieldCheck className="h-4 w-4" /> PDF-Versand nach dem Absenden</div>
                    <div className="mt-2 space-y-1 text-emerald-50/90">
                      <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> Kunde erhält einen PDF-Antrag an: {formData.email || "kunde@email.ch"}</div>
                      <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> Interne Kopie an: s.agin@lgnet.ch</div>
                      <div className="flex items-center gap-2"><FileText className="h-4 w-4" /> PDF enthält Preisplan, Personalien und Portierungsdaten</div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!isValid || sending}
                    className="w-full rounded-2xl bg-white text-black px-5 py-4 font-semibold hover:bg-zinc-200 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                    {sending ? "PDF wird vorbereitet..." : "Antrag absenden & PDF versenden"}
                  </button>

                  {submitted && (
                    <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4 text-sm text-blue-50">
                      <div className="font-semibold">Demo-Aktion erfolgreich ausgelöst</div>
                      <div className="mt-1">
                        In der Live-Version wird jetzt automatisch ein PDF erzeugt und an <span className="font-medium">{formData.email || "den Kunden"}</span> sowie an <span className="font-medium">s.agin@lgnet.ch</span> gesendet.
                      </div>
                    </div>
                  )}

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-xs leading-5 text-zinc-400">
                    <div className="font-semibold text-zinc-200 mb-1">Version 3.1 erweitert</div>
                    <div>Echtes LGnet-Logo im Header integriert</div>
                    <div>Preisübersicht als visuelle Referenz eingebunden</div>
                    <div>Frontend bleibt bereit für PDF-Generierung und Mailversand</div>
                    <div>Optional nächster Schritt: Home-Abos und echtes PDF-Antragslayout</div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
