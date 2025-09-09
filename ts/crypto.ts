// Cryptographic utilities for the approval chain
import nacl from 'tweetnacl';
import { createHash } from 'crypto';

export class CryptoUtils {
  // Generate Ed25519 keypair
  static generateKeyPair(): { publicKey: Uint8Array; secretKey: Uint8Array } {
    return nacl.sign.keyPair();
  }

  // Sign a message with Ed25519
  static sign(message: Uint8Array, secretKey: Uint8Array): Uint8Array {
    return nacl.sign.detached(message, secretKey);
  }

  // Verify Ed25519 signature
  static verify(
    message: Uint8Array,
    signature: Uint8Array,
    publicKey: Uint8Array
  ): boolean {
    return nacl.sign.detached.verify(message, signature, publicKey);
  }

  // Create SHA-256 hash
  static hash(data: Uint8Array): string {
    return createHash('sha256').update(data).digest('hex');
  }

  // Create hash chain link
  static createChainHash(current: any, prevHash: string): string {
    const data = JSON.stringify({ ...current, prev_hash: prevHash });
    return this.hash(Buffer.from(data));
  }

  // Convert keys to/from base64
  static keyToBase64(key: Uint8Array): string {
    return Buffer.from(key).toString('base64');
  }

  static keyFromBase64(key: string): Uint8Array {
    return Buffer.from(key, 'base64');
  }
}

// Decision signing helper
export class DecisionSigner {
  constructor(
    private secretKey: Uint8Array,
    private publicKey: Uint8Array
  ) {}

  signDecision(decision: {
    prompt_id: string;
    decision: 'approve' | 'reject' | 'modify';
    timestamp: number;
    modifications?: any;
  }): string {
    const message = Buffer.from(JSON.stringify(decision));
    const signature = CryptoUtils.sign(message, this.secretKey);
    return CryptoUtils.keyToBase64(signature);
  }

  getPublicKeyBase64(): string {
    return CryptoUtils.keyToBase64(this.publicKey);
  }
}