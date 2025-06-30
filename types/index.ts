export enum SubscriptionType {
  Indep = "Indep",
  VSB = "VSB",
  SMB = "SMB",
}

export enum SubscriptionState {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  CANCELED = "CANCELED",
}

export enum TransactionType {
  payment = "payment",
  refund = "refund",
  chargeback = "chargeback",
}

export enum InvoiceType {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
}

export enum ConsentType {
  TERMS = "TERMS",
  MARKETING = "MARKETING",
  PAYMENTS = "PAYMENTS",
}

export enum RecoState {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export enum ProjectState {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  ARCHIVED = "ARCHIVED",
}

export enum ProjectChoiceState {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export enum InvoicesSatus {
  DARFT = "DARFT",
  SENT = "SENT",
  PAID = "PAID",
  OVERDUE = "OVERDUE",
  CANCELED = "CANCELED",
}

export enum TransactionState {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export interface User {
  id?: string;
  linkedin?: string | null;
  website?: string | null;
  youtube?: string | null;
  instagram?: string | null;
  lastName: string;
  firstName: string;
  email: string;
  photoUrl?: string | null;
  jobTitle?: string | null;
  address: string;
  addressComplement?: string;
  postalCode: number | undefined;
  city: string;
  country: string;
  createdAt?: Date | string;
  updatedAt: Date | string;
  lastLogin?: (Date | string) | null;
  phone: string;
  password: string;
  domainId: string;
  companyId?: string | null;
  isAdmin?: boolean;
  rententionDate: Date | string;
  consentTerms?: boolean;
  consentMarketing?: boolean;
}

export interface JobDomain {
  id?: string;
  domaine: string;
  createdAt?: Date | string;
  updatedAt: Date | string;
}

export interface Company {
  id?: string;
  name: string;
  address: string;
  addressComplement?: string;
  postalCode: number | undefined;
  city: string;
  country: string;
  createdAt?: Date | string;
  updatedAt: Date | string;
  lastLogin: Date | string;
  recommendationRate?: string | null;
  email: string;
  phone: string;
  website?: string | null;
  photoUrl?: string | null;
  description?: string | null;
  linkedin?: string | null;
  subscriptionId?: string | null;
  ownerId: string;
  retentionDate: Date | string;
}

export interface Subscription {
  id?: string;
  startDate: Date | string;
  duration: number;
  type: SubscriptionType;
  state: SubscriptionState;
  endDate: Date | string;
  cancelledDate?: (Date | string) | null;
  retentionDate?: (Date | string) | null;
  createdAt?: Date | string;
  updatedAt: Date | string;
  companyId?: string | null;
}

export interface Recommandation {
  id?: string;
  createdAt?: Date | string;
  updatedAt: Date | string;
  priority?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  addressComplement?: string | null;
  postalCode: number | undefined;
  city: string;
  description?: string | null;
  startDate?: (Date | string) | null;
  inProgressAt?: (Date | string) | null;
  endDate?: (Date | string) | null;
  isAccepted?: boolean;
  RecoStateInitiator?: RecoState;
  rejectionReasonInitiator?: string | null;
  RecoStateCompany?: RecoState;
  rejectionReasonCompany?: string | null;
  companyId: string;
  initiatorId: string;
  recipientId?: string | null;
  retentionDate?: (Date | string) | null;
}

export interface Project {
  id?: string;
  createdAt?: Date | string;
  updatedAt: Date | string;
  name: string;
  description?: string | null;
  startDate?: (Date | string) | null;
  endDate?: (Date | string) | null;
  priority?: number;
  isPublic?: boolean;
  companyId: string;
  projectState?: ProjectState;
  ProjectChoiceCompany: ProjectChoiceState;
  RejectionReasonCompany?: string | null;
  userId: string;
  retentionDate?: (Date | string) | null;
}

export interface CompanyProject {
  createdAt?: Date | string;
  updatedAt: Date | string;
  projectId: string;
  companyId: string;
  retentionDate?: (Date | string) | null;
  UserChoiceState?: ProjectChoiceState;
}

export interface Review {
  id?: string;
  createdAt?: Date | string;
  updatedAt: Date | string;
  rating?: number;
  comment?: string | null;
  userId: string;
  projectId?: string | null;
  companyId: string;
  retentionDate?: (Date | string) | null;
}

export interface Transaction {
  id?: string;
  externalId?: string | null;
  createdAt?: Date | string;
  updatedAt: Date | string;
  amount: number;
  type: TransactionType;
  currency: string;
  State?: TransactionState;
  processingDate?: (Date | string) | null;
  subscriptionId: string;
  retentionDate?: (Date | string) | null;
  PaymentMethodId?: string | null;
}

export interface PaymentMethod {
  id?: string;
  paymentToken: string;
  paymentProvider: string;
  createdAt?: Date | string;
  updatedAt: Date | string;
  type: string;
  lastFourDigits?: string | null;
  cardHolderName?: string | null;
  expirationMonth?: number | null;
  expirationYear?: number | null;
  consentDate?: (Date | string) | null;
  consentType: ConsentType;
  consented?: boolean;
  details?: string | null;
  processingDate?: (Date | string) | null;
  userId: string;
  retentionDate?: (Date | string) | null;
}

export interface Invoice {
  id?: string;
  name: string;
  address: string;
  postalCode: number | undefined;
  city: string;
  VATNumber?: string | null;
  billingPeriodStart: Date | string;
  billingPeriodEnd: Date | string;
  issuedAt?: Date | string;
  dueAt: Date | string;
  paidAt?: (Date | string) | null;
  Status?: InvoicesSatus;
  retentionDate?: (Date | string) | null;
  amount: number;
  currency: string;
  tax_ammount?: number | null;
  subscriptionId?: string | null;
  type?: InvoiceType;
}

export interface RGPD {
  id?: string;
  createdAt?: Date | string;
  updatedAt: Date | string;
  consentType: ConsentType;
  consented?: boolean;
  consentVersion?: string | null;
  consentDate?: (Date | string) | null;
  consentText?: string | null;
  IP?: string | null;
  UserAgent?: string | null;
  userId: string;
  retentionDate?: (Date | string) | null;
}
