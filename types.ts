export type UserRole = 'CUSTOMER' | 'WORKER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  city: string;
  state: string;
  pincode: string;
  address: string;
  lat?: number;
  lng?: number;
  cooperativeId?: string;
  createdAt: string;
}

export type SkillCategory = 
  | 'Electrical'
  | 'Plumbing'
  | 'Carpentry'
  | 'Painting'
  | 'Cleaning'
  | 'Domestic Help'
  | 'Gardening'
  | 'Driving'
  | 'Appliance Repair'
  | 'General Maintenance'
  | 'Care Services'
  | 'Other Services';

export type VerificationStatus = 'PENDING' | 'VERIFIED' | 'REJECTED' | 'SUSPENDED';

export interface WorkerCertification {
  id: string;
  workerId: string;
  title: string;
  issuingOrg: string;
  issueDate: string;
  expiryDate?: string;
  certNumber: string;
  status: VerificationStatus;
  docUrl?: string;
}

export interface WorkerWelfare {
  id: string;
  workerId: string;
  workerName: string;
  insuranceStatus: 'Active' | 'Pending' | 'Expired';
  insurancePolicyNumber: string;
  coverageAmount: number; // in INR
  healthCardNumber: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  safetyTrainingCompleted: boolean;
  pensionSchemeEnrolled: boolean;
  cooperativeMemberSince: string;
  dividendBalance: number; // in INR
  lastClaimDate?: string;
}

export interface WorkerAvailability {
  days: string[]; // ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  timeSlots: string[]; // ['08:00 - 12:00', '12:00 - 16:00', '16:00 - 20:00']
  isEmergencyAvailable: boolean;
  currentlyWorking: boolean;
}

export interface Worker {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  skills: SkillCategory[];
  primarySkill: SkillCategory;
  secondarySkills?: SkillCategory[];
  experienceYears: number;
  hourlyRate: number; // in INR
  rating: number; // 0.0 to 5.0
  reviewCount: number;
  completedJobsCount: number;
  verificationStatus: VerificationStatus;
  aadhaarVerified: boolean;
  policeVerified: boolean;
  cooperativeId: string;
  cooperativeName: string;
  city: string;
  state: string;
  pincode: string;
  address: string;
  lat: number;
  lng: number;
  bio: string;
  availability: WorkerAvailability;
  certifications: WorkerCertification[];
  welfare: WorkerWelfare;
  totalEarnings: number;
  todayEarnings: number;
  joinedDate: string;
  languages: string[];
}

export interface Customer {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  lat: number;
  lng: number;
  activeBookingsCount: number;
  totalSpent: number;
  savedWorkers: string[]; // worker IDs
}

export interface Cooperative {
  id: string;
  name: string;
  registrationNumber: string;
  state: string;
  district: string;
  address: string;
  memberCount: number;
  activeWorkersCount: number;
  establishedYear: number;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  sector: string;
  welfareFundBalance: number;
  presidentName: string;
}

export interface ServiceItem {
  id: string;
  category: SkillCategory;
  name: string;
  hindiName: string;
  iconName: string;
  description: string;
  hindiDescription: string;
  basePrice: number;
  estimatedDuration: string;
  popular: boolean;
  includedTasks: string[];
  safetyGuidelines: string[];
}

export type BookingStatus = 
  | 'PENDING'
  | 'ACCEPTED'
  | 'ON_THE_WAY'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export interface Booking {
  id: string;
  bookingNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerCity: string;
  customerPincode: string;
  customerLat?: number;
  customerLng?: number;
  workerId: string;
  workerName: string;
  workerPhone: string;
  workerAvatar: string;
  workerSkill: SkillCategory;
  serviceId: string;
  serviceName: string;
  serviceCategory: SkillCategory;
  date: string;
  timeSlot: string;
  status: BookingStatus;
  problemDescription: string;
  imageUrl?: string;
  isEmergency: boolean;
  baseAmount: number;
  cooperativeWelfareFee: number; // nominal ₹20-50 for worker fund
  gstAmount: number;
  totalAmount: number;
  paymentMethod?: 'UPI' | 'Card' | 'Net Banking' | 'Wallet';
  paymentStatus: 'PENDING' | 'PAID' | 'REFUNDED';
  transactionId?: string;
  receiptNumber?: string;
  paidAt?: string;
  createdAt: string;
  completedAt?: string;
  customerRating?: {
    overall: number;
    quality: number;
    punctuality: number;
    behavior: number;
    valueForMoney: number;
    reviewText: string;
    createdAt: string;
  };
  workerRatingOfCustomer?: {
    rating: number;
    feedback: string;
  };
}

