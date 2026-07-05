// ENTERPRISE FALLBACK DATA FOR PERCEPTA INTEGRATIONS PAGE

export const FALLBACK_CATEGORIES = [
  { id: "cat-vms", name: "Video Management Systems", slug: "vms", icon: "Video" },
  { id: "cat-alerting", name: "Alerting Systems", slug: "alerting", icon: "Bell" },
  { id: "cat-reporting", name: "Reporting & SIEM", slug: "reporting", icon: "FileText" },
  { id: "cat-industrial", name: "Industrial Infrastructure", slug: "industrial", icon: "Factory" }
];

export const FALLBACK_INTEGRATIONS = [
  { id: "int-1", category_id: "cat-vms", name: "Milestone XProtect", slug: "milestone", description: "Direct camera stream capture and native alert overlay in Milestone Smart Client.", status: "Available", is_featured: true, documentation_url: "#" },
  { id: "int-2", category_id: "cat-vms", name: "Genetec Security Center", slug: "genetec", description: "Deep integration with Security Desk client for live safety overlay.", status: "In Development", is_featured: true },
  { id: "int-3", category_id: "cat-vms", name: "Cisco Meraki", slug: "cisco-meraki", description: "Cloud-to-cloud API ingestion for enterprise Meraki smart camera networks.", status: "Planned", is_featured: false },
  { id: "int-4", category_id: "cat-vms", name: "Verkada Systems", slug: "verkada", description: "Compatible webhook integration for event alerts and stream parsing.", status: "Target Integration", is_featured: false },
  { id: "int-5", category_id: "cat-alerting", name: "Slack Enterprise", slug: "slack", description: "Instant alert routing to designated safety and operations channels.", status: "Available", is_featured: true, documentation_url: "#" },
  { id: "int-6", category_id: "cat-alerting", name: "PagerDuty", slug: "pagerduty", description: "Trigger critical on-call incident workflows for immediate safety responses.", status: "Available", is_featured: true, documentation_url: "#" },
  { id: "int-7", category_id: "cat-alerting", name: "Microsoft Teams", slug: "teams", description: "Channel webhook delivery for real-time safety detections.", status: "Available", is_featured: false, documentation_url: "#" },
  { id: "int-8", category_id: "cat-reporting", name: "Datadog Platform", slug: "datadog", description: "Export metrics, safety event trends, and edge node health telemetry.", status: "Available", is_featured: false, documentation_url: "#" },
  { id: "int-9", category_id: "cat-reporting", name: "Splunk Enterprise", slug: "splunk", description: "Secure SIEM log delivery for safety compliance and auditing.", status: "Available", is_featured: false, documentation_url: "#" },
  { id: "int-10", category_id: "cat-industrial", name: "OPC UA Interface", slug: "opc-ua", description: "Direct SCADA/PLC safety signal output for automated shutdown triggers.", status: "Planned", is_featured: false }
];

export const FALLBACK_PROTOCOLS = [
  { id: "proto-1", name: "RTSP / RTMP", description: "High-performance direct stream extraction from existing IP cameras. Supports H.264/H.265 encodings.", status: "Available" },
  { id: "proto-2", name: "ONVIF Profile S", description: "Universal standard ensuring deep compatibility with over 90% of enterprise-grade security cameras.", status: "Available" },
  { id: "proto-3", name: "HTTPS API / Webhooks", description: "Secure REST endpoints to push real-time event logs, clips, and telemetry to external databases.", status: "Available" },
  { id: "proto-4", name: "MQTT protocol", description: "Lightweight messaging broker connectivity for low-bandwidth industrial IoT sensor arrays.", status: "Planned" }
];

export const FALLBACK_MODELS = [
  { id: "model-1", name: "On-Premise Edge", description: "Fully air-gapped deployment running locally in your facility. Ideal for extreme privacy requirements.", status: "Available", architecture_text: "AI runs on local physical appliances. Raw video never leaves the network." },
  { id: "model-2", name: "Hybrid Cloud", description: "Local video processing with secure cloud management. Enables global fleet visibility without bandwidth strain.", status: "Available", architecture_text: "AI runs on local Edge nodes. Only anonymized metadata and alerts sync to Percepta Cloud." },
  { id: "model-3", name: "Cloud Native", description: "Direct cloud video ingestion for facilities with enterprise fiber infrastructure.", status: "Planned", architecture_text: "Video streams securely over encrypted tunnels to Percepta Cloud infrastructure for remote processing." }
];

