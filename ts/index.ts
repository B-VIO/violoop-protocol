// Violoop Protocol TypeScript Implementation
import { encode, decode } from '@msgpack/msgpack';
import nacl from 'tweetnacl';

// Re-export all event types
export * from './events';
export * from './control';
export * from './crypto';

// Protocol version
export const PROTOCOL_VERSION = '0.1.0';

// Base interfaces
export interface ProtocolMessage {
  id: string;
  timestamp: number;
  version?: string;
}

// Message encoding/decoding
export class MessageCodec {
  static encode(message: ProtocolMessage): Uint8Array {
    return encode(message);
  }

  static decode<T extends ProtocolMessage>(data: Uint8Array): T {
    return decode(data) as T;
  }
}

// Nonce generation
export function generateNonce(): string {
  const nonce = nacl.randomBytes(24);
  return Buffer.from(nonce).toString('base64');
}

// Timestamp utilities
export function getCurrentTimestamp(): number {
  return Date.now();
}

export function validateTimestamp(timestamp: number, maxAgeMs: number = 60000): boolean {
  const now = getCurrentTimestamp();
  const age = Math.abs(now - timestamp);
  return age <= maxAgeMs;
}