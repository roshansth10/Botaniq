import { NextRequest, NextResponse } from 'next/server'

const KHALTI_SECRET_KEY = process.env.KHALTI_SECRET_KEY
const KHALTI_INITIATE_URL = 'https://khalti.com/api/v2/payment/initiate/'

export async function POST(request: NextRequest) {
  if (!KHALTI_SECRET_KEY) {
    return NextResponse.json({ error: 'Khalti secret key is not configured.' }, { status: 500 })
  }

  const body = await request.json()
  const { amount, purchase_order_id, purchase_order_name, purchase_order_url, customer_info } = body

  if (typeof amount === 'undefined' || !purchase_order_id || !purchase_order_name) {
    return NextResponse.json({ error: 'Missing amount, purchase_order_id, or purchase_order_name.' }, { status: 400 })
  }

  const orderAmount = Number(amount)
  if (isNaN(orderAmount) || orderAmount <= 0) {
    return NextResponse.json({ error: 'Invalid amount.' }, { status: 400 })
  }

  const amountInPaisa = Math.round(orderAmount * 100)

  const payload = {
    amount: amountInPaisa,
    purchase_order_id,
    purchase_order_name,
    purchase_order_url: purchase_order_url || 'http://localhost:3000/checkout/payment',
    return_url: 'http://localhost:3000/payment/success',
    customer_info: {
      name: customer_info?.name || 'Guest Shopper',
      email: customer_info?.email || 'guest@example.com',
      phone: customer_info?.phone || '+9770000000000',
    },
  }

  try {
    const response = await fetch(KHALTI_INITIATE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Key ${KHALTI_SECRET_KEY}`,
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()
    if (!response.ok) {
      return NextResponse.json({ error: data?.detail || 'Khalti initiation failed.', data }, { status: response.status })
    }

    // return the raw initiation response (contains payment_url on success)
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: 'Khalti initiation failed' }, { status: 500 })
  }
}
