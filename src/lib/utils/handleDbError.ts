export function handleDbError(error: unknown, context: string): never {
  console.error(`❌ ${context}:`, error);
  const errorMessage = error instanceof Error ? error.message : "Unknown database error";
  throw new Error(`Database error: ${context} - ${errorMessage}`);
}
