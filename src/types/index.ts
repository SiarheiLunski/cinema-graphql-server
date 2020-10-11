export interface JWTPayload {
  id?: string;
}

export interface UserAuthenticated {
  id: string;
  email: string;
  confirmed: boolean;
}

export type OperationType = '*' | 'create' | 'read' | 'update' | 'delete';
