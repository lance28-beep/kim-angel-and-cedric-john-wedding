import { type NextRequest, NextResponse } from "next/server"
import { principalSponsors as fallbackSponsors } from "@/content/site"

// You'll need to replace this with your PrincipalSponsor Google Apps Script URL
const PRINCIPAL_SPONSOR_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxl-_WXNHX3z1ErOWGVmqx4UOFILa-TeCtZhXO6AAA-_R-w3kL3LfIwVzIW0bGtu6wp/exec'

// PrincipalSponsor interface matching the Google Sheets structure
export interface PrincipalSponsor {
  MalePrincipalSponsor: string
  FemalePrincipalSponsor: string
}

/** Transform static format to API format. Used as dev fallback when Google Apps Script is unreachable (e.g. localhost). */
function toApiFormat(item: { name: string; spouse: string }): PrincipalSponsor {
  if (!item.spouse && (item.name.startsWith("Mrs.") || item.name.startsWith("Dr."))) {
    return { MalePrincipalSponsor: "", FemalePrincipalSponsor: item.name }
  }
  return { MalePrincipalSponsor: item.name, FemalePrincipalSponsor: item.spouse || "" }
}

// GET: Fetch all principal sponsors
export async function GET() {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)
    const response = await fetch(PRINCIPAL_SPONSOR_SCRIPT_URL, {
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
      console.warn('[PrincipalSponsor API] Google Apps Script failed:', { status: response.status, body: text.slice(0, 200) })
      if (process.env.NODE_ENV === 'development') {
        const fallback = fallbackSponsors.map(toApiFormat)
        console.warn('[PrincipalSponsor API] Using static fallback data for localhost')
        return NextResponse.json(fallback)
      }
      return NextResponse.json([])
    }

    let data: unknown
    try {
      data = JSON.parse(text)
    } catch {
      console.warn('[PrincipalSponsor API] Invalid JSON from script. Snippet:', text.slice(0, 200))
      if (process.env.NODE_ENV === 'development') {
        const fallback = fallbackSponsors.map(toApiFormat)
        return NextResponse.json(fallback)
      }
      return NextResponse.json([])
    }

    if (!Array.isArray(data)) {
      console.warn('[PrincipalSponsor API] Expected array, got:', typeof data)
      if (process.env.NODE_ENV === 'development') {
        const fallback = fallbackSponsors.map(toApiFormat)
        return NextResponse.json(fallback)
      }
      return NextResponse.json([])
    }

    return NextResponse.json(data)
  } catch (error) {
    console.warn('[PrincipalSponsor API] Error fetching principal sponsors:', error)
    if (process.env.NODE_ENV === 'development') {
      const fallback = fallbackSponsors.map(toApiFormat)
      return NextResponse.json(fallback)
    }
    return NextResponse.json([])
  }
}

// POST: Add a new principal sponsor
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { MalePrincipalSponsor, FemalePrincipalSponsor } = body

    // Validation
    if (!MalePrincipalSponsor || typeof MalePrincipalSponsor !== 'string') {
      return NextResponse.json(
        { error: 'MalePrincipalSponsor is required' },
        { status: 400 }
      )
    }

    const sponsorData = {
      MalePrincipalSponsor: MalePrincipalSponsor.trim(),
      FemalePrincipalSponsor: FemalePrincipalSponsor?.trim() || '',
    }

    const response = await fetch(PRINCIPAL_SPONSOR_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sponsorData),
    })

    if (!response.ok) {
      throw new Error('Failed to add principal sponsor')
    }

    const data = await response.json()
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Error adding principal sponsor:', error)
    return NextResponse.json(
      { error: 'Failed to add principal sponsor' },
      { status: 500 }
    )
  }
}

// PUT: Update an existing principal sponsor
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { MalePrincipalSponsor, FemalePrincipalSponsor, originalName } = body

    // Validation
    if (!MalePrincipalSponsor || typeof MalePrincipalSponsor !== 'string') {
      return NextResponse.json(
        { error: 'MalePrincipalSponsor is required' },
        { status: 400 }
      )
    }

    const updateData = {
      action: 'update',
      originalName: originalName || MalePrincipalSponsor, // Use originalName for lookup, MalePrincipalSponsor for update
      MalePrincipalSponsor: MalePrincipalSponsor.trim(),
      FemalePrincipalSponsor: FemalePrincipalSponsor?.trim() || '',
    }

    const response = await fetch(PRINCIPAL_SPONSOR_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })

    if (!response.ok) {
      throw new Error('Failed to update principal sponsor')
    }

    const data = await response.json()
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error('Error updating principal sponsor:', error)
    return NextResponse.json(
      { error: 'Failed to update principal sponsor' },
      { status: 500 }
    )
  }
}

// DELETE: Delete a principal sponsor
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { MalePrincipalSponsor } = body

    // Validation
    if (!MalePrincipalSponsor || typeof MalePrincipalSponsor !== 'string') {
      return NextResponse.json(
        { error: 'MalePrincipalSponsor is required' },
        { status: 400 }
      )
    }

    const deleteData = {
      action: 'delete',
      MalePrincipalSponsor: MalePrincipalSponsor.trim(),
    }

    const response = await fetch(PRINCIPAL_SPONSOR_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deleteData),
    })

    if (!response.ok) {
      throw new Error('Failed to delete principal sponsor')
    }

    const data = await response.json()
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error('Error deleting principal sponsor:', error)
    return NextResponse.json(
      { error: 'Failed to delete principal sponsor' },
      { status: 500 }
    )
  }
}

