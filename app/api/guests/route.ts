import { type NextRequest, NextResponse } from "next/server"

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx-FmQSdlm_QJL4qVhiCbCYZysxlnE3CKFuxj9wc49Ya3M47GURDxqec7vTelpfEH2LCQ/exec'

// Guest interface matching the Google Sheets structure
export interface Guest {
  Name: string
  Email: string
  RSVP: string
  Guest: string
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
    
    // Normalize the data to ensure Guest field is always present
    // Handle both old format (without Guest) and new format (with Guest)
    const normalizedData = Array.isArray(data) ? data.map((guest: any) => ({
      Name: guest.Name || '',
      Email: guest.Email || '',
      RSVP: guest.RSVP || '',
      Guest: guest.Guest || guest.GuestCount || '1', // Default to 1 if missing
      Message: guest.Message || '',
    })) : []
    
    return NextResponse.json(normalizedData, { status: 200 })
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
    const { Name, Email, RSVP, Guest, Message } = body

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
      Guest: Guest?.trim() || '',
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
    const { Name, Email, RSVP, Guest, Message, originalName } = body

    // Use originalName for lookup if provided, otherwise use Name
    // This allows updating a guest even if the name changed
    const lookupName = originalName?.trim() || Name?.trim()

    // Validation
    if (!lookupName || typeof lookupName !== 'string') {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    // Helper function to safely convert to string and trim
    const safeString = (value: any): string => {
      if (value === null || value === undefined) return ''
      if (typeof value === 'number') return value.toString()
      if (typeof value === 'string') return value.trim()
      return String(value).trim()
    }
    
    // Convert names to strings for comparison
    const originalNameStr = safeString(originalName)
    const nameStr = safeString(Name)
    const nameChanged = originalNameStr && originalNameStr !== nameStr
    
    // Ensure we always send proper values (never undefined or null)
    const updateData: any = {
      action: 'update',
      Email: safeString(Email) || 'Pending',
      RSVP: safeString(RSVP),
      Guest: safeString(Guest) || '1',
      Message: safeString(Message),
    }
    
    // If name changed, use originalName for lookup and Name for the new value
    // If name didn't change, use Name for both lookup and value
    if (nameChanged && originalNameStr) {
      updateData.originalName = originalNameStr // For lookup
      updateData.Name = nameStr || originalNameStr // New name value
    } else {
      updateData.Name = nameStr || safeString(lookupName) // Use for both lookup and value
    }

    // Debug: Log the data being sent
    if (process.env.NODE_ENV === 'development') {
      console.log('Update payload being sent:', JSON.stringify(updateData, null, 2))
    }

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST', // Google Apps Script uses POST for all operations
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })

    const responseText = await response.text()

    // Parse the response
    let data
    try {
      data = JSON.parse(responseText)
    } catch (parseError) {
      // If response is not JSON, it might be an HTML error page
      console.error('Failed to parse response as JSON:', parseError)
      console.error('Response text:', responseText.substring(0, 500))
      
      if (!response.ok) {
        return NextResponse.json(
          { 
            error: `Google Apps Script returned an error. Status: ${response.status}. The script may need to be updated or redeployed.`,
            details: responseText.substring(0, 200)
          },
          { status: response.status || 500 }
        )
      }
      
      // If status is ok but not JSON, assume success
      data = { status: 'ok' }
    }

    // Check if the response indicates an error
    if (data.error) {
      console.error('Error in response data:', data.error)
      return NextResponse.json(
        { error: data.error },
        { status: 400 }
      )
    }

    // Check response status
    if (!response.ok) {
      const errorMessage = data.error || `Failed to update guest. Google Apps Script returned status ${response.status}`
      return NextResponse.json(
        { error: errorMessage },
        { status: response.status || 500 }
      )
    }

    return NextResponse.json(data, { status: 200 })
  } catch (error: any) {
    console.error('Error updating guest:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to update guest' },
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

