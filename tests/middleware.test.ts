import { NextRequest, NextResponse } from 'next/server';
import { GET } from '@/app/api/auth/[...nextauth]/route';

describe('Authentication', () => {
  it('should handle unauthenticated session', async () => {
    const request = new NextRequest('http://localhost:3000/api/auth/session');
    const response = await GET(request);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data).toBeDefined();
  });
});
