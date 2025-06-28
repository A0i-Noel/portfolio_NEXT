'use server'

import { cookies } from "next/headers";

export const getCookies = async (key : string) => {
  const cookieStore = cookies()
  const value = (await cookieStore).get(key)?.value;
  if(!value){
    throw new Error("No Value found by the given key")
  } else {
    return value
  }
}