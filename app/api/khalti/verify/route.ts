import { NextRequest, NextResponse } from 'next/server'

const KHALTI_SECRET_KEY = process.env.KHALTI_SECRET_KEY
const KHALTI_VERIFY_URL = 'https://dev.khalti.com/api/v2/epayment/lookup/'

export async function POST(request: NextRequest) {
  if (!KHALTI_SECRET_KEY) {
    return NextResponse.json({ error: 'Khalti secret key is not configured.' }, { status: 500 })
  }

  const body = await request.json()
  const { pidx } = body

  if (!pidx) {
    return NextResponse.json({ error: 'Missing pidx for verification.' }, { status: 400 })
  }

  try {
    const response = await fetch(KHALTI_VERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Key ${KHALTI_SECRET_KEY}`,
      },
      body: JSON.stringify({ pidx }),
    })

    const data = await response.json()
    if (!response.ok) {
      return NextResponse.json({ error: data?.detail || 'Khalti verification failed', data }, { status: response.status })
    }

    // map expected fields
    const result = {
      pidx: data?.pidx ?? pidx,
      total_amount: data?.total_amount ?? data?.amount,
      status: data?.status ?? data?.transaction_status ?? null,
      transaction_id: data?.transaction_id ?? data?.txn_id ?? null,
      fee: data?.fee ?? null,
      refunded: data?.refunded ?? false,
      raw: data,
    }

    return NextResponse.json(result)
  } catch (err) {
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
