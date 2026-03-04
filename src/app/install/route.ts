export async function GET() {
  return Response.redirect(
    "https://raw.githubusercontent.com/alexanderfrey/tailbus/main/install.sh",
    302
  );
}
