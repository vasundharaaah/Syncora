import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import confetti from 'canvas-confetti';
import { 
  EventItem, 
  DepartmentTask, 
  VendorPipelineItem, 
  LogisticsItem, 
  ActivityItem, 
  RiskAlert, 
  MeetingItem, 
  TeamMember,
  Role,
  DepartmentName 
} from '../types';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'alert';
  timestamp: string;
}

// Visual gradient placeholders matching palette
const PROOF_IMAGES = [
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%230e9aa7"/><stop offset="50%" stop-color="%232f7be8"/><stop offset="100%" stop-color="%236b4fb8"/></linearGradient></defs><rect width="400" height="300" fill="url(%23g)"/><text x="200" y="150" font-family="sans-serif" font-size="18" font-weight="bold" fill="white" text-anchor="middle">Buffet Setup Verified</text><circle cx="200" cy="110" r="24" fill="none" stroke="white" stroke-width="3"/><path d="M190 110 l8 8 l16 -16" stroke="white" stroke-width="3" fill="none"/></svg>',
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%231d4ed8"/><stop offset="100%" stop-color="%23cdbbf0"/></linearGradient></defs><rect width="400" height="300" fill="url(%23g)"/><text x="200" y="150" font-family="sans-serif" font-size="18" font-weight="bold" fill="white" text-anchor="middle">Stage & AV Truss Ready</text><circle cx="200" cy="110" r="24" fill="none" stroke="white" stroke-width="3"/><path d="M190 110 l8 8 l16 -16" stroke="white" stroke-width="3" fill="none"/></svg>',
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%236b4fb8"/><stop offset="100%" stop-color="%238c2b3d"/></linearGradient></defs><rect width="400" height="300" fill="url(%23g)"/><text x="200" y="150" font-family="sans-serif" font-size="18" font-weight="bold" fill="white" text-anchor="middle">Registration Desk Deployed</text><circle cx="200" cy="110" r="24" fill="none" stroke="white" stroke-width="3"/><path d="M190 110 l8 8 l16 -16" stroke="white" stroke-width="3" fill="none"/></svg>',
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%230e9aa7"/><stop offset="100%" stop-color="%23d7f3e6"/></linearGradient></defs><rect width="400" height="300" fill="url(%23g)"/><text x="200" y="150" font-family="sans-serif" font-size="18" font-weight="bold" fill="%23050b2e" text-anchor="middle">Floral Arc Installed</text><circle cx="200" cy="110" r="24" fill="none" stroke="%23050b2e" stroke-width="3"/><path d="M190 110 l8 8 l16 -16" stroke="%23050b2e" stroke-width="3" fill="none"/></svg>',
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%232f7be8"/><stop offset="100%" stop-color="%236b4fb8"/></linearGradient></defs><rect width="400" height="300" fill="url(%23g)"/><text x="200" y="150" font-family="sans-serif" font-size="18" font-weight="bold" fill="white" text-anchor="middle">VIP Lounge Staged</text><circle cx="200" cy="110" r="24" fill="none" stroke="white" stroke-width="3"/><path d="M190 110 l8 8 l16 -16" stroke="white" stroke-width="3" fill="none"/></svg>',
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%233b2a8f"/><stop offset="100%" stop-color="%230e9aa7"/></linearGradient></defs><rect width="400" height="300" fill="url(%23g)"/><text x="200" y="150" font-family="sans-serif" font-size="18" font-weight="bold" fill="white" text-anchor="middle">Convoy Clearance Verified</text><circle cx="200" cy="110" r="24" fill="none" stroke="white" stroke-width="3"/><path d="M190 110 l8 8 l16 -16" stroke="white" stroke-width="3" fill="none"/></svg>'
];

const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'tata-corporate',
    name: 'Tata Corporate Leadership Conclave',
    client: 'Tata Sons Group',
    date: '2026-12-15',
    eventHead: 'Aditi Rao',
    budget: 2500000,
    projectedProfit: 620000,
    actualProfit: 615000,
    health: 82,
    planningCompletion: 48,
    status: 'Upcoming',
    location: 'Taj Lands End, Grand Ballroom, Mumbai',
    attendeesCount: 850
  },
  {
    id: 'sharma-wedding',
    name: 'Sharma & Kapoor Royal Wedding',
    client: 'The Sharma Family',
    date: '2026-12-22',
    eventHead: 'Rohan Verma',
    budget: 1800000,
    projectedProfit: 380000,
    health: 64,
    planningCompletion: 58,
    status: 'Upcoming',
    location: 'Umaid Bhawan Palace Grounds, Jodhpur',
    attendeesCount: 450
  },
  {
    id: 'college-fest',
    name: 'Horizon Tech & Cultural Fest',
    client: 'IIT Bombay Cultural Council',
    date: '2026-12-28',
    eventHead: 'Karan Mehra',
    budget: 800000,
    projectedProfit: 170000,
    health: 41,
    planningCompletion: 35,
    status: 'Upcoming',
    location: 'Open Air Amphitheatre & Sports Arena, Mumbai',
    attendeesCount: 3500
  },
  {
    id: 'nexus-ai',
    name: 'Nexus Global AI Summit',
    client: 'Nexus Foundation',
    date: '2026-11-18',
    eventHead: 'Aditi Rao',
    budget: 3200000,
    projectedProfit: 780000,
    health: 91,
    planningCompletion: 89,
    status: 'Upcoming',
    location: 'Jio World Convention Centre, BKC',
    attendeesCount: 1200
  },
  {
    id: 'oberoi-gala',
    name: 'Oberoi Centenary Charity Gala',
    client: 'Oberoi Heritage Trust',
    date: '2026-11-25',
    eventHead: 'Pooja Iyer',
    budget: 2100000,
    projectedProfit: 490000,
    health: 88,
    planningCompletion: 80,
    status: 'Upcoming',
    location: 'The Oberoi Pavilion, New Delhi',
    attendeesCount: 300
  },
  {
    id: 'zenith-fintech',
    name: 'Zenith FinTech Pioneers Forum',
    client: 'Zenith Global Media',
    date: '2026-12-05',
    eventHead: 'Vikram Joshi',
    budget: 1600000,
    projectedProfit: 390000,
    health: 79,
    planningCompletion: 66,
    status: 'Upcoming',
    location: 'ITC Gardenia, Bengaluru',
    attendeesCount: 600
  },
  {
    id: 'pulse-fest',
    name: 'Pulse Sunset Electronic Festival',
    client: 'Pulse Live Entertainment',
    date: '2026-12-10',
    eventHead: 'Karan Mehra',
    budget: 1400000,
    projectedProfit: 320000,
    health: 55,
    planningCompletion: 48,
    status: 'Upcoming',
    location: 'Vagator Beach Arena, Goa',
    attendeesCount: 4000
  },
  {
    id: 'heritage-wedding',
    name: 'Singhania Heritage Palace Sangeet',
    client: 'Singhania Group',
    date: '2026-12-30',
    eventHead: 'Rohan Verma',
    budget: 2800000,
    projectedProfit: 710000,
    health: 82,
    planningCompletion: 64,
    status: 'Upcoming',
    location: 'City Palace Courtyard, Udaipur',
    attendeesCount: 500
  },
  {
    id: 'innovatex-hackathon',
    name: 'InnovateX 48h National Hackathon',
    client: 'TechNova Incubator',
    date: '2026-11-12',
    eventHead: 'Aditi Rao',
    budget: 650000,
    projectedProfit: 140000,
    health: 95,
    planningCompletion: 92,
    status: 'Upcoming',
    location: 'T-Hub Innovation Hub, Hyderabad',
    attendeesCount: 800
  },
  {
    id: 'luxe-auto-launch',
    name: 'Aether EV Supercar India Reveal',
    client: 'Aether Motors GmbH',
    date: '2026-12-18',
    eventHead: 'Pooja Iyer',
    budget: 4500000,
    projectedProfit: 1100000,
    health: 86,
    planningCompletion: 70,
    status: 'Upcoming',
    location: 'Acroplis Hangar, Aerocity, Delhi',
    attendeesCount: 250
  },
  {
    id: 'global-healthcare',
    name: 'Pan-Asia Oncology Congress',
    client: 'Asian Medical Association',
    date: '2026-12-08',
    eventHead: 'Vikram Joshi',
    budget: 1950000,
    projectedProfit: 460000,
    health: 78,
    planningCompletion: 68,
    status: 'Upcoming',
    location: 'Renaissance Convention Centre, Powai',
    attendeesCount: 950
  },
  {
    id: 'horizon-art',
    name: 'Contemporary South Asian Art Biennale',
    client: 'Kochi Art Collective',
    date: '2026-12-24',
    eventHead: 'Rohan Verma',
    budget: 1200000,
    projectedProfit: 260000,
    health: 72,
    planningCompletion: 54,
    status: 'Upcoming',
    location: 'Aspinwall House, Fort Kochi',
    attendeesCount: 1500
  }
];

