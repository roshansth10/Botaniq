# TODO

- [ ] Update `app/(site)/checkout/page.tsx` to support 3 payment methods: Card, eSewa (demo), Khalti (demo)
- [ ] Add payment method selector (radio/box style)
- [ ] Implement eSewa themed demo card section:
  - [ ] Green-themed container
  - [ ] eSewa ID/mobile input
  - [ ] Amount display (read-only)
  - [ ] 3 feature bullets/rows (Instant Transfer, No Extra Charge, Secure & Safe)
- [ ] Implement Khalti themed demo card section:
  - [ ] Purple-themed container
  - [ ] Khalti ID/phone input
  - [ ] Amount display (read-only)
  - [ ] 3 feature bullets/rows (Fast Checkout, Bank Support, Cashback Offers)
- [ ] Keep existing Card form for Card selection
- [x] Update form schema + validation so card fields are required only for card payment
- [ ] Update submit handler to simulate payment based on selected method and show toast message
- [ ] Verify the checkout page UI toggles correctly and TS builds

