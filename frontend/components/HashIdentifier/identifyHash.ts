export type HashCandidate = {
  algorithm: string
  description: string
}

type HashDefinition = HashCandidate & {
  pattern: RegExp
}

const HASH_DEFINITIONS: HashDefinition[] = [
  { algorithm: 'MD5', description: '32 hex characters', pattern: /^[a-f0-9]{32}$/i },
  { algorithm: 'SHA-1', description: '40 hex characters', pattern: /^[a-f0-9]{40}$/i },
  { algorithm: 'SHA-224', description: '56 hex characters', pattern: /^[a-f0-9]{56}$/i },
  { algorithm: 'SHA-256', description: '64 hex characters', pattern: /^[a-f0-9]{64}$/i },
  { algorithm: 'SHA-384', description: '96 hex characters', pattern: /^[a-f0-9]{96}$/i },
  { algorithm: 'SHA-512', description: '128 hex characters', pattern: /^[a-f0-9]{128}$/i },
  {
    algorithm: 'bcrypt',
    description: '$2a$/$2b$/$2y$ prefix, cost + 53-char salt/hash',
    pattern: /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/,
  },
]

export const identifyHash = (input: string): HashCandidate[] => {
  const trimmed = input.trim()
  if (!trimmed) return []

  return HASH_DEFINITIONS
    .filter(({ pattern }) => pattern.test(trimmed))
    .map(({ algorithm, description }) => ({ algorithm, description }))
}