const INITIAL_TASKS: DepartmentTask[] = [
  // ==========================================
  // --- 1. F&B OPERATIONS ---
  // ==========================================
  {
    id: 'task-fnb-1',
    eventId: 'tata-corporate',
    department: 'F&B',
    title: 'Buffet Setup & Tasting Temperature Verification',
    description: 'Verify 4 gourmet culinary counters with digital food thermometer (hot food > 65°C).',
    location: 'Ballroom Foyer - Zone B',
    scheduledTime: '4:30 PM',
    assigneeName: 'Rahul Sharma (Volunteer 1)',
    priority: 'high',
    status: 'done',
    completedAt: '4:52 PM',
    proofUrl: PROOF_IMAGES[0],
    reviewComment: 'Verified temperatures, chafing fuel active, live stations prepped.'
  },
  {
    id: 'task-fnb-2',
    eventId: 'tata-corporate',
    department: 'F&B',
    title: 'VIP Chairman Dining Table Monogrammed Cutlery & Linen',
    description: 'Inspect 18-seat head table with banquet manager and executive chef.',
    location: 'VIP Dining Enclosure',
    scheduledTime: '4:00 PM',
    assigneeName: 'Ananya Sen (Volunteer 2)',
    priority: 'high',
    status: 'done',
    completedAt: '4:25 PM',
    proofUrl: PROOF_IMAGES[4],
    reviewComment: 'Napkins folded, crystal glassware polished and inspected.'
  },
  {
    id: 'task-fnb-3',
    eventId: 'tata-corporate',
    department: 'F&B',
    title: 'Barista Espresso Beans & Cold Brew Calibration',
    description: 'Dual La Marzocco steam wands calibrated, almond and oat milk reserves verified.',
    location: 'South Foyer Coffee Hub',
    scheduledTime: '4:15 PM',
    assigneeName: 'Kunal Mehta (Volunteer 3)',
    priority: 'medium',
    status: 'in-progress'
  },
  {
    id: 'task-fnb-4',
    eventId: 'tata-corporate',
    department: 'F&B',
    title: 'Executive High-Tea & Mineral Water Placement',
    description: 'Table-side glass bottles for 850 guests across 85 round tables.',
    location: 'Main Ballroom',
    scheduledTime: '5:15 PM',
    assigneeName: 'Ananya Sen (Volunteer 2)',
    priority: 'high',
    status: 'in-progress'
  },
  {
    id: 'task-fnb-5',
    eventId: 'tata-corporate',
    department: 'F&B',
    title: 'Special Dietary & Vegan Meal Bento Staging',
    description: 'Verify 42 gluten-free, halal, and Jain dinner packs labeled with table allocations.',
    location: 'Banquet Service Pantry',
    scheduledTime: '5:30 PM',
    assigneeName: 'Tanvi Joshi (Volunteer 4)',
    priority: 'high',
    status: 'in-progress'
  },
  {
    id: 'task-fnb-6',
    eventId: 'tata-corporate',
    department: 'F&B',
    title: 'Pre-Dinner Passed Canapé & Mocktail Flutes Assembly',
    description: 'Stage 600 signature smoked avocado tartlets and pomegranate spritzers.',
    location: 'Pre-Function Terrace Bar',
    scheduledTime: '5:45 PM',
    assigneeName: 'Rahul Sharma (Volunteer 1)',
    priority: 'medium',
    status: 'in-progress'
  },
  {
    id: 'task-fnb-7',
    eventId: 'tata-corporate',
    department: 'F&B',
    title: 'Artisanal Gelato & Liquid Nitrogen Dessert Station',
    description: 'Stage dry ice containment boxes and verify 6 signature dessert platters.',
    location: 'North Ballroom Terrace',
    scheduledTime: '7:45 PM',
    assigneeName: 'Kunal Mehta (Volunteer 3)',
    priority: 'medium',
    status: 'todo'
  },
  {
    id: 'task-fnb-8',
    eventId: 'tata-corporate',
    department: 'F&B',
    title: 'VIP Stage Green Room Mineral Water & Lemon Restock',
    description: 'Fresh mint infusions and chilled mineral bottles placed backstage.',
    location: 'Green Room Service Wing',
    scheduledTime: '6:15 PM',
    assigneeName: 'Tanvi Joshi (Volunteer 4)',
    priority: 'medium',
    status: 'todo'
  },
  {
    id: 'task-fnb-9',
    eventId: 'tata-corporate',
    department: 'F&B',
    title: 'Late-Night Crew Midnight Snack & Coffee Boxes',
    description: 'Stage 65 packed meal boxes and hot coffee flasks for AV & breakdown crew.',
    location: 'Backstage Service Dock',
    scheduledTime: '10:15 PM',
    assigneeName: 'Rahul Sharma (Volunteer 1)',
    priority: 'low',
    status: 'todo'
  },
  {
    id: 'task-fnb-10',
    eventId: 'tata-corporate',
    department: 'F&B',
    title: 'Food Safety Audit & Biodegradable Waste Segregation',
    description: 'Confirm wet/dry compost bins labeled and surplus edible food pickup charity verified.',
    location: 'Main Service Pantry Dock',
    scheduledTime: '9:30 PM',
    assigneeName: 'Ananya Sen (Volunteer 2)',
    priority: 'low',
    status: 'todo'
  },

  // ==========================================
  // --- 2. PRODUCTION & AV ---
  // ==========================================
  {
    id: 'task-prod-1',
    eventId: 'tata-corporate',
    department: 'Production',
    title: 'P4 LED Wall Calibration & Keynote Playback Test',
    description: 'Calibrate contrast ratio with lighting engineer and run 4K keynote slide check.',
    location: 'Center Stage',
    scheduledTime: '3:00 PM',
    assigneeName: 'Dev Saxena (Volunteer 5)',
    priority: 'high',
    status: 'done',
    completedAt: '3:45 PM',
    proofUrl: PROOF_IMAGES[1],
    reviewComment: 'Color balance calibrated to 6500K. No dead pixels on center panels.'
  },
  {
    id: 'task-prod-2',
    eventId: 'tata-corporate',
    department: 'Production',
    title: 'Emergency Generator 65kVA Transfer Switch Test',
    description: 'Simulated grid failure cutover test for AV and stage circuits.',
    location: 'Hotel Power Substation',
    scheduledTime: '2:15 PM',
    assigneeName: 'Dev Saxena (Volunteer 5)',
    priority: 'high',
    status: 'done',
    completedAt: '2:30 PM',
    proofUrl: PROOF_IMAGES[1],
    reviewComment: 'Automatic cutover took 1.8 seconds. Ups batteries intact.'
  },
  {
    id: 'task-prod-3',
    eventId: 'tata-corporate',
    department: 'Production',
    title: 'Line Array Speaker Delay & Sound Pressure Tuning',
    description: 'L-Acoustics Kiva sound tuning across front row to mezzanine at 82dB SPL.',
    location: 'Main Ballroom FOH',
    scheduledTime: '3:45 PM',
    assigneeName: 'Kabir Roy (Volunteer 6)',
    priority: 'high',
    status: 'in-progress'
  },
  {
    id: 'task-prod-4',
    eventId: 'tata-corporate',
    department: 'Production',
    title: 'Wireless Mic Shure Axient Frequency Pairing & RF Scan',
    description: 'Scan UHF spectrum 470-608MHz and pair 8 handheld + 4 lapel transmitters.',
    location: 'Audio Control Booth',
    scheduledTime: '4:45 PM',
    assigneeName: 'Kabir Roy (Volunteer 6)',
    priority: 'high',
    status: 'in-progress'
  },
  {
    id: 'task-prod-5',
    eventId: 'tata-corporate',
    department: 'Production',
    title: 'DMX Moving Spotlight Focus & Speaker Wash Cues',
    description: 'Program entrance spotlight sweep, podium wash, and CEO intro stinger cues.',
    location: 'Lighting Rig Truss',
    scheduledTime: '5:00 PM',
    assigneeName: 'Natasha Rao (Volunteer 7)',
    priority: 'medium',
    status: 'in-progress'
  },
  {
    id: 'task-prod-6',
    eventId: 'tata-corporate',
    department: 'Production',
    title: 'Dual 55-inch Downstage Confidence Monitors Sync',
    description: 'DSan PerfectCue wireless remote clicker paired with presenter timer display.',
    location: 'Downstage Center',
    scheduledTime: '5:20 PM',
    assigneeName: 'Dev Saxena (Volunteer 5)',
    priority: 'high',
    status: 'in-progress'
  },
  {
    id: 'task-prod-7',
    eventId: 'tata-corporate',
    department: 'Production',
    title: '4K Triax Broadcast Stream to Satellite OB Truck',
    description: 'Encode redundant SRT stream to Tata intranet and global employee broadcast.',
    location: 'Outside Broadcast Van',
    scheduledTime: '5:50 PM',
    assigneeName: 'Arjun Das (Volunteer 8)',
    priority: 'high',
    status: 'todo'
  },
  {
    id: 'task-prod-8',
    eventId: 'tata-corporate',
    department: 'Production',
    title: 'Stage Pyrotechnic Sparkular Cold Fireworks Test',
    description: 'Cold spark safety boundary clearance test for award finale moment.',
    location: 'Stage Left & Right Wings',
    scheduledTime: '6:15 PM',
    assigneeName: 'Natasha Rao (Volunteer 7)',
    priority: 'medium',
    status: 'todo'
  },
  {
    id: 'task-prod-9',
    eventId: 'tata-corporate',
    department: 'Production',
    title: 'Audio Mult-Box Distribution Feed for Press Television Crews',
    description: 'Provide 16 XLR balanced clean audio output feeds for accredited broadcast media.',
    location: 'Press Riser Bay',
    scheduledTime: '6:30 PM',
    assigneeName: 'Arjun Das (Volunteer 8)',
    priority: 'medium',
    status: 'todo'
  },
  {
    id: 'task-prod-10',
    eventId: 'tata-corporate',
    department: 'Production',
    title: 'Stage Lighting Dimming Profile for Video Screenplay',
    description: 'Sync front warm key lights to 40% when documentary video roll begins.',
    location: 'Grand Lighting Desk',
    scheduledTime: '6:45 PM',
    assigneeName: 'Natasha Rao (Volunteer 7)',
    priority: 'low',
    status: 'todo'
  },

  // ==========================================
  // --- 3. REGISTRATION & DESK ---
  // ==========================================
  {
    id: 'task-reg-1',
    eventId: 'tata-corporate',
    department: 'Registration',
    title: 'RFID Badge Printer & 8-iPad Scanner Sync',
    description: 'Sync 8 check-in iPads with cloud attendee database and test NFC wristband encode.',
    location: 'Gate 2 Registration Desk',
    scheduledTime: '3:30 PM',
    assigneeName: 'Simran Kaur (Volunteer 9)',
    priority: 'high',
    status: 'done',
    completedAt: '4:00 PM',
    proofUrl: PROOF_IMAGES[2],
    reviewComment: 'Scanners responsive under 0.3s latency. Thermal badge printers tested.'
  },
  {
    id: 'task-reg-2',
    eventId: 'tata-corporate',
    department: 'Registration',
    title: 'VIP Delegate Welcome Kits & Leather Portfolio Staging',
    description: 'Stage 850 delegate leather folders, agenda brochures, and engraved metal pens.',
    location: 'Registration Counter Bay A',
    scheduledTime: '4:15 PM',
    assigneeName: 'Tara Deshmukh (Volunteer 10)',
    priority: 'medium',
    status: 'done',
    completedAt: '4:35 PM',
    proofUrl: PROOF_IMAGES[2],
    reviewComment: 'All 850 folders placed in alphabetical trays by company division.'
  },
  {
    id: 'task-reg-3',
    eventId: 'tata-corporate',
    department: 'Registration',
    title: 'Spot Walk-In Registration Tablets Network Check',
    description: 'Confirm encrypted cellular 5G hotspot backup for on-spot attendee ticketing.',
    location: 'Gate 2 Desk 5',
    scheduledTime: '4:30 PM',
    assigneeName: 'Karan Singhania (Volunteer 11)',
    priority: 'high',
    status: 'in-progress'
  },
  {
    id: 'task-reg-4',
    eventId: 'tata-corporate',
    department: 'Registration',
    title: 'Foreign Dignitary IR Translation Headset Counter',
    description: 'Distribute 50 Bosch multichannel infrared receivers for international guests.',
    location: 'Foyer Hospitality Hub',
    scheduledTime: '5:15 PM',
    assigneeName: 'Maya Pillai (Volunteer 12)',
    priority: 'high',
    status: 'in-progress'
  },
  {
    id: 'task-reg-5',
    eventId: 'tata-corporate',
    department: 'Registration',
    title: 'VIP Executive Lanyard Distribution & Host Escort Pairing',
    description: 'Pair satin gold VIP lanyards with designated volunteer escorts.',
    location: 'Gate 1 VIP Desk',
    scheduledTime: '5:25 PM',
    assigneeName: 'Tara Deshmukh (Volunteer 10)',
    priority: 'high',
    status: 'in-progress'
  },
  {
    id: 'task-reg-6',
    eventId: 'tata-corporate',
    department: 'Registration',
    title: 'Fast-Track QR Code Queue Marshalling & Stanchion Setup',
    description: 'Deploy tensa barriers to form 4 streamlined attendee queue lanes.',
    location: 'Outer Foyer Portico',
    scheduledTime: '5:35 PM',
    assigneeName: 'Simran Kaur (Volunteer 9)',
    priority: 'medium',
    status: 'in-progress'
  },
  {
    id: 'task-reg-7',
    eventId: 'tata-corporate',
    department: 'Registration',
    title: 'Coat Check & Laptop Bag Security Token Desk',
    description: 'Deploy 200 numbered tokens and secure garment racks for out-of-town guests.',
    location: 'Concierge Cloakroom',
    scheduledTime: '5:50 PM',
    assigneeName: 'Maya Pillai (Volunteer 12)',
    priority: 'medium',
    status: 'todo'
  },
  {
    id: 'task-reg-8',
    eventId: 'tata-corporate',
    department: 'Registration',
    title: 'Lost Badge Replacement & Override Terminal',
    description: 'Emergency badge reprint desk with photo ID verification.',
    location: 'Registration Counter Bay C',
    scheduledTime: '6:10 PM',
    assigneeName: 'Karan Singhania (Volunteer 11)',
    priority: 'low',
    status: 'todo'
  },
  {
    id: 'task-reg-9',
    eventId: 'tata-corporate',
    department: 'Registration',
    title: 'Live Attendance Headcount Sync to Event Head',
    description: 'Trigger hourly attendance sync to Event Command Center dashboard.',
    location: 'Central Registration Kiosk',
    scheduledTime: '6:30 PM',
    assigneeName: 'Simran Kaur (Volunteer 9)',
    priority: 'medium',
    status: 'todo'
  },
  {
    id: 'task-reg-10',
    eventId: 'tata-corporate',
    department: 'Registration',
    title: 'Post-Arrival Registration Wrap & Kit Audit',
    description: 'Reconcile unclaimed delegate kits and lock spare RFID badges in security safe.',
    location: 'Gate 2 Safe Room',
    scheduledTime: '8:00 PM',
    assigneeName: 'Tara Deshmukh (Volunteer 10)',
    priority: 'low',
    status: 'todo'
  },

  // ==========================================
  // --- 4. STAGE DECOR & FLORALS ---
  // ==========================================
  {
    id: 'task-decor-1',
    eventId: 'tata-corporate',
    department: 'Decor',
    title: 'VIP Dining Table Centerpiece Floral Installations',
    description: 'White calla lilies, brass lanterns, and votives mounted on all 85 banquet tables.',
    location: 'Grand Ballroom Floor',
    scheduledTime: '3:00 PM',
    assigneeName: 'Meera Kapoor (Volunteer 13)',
    priority: 'medium',
    status: 'done',
    completedAt: '3:35 PM',
    proofUrl: PROOF_IMAGES[3],
    reviewComment: 'Flowers misted with fresh water; candle heights uniform.'
  },
  {
    id: 'task-decor-2',
    eventId: 'tata-corporate',
    department: 'Decor',
    title: 'Ballroom Foyer Red Carpet Laydown & Tape Seal',
    description: '50-meter heavy plush crimson runner secured with heavy-duty gaffer tape.',
    location: 'Grand Entryway Foyer',
    scheduledTime: '2:15 PM',
    assigneeName: 'Pooja Dave (Volunteer 15)',
    priority: 'high',
    status: 'done',
    completedAt: '2:45 PM',
    proofUrl: PROOF_IMAGES[3],
    reviewComment: 'Tensioned flat, no wrinkles, edges beveled with safety caution tape.'
  },
  {
    id: 'task-decor-3',
    eventId: 'tata-corporate',
    department: 'Decor',
    title: 'Stage Podium Floral Spray & Speaker Water Station',
    description: 'Low-profile fresh orchid arrangement for transparent acrylic lectern.',
    location: 'Main Podium Center',
    scheduledTime: '3:45 PM',
    assigneeName: 'Rohan Varma (Volunteer 14)',
    priority: 'medium',
    status: 'in-progress'
  },
  {
    id: 'task-decor-4',
    eventId: 'tata-corporate',
    department: 'Decor',
    title: 'Stage Floral Arc & Backdrop Warm White Illumination',
    description: 'Install 6-meter botanical orchid arch with embedded warm 2700K fairy accents.',
    location: 'Center Stage Wing',
    scheduledTime: '4:45 PM',
    assigneeName: 'Meera Kapoor (Volunteer 13)',
    priority: 'high',
    status: 'in-progress'
  },
  {
    id: 'task-decor-5',
    eventId: 'tata-corporate',
    department: 'Decor',
    title: 'Photo Opportunity Media Wall & Sponsor Backlit Rig',
    description: 'Align matte step-and-repeat logo backdrop with perimeter diffuse softbox lights.',
    location: 'Pre-Function Area',
    scheduledTime: '5:10 PM',
    assigneeName: 'Neil D\'Souza (Volunteer 16)',
    priority: 'medium',
    status: 'in-progress'
  },
  {
    id: 'task-decor-6',
    eventId: 'tata-corporate',
    department: 'Decor',
    title: 'Grand Staircase Ambient Pillar Candle Illumination',
    description: 'Place 60 battery-operated safe flicker pillar candles on marble stairs.',
    location: 'Grand Marble Staircase',
    scheduledTime: '5:30 PM',
    assigneeName: 'Pooja Dave (Volunteer 15)',
    priority: 'low',
    status: 'in-progress'
  },
  {
    id: 'task-decor-7',
    eventId: 'tata-corporate',
    department: 'Decor',
    title: 'VIP Lounge Velvet Cushions & Monogram Throw Alignment',
    description: 'Fluff velvet pillows and arrange floral bowls in Executive Lounge 101.',
    location: 'Green Room VIP Lounge',
    scheduledTime: '5:45 PM',
    assigneeName: 'Rohan Varma (Volunteer 14)',
    priority: 'medium',
    status: 'todo'
  },
  {
    id: 'task-decor-8',
    eventId: 'tata-corporate',
    department: 'Decor',
    title: 'Executive Washroom Luxury Reed Diffusers & Hand Towels',
    description: 'Place sandalwood reed diffusers, branded towels, and orchid sprigs.',
    location: 'Mezzanine Washrooms',
    scheduledTime: '6:00 PM',
    assigneeName: 'Meera Kapoor (Volunteer 13)',
    priority: 'low',
    status: 'todo'
  },
  {
    id: 'task-decor-9',
    eventId: 'tata-corporate',
    department: 'Decor',
    title: 'Stage Floral Spritzing & Freshness Check Before Doors Open',
    description: 'Light water mist spray on stage arches 15 minutes before house open.',
    location: 'Stage Right Arch',
    scheduledTime: '6:15 PM',
    assigneeName: 'Neil D\'Souza (Volunteer 16)',
    priority: 'low',
    status: 'todo'
  },
  {
    id: 'task-decor-10',
    eventId: 'tata-corporate',
    department: 'Decor',
    title: 'Post-Dinner Floral Salvage & Eco-Gifting Handout',
    description: 'Wrap table centerpieces in biodegradable kraft paper for departing guests.',
    location: 'Exit Foyer Desk',
    scheduledTime: '10:00 PM',
    assigneeName: 'Pooja Dave (Volunteer 15)',
    priority: 'low',
    status: 'todo'
  },

  // ==========================================
  // --- 5. LOGISTICS & HAULAGE ---
  // ==========================================
  {
    id: 'task-log-1',
    eventId: 'tata-corporate',
    department: 'Logistics',
    title: '500 Gold Chiavari Banquet Chairs Receiving & Gate Verification',
    description: 'Inspect condition, cushions, and count against signed supplier invoice.',
    location: 'Service Loading Bay 3',
    scheduledTime: '12:00 PM',
    assigneeName: 'Aman Verma (Volunteer 17)',
    priority: 'high',
    status: 'done',
    completedAt: '1:15 PM',
    proofUrl: PROOF_IMAGES[4],
    reviewComment: 'All 500 chairs received with velvet seat pads. Delivery challan stamped.'
  },
  {
    id: 'task-log-2',
    eventId: 'tata-corporate',
    department: 'Logistics',
    title: 'Verify VIP Green Room Furniture Delivery',
    description: '12 leather lounge chairs, vanity mirrors, and garment steamers from ABC Rentals.',
    location: 'Green Room Suite 101',
    scheduledTime: '2:30 PM',
    assigneeName: 'Vikram Patel (Volunteer 18)',
    priority: 'medium',
    status: 'done',
    completedAt: '2:50 PM',
    proofUrl: PROOF_IMAGES[4],
    reviewComment: 'Steamers tested; mirrors spotless; lounge set inspected.'
  },
  {
    id: 'task-log-3',
    eventId: 'tata-corporate',
    department: 'Logistics',
    title: 'Loading Dock Pallet Jack & Freight Elevator Clearance',
    description: 'Ensure dedicated freight lift access reserved exclusively for event crew.',
    location: 'Basement Cargo Bay',
    scheduledTime: '3:15 PM',
    assigneeName: 'Sameer Khan (Volunteer 19)',
    priority: 'high',
    status: 'in-progress'
  },
  {
    id: 'task-log-4',
    eventId: 'tata-corporate',
    department: 'Logistics',
    title: 'Stage Riser Steps & Disability Access Ramp Safety Inspection',
    description: 'Double check non-slip tread tape and handrail rigidity for stage ramp.',
    location: 'Stage Left Riser',
    scheduledTime: '4:30 PM',
    assigneeName: 'Aman Verma (Volunteer 17)',
    priority: 'high',
    status: 'in-progress'
  },
  {
    id: 'task-log-5',
    eventId: 'tata-corporate',
    department: 'Logistics',
    title: 'Empty Road Cases Return Haul Gate Pass Clearance',
    description: 'Clear 35 empty flight cases from backstage into external storage container.',
    location: 'Backstage Service Corridor',
    scheduledTime: '5:10 PM',
    assigneeName: 'Vikram Patel (Volunteer 18)',
    priority: 'medium',
    status: 'in-progress'
  },
  {
    id: 'task-log-6',
    eventId: 'tata-corporate',
    department: 'Logistics',
    title: 'Spare Round Banquet Tables Buffer Placement in Service Bay',
    description: 'Keep 10 round tables on standby for unexpected seating additions.',
    location: 'Banquet Holding Dock',
    scheduledTime: '5:25 PM',
    assigneeName: 'Sameer Khan (Volunteer 19)',
    priority: 'medium',
    status: 'in-progress'
  },
  {
    id: 'task-log-7',
    eventId: 'tata-corporate',
    department: 'Logistics',
    title: 'Heavy-Duty Power Cable Rubber Ramps Placement across Aisles',
    description: 'Cover all three-phase feeder cables crossing guest corridors with rubber bridges.',
    location: 'Ballroom Cross Aisles',
    scheduledTime: '5:45 PM',
    assigneeName: 'Divya Nair (Volunteer 20)',
    priority: 'high',
    status: 'todo'
  },
  {
    id: 'task-log-8',
    eventId: 'tata-corporate',
    department: 'Logistics',
    title: 'Fire Safety Extinguishers & Emergency Exit Sign Audit',
    description: 'Verify 8 CO2 extinguishers placed and emergency exit paths completely unobstructed.',
    location: 'All Ballroom Perimeter Doors',
    scheduledTime: '6:00 PM',
    assigneeName: 'Aman Verma (Volunteer 17)',
    priority: 'high',
    status: 'todo'
  },
  {
    id: 'task-log-9',
    eventId: 'tata-corporate',
    department: 'Logistics',
    title: 'Post-Event Returnable Damask Linen Crates Stacking',
    description: 'Stage tagged return crates for damask linen supplier pickup tomorrow morning.',
    location: 'Hotel Service Exit Gate',
    scheduledTime: '10:30 PM',
    assigneeName: 'Vikram Patel (Volunteer 18)',
    priority: 'low',
    status: 'todo'
  },
  {
    id: 'task-log-10',
    eventId: 'tata-corporate',
    department: 'Logistics',
    title: 'De-Rigging Crew Loading Dock Priority Schedule Distribution',
    description: 'Distribute truck loading sequence schedule to AV, decor, and furniture vendors.',
    location: 'Loading Bay Dispatch Desk',
    scheduledTime: '9:00 PM',
    assigneeName: 'Divya Nair (Volunteer 20)',
    priority: 'medium',
    status: 'todo'
  },

  // ==========================================
  // --- 6. VIP HOSPITALITY & PROTOCOL ---
  // ==========================================
  {
    id: 'task-hosp-1',
    eventId: 'tata-corporate',
    department: 'Hospitality',
    title: 'VIP Green Room Refreshment Bar & Fruit Basket Setup',
    description: 'Organic juices, fresh fruit platters, and sparkling water placed in Suite 101.',
    location: 'Green Room VIP Suite',
    scheduledTime: '3:30 PM',
    assigneeName: 'Sneha Kulkarni (Volunteer 21)',
    priority: 'medium',
    status: 'done',
    completedAt: '3:55 PM',
    proofUrl: PROOF_IMAGES[4],
    reviewComment: 'Cut fruits chilled, crystal tumblers set, fruit baskets wrapped.'
  },
  {
    id: 'task-hosp-2',
    eventId: 'tata-corporate',
    department: 'Hospitality',
    title: 'Speaker Lounge Dry Cleaning & Garment Steamer Readiness',
    description: 'Industrial steam iron, lint rollers, and garment racks ready for executive suits.',
    location: 'Dressing Room 2',
    scheduledTime: '3:00 PM',
    assigneeName: 'Aryan Malhotra (Volunteer 22)',
    priority: 'low',
    status: 'done',
    completedAt: '3:15 PM',
    proofUrl: PROOF_IMAGES[4],
    reviewComment: 'Steamer tested and warmed up; wooden hangers organized.'
  },
  {
    id: 'task-hosp-3',
    eventId: 'tata-corporate',
    department: 'Hospitality',
    title: 'VIP Porch Red Carpet Welcome Briefing with Taj Doormen',
    description: 'Align porch protocol team with hotel doormen for VIP vehicle door opening.',
    location: 'Main Hotel Porch',
    scheduledTime: '4:15 PM',
    assigneeName: 'Ritu Agarwal (Volunteer 23)',
    priority: 'high',
    status: 'in-progress'
  },
  {
    id: 'task-hosp-4',
    eventId: 'tata-corporate',
    department: 'Hospitality',
    title: 'VIP Escort Roster Briefing & Chairman Convoy Alignment',
    description: 'Brief 6 designated volunteer escorts on Chairman convoy arrival timing at porch.',
    location: 'VIP Porch Area',
    scheduledTime: '5:20 PM',
    assigneeName: 'Sneha Kulkarni (Volunteer 21)',
    priority: 'high',
    status: 'in-progress'
  },
  {
    id: 'task-hosp-5',
    eventId: 'tata-corporate',
    department: 'Hospitality',
    title: 'Bilingual Diplomatic Escorts Assigned to Zone A Dignitaries',
    description: 'Station volunteer hosts with designated guest name placards.',
    location: 'VIP Pre-Function Lounge',
    scheduledTime: '5:35 PM',
    assigneeName: 'Aryan Malhotra (Volunteer 22)',
    priority: 'high',
    status: 'in-progress'
  },
  {
    id: 'task-hosp-6',
    eventId: 'tata-corporate',
    department: 'Hospitality',
    title: 'Chief Guest Token of Appreciation Memento Staging',
    description: 'Silver commemorative plaque and ceremonial shawls staged on velvet tray.',
    location: 'Backstage Podium Table',
    scheduledTime: '5:50 PM',
    assigneeName: 'Farhan Ali (Volunteer 24)',
    priority: 'medium',
    status: 'in-progress'
  },
  {
    id: 'task-hosp-7',
    eventId: 'tata-corporate',
    department: 'Hospitality',
    title: 'Board of Directors Private Dining Suite Butler Alignment',
    description: 'Coordinate five-course plated service timing with hotel senior banquet captain.',
    location: 'Private Dining Suite B',
    scheduledTime: '6:15 PM',
    assigneeName: 'Ritu Agarwal (Volunteer 23)',
    priority: 'high',
    status: 'todo'
  },
  {
    id: 'task-hosp-8',
    eventId: 'tata-corporate',
    department: 'Hospitality',
    title: 'Medical Emergency Paramedic Doctor & Defibrillator Booth Check',
    description: 'Verify AED defibrillator, oxygen cylinder, and ambulance parking bay.',
    location: 'North Portico Medical Post',
    scheduledTime: '6:30 PM',
    assigneeName: 'Sneha Kulkarni (Volunteer 21)',
    priority: 'high',
    status: 'todo'
  },
  {
    id: 'task-hosp-9',
    eventId: 'tata-corporate',
    department: 'Hospitality',
    title: 'Speaker Departure Gift Box & Luxury Hamper Staging',
    description: 'Assemble 14 luxury artisan hampers with personalized thank-you letter from Chairman.',
    location: 'Green Room Holding Desk',
    scheduledTime: '8:45 PM',
    assigneeName: 'Farhan Ali (Volunteer 24)',
    priority: 'medium',
    status: 'todo'
  },
  {
    id: 'task-hosp-10',
    eventId: 'tata-corporate',
    department: 'Hospitality',
    title: 'Post-Event Dignitary Escort to Departure Convoys',
    description: 'Escort keynote speakers and Board members from stage directly to waiting sedans.',
    location: 'VIP Exit Portico',
    scheduledTime: '9:30 PM',
    assigneeName: 'Aryan Malhotra (Volunteer 22)',
    priority: 'medium',
    status: 'todo'
  },

  // ==========================================
  // --- 7. TRANSPORT & FLEET ---
  // ==========================================
  {
    id: 'task-trans-1',
    eventId: 'tata-corporate',
    department: 'Transport',
    title: 'Airport Terminal 2 Luxury Shuttle Bus Route 1 Dispatch',
    description: 'Coordinate 4 luxury 45-seater coaches between airport terminal 2 and hotel.',
    location: 'Airport T2 Pickup Pillar 14',
    scheduledTime: '2:30 PM',
    assigneeName: 'Suresh Patil (Volunteer 25)',
    priority: 'high',
    status: 'done',
    completedAt: '3:05 PM',
    proofUrl: PROOF_IMAGES[5],
    reviewComment: 'First wave of 110 delegates arrived safely at hotel. Coaches sanitised.'
  },
  {
    id: 'task-trans-2',
    eventId: 'tata-corporate',
    department: 'Transport',
    title: 'Speaker Private Sedans Convoy Fuel & Chauffeur Briefing',
    description: 'Inspect 6 Mercedes E-Class sedans with bottled water, mints, and umbrella kits.',
    location: 'Hotel Porch Valet Staging',
    scheduledTime: '3:45 PM',
    assigneeName: 'Monica Sethi (Volunteer 26)',
    priority: 'high',
    status: 'done',
    completedAt: '4:15 PM',
    proofUrl: PROOF_IMAGES[5],
    reviewComment: 'All 6 vehicles detailed, GPS trackers linked to transport dispatch iPad.'
  },
  {
    id: 'task-trans-3',
    eventId: 'tata-corporate',
    department: 'Transport',
    title: 'Hotel Porch Valet Token Desk & Key Locker Deployment',
    description: 'Deploy 15 valet drivers and digital vehicle tracking barcode terminal.',
    location: 'Main Hotel Portico Valet Desk',
    scheduledTime: '4:15 PM',
    assigneeName: 'Harpreet Singh (Volunteer 27)',
    priority: 'medium',
    status: 'in-progress'
  },
  {
    id: 'task-trans-4',
    eventId: 'tata-corporate',
    department: 'Transport',
    title: 'Guest Overflow Parking Shuttles Route 2 Readiness',
    description: 'Coordinate 2 continuous electric 8-seater buggies between parking lot B and lobby.',
    location: 'Parking Zone B Hub',
    scheduledTime: '5:15 PM',
    assigneeName: 'Suresh Patil (Volunteer 25)',
    priority: 'high',
    status: 'in-progress'
  },
  {
    id: 'task-trans-5',
    eventId: 'tata-corporate',
    department: 'Transport',
    title: 'Traffic Marshal Gate 1 & Gate 2 Bottleneck Flow Control',
    description: 'Coordinate with local traffic police to prevent evening road congestion.',
    location: 'Main Highway Entrance Gate',
    scheduledTime: '5:30 PM',
    assigneeName: 'Harpreet Singh (Volunteer 27)',
    priority: 'high',
    status: 'in-progress'
  },
  {
    id: 'task-trans-6',
    eventId: 'tata-corporate',
    department: 'Transport',
    title: 'Electric Vehicle EV Fast Charger Stalls Tagging',
    description: 'Reserve 6 ultra-fast charging bays for VIP electric convoys.',
    location: 'Basement P1 Green Hub',
    scheduledTime: '5:45 PM',
    assigneeName: 'Jaspreet Kaur (Volunteer 28)',
    priority: 'medium',
    status: 'in-progress'
  },
  {
    id: 'task-trans-7',
    eventId: 'tata-corporate',
    department: 'Transport',
    title: 'Flight Delay Live Tracking & Airport Wave 3 Pickup Schedule',
    description: 'Monitor flight arrivals from Bangalore and Delhi for 28 delayed executive guests.',
    location: 'Transport Dispatcher Hub',
    scheduledTime: '6:15 PM',
    assigneeName: 'Monica Sethi (Volunteer 26)',
    priority: 'medium',
    status: 'todo'
  },
  {
    id: 'task-trans-8',
    eventId: 'tata-corporate',
    department: 'Transport',
    title: 'Chauffeur Packed Dinner Box & Refreshment Distribution',
    description: 'Distribute 35 hot meal packets and chai to waiting fleet drivers.',
    location: 'Driver Lounge Basement P2',
    scheduledTime: '7:30 PM',
    assigneeName: 'Jaspreet Kaur (Volunteer 28)',
    priority: 'low',
    status: 'todo'
  },
  {
    id: 'task-trans-9',
    eventId: 'tata-corporate',
    department: 'Transport',
    title: 'Late-Night VIP Convoy Return Dispatch Staging',
    description: 'Ensure cars parked in departure sequence for seamless post-dinner exit.',
    location: 'Front Porch Departure Bay',
    scheduledTime: '9:45 PM',
    assigneeName: 'Suresh Patil (Volunteer 25)',
    priority: 'high',
    status: 'todo'
  },
  {
    id: 'task-trans-10',
    eventId: 'tata-corporate',
    department: 'Transport',
    title: 'Final Airport Drop Coach Route Schedule Broadcast',
    description: 'Broadcast scheduled coach departure times (10:30 PM, 11:30 PM) on hotel screens.',
    location: 'Concierge Screen Console',
    scheduledTime: '8:45 PM',
    assigneeName: 'Harpreet Singh (Volunteer 27)',
    priority: 'low',
    status: 'todo'
  },

  // ==========================================
  // --- 8. GUEST MANAGEMENT & USHERING ---
  // ==========================================
  {
    id: 'task-guest-1',
    eventId: 'tata-corporate',
    department: 'Guest Management',
    title: 'Keynote Seating Reserved Front Rows Row-A & Row-B Signage',
    description: 'Affix gold foil reserved placards for Tata Group directors and ministry officials.',
    location: 'Center Stage Audience Floor',
    scheduledTime: '3:45 PM',
    assigneeName: 'Priya Nambiar (Volunteer 29)',
    priority: 'high',
    status: 'done',
    completedAt: '4:10 PM',
    proofUrl: PROOF_IMAGES[2],
    reviewComment: 'Row A (18 seats) and Row B (24 seats) marked with name tags and program booklets.'
  },
  {
    id: 'task-guest-2',
    eventId: 'tata-corporate',
    department: 'Guest Management',
    title: 'Ballroom Seating Plan Table Number Placards Alignment',
    description: 'Place double-sided clear acrylic table numbers (Table 1 through 85).',
    location: 'Grand Ballroom Floor',
    scheduledTime: '4:15 PM',
    assigneeName: 'Aditya Bose (Volunteer 30)',
    priority: 'medium',
    status: 'done',
    completedAt: '4:35 PM',
    proofUrl: PROOF_IMAGES[2],
    reviewComment: 'All 85 table stands upright and aligned towards the main entry doors.'
  },
  {
    id: 'task-guest-3',
    eventId: 'tata-corporate',
    department: 'Guest Management',
    title: 'Wheelchair Accessible Seating & Ramp Clearance Audit',
    description: 'Designate 6 extra-wide priority wheelchair spaces with level floor sightlines.',
    location: 'Row D Auditorium Center',
    scheduledTime: '4:30 PM',
    assigneeName: 'Nikhil Jain (Volunteer 32)',
    priority: 'high',
    status: 'in-progress'
  },
  {
    id: 'task-guest-4',
    eventId: 'tata-corporate',
    department: 'Guest Management',
    title: 'VIP Lounge Access Wristband Verification Desk',
    description: 'Verify iridescent holographic wristbands for access to Private Lounge B.',
    location: 'Terrace Lounge Entrance',
    scheduledTime: '5:15 PM',
    assigneeName: 'Priya Nambiar (Volunteer 29)',
    priority: 'high',
    status: 'in-progress'
  },
  {
    id: 'task-guest-5',
    eventId: 'tata-corporate',
    department: 'Guest Management',
    title: 'Special Dietary Requirement & Table Seating Card Alignment',
    description: 'Check gluten-free and allergen tags on 14 designated corporate tables.',
    location: 'Ballroom Tables 12 to 26',
    scheduledTime: '5:30 PM',
    assigneeName: 'Aditya Bose (Volunteer 30)',
    priority: 'medium',
    status: 'in-progress'
  },
  {
    id: 'task-guest-6',
    eventId: 'tata-corporate',
    department: 'Guest Management',
    title: 'Press Riser & Media Accreditation Wristband Check',
    description: 'Check photo passes for 30 accredited business journalists in dedicated media box.',
    location: 'Press Riser Platform',
    scheduledTime: '5:45 PM',
    assigneeName: 'Shweta Rao (Volunteer 31)',
    priority: 'high',
    status: 'in-progress'
  },
  {
    id: 'task-guest-7',
    eventId: 'tata-corporate',
    department: 'Guest Management',
    title: 'Auditorium Doors Open Crowd Ushering Deployment',
    description: 'Station 12 volunteer ushers at Doors 1 through 4 with laser pointers and program cards.',
    location: 'Main Ballroom Doors',
    scheduledTime: '6:00 PM',
    assigneeName: 'Priya Nambiar (Volunteer 29)',
    priority: 'high',
    status: 'todo'
  },
  {
    id: 'task-guest-8',
    eventId: 'tata-corporate',
    department: 'Guest Management',
    title: 'Lost and Found Desk Staging at Concierge Desk',
    description: 'Provide secure locked safe box and digital logging sheet for lost items.',
    location: 'Central Foyer Desk',
    scheduledTime: '6:15 PM',
    assigneeName: 'Nikhil Jain (Volunteer 32)',
    priority: 'low',
    status: 'todo'
  },
  {
    id: 'task-guest-9',
    eventId: 'tata-corporate',
    department: 'Guest Management',
    title: 'Guest Feedback QR Standees Placement at Main Exits',
    description: 'Place 12 illuminated QR standees for digital post-event survey collection.',
    location: 'Ballroom Exit Portals',
    scheduledTime: '7:45 PM',
    assigneeName: 'Shweta Rao (Volunteer 31)',
    priority: 'low',
    status: 'todo'
  },
  {
    id: 'task-guest-10',
    eventId: 'tata-corporate',
    department: 'Guest Management',
    title: 'Standing Ovation Aisle Clearance Protocol Briefing',
    description: 'Ensure central aisle remains completely clear during Chairman keynote conclusion.',
    location: 'Auditorium Central Spine',
    scheduledTime: '7:15 PM',
    assigneeName: 'Aditya Bose (Volunteer 30)',
    priority: 'medium',
    status: 'todo'
  },

  // ==========================================
  // --- 9. BACKSTAGE & SHOW CALLING ---
  // ==========================================
  {
    id: 'task-back-1',
    eventId: 'tata-corporate',
    department: 'Backstage',
    title: 'Green Room Stage Direct Intercom Headset Comm Check',
    description: 'ClearCom 4-channel wireless beltpack link tested between Stage Manager and Audio Booth.',
    location: 'Green Room Suite & Backstage',
    scheduledTime: '3:15 PM',
    assigneeName: 'Zaheer Merchant (Volunteer 33)',
    priority: 'high',
    status: 'done',
    completedAt: '3:30 PM',
    proofUrl: PROOF_IMAGES[1],
    reviewComment: 'Channels A (Show caller), B (Audio), C (Lights), D (Video) tested loud & clear.'
  },
  {
    id: 'task-back-2',
    eventId: 'tata-corporate',
    department: 'Backstage',
    title: 'Speaker Slide Advancer Redundant Remote Test',
    description: 'Tested primary and secondary USB transmitters on presentation MacBooks.',
    location: 'Backstage AV Tech Table',
    scheduledTime: '3:35 PM',
    assigneeName: 'Alisha Mehta (Volunteer 34)',
    priority: 'high',
    status: 'done',
    completedAt: '3:50 PM',
    proofUrl: PROOF_IMAGES[1],
    reviewComment: 'Zero latency click response; green laser pointer tested.'
  },
  {
    id: 'task-back-3',
    eventId: 'tata-corporate',
    department: 'Backstage',
    title: 'Master Show Clock Timecode Sync with Broadcast OB Truck',
    description: 'SMPTE LTC timecode synchronized across all multiview monitors.',
    location: 'Master Control Console',
    scheduledTime: '4:00 PM',
    assigneeName: 'Zaheer Merchant (Volunteer 33)',
    priority: 'high',
    status: 'in-progress'
  },
  {
    id: 'task-back-4',
    eventId: 'tata-corporate',
    department: 'Backstage',
    title: 'Presidential Teleprompter Glass & Speech Scroll Calibration',
    description: 'Align twin presidential glass prompters with speech text scroll rate.',
    location: 'Downstage Wing Left & Right',
    scheduledTime: '4:55 PM',
    assigneeName: 'Alisha Mehta (Volunteer 34)',
    priority: 'high',
    status: 'in-progress'
  },
  {
    id: 'task-back-5',
    eventId: 'tata-corporate',
    department: 'Backstage',
    title: 'Speaker Lapel Mic Fitting & Transmitter Battery Check',
    description: 'Fit DPA 4066 omni headset mics with brand new 9V batteries on executive speakers.',
    location: 'Backstage Mic Dressing Room',
    scheduledTime: '5:15 PM',
    assigneeName: 'Gaurav Dixit (Volunteer 35)',
    priority: 'high',
    status: 'in-progress'
  },
  {
    id: 'task-back-6',
    eventId: 'tata-corporate',
    department: 'Backstage',
    title: 'Ceremonial Brass Lamp (Diya) Wick & Oil Staging',
    description: 'Stage traditional brass lamp, pure ghee, matchbox, and floral garland for inaugural.',
    location: 'Stage Right Holding Table',
    scheduledTime: '5:35 PM',
    assigneeName: 'Sanjana Pillai (Volunteer 36)',
    priority: 'medium',
    status: 'in-progress'
  },
  {
    id: 'task-back-7',
    eventId: 'tata-corporate',
    department: 'Backstage',
    title: 'Stage Manager Run-of-Show Minute-by-Minute Cue Sheet Distribution',
    description: 'Distribute laminated physical cue sheets to lighting director and audio engineer.',
    location: 'AV Master Console',
    scheduledTime: '5:50 PM',
    assigneeName: 'Zaheer Merchant (Volunteer 33)',
    priority: 'high',
    status: 'todo'
  },
  {
    id: 'task-back-8',
    eventId: 'tata-corporate',
    department: 'Backstage',
    title: 'Award Trophy Velvet Tray & Recipient Name Card Ordering',
    description: 'Arrange 18 engraved crystal trophies on velvet trays strictly in presentation order.',
    location: 'Stage Left Presentation Dock',
    scheduledTime: '6:15 PM',
    assigneeName: 'Sanjana Pillai (Volunteer 36)',
    priority: 'high',
    status: 'todo'
  },
  {
    id: 'task-back-9',
    eventId: 'tata-corporate',
    department: 'Backstage',
    title: 'Speaker Off-Stage Water & Quick Tissue Station',
    description: 'Provide room temperature water flutes, throat lozenges, and fresh towels.',
    location: 'Backstage Stage Right Wing',
    scheduledTime: '6:30 PM',
    assigneeName: 'Gaurav Dixit (Volunteer 35)',
    priority: 'medium',
    status: 'todo'
  },
  {
    id: 'task-back-10',
    eventId: 'tata-corporate',
    department: 'Backstage',
    title: 'Emergency Speech Hardcopy Printouts in Red Executive Folder',
    description: 'Print 24pt large font physical copies of keynote address in case prompter fails.',
    location: 'Podium Concealed Shelf',
    scheduledTime: '6:40 PM',
    assigneeName: 'Alisha Mehta (Volunteer 34)',
    priority: 'medium',
    status: 'todo'
  }
];