export const FALLBACK_SECURITY = [
  { id: "sec-1", title: "Edge Processing", description: "Raw video streams are analyzed locally and discarded instantly. Video footage is never stored on disk.", icon: "ShieldCheck" },
  { id: "sec-2", title: "Network Isolation", description: "Percepta appliances operate in fully air-gapped configurations with no external internet connection required.", icon: "Network" },
  { id: "sec-3", title: "End-to-End Encryption", description: "All telemetry, metadata, and alerts in transit are secured with AES-256 and TLS 1.3.", icon: "Lock" },
  { id: "sec-4", title: "System Audit Logging", description: "Comprehensive, tamper-proof logs capturing all access events, configuration changes, and active streams.", icon: "FileText" }
];

export const FALLBACK_NODES = [
  { id: "node-1", label: "IP Cameras", sublabel: "Existing RTSP/ONVIF", icon: "Video", tier: 1, display_order: 10 },
  { id: "node-2", label: "Local NVR", sublabel: "Existing Network", icon: "Database", tier: 2, display_order: 20 },
  { id: "node-3", label: "Percepta Edge Node", sublabel: "On-Premise Appliance", icon: "Server", tier: 3, display_order: 30 },
  { id: "node-4", label: "AI Safety Engine", sublabel: "Hazard & PPE Detections", icon: "Cpu", tier: 4, display_order: 40 },
  { id: "node-5", label: "Dashboards & VMS", sublabel: "Milestone, Slack, Email", icon: "BellRing", tier: 5, display_order: 50 }
];

export const FALLBACK_ROADMAP = [
  { id: "road-1", title: "Milestone Smart Client Plugin", description: "Deep visual overlay integrating safety detections directly into native camera grids.", status: "In Development", target_date: "Q3 2026" },
  { id: "road-2", title: "Genetec Omnicast Connector", description: "API connector to overlay bounding boxes on live Genetec streams.", status: "Planned", target_date: "Q4 2026" },
  { id: "road-3", title: "OPC UA Control Relay", description: "Direct PLC command output to trigger physical machine shutdowns when zones are breached.", status: "Planned", target_date: "Q1 2027" }
];

export const FALLBACK_FAQS = [
  { id: "faq-1", question: "Do I need to replace our existing security cameras?", answer: "No. Percepta is completely hardware-agnostic. We interface directly with any camera capable of outputting a standard RTSP stream or ONVIF Profile S, covering over 90% of enterprise cameras manufactured in the last decade.", category: "it_deployment" },
  { id: "faq-2", question: "Can Percepta run completely on-premise without internet?", answer: "Yes. Our On-Premise Edge model is designed for air-gapped industrial facilities. Video ingestion, AI inference, and alert processing happen entirely on local edge appliances without communicating with the external web.", category: "it_deployment" },
  { id: "faq-3", question: "How much bandwidth is required for deployment?", answer: "For fully on-premise deployments, bandwidth usage is zero. For hybrid cloud deployments, bandwidth is extremely minimal (~10 Kbps per stream) because only metadata text and short 10-second hazard event clips are securely transmitted.", category: "it_deployment" },
  { id: "faq-4", question: "How does the alerting engine interface with VMS?", answer: "We support webhook callbacks, custom email notifications, and are actively building native plug-ins for popular VMS suites like Milestone XProtect to inject alarms directly into your central operations room interface.", category: "it_deployment" },
  { id: "faq-5", question: "What is the timeline for a standard pilot setup?", answer: "A typical pilot deployment can be fully operational in 4 days. This includes network assessment (Day 1), Edge node hardware setup (Day 2), detection calibration/rule configuration (Day 3), and final testing to Go Live (Day 4).", category: "it_deployment" }
];
