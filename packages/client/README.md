# @dotinc/bouncer-client

## Usage

```ts
import { createClient } from '@dotinc/bouncer-client'

const client = createClient({
  apiKey: '123',
})

client.identify({
  tenant_id: '123',
  user_id: '123',
  email: 'bouncer@berghain.de', // optional
  user_name: 'Bouncer', // optional
})

client.seats.redeem({
  seatId: '123',
  subscriptionId: '123',
})

client.seats.reserve({
  identifier: {
    tenant_id: '123',
    user_id: '123',
  },
  invite_url: '',
})

client.seats.release({
  seatId: '123',
  subscriptionId: '123',
})

client.seats.request({ seatId: '123', subscriptionId: '123' })
```
