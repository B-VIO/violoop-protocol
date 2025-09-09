# Violoop Protocol

Event schemas and protocol definitions for the Violoop ecosystem.

## Overview

This repository contains the core protocol definitions that enable secure communication between Violoop components:
- **Lite**: Smart KVM gateway (RV1106)
- **Pro**: Edge AI memory station (RK3576)
- **Desktop**: macOS control center
- **Mobile**: iOS approval authenticator

## Key Features

- **MsgPack** binary serialization for efficiency
- **Ed25519** cryptographic signatures for approval chain
- **Versioned schemas** with compatibility guarantees
- **Code generation** for TypeScript, Swift, and Rust

## Protocol Version

Current: `v0.1.0`

## Events

### Core Events
- `PromptEvent`: Request for user approval
- `DecisionEvent`: Signed approval/rejection
- `AuditRecord`: Immutable audit trail entry
- `ControlEvent`: Device control commands
- `StatusEvent`: Component health/status updates

### Cloud Relay Events
- `RelayRequest`: Request for cloud relay session
- `RelaySession`: Active relay session state
- `MobileStreamRequest`: Mobile streaming request
- `RelayMetrics`: Relay performance metrics

## Security Model

All critical events use:
- Ed25519 signatures for authenticity
- Nonces to prevent replay attacks
- Timestamps for temporal validation
- Hash chains for audit integrity

## Usage

### TypeScript
```typescript
import { PromptEvent, DecisionEvent } from '@b-vio/protocol';
```

### Swift
```swift
import VioloopProtocol
```

### Rust
```rust
use violoop_protocol::{PromptEvent, DecisionEvent};
```

## License

MIT OR Apache-2.0