const INITIAL_VENDORS: VendorPipelineItem[] = [
  {
    id: 'v-1',
    name: 'PQR Visuals & Production',
    category: 'AV & Sound',
    quoteAmount: 520000,
    stage: 'Finalized',
    rating: 4.8,
    reliabilityNote: '100% on-time across last 8 events. Premium rigging standards.',
    reliabilityScore: 96,
    isLateRisk: false,
    contactPerson: 'Pradeep Sharma',
    phone: '+91 98201 44521',
    quoteHistory: [
      { date: '2026-10-01', amount: 580000, note: 'Initial quotation' },
      { date: '2026-10-08', amount: 540000, note: 'Negotiated bundle rate' },
      { date: '2026-10-15', amount: 520000, note: 'Final approved contract' }
    ]
  },
  {
    id: 'v-2',
    name: 'ABC Royal Caterers',
    category: 'Catering & Beverages',
    quoteAmount: 780000,
    stage: 'Contract Signed',
    rating: 4.6,
    reliabilityNote: 'Top tier food quality, highly consistent live counters.',
    reliabilityScore: 92,
    isLateRisk: false,
    contactPerson: 'Sanjay Gupta',
    phone: '+91 98330 11290',
    quoteHistory: [
      { date: '2026-10-02', amount: 820000, note: 'Initial per-plate estimate' },
      { date: '2026-10-12', amount: 780000, note: 'Finalized menu with dessert bar' }
    ]
  },
  {
    id: 'v-3',
    name: 'Artisan Flora & Structures',
    category: 'Decor & Fabric',
    quoteAmount: 430000,
    stage: 'Negotiating',
    rating: 4.2,
    reliabilityNote: 'Late delivery in 2 of last 4 events during monsoon. Needs strict cutoff.',
    reliabilityScore: 78,
    isLateRisk: true,
    contactPerson: 'Meera Chawla',
    phone: '+91 98721 34991',
    quoteHistory: [
      { date: '2026-10-05', amount: 490000, note: 'Proposal submitted' },
      { date: '2026-10-18', amount: 430000, note: 'Reduced flower imports' }
    ]
  },
  {
    id: 'v-4',
    name: 'Apex Stage & Rentals',
    category: 'Logistics & Seating',
    quoteAmount: 260000,
    stage: 'Finalized',
    rating: 4.9,
    reliabilityNote: 'Prompt deliveries. Clean banquet chairs and risers.',
    reliabilityScore: 98,
    isLateRisk: false,
    contactPerson: 'Harsh Vardhan',
    phone: '+91 98110 55432',
    quoteHistory: [
      { date: '2026-10-04', amount: 280000, note: 'Base quotation' },
      { date: '2026-10-14', amount: 260000, note: 'Volume discount approved' }
    ]
  },
  {
    id: 'v-5',
    name: 'SecureGuard Force',
    category: 'Security & Bouncers',
    quoteAmount: 140000,
    stage: 'Shortlisted',
    rating: 4.5,
    reliabilityNote: 'Licensed ex-military security supervisors.',
    reliabilityScore: 90,
    isLateRisk: false,
    contactPerson: 'Col. R. K. Nair',
    phone: '+91 98670 98123',
    quoteHistory: [
      { date: '2026-10-10', amount: 140000, note: 'Quotation for 24 marshals' }
    ]
  },
  {
    id: 'v-6',
    name: 'Chroma Light & Laser Co.',
    category: 'Special FX',
    quoteAmount: 180000,
    stage: 'Potential',
    rating: 4.0,
    reliabilityNote: 'Newly evaluated vendor. Portfolio reviewed.',
    reliabilityScore: 82,
    isLateRisk: false,
    contactPerson: 'Tanmay Sen',
    phone: '+91 97654 32110',
    quoteHistory: [
      { date: '2026-10-16', amount: 180000, note: 'Cold estimate for haze and cold pyro' }
    ]
  }
];