export interface PaymentRecord {
  id: string;
  transactionId: string;
  receiptNumber: string;
  bookingId: string;
  bookingNumber: string;
  customerId: string;
  customerName: string;
  workerId: string;
  workerName: string;
  amount: number;
  workerPayout: number;
  welfareContribution: number;
  paymentMethod: 'UPI' | 'Card' | 'Net Banking' | 'Wallet';
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  timestamp: string;
  upiVpa?: string;
}

export interface ReviewItem {
  id: string;
  bookingId: string;
  workerId: string;
  workerName: string;
  customerId: string;
  customerName: string;
  customerAvatar?: string;
  serviceCategory: SkillCategory;
  overallRating: number;
  qualityRating: number;
  punctualityRating: number;
  behaviorRating: number;
  valueRating: number;
  comment: string;
  date: string;
  workerReply?: string;
  helpfulCount: number;
}

export interface Complaint {
  id: string;
  complaintNumber: string;
  bookingId: string;
  raisedBy: 'CUSTOMER' | 'WORKER';
  userId: string;
  userName: string;
  userPhone: string;
  targetId: string;
  targetName: string;
  category: 'Service Quality' | 'Punctuality' | 'Overcharging' | 'Behavior' | 'Damage' | 'Other';
  description: string;
  status: 'OPEN' | 'INVESTIGATING' | 'RESOLVED' | 'CLOSED';
  resolutionNotes?: string;
  filedDate: string;
  resolvedDate?: string;
}

export interface ProposalVote {
  userId: string;
  userRole: UserRole;
  userName: string;
  vote: 'YES' | 'NO' | 'ABSTAIN';
  votedAt: string;
}

export interface Proposal {
  id: string;
  proposalNumber: string;
  title: string;
  hindiTitle: string;
  description: string;
  hindiDescription: string;
  category: 'Welfare' | 'Wage Revision' | 'Training & Skilling' | 'Platform Policy' | 'Equipment Subsidy';
  proposedBy: string;
  cooperativeId: string;
  status: 'ACTIVE' | 'PASSED' | 'REJECTED' | 'EXPIRED';
  startDate: string;
  endDate: string;
  yesVotes: number;
  noVotes: number;
  abstainVotes: number;
  totalEligibleVoters: number;
  quorumPercentage: number;
  votes: ProposalVote[];
}

export interface DemandForecast {
  serviceCategory: SkillCategory;
  hindiCategory: string;
  historicalWeeklyAvg: number;
  currentDemand: number;
  predictedDemandNextWeek: number;
  demandTrend: 'VERY_HIGH' | 'HIGH' | 'MEDIUM' | 'LOW';
  growthPercentage: number;
  availableWorkers: number;
  requiredWorkers: number;
  recommendedAllocation: number; // additional workers needed or surplus
  peakDays: string[];
  aiExplanation: string;
  confidenceScore: number; // 0 to 100
}

export interface NotificationItem {
  id: string;
  userId: string;
  userRole: UserRole;
  title: string;
  message: string;
  type: 'BOOKING' | 'PAYMENT' | 'VERIFICATION' | 'GOVERNANCE' | 'WELFARE' | 'EMERGENCY';
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface SmartMatchResult {
  worker: Worker;
  score: number; // 0-100
  breakdown: {
    skillMatch: number; // out of 30
    distanceScore: number; // out of 25
    ratingScore: number; // out of 20
    availabilityScore: number; // out of 15
    experienceScore: number; // out of 10
  };
  distanceKm: number;
  highlights: string[];
}
