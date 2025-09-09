// Event type definitions

export interface EventSource {
  component: 'lite' | 'pro' | 'desktop' | 'mobile' | 'agent';
  session_id: string;
  device_id?: string;
  user_id?: string;
}

export interface ActionRequest {
  type: 'shell' | 'file_write' | 'file_delete' | 'network' | 'system' | 'power';
  command: string;
  parameters?: Record<string, any>;
  estimated_impact?: string;
}

export interface PromptEvent {
  id: string;
  timestamp: number;
  nonce: string;
  source: EventSource;
  action: ActionRequest;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  context?: Record<string, any>;
}

export interface DecisionEvent {
  id: string;
  prompt_id: string;
  timestamp: number;
  decision: 'approve' | 'reject' | 'modify';
  signature: string;
  signer_public_key: string;
  modifications?: Record<string, any>;
  reason?: string;
}

export interface AuditRecord {
  id: string;
  timestamp: number;
  event_type: string;
  hash: string;
  prev_hash: string;
  data?: Record<string, any>;
  signature?: string;
}

export interface StatusEvent {
  id: string;
  timestamp: number;
  source: EventSource;
  status: 'online' | 'offline' | 'error' | 'busy';
  metrics?: {
    cpu_usage?: number;
    memory_usage?: number;
    temperature?: number;
    latency_ms?: number;
    fps?: number;
  };
  message?: string;
}