const INITIAL_LOGISTICS: LogisticsItem[] = [
  {
    id: 'log-1',
    eventId: 'tata-corporate',
    item: 'Gold Chiavari Banquet Chairs (500 units)',
    quantity: '500 Chairs',
    vendor: 'Apex Stage & Rentals',
    deliveryTime: '12:00 PM',
    status: 'Arrived',
    department: 'Logistics'
  },
  {
    id: 'log-2',
    eventId: 'tata-corporate',
    item: 'Round Banquet Tables with Damask Linens (50 units)',
    quantity: '50 Tables',
    vendor: 'Apex Stage & Rentals',
    deliveryTime: '1:00 PM',
    status: 'Arrived',
    department: 'Logistics'
  },
  {
    id: 'log-3',
    eventId: 'tata-corporate',
    item: 'Main P4 Outdoor LED Panels & Controller (2 sets)',
    quantity: '2 Sets',
    vendor: 'PQR Visuals & Production',
    deliveryTime: '4:00 PM',
    status: 'Arrived',
    department: 'Production'
  },
  {
    id: 'log-4',
    eventId: 'tata-corporate',
    item: 'Exotic Orchid Floral Arrangements & Vases (40 crates)',
    quantity: '40 Crates',
    vendor: 'Artisan Flora & Structures',
    deliveryTime: '5:00 PM',
    status: 'In Transit',
    department: 'Decor'
  },
  {
    id: 'log-5',
    eventId: 'tata-corporate',
    item: 'Thermal RFID Registration Badges & Lanyards (1000 pcs)',
    quantity: '1000 Units',
    vendor: 'PrintCraft Quick',
    deliveryTime: '3:00 PM',
    status: 'Arrived',
    department: 'Registration'
  }
];

