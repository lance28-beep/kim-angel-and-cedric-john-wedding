import { type NextRequest, NextResponse } from "next/server"

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzyRz2FAGgEvY2ACWD9tItrnK4Q4IhAzAE3MFeCoFluu4BX4GEUEzSE1Ioue3WHKugp/exec'

// Guest interface matching the Google Sheets structure
export interface Guest {
  Name: string
  Email: string
  RSVP: string
  Message: string
}

// GET: Fetch all guests from Google Sheets
export async function GET() {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch guests')
    }

    const data = await response.json()
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error('Error fetching guests:', error)
    return NextResponse.json(
      { error: 'Failed to fetch guests' },
      { status: 500 }
    )
  }
}

// POST: Add a new guest
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { Name, Email, RSVP, Message } = body

    // Validation
    if (!Name || typeof Name !== 'string') {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    const guestData = {
      Name: Name.trim(),
      Email: Email?.trim() || 'Pending',
      RSVP: RSVP?.trim() || '',
      Message: Message?.trim() || '',
    }

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(guestData),
    })

    if (!response.ok) {
      throw new Error('Failed to add guest')
    }

    const data = await response.json()
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Error adding guest:', error)
    return NextResponse.json(
      { error: 'Failed to add guest' },
      { status: 500 }
    )
  }
}

// PUT: Update an existing guest (requires action field for Google Apps Script)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { Name, Email, RSVP, Message } = body

    // Validation
    if (!Name || typeof Name !== 'string') {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    const updateData = {
      action: 'update',
      Name: Name.trim(),
      Email: Email?.trim() || 'Pending',
      RSVP: RSVP?.trim() || '',
      Message: Message?.trim() || '',
    }

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST', // Google Apps Script uses POST for all operations
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })

    if (!response.ok) {
      throw new Error('Failed to update guest')
    }

    const data = await response.json()
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error('Error updating guest:', error)
    return NextResponse.json(
      { error: 'Failed to update guest' },
      { status: 500 }
    )
  }
}

// DELETE: Delete a guest (requires action field for Google Apps Script)
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

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST', // Google Apps Script uses POST for all operations
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deleteData),
    })

    if (!response.ok) {
      throw new Error('Failed to delete guest')
    }

    const data = await response.json()
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error('Error deleting guest:', error)
    return NextResponse.json(
      { error: 'Failed to delete guest' },
      { status: 500 }
    )
  }
}

