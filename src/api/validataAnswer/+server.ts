import { json } from "@sveltejs/kit";


export async function POST() {

  return json({
    isValid: true,
    cardNumber: 0,
  })
}
