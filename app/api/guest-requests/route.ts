import { type NextRequest, NextResponse } from "next/server"

// You'll need to replace this with your GuestWish Google Apps Script URL
const GUEST_WISH_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwvhXZqSdKoye3ZqHUFjUGA2JGuyQ7iHLAIFffuQwFdb_8w2pHzKG7SGFhol4SkeWI7/exec'

// Guest Request interface for WishGuest sheet
export interface GuestRequest {
  Name: string
  Email: string
  Phone: string
  RSVP: string
  Message: string
}

// GET: Fetch all guest requests
export async function GET() {
  try {
    const response = await fetch(GUEST_WISH_SCRIPT_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch guest requests')
    }

    const data = await response.json()
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error('Error fetching guest requests:', error)
    return NextResponse.json(
      { error: 'Failed to fetch guest requests' },
      { status: 500 }
    )
  }
}

// POST: Add a new guest request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { Name, Email, Phone, RSVP, Message } = body

    // Validation
    if (!Name || typeof Name !== 'string') {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    if (!Email || typeof Email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const requestData = {
      Name: Name.trim(),
      Email: Email.trim(),
      Phone: Phone?.trim() || '',
      RSVP: RSVP?.trim() || '',
      Message: Message?.trim() || '',
    }

    const response = await fetch(GUEST_WISH_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })

    if (!response.ok) {
      throw new Error('Failed to submit guest request')
    }

    const data = await response.json()
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Error adding guest request:', error)
    return NextResponse.json(
      { error: 'Failed to submit guest request' },
      { status: 500 }
    )
  }
}

// PUT: Update an existing guest request
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { Name, Email, Phone, RSVP, Message } = body

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
      Phone: Phone?.trim() || '',
      RSVP: RSVP?.trim() || '',
      Message: Message?.trim() || '',
    }

    const response = await fetch(GUEST_WISH_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })

    if (!response.ok) {
      throw new Error('Failed to update guest request')
    }

    const data = await response.json()
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error('Error updating guest request:', error)
    return NextResponse.json(
      { error: 'Failed to update guest request' },
      { status: 500 }
    )
  }
}

// DELETE: Delete a guest request
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

    const response = await fetch(GUEST_WISH_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deleteData),
    })

    if (!response.ok) {
      throw new Error('Failed to delete guest request')
    }

    const data = await response.json()
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error('Error deleting guest request:', error)
    return NextResponse.json(
      { error: 'Failed to delete guest request' },
      { status: 500 }
    )
  }
}

