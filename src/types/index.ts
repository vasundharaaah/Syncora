export type Role = 'owner' | 'event-head' | 'team-lead' | 'volunteer';

export type EventStatus = 'Upcoming' | 'Ongoing' | 'Closed';

export type HealthStatus = 'healthy' | 'at-risk' | 'critical';

export type DepartmentName = 
  | 'F&B'
  | 'Decor'
  | 'Logistics'
  | 'Production'
  | 'Registration'
  | 'Hospitality'
  | 'Transport'
  | 'Guest Management'
  | 'Backstage';

export interface DepartmentTask {
  id: string;
  eventId: string;
  department: DepartmentName;
  title: string;
  description?: string;
  location: string;
  scheduledTime: string;
  assigneeName: string;
  assigneeAvatar?: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in-progress' | 'done' | 'approved';
  proofUrl?: string;
  completedAt?: string;
  reviewComment?: string;
}

export interface VendorPipelineItem {
  id: string;
  name: string;
  category: string;
  quoteAmount: number;
  stage: 'Potential' | 'Shortlisted' | 'Site Visit' | 'Negotiating' | 'Finalized' | 'Contract Signed' | 'Advance Paid';
  rating: number;
  reliabilityNote: string;
  reliabilityScore: number; // e.g. 92%
  isLateRisk?: boolean;
  contactPerson: string;
  phone: string;
  quoteHistory: { date: string; amount: number; note: string }[];
}

export interface LogisticsItem {
  id: string;
  eventId: string;
  item: string;
  quantity: string;
  vendor: string;
  deliveryTime: string;
  status: 'Pending' | 'In Transit' | 'Arrived' | 'Delayed';
  department: DepartmentName;
}

export interface EventItem {
  id: string;
  name: string;
  client: string;
  date: string;
  eventHead: string;
  budget: number; // in INR (e.g. 2500000 = 25L)
  projectedProfit: number; // in INR
  actualProfit?: number;
  health: number; // 0 - 100
  planningCompletion: number; // 0 - 100
  status: EventStatus;
  location: string;
  attendeesCount: number;
}

export interface ActivityItem {
  id: string;
  timestamp: string;
  department: DepartmentName;
  title: string;
  actor: string;
  proofUrl?: string;
  eventId: string;
  severity?: 'info' | 'success' | 'alert';
}

export interface RiskAlert {
  id: string;
  eventId: string;
  eventName: string;
  severity: 'critical' | 'at-risk' | 'info';
  title: string;
  description: string;
  suggestedAction: string;
  isResolved: boolean;
}

export interface MeetingItem {
  id: string;
  eventId: string;
  title: string;
  date: string;
  rawNotes?: string;
  decisions: string[];
  actionItems: { task: string; owner: string; dueDate: string }[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: Role;
  department?: DepartmentName;
  avatar: string;
  phone: string;
  activeTasksCount: number;
  isAvailable: boolean;
  overlapWarning?: string;
}
