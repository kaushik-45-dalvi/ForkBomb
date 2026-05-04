export interface Challenge {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Savage";
  timeLimit: string;
  description: string;
  constraints: string[];
  initialCode: string;
  language: string;
}

export const challenges: Challenge[] = [
  {
    id: "fork-bomb-optimization",
    title: "Fork Bomb Optimization",
    difficulty: "Hard",
    timeLimit: "500ms",
    description: "Given a recursive process tree, identify the most efficient way to trigger a system-wide crash by optimizing the fork sequence. Your goal is to maximize process propagation while staying within memory limits until the final blast() call.",
    constraints: [
      "N < 10,000 nodes",
      "Recursive depth limited to 512",
      "Memory usage must not exceed 256MB"
    ],
    initialCode: "def solve():\n    # Write your solution here\n    pass",
    language: "python"
  },
  {
    id: "kernel-injection",
    title: "Kernel Packet Injection",
    difficulty: "Savage",
    timeLimit: "300ms",
    description: "Intercept incoming TCP packets and inject a payload without corrupting the checksum. You must bypass the kernel's built-in validation by spoofing the sequence numbers in real-time.",
    constraints: [
      "Packets/sec > 1,000,000",
      "Checksum must match exactly",
      "Zero-copy architecture required"
    ],
    initialCode: "def intercept(packet):\n    # Inject payload here\n    return packet",
    language: "python"
  },
  {
    id: "heap-overflow-exploit",
    title: "Heap Overflow Exploit",
    difficulty: "Medium",
    timeLimit: "1000ms",
    description: "Calculate the exact offset required to overwrite the return address on the stack. You are given a buffer of size N and a target memory address.",
    constraints: [
      "Buffer size is variable",
      "ASLR is enabled",
      "Payload must be null-terminated"
    ],
    initialCode: "def calculate_offset(buffer_size, target_addr):\n    # Return the offset\n    return 0",
    language: "python"
  },
  {
    id: "memory-leak-detection",
    title: "Memory Leak Detection",
    difficulty: "Medium",
    timeLimit: "1500ms",
    description: "Given a trace of memory allocations and deallocations, identify the exact instruction pointer that caused a memory leak. The trace contains millions of operations, requiring an O(N) or better approach.",
    constraints: [
      "Trace length up to 5,000,000 operations",
      "Must run in under 1.5 seconds"
    ],
    initialCode: "def find_leak(trace):\n    # Return the instruction pointer\n    return '0x00000000'",
    language: "python"
  },
  {
    id: "quantum-state-decryption",
    title: "Quantum State Decryption",
    difficulty: "Savage",
    timeLimit: "250ms",
    description: "A server is broadcasting an encrypted token. You must simulate a Shor's algorithm derivation to factorize the RSA key before the quantum superposition collapses. Speed is your only ally.",
    constraints: [
      "Key size: 1024-bit",
      "Must use bitwise optimizations",
      "No external math libraries allowed"
    ],
    initialCode: "def decrypt_token(public_key):\n    # Extract the private prime factors\n    return (0, 0)",
    language: "python"
  }
];