const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    timestamp: '4:52 PM',
    department: 'F&B',
    title: 'Buffet Setup Completed',
    actor: 'Rahul (Volunteer 1)',
    proofUrl: PROOF_IMAGES[0],
    eventId: 'tata-corporate',
    severity: 'success'
  },
  {
    id: 'act-2',
    timestamp: '3:45 PM',
    department: 'Production',
    title: 'P4 LED Wall Calibrated & Tested',
    actor: 'Dev (Volunteer 3)',
    proofUrl: PROOF_IMAGES[1],
    eventId: 'tata-corporate',
    severity: 'success'
  },
  {
    id: 'act-3',
    timestamp: '2:50 PM',
    department: 'Logistics',
    title: 'VIP Lounge Furniture Arrived & Positioned',
    actor: 'Dev (Volunteer 3)',
    proofUrl: PROOF_IMAGES[2],
    eventId: 'tata-corporate',
    severity: 'info'
  },
  {
    id: 'act-4',
    timestamp: '1:15 PM',
    department: 'F&B',
    title: 'Catering Advance Cleared (₹3.5L)',
    actor: 'Aditi Rao (Event Head)',
    eventId: 'tata-corporate',
    severity: 'info'
  }
];

const INITIAL_ALERTS: RiskAlert[] = [
  {
    id: 'risk-1',
    eventId: 'tata-corporate',
    eventName: 'Tata Corporate Conclave',
    severity: 'critical',
    title: 'Artisan Flora Delivery Cutoff Approaching',
    description: 'Vendor Artisan Flora was late in 2 of last 4 events. Delivery due at 5:00 PM is currently In Transit.',
    suggestedAction: 'Call dispatch manager Meera Chawla (+91 98721 34991) to verify live transit GPS.',
    isResolved: false
  },
  {
    id: 'risk-2',
    eventId: 'college-fest',
    eventName: 'Horizon Tech & Cultural Fest',
    severity: 'critical',
    title: 'Main Artist Stage Sound Contract Unsigned',
    description: 'Event is in 42 days. Sound rider is still pending approval; delay threatens production slot.',
    suggestedAction: 'Authorize Karan Mehra to finalize backup vendor SoundSphere with 10% rate lock.',
    isResolved: false
  },
  {
    id: 'risk-3',
    eventId: 'sharma-wedding',
    eventName: 'Sharma & Kapoor Royal Wedding',
    severity: 'at-risk',
    title: 'Projected Profit Margin Contracted from 30% to 23%',
    description: 'Unanticipated destination transport surcharge added ₹1.2L to logistical expenses.',
    suggestedAction: 'Apply Syncora Profit Optimizer recommendations to renegotiate room blocking margin.',
    isResolved: false
  }
];

const INITIAL_MEETINGS: MeetingItem[] = [
  {
    id: 'm-1',
    eventId: 'tata-corporate',
    title: 'Weekly Production & Client Alignment',
    date: '2026-10-10',
    rawNotes: 'Client requested adding 50 foreign delegates to the VIP dinner. Chairman keynote duration confirmed to 22 minutes. Need strict live translation headphones. Rahul will coordinate headset counters. AV engineer will boost center fills.',
    decisions: [
      'Expand VIP Dining capacity to 900 pax total with Taj Banquet team.',
      'Lock keynote time strictly at 6:30 PM sharp.'
    ],
    actionItems: [
      { task: 'Order 60 additional wireless translation headsets from PQR', owner: 'Dev (Volunteer 3)', dueDate: '2026-10-14' },
      { task: 'Prepare VIP name placards for top 50 executives', owner: 'Simran (Volunteer 4)', dueDate: '2026-10-15' },
      { task: 'Audit backstage power backup generators', owner: 'Rahul (Volunteer 1)', dueDate: '2026-10-13' }
    ]
  }
];

const INITIAL_TEAM: TeamMember[] = [
  { id: 'tm-1', name: 'Aditi Rao', role: 'event-head', avatar: 'AR', phone: '+91 98200 11223', activeTasksCount: 6, isAvailable: true },
  { id: 'tm-2', name: 'Rohan Verma', role: 'event-head', avatar: 'RV', phone: '+91 98111 22334', activeTasksCount: 4, isAvailable: true },
  { id: 'tm-3', name: 'Karan Mehra', role: 'event-head', avatar: 'KM', phone: '+91 98333 44556', activeTasksCount: 5, isAvailable: true },
  { id: 'tm-4', name: 'Rahul Sharma', role: 'team-lead', department: 'F&B', avatar: 'RS', phone: '+91 97111 88990', activeTasksCount: 3, isAvailable: true },
  { id: 'tm-5', name: 'Dev Kapur', role: 'volunteer', department: 'Production', avatar: 'DK', phone: '+91 98222 33445', activeTasksCount: 2, isAvailable: true },
  { id: 'tm-6', name: 'Ananya Sen', role: 'volunteer', department: 'F&B', avatar: 'AS', phone: '+91 98444 55667', activeTasksCount: 1, isAvailable: true },
  { id: 'tm-7', name: 'Simran Gill', role: 'volunteer', department: 'Registration', avatar: 'SG', phone: '+91 98666 77889', activeTasksCount: 2, isAvailable: true }
];

