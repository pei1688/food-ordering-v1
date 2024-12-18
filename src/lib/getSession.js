import { auth } from "../auth";

async function getSession() {
  const session = await auth();

  return session;
}

export default getSession;
