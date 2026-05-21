const rateLimit = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 5,
  windowMs: number = 60000
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const key = identifier;

  const existing = rateLimit.get(key);

  if (!existing || now > existing.resetTime) {
    rateLimit.set(key, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (existing.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  existing.count++;
  return { allowed: true, remaining: maxRequests - existing.count };
}
