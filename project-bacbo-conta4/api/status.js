export async function GET() {
  return new Response(JSON.stringify({ status: 'online', message: 'API status OK' }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