interface SyncoraState {
  currentRole: Role;
  currentEventId: string;
  currentDepartment: DepartmentName;
  currentVolunteerName: string;
  isSimulating: boolean;
  toasts: ToastMessage[];

  events: EventItem[];
  tasks: DepartmentTask[];
  vendors: VendorPipelineItem[];
  logistics: LogisticsItem[];
  activities: ActivityItem[];
  alerts: RiskAlert[];
  meetings: MeetingItem[];
  team: TeamMember[];

  // Actions
  setRole: (role: Role) => void;
  setCurrentEventId: (id: string) => void;
  setCurrentDepartment: (dept: DepartmentName) => void;
  setCurrentVolunteerName: (name: string) => void;
  addToast: (toast: Omit<ToastMessage, 'id' | 'timestamp'>) => void;
  dismissToast: (id: string) => void;
  
  // Volunteer & Live execution actions
  startTask: (taskId: string) => void;
  completeTask: (taskId: string, proofUrl?: string, note?: string) => void;
  approveTask: (taskId: string, comment?: string) => void;
  rejectTask: (taskId: string, comment?: string) => void;
  createTask: (task: Omit<DepartmentTask, 'id'>) => void;

  // Logistics & Vendor actions
  markLogisticsArrived: (id: string) => void;
  updateVendorStage: (id: string, stage: VendorPipelineItem['stage']) => void;
  resolveAlert: (id: string) => void;
  createEvent: (event: Omit<EventItem, 'id'>) => void;
  addMeeting: (meeting: Omit<MeetingItem, 'id'>) => void;
  convertMeetingToTasks: (meetingId: string) => void;
  parseAndApplyWhatsApp: (text: string) => boolean;
  toggleSimulation: () => void;
  checkInVolunteer: () => void;
  resetToDefaultData: () => void;
}

