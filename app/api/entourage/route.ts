import { type NextRequest, NextResponse } from "next/server"
import { entourage as fallbackEntourage } from "@/content/site"

// Replace this with your Entourage Google Apps Script URL
const ENTOURAGE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxs7K9ehZ-4uenkhatbe2WCpDD4i5_-XX4VSpH_Vrv4J2ZzggqLP7rmf2L7UO3lMR_f/exec'

// Entourage interface
export interface Entourage {
  Name: string
  RoleCategory: string
  RoleTitle: string
  Email: string
}

/** Transform static entourage format to API format. Used as dev fallback when Google Apps Script is unreachable (e.g. localhost). */
function toApiFormat(item: { role: string; name: string; group?: string }): Entourage {
  const roleToCategory: Record<string, string> = {
    "Best Man": "Best Man",
    "Matron of Honor": "Matron of Honor",
    "Bridesmaid": "Bridesmaids",
    "Groomsman": "Groomsmen",
    "Flower Girl": "Flower Girls",
    "Little Bride": "Flower Girls",
    "Ring Bearer": "Ring/Coin Bearers",
    "Coin Bearer": "Ring/Coin Bearers",
  }
  let category = roleToCategory[item.role] || item.role
  if (item.group === "kate-family") category = "Parents of the Bride"
  else if (item.group === "christian-family") category = "Parents of the Groom"
  else if (item.group === "candle") category = "Candle Sponsors"
  else if (item.group === "cord") category = "Cord Sponsors"
  return { Name: item.name, RoleCategory: category, RoleTitle: item.role, Email: "" }
}

// GET: Fetch all entourage
export async function GET() {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)
    const response = await fetch(ENTOURAGE_SCRIPT_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; WeddingSite/1.0)',
      },
      cache: 'no-store',
      signal: controller.signal,
    })
    clearTimeout(timeoutId)

    const text = await response.text()

    if (!response.ok) {
      console.warn('[Entourage API] Google Apps Script failed:', { status: response.status, body: text.slice(0, 200) })
      if (process.env.NODE_ENV === 'development') {
        const fallback = fallbackEntourage.map(toApiFormat)
        console.warn('[Entourage API] Using static fallback data for localhost')
        return NextResponse.json(fallback)
      }
      return NextResponse.json([])
    }

    let data: unknown
    try {
      data = JSON.parse(text)
    } catch {
      console.warn('[Entourage API] Invalid JSON from script. Snippet:', text.slice(0, 200))
      if (process.env.NODE_ENV === 'development') {
        const fallback = fallbackEntourage.map(toApiFormat)
        return NextResponse.json(fallback)
      }
      return NextResponse.json([])
    }

    if (!Array.isArray(data)) {
      console.warn('[Entourage API] Expected array, got:', typeof data)
      if (process.env.NODE_ENV === 'development') {
        const fallback = fallbackEntourage.map(toApiFormat)
        return NextResponse.json(fallback)
      }
      return NextResponse.json([])
    }

    return NextResponse.json(data)
  } catch (error) {
    console.warn('[Entourage API] Error fetching entourage:', error)
    if (process.env.NODE_ENV === 'development') {
      const fallback = fallbackEntourage.map(toApiFormat)
      return NextResponse.json(fallback)
    }
    return NextResponse.json([])
  }
}

// POST: Add a new entourage member
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { Name, RoleCategory, RoleTitle, Email } = body

    // Validation
    if (!Name || typeof Name !== 'string') {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    const entourageData = {
      Name: Name.trim(),
      RoleCategory: RoleCategory?.trim() || '',
      RoleTitle: RoleTitle?.trim() || '',
      Email: Email?.trim() || '',
    }

    const response = await fetch(ENTOURAGE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entourageData),
    })

    if (!response.ok) {
      throw new Error('Failed to add entourage member')
    }

    const data = await response.json()
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Error adding entourage member:', error)
    return NextResponse.json(
      { error: 'Failed to add entourage member' },
      { status: 500 }
    )
  }
}

// PUT: Update an existing entourage member
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { Name, RoleCategory, RoleTitle, Email, originalName } = body

    // Validation
    if (!Name || typeof Name !== 'string') {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    const updateData = {
      action: 'update',
      originalName: originalName || Name, // Use originalName for lookup, Name for update
      Name: Name.trim(),
      RoleCategory: RoleCategory?.trim() || '',
      RoleTitle: RoleTitle?.trim() || '',
      Email: Email?.trim() || '',
    }

    const response = await fetch(ENTOURAGE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })

    if (!response.ok) {
      throw new Error('Failed to update entourage member')
    }

    const data = await response.json()
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error('Error updating entourage member:', error)
    return NextResponse.json(
      { error: 'Failed to update entourage member' },
      { status: 500 }
    )
  }
}

// DELETE: Delete an entourage member
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { Name } = body

    // Validation
    if (!Name || typeof Name !== 'string') {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    const deleteData = {
      action: 'delete',
      Name: Name.trim(),
    }

    const response = await fetch(ENTOURAGE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deleteData),
    })

    if (!response.ok) {
      throw new Error('Failed to delete entourage member')
    }

    const data = await response.json()
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error('Error deleting entourage member:', error)
    return NextResponse.json(
      { error: 'Failed to delete entourage member' },
      { status: 500 }
    )
  }
}

