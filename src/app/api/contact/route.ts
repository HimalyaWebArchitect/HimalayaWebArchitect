import { NextResponse } from "next/server"

type ContactBody = {
  name?: string
  email?: string
  message?: string
  phone?: string
  phoneCountry?: string
}

export async function POST(request: Request) {
  try {
    const body: ContactBody = await request.json()

    // Basic validation
    if (!body || !body.name || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    // TODO: wire this up to an email provider or database
    // For now just log and return success so the client fallback works.
    // Server logging is useful during local development.
    // eslint-disable-next-line no-console
    console.log("Contact form submitted:", {
      name: body.name,
      email: body.email,
      phoneCountry: (body as any).phoneCountry,
      phone: body.phone,
      message: body.message,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("/api/contact error:", err)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