export const useSyncoraStore = create<SyncoraState>()(
  persist(
    (set, get) => ({
      currentRole: 'owner',
      currentEventId: 'tata-corporate',
      currentDepartment: 'F&B',
      currentVolunteerName: 'Rahul (Volunteer 1)',
      isSimulating: false,
      toasts: [],

      events: INITIAL_EVENTS,
      tasks: INITIAL_TASKS,
      vendors: INITIAL_VENDORS,
      logistics: INITIAL_LOGISTICS,
      activities: INITIAL_ACTIVITIES,
      alerts: INITIAL_ALERTS,
      meetings: INITIAL_MEETINGS,
      team: INITIAL_TEAM,

      setRole: (role) => set({ currentRole: role }),
      setCurrentEventId: (id) => set({ currentEventId: id }),
      setCurrentDepartment: (dept) => set({ currentDepartment: dept }),
      setCurrentVolunteerName: (name) => set({ currentVolunteerName: name }),

      addToast: (toast) => {
        const id = 'toast-' + Math.random().toString(36).substring(2, 9);
        const newToast: ToastMessage = {
          ...toast,
          id,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        set((state) => ({ toasts: [newToast, ...state.toasts].slice(0, 5) }));

        // Auto dismiss after 4.5s
        setTimeout(() => {
          get().dismissToast(id);
        }, 4500);
      },

      dismissToast: (id) => {
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
      },

      startTask: (taskId) => {
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, status: 'in-progress' } : t))
        }));
        get().addToast({
          title: 'Task Started',
          message: 'Status updated to In-Progress across all dashboards.',
          type: 'info'
        });
      },

      completeTask: (taskId, customProofUrl, note) => {
        const state = get();
        const task = state.tasks.find((t) => t.id === taskId);
        if (!task) return;

        const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const proof = customProofUrl || PROOF_IMAGES[Math.floor(Math.random() * PROOF_IMAGES.length)];

        // Confetti burst in palette colors (teal, azure, royal, violet, lilac)
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0e9aa7', '#2f7be8', '#1d4ed8', '#6b4fb8', '#cdbbf0']
        });

        const updatedTasks = state.tasks.map((t) =>
          t.id === taskId
            ? {
                ...t,
                status: 'done' as const,
                completedAt: timeNow,
                proofUrl: proof,
                reviewComment: note
              }
            : t
        );

        // New activity log entry
        const newActivity: ActivityItem = {
          id: 'act-' + Date.now(),
          timestamp: timeNow,
          department: task.department,
          title: `${task.title} Completed`,
          actor: task.assigneeName || state.currentVolunteerName,
          proofUrl: proof,
          eventId: task.eventId,
          severity: 'success'
        };

        // Recalculate event planning % and health
        const eventTasks = updatedTasks.filter((t) => t.eventId === task.eventId);
        const completedCount = eventTasks.filter((t) => t.status === 'done' || t.status === 'approved').length;
        const newPlanning = Math.min(100, Math.round((completedCount / (eventTasks.length || 1)) * 100));

        const updatedEvents = state.events.map((ev) =>
          ev.id === task.eventId
            ? {
                ...ev,
                planningCompletion: newPlanning,
                health: Math.min(100, Math.round(ev.health + 3))
              }
            : ev
        );

        set({
          tasks: updatedTasks,
          activities: [newActivity, ...state.activities],
          events: updatedEvents
        });

        get().addToast({
          title: 'Task Completed & Synced',
          message: `${task.assigneeName} completed "${task.title}". Photo attached & health score updated.`,
          type: 'success'
        });
      },

      approveTask: (taskId, comment) => {
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId
              ? { ...t, status: 'approved' as const, reviewComment: comment || 'Verified by Team Lead' }
              : t
          )
        }));
        get().addToast({
          title: 'Proof Approved',
          message: 'Task marked as verified in company ledger.',
          type: 'success'
        });
      },

      rejectTask: (taskId, comment) => {
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId
              ? { ...t, status: 'in-progress' as const, reviewComment: comment || 'Requires correction' }
              : t
          )
        }));
        get().addToast({
          title: 'Revision Requested',
          message: 'Returned to assignee with feedback note.',
          type: 'alert'
        });
      },

      createTask: (newTaskData) => {
        const id = 'task-' + Date.now();
        const newTask: DepartmentTask = {
          ...newTaskData,
          id
        };
        set((state) => ({
          tasks: [newTask, ...state.tasks]
        }));
        get().addToast({
          title: 'Task Dispatched',
          message: `Assigned to ${newTask.assigneeName} (${newTask.department})`,
          type: 'info'
        });
      },

      markLogisticsArrived: (id) => {
        set((state) => ({
          logistics: state.logistics.map((l) => (l.id === id ? { ...l, status: 'Arrived' } : l))
        }));
        get().addToast({
          title: 'Logistics Arrived',
          message: 'Material verified at venue entrance.',
          type: 'success'
        });
      },

      updateVendorStage: (id, stage) => {
        if (stage === 'Finalized' || stage === 'Contract Signed') {
          confetti({
            particleCount: 60,
            spread: 55,
            colors: ['#0e9aa7', '#2f7be8', '#cdbbf0']
          });
        }
        set((state) => ({
          vendors: state.vendors.map((v) => (v.id === id ? { ...v, stage } : v))
        }));
        get().addToast({
          title: 'Vendor Stage Updated',
          message: `Moved to "${stage}".`,
          type: 'info'
        });
      },

      resolveAlert: (id) => {
        set((state) => ({
          alerts: state.alerts.map((a) => (a.id === id ? { ...a, isResolved: true } : a))
        }));
        get().addToast({
          title: 'Risk Mitigated',
          message: 'Action logged in audit trail.',
          type: 'success'
        });
      },

      createEvent: (eventData) => {
        const id = 'event-' + Date.now();
        const newEvent: EventItem = {
          ...eventData,
          id
        };
        set((state) => ({
          events: [newEvent, ...state.events]
        }));
        get().addToast({
          title: 'New Event Launched',
          message: `${newEvent.name} created with auto-phased timeline.`,
          type: 'success'
        });
      },

      addMeeting: (meetingData) => {
        const id = 'm-' + Date.now();
        const newMeeting: MeetingItem = {
          ...meetingData,
          id
        };
        set((state) => ({
          meetings: [newMeeting, ...state.meetings]
        }));
        get().addToast({
          title: 'Meeting Logged',
          message: 'AI decision matrix generated.',
          type: 'info'
        });
      },

      convertMeetingToTasks: (meetingId) => {
        const state = get();
        const meeting = state.meetings.find((m) => m.id === meetingId);
        if (!meeting) return;

        const generatedTasks: DepartmentTask[] = meeting.actionItems.map((item, idx) => ({
          id: `task-m-${meetingId}-${idx}`,
          eventId: meeting.eventId,
          department: 'Production',
          title: item.task,
          location: 'Main Venue',
          scheduledTime: item.dueDate || '5:00 PM',
          assigneeName: item.owner || 'Rahul (Volunteer 1)',
          priority: 'high',
          status: 'todo'
        }));

        set({
          tasks: [...generatedTasks, ...state.tasks]
        });

        get().addToast({
          title: 'AI Tasks Deployed',
          message: `${generatedTasks.length} action items converted to live department tasks.`,
          type: 'success'
        });
      },

      parseAndApplyWhatsApp: (text) => {
        const state = get();
        const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        // Detect keywords
        let dept: DepartmentName = 'F&B';
        if (/sound|mic|light|led|stage|screen/i.test(text)) dept = 'Production';
        else if (/decor|flower|stage|backdrop|carpet/i.test(text)) dept = 'Decor';
        else if (/badge|scan|guest|entry|kiosk/i.test(text)) dept = 'Registration';
        else if (/chair|table|truck|delivery/i.test(text)) dept = 'Logistics';

        const newTask: DepartmentTask = {
          id: 'task-wa-' + Date.now(),
          eventId: state.currentEventId,
          department: dept,
          title: text.length > 40 ? text.substring(0, 40) + '...' : text,
          description: `Imported via WhatsApp parser: "${text}"`,
          location: 'Venue Ground',
          scheduledTime: timeNow,
          assigneeName: 'Rahul (Volunteer 1)',
          priority: 'medium',
          status: 'done',
          completedAt: timeNow,
          proofUrl: PROOF_IMAGES[0]
        };

        const newActivity: ActivityItem = {
          id: 'act-wa-' + Date.now(),
          timestamp: timeNow,
          department: dept,
          title: `${newTask.title} (WhatsApp Sync)`,
          actor: 'Rahul (Volunteer 1)',
          proofUrl: PROOF_IMAGES[0],
          eventId: state.currentEventId,
          severity: 'success'
        };

        confetti({
          particleCount: 50,
          spread: 60,
          colors: ['#0e9aa7', '#2f7be8', '#cdbbf0']
        });

        set({
          tasks: [newTask, ...state.tasks],
          activities: [newActivity, ...state.activities]
        });

        get().addToast({
          title: 'WhatsApp Message Structured',
          message: `Parsed into ${dept} department > Completed > Live sync active!`,
          type: 'success'
        });

        return true;
      },

      toggleSimulation: () => {
        const nextState = !get().isSimulating;
        set({ isSimulating: nextState });
        get().addToast({
          title: nextState ? 'Simulation Active' : 'Simulation Paused',
          message: nextState ? 'Firing real-time event updates every 10 seconds.' : 'Real-time simulation stopped.',
          type: 'info'
        });
      },

      checkInVolunteer: () => {
        confetti({
          particleCount: 40,
          spread: 45,
          colors: ['#0e9aa7', '#5fe3c0', '#ffffff']
        });
        get().addToast({
          title: 'Shift Verified',
          message: 'Geo-tagged attendance confirmed. Assigned to F&B and Logistics zone.',
          type: 'success'
        });
      },

      resetToDefaultData: () => {
        set({
          events: INITIAL_EVENTS,
          tasks: INITIAL_TASKS,
          vendors: INITIAL_VENDORS,
          logistics: INITIAL_LOGISTICS,
          activities: INITIAL_ACTIVITIES,
          alerts: INITIAL_ALERTS,
          isSimulating: false
        });
        get().addToast({
          title: 'Active Operations Restored',
          message: 'All department deliverables reset to live operational mix (To-Do, In-Progress, and Done).',
          type: 'info'
        });
      }
    }),
    {
      name: 'syncora-store-v6',
      onRehydrateStorage: () => (state) => {
        if (state) {
          // If tasks have 0 todo or 0 in-progress, or all done, restore balanced state
          const hospTasks = state.tasks.filter((t) => t.department === 'Hospitality');
          const isHospAllDone = hospTasks.length > 0 && hospTasks.every((t) => t.status === 'done' || t.status === 'approved');
          const noTodo = state.tasks.filter((t) => t.status === 'todo').length === 0;
          if (isHospAllDone || noTodo) {
            state.tasks = INITIAL_TASKS;
            state.events = INITIAL_EVENTS;
            state.isSimulating = false;
          }
        }
      }
    }
  )
);
