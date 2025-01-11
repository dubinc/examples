export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      dubLeadCreated?: string;
    };
  }
